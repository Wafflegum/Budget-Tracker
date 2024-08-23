import { useEffect, useState } from 'react'

import './App.css'
import BudgetCard from './assets/Components/BudgetCard/BudgetCard'
import './assets/Components/BudgetCard/BudgetCard'
import Expense from './assets/Components/Expense/Expense'

function App() {
	const [budget, setBudget] = useState(0)
	const [totalExpenses, setTotalExpenses] = useState(0)
	const [remainingBudget, setRemainingBudget] = useState(0)

	const [expensesData, setExpensesData] = useState([])

	function SetBudget(amount) {
		setBudget(parseFloat(amount))
		console.log(budget)
		Save(null, amount)
	}

	function LoadExpenses() {
		const storedExpenses = localStorage.getItem('expenses')
		const storedBudgetSummary = localStorage.getItem('budgetSummary')

		if (storedExpenses != null) {
			const jsonExpenseData = JSON.parse(storedExpenses)
			setExpensesData(jsonExpenseData)
		}
		if (storedBudgetSummary != null) {
			const jsonBudgetSummary = JSON.parse(storedBudgetSummary)
			setBudget(jsonBudgetSummary.budget)
			setTotalExpenses(jsonBudgetSummary.totalExpenses)
			setRemainingBudget(jsonBudgetSummary.remainingBudget)
		}
	}
	useEffect(() => {
		LoadExpenses()
	}, [])

	useEffect(() => {
		Calculate(expensesData)
	}, [expensesData, Calculate])

	// Calculates all the budget and expenses
	function Calculate(data) {
		if (typeof data != 'undefined') {
			setTotalExpenses(data.reduce((total, expense) => total + parseFloat(expense.amount), 0))
		}
		setRemainingBudget(parseFloat(budget) - parseFloat(totalExpenses))
	}

	function handleDeleteExpense(id) {
		const updatedExpenseList = expensesData.filter((expense) => expense.id !== id)
		setExpensesData(updatedExpenseList)
		Calculate(updatedExpenseList)
	}

	function CreateNewExpense() {
		const newExpense = { id: crypto.randomUUID(), name: '', amount: 0, categories: [] }

		setExpensesData((prevExpenses) => [...prevExpenses, newExpense])

		setNewExpense(null)
	}

	function Save(expenseList, updatedBudget) {
		if (expenseList) {
			const jsonExpenseData = JSON.stringify(expenseList)
			localStorage.setItem('expenses', jsonExpenseData)
		}
		const budgetSummary = JSON.stringify({ budget: updatedBudget, totalExpenses, remainingBudget })
		localStorage.setItem('budgetSummary', budgetSummary)
	}

	function handleEditExpense(id, name, amount, category) {
		setExpensesData((prevExpensesData) => {
			const updatedExpenseList = prevExpensesData.map((expense) => {
				return expense.id === id ? { ...expense, name, amount, category } : expense
			})
			Calculate(updatedExpenseList)

			Save(updatedExpenseList)
			return updatedExpenseList
		})

		// if (expensesData.find((expense) => expense.id === id)) {
		// 	let expense = expensesData.find((expense) => expense.id === id)
		// 	expense.name = name
		// 	expense.amount = amount
		// }
	}

	return (
		<main>
			<h1>Budget Tracker</h1>
			<div className="budget-container">
				<BudgetCard title={'Total Budget'} value={budget} EditBudget={SetBudget} />
				<BudgetCard title={'Total Expenses'} value={totalExpenses} />
				<BudgetCard title={'Remaining Budget'} value={remainingBudget} />
			</div>

			<div className="expense-list-container">
				<header>
					<button id="addExpense" onClick={CreateNewExpense}>
						Add Expense
					</button>
				</header>

				{expensesData
					? expensesData.map((expense) => {
							return (
								<Expense
									key={expense.id}
									id={expense.id}
									name={expense.name}
									amount={expense.amount}
									category={expense.category}
									EditExpense={handleEditExpense}
									DeleteExpense={handleDeleteExpense}
								/>
							)
					  })
					: ''}
			</div>
		</main>
	)
}

export default App
