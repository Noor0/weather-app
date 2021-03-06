import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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
import { Button } from "@material-ui/core";

const defaultQuery = {
  location: "Munich,de",
  count: 40,
};

function Main() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [scale, setScale] = React.useState("c");
  const [selectedDate, selectDate] = React.useState();

  const { data, isLoading, refetch, isError, error } = useWeatherDataQuery(
    [defaultQuery.location, defaultQuery.count],
    defaultQuery,
    { retry: false }
  );

  const dayForecasts = React.useMemo(() => {
    if (!data.list) return null;
    const convertedForecasts = convertKelvinToTemperature(data.list, scale);
    return getDateToForecastMap(convertedForecasts);
  }, [data.list, scale]);

  const forecasts = React.useMemo(
    () =>
      dayForecasts
        ? getConsumableForecasts(dayForecasts).map((forecast) => {
            forecast.selected = forecast.date === selectedDate;
            return forecast;
          })
        : [],
    [dayForecasts, selectedDate]
  );

  if (isLoading) {
    return (
      <Backdrop open data-testid="loading">
        <CircularProgress />
      </Backdrop>
    );
  }

  if (isError && data?.list?.length === 0) {
    return (
      <Snackbar
        open={isError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">
          {error.message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <div className="Main">
      <Snackbar
        open={isError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">
          {error?.message}
        </Alert>
      </Snackbar>
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
        <Button onClick={() => refetch({ throwOnError: true })}>Refresh</Button>
      </div>
      <Carousel
        perPage={isSmallScreen ? 1 : 3}
        data={forecasts}
        keyExtractor={(data) => data.date}
        alwaysSelectFirstItem
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
