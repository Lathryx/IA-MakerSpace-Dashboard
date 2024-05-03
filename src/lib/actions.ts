'use server'; 

import { revalidatePath } from 'next/cache'; 
import { redirect } from 'next/navigation'; 
import { z } from 'zod'; 
import { pool } from '@/db'; 

const CreateItem = z.object({
    name: z.string().min(1, 'Name must be at least 1 character.'), 
    quantity: z.coerce.number().int('Quantity must be a whole number.').positive('Quantity must be positive.'), 
    consumable: z.coerce.boolean(), 
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
     
    const validatedFields = CreateItem.safeParse({
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
    const validatedFields = CreateItem.safeParse({
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