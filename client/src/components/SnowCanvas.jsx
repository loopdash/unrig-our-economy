import { useEffect } from "react";

const SnowCanvas = () => {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const NUMBER_OF_SNOWFLAKES = 200; // slightly reduced for perf
    const MAX_SNOWFLAKE_SIZE = 4;
    const MAX_SNOWFLAKE_SPEED = 1.5;
    const SNOWFLAKE_COLOUR = "#8cb2cd";
    const snowflakes = [];

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.pointerEvents = "none";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";

    const parent = document.querySelector(".holiday-snow-wrapper");
    if (!parent) return;

    parent.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resize();

    const SNOWFLAKE_EMOJI = "❄️";

    const createSnowflake = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * MAX_SNOWFLAKE_SIZE + 10, // emoji needs bigger size
      speed: Math.random() * MAX_SNOWFLAKE_SPEED + 0.5,
      sway: Math.random() - 0.5,
    });

    // const createSnowflake = () => ({
    //   x: Math.random() * canvas.width,
    //   y: Math.random() * canvas.height,
    //   radius: Math.random() * MAX_SNOWFLAKE_SIZE + 1,
    //   color: SNOWFLAKE_COLOUR,
    //   speed: Math.random() * MAX_SNOWFLAKE_SPEED + 0.5,
    //   sway: Math.random() - 0.5,
    // });

    const drawSnowflake = (snowflake) => {
      ctx.font = `${snowflake.size}px system-ui, Apple Color Emoji, Segoe UI Emoji`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("❄️", snowflake.x, snowflake.y);
    };

    const updateSnowflake = (snowflake) => {
      snowflake.y += snowflake.speed;
      snowflake.x += snowflake.sway;

      if (snowflake.y > canvas.height) {
        Object.assign(snowflake, createSnowflake());
        snowflake.y = 0;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach((snowflake) => {
        updateSnowflake(snowflake);
        drawSnowflake(snowflake);
      });
      animationId = requestAnimationFrame(animate);
    };

    for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
      snowflakes.push(createSnowflake());
    }

    let animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return null;
};

export default SnowCanvas;
