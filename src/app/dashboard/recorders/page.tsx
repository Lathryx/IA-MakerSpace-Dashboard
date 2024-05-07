import RecordersTable from '@/ui/dashboard/recorders/table'; 
import SearchBar from '@/ui/dashboard/search'; 
import { NewRecorderButton } from '@/ui/dashboard/buttons'; 
import { getRecordersPages } from '@/lib/data'; 
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

    const totalPages = await getRecordersPages(query); 

    return (
        <div className="w-full">
            <div className="flex items-center justify-between my-4 gap-2">
                <SearchBar /> 
                <NewRecorderButton /> 
            </div>
            <RecordersTable query={query} currentPage={currentPage} /> 
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} /> 
            </div>
        </div>
    ); 
}