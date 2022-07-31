import { Request, Response } from 'express'
import * as db from '../../db/db'
import * as query from '../../db/queries'
import { Transaction } from '../interfaces/transaction'

export const getTransactions = async (req: Request, res: Response) => {
  let rows: any;
  const year: string = req.query.year as string;
  const month: string = req.query.month as string;

  if(year && month) {
    ({ rows } = await db.query(query.Get_Transactions_by_year_month, [year, month]));
  }
  else if(year) {
    ({ rows } = await db.query(query.Get_Transactions_by_year, [year]));
  }
  else {
    ({ rows }  = await db.query(query.Get_Transactions, []));
  }

  const transactions = rows.map((row: any) => {
    return ({
      "id": row.transaction_id,
      "date" : row.date,
      "description": row.description,
      "value": row.value,
      "type": row.type,
      "organizationName": row.name,
      "categoryId": row.category_id,
      "categoryName": row.category,
      "review": row.review,
      "isDeleted": row.isdeleted
    });
  });
  res.status(200).json(transactions);
};

export const getCreditTransactions = async (req: Request, res: Response) => {
  let rows: any;
  const year: string = req.query.year as string;
  const month: string = req.query.month as string;

  if(year && month) {
    ({ rows } = await db.query(query.Get_Credit_Transactions_by_year_month, [year, month]));
  }
  else if(year) {
    ({ rows } = await db.query(query.Get_Credit_Transactions_by_year, [year]));
  }
  else {
    ({ rows }  = await db.query(query.Get_Credit_Transactions, []));
  }

  res.status(200).json(rows);
};

export const getGroupedTransactions = async (req: Request, res: Response) => {
  let rows: any;
  const year: string = req.query.year as string;
  const month: string = req.query.month as string;

  if(year && month) {
    ({ rows } = await db.query(query.Get_Grouped_Categories_by_year_month, [year, month]));
  }
  else if(year) {
    ({ rows } = await db.query(query.Get_Grouped_Categories_by_year, [year]));
  }
  else {
    ({ rows }  = await db.query(query.Get_Grouped_Categories, []));
  }

  const groupedTransactions = rows.map((row: any) => {
    return ({
      "id": row.category_id,
      "name": row.name,
      "sum": row.sum,
      "limit": row.limit_value
    })
  });
  res.status(200).json(groupedTransactions);
};

export const getGroupedTransactionsDescribed = async (req: Request, res: Response) => {
  let categories: any;
  let transactions: any;

  const year: string = req.query.year as string;
  const month: string = req.query.month as string;

  if(year && month) {
    categories = await db.query(query.Get_Grouped_Categories_by_year_month, [year, month]);
  }
  else if(year) {
    categories = await db.query(query.Get_Grouped_Categories_by_year, [year]);
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

  if(year && month) {
    transactions = await db.query(query.Get_Transactions_by_year_month, [year, month]);
  }
  else if(year) {
    transactions = await db.query(query.Get_Transactions_by_year, [year]);
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

export const saveCategory = async (req: Request, res: Response) => {
  try {
    db.query(query.SPROC_Update_Transaction_Category, [req.body.id, req.body.categoryId]);
  } catch {
    res.status(500).json({status: 'Internal Server Error'});
  }
  res.sendStatus(200);
}

export const saveReview = async (req: Request, res: Response) => {
  try {
    db.query(query.SPROC_Update_Transaction_Review, [req.body.id]);
  } catch {
    res.status(500).json({status: 'Internal Server Error'});
  }
  res.sendStatus(200);
}

export const deleteTransaction = async (req: Request, res: Response) => {
  const id: string = req.query.id as string;
  try {
    db.query(query.SPROC_Delete_Transaction, [Number(id)]);
  } catch {
    res.status(500).json({status: 'Internal Server Error'});
  }
  res.sendStatus(200);
}



