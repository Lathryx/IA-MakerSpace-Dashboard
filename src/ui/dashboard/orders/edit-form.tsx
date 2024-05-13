'use client'; 

import Link from 'next/link'; 
import { DatePicker, TextInput, NumberInput, Select, SelectItem, SearchSelect, SearchSelectItem, Badge, Button } from '@tremor/react'; 
import { RiAddLine } from '@remixicon/react'; 
import { useFormState } from 'react-dom'; 
import { useState } from 'react'; 
import { updateOrder } from '@/lib/actions'; 
import { Order, ItemField, StudentField, RecorderField } from '@/lib/definitions'; 

export default function EditOrderForm({ 
    order, 
    items, 
    students, 
    recorders 
}: { 
    order: Order, 
    items: ItemField[], 
    students: StudentField[], 
    recorders: RecorderField[] 
}) {
    const initialState = { message: '', errors: {} }; 
    const updateOrderWithId = updateOrder.bind(null, order.order_id); 
    const [state, dispatch] = useFormState(updateOrderWithId, initialState); 
    const [dateOut, setDateOut] = useState(order.date_out); 


    console.log(order); 
    return (
        <form action={dispatch}>
            <div>
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="item">Item</label>
                <SearchSelect id="item" name="item" placeholder="Select an item..." defaultValue={order.item_id} error={!!state.errors?.item} errorMessage={state.errors?.item?.join('\n')}>
                    {items.map((item: ItemField) => (
                        <SearchSelectItem key={item.item_id} value={item.item_id}>{item.name}</SearchSelectItem>
                    ))}
                </SearchSelect> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="quantity">Quantity</label> 
                <NumberInput id="quantity" name="quantity" min={0} placeholder="Quantity of item..." defaultValue={order.quantity} error={!!state.errors?.quantity} errorMessage={state.errors?.quantity?.join('\n')} /> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="student">Student</label>
                <SearchSelect id="student" name="student" placeholder="Select a student..." defaultValue={order.student_id} error={!!state.errors?.student} errorMessage={state.errors?.student?.join('\n')}>
                    {students.map((student: StudentField) => (
                        <SearchSelectItem key={student.student_id} value={student.student_id}>{student.name}</SearchSelectItem>
                    ))}
                </SearchSelect> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="recorder">Recorder</label>
                <SearchSelect id="recorder" name="recorder" placeholder="Select a recorder..." defaultValue={order.recorder_id} error={!!state.errors?.student} errorMessage={state.errors?.recorder?.join('\n')}>
                    {recorders.map((recorder: RecorderField) => (
                        <SearchSelectItem key={recorder.recorder_id} value={recorder.recorder_id}>{recorder.name}</SearchSelectItem>
                    ))}
                </SearchSelect> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="dateout">Date Out</label>
                <DatePicker placeholder="Select a date..." defaultValue={new Date(order.date_out)} onValueChange={d => setDateOut(d?.toISOString() || '')}/> 
                <TextInput className="hidden" id="dateout" name="dateout" value={dateOut} error={!!state.errors?.date_out} errorMessage={state?.errors?.date_out?.join('\n')} /> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="status">Status</label> 
                <Select id="status" name="status" placeholder="Select a status..." defaultValue={order.status} error={!!state.errors?.status} errorMessage={state.errors?.status?.join('\n')}>
                    <SelectItem value="returned">
                        <Badge color="green">Returned</Badge>
                    </SelectItem>
                    <SelectItem value="outstanding">
                        <Badge color="orange">Outstanding</Badge>
                    </SelectItem>
                </Select>
            </div>
            <div className="flex items-center justify-end gap-2">
                <Link href="/dashboard/orders">
                    <Button variant="secondary">Cancel</Button>
                </Link> 
                <Button type="submit" icon={RiAddLine} iconPosition="right">Edit Order</Button> 
            </div>
            <div id="form-error" aria-live="polite" aria-atomic="true">
                {state.message && <p className="mt-4 text-sm text-red-500">{state.message}</p>} 
                {/* {state.errors && <p>{state.errors ? JSON.stringify(state.errors) : ''}</p>} */}
            </div>
        </form>
    ); 
}