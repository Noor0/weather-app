export default (props) => {
  return (
    <div data-testid="chart">
      <p data-testid="scale">scale = {props.scale}</p>
      {props.data.map((forecast) => (
        <div key={forecast.dt_txt}>
          <p data-testid={forecast.dt_txt}>{forecast.dt_txt}</p>
          <p data-testid={forecast.temp}>{forecast.temp}</p>
        </div>
      ))}
    </div>
  );
};
