import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ expenseData }) => {
	const [categoryLabelList, setCategoryLabelList] = useState([])
	const [values, setValues] = useState([])

	useEffect(() => {
		if (expenseData.length > 0) {
			const categoryLabel = expenseData.map((expense) => {
				return expense.category
			})
			const extractedValues = expenseData.map((expense) => {
				return expense.amount
			})

			setCategoryLabelList(categoryLabel)
			setValues(extractedValues)
		}
	}, [expenseData])

	const data = {
		labels: categoryLabelList,
		datasets: [
			{
				label: 'Amount',
				data: values, // Sample data
				backgroundColor: ['#a7eba0', '#f86c63', '#6193bd'], // Different colors for each bar
			},
		],
	}

	const options = {
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
			<Bar data={data} options={options} />
		</div>
	)
}

export default BarChart
