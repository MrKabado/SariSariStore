import express from 'express';
const app = express();

app.use('/api/testing', (req, res) => {
    res.send('tanga');
})


app.use(express.json())

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
})

// MVC architecture
// reasearch about cors
// mongoose
// validation using joi or any basic validation
// zod sa frontend para connecrt or global state management
//dami toll!!!
