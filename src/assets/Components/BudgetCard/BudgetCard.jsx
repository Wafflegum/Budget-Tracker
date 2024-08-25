import { useEffect, useState } from 'react'
import './BudgetCard.css'

const BudgetCard = ({ title, value, EditBudget, background, textColor }) => {
	const [editMode, setEditMode] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
		setEditMode(false)
	}

	function handleEditMode() {
		if (EditBudget != null) {
			setEditMode(!editMode)
		}
	}

	return (
		<div
			className="card-container"
			style={{ background: background, color: textColor }}
			onDoubleClick={() => {
				handleEditMode()
			}}
		>
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
						<div className="budget-value">{isNaN(value) ? 0 : value}</div>
					</div>
				</div>
			)}

			{EditBudget ? (
				<div className="button-container">
					<button id="editBudgetBtn" onClick={() => handleEditMode()}>
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
