export default function convertKelvinToCelsius(temp) {
  return Number((temp - 273.15).toFixed(2));
}
