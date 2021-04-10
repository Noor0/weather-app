import convertKelvinToFahrenheit from "../convertKelvinToFahrenheit";

test("converts kelvin to fahrenheit", () => {
  expect(convertKelvinToFahrenheit(458)).toBe(364.73);
  expect(convertKelvinToFahrenheit(252)).toBe(-6.07);
});
