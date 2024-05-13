import { fetchItems, fetchStudents, fetchRecorders } from '@/lib/data'; 
import CreateOrderForm from '@/ui/dashboard/orders/create-form'; 

export default async function Page() {
    const items = await fetchItems(); 
    const students = await fetchStudents(); 
    const recorders = await fetchRecorders(); 

    return (
        <div>
            <CreateOrderForm items={items} students={students} recorders={recorders} /> 
        </div>
    ); 
}