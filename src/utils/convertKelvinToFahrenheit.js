export default function convertKelvinToFahrenheit(temp){
  return Number(((temp - 273.15) * (9 / 5) + 32).toFixed(2));
}