import convertKelvinToCelsius from "../convertKelvinToCelsius";

test("converts kelvin to celsius", () => {
  expect(convertKelvinToCelsius(280)).toBe(6.85);
  expect(convertKelvinToCelsius(252)).toBe(-21.15);
});
