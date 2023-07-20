import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import { CloudBody } from "../custom-types"
import { ChartData } from "chart.js";
import "chart.js/auto";

type Props = {
    data: CloudBody[];
};

export default ({ data }: Props) => {
    const [chartData, setChartData] = useState<ChartData<"pie", number[]>>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const chartData = {
            labels: data.map(cloud => cloud.name),
            datasets: [
                {
                    label: "Cloud services distribution",
                    data: data.map(cloud => cloud.customers),
                    backgroundColor: ['#f26b5a', '#7770cf', '#52d7de', '#87c96d', '#fcdf03'],
                    borderColor: 'white',
                    borderWidth: 1,
                }
            ]
        };
        setChartData(chartData);
    }, [data])

    return (
        <Pie data={chartData} />
    )
};
