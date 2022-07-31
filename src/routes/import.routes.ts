import { Request, Response } from 'express'
import * as db from '../../db/db'
import * as query from '../../db/queries'
import { Organization } from '../interfaces/organization'
import { Expense } from '../helpers/expense'
import { writeTransactions } from '../helpers/writeTransactions'

export const importExpenses = async (req: Request, res: Response) => {

  const format: string = req.params.type;
  const id: string = req.params.id;

  const { rows } = await db.query(query.Get_Organization, [id]);
  const organization: Organization = rows[0];

  if(!organization) res.status(500).send('No organization found');
  if(!req.file) res.status(500).send('No file available');

  const expense = new Expense(organization, req.file);
  await expense.parseDocument();
  writeTransactions(organization.id, expense.transactions);
  res.status(200).json(expense.transactions);
};

