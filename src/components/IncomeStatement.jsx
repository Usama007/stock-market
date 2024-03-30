import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Card, CardContent, Skeleton } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const IncomeStatement = ({ earningData, earningLoading ,earningRange}) => {
    const chartData = {
        labels: earningData?.t?.map(date => new Date(date * 1000).toLocaleDateString()), // Convert Unix timestamps to date strings
        datasets: [
            {
                label: 'OPEN',
                data: earningData?.o,
                backgroundColor: 'rgba(95, 12, 132, .8)',
                borderWidth: 1,
                barThickness: 8,
            },
            {
                label: 'CLOSE',
                data: earningData?.c,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderWidth: 1,
                barThickness: 8
            },
        ],
    };

    if (earningLoading) {
        return <Skeleton variant="rectangular" width={'100%'} height={'38vh'} />;
    }

    return (
        <Card>
            <CardContent style={{ height: '38vh', overflow: 'auto' }} >
                <Bar
                    data={chartData}
                    options={{
                        indexAxis: 'x',
                        scales: {
                            x: {
                               display:false
                            },
                            y: {
                                stacked: false,
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'EPS',
                                },
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: `Last 3 Months Data`,
                                font: {
                                    size: 18,
                                }
                            },
                            legend: {
                                display: true,
                                position: 'top',
                            },
                        },
                        maintainAspectRatio: false, // To allow chart to overflow its container
                        responsive: true,
                        // Adjust height of chart container
                        layout: {
                            padding: {
                                // top: 40,
                                // bottom: 40,
                            },
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default IncomeStatement;
