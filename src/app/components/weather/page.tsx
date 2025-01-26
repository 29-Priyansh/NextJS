import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { get, METHODS } from "http";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export default function Weather() {
  const id = useId();
  const [weather, setWeather] = useState<any>({});
  const [myvars, setMyvars] = useState<object>({});
  function findWeather(e) {
    e.preventDefault();
    console.log("find weather");
    try {
      const city = e.target[0].value;
      const getApi = async () => {
        const API = "b83fd08b94e9d261ee051d9545335cb0";
        const respo1 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
        );
        const json1 = await respo1.json();
        setWeather(() => json1);
        // console.log(json1);
        console.log(weather);
        // const response = await fetch("http://localhost:3001/city");
        // const cities = await response.json(); // Convert response to JSON
        // const foundCity = cities.find((_, val) =>
        //   val.name === city ? { name: val.name, c: val.c, f: val.f } : null
        // ); // Find city by name
        // console.log(foundCity);
        // if (foundCity) {
        //   alert(
        //     `The temperature in ${foundCity.name} is ${foundCity.c}°C (${foundCity.f}°F)`
        //   );
        // } else {
        //   alert("City not found in database.");
        // }
      };
      getApi();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (weather && weather.main && weather.weather) {
      const { name: location } = weather;
      const { feels_like, humidity, temp, temp_max, temp_min } = weather.main;
      const [{ main: climate, icon }] = weather.weather;
      const { speed, deg } = weather.wind;

      setMyvars({
        location,
        feels_like,
        humidity,
        temp,
        temp_max,
        temp_min,
        climate,
        icon,
        speed,
        deg,
      });
    }
  }, [weather]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        action=""
        onSubmit={(e) => {
          findWeather(e);
        }}
      >
        <div
          className="space-y-2"
          // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
          style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
        >
          <Label htmlFor={id} className="sr-only">
            Input with colored border and ring
          </Label>
          <Input id={id} placeholder="enter city" type="text" />
        </div>
      </form>
      {weather && weather.weather && (
        <div className="mt-10 border-2 border-gray-300 rounded-lg w-1/3 h-1/3">
          <div className="flex justify-center">
            <h1>{myvars.location}</h1>
          </div>
          <div className="flex items-center justify-between h-full gap-5 p-5">
            <div className="left">
              Humidity:{myvars.humidity}% wind speed {myvars.speed}kph direction{" "}
              {myvars.deg}
            </div>
            <div className="center">
              <Image
                src={`https://openweathermap.org/img/wn/${myvars.icon}.png`}
                width={300}
                height={300}
                className="aspect-square"
                alt=""
              />
              Now {myvars.temp} High {myvars.temp_max} Low{myvars.temp_min}{" "}
            </div>
            <div className="right">
              {myvars.climate} Feels like {myvars.feels_like}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
