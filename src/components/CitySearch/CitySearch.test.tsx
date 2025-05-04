import { render, screen, fireEvent } from '@testing-library/react';
import CitySearch from './CitySearch';

describe('CitySearch', () => {
    const mockOnAddCity = jest.fn();

    beforeEach(() => {
        mockOnAddCity.mockClear();
        render(<CitySearch onAddCity={mockOnAddCity} />);
    });

    it('renders input and button', () => {
        expect(screen.getByPlaceholderText('City name')).toBeInTheDocument();
        expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('calls onAddCity with the correct city name when form is submitted', () => {
        const input = screen.getByPlaceholderText('City name');
        const button = screen.getByLabelText('Search');

        fireEvent.change(input, { target: { value: 'Lviv' } });
        fireEvent.click(button);

        expect(mockOnAddCity).toHaveBeenCalledWith('Lviv');
        expect(input).toHaveValue('');
    });

    it('does not call onAddCity when input is empty', () => {
        const button = screen.getByLabelText('Search');
        fireEvent.click(button);

        expect(mockOnAddCity).not.toHaveBeenCalled();
    });
});
