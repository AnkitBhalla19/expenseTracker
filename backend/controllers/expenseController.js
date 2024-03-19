import ExpenseSchema from "../models/expenseModel.js";

const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(expense);
};

const getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);
        if (deletedExpense) {
            res.status(200).json({ message: 'Expense Deleted' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default{ addExpense,deleteExpense,getExpense};
