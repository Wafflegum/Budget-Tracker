import { useState, useEffect } from 'react'
import './Expense.css'

const Expense = ({ name, amount, categories, EditExpense }) => {
	const [editMode, setEditMode] = useState(false)

	const [expenseName, setExpenseName] = useState('')

	function FinalizeEdit(e) {
		e.preventDefault()
		edit()
		setEditMode(false)
	}

	useEffect(() => {
		setEditMode(true)
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
									placeholder={name}
									value={expenseName}
									onChange={(e) => setExpenseName(e.target.value)}
								/>
							</div>
						) : (
							expenseName
						)}
					</form>
					<div className="button-container">
						<button id="deleteBtn">
							<img src="./delete-icon.svg" alt="" />
						</button>
						<button id="editBtn" onClick={() => setEditMode(!editMode)}>
							<img src="./edit-icon.svg" alt="" />
						</button>
					</div>
				</div>
				<div className="expense-categories">Pleasure</div>
			</div>
			<div className="expense-amount">
				{editMode ? (
					<div className="input-container">
						<span>PHP</span>
						<input type="number" name="" id="amountInput" placeholder={amount} />
					</div>
				) : (
					`PHP ${amount}`
				)}
			</div>
		</div>
	)
}

export default Expense
