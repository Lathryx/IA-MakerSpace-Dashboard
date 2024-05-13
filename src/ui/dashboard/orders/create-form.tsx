'use client'; 

import Link from 'next/link'; 
import { DatePicker, TextInput, NumberInput, Select, SelectItem, SearchSelect, SearchSelectItem, Badge, Button } from '@tremor/react'; 
import { RiAddLine } from '@remixicon/react'; 
import { useFormState } from 'react-dom'; 
import { useState } from 'react'; 
import { createOrder } from '@/lib/actions'; 
import { ItemField, StudentField, RecorderField } from '@/lib/definitions'; 

export default function CreateOrderForm({ 
    items, 
    students, 
    recorders 
}: { 
    items: ItemField[], 
    students: StudentField[], 
    recorders: RecorderField[] 
}) {
    const initialState = { message: '', errors: {} }; 
    const [state, dispatch] = useFormState(createOrder, initialState); 
    const [dateOut, setDateOut] = useState(''); 
    const [dateReturned, setDateReturned] = useState(''); 

    return (
        <form action={dispatch}>
            <div>
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="item">Item</label>
                <SearchSelect id="item" name="item" placeholder="Select an item..." error={!!state.errors?.item} errorMessage={state.errors?.item?.join('\n')}>
                    {items.map((item: ItemField) => (
                        <SearchSelectItem key={item.item_id} value={item.item_id}>{item.name}</SearchSelectItem>
                    ))}
                </SearchSelect> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="quantity">Quantity</label> 
                <NumberInput id="quantity" name="quantity" min={0} placeholder="Quantity of item..." error={!!state.errors?.quantity} errorMessage={state.errors?.quantity?.join('\n')} /> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="student">Student</label>
                <SearchSelect id="student" name="student" placeholder="Select a student..." error={!!state.errors?.student} errorMessage={state.errors?.student?.join('\n')}>
                    {students.map((student: StudentField) => (
                        <SearchSelectItem key={student.student_id} value={student.student_id}>{student.name}</SearchSelectItem>
                    ))}
                </SearchSelect> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="recorder">Recorder</label>
                <SearchSelect id="recorder" name="recorder" placeholder="Select a recorder..." error={!!state.errors?.student} errorMessage={state.errors?.recorder?.join('\n')}>
                    {recorders.map((recorder: RecorderField) => (
                        <SearchSelectItem key={recorder.recorder_id} value={recorder.recorder_id}>{recorder.name}</SearchSelectItem>
                    ))}
                </SearchSelect> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="dateout">Date Out</label>
                <DatePicker placeholder="Select a date..." onValueChange={d => setDateOut(d?.toISOString() || '')}/> 
                <TextInput className="hidden" id="dateout" name="dateout" value={dateOut} error={!!state.errors?.date_out} errorMessage={state?.errors?.date_out?.join('\n')} /> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="datereturned">Date Returned <span className="text-xs italic text-tremor-content dark:text-dark-tremor-content">(optional)</span></label>
                <DatePicker placeholder="Select a date..." onValueChange={d => setDateReturned(d?.toISOString() || '')}/> 
                <TextInput className="hidden" id="datereturned" name="datereturned" value={dateReturned} error={!!state.errors?.date_returned} errorMessage={state?.errors?.date_returned?.join('\n')} /> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="status">Status</label> 
                <Select id="status" name="status" placeholder="Select a status..." error={!!state.errors?.status} errorMessage={state.errors?.status?.join('\n')}>
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
                <Button type="submit" icon={RiAddLine} iconPosition="right">Create Order</Button> 
            </div>
            <div id="form-error" aria-live="polite" aria-atomic="true">
                {state.message && <p className="mt-4 text-sm text-red-500">{state.message}</p>} 
                {/* {state.errors && <p>{state.errors ? JSON.stringify(state.errors) : ''}</p>} */}
            </div>
        </form>
    ); 
}