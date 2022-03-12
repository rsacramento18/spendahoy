import { Request, Response } from 'express'
import * as db from '../../db/db'
import * as query from '../../db/queries'
import { Transaction } from '../interfaces/transaction'

export const getTransactions = async (req: Request, res: Response) => {
  let rows: any;
  if(req.params.year && req.params.month) {
    ({ rows } = await db.query(query.Get_Transactions_by_year_month, [req.params.year, req.params.month]));
  }
  else if(req.params.year) {
    ({ rows } = await db.query(query.Get_Transactions_by_year, [req.params.year]));
  }
  else {
    ({ rows }  = await db.query(query.Get_Transactions, []));
  }
  res.status(200).json(rows);
};

export const getCreditTransactions = async (req: Request, res: Response) => {
  let rows: any;
  if(req.params.year && req.params.month) {
    ({ rows } = await db.query(query.Get_Credit_Transactions_by_year_month, [req.params.year, req.params.month]));
  }
  else if(req.params.year) {
    ({ rows } = await db.query(query.Get_Credit_Transactions_by_year, [req.params.year]));
  }
  else {
    ({ rows }  = await db.query(query.Get_Credit_Transactions, []));
  }
  res.status(200).json(rows);
};

export const getGroupedTransactions = async (req: Request, res: Response) => {
  let rows: any;
  if(req.params.year && req.params.month) {
    ({ rows } = await db.query(query.Get_Grouped_Categories_by_year_month, [req.params.year, req.params.month]));
  }
  else if(req.params.year) {
    ({ rows } = await db.query(query.Get_Grouped_Categories_by_year, [req.params.year]));
  }
  else {
    ({ rows }  = await db.query(query.Get_Grouped_Categories, []));
  }
  res.status(200).json(rows);
};

export const getGroupedTransactionsDescribed = async (req: Request, res: Response) => {
  let categories: any;
  let transactions: any;
  if(req.params.year && req.params.month) {
    categories = await db.query(query.Get_Grouped_Categories_by_year_month, [req.params.year, req.params.month]);
  }
  else if(req.params.year) {
    categories = await db.query(query.Get_Grouped_Categories_by_year, [req.params.year]);
  }
  else {
    categories  = await db.query(query.Get_Grouped_Categories, []);
  }

  let categoriesMapped: any = {};
  categories.rows.forEach((x: any) => {
    let transactionsBlankArr: Transaction[] = [];
    categoriesMapped[x.category_id] = {
      'category_id': x.category_id,
      'category_name': x.name,
      'sum': x.sum,
      'described': transactionsBlankArr,
    };
  });

  if(req.params.year && req.params.month) {
    transactions = await db.query(query.Get_Transactions_by_year_month, [req.params.year, req.params.month]);
  }
  else if(req.params.year) {
    transactions = await db.query(query.Get_Transactions_by_year, [req.params.year]);
  }
  else {
    transactions  = await db.query(query.Get_Transactions, []);
  }

  transactions.rows.forEach((x: any) => {
    if(x.category_id){
      categoriesMapped[x.category_id].described.push(x);
    }
  });

  res.status(200).json(categoriesMapped);
};
