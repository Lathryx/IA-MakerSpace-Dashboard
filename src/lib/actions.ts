'use server'; 

import { revalidatePath } from 'next/cache'; 
import { redirect } from 'next/navigation'; 
import { z } from 'zod'; 
import { pool } from '@/db'; 
import { AuthError } from 'next-auth'; 
import { signIn } from '@/auth'; 

const ItemSchema = z.object({
    name: z.string().min(1, 'Name must be at least 1 character.'), 
    quantity: z.coerce.number().int('Quantity must be a whole number.').positive('Quantity must be positive.'), 
    consumable: z.coerce.boolean(), 
}); 

const RecorderSchema = z.object({
    name: z.string().min(1, 'Name must be at least 1 character.'), 
    status: z.enum(['active', 'inactive'], {
        invalid_type_error: 'Please select a status.' 
    }), 
}); 

const StudentSchema = z.object({
    student_id: z.string().length(10, 'ID must have a length of 10.'), 
    name: z.string().min(1, 'Name msut be at least 1 character.'), 
    status: z.enum(['active', 'inactive'], {
        invalid_type_error: 'Please select a status.' 
    }), 
}); 

const OrderSchema = z.object({
    item: z.string(), 
    quantity: z.coerce.number().int('Quantity must be a whole number.').positive('Quantity must be positive.'), 
    student: z.string(), 
    recorder: z.string(), 
    date_out: z.string().min(1, "Please select a date."), 
    date_returned: z.string(), 
    status: z.enum(['returned', 'outstanding'], {
        invalid_type_error: 'Please select a status.' 
    }) 
}).refine(data => {
    if (data.status === 'returned') return data.date_returned !== ''; 
    return true; 
}, {
    message: 'Return date is required for returned orders.', 
    path: ['date_returned']
}).refine(data => {
    if (data.status === 'returned') {
        const date_out = new Date(data.date_out); 
        const date_returned = new Date(data.date_returned); 
        return date_out < date_returned; 
    } 
    return true; 
}, {
    message: 'Return date must be after date out.', 
    path: ['date_returned'] 
}); 

// EditItem schema is CreateItem schema with id 
// const EditItem = CreateItem.extend({
//     id: z.string(), 
// }); 

export type State = {
    errors?: {
        name?: string[]; 
        quantity?: string[]; 
        consumable?: string[]; 
    }; 
    message?: string | null;
}; 

export async function createItem(prevState: State, formData: FormData) {  
    console.log(formData); 
     
    const validatedFields = ItemSchema.safeParse({
        name: formData.get('name'), 
        quantity: formData.get('quantity'), 
        consumable: formData.get('consumable'), 
    }); 

    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to create item.' 
        }; 
    }

    const { name, quantity, consumable } = validatedFields.data; 
    console.log(name, quantity, consumable); 
    // const date = new Date().toISOString(); 

    try {
        await pool.query(`
            INSERT INTO item (item_id, name, quantity, consumable) 
            VALUES (DEFAULT, '${name}', ${quantity}, ${consumable}); 
        `); 
    } catch (error) {
        console.log(error); 
        return { message: 'Database error: Failed to create item.' }; 
    }

    revalidatePath('/dashboard/items'); 
    redirect('/dashboard/items'); 
}

export async function updateItem(itemId: string, prevSate: State, formData: FormData) {
    const validatedFields = ItemSchema.safeParse({
        name: formData.get('name'), 
        quantity: formData.get('quantity'), 
        consumable: formData.get('consumable') 
    }); 

    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to edit item.' 
        }; 
    } 

    const { name, quantity, consumable } = validatedFields.data; 

    try {
        await pool.query(`
            UPDATE item
            SET name = '${name}', quantity = ${quantity}, consumable = ${consumable}
            WHERE item_id = '${itemId}'; 
        `); 
    } catch (error) {
        return { message: 'Database error: Failed to edit item.' }; 
    } 

    revalidatePath('/dashboard/items'); 
    redirect('/dashboard/items'); 
}

export async function deleteItem(itemId: string) {
    try {
        await pool.query(`
            DELETE FROM item
            WHERE item_id = '${itemId}'; 
        `); 
        revalidatePath('/dashboard/items'); 
        return { message: 'Item deleted successfully.' }; 
    } catch (error) {
        return { message: 'Database error: Failed to delete item.' }; 
    }
}

export async function createRecorder(prevState: State, formData: FormData) {
    const validatedFields = RecorderSchema.safeParse({
        name: formData.get('name'), 
        status: formData.get('status') 
    }); 

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to create recorder.' 
        }; 
    } 

    const { name, status } = validatedFields.data; 

    try {
        await pool.query(`
            INSERT INTO recorder (recorder_id, name, status) 
            VALUES (DEFAULT, '${name}', '${status}'); 
        `); 
    } catch (error) {
        console.log(error); 
        return { message: 'Database error: Failed to create recorder.' }; 
    } 

    revalidatePath('/dashboard/recorders'); 
    redirect('/dashboard/recorders'); 
} 

export async function updateRecorder(recorder_id: string, prevState: State, formData: FormData) {
    const validatedFields = RecorderSchema.safeParse({
        name: formData.get('name'), 
        status: formData.get('status') 
    }); 

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to edit recorder.' 
        }; 
    } 

    const { name, status } = validatedFields.data; 

    try {
        await pool.query(`
            UPDATE recorder 
            SET name = '${name}', status = '${status}' 
            WHERE recorder_id = '${recorder_id}'; 
        `); 
    } catch (error) {
        return { message: 'Database error: Failed to edit recorder.' }; 
    } 

    revalidatePath('/dashboard/recorders'); 
    redirect('/dashboard/recorders'); 
}

export async function deleteRecorder(recorderId: string) {
    try { 
        await pool.query(`
            DELETE FROM recorder 
            WHERE recorder_id = '${recorderId}'; 
        `); 
        revalidatePath('/dashboard/recorders'); 
        return { message: 'Recorder deleted successfully.' }; 
    } catch (error) {
        return { message: 'Database error: Failed to delete recorder.' }; 
    }
} 

export async function createStudent(prevState: State, formData: FormData) {
    const validatedFields = StudentSchema.safeParse({
        student_id: formData.get('id'), 
        name: formData.get('name'), 
        status: formData.get('status') 
    }); 

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to create student.' 
        }; 
    } 

    const { student_id, name, status } = validatedFields.data; 
    // const date_activated = new Date().toISOString().split('T')[0]; 

    try {
        await pool.query(`
            INSERT INTO student (student_id, name, status, date_activated)
            VALUES ('${student_id}', '${name}', '${status}', NOW()); 
        `); 
    } catch (error) {
        console.log(error); 
        return { message: 'Database error: Failed to create student.' }; 
    } 

    revalidatePath('/dashboard/students'); 
    redirect('/dashboard/students'); 
} 

export async function updateStudent(prev_student_id: string, prevState: State, formData: FormData) {
    const validatedFields = StudentSchema.safeParse({
        student_id: formData.get('id'), 
        name: formData.get('name'), 
        status: formData.get('status') 
    }); 

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to edit student.' 
        }; 
    } 

    const { student_id, name, status } = validatedFields.data; 

    try {
        await pool.query(`
            UPDATE student 
            SET student_id = '${student_id}', name = '${name}', status = '${status}' 
            WHERE student_id = '${prev_student_id}'; 
        `); 
    } catch (error) {
        return { message: 'Database error: Failed to edit student.' }; 
    } 

    revalidatePath('/dashboard/students'); 
    redirect('/dashboard/students'); 
}

export async function deleteStudent(studentId: string) {
    try {
        await pool.query(`
            DELETE FROM student 
            WHERE student_id = '${studentId}'; 
        `); 
        revalidatePath('/dashboard/students'); 
        return { message: 'Student deleted successfully.' }; 
    } catch (error) {
        return { message: 'Database error: Failed to delete student.' }; 
    }
} 

export async function createOrder(prevState: State, formData: FormData) {
    const validatedFields = OrderSchema.safeParse({
        item: formData.get('item'), 
        quantity: formData.get('quantity'), 
        student: formData.get('student'), 
        recorder: formData.get('recorder'), 
        date_out: formData.get('dateout'), 
        date_returned: formData.get('datereturned'), 
        status: formData.get('status') 
    }); 

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to create order.' 
        }; 
    } 

    const { item, quantity, student, recorder, date_out, status } = validatedFields.data; 
    // console.log("Date out: ", date_out); 
    console.log(validatedFields.data); 

    try {
        await pool.query(`
            INSERT INTO "order" (order_id, item_id, quantity, student_id, recorder_id, date_out, status) 
            VALUES (DEFAULT, ${item}, ${quantity}, ${student}, '${recorder}', '${date_out}', '${status}'); 
        `); 
    } catch (error) {
        console.log(error); 
        return { message: 'Database error: Failed to create order.' }; 
    } 

    revalidatePath('/dashboard/orders'); 
    redirect('/dashboard/orders'); 
}

export async function updateOrder(order_id: string, prevState: State, formData: FormData) {
    const validatedFields = OrderSchema.safeParse({
        item: formData.get('item'), 
        quantity: formData.get('quantity'), 
        student: formData.get('student'), 
        recorder: formData.get('recorder'), 
        date_out: formData.get('dateout'), 
        status: formData.get('status') 
    }); 

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing fields. Failed to edit order.' 
        }; 
    } 

    const { item, quantity, student, recorder, date_out, status } = validatedFields.data; 

    try {
        await pool.query(`
            UPDATE "order" 
            SET 
                item_id = ${item}, 
                quantity = ${quantity}, 
                student_id = ${student}, 
                recorder_id = '${recorder}', 
                date_out = '${date_out}', 
                status = '${status}' 
            WHERE order_id = ${order_id}; 
        `); 
    } catch (error) {
        return { message: 'Database error: Failed to edit order.' }; 
    } 

    revalidatePath('/dashboard/orders'); 
    redirect('/dashboard/orders'); 
} 

export async function deleteOrder(orderId: string) {
    try {
        await pool.query(`
            DELETE FROM "order" 
            WHERE order_id = '${orderId}'; 
        `); 
        revalidatePath('/dashboard/order'); 
        return { message: 'Order deleted successfully.' }; 
    } catch (error) {
        return { message: 'Database error: Failed to delete order.' }; 
    }
} 

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData); 
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': 
                    return 'Invalid credentials.'; 
                default: 
                    return 'Something went wrong.'; 
            } 
        }
        throw error; 
    }
}