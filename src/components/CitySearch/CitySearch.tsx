import React, { useState } from 'react';
import './CitySearch.scss';

interface CitySearchProps {
    onAddCity: (cityName: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onAddCity }) => {
    const [cityName, setCityName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cityName.trim()) {
            onAddCity(cityName.trim());
            setCityName('');
        }
    };

    return (
        <form className="city_search_form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="City name"
            />
            <button type="submit">Search &#x1F50E;&#xFE0E;</button>
        </form>
    );
};

export default CitySearch;
