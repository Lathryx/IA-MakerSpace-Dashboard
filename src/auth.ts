import NextAuth from 'next-auth'; 
import { authConfig } from '@/auth.config'; 
import Credentials from 'next-auth/providers/credentials'; 
import bcrypt from 'bcrypt'; 
import { z } from 'zod'; 
import { User } from '@/lib/definitions'; 
import { pool } from '@/db'; 

async function getUser(username: string): Promise<User | undefined> {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE name = '${username}'`); 
        return user.rows[0]; 
    } catch (error) {
        console.error('Failed to fetch user: ', error); 
        throw new Error('Failed to fetch user.'); 
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig, 
    providers: [
        Credentials({
            credentials: {
                username: {}, 
                password: {} 
            }, 
            authorize: async (credentials) => {
                const parsedCredentials = z.object({ username: z.string().min(1), password: z.string().min(6) }).safeParse(credentials); 

                if (!parsedCredentials.success) {
                    console.log('Invalid credentials.'); 
                    return null; 
                } 

                const { username, password } = parsedCredentials.data; 
                const user = await getUser(username); 
                if (!user) {
                    console.log('User not found.'); 
                    return null; 
                } 
                const passwordsMatch = await bcrypt.compare(password, user.password); 

                if (passwordsMatch) return user as any; 
            } 
        }) 
    ] 
}); 