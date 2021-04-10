import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "clamp(125px, 30vw, 220px)",
    minWidth: "125px",
    border: ({ selected }) =>
      selected ? "2px solid black" : "1px solid silver",
    cursor: "pointer",
  },
});

export default function WeatherCard({
  selected,
  date,
  onClick,
  temp,
  scale,
  ...props
}) {
  const classes = useStyles({ selected });

  const onClickHandler = React.useCallback(() => {
    onClick(date);
  }, [date, onClick]);

  return (
    <Card
      data-testid="card-container"
      variant="outlined"
      className={classes.root}
      onClick={onClickHandler}
    >
      <CardContent>
        <p>
          Temp: <br />{" "}
          <b>
            {temp}
            {`°${scale.toUpperCase()}`}
          </b>
        </p>
        <p>
          Date: <br /> <b>{date}</b>
        </p>
      </CardContent>
    </Card>
  );
}
