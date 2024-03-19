import IncomeSchema from "../models/incomeModel.js";

const addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new IncomeSchema({
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
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(income);
};

const getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedIncome = await IncomeSchema.findByIdAndDelete(id);
        if (deletedIncome) {
            res.status(200).json({ message: 'Income Deleted' });
        } else {
            res.status(404).json({ message: 'Income not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default{deleteIncome,addIncome,getIncomes};
