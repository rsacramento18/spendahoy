import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT)
});

export const query = async (text: string, params: (string|number)[]) => {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, params, duration });
    return res;
  } catch (err) {
    console.log('Error query database', {text, params});
    console.log(err);
  }
};
