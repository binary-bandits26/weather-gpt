import NavBar from "../components/navBar.jsx";
import EventBox from "../components/eventBox.jsx";
import LocationButton from "../components/locationButton.jsx";
import InfoCard from "../components/infoCard.jsx";
import thermometerSvg from "../assets/logos/thermometer.svg";
import dropletSvg from "../assets/logos/droplet.svg";
import windSvg from "../assets/logos/wind.svg";
import cloudSvg from "../assets/logos/cloud.svg";

const weatherJSON = {
  coord: { lon: 81.329, lat: 21.21 },
  weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }],
  base: "stations",
  main: {
    temp: 297.6,
    feels_like: 298.37,
    temp_min: 297.6,
    temp_max: 297.6,
    pressure: 1003,
    humidity: 87,
    sea_level: 1003,
    grnd_level: 969,
  },
  visibility: 10000,
  wind: { speed: 3.44, deg: 249, gust: 8 },
  clouds: { all: 100 },
  dt: 1788175718,
  sys: { country: "IN", sunrise: 1788135483, sunset: 1788180761 },
  timezone: 19800,
  id: 1272181,
  name: "Durg",
  cod: 200,
};

const tempCelsius = (weatherJSON.main.temp - 273.15).toFixed(1);

const weatherCards = [
  {
    logo: <img src={thermometerSvg} alt="temp" className="w-full h-full" />,
    num: `${tempCelsius}°C`,
    title: "Temperature",
  },
  {
    logo: <img src={dropletSvg} alt="humidity" className="w-full h-full" />,
    num: `${weatherJSON.main.humidity}%`,
    title: "Humidity",
  },
  {
    logo: <img src={windSvg} alt="wind" className="w-full h-full" />,
    num: `${weatherJSON.wind.speed} m/s`,
    title: "Wind",
  },
  {
    logo: <img src={cloudSvg} alt="clouds" className="w-full h-full" />,
    num: `${weatherJSON.clouds.all}%`,
    title: "Clouds",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <NavBar />

      <div className="flex-1 flex flex-col gap-8 px-4 pt-28 pb-8 mx-auto w-full max-w-4xl">
        <div className="flex items-center gap-4">
          <EventBox text={`${weatherJSON.name}, ${weatherJSON.sys.country}`} />
          <EventBox text={weatherJSON.weather[0].description} />
          <LocationButton onClick={() => {}} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {weatherCards.map((card) => (
            <InfoCard
              key={card.title}
              logo={card.logo}
              num={card.num}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
