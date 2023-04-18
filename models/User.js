import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        login: {
            type: String,
            require: true,
            min: 1,
            max: 20
        },
        password: {
            type: String,
            required: true,
            min: 6
        }
    },
    { timestamps: true } //createdAt,updatedAt
)

const User = mongoose.model('User', userSchema)
export default User
