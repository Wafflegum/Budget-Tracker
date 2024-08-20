import { useState } from 'react'
import './BudgetCard.css'

const BudgetCard = ({ title, value, EditBudget }) => {
	const [editMode, setEditMode] = useState(false)
	return (
		<div className="card-container">
			{editMode ? (
				<div className="info">
					<div className="budget-title">{title}</div>
					<div className="budget-value">
						PHP <input type="text" name="Budget Amount" id="budgetAmountInput" />
					</div>
				</div>
			) : (
				<div className="info">
					<div className="budget-title">{title}</div>
					<div className="budget-value">PHP {value}</div>
				</div>
			)}

			{EditBudget ? (
				<div className="actions">
					<button id="editBudgetBtn" onClick={() => setEditMode(!editMode)}>
						Edit
					</button>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default BudgetCard
