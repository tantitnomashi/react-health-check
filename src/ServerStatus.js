import React, { useState, useEffect } from "react";
import axios from "axios";

const ServerStatus = () => {
    const [serverStatus, setServerStatus] = useState("");

    useEffect(() => {
        // Fetch server status on component mount
        checkServerStatus();

        // Set up cronjob to check server status at 8AM and 1PM every day
        const intervalId = setInterval(() => {
            const now = new Date();
            const currentHour = now.getHours();
            if (currentHour > 0) {
                checkServerStatus();
            }
        }, 60 * 60 * 1000); // Check every hour

        // Clean up interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    const checkServerStatus = async () => {
        try {
            //  const response = await axios.get("/api/health");
            setServerStatus("down");
            //if (response.data.status === "down") {
            // Server is down, send message to Telegram
            const telegramToken = "6194886573:AAGe4XRWWgz2MsmjlRNxpzIiHalvrHDxRTU";
            const chatId = "1214944546";
            const message = `Test Interval Function`;

            const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
            const telegramParams = {
                chat_id: chatId,
                text: message,
            };

            await axios.post(telegramUrl, telegramParams);
            // }
        } catch (error) {
            console.error(error);
            setServerStatus("down");
        }
    };

    return (
        <div>
            <h2>Server Status: {serverStatus}</h2>
        </div>
    );
};

export default ServerStatus;
