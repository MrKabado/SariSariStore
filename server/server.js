import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
}));
app.use(express.json())

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const ItemSchema = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
});

const DebtSchema = new mongoose.Schema({
    name: String,
    category: String,
    item: String,
    price: Number,
})

const Item = mongoose.model('Item', ItemSchema);
const Debt = mongoose.model('Debt', DebtSchema);


//GET
app.get('/items', async (req, res) => { //KUHA DATA GIKAN SA DATABASE
    try {
        const items = await Item.find();
        res.json(items);
    }   catch (err) { 
        res.status(500).json({message: 'Server Error'});
    }
});

app.get('/debts', async (req, res) => {
    try {
        const debts = await Debt.find();
        res.json(debts);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
})


//POST
app.post('/items', async (req, res) => { //SEND DATA SA DATABASE
    const {category, name, price} = req.body;

    try {
        const newItem = new Item({category, name, price});
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/debts', async (req, res) => {
    const {name, category, item, price} = req.body;

    try {
        const newDebt = new Debt({name, category, item, price});
        await newDebt.save();
        res.status(201).json(newDebt);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
})


//PUT
app.put('/items/:id', async (req, res) => { //MAG UPDATE OG DATA SA DATABASE

    const { id } = req.params;
    const { name, price } = req.body;

    try {
        const updatedItems = await Item.findByIdAndUpdate(
            id,
            { name, price },
            { new: true }
        );
        res.json(updatedItems);
    } catch (err) {
        res.status(500).json({ message: 'Update Error' });
    }
});

app.put('/debts/:id', async (req, res) => {
    const {id} = req.params;
    const { category, item, price } = req.body;

    try {
        const updatedDebts = await Debt.findByIdAndUpdate(
            id,
            { category, item, price },
            { new: true }
        );
        res.json(updatedDebts);
    } catch (err) {
        res.status(500).json({ message: 'Update Error' });
    }
});


//DELETE
app.delete('/items/:id', async (req, res) => { //DELETE DATA FROM DATABASE
    const { id } = req.params;

    try {
        await Item.findByIdAndDelete(id);
        res.json({ message: 'Item deleted'});
    } catch {
        res.status(500).json({ message: 'Delete Error' });
    }
});

app.delete('/debts/name/:name', async (req, res) => {
    const { name } = req.params;

    try {
        await Debt.deleteMany({ name });
        res.json({ message: `${name} Debt Deleted`});
    } catch {
        res.status(500).json({ message: 'Delete Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});





// MVC architecture
// reasearch about cors
// mongoose
// validation using joi or any basic validation
// zod sa frontend para connecrt or global state management
//dami toll!!!

//user: admin
//pass: admin11182004

//connection string
//mongodb+srv://admin:admin11182004@cluster0.sptvadg.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0