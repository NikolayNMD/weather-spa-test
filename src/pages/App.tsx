import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherHomePage from './WeatherHomePage/WeatherHomePage';
// import CityDetailPage from './CityDetailPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<WeatherHomePage />} />
                    {/* <Route path="/city/:cityId" element={<CityDetailPage />} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
