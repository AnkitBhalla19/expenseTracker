import expenseController from '../controllers/expenseController.js';
import express from 'express';

const expenseRoute= express();

expenseRoute.post('/add-expense', expenseController.addExpense)
expenseRoute.get('/get-expenses', expenseController.getExpense)
expenseRoute.delete('/delete-expense/:id', expenseController.deleteExpense);

export default expenseRoute;

