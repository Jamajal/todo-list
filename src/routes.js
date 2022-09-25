const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const todosRoutes = Router();

todosRoutes.post('/todos/add', async (req, res) => {
    const { name } = req.body;

    const todo = await prisma.todo.create({
        data: {
            name,
        }
    });

    res.send(todo);
});

todosRoutes.get('/todos/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);

    const todo = await prisma.todo.findUnique({
        where: {
            id: itemId
        }
    });

    res.send(todo);
});

todosRoutes.get('/todos', async (req, res) => {
    const todo = await prisma.todo.findMany();

    res.send(todo);
});

todosRoutes.delete('/todos/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);

    const todo = await prisma.todo.findUnique({
        where: {
            id: itemId
        }
    });

    const name = todo.name;

    await prisma.todo.delete({
        where: {
            id: itemId
        }
    });

    res.status(200).send(`${name} todo was erased!`);
});

todosRoutes.put('/todos/:id/update', async (req, res) => {
    const itemId = parseInt(req.params.id);

    const { name, status } = req.body;

    const oldTodo = await prisma.todo.findUnique({
        where: {
            id: itemId
        }
    });

    const todo = await prisma.todo.update({
        where: {
            id: itemId
        },
        data: {
            name: name ? name : oldTodo.name,
            status: status ? status : oldTodo.status
        }
    });

    res.send(todo);
});

module.exports = todosRoutes;