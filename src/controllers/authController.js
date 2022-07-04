import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { db } from "../databases/mongo.js"

export async function cadastrar(req, res){
    
    try{
        const {name, email, password} = req.body

        const usuarioExistente = await db.collection('users').findOne({email})
        if(usuarioExistente){
            res.status(404).send("Email já cadastrado")
            return
        }
        else{
            const passwordHash = bcrypt.hashSync(password, 10)

            await db.collection('users').insertOne({name, email, password: passwordHash}) 
    
            res.sendStatus(201)
        }
        
    }catch(err){
        
        console.log(err)
        res.status(500).send(err)
        return
    }
    
}

export async function logar(req, res){
    try{
        const {email, password} = req.body

        const user = await db.collection('users').findOne({email})
    
        if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid()
            
            await db.collection("sessions").insertOne({
                userId: user._id,
                token,
                
            })
    
            res.status(200).send({name: user.name, token});
    
        }else{
            
            res.sendStatus(401)
        }
    }catch(err){
        
        console.log(err)
        res.status(500).send(err)
        return
    }
    
}