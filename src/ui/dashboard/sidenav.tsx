import NavLinks from '@/ui/dashboard/nav-links'; 
import { SwitchThemeButton, SignOutButton } from '@/ui/dashboard/buttons';
import { signOut } from '@/auth'; 

export default function SideNav() {
    return (
        <div className="flex grow md:flex-col justify-between h-full m-2 p-3 text-tremor-content-emphasis bg-tremor-background-muted rounded-lg dark:text-dark-tremor-content-emphasis dark:bg-dark-tremor-background-muted">
            <NavLinks /> 
            <div className="hidden md:block grow w-full h-auto"></div>
            <SwitchThemeButton /> 
            <form className="self-center md:w-full" action={async () => {
                'use server'; 
                await signOut(); 
            }}>
                <SignOutButton /> 
            </form> 
        </div>
    ); 
}