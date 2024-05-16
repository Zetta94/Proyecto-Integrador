import {Router} from "express"
const router = Router()
import messageModel from "../models/message.model.js"
import { getIO } from "../app.js"

router.get("/",async(req,res)=>{
    try{
        let messages = await messageModel.find().lean()
        res.render('chat', { messages })
    }catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try{
        let { user, message } = req.body
        if (!user || !message) {
            res.send({ status: "error", error: "Faltan parametros" })
        }
        let newMessage = await messageModel.create({ user, message })
        const socketServer = getIO()
        socketServer.emit('newMessage', newMessage)
        res.render('chat', { successMessage: '¡El mensaje se ha guardado correctamente!' })
    }catch(error){
        console.log(error)
    }
})

export default router