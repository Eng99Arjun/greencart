import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req,res) => {
   res.send("API is Working");
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
