const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/user.routes')

const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.json());
const port = process.env.PORT || 5000;

app.use('/user',userRouter)

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
