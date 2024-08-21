import { useState } from 'react'
import './BudgetCard.css'

const BudgetCard = ({ title, value, EditBudget }) => {
	const [editMode, setEditMode] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
		setEditMode(false)
	}

	return (
		<div className="card-container">
			{editMode ? (
				<div className="info">
					<div className="budget-title">{title}</div>
					<form className="budget-input-container" onSubmit={(e) => handleSubmit(e)}>
						<div>PHP </div>
						<input
							autoFocus
							type="number"
							name="Budget Amount"
							id="budgetAmountInput"
							placeholder={value}
							onChange={(e) => EditBudget(e.target.value)}
						/>
					</form>
				</div>
			) : (
				<div className="info">
					<div className="budget-title">{title}</div>
					<div className="budget-value-container">
						<div>PHP</div>
						<div className="budget-value">{value}</div>
					</div>
				</div>
			)}

			{EditBudget ? (
				<div className="button-container">
					<button id="editBudgetBtn" onClick={() => setEditMode(!editMode)}>
						<img src="./edit-icon.svg" alt="" />
					</button>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default BudgetCard
