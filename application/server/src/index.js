const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const v1_OrderRouter = require('./v1/routes/OrderRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send('TEST TEST');
});

app.use(bodyParser.json());
app.use("/api/v1/orders", v1_OrderRouter);

app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
});