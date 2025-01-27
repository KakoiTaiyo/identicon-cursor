"use client"

import { useEffect, useRef, useState } from "react";

const jdenticon = typeof window !== "undefined" ? require("jdenticon") : null;

const CursorFollow = () => {
  const [userId, setUserId] = useState<string>("");
  const cursorFollowRef = useRef<HTMLDivElement | null>(null);
  const customCursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // サーバーからハッシュ化されたIDを取得
    const fetchUserId = async () => {
      const existingId = localStorage.getItem("user_id");
      if (existingId) {
        setUserId(existingId);
      } else {
        try {
          const res = await fetch("/api/generate-id");
          const data = await res.json();
          const hashedId = data.userId;
          localStorage.setItem("user_id", hashedId);
          setUserId(hashedId);
        } catch (error) {
          console.error("Failed to fetch user ID:", error);
        }
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId || !cursorFollowRef.current) return;

    // Identiconを設定
    const setIdenticon = (identiconSize: number) => {
      const identiconSvg = jdenticon.toSvg(userId, identiconSize);
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
