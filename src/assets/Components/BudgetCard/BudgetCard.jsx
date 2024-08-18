import React from 'react'
import './BudgetCard.css'

const BudgetCard = ({ title, value }) => {
	return (
		<div className="card-container">
			<div className="budget-title">{title}</div>
			<div className="budget-value">PHP {value}</div>
		</div>
	)
}

export default BudgetCard
