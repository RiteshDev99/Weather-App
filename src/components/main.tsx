import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Api_key = "a53819ec567cd3d81449694d1ab3d3c6";
interface WeatherType {
    type: string;
    img: string;
}

interface WeatherData {
    weather: [{ main: string }];
    name: string;
    sys: { country: string };
    main: { temp: number };
}

const Main = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [apiData, setApiData] = useState<WeatherData | null>(null);
    const [showWeather, setShowWeather] = useState<WeatherType | null>(null);

    const WeatherTypes: WeatherType[] = [
        { type: "Clear", img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png" },
        { type: "Rain", img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png" },
        { type: "Snow", img: "https://cdn-icons-png.flaticon.com/512/642/642102.png" },
        { type: "Clouds", img: "https://cdn-icons-png.flaticon.com/512/414/414825.png" },
        { type: "Haze", img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png" },
        { type: "Smoke", img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png" },
        { type: "Mist", img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png" },
        { type: "Drizzle", img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png" },
    ];

    const fetchWeather = async () => {
        if (inputRef.current) {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
            try {
                const response = await fetch(URL);
                const data: WeatherData = await response.json();
                setApiData(data);
                const weather = WeatherTypes.find((weather) => weather.type === data.weather[0].main);
                setShowWeather(weather || null);
            } catch (err) {
                console.error("Error fetching weather data:", err);
                setApiData(null);
                setShowWeather(null);
            }
        }
    };

    return (
        <div className="h-[100vh] w-[100%] bg-slate-700 flex items-center justify-center">
            <div className="h-auto w-[30vw] bg-[#93c5fd] rounded-md py-3">
                <div className="flex justify-center">
                    <div className="h-[5vh] w-[27vw] bg-[#f0fdfa] rounded-3xl flex items-center justify-center">
                        <input
                            placeholder="Enter Your Location"
                            type="text"
                            ref={inputRef}
                            className="h-[5vh] w-[25vw] bg-[#f0fdfa] rounded-3xl p-3 cursor-pointer outline-none font-semibold uppercase"
                        />
                        <IoSearch onClick={fetchWeather} className="text-3xl text-[#115e59] m-5" />
                    </div>
                </div>
                {showWeather && apiData && (
                    <div className="p-[3vh] flex flex-col gap-[5vh]">
                        <p className="flex justify-center text-3xl font-bold">
                            {apiData.name}, {apiData.sys.country}
                        </p>
                        <img src={showWeather.img} alt={showWeather.type} className="w-52 mx-auto" />
                        <h3 className="flex justify-center text-3xl font-bold">{showWeather.type}</h3>
                        <>
                            <div className="flex items-center justify-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                                    alt="Temperature icon"
                                    className="h-9"
                                />
                                <h2 className="text-3xl font-bold">{Math.round(apiData.main.temp)}&#176;C</h2>
                            </div> 
                        </>
                     
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
