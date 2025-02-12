"use client"

import { useEffect, useRef, useState } from "react";

export function Cursor() {
    const [identicon, setIdenticon] = useState<string>("");
    const cursorFollowRef = useRef<HTMLImageElement | null>(null);
    const customCursorRef = useRef<HTMLDivElement | null>(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const followPosition = useRef({ x: 0, y: 0 });

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
            setCursorPosition({ x: e.clientX, y: e.clientY });

            if (customCursorRef.current) {
                customCursorRef.current.style.left = `${e.clientX}px`;
                customCursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const followCursor = () => {
            followPosition.current.x = lerp(followPosition.current.x, cursorPosition.x, 0.05);
            followPosition.current.y = lerp(followPosition.current.y, cursorPosition.y, 0.05);

            if (cursorFollowRef.current) {
                cursorFollowRef.current.style.left = `${followPosition.current.x - 17}px`;
                cursorFollowRef.current.style.top = `${followPosition.current.y - 17}px`;
            }

            animationFrameId = requestAnimationFrame(followCursor);
        };

        followCursor();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [cursorPosition]);

    return (
        <div>
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
            />
        </div>
    )
}