import { useState } from "react";
import { DataStore } from "aws-amplify";
import { Sessions, ClockIn } from "./models";

export default function MasterClose() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const correctPassword = "myPassword"; // replace with your actual password

    const handleButtonClick = async () => {
        if (password === correctPassword) {
            // get all the sessions for today and then set everyone to LeftCenter true and if TimeLeft is null then set it to todays time in aws format
            const today = new Date().toISOString().slice(0, 10);
            const sessions = await DataStore.query(Sessions, (s) =>
                s.Date("ge", today).and(s.Date("lt", new Date(today).toISOString()))
            );
            await Promise.all(
                sessions.map(async (session) => {
                    if (!session.TimeLeft) {
                        session.TimeLeft = new Date().toISOString();
                    }
                    session.LeftCenter = true;
                    await DataStore.save(session);
                })
            );

            // query the datastore for all ClockIns for today and then set the ClockOut time in awstime
            const clockIns = await DataStore.query(ClockIn, (c) =>
                c.Date("ge", today).and(c.Date("lt", new Date(today).toISOString()))
            );
            await Promise.all(
                clockIns.map(async (clockIn) => {
                    clockIn.ClockOut = new Date().toISOString();
                    await DataStore.save(clockIn);
                })
            );
        } else {
            alert("Incorrect password");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-transparent">
            <div className="bg-white rounded-lg shadow-lg p-8">
                {showPassword ? (
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-64"
                    />
                ) : null}
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
                >
                    {showPassword ? "Hide Password" : "Shut Down"}
                </button>
                {showPassword ? (
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg relative overflow-hidden"
                    >
                        <img
                            src="https://media.giphy.com/media/3o7aD2jBmYRvKvthUQ/giphy.gif"
                            alt="background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        Submit
                    </button>
                ) : null}
            </div>
        </div>
    );
}