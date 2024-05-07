import EditRecorderForm from '@/ui/dashboard/recorders/edit-form'; 
import { fetchRecorderById } from '@/lib/data'; 
import { notFound } from 'next/navigation'; 

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id; 
    const recorder = await fetchRecorderById(id); 

    if (!recorder) {
        return notFound(); 
    } 

    return (
        <div>
            <EditRecorderForm recorder={recorder} /> 
        </div>
    ); 
}