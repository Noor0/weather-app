import React from "react";

export default function useResizeObserver() {
  const [state, setState] = React.useState({});
  const { current: observer } = React.useRef(
    new ResizeObserver((entries) => {
      setState(entries[0].contentRect);
    })
  );
  return [state, observer];
}
