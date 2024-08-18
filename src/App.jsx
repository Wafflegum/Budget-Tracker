import { useEffect, useState } from 'react'

import './App.css'
import BudgetCard from './assets/Components/BudgetCard/BudgetCard'
import './assets/Components/BudgetCard/BudgetCard'
import Expense from './assets/Components/Expense/Expense'
function App() {
	const [expensesData, setExpensesData] = useState([])

	const [newExpense, setNewExpense] = useState({})

	function CreateNewExpense() {
		setNewExpense({ name: '', amount: '' })

		setExpensesData((prevExpenses) => [...prevExpenses, { name: '', amount: '' }])
		// expensesData.length > 0 ? setExpensesData([...expensesData, newExpense]) : setExpensesData([newExpense])
	}

	function EditExpense(name, amount) {
		const jsonExpenseData = JSON.stringify(expensesData)
		localStorage.setItem('expenses', jsonExpenseData)
	}

	function LoadExpenses() {
		if (JSON.parse(localStorage.getItem('expenses') !== null)) {
			const jsonExpenseData = JSON.parse(localStorage.getItem('expenses'))
			setExpensesData(jsonExpenseData)
		}
	}

	useEffect(() => {
		LoadExpenses()
	}, [])

	return (
		<main>
			<h1>Budget Tracker</h1>
			<div className="budget-container">
				<BudgetCard title={'Total Budget'} value={'15,000'} />
				<BudgetCard title={'Total Expenses'} value={'15,000'} />
				<BudgetCard title={'Remaining Budget'} value={'15,000'} />
			</div>

			<div className="expense-list-container">
				<header>
					<button id="addExpense" onClick={CreateNewExpense}>
						Add Expense
					</button>
				</header>

				{expensesData
					? expensesData.map((expense, index) => {
							return (
								<Expense
									key={index}
									name={expense.name}
									amount={expense.amount}
									categories={expense.categories}
									EditExpense={EditExpense}
								/>
							)
					  })
					: ''}
			</div>
		</main>
	)
}

export default App
