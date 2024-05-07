import { unstable_noStore as noStore } from 'next/cache'; 
import { pool } from '@/db'; 
import { off } from 'process';

const ITEMS_PER_PAGE = 6; 
const RECORDERS_PER_PAGE = 6; 
const STUDENTS_PER_PAGE = 6; 

export async function fetchFilteredItems(
    query: string, 
    currentPage: number 
) {
    noStore(); 

    const offset = (currentPage - 1) * ITEMS_PER_PAGE; 

    try {
        const res = await pool.query(`
            SELECT * FROM item
            WHERE name ILIKE '%${query}%' 
            ORDER BY name ASC 
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `); 
    
        return res.rows; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch items.'); 
    }
}

export async function fetchItemById(item_id: string) {
    noStore(); 

    try {
        const res = await pool.query(`
            SELECT * FROM item
            WHERE item_id = '${item_id}'
        `); 

        return res.rows[0]; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch item by id.'); 
    }
}

export async function getItemsPages(query: string) {
    noStore(); 

    try {
        const count = await pool.query(`
            SELECT COUNT(*) 
            FROM item
            WHERE 
                name ILIKE '${`%${query}%`}'
        `); 

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE); 
        return totalPages; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch total number of items.'); 
    }
} 

export async function getRecordersPages(query: string) {
    noStore(); 

    try {
        const count = await pool.query(`
            SELECT COUNT(*) 
            FROM recorder
            WHERE
                name ILIKE '${`%${query}%`}' 
        `); 

        const totalPages = Math.ceil(Number(count.rows[0].count) / RECORDERS_PER_PAGE); 
        return totalPages; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch total number of recorders.'); 
    }
} 

export async function fetchFilteredRecorders(
    query: string, 
    currentPage: number 
) {
    noStore(); 

    const offset = (currentPage - 1) * RECORDERS_PER_PAGE; 

    try {
        const res = await pool.query(`
            SELECT * FROM recorder 
            WHERE name ILIKE '%${query}%' 
            ORDER BY name ASC 
            LIMIT ${RECORDERS_PER_PAGE} OFFSET ${offset} 
        `); 

        return res.rows; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch recorders.'); 
    }
} 

export async function fetchRecorderById(recorder_id: string) {
    noStore(); 

    try {
        const res = await pool.query(`
            SELECT * FROM recorder 
            WHERE recorder_id = '${recorder_id}' 
        `); 

        return res.rows[0]; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch recorder by id.'); 
    }
} 

export async function getStudentsPages(query: string) {
    noStore(); 

    try {
        const count = await pool.query(`
            SELECT COUNT(*) 
            FROM student 
            WHERE 
                name ILIKE '${`%${query}%`}' 
        `); 

        const totalPages = Math.ceil(Number(count.rows[0].count) / STUDENTS_PER_PAGE); 
        return totalPages; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch total number of students.'); 
    }
} 

export async function fetchFilteredStudents(
    query: string, 
    currentPage: number 
) {
    noStore(); 

    const offset = (currentPage - 1) * STUDENTS_PER_PAGE; 
    
    try {
        const res = await pool.query(`
            SELECT * FROM student 
            WHERE name ILIKE '%${query}%' 
            ORDER BY name ASC 
            LIMIT ${STUDENTS_PER_PAGE} OFFSET ${offset} 
        `); 

        return res.rows; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch students.'); 
    }
} 

export async function fetchStudentById(student_id: string) {
    noStore(); 

    try {
        const res = await pool.query(`
            SELECT * FROM student 
            WHERE student_id = '${student_id}' 
        `); 

        return res.rows[0]; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch student by id.'); 
    }
}