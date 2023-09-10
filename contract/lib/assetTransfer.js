'use strict';

const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                orderId: "46a500f7-8ec1-43be-8cd6-28ea6ae4f224",
                assetId: "8832fe92-23a5-4b7d-a7e3-0a1908874502",
                assetName: "television",
                price: 30000,
                quantity: 100,
                senderId: "fb7e6e46-4f0c-45ff-933a-f7b5eff59894",
                receiveId: "e8313d19-2545-456b-8857-c63ae7e734e5",
                status: "INITIALIZED_LEDGER",
                trackingInfo: [],
                createdAt: "10/09/2023, 7:21:56 AM",
                updatedAt: "10/09/2023, 9:26:12 AM",
            },
            {
                orderId: "7f1d2e0d-9a33-4f14-bb0c-31fc8f22104a",
                assetId: "a91987e6-6bc3-4a4a-9f54-7321c0ee03e8",
                assetName: "laptop",
                price: 25000,
                quantity: 150,
                senderId: "d8e6c8bb-6ff3-48b2-84fb-2955be3d1ac1",
                receiveId: "fc5bd327-9e55-4d76-b198-8a0b5e4f1ec3",
                status: "INITIALIZED_LEDGER",
                trackingInfo: [],
                createdAt: "10/09/2023, 3:45:30 PM",
                updatedAt: "10/09/2023, 5:18:22 PM"
            },
            {
                orderId: "3b176bae-afc6-4c5d-8db9-fc9c52d1f768",
                assetId: "b3e105a2-118b-4a89-b318-8c882e8a5b95",
                assetName: "smart phone",
                price: 15000,
                quantity: 8000,
                senderId: "a2f8a361-5b57-40d9-ba42-ae2f9c3edee7",
                receiveId: "99d8b39f-4f42-4981-87ce-3a432dc825a8",
                status: "INITIALIZED_LEDGER",
                trackingInfo: [],
                createdAt: "10/09/2023, 9:12:18 AM",
                updatedAt: "10/09/2023, 11:05:47 AM"
            },
            {
                orderId: "9e441c6d-6a6e-4d3a-a920-1f7e69f8dbf1",
                assetId: "23ff3183-ee75-4953-8eeb-f6f1f063f153",
                assetName: "keyboard",
                price: 3000,
                quantity: 12000,
                senderId: "c7a329e8-9e48-4f7c-8b95-8a20b399feb5",
                receiveId: "61e825c4-0a85-4f2b-b1f8-5e61cfb94f73",
                status: "INITIALIZED_LEDGER",
                trackingInfo: [],
                createdAt: "10/09/2023, 1:55:04 PM",
                updatedAt: "10/09/2023, 3:38:11 PM"
            },
            {
                orderId: "c4df05a3-4b1b-4299-a9c6-43a95e4f8da7",
                assetId: "f524b8d2-8314-4c33-9bf9-77fb71d69557",
                assetName: "cable",
                price: 20,
                quantity: 60000,
                senderId: "1e5b7d64-1a5c-4b31-9981-c8b3a218b16d",
                receiveId: "b3e91d8d-179c-47f9-a05d-36c292e8f8c6",
                status: "INITIALIZED_LEDGER",
                trackingInfo: [],
                createdAt: "10/09/2023, 6:27:39 AM",
                updatedAt: "10/09/2023, 8:14:52 AM"
            }
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.orderId, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, _orderId, _assetId, _assetName, _price, _quantity, _senderId, _receiveId, _status, trackingInfo, _createdAt, _updatedAt) {
        const exists = await this.AssetExists(ctx, _orderId);
        if (exists) {
            throw new Error(`The asset ${_orderId} already exists`);
        }

        const asset = {
            orderId: _orderId,
            assetId: _assetId,
            assetName: _assetName,
            price: _price,
            quantity: _quantity,
            senderId: _senderId,
            receiveId: _receiveId,
            status: _status,
            trackingInfo: [],
            createdAt: _createdAt,
            updatedAt: _updatedAt
        };
        
        await ctx.stub.putState(_orderId, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, _orderId) {
        const assetJSON = await ctx.stub.getState(_orderId); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${_orderId} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, _orderId, _status, _updatedAt) {
        const exists = await this.AssetExists(ctx, _orderId);
        if (!exists) {
            throw new Error(`The asset ${_orderId} does not exist`);
        }

        const assetString = await this.ReadAsset(ctx, _orderId);
        const asset = JSON.parse(assetString);
        asset.status = _status;
        asset.updatedAt = _updatedAt
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return await ctx.stub.putState(_orderId, Buffer.from(stringify(sortKeysRecursive(asset))));
        // const updatedAsset = await this.ReadAsset(ctx, _orderId);
        // return updatedAsset;
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, _orderId) {
        const exists = await this.AssetExists(ctx, _orderId);
        if (!exists) {
            throw new Error(`The asset ${_orderId} does not exist`);
        }
        return ctx.stub.deleteState(_orderId);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, _orderId) {
        const assetJSON = await ctx.stub.getState(_orderId);
        return assetJSON && assetJSON.length > 0;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
