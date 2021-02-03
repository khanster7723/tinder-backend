import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cards from './dbcards.mjs';

//App Config
const app = express();
const port = process.env.PORT || 8000;
const password = 'zojSwoXhY8iXDdfx';
const dbname = 'tinderdb'
const connection_url = `mongodb+srv://admin:zojSwoXhY8iXDdfx@cluster0.35tiy.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//Middlewares
app.use(express.json());
app.use(cors());

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send("Hello From Root");
});

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards', (req, res) => {

    cards.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })

})

//Listener
app.listen(port, () => {
    console.log(`Listening on localhost: ${port}`);
})
