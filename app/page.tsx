"use client"

import { useEffect, useRef, useState } from "react";

const jdenticon = typeof window !== "undefined" ? require("jdenticon") : null;

const CursorFollow = () => {
  const [userId, setUserId] = useState<string>("");
  const cursorFollowRef = useRef<HTMLDivElement | null>(null);
  const customCursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Generate or retrieve a unique user ID
    const generateUserId = () => {
      const existingId = localStorage.getItem("user_id");
      if (existingId) {
        return existingId;
      }
      const newId = crypto.randomUUID();
      localStorage.setItem("user_id", newId);
      return newId;
    };

    const id = generateUserId();
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId || !cursorFollowRef.current) return;

    // Hash the server IP address + user ID and generate Identicon
    const hashId = async (id: string) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(id);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    };

    const setIdenticon = async (identiconSize: number) => {
      const hashedId = await hashId(userId);
      const identiconSvg = jdenticon.toSvg(hashedId, identiconSize);
      if (cursorFollowRef.current) {
        cursorFollowRef.current.innerHTML = identiconSvg;
      }
    };
    const identiconSize = 40;

    setIdenticon(identiconSize);
  }, [userId]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (customCursorRef.current) {
        customCursorRef.current.style.left = `${e.clientX}px`;
        customCursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateFollow = () => {
      if (!cursorFollowRef.current || !customCursorRef.current) return;

      const customCursor = customCursorRef.current;
      const cursorFollow = cursorFollowRef.current;

      const customCursorRect = customCursor.getBoundingClientRect();
      const followX = parseFloat(cursorFollow.style.left || "0");
      const followY = parseFloat(cursorFollow.style.top || "0");

      const dx = customCursorRect.left - followX;
      const dy = customCursorRect.top - followY;
      const ease = 0.1;

      cursorFollow.style.left = `${followX + dx * ease - 1.8}px`;
      cursorFollow.style.top = `${followY + dy * ease - 1.8}px`;

      requestAnimationFrame(animateFollow);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateFollow();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden cursor-none flex justify-center items-center">
      <h1 className="text-2xl font-bold text-center">Cursor Follow Effect Demo</h1>
      <div
        ref={cursorFollowRef}
        className="absolute w-10 h-10 pointer-events-none"
      ></div>
      <div
        ref={customCursorRef}
        className="absolute w-1.5 h-1.5 bg-black dark:bg-white rounded-full pointer-events-none"
      ></div>
    </div>
  );
};

export default CursorFollow;
