import { renderHook } from "@testing-library/react-hooks";

import useWeatherDataQuery from "../useWeatherDataQuery";
import wrapper from "utils/test/ReactQueryClientProvider";

const mockData = {
  list: [{ dt_text: "2020-08-04 18:00:00", main: { temp: 277 } }],
};

beforeEach(() => {
  fetch.resetMocks();
});

test("returns correct default data", () => {
  fetch.mockResponse("{}");
  const { result, unmount } = renderHook(
    () => useWeatherDataQuery([]),
    {
      wrapper,
    }
  );
  expect(result.current.isLoading).toBe(true);
  expect(result.current.data).toEqual({ list: [] });
  unmount();
});

test("calls weather api with right query params", async () => {
  fetch.mockResponse(JSON.stringify(mockData));

  const { result, waitFor } = renderHook(
    () => useWeatherDataQuery([], { location: "DAMN_LOCATION", count: 99 }),
    { wrapper }
  );

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("http://api.openweathermap.org/data/2.5/forecast")
  );
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining("cnt=99"));
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("q=DAMN_LOCATION")
  );
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("APPID=" + process.env.REACT_APP_OPEN_WEATHER_KEY)
  );
  await waitFor(() => expect(result.current.data).toEqual(mockData));
});
