'use client'; 

import { Card, TextInput, Button } from '@tremor/react'; 
import { RiArrowRightLine } from '@remixicon/react'; 
import { useFormState, useFormStatus } from 'react-dom'; 
import { authenticate } from '@/lib/actions'; 

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined); 
    const { pending } = useFormStatus(); 

    return (
        <Card className="mx-auto max-w-xs shadow-lg">
            <p className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Login</p> 
            <p className="text-sm text-tremor-content-subtle dark:text-dark-tremor-content-subtle">Sign in below to view the dashboard.</p>

            <form action={dispatch}>
                <div>
                    <div>
                        <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="username">Username</label>
                        <TextInput id="username" name="username" type="text" placeholder="Type here..." />
                    </div>
                    <div className="mt-4 mb-3">
                        <label className="block mt-5 mb-2 text-sm font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" htmlFor="password">Password</label> 
                        <TextInput id="password" name="password" type="password" placeholder="Type here..." /> 
                    </div>
                    <Button className="w-full mt-6" icon={RiArrowRightLine} iconPosition="right" loading={pending} loadingText="Logging in...">Login</Button> 
                </div>
                <div id="form-error" aria-live="polite" aria-atomic="true">
                    {errorMessage && 
                        <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
                    } 
                </div>
            </form>
        </Card>
    ); 
}