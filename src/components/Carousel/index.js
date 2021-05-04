import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles(() => {
  return {
    buttonsContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "space-between",
      margin: "30px 0px",
    },
    contentContainer: {
      overflowX: "auto",
      display: "flex",
      padding: "20px 3px",
      "& > *:not(:first-child)": {
        marginLeft: "20px",
      },
    },
  };
});

export default function Carousel(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);

  const startIndex = React.useMemo(() => page * props.perPage, [
    page,
    props.perPage,
  ]);

  const endIndex = React.useMemo(() => startIndex + props.perPage, [
    startIndex,
    props.perPage,
  ]);

  const totalPages = React.useMemo(
    () => props.data.length / props.perPage - 1,
    [props.data.length, props.perPage]
  );
  return (
    <>
      <div className={classes.buttonsContainer}>
        {page > 0 ? (
          <Button
            data-testid="left"
            onClick={() => setPage((page) => --page)}
            variant="outlined"
          >
            <ChevronLeftIcon fontSize="large" />
          </Button>
        ) : (
          <span />
        )}
        {page < totalPages ? (
          <Button
            data-testid="right"
            onClick={() => setPage((page) => ++page)}
            variant="outlined"
          >
            <ChevronRightIcon fontSize="large" />
          </Button>
        ) : (
          <span />
        )}
      </div>
      <div className={classes.contentContainer}>
        {props.data.slice(startIndex, endIndex).map((data, index) =>
          React.Children.map(props.children, (Child) =>
            React.cloneElement(Child, {
              ...data,
              autoSelect: index === 0 && props.alwaysSelectFirstItem,
              key: props.keyExtractor && props.keyExtractor(data),
            })
          )
        )}
      </div>
    </>
  );
}
