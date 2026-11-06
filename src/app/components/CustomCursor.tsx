"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springRingX = useSpring(cursorX, { stiffness: 180, damping: 18, mass: 0.1 });
  const springRingY = useSpring(cursorY, { stiffness: 180, damping: 18, mass: 0.1 });

  useEffect(() => {
    const checkPointer = () => {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsDesktop(finePointer && !reducedMotion);
    };
    checkPointer();
    window.addEventListener("resize", checkPointer);

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        Boolean(
          target.closest("a") ||
            target.closest("button") ||
            target.closest("input") ||
            target.closest("select") ||
            target.classList.contains("cursor-pointer")
        )
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("resize", checkPointer);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        style={{ x: springRingX, y: springRingY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(201, 168, 76, 0.12)" : "transparent",
        }}
        className="fixed top-0 left-0 w-8 h-8 border border-[#C9A84C]/50 rounded-full pointer-events-none z-[100] mix-blend-difference"
      />
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 0 : 1 }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#C9A84C] rounded-full pointer-events-none z-[100] mix-blend-difference"
      />
    </>
  );
}
