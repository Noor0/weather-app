import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Carousel from "./";

describe("<Carousel />", () => {
  const data = [
    { data: "awesome component data 1" },
    { data: "awesome component data 2" },
    { data: "awesome component data 3" },
    { data: "awesome component data 4" },
    { data: "awesome component data 5" },
  ];
  const TestComponent = (props) => <p>{props.data}</p>;

  test("displays correct number of elements per page", () => {
    let perPage = 2;
    const { rerender } = render(
      <Carousel perPage={perPage} data={data}>
        <TestComponent />
      </Carousel>
    );
    expect(screen.queryAllByText(/awesome component data ./).length).toBe(
      perPage
    );

    perPage = 4;
    rerender(
      <Carousel perPage={perPage} data={data}>
        <TestComponent />
      </Carousel>
    );
    expect(screen.queryAllByText(/awesome component data ./).length).toBe(
      perPage
    );
  });

  describe("displays arrows if there's data to scroll", () => {
    test("shows right arrow if not on last page", () => {
      render(
        <Carousel perPage={2} data={data}>
          <TestComponent />
        </Carousel>
      );
      expect(screen.queryByTestId("right")).not.toBeNull();
    });
    test("hides right arrow on last page", () => {
      render(
        <Carousel perPage={data.length} data={data}>
          <TestComponent />
        </Carousel>
      );
      expect(screen.queryByTestId("right")).toBeNull();
    });
    test("hides left arrow on first page", () => {
      render(
        <Carousel perPage={2} data={data}>
          <TestComponent />
        </Carousel>
      );
      expect(screen.queryByTestId("left")).toBeNull();
    });
    test("shows left arrow on last page", () => {
      render(
        <Carousel perPage={2} data={data}>
          <TestComponent />
        </Carousel>
      );
      fireEvent.click(screen.getByTestId("right"));
      expect(screen.queryByTestId("left")).not.toBeNull();
    });
  });

  test("scrolls through data correctly", () => {
    render(
      <Carousel perPage={2} data={data}>
        <TestComponent />
      </Carousel>
    );
    expect(screen.queryByText(/data 1/g)).not.toBeNull();
    expect(screen.queryByText(/data 2/g)).not.toBeNull();

    fireEvent.click(screen.getByTestId("right"));
    expect(screen.queryByText(/data 3/g)).not.toBeNull();
    expect(screen.queryByText(/data 4/g)).not.toBeNull();
    
    fireEvent.click(screen.getByTestId("left"));
    expect(screen.queryByText(/data 1/g)).not.toBeNull();
    expect(screen.queryByText(/data 2/g)).not.toBeNull();
  });
});
