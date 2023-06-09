import React, { useState, useEffect } from "react";
import LocationDetails from "./LocationDetails";
import ForecastSummaries from "./ForecastSummaries";
import ForecastDetails from "./ForecastDetails";
import getForecast from "../requests/getForecast";
import SearchForm from "./SearchForm";

import "../styles/App.css";

function App() {
  const [forecasts, setForecasts] = useState([]);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [selectedDate, setSelectedDate] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedForecast = forecasts.find(
    (forecast) => forecast.date === selectedDate,
  );
  // initial render
  const dateProp = selectedForecast?.date;
  const temperatureProp = selectedForecast?.temperature;
  const humidityProp = selectedForecast?.humidity;
  const windProp = selectedForecast?.wind;
  const handleForecastSelect = (date) => {
    setSelectedDate(date);
  };

  const handleCitySearch = () => {
    if (searchText === "") {
      setSelectedDate(0);
    } else {
      getForecast(searchText, setSelectedDate, setForecasts, setLocation, setErrorMessage);
    }
  };

  useEffect(() => {
    getForecast("", setSelectedDate, setForecasts, setLocation, setErrorMessage);
  }, []);

  return (
    <div className="weather-app">
      <div className="location-details" data-testid="location-details">
        <LocationDetails
          city={location.city}
          country={location.country}
          errorMessage={errorMessage}
        />
      </div>
      <div className="search-form" data-testid="search-form">
        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
          handleCitySearch={handleCitySearch}
        />
      </div>
      {!errorMessage && (
        <>
          <div className="forecast-summaries-app" data-testid="forecast-summaries">
            <ForecastSummaries
              forecasts={forecasts}
              onForecastSelect={handleForecastSelect}
            />
          </div>
          <div className="forecast-details" data-testid="forecast-details">
            {selectedForecast && (
            <ForecastDetails
              forecast={selectedForecast}
              date={dateProp}
              temperature={temperatureProp}
              humidity={humidityProp}
              wind={windProp}
            />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
