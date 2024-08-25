import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ expenses }) => {
	const [data, setData] = useState([])

	useEffect(() => {
		if (Array.isArray(expenses) && expenses.length > 0) {
			const updatedData = []

			expenses.forEach((item) => {
				let duplicate = updatedData.find((duplicate) => duplicate.category === item.category)
				if (duplicate) {
					duplicate.amount = parseFloat(duplicate.amount) + parseFloat(item.amount)
				} else {
					updatedData.push({ ...item })
				}
			})
			console.log(updatedData)
			setData(updatedData)
		}
	}, [expenses])

	const chartData = {
		labels: data.map((expense) => expense.category),
		datasets: [
			{
				label: 'Amount',
				data: data.map((expense) => expense.amount), // Sample data
				backgroundColor: ['#a7eba0', '#f86c63', '#6193bd'], // Different colors for each bar
			},
		],
	}

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: 'Budget Overview',
			},
		},
	}

	return (
		<div className="chart-container">
			<Bar data={chartData} options={chartOptions} />
		</div>
	)
}

export default BarChart
