import React, { useEffect } from "react";

export default function Background({ starCount = 10, speed = 8 }) {
  useEffect(() => {
    const container = document.querySelector(".cosmic-bg");

    if (!container || container.children.length > 0) return;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * speed}s`;
      container.appendChild(star);
    }
  }, [starCount, speed]);

  return <div className="cosmic-bg absolute inset-0 overflow-hidden pointer-events-none -z-10"></div>;
}