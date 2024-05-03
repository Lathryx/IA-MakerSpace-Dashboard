import ItemsTable from '@/ui/dashboard/items/table'; 
import SearchBar from '@/ui/dashboard/search'; 
import { AddItemButton } from '@/ui/dashboard/buttons'; 
import { getItemsPages } from '@/lib/data'; 
import Pagination from '@/ui/dashboard/pagination'; 

export default async function Page({ 
    searchParams 
}: { 
    searchParams?: { 
        query?: string; 
        page?: string; 
    }; 
}) { 
    const query = searchParams?.query || ''; 
    const currentPage = Number(searchParams?.page) || 1; 

    const totalPages = await getItemsPages(query); 

    return (
        <div className="w-full">
            <div className="flex items-center justify-between my-4 gap-2">
                <SearchBar /> 
                <AddItemButton /> 
            </div>
            <ItemsTable query={query} currentPage={currentPage} /> 
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} /> 
            </div>
        </div>
    ); 
}