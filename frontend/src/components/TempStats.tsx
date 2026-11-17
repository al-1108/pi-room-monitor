import Card from "./Card";
import type { TempReading } from "@/lib/api";

type TemperatureStatProps = {
    readings: TempReading[];
    type: "room" | "pi";
}

function getColor(temp: number, type: "room" | "pi") {
    if (type === "room") {
        if (temp < 21) {
            return "text-blue-500";
        } else if (temp < 23.5) {
            return "text-green-500";
        } else {
            return "text-red-500";
        }
    }
    if (type === "pi") {
        if (temp < 70) {
            return "text-blue-500";
        } else if (temp < 75) {
            return "text-green-500";
        } else {
            return "text-red-500"
        }
    }
}

export default function TempStats({readings, type}: TemperatureStatProps) {
    let current = null;
    let average = null;
    let highest = null;

    if (readings.length > 0) {
        let sum = 0;
        if (type === "room") {
            highest = readings[0].room_temp;
        } else {
            highest = readings[0].pi_temp;
        }

        for (let i = 0; i < readings.length; i++) {
            let temp;

            if (type === "room") {
                temp = readings[i].room_temp;
            } else {
                temp = readings[i].pi_temp;
            }
            sum += temp;

            if (temp > highest) {
                highest = temp;
            }
        if (type === "room") {
            current = readings[readings.length - 1].room_temp;
        } else {
            current = readings[readings.length - 1].pi_temp;
        }
        average = sum / readings.length;
        }
    }

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-5">
            <Card>
                <p className="text-md text-zinc-400 font-bold">Current {type === "room" ? "Room" : "Pi"} temperature</p>
                <h2 className={`mt-3 text-3xl font-semibold ${current === null ? "" : getColor(current, type)}`}>
                    {current === null ? "--" : `${current.toFixed(1)}°C`}
                </h2>
            </Card>
            <Card>
                <p className="text-sm text-zinc-400">Average {type === "room" ? "Room" : "Pi"} temperature</p>
                <h2 className={`mt-3 text-3xl font-semibold ${average === null ? "" : getColor(average, type)}`}>
                    {average === null ? "--" : `${average.toFixed(1)}°C`}
                </h2>
            </Card>
            <Card>
                <p className="text-sm text-zinc-400">Highest {type === "room" ? "Room" : "Pi"} temperature</p>
                <h2 className={`mt-3 text-3xl font-semibold ${highest === null ? "" : getColor(highest, type)}`}>
                    {highest === null ? "--" : `${highest.toFixed(1)}°C`}
                </h2>
            </Card>
        </div>
    )
}