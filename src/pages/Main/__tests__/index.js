import {
  render,
  screen,
  waitFor,
  queryByText,
  getByTestId,
  queryByLabelText,
  fireEvent,
} from "@testing-library/react";
import convertKelvinToCelsius from "utils/convertKelvinToCelsius";
import convertKelvinToFahrenheit from "utils/convertKelvinToFahrenheit";

import wrapper from "utils/test/ReactQueryClientProvider";

import Main from "../";

import WeatherBarChart from "components/WeatherBarChart";
jest.mock("components/WeatherBarChart");

describe("<Main /> Page", () => {
  const getRegexForTemperatureCurry = (converter) => (...temps) => {
    const averageTemp = converter(
      temps.reduce((t, n) => t + n, 0) / temps.length
    ).toString();
    return new RegExp("^" + averageTemp);
  };

  const mockData = {
    list: [
      { dt_txt: "2021-04-04 12:00:00", main: { temp: 300 } },
      { dt_txt: "2021-04-04 00:00:00", main: { temp: 400 } },

      { dt_txt: "2021-04-05 12:00:00", main: { temp: 300 } },
      { dt_txt: "2021-04-05 00:00:00", main: { temp: 600 } },

      { dt_txt: "2021-04-06 12:00:00", main: { temp: 300 } },
      { dt_txt: "2021-04-06 12:00:00", main: { temp: 900 } },

      { dt_txt: "2021-04-07 00:00:00", main: { temp: 400 } },
      { dt_txt: "2021-04-07 00:00:00", main: { temp: 400 } },
    ],
  };

  const getAvgTempFromKelvinToCelsius = getRegexForTemperatureCurry(
    convertKelvinToCelsius
  );
  const getAvgTempFromKelvinToFahrenheit = getRegexForTemperatureCurry(
    convertKelvinToFahrenheit
  );

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(mockData));
  });

  test("shows loading screen", () => {
    render(<Main />, { wrapper });
    expect(screen.queryByTestId("loading")).not.toBeNull();
  });

  test("shows avg temperature for each day in response", async () => {
    render(<Main />, { wrapper });

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const card1 = screen.queryByTestId("2021-04-04");
    expect(card1).not.toBeNull();
    expect(
      queryByText(card1, getAvgTempFromKelvinToCelsius(300, 400))
    ).not.toBeNull();

    const card2 = screen.queryByTestId("2021-04-05");
    expect(card2).not.toBeNull();
    expect(
      queryByText(card2, getAvgTempFromKelvinToCelsius(300, 600))
    ).not.toBeNull();

    const card3 = screen.queryByTestId("2021-04-06");
    expect(card3).not.toBeNull();
    expect(
      queryByText(card3, getAvgTempFromKelvinToCelsius(300, 900))
    ).not.toBeNull();
  });

  test("shows chart on selecting day", async () => {
    render(<Main />, { wrapper });

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    fireEvent.click(screen.queryByTestId("2021-04-04"));

    let chart = screen.queryByTestId("chart");
    expect(getByTestId(chart, "2021-04-04 12:00:00")).not.toBeNull();
    expect(getByTestId(chart, "2021-04-04 00:00:00")).not.toBeNull();

    fireEvent.click(screen.queryByTestId("2021-04-05"));
    expect(getByTestId(chart, "2021-04-05 12:00:00")).not.toBeNull();
    expect(getByTestId(chart, "2021-04-05 00:00:00")).not.toBeNull();
  });

  test("switches between celsius and fahrenheit scale", async () => {
    render(<Main />, { wrapper });

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    fireEvent.click(screen.queryByLabelText("Fahrenheit"));
    const card = screen.queryByTestId("2021-04-04");
    expect(
      queryByText(card, getAvgTempFromKelvinToFahrenheit(300, 400))
    ).not.toBeNull();

    fireEvent.click(screen.queryByLabelText("Celsius"));
    expect(
      queryByText(card, getAvgTempFromKelvinToCelsius(300, 400))
    ).not.toBeNull();
  });
});
