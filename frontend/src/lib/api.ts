export type TempReading = {
    timestamp: string;
    room_temp: number;
    pi_temp: number;
}

export async function getTemperatures(): Promise<TempReading[]> {
    const response = await fetch("http://localhost:8000/api/temp");
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    return response.json();
}

export async function getTemperaturesByDate(date:string): Promise<TempReading[]> {
    const response = await fetch(`http://localhost:8000/api/temp/date?date=${date}`);
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    return response.json();
}