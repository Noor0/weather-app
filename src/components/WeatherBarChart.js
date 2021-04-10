import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import format from "date-fns/format";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    margin: "40px 0px",
  },
}));

const getTimeIn12HourFormat = (data) => format(new Date(data), "h:mm aa");

export default function WeatherBarChart({
  color = "primary",
  data,
  scale,
  ...props
}) {
  const classes = useStyles();
  const { palette } = useTheme();
  const unitSuffix = React.useMemo(() => "°" + scale.toUpperCase(), [scale]);

  return (
    <ResponsiveContainer width="90%" height={250}>
      <BarChart
        className={classes.root}
        data={data}
        margin={{ right: 20, left: -10 }}
        maxBarSize={20}
      >
        <Tooltip
          formatter={(temp) => temp + unitSuffix}
          labelFormatter={getTimeIn12HourFormat}
        />
        <YAxis dataKey="temp" unit={unitSuffix} />
        <XAxis
          dataKey="dt_txt"
          tickFormatter={getTimeIn12HourFormat}
          interval={0}
        />
        <Bar dataKey="temp" fill={palette[color].main} />
        <ReferenceLine y={0} />
      </BarChart>
    </ResponsiveContainer>
  );
}
