import { RiFileUnknowLine } from '@remixicon/react'; 
import Link from 'next/link'; 
import { Button } from '@tremor/react'; 

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <RiFileUnknowLine className="h-1/3 w-auto text-tremor-content-subtle" /> 
            <p className="text-2xl font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">Item not found.</p>
            <Link className="mt-7" href="/dashboard/items">
                <Button variant="light">
                    Go back to items
                </Button>
            </Link>
        </div>
    )
}