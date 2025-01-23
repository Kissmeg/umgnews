import mysql from 'mysql2';

// Kreiraj connection pool
const pool = mysql.createPool({
    host: 'umgnews.com',
    user: 'u267629566_umgnews',
    password: 'Najjacafirmetina1@',
    database: 'u267629566_umgnews',
    waitForConnections: true,
    connectionLimit: 10,  // Maksimalni broj konekcija u pool-u
    queueLimit: 0         // Nema ograničenja za čekanje na slobodnu konekciju
});

// Omogućava korišćenje Promisa sa pool-om
const promisePool = pool.promise();

export default promisePool;