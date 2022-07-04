import { db , objectId } from "../databases/mongo.js"

export async function getRecords(req, res){    
    const session = res.locals.session;

    const records = await db.collection("records").find({ userId: new objectId(session.userId) }).toArray()
    
    res.send(records);    
}

export async function postRecord(req, res){
    const record = req.body
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const session = await db.collection('sessions').findOne({ token });
    

    if (!session) {
        return res.sendStatus(401);
    }

    try {
        await db.collection('records').insertOne({...record, userId: session.userId});
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
}