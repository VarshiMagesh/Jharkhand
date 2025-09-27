import { useEffect, useState } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  CloudLightning,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface WeatherDay {
  day: string;
  date: string;
  temp: number;
  description: string;
}

const WeeklyWeather = () => {
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [weekIndex, setWeekIndex] = useState(0); // 0 = current week, 1 = next week

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=23.61&longitude=85.28&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=14&timezone=auto"
    )
      .then((res) => res.json())
      .then((data) => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const mapped = data.daily.time.map((date: string, i: number) => {
          const d = new Date(date);
          return {
            day: days[d.getDay()],
            date: d.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            }),
            temp: Math.round(
              (data.daily.temperature_2m_max[i] +
                data.daily.temperature_2m_min[i]) /
                2
            ),
            description: getWeatherDescription(data.daily.weathercode[i]),
          };
        });

        setForecast(mapped);
      });
  }, []);

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Sunny";
    if ([1, 2, 3].includes(code)) return "Cloudy";
    if ([45, 48].includes(code)) return "Fog";
    if (
      [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)
    )
      return "Rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
    if ([95, 96, 99].includes(code)) return "Storm";
    return "Clear";
  };

  const getWeatherIcon = (desc: string) => {
    switch (desc) {
      case "Sunny":
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case "Cloudy":
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case "Rain":
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      case "Snow":
        return <Snowflake className="w-6 h-6 text-cyan-400" />;
      case "Storm":
        return <CloudLightning className="w-6 h-6 text-purple-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-400" />;
    }
  };

  // slice 7 days per week
  const startIndex = weekIndex * 7;
  const currentWeek = forecast.slice(startIndex, startIndex + 7);

  return (
    <section className="py-12  relative">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
          Weekly Weather Forecast
        </h2>

        <div className="flex items-center justify-center gap-4">
          {/* Prev Button */}
          <button
            onClick={() => setWeekIndex((i) => Math.max(0, i - 1))}
            disabled={weekIndex === 0}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Forecast Cards */}
          <div className="flex gap-4 justify-center flex-wrap">
            {currentWeek.map((day, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white/25     backdrop-blur-md rounded-2xl shadow-card p-4 w-32 text-center"
              >
                <div className="text-lg font-semibold text-accent">{day.day}</div>
                <div className="text-xs text-gray-200">{day.date}</div>
                <div className="flex justify-center my-2">
                  {getWeatherIcon(day.description)}
                </div>
                <div className="text-gray-100 font-medium">{day.temp}°C</div>
                <div className="text-xs text-gray-1000">{day.description}</div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() =>
              setWeekIndex((i) =>
                (i + 1) * 7 < forecast.length ? i + 1 : i
              )
            }
            disabled={(weekIndex + 1) * 7 >= forecast.length}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeeklyWeather;
