const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'j01l01??',
});

// Define the Book model
class Book extends Model {}
Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
}, { sequelize, modelName: 'book' });

// Create the Express app
const app = express();

// Add middleware to parse JSON in request body
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/books');
});

// Define CRUD endpoints for the Book resource
app.post('/books', async (req, res) => {
    const { title, author, publisher } = req.body;
    const book = await Book.create({ title, author, publisher });
    res.status(201).json(book);
});

app.get('/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

app.get('/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).end();
    }
});

app.put('/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        const { title, author, publisher } = req.body;
        await book.update({ title, author, publisher });
        res.json(book);
    } else {
        res.status(404).end();
    }
});

app.delete('/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

