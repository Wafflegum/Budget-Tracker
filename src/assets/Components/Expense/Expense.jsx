import { useState, useEffect } from 'react'
import './Expense.css'

const Expense = ({ id, name, amount, categories, EditExpense, DeleteExpense }) => {
	const [editMode, setEditMode] = useState(false)

	const [expenseName, setExpenseName] = useState(name || '')
	const [expenseAmount, setExpenseAmount] = useState(amount || 0)

	function FinalizeEdit(e) {
		// const prevExpenseName = expenseName
		if (e && typeof e.preventDefault === 'function') {
			e.preventDefault()
		}

		if (expenseName && expenseAmount) {
			EditExpense(id, expenseName, expenseAmount)
			setEditMode(false)
		}
	}

	function handleEditMode() {
		if (expenseName && expenseAmount) {
			setEditMode(!editMode)
		} else {
			setEditMode(true)
			alert('All fields must be filled')
		}
	}

	function handleDelete() {
		console.log('deleted ' + id)
		DeleteExpense(id)
	}

	useEffect(() => {
		if (!name) setEditMode(true)
	}, [name])

	return (
		<div className="expense-container">
			<div className="expense-main-content">
				<div className="expense-info">
					<form className="expense-name" onSubmit={(e) => FinalizeEdit(e)}>
						{editMode ? (
							<div className="input-container">
								<input
									autoFocus
									type="text"
									name=""
									id="nameInput"
									placeholder={expenseName ? expenseName : 'Name'}
									onChange={(e) => setExpenseName(e.target.value)}
								/>
							</div>
						) : (
							expenseName
						)}
					</form>
					<div className="button-container">
						<button id="deleteBtn" onClick={handleDelete}>
							<img src="./delete-icon.svg" alt="" />
						</button>
						<button id="editBtn" onClick={() => handleEditMode()}>
							<img src="./edit-icon.svg" alt="" />
						</button>
					</div>
				</div>
				<div className="expense-categories">Pleasure</div>
			</div>
			<form className="expense-amount" onSubmit={(e) => FinalizeEdit(e)}>
				{editMode ? (
					<div className="input-container">
						<span>PHP</span>
						<input
							type="number"
							name=""
							id="amountInput"
							placeholder={expenseAmount}
							onChange={(e) => {
								setExpenseAmount(e.target.value)
							}}
						/>
					</div>
				) : (
					`PHP ${expenseAmount}`
				)}
			</form>
		</div>
	)
}

export default Expense
