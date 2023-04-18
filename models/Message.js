import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    sender: String,
    text: String,
    sended: String
})

const Message = mongoose.model('Message', messageSchema)
export default Message
