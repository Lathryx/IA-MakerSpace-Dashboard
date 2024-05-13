'use client'; 

import { RiDashboardFill, RiBookFill, RiShapesFill, RiGraduationCapFill, RiTeamFill } from '@remixicon/react'; 
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 
import clsx from 'clsx'; 

const routes = [
    { name: 'Dashboard', href: '/dashboard', icon: RiDashboardFill },
    { name: 'Orders', href: '/dashboard/orders', icon: RiBookFill }, 
    { name: 'Items', href: '/dashboard/items', icon: RiShapesFill }, 
    { name: 'Students', href: '/dashboard/students', icon: RiGraduationCapFill },
    { name: 'Recorders', href: '/dashboard/recorders', icon: RiTeamFill } 
]; 

export default function NavLinks() {
    const pathname = usePathname(); 

    return (
        <>
            {routes.map(route => {
                const RouteIcon = route.icon; 
                return (
                    <Link 
                        className={clsx(
                            "flex items-center gap-3 my-3 p-3 rounded-lg",
                            {
                                "hover:bg-tremor-background-subtle dark:hover:bg-dark-tremor-background-subtle": pathname !== route.href, 
                                "bg-tremor-brand-muted dark:bg-dark-tremor-brand-muted": pathname === route.href 
                            }
                        )} 
                        href={route.href} 
                        key={route.name}
                        >
                        <RouteIcon className="w-6" /> 
                        <p className="hidden md:block">{route.name}</p> 
                    </Link>
                ); 
            })} 
        </>
    ); 
}