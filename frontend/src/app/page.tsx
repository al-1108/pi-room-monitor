"use client";

import { useEffect, useState } from "react";
import { TempReading, getTemperaturesByDate } from "@/lib/api"

import TempStats from "@/components/TempStats";
import TempHistory from "@/components/TempHistory";

export default function Home() {
  const [readings, setReadings] = useState<TempReading[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    setSelectedDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (selectedDate === "") {
      return;
    }

    getTemperaturesByDate(selectedDate)
      .then(setReadings)
      .catch(console.error);
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="text-3xl font-bold mb-4 text-center">pi & room temp monitor</h1>
        <div className="flex justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white "
          />
        </div>

        <TempStats readings={readings}></TempStats>
        <div className="pl-5 pr-5">
          <TempHistory readings={readings} />
        </div>
      </div>
    </main>
  );
}
