import { addYears, differenceInDays } from "date-fns";
import React, { useEffect, useRef } from "react";

interface TimeLeftProps {
  birthday: Date;
  expectancyYears: number;
}

const SQUARE_SIZE_DESKTOP = 4;
const SQUARE_SIZE_MOBILE = 2;

const MARGIN_DESKTOP = 1;
const MARGIN_MOBILE = 1;

const TOTAL_SIZE_DESKTOP = SQUARE_SIZE_DESKTOP + MARGIN_DESKTOP;
const TOTAL_SIZE_MOBILE = SQUARE_SIZE_MOBILE + MARGIN_MOBILE;

const COLUMNS = 52; // One year in weeks

const TimeLeft: React.FC<TimeLeftProps> = ({ birthday, expectancyYears }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [totalDays, setTotalDays] = React.useState(0);
  const [daysPassed, setDaysPassed] = React.useState(0);

  const drawCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    totalDays: number,
    daysPassed: number,
    isMobile: boolean
  ) => {
    const SQUARE_SIZE = isMobile ? SQUARE_SIZE_MOBILE : SQUARE_SIZE_DESKTOP;
    const TOTAL_SIZE = isMobile ? TOTAL_SIZE_MOBILE : TOTAL_SIZE_DESKTOP;

    const containerWidth = canvas.parentElement?.offsetWidth || 0;
    const scale = containerWidth / (COLUMNS * TOTAL_SIZE);
    const scaledSquareSize = SQUARE_SIZE * scale;
    const scaledTotalSize = TOTAL_SIZE * scale;

    const rows = Math.ceil(totalDays / COLUMNS);
    canvas.width = containerWidth;
    canvas.height = rows * scaledTotalSize;

    for (let i = 0; i < totalDays; i++) {
      const col = i % COLUMNS;
      const row = Math.floor(i / COLUMNS);
      const x = col * scaledTotalSize;
      const y = row * scaledTotalSize;

      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, scaledSquareSize, scaledSquareSize);

      ctx.fillStyle = i < daysPassed ? "black" : "white";
      ctx.fillRect(x, y, scaledSquareSize, scaledSquareSize);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const deathDate = addYears(birthday, expectancyYears);
    const totalDays = differenceInDays(deathDate, birthday);
    const daysPassed = differenceInDays(new Date(), birthday);

    setTotalDays(totalDays);
    setDaysPassed(daysPassed);

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // Tailwind's md breakpoint
      drawCanvas(canvas, ctx, totalDays, daysPassed, isMobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [birthday, expectancyYears]);

  return (
    <div>
      <p className="text-sm text-gray-500">
        {daysPassed} / {totalDays}
      </p>

      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
};

export default TimeLeft;
