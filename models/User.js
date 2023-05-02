import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        login: {
            type: String
        },
        password: {
            type: String
        }
    },
    { timestamps: true } //createdAt,updatedAt
)

const User = mongoose.model('User', userSchema)
export default User
