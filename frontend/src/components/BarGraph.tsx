import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { StockBody } from "../custom-types"
import { ChartData } from "chart.js";
import "chart.js/auto";

type Props = {
    data: StockBody[]
};

export default ({ data }: Props) => {
    const [chartData, setChartData] = useState<ChartData<"bar", number[]>>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const chartData = {
            labels: data.map(stock => stock.name),
            datasets: [
                {
                    label: '',
                    data: data.map(stock => stock.value),
                    backgroundColor: ['#f26b5a', '#7770cf', '#52d7de', '#87c96d', '#fcdf03'],
                    borderColor: 'white',
                    borderWidth: 1,
                }
            ]
        };
        setChartData(chartData);
    }, [data])

    return (
        <Bar data={chartData} />
    )
};
