import EditOrderForm from '@/ui/dashboard/orders/edit-form'; 
import { fetchOrderById, fetchItems, fetchStudents, fetchRecorders } from '@/lib/data'; 
import { notFound } from 'next/navigation'; 

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id; 
    const [order, items, students, recorders] = await Promise.all([
        fetchOrderById(id), 
        fetchItems(), 
        fetchStudents(), 
        fetchRecorders() 
    ]); 

    if (!order) {
        return notFound(); 
    } 

    return (
        <div>
            <EditOrderForm order={order} items={items} students={students} recorders={recorders} /> 
        </div>
    ); 
}