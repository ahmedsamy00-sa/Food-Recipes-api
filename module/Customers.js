import pkg from '../config/server.cjs';
import { hashPassword, comparePassword } from '../utils/hashPassword.js'; 
const { sql } = pkg;

const findUser = async (email) => {
    try {
        const result = await sql.query`SELECT * FROM Customers WHERE Email = ${email}`;
        const user = result.recordset[0];

        if (!user) {
            return null;
        }

        const isMatch = await comparePassword(password, user.Password);
        if (!isMatch) {
            return null; 
        }

        return {
            UserID: user.UserID,
            Username: user.Username,
            Email: user.Email,
        };
    } catch (err) {
        console.error('Error fetching user:', err);
        throw new Error('Failed to fetch user');
    }
};

const createUser = async (username, email, password) => {
    try {
        const passwordHash = await hashPassword(password);

        const result = await sql.query`
            INSERT INTO Customers (Name, Email, Password)
            VALUES (${username}, ${email}, ${passwordHash})`;
        return {
            Name: username,
            Email: email,
        };
    } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Failed to create user: ' + err.message);
    }
};

const deleteUser = async (username) => {
    try {
        const userResult = await sql.query`SELECT * FROM Customers WHERE Name = ${username}`;
        if (!userResult.recordset[0]) {
            throw new Error('User not found');
        }

        await sql.query`DELETE FROM Customers WHERE Name = ${username}`;
        return { message: 'User deleted successfully' };
    } catch (err) {
        console.error('Error deleting user:', err);
        throw new Error('Failed to delete user');
    }
};

const updateUser = async (username, email, password) => {
    try {
        const userResult = await sql.query`SELECT * FROM Customers WHERE Name = ${username}`;
        if (!userResult.recordset[0]) {
            throw new Error('User not found');
        }

        const passwordHash = await hashPassword(password);

        await sql.query`
            UPDATE Customers
            SET Email = ${email}, Password = ${passwordHash}
            WHERE Name = ${username}
        `;

        return { message: 'User updated successfully' };
    } catch (err) {
        console.error('Error updating user:', err);
        throw new Error('Failed to update user');
    }
};

export { findUser, createUser, deleteUser, updateUser };