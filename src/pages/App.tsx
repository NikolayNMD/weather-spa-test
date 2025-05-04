import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherHomePage from './WeatherHomePage/WeatherHomePage';
import CityDetailPage from './CityDetailPage/CityDetailPage';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/weather-spa-test"
                        element={<WeatherHomePage />}
                    />
                    <Route
                        path="/weather-spa-test/city/:cityId"
                        element={<CityDetailPage />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
