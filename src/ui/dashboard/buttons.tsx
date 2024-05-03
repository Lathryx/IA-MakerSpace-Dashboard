'use client'; 

import Link from 'next/link'; 
import { RiAddLine, RiEdit2Fill, RiDeleteBin6Fill } from '@remixicon/react'; 
import { Button, Dialog, DialogPanel } from '@tremor/react'; 
import { useState } from 'react'; 
import { deleteItem } from '@/lib/actions'; 

export function AddItemButton() {
    return (
        <Link href="/dashboard/items/create">
            <Button icon={RiAddLine} variant="primary">Add Item</Button> 
        </Link>
    ); 
}

export function EditItemButton({ itemId }: { itemId: string }) {
    return (
        <Link href={`/dashboard/items/${itemId}/edit`}>
            <Button icon={RiEdit2Fill} variant="secondary" tooltip="Edit" />
        </Link>
    ); 
}

export function DeleteItemButton({ 
    itemId, 
    itemName 
}: { 
    itemId: string; 
    itemName: string; 
}) {
    const [isOpen, setIsOpen] = useState(false); 
    const deleteItemWithId = deleteItem.bind(null, itemId); 

    return (
        <div>
            <Button onClick={() => setIsOpen(true)} icon={RiDeleteBin6Fill} variant="primary" color="red" tooltip="Delete" /> 
            <Dialog open={isOpen} onClose={val => setIsOpen(val)} static={true}>
                <DialogPanel>
                    <p className="mb-3 text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Delete <span className="bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle font-mono">{itemName}</span> Item</p>
                    <p>Are you sure you want to delete this item?</p>
                    <div className="flex flex-col items-center justify-center gap-2 mt-10">
                        <form className="w-full" action={deleteItemWithId}>
                            <Button className="w-full" variant="primary" color="red" onClick={() => setIsOpen(false)}>Confirm</Button>
                        </form>
                        <Button className="w-full" variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    ); 
}