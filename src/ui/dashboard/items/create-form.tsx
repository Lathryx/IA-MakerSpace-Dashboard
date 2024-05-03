'use client'; 

import Link from 'next/link'; 
import { TextInput, NumberInput, Switch, Button } from '@tremor/react'; 
import { RiAddLine } from '@remixicon/react'; 
import { useFormState } from 'react-dom'; 
import { createItem } from '@/lib/actions'; 

export default function CreateItemForm() {
    const initialState = { message: '', errors: {} }; 
    const [state, dispatch] = useFormState(createItem, initialState); 

    return (
        <form action={dispatch}>
            <div>
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="name">Name</label>
                <TextInput id="name" name="name" type="text" placeholder="Item name..." error={!!state.errors?.name} errorMessage={state.errors?.name?.join('\n')} />
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="quantity">Quantity</label> 
                <NumberInput id="quantity" name="quantity" min={0} placeholder="Quantity of item..." error={!!state.errors?.quantity} errorMessage={state.errors?.quantity?.join('\n')} /> 
            </div>
            <div className="mt-4 mb-3">
                <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="consumable">Consumable</label> 
                <Switch id="consumable" name="consumable" error={!!state.errors?.consumable} errorMessage={state.errors?.consumable?.join('\n')} /> 
            </div>
            <div className="flex items-center justify-end gap-2">
                <Link href="/dashboard/items">
                    <Button variant="secondary">Cancel</Button>
                </Link> 
                <Button type="submit" icon={RiAddLine} iconPosition="right">Create Item</Button> 
            </div>
            <div id="form-error" aria-live="polite" aria-atomic="true">
                {state.message && <p className="mt-4 text-sm text-red-500">{state.message}</p>} 
            </div>
        </form>
    ); 
}