"use client"

import { useEffect, useRef, useState } from "react";

const CursorFollow = () => {
  const [identicon, setIdenticon] = useState<string>("");
  const cursorFollowRef = useRef<HTMLImageElement | null>(null);
  const customCursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const existingId = localStorage.getItem("user_id");
      if (existingId) {
        fetchIdenticon(existingId);
      } else {
        try {
          const res = await fetch("/api/generate-id");
          const data = await res.json();
          localStorage.setItem("user_id", data.userId);
          fetchIdenticon(data.userId);
        } catch (error) {
          console.error("Failed to fetch user ID:", error);
        }
      }
    };

    fetchUserId();
  }, []);

  const fetchIdenticon = async (userId: string) => {
    try {
      const res = await fetch(`/api/generate-identicon?userId=${userId}`);
      const data = await res.json();
      setIdenticon(data.identicon);
    } catch (error) {
      console.error("Failed to fetch Identicon:", error);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (customCursorRef.current) {
        customCursorRef.current.style.left = `${e.clientX}px`;
        customCursorRef.current.style.top = `${e.clientY}px`;
      }
      if (cursorFollowRef.current) {
        cursorFollowRef.current.style.left = `${e.clientX}px`;
        cursorFollowRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return (
    <div className="w-screen h-screen overflow-hidden cursor-none flex justify-center items-center">
      <h1 className="text-2xl font-bold text-center">Cursor Follow Effect Demo</h1>
      {identicon && (
        <img
          ref={cursorFollowRef}
          src={identicon}
          className="absolute w-10 h-10 pointer-events-none"
          alt="Identicon"
        />
      )}
      <div
        ref={customCursorRef}
        className="absolute w-1.5 h-1.5 bg-black dark:bg-white rounded-full pointer-events-none"
      ></div>
    </div>
  );
};

export default CursorFollow;
