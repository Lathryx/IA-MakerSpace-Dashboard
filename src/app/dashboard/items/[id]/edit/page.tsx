import EditItemForm from '@/ui/dashboard/items/edit-form'; 
import { fetchItemById } from '@/lib/data'; 
import { notFound } from 'next/navigation'; 

// TODO: make fetchItemById data method 
// TODO: make updateItemWithId action method 

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id; 
    const item = await fetchItemById(id); 

    if (!item) {
        return notFound(); 
    } 

    return (
        <div>
            <EditItemForm item={item} /> 
        </div>
    ); 
}