import EditStudentForm from '@/ui/dashboard/students/edit-form'; 
import { fetchStudentById } from '@/lib/data'; 
import { notFound } from 'next/navigation'; 

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id; 
    const student = await fetchStudentById(id); 

    if (!student) {
        return notFound(); 
    } 

    return (
        <div>
            <EditStudentForm student={student} /> 
        </div>
    ); 
}