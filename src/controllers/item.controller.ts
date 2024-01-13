import express from 'express';
import ItemModel from 'model/item.model';
import { StandardResponse } from '../response/StandardResponse';

async function getAllItems(req: express.Request, res: express.Response) {
    try {
        let items = await ItemModel.find();
        res.status(200).send(new StandardResponse(200, "Items found", items));
    } catch (err) {
        res.status(500).send(new StandardResponse(500, "Something went wrong", null));
    }
}

