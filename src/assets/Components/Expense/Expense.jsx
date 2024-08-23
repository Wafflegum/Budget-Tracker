import { useState, useEffect } from 'react'
import './Expense.css'

const Expense = ({ id, name, amount, category, EditExpense, DeleteExpense }) => {
	const [editMode, setEditMode] = useState(false)

	const [expenseName, setName] = useState(name || '')
	const [expenseAmount, setAmount] = useState(amount || 0)
	const [expenseCategory, setCategory] = useState(category || '')

	function FinalizeEdit(e) {
		// const prevExpenseName = expenseName
		if (e && typeof e.preventDefault === 'function') {
			e.preventDefault()
		}

		if (expenseName && expenseAmount) {
			EditExpense(id, expenseName, expenseAmount, expenseCategory)
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
									onChange={(e) => setName(e.target.value)}
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
				<div className="expense-categories">
					{editMode ? (
						<select
							autoComplete
							name="Categories"
							id="categoryInput"
							onInput={(e) => setCategory(e.target.value)}
						>
							<option value="" id="dropdownPlaceholder" disabled selected>
								Select a Category
							</option>
							<optgroup label="Essentials">
								<option value="Housing">Housing</option>
								<option value="Groceries">Groceries</option>
								<option value="Utilities">Utilities</option>
								<option value="Transportation">Transportation</option>
								<option value="Debt Payment">Debt Payment</option>
							</optgroup>
							<optgroup label="Non-essential">
								<option value="Entertainment">Entertainment</option>
								<option value="Shopping">Shopping</option>
								<option value="Dine-out">Dine-out</option>
							</optgroup>
							<optgroup label="Savings & Investments">
								<option value="Savings">Savings</option>
							</optgroup>
							<optgroup label="Miscellaneous">
								<option value="Personal Care">Personal Care</option>
								<option value="Hobbies">Hobbies</option>
								<option value="Miscellaneous">Miscellaneous</option>
							</optgroup>
						</select>
					) : (
						expenseCategory
					)}
				</div>
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
								setAmount(e.target.value)
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
