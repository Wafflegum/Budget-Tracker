import { useEffect, useState } from 'react'

import './App.css'
import BudgetCard from './assets/Components/BudgetCard/BudgetCard'
import './assets/Components/BudgetCard/BudgetCard'
import Expense from './assets/Components/Expense/Expense'
import PieChart from './assets/Components/PieChart/PieChart'

function App() {
	const [budget, setBudget] = useState(0)
	const [totalExpenses, setTotalExpenses] = useState(0)
	const [remainingBudget, setRemainingBudget] = useState(0)

	const [expensesData, setExpensesData] = useState([])

	function SetBudget(amount) {
		setBudget(parseFloat(amount))
		Save(null, amount)
	}

	function Save(expenseList, updatedBudget) {
		if (expenseList) {
			const jsonExpenseData = JSON.stringify(expenseList)
			localStorage.setItem('expenses', jsonExpenseData)
		}

		const validatedBudget = updatedBudget != null ? updatedBudget : budget // this will check if the updatedBudget parameter is null or not. If it's null, assign the budget useState value
		// const validatedBudget = typeof updatedBudget !== 'undefined' ? updatedBudget : budget

		// * Above is the same as implemented. Shortened as I don't see any problem with it. Though I didn't search anything regarding it lol

		const budgetSummary = JSON.stringify({ budget: validatedBudget, totalExpenses, remainingBudget })
		localStorage.setItem('budgetSummary', budgetSummary)
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
			setTotalExpenses(data.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0))
		}
		setRemainingBudget(parseFloat(budget) - parseFloat(totalExpenses))
	}

	function handleDeleteExpense(id) {
		const updatedExpenseList = expensesData.filter((expense) => expense.id !== id)
		setExpensesData(updatedExpenseList)
		Calculate(updatedExpenseList)
		Save(updatedExpenseList)
	}

	function CreateNewExpense() {
		const newExpense = { id: crypto.randomUUID(), name: '', amount: 0, category: '' }

		setExpensesData((prevExpenses) => [...prevExpenses, newExpense])
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

			<div className="main-content">
				<section>
					<div className="budget-container">
						<BudgetCard title={'Total Budget'} value={budget} EditBudget={SetBudget} />
						<BudgetCard
							title={'Remaining Budget'}
							value={remainingBudget}
							background={remainingBudget <= 0 ? 'var(--warning-budget)' : 'var(--secondary-background)'}
							textColor={remainingBudget <= 0 ? '#c24242' : 'inherit'}
						/>
						<BudgetCard title={'Total Expenses'} value={totalExpenses} />
					</div>
					<div className="budget-charts">
						<PieChart title="Expense Overview" importData={expensesData} />
						<PieChart
							title="Budget Overview"
							importData={[
								{
									category: 'Total Expenses',
									amount: totalExpenses,
								},
								{
									category: 'Remaining Budget',
									amount: remainingBudget,
								},
							]}
						/>
					</div>
				</section>
				<div className="main-content">
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
				</div>
			</div>
		</main>
	)
}

export default App
