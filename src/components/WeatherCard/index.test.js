import { fireEvent, render, screen } from "@testing-library/react";
import WeatherCard from "./";

describe("<WeatherCard />", () => {
  const date = "2021-04-04 12:00:00";
  test("displays date", () => {
    render(<WeatherCard date={date} temp={20} scale="c" />);
    expect(screen.queryByText(date)).not.toBeNull();
  });

  test("displays temperature with unit", () => {
    const { rerender } = render(
      <WeatherCard date={date} temp={20} scale="c" />
    );
    expect(screen.queryByText(/20.C/)).not.toBeNull();

    rerender(<WeatherCard date={date} temp={20} scale="F" />);
    expect(screen.queryByText(/20.F/)).not.toBeNull();
  });

  test("calls onClick with data", () => {
    const onClick = jest.fn();
    render(<WeatherCard date={date} temp={20} scale="c" onClick={onClick} />);
    fireEvent.click(screen.getByTestId(date));
    expect(onClick).toBeCalledWith(date);
  });
});
