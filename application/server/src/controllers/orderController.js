const orderService = require("../services/orderService");

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await orderService.getAllOrders();
        res.send({ status: "OK", data: allOrders });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneOrder = async (req, res) => {
    // TODO: orderId params checking
    const {
        params: { orderId }
    } = req;
    if (!orderId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':orderId' can not be empty" }
            });
    }
    try {
        const order = await orderService.getOneOrder(orderId);
        res.send({ status: "OK", data: order });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewOrder = async (req, res) => {
    const { body } = req;
    if (
        !body.orderId ||
        !body.status ||
        !body.createdAt
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                        "One of the following key is missing or is empty in request body"
                }
            });
    }

    const newOrder = {
        orderId: body.orderId,
        assetId: body.assetId,
        assetName: body.assetName,
        price: body.price,
        quantity: body.quantity,
        senderId: body.senderId,
        receiveId: body.receiveId,
        status: body.status,
        trackingInfo: [],
        createdAt: body.createdAt,
        updatedAt: body.updatedAt
    };
    try {
        const createdOrder = await orderService.createNewOrder(newOrder);
        res.status(201).send({ status: "OK", data: createdOrder });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneOrder = async (req, res) => {
    const {
        body,
        params: { orderId }
    } = req;
    if (!orderId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':orderId' can not be empty" }
            });
    }
    try {
        const updatedOrder = orderService.updateOneOrder(orderId, body);
        res.send({ status: "OK", data: updatedOrder });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllOrders,
    getOneOrder,
    createNewOrder,
    updateOneOrder
};