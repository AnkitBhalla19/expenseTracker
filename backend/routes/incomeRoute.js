import incomeController from '../controllers/incomeController.js';
import express from 'express';

const incomeRoute = express();

incomeRoute.post('/add-income', incomeController.addIncome);
incomeRoute.get('/get-incomes', incomeController.getIncomes);
incomeRoute.delete('/delete-income/:id', incomeController.deleteIncome);

export default incomeRoute;
