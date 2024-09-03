const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/faceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir el esquema y modelo para las personas
const personSchema = new mongoose.Schema({
    name: String,
    faceDescriptor: [Number],
});

const Person = mongoose.model('Person', personSchema);

app.use(cors());
app.use(express.json());

// Ruta para guardar los datos faciales
app.post('/save-face', async (req, res) => {
    const { name, descriptor } = req.body;
    try {
        const person = new Person({ name, faceDescriptor: descriptor });
        await person.save();
        res.status(200).send('Persona guardada exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al guardar los datos');
    }
});

// Ruta para obtener todas las personas (opcional)
app.get('/persons', async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
