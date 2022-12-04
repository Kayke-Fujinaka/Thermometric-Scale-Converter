enum Temperature {
  celsius = "celsius",
  kelvin = "kelvin",
  fahrenheit = "fahrenheit",
}

interface TemperatureConverter {
  temperature: number;
  scale: Temperature;
  scaleToConvert: Temperature;
}

interface Conditions {
  [key: string]: (temperature: number) => false | number;
}

function temperatureConverter({
  temperature,
  scale,
  scaleToConvert,
}: TemperatureConverter) {
  const conversions: Conditions = {
    kelvinToCelsius: () =>
      scale === "kelvin" && scaleToConvert === "celsius"
        ? Number((temperature - 273).toFixed(2))
        : false,
    kelvinToFahrenheit: () =>
      scale === "kelvin" && scaleToConvert === "fahrenheit"
        ? Number(((temperature - 273) * 1.8 + 32).toFixed(2))
        : false,
    celsiusToKelvin: () =>
      scale === "celsius" && scaleToConvert === "kelvin"
        ? Number((temperature + 273).toFixed(2))
        : false,
    celsiusToFahrenheit: () =>
      scale === "celsius" && scaleToConvert === "fahrenheit"
        ? Number((temperature * 1.8 + 32).toFixed(2))
        : false,
    fahrenheitToCelsius: () =>
      scale === "fahrenheit" && scaleToConvert === "celsius"
        ? Number(((temperature - 32) / 1.8).toFixed(2))
        : false,
    fahrenheitToKelvin: () =>
      scale === "fahrenheit" && scaleToConvert === "kelvin"
        ? Number((((temperature - 32) * 5) / 9 + 273).toFixed(2))
        : false,
  };

  const temperatureConverted = Object.keys(conversions).reduce((acc, value) => {
    const convert = conversions[value](temperature);
    return !convert ? acc : (acc = convert);
  }, 0);

  return { [scale]: temperature, [scaleToConvert]: temperatureConverted };
}

console.log(
  temperatureConverter({
    temperature: 303,
    scale: Temperature.fahrenheit,
    scaleToConvert: Temperature.celsius,
  })
);
