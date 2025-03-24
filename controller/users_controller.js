import { findUser, createUser, deleteUser, updateUser} from "../module/Customers.js";

const findUserHandler = async (req, res) => {
    const { email } = req.body; 
    try {
        const user = await findUser(email); 
        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid credentials' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUserHandler = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        const existingUser = await findUser(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const user = await createUser(username, email, password);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error in createUserHandler:', err);
        res.status(500).json({ message: err.message });
    }
};

const deleteUserHandler = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await findUser(email);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await deleteUser(email);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUserHandler = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await findUser(email);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await updateUser(username, email, password); 
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { findUserHandler, createUserHandler, deleteUserHandler, updateUserHandler };