import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { HourlyForecast } from '../../types/interfaces';

interface TemperatureChartProps {
    data: HourlyForecast[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
    const chartData = data.map((item) => ({
        time: new Date(item.time).getHours(),
        temperature: item.temperature,
    }));

    return (
        <section className="hourly_forecast">
            <h2>Temperature graph for the current day</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis
                        dataKey="time"
                        label={{
                            value: 'Hour',
                            position: 'insideBottomRight',
                            offset: -5,
                        }}
                    />
                    <YAxis
                        label={{
                            value: 'Temperature °C',
                            angle: -90,
                            position: 'insideLeft',
                        }}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#c52311"
                        activeDot={{ r: 6 }}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
};

export default TemperatureChart;
