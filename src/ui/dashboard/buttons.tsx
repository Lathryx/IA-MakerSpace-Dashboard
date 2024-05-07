'use client'; 

import Link from 'next/link'; 
import { RiAddLine, RiEdit2Fill, RiDeleteBin6Fill, RiSunLine, RiMoonFill, RiLogoutBoxLine } from '@remixicon/react'; 
import { Button, Dialog, DialogPanel, Switch } from '@tremor/react'; 
import { useState } from 'react'; 
import { deleteItem, deleteRecorder } from '@/lib/actions'; 
import { useTheme } from 'next-themes'; 

export function NewItemButton() {
    return (
        <Link href="/dashboard/items/create">
            <Button icon={RiAddLine} variant="primary">New Item</Button> 
        </Link>
    ); 
}

export function EditItemButton({ itemId }: { itemId: string }) {
    return (
        <Link href={`/dashboard/items/${itemId}/edit`}>
            <Button className="border-tremor-brand-muted dark:border-dark-tremor-brand-muted" icon={RiEdit2Fill} variant="secondary" tooltip="Edit" />
        </Link>
    ); 
}

export function DeleteButton({ 
    id, 
    type, 
    children 
}: { 
    id: string; 
    type: string; 
    children: React.ReactNode; 
}) {
    const [isOpen, setIsOpen] = useState(false); 
    let deleteWithId; 
    switch (type) {
        case 'item':
            deleteWithId = deleteItem.bind(null, id); 
            break; 
        case 'recorder': 
            deleteWithId = deleteRecorder.bind(null, id); 
            break; 
        case 'student': 
            deleteWithId = () => {};
            break;
        case 'order':
            deleteWithId = () => {};
            break;
        default: 
            deleteWithId = () => {}; 
            break; 
    }
    // explain the bind method: the bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. the 'null' value is used to set the 'this' value to the global object (in this case, the window object). we cannot simply call the deleteItem function with the itemId argument because the deleteItem function expects two arguments, the first being the itemId and the second being the dispatch function. by using the bind method, we can set the itemId argument to the value of the itemId variable and pass the resulting function to the form action attribute. (Copilot explanation) 

    return (
        <div>
            <Button onClick={() => setIsOpen(true)} icon={RiDeleteBin6Fill} variant="primary" color="red" tooltip="Delete" /> 
            <Dialog open={isOpen} onClose={val => setIsOpen(val)} static={true}>
                <DialogPanel>
                    {children} 
                    <div className="flex flex-col items-center justify-center gap-2 mt-10">
                        <form className="w-full" action={deleteWithId}>
                            <Button className="w-full" variant="primary" color="red" onClick={() => setIsOpen(false)}>Confirm</Button>
                        </form>
                        <Button className="w-full" variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    ); 
} 

export function NewRecorderButton() {
    return (
        <Link href="/dashboard/recorders/create">
            <Button icon={RiAddLine} variant="primary">New Recorder</Button> 
        </Link>
    ); 
}

export function EditRecorderButton({ recorderId }: { recorderId: string }) {
    return (
        <Link href={`/dashboard/recorders/${recorderId}/edit`}>
            <Button className="border-tremor-brand-muted dark:border-dark-tremor-brand-muted" icon={RiEdit2Fill} variant="secondary" tooltip="Edit" />
        </Link>
    ); 
}

export function SignOutButton() {
    return (
        <button className="flex items-center gap-3 my-3 p-3 w-full text-white rounded-lg bg-red-500 hover:bg-red-600 bg-opacity-75 hover:bg-opacity-75x">
            <RiLogoutBoxLine /> 
            <span className="text-sm">Sign Out</span> 
        </button> 
    ); 
} 

export function SwitchThemeButton() {
    const { theme, setTheme } = useTheme(); 

    return (
        <button className="flex items-center gap-3 my-3 p-3 w-full rounded-lg hover:bg-tremor-background-subtle dark:hover:bg-dark-tremor-background-subtle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <div>
                {theme === 'dark' ? <RiSunLine /> : <RiMoonFill />}
            </div>
            <span className="text-sm mr-auto">Switch Theme</span> 
            <Switch checked={theme === 'dark'} /> 
        </button>
    ); 
}