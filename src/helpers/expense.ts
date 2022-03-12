import * as fs from 'fs';
import { parse } from 'csv-parse';
import * as xlsxParse from 'node-xlsx';
import * as db from '../../db/db'
import * as query from '../../db/queries'
import moment from 'moment'

import { File } from '../../src/interfaces/file'
import { Organization } from '../../src/interfaces/organization'
import { Transaction } from '../../src/interfaces/transaction'
import { Category, Rule } from '../interfaces/category'
import { Organization_types } from '../interfaces/organizationTypes'
import { warn } from 'console';

export class Expense {
  importTypes = [
    Organization_types.MILLENNIUM, Organization_types.MONTEPIO, Organization_types.WIZINK
  ];
  transactions: Transaction[];
  organization: Organization;
  file: File;

  constructor(organization: Organization, file: File) {
    this.organization = organization;
    this.file = file;
    this.transactions = [];
  }

  public async parseDocument() {
    let results;

    switch(this.file.mimetype) {
      case 'text/csv':
        results = await this.csvParse();
        break;
      case 'application/vnd.ms-excel':
        results = this.xlsxParse();
        break;
    }
    await this.processImport(results);
  }

  private csvParse() {

    let results: string[] = [];
    const csvParser = parse({
      delimiter: this.organization.delimiter,
      relax_column_count: true
    });

    return new Promise( (resolve, reject) => {
      fs.createReadStream(this.file.path, { encoding: this.organization.encoding as BufferEncoding })
        .pipe(csvParser)
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', reject);
    });
  }

  private xlsxParse() {

    const [xlsx] = xlsxParse.parse(this.file.path);
    return xlsx.data;
      
  }

  private async processImport(records: any) {
    if(!Object.values(this.importTypes).includes(this.organization.id)) return;
    if(records.length < 1 || records === undefined) return;

    const categories: Category[] = await this.getCategories();

    let counter = this.getCounter();

    for(let i = counter; i < records.length - 1; i++) {
      const date = this.getDate(records[i]);
      const values = this.getValues(records[i]);
      const categoryId = this.checkRule(records[i], categories);
      const description = this.getDescription(records[i]);

      console.log(records[i]);

      this.transactions.push({
        id: null,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.toISOString(),
        description: description,
        value: values.value,
        balance: values.balance,
        type: values.type,
        organizationId: this.organization.id,
        categoryId: categoryId,
      });
    }
  }

  private getCounter() {
    switch(this.organization.id) {
      case Organization_types.MILLENNIUM:
        return 13; 
      case Organization_types.MONTEPIO:
        return 9;
      case Organization_types.WIZINK:
        return 1;
    }
  }

  private getDate(record: any) {
    let date
    switch(this.organization.id) {
      case Organization_types.MILLENNIUM:
        date= moment.utc(record[0], "DD-MM-YYYY");
        return date.toDate();
      case Organization_types.MONTEPIO:
        date = moment.utc(record[0], "YYYY-MM-DD");
        return date.toDate();
      case Organization_types.WIZINK:
        date = moment.utc(record[0], "DD/MM/YYYY");
        return date.toDate();
      default:
        return null;
    }
  }

  private getValues(record: any) {
    let value;
    let balance;
    let type;

    switch(this.organization.id) {
      case Organization_types.MILLENNIUM:
        value = parseFloat(parseFloat(record[3]).toFixed(2));
        balance = parseFloat(parseFloat(record[5]).toFixed(2));
        type = value > 0 ? 'Crédito' : 'Débito';
        break;
      case Organization_types.MONTEPIO:
        console.log('montepio');
        value = parseFloat(parseFloat(record[3].replace(',','.')).toFixed(2));
        balance = parseFloat(parseFloat(record[4].replace(',','.')).toFixed(2));
        type = value > 0 ? 'Crédito' : 'Débito';
        break;
      case Organization_types.WIZINK:
        value = record[4];
        balance = null;
        type = value > 0 ? 'Pagamento' : 'Compra';
        break;
      default:
        value = null;
        balance = null;
        break;
    }

    return ({ value: value, balance: balance, type: type});
  }

  private getDescription(record: any) {
    switch(this.organization.id) {
      case Organization_types.MILLENNIUM:
      case Organization_types.MONTEPIO:
      case Organization_types.WIZINK:
        return record[2];
      default:
        return null;
    }
  }

  private checkRule(record: any, categories: Category[]) {
    let description: string;
    switch(this.organization.id) {
      case Organization_types.MILLENNIUM:
        description = record[2]
        break;
      case Organization_types.MONTEPIO:
        description = record[2]
        break;
      case Organization_types.WIZINK:
        description = record[2]
        break;
      default:
        description = null;
    }

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].rules.some((x) =>  description.includes(x.rule) )) {
        return categories[i].id;
      }
    }
    return null;
  }

  private async getCategories() {
    const { rows } = await db.query(query.Get_Category_Rules, []);
    
    let categories: Category[] = [];

    while(rows.length > 0) {
      const categoryId = rows[0].category_id;
      const categoryName = rows[0].name;

      let rules: Rule[] = [];

      for (let i = 0; i < rows.length; i++) {
        if(categoryName === rows[i].name) {
          const record: Rule = rows.splice(i,1)[0];

          const rule: Rule = {
            rule: record.rule,
            operator: record.operator
          }
          rules.push(rule);
          i = i -1;
        }
      }
      categories.push({
        id: categoryId,
        category: categoryName,
        rules: rules,
      });
    }
    return categories;
  }

}
