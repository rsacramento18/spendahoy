import { Request, Response } from 'express'
import * as db from '../../db/db'
import * as query from '../../db/queries'
import { Rule } from '../interfaces/category'

export const getCategories = async (req: Request, res: Response) => {
  const { rows } = await db.query(query.Get_All_Categories, []);

  res.status(200).json(rows);
}

export const getCategoriesRules = async (req: Request, res: Response) => {
  const { rows } = await db.query(query.Get_Category_Rules, []);

  const categoryRules = rows.reduce((acc, obj) => {
    let key = obj['name'];
    if (!acc[key]) {
      let rules: Rule[] = [];
      acc[key] = {
        category_id: obj.category_id,
        rules: rules,
      };
    }
    acc[key].rules.push({rule: obj.rule, operator: obj.operator});
    return acc;
  }, {});

  res.status(200).json(categoryRules);
}

export const insertCategory = async (req: Request, res:Response) => {
}


