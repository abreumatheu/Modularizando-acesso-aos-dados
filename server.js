const express = require('express');
const AlunosDatabase = require('./AlunosDatabase');

const app = express();
app.use(express.json());

app.post('/alunos', async (req, res) => {
    try {
        const aluno = req.body;
        const result = await AlunosDatabase.insert(aluno);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert aluno' });
    }
});

app.get('/alunos', async (req, res) => {
    try {
        const result = await AlunosDatabase.list();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list alunos' });
    }
});

app.get('/alunos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await AlunosDatabase.get(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Aluno not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get aluno' });
    }
});

app.put('/alunos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const aluno = req.body;
        const result = await AlunosDatabase.update(aluno, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update aluno' });
    }
});

app.delete('/alunos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await AlunosDatabase.del(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete aluno' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
