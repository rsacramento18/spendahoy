import { Transaction } from '../interfaces/transaction'
import { Organization_types } from '../interfaces/organizationTypes'
import * as db from '../../db/db'
import * as query from '../../db/queries'

const importTypes = [
    Organization_types.MILLENNIUM, Organization_types.MONTEPIO, Organization_types.WIZINK
  ];

export const writeTransactions = (organizationId: number, transactions: Transaction[]) => {

  
  for( let i = 0; i < transactions.length - 1; i++) {

    let params;

    switch(organizationId){
      case Organization_types.MILLENNIUM:
      case Organization_types.MONTEPIO:
        params = [
          transactions[i].year, 
          transactions[i].month, 
          transactions[i].date, 
          transactions[i].description,
          transactions[i].value,
          transactions[i].balance,
          transactions[i].type,
          transactions[i].organizationId,
          transactions[i].categoryId
        ];
        db.query(query.SPROC_Insert_Transaction, params);
        break;
      case Organization_types.WIZINK:
        params = [
          transactions[i].year, 
          transactions[i].month, 
          transactions[i].date, 
          transactions[i].description,
          transactions[i].value,
          transactions[i].organizationId,
          transactions[i].categoryId
        ];
        console.log(params);
        db.query(query.SPROC_Insert_Transaction_Credit, params);
        break;
    }
  }
}
