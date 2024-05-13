import { unstable_noStore as noStore } from 'next/cache'; 
import { pool } from '@/db'; 

const ITEMS_PER_PAGE = 6; 
const RECORDERS_PER_PAGE = 6; 
const STUDENTS_PER_PAGE = 6; 
const ORDERS_PER_PAGE = 6; 

export async function fetchFilteredItems(
    query: string, 
    currentPage: number 
) {
    noStore(); 

    const offset = (currentPage - 1) * ITEMS_PER_PAGE; 

    try {
        const res = await pool.query(`
            SELECT * FROM item
            WHERE item.name ILIKE '${`%${query}%`}' 
            ORDER BY item.name ASC 
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
                item.name::varchar ILIKE '${`%${query}%`}' 
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
                recorder.name ILIKE '${`%${query}%`}' 
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
            WHERE recorder.name ILIKE '${`%${query}%`}' 
            ORDER BY recorder.name ASC 
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
                student.student_id::varchar ILIKE '${`%${query}%`}' OR 
                student.name::varchar ILIKE '${`%${query}%`}' 
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
            WHERE 
                student.student_id::varchar ILIKE '${`%${query}%`}' OR 
                student.name::varchar ILIKE '${`%${query}%`}' 
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

export async function fetchFilteredOrders(
    query: string, 
    currentPage: number 
) {
    noStore(); 

    const offset = (currentPage - 1) * ORDERS_PER_PAGE; 

    try {
        const res = await pool.query(`
            SELECT 
                o.order_id AS order_id, 
                o.quantity AS quantity, 
                o.status AS status, 
                o.date_out AS date_out, 
                o.date_returned AS date_returned, 
                item.name AS item_name, 
                student.name AS student_name, 
                recorder.name AS recorder_name 
            FROM "order" AS o 
            JOIN item ON o.item_id = item.item_id 
            JOIN student ON o.student_id = student.student_id 
            JOIN recorder ON o.recorder_id = recorder.recorder_id 
            WHERE 
                o.order_id::varchar ILIKE '${`%${query}%`}' OR 
                item.name::varchar ILIKE '${`%${query}%`}' OR 
                student.name::varchar ILIKE '${`%${query}%`}' OR 
                recorder.name::varchar ILIKE '${`%${query}%`}' 
            ORDER BY o.date_out DESC 
            LIMIT ${ORDERS_PER_PAGE} OFFSET ${offset} 
        `); 
        // console.log(res.rows); 
    
        return res.rows; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch orders.'); 
    }
} 

export async function fetchOrderById(order_id: string) {
    noStore(); 

    try {
        const res = await pool.query(`
            SELECT * FROM "order" 
            WHERE 
                order_id = '${order_id}' 
        `); 

        return res.rows[0]; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch order by id.'); 
    }
}

export async function getOrdersPages(query: string) {
    noStore(); 

    try {
        const count = await pool.query(`
            SELECT COUNT(*) 
            FROM "order" AS o
            JOIN item ON o.item_id = item.item_id 
            JOIN student ON o.student_id = student.student_id 
            JOIN recorder ON o.recorder_id = recorder.recorder_id 
            WHERE 
                o.order_id::varchar ILIKE '${`%${query}%`}' OR 
                item.name::varchar ILIKE '${`%${query}%`}' OR 
                student.name::varchar ILIKE '${`%${query}%`}' OR 
                recorder.name::varchar ILIKE '${`%${query}%`}' 
        `); // JOIN explanation here: 
        // The JOIN clause is used to combine rows from two or more tables based on a related column between them. 
        // Without any other keywords (LEFT, RIGHT, FULL, INNER, CROSS), JOIN defaults to INNER JOIN. 

        const totalPages = Math.ceil(Number(count.rows[0].count) / ORDERS_PER_PAGE); 
        return totalPages; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch total number of orders.'); 
    }
} 

export async function fetchItems() {
    try {
        const data = await pool.query(`
            SELECT 
                item.item_id, 
                item.name 
            FROM item 
            ORDER BY item.name ASC 
        `); 

        return data.rows; 
    } catch (error) {
        console.error('Database error: ', error); 
        throw new Error('Failed to fetch all items.'); 
    }
} 

export async function fetchStudents() {
    try {
        const data = await pool.query(`
            SELECT 
                student.student_id, 
                student.name 
            FROM student 
            ORDER BY student.name ASC 
        `); 

        return data.rows; 
    } catch (error) {
        console.error('Database error: ', error); 
        throw new Error('Failed to fetch all students.'); 
    }
} 

export async function fetchRecorders() {
    try {
        const data = await pool.query(`
            SELECT 
                recorder.recorder_id, 
                recorder.name 
            FROM recorder  
            ORDER BY recorder.name ASC 
        `); 

        return data.rows; 
    } catch (error) {
        console.error('Database error: ', error); 
        throw new Error('Failed to fetch all recorders.'); 
    }
} 