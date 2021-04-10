import { useQuery } from "react-query";

const { REACT_APP_OPEN_WEATHER_KEY } = process.env;
const defaultResponse = { list: [] };

export default function useWeatherDataQuery(
  keys,
  variables = {},
  options = { refetchOnWindowFocus: false }
) {
  const { data = defaultResponse, ...response } = useQuery(
    ["weatherData", ...keys],
    () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${variables.location}&APPID=${REACT_APP_OPEN_WEATHER_KEY}&cnt=${variables.count}`
      ).then(res => res.json()),
    options
  );
  return { ...response, data };
}
