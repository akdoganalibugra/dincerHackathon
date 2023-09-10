const express = require('express');
const bodyParser = require('body-parser');

const v1_OrderRouter = require('./v1/routes/OrderRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/orders", v1_OrderRouter);

app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
});