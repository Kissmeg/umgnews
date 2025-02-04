import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import promisePool from '../db.js';
import dotenv from 'dotenv';
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(process.env.JWT_SECRET);
        
        // Provera da li admin postoji u bazi
        const [results] = await promisePool.query('SELECT * FROM admin WHERE email = ?', [email]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: "Administrator nije pronađen." });
        }

        const admin = results[0];

        // Provera lozinke
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Pogrešna šifra ili email adresa!" });
        }

        // Generisanje JWT tokena
        const token = jwt.sign(
            { id: admin.id, username: admin.username, email: admin.email },
            process.env.JWT_SECRET, // Ovu vrednost prebaci u `.env` u pravom projektu!
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 'success',
            token,
            message: 'Uspešno ulogovan.',
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Došlo je do greške prilikom prijave." });
    }
};


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Provera da li admin već postoji
        const [existingAdmin] = await promisePool.query('SELECT * FROM admin WHERE email = ?', [email]);
        if (existingAdmin.length > 0) {
            return res.status(400).json({ message: "Admin sa ovim emailom već postoji!" });
        }

        // Haširanje lozinke
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Ubacivanje admina u bazu
        const query = 'INSERT INTO admin (username, email, password) VALUES (?, ?, ?)';
        await promisePool.query(query, [username, email, hashedPassword]);

        res.status(201).json({ message: "Admin uspešno registrovan!" });
    } catch (error) {
        res.status(500).json({ message: "Došlo je do greške pri registraciji." });
    }
};

export function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    const bearerToken = bearerHeader.split(" ")[1];

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    console.log("Decoded token:", decoded); // Loguj decoded token

    if (!decoded.id || !decoded.username) {  // Ako nedostaje 'id' ili 'username'
        console.error("Invalid token payload:", decoded); // Loguj nevalidni payload
        return res.status(403).json({ message: "Invalid token payload - Missing required fields" });
    }

    req.user = decoded; // Token je validan, prosleđujemo user podatke u request
    next();
});

}
export { login, register };
