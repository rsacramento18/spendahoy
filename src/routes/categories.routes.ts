import { Request, Response } from 'express'
import * as db from '../../db/db'
import * as query from '../../db/queries'
import { Rule } from '../interfaces/category'

export const getCategories = async (req: Request, res: Response) => {
  const { rows } = await db.query(query.Get_All_Categories, []);

  const categories = rows.map((row: any) => {
    return ({
      "id": row.category_id, 
      "name": row.name
    });
  })

  res.status(200).json(categories);
}

export const getAllCategoriesRules = async (req: Request, res: Response) => {
  const categoryRules = getCategoriesRules();

  res.status(200).json(categoryRules);
}

export const getCategoryDetail = async (req: Request, res: Response) => {
  const categoryId: string = req.query.id as string;

  const { rows } = await db.query(query.Get_Category_Detail, [categoryId]);

  const categoryRules = getCategoriesRules(categoryId);

}

const getCategoriesRules = async (categoryId?: string) => {
  let rows: any;

  if (categoryId) {
    ({ rows } = await db.query(query.Get_Category_Rules_by_Category_Id, [categoryId]));
  }
  else {
    ({ rows } = await db.query(query.Get_Category_Rules, []));
  }

  const categoryRules = rows.reduce((acc: any, obj: any) => {
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
  return categoryRules;
}

export const insertCategory = async (req: Request, res: Response) => {
  const name = req.body.name as string
  db.query(query.Insert_Category, [name]);
}

export const updateCategory = async (req: Request, res: Response) => {
  const id: number = req.body.id as number;
  const name: string = req.body.name as string;
  db.query(query.Update_Category, [name, id]);
}

export const setCategoryLimit = async (req: Request, res: Response) => {
  const id: number = req.body.id as number;
  const limit: number = req.body.limit as number;

  db.query(query.Update_Category_Limit, [limit, id]);
}
