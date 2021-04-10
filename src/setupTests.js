// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { enableMocks } from "jest-fetch-mock";
enableMocks();

process.env.REACT_APP_OPEN_WEATHER_KEY = "OPEN_WEATHER_API_KEY";
