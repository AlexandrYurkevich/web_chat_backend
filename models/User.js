import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true } //createdAt,updatedAt
)

const User = mongoose.model('User', userSchema)
export default User
