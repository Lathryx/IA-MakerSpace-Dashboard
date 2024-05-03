'use client'; 

import { TextInput } from '@tremor/react'; 
import { RiSearchLine } from '@remixicon/react'; 
import { useSearchParams, usePathname, useRouter } from 'next/navigation'; 
import { useDebouncedCallback } from 'use-debounce'; 

export default function SearchBar() {
    const searchParams = useSearchParams(); 
    const pathname = usePathname(); 
    const { replace } = useRouter(); 

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams); 
        params.set('page', '1'); 

        if (term) {
            params.set('query', term); 
        } else {
            params.delete('query');  
        }

        replace(`${pathname}?${params.toString()}`); 
    }, 300); 

    return (
        <TextInput onChange={e => handleSearch(e.target.value)} defaultValue={searchParams.get('query')?.toString()} icon={RiSearchLine} placeholder="Search..." /> 
    ); 
}