"use client";

import { useEffect, useState } from "react";

const WEDDING_TIME = new Date("2026-10-17T15:00:00+03:00").getTime();

type CountdownValue = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  complete: boolean;
};

function calculateCountdown(): CountdownValue {
  const difference = WEDDING_TIME - Date.now();

  if (difference <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      complete: true,
    };
  }

  return {
    days: String(Math.floor(difference / 86_400_000)).padStart(2, "0"),
    hours: String(
      Math.floor((difference % 86_400_000) / 3_600_000),
    ).padStart(2, "0"),
    minutes: String(
      Math.floor((difference % 3_600_000) / 60_000),
    ).padStart(2, "0"),
    seconds: String(Math.floor((difference % 60_000) / 1_000)).padStart(
      2,
      "0",
    ),
    complete: false,
  };
}

export default function Countdown() {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (countdown?.complete) {
    return (
      <p className="countdown-complete">
        <span aria-hidden="true">♥</span>
        Сегодня тот самый день
      </p>
    );
  }

  const units = [
    [countdown?.days ?? "—", "дней"],
    [countdown?.hours ?? "—", "часов"],
    [countdown?.minutes ?? "—", "минут"],
    [countdown?.seconds ?? "—", "секунд"],
  ];

  return (
    <div className="countdown" aria-live="polite">
      {units.map(([value, label]) => (
        <div className="countdown-cell" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
