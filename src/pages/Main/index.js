import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import WeatherCard from "components/WeatherCard";
import Carousel from "components/Carousel/index.js";
import WeatherBarChart from "components/WeatherBarChart/index.js";

import useWeatherDataQuery from "hooks/api/useWeatherDataQuery";

import {
  getDateToForecastMap,
  getConsumableForecasts,
  convertKelvinToTemperature,
} from "./transformers";

import "./Main.css";

const defaultQuery = {
  location: "Munich,de",
  count: 40,
};

function Main() {
  const [scale, setScale] = React.useState("c");
  const [selectedDate, selectDate] = React.useState();

  const { data, isLoading } = useWeatherDataQuery(
    [defaultQuery.location, defaultQuery.count],
    defaultQuery
  );

  const dayForecasts = React.useMemo(() => {
    const convertedForecasts = convertKelvinToTemperature(data.list, scale);
    return getDateToForecastMap(convertedForecasts);
  }, [data.list, scale]);

  const forecasts = React.useMemo(
    () =>
      getConsumableForecasts(dayForecasts).map((forecast) => {
        forecast.selected = forecast.date === selectedDate;
        return forecast;
      }),
    [dayForecasts, selectedDate]
  );

  if (isLoading) {
    return (
      <Backdrop open data-testid="loading">
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <div className="Main">
      <div className="buttons-container">
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="c"
          onChange={(e) => setScale(e.target.value)}
        >
          <FormControlLabel
            value="c"
            control={<Radio color="primary" />}
            label="Celsius"
          />
          <FormControlLabel
            value="f"
            control={<Radio color="primary" />}
            label="Fahrenheit"
          />
        </RadioGroup>
      </div>
      <Carousel
        perPage={3}
        data={forecasts}
        keyExtractor={(data) => data.date}
      >
        <WeatherCard scale={scale} onClick={selectDate} />
      </Carousel>
      {selectedDate in dayForecasts ? (
        <WeatherBarChart scale={scale} data={dayForecasts[selectedDate]} />
      ) : null}
    </div>
  );
}

export default Main;
