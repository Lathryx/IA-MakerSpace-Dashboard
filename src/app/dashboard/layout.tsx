import SideNav from '@/ui/dashboard/sidenav'; 

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row h-screen md:overflow-hidden bg-tremor-background dark:bg-dark-tremor-background">
            <div className="w-full flex-none md:w-64">
                <SideNav /> 
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    ); 
}