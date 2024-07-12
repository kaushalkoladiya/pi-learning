import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import generateSecretKey from '../utils/jwtsecretkey.js';
import CryptoJS from 'crypto-js';

dotenv.config();

const decrypt = (encryptedText, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const register = async (req, res) => {
    const {password, email, user_type, first_name, last_name, gender} = req.body;
    try {
        const errors = {};

        // Check if email already exists
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            errors.email = 'Email is already taken';
        }

        // If there are errors, return them
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // Decrypt the password from the request payload
        const secretKey = process.env.JWT_SECRET_KEY;
        const decryptedPassword = decrypt(password, secretKey);

        const hashedPassword = await bcrypt.hash(decryptedPassword, 10);
        console.log("hashed password:", hashedPassword);

        const user = await User.create({
            password: hashedPassword,
            email,
            user_type,
            first_name,
            last_name,
            gender
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        const decryptedPassword = decrypt(password, secretKey);

        const isMatch = await bcrypt.compare(decryptedPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate secret key
        generateSecretKey();

        const token = jwt.sign({ id: user.id, email: user.email, user_type: user.user_type }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { register, login };
