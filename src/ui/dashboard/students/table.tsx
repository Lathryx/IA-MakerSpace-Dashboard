import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Badge } from '@tremor/react'; 
import { fetchFilteredStudents } from '@/lib/data'; 
import { Student } from '@/lib/definitions'; 
import { DeleteButton, EditStudentButton } from '@/ui/dashboard/buttons'; 

export default async function StudentsTable({
    query, 
    currentPage 
}: {
    query: string; 
    currentPage: number; 
}) {
    const students = await fetchFilteredStudents(query, currentPage); 

    return (
        <Card className="mt-10">
            <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Students</p>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>
                            <span className="sr-only">Edit</span>
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students?.map((student: Student) => (
                        <TableRow key={student.student_id}>
                            <TableCell className="font-mono">{student.student_id}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell><Badge color={student.status === 'active' ? 'green' : 'red'}>{student.status === 'active' ? 'Active' : 'Inactive'}</Badge></TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-4">
                                    <EditStudentButton studentId={student.student_id} /> 
                                    <DeleteButton id={student.student_id} type="student">
                                        <p className="mb-3 text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Delete <span className="px-2 py-1 bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle font-mono rounded-lg">{student.name}</span> Student</p>
                    <p>Are you sure you want to delete this student?</p>
                                    </DeleteButton> 
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    ); 
}