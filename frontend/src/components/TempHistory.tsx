"use client";
import Card from "./Card";
import type { TempReading } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


type TemperatureHistoryProps = {
  readings: TempReading[];
  type: "room" | "pi";
};

export default function TempHistory({readings, type}: TemperatureHistoryProps) {

    const graphData = [];

    for (let i = 0; i < readings.length; i++) {
        let temp;

        if (type === "room") {
            temp = readings[i].room_temp;
        } else {
            temp = readings[i].pi_temp;
        }

        graphData.push({
            time: readings[i].timestamp.slice(11, 16),
            temperature: temp
        });
    }

    return (
        <Card>
            <div className="flex items-center justify-between">
                <h2>
                    Temperature History
                </h2>
                <span className="text-sm">
                    {readings.length} readings
                </span>
            </div>

            {graphData.length === 0 ? (
                <p className="text-zinc-400">
                No temperature readings available.
                </p>
            ) : (
                <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        interval={0}
                        minTickGap={0}
                        tick={false}
                    />

                    <YAxis
                        domain={["auto", "auto"]}
                        unit="°C"
                    />

                    <Tooltip
                        labelStyle={{ color: "black" }}
                        labelFormatter={(time) => `Time: ${time}`}
                    />

                    <Line
                        type="monotone"
                        dataKey="temperature"
                        name="Temperature"
                        stroke="#898735"
                        strokeWidth={2}
                    />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            )}
        </Card>
    )
}