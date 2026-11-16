import Card from "./Card";
import type { TempReading } from "@/lib/api";

type TemperatureStatProps = {
    readings: TempReading[];
}

function getColor(temp: number) {
    if (temp < 21) {
        return "text-blue-500";
    } else if (temp < 23.5) {
        return "text-green-500";
    } else {
        return "text-red-500";
    }
}

export default function TempStats({readings,}: TemperatureStatProps) {
    let current = null;
    let average = null;
    let highest = null;

    if (readings.length > 0) {
        let sum = 0;
        highest = readings[0].room_temp;

        for (let i = 0; i < readings.length; i++) {
            const temp = readings[i].room_temp;

            sum += temp;

            if (temp > highest) {
                highest = temp;
            }
        }

        current = readings[readings.length - 1].room_temp;
        average = sum / readings.length;
    }

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-5">
            <Card>
                <p className="text-md text-zinc-400 font-bold">Current temperature</p>
                <h2 className={`mt-3 text-3xl font-semibold ${current === null ? "" : getColor(current)}`}>
                    {current === null ? "--" : `${current.toFixed(1)}°C`}
                </h2>
            </Card>
            <Card>
                <p className="text-sm text-zinc-400">Average temperature</p>
                <h2 className={`mt-3 text-3xl font-semibold ${average === null ? "" : getColor(average)}`}>
                    {average === null ? "--" : `${average.toFixed(1)}°C`}
                </h2>
            </Card>
            <Card>
                <p className="text-sm text-zinc-400">Highest temperature</p>
                <h2 className={`mt-3 text-3xl font-semibold ${highest === null ? "" : getColor(highest)}`}>
                    {highest === null ? "--" : `${highest.toFixed(1)}°C`}
                </h2>
            </Card>
        </div>
    )
}