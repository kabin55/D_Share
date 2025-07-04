import React, { useMemo } from "react";
import { motion } from "framer-motion";

const colors = ["#7c3aed", "#ec4899", "#6366f1", "#14b8a6", "#eab308"];

const getRandom = (min, max) => Math.random() * (max - min) + min;

const generateBlocks = (count = 15) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: getRandom(40, 80),
    left: getRandom(0, 100),
    delay: getRandom(0, 5),
    duration: getRandom(15, 30),
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

const FloatingBackground = () => {
  const blocks = useMemo(() => generateBlocks(), []); // ✅ only generate once

  return (
    <div
      className="absolute inset-0 overflow-hidden z-0"
      style={{ pointerEvents: "none" }}
    >
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: block.duration,
            delay: block.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${block.left}%`,
            width: `${block.size}px`,
            height: `${block.size}px`,
            backgroundColor: block.color,
            borderRadius: "12px",
            opacity: 0.12,
            zIndex: 0,
            filter: "blur(4px)",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
