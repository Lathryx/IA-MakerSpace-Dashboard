import pg from 'pg'; 
import bcrypt from 'bcrypt'; 

async function seedUser(pool, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10); 
    await pool.query(`
        INSERT INTO users (user_id, name, password) 
        VALUES (DEFAULT, '${username}', '${hashedPassword}'); 
    `); 

    console.log('User seeded!'); 
    console.log('Username: ', username); 
    console.log('Password: ', password);  
}

async function main() {
    const pool = new pg.Pool(); 
    await seedUser(pool, 'admin', 'slab24!'); 
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});  