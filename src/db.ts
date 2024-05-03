import pg from 'pg'; 
const { Pool } = pg; 

export const pool = new Pool(); 

// export async function query(text: string, params: any[]) { 
//     const start = Date.now(); 
//     const res = await pool.query(text, params); 
//     const duration = Date.now() - start; 
//     console.log('executed query', { text, duration, rows: res.rowCount }); 
//     return res; 
// }