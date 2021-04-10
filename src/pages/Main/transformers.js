import convertKelvinToFahrenheit from "utils/convertKelvinToFahrenheit";
import convertKelvinToCelsius from "utils/convertKelvinToCelsius";

export function getDateToForecastMap(forecasts) {
  return forecasts.reduce((map, forecast) => {
    const forecastDate = forecast.dt_txt.split(" ")[0];
    if (map[forecastDate])
      map[forecastDate].push({ ...forecast.main, dt_txt: forecast.dt_txt });
    else map[forecastDate] = [{ ...forecast.main, dt_txt: forecast.dt_txt }];
    return map;
  }, {});
}

export function getAverageTemperatureForDay(forecasts) {
  return (
    forecasts.reduce((temp, forecast) => temp + forecast.temp, 0) /
    forecasts.length
  ).toFixed(2);
}

export function getConsumableForecasts(forecastMap) {
  return Object.keys(forecastMap).map((date) => {
    const forecasts = forecastMap[date];
    return {
      temp: getAverageTemperatureForDay(forecasts),
      date,
      forecasts,
    };
  });
}

export function convertKelvinToTemperature(forecasts, scale) {
  return forecasts.map((f) => {
    return {
      ...f,
      main: {
        ...f.main,
        temp:
          scale === "c"
            ? convertKelvinToCelsius(f.main.temp)
            : convertKelvinToFahrenheit(f.main.temp),
      },
    };
  });
}
