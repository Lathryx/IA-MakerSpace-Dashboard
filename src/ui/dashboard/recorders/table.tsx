import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Badge } from '@tremor/react'; 
import { fetchFilteredRecorders } from '@/lib/data'; 
import { Recorder } from '@/lib/definitions'; 
import { DeleteButton, EditRecorderButton } from '@/ui/dashboard/buttons'; 

export default async function RecordersTable({
    query, 
    currentPage 
}: {
    query: string; 
    currentPage: number; 
}) {
    const recorders = await fetchFilteredRecorders(query, currentPage); 

    return (
        <Card className="mt-10">
            <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Recorders</p>
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
                    {recorders?.map((recorder: Recorder) => (
                        <TableRow key={recorder.recorder_id}>
                            <TableCell className="font-mono">{recorder.recorder_id}</TableCell>
                            <TableCell>{recorder.name}</TableCell>
                            <TableCell><Badge color={recorder.status === 'active' ? 'green' : 'red'}>{recorder.status === 'active' ? 'Active' : 'Inactive'}</Badge></TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-4">
                                    <EditRecorderButton recorderId={recorder.recorder_id} /> 
                                    <DeleteButton id={recorder.recorder_id} type="recorder">
                                        <p className="mb-3 text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Delete <span className="px-2 py-1 bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle font-mono rounded-lg">{recorder.name}</span> Recorder</p>
                    <p>Are you sure you want to delete this recorder?</p>
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