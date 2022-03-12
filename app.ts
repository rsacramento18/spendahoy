import 'dotenv/config'
import express, { Response } from 'express'
import * as importRoutes from './src/routes/import.routes'
import * as transactionRoutes from './src/routes/transactions.routes'
import * as categoriesRoutes from './src/routes/categories.routes'
import upload from './src/middlewares/multer'

const app = express();
const port = process.env.port || 8000;

app.get('/api/check', (response: Response) => {
  response.status(200).json('alive');
});

app.post('/api/import/:format/:id', upload.single('importExpenses'), importRoutes.importExpenses);

app.get('/api/transactions/:year?/:month?', transactionRoutes.getTransactions);
app.get('/api/transactionscredit/:year?/:month?', transactionRoutes.getCreditTransactions);
app.get('/api/transactionsgrouped/:year?/:month?', transactionRoutes.getGroupedTransactions);
app.get('/api/transactionsgroupeddescribed/:year?/:month?', transactionRoutes.getGroupedTransactionsDescribed);

app.get('/api/categories', categoriesRoutes.getCategories);
app.get('/api/categoriesrules', categoriesRoutes.getCategoriesRules);

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
