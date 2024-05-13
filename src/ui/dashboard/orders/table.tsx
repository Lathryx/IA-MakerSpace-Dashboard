import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Badge } from '@tremor/react'; 
import { fetchFilteredOrders} from '@/lib/data'; 
import { OrderTable } from '@/lib/definitions'; 
import { DeleteButton, EditOrderButton } from '@/ui/dashboard/buttons'; 

export default async function OrdersTable({
    query, 
    currentPage 
}: {
    query: string; 
    currentPage: number; 
}) {
    const orders = await fetchFilteredOrders(query, currentPage); 

    return (
        <Card className="mt-10">
            <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Orders</p>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell>Item</TableHeaderCell>
                        <TableHeaderCell>Quantity</TableHeaderCell>
                        <TableHeaderCell>Student</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Recorder</TableHeaderCell>
                        <TableHeaderCell>
                            <span className="sr-only">Edit</span>
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order: OrderTable) => (
                        <TableRow key={order.order_id}>
                            <TableCell className="font-mono">{order.order_id}</TableCell>
                            <TableCell>{new Date(order.date_out).toLocaleDateString('en-US')}</TableCell>
                            <TableCell>{order.item_name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.student_name}</TableCell>
                            <TableCell><Badge color={order.status === 'returned' ? 'green' : 'orange'}>{order.status === 'returned' ? 'Returned' : 'Outstanding'}</Badge></TableCell>
                            <TableCell>{order.recorder_name}</TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-4">
                                    <EditOrderButton orderId={order.order_id} /> 
                                    <DeleteButton id={order.order_id} type="order">
                                        <p className="mb-3 text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Delete <span className="px-2 py-1 bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle font-mono rounded-lg">#{order.order_id}</span> Order</p>
                    <p>Are you sure you want to delete this order?</p>
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