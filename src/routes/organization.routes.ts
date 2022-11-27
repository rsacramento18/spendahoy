import { Request, Response } from 'express'
import * as db from '../../db/db'
import * as query from '../../db/queries'
import { Organization } from '../interfaces/organization'

export const getAllOrganizations = async (req: Request, res: Response) => {

  const { rows } = await db.query(query.Get_All_Organizations, []);

  const organizations: Organization[] = rows.map((row: any) => {
    return ({
      "id": row.id, 
      "name": row.name,
      "delimiter": row.delimiter,
      "encoding": row.encoding
    });
  })

  console.log(rows);

  res.status(200).json(organizations);
};
