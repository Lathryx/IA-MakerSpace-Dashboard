'use client'; 

import Link from 'next/link'; 
import { TextInput, Select, SelectItem, Badge, Button } from '@tremor/react'; 
import { RiEdit2Fill } from '@remixicon/react'; 
import { useFormState } from 'react-dom'; 
import { updateStudent } from '@/lib/actions'; 
import { Student } from '@/lib/definitions'; 

export default function EditStudentForm({ student }: { student: Student }) {
    const initialState = { message: '', errors: {} }; 
    const updateRecorderWithId = updateStudent.bind(null, student.student_id); 
    const [state, dispatch] = useFormState(updateRecorderWithId, initialState); 

    return (
        <form action={dispatch}>
            <div>
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="id">ID</label>
                <TextInput id="id" name="id" type="text" placeholder="Student ID..." defaultValue={student.student_id} error={!!state.errors?.student_id} errorMessage={state.errors?.student_id?.join('\n')} />
            </div>
            <div>
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="name">Name</label>
                <TextInput id="name" name="name" type="text" placeholder="Recorder name..." defaultValue={student.name} error={!!state.errors?.name} errorMessage={state.errors?.name?.join('\n')} />
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="status">Status</label> 
                <Select id="status" name="status" defaultValue={student.status} error={!!state.errors?.status} errorMessage={state.errors?.status?.join('\n')}>
                    <SelectItem value="active">
                        <Badge color="green">Active</Badge>
                    </SelectItem>
                    <SelectItem value="inactive">
                        <Badge color="red">Inactive</Badge>
                    </SelectItem>
                </Select>
            </div>
            <div className="flex items-center justify-end gap-2">
                <Link href="/dashboard/students">
                    <Button variant="secondary">Cancel</Button>
                </Link> 
                <Button type="submit" icon={RiEdit2Fill} iconPosition="right">Edit Student</Button> 
            </div>
            <div id="form-error" aria-live="polite" aria-atomic="true">
                {state.message && <p className="mt-4 text-sm text-red-500">{state.message}</p>} 
            </div>
        </form>
    ); 
}