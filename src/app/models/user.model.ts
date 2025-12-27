import { model, Schema } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const userSchema = new Schema<IUser>(
    {
        email: { 
            type: String, 
            required: true, 
            lowercase: true, 
            trim: true, 
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                },
                message: function (props) {
                    return `${props.value} is not a valid email`
                }
            }
        },
        firstName: { 
            type: String, 
            required: true, 
            trim: true, 
            minLength: 5, 
            maxLength: 10 
        },
        lastName: { 
            type: String, 
            required: true, 
            trim: true, 
            minLength: [5, 'Last name should be minimum 5 charecters long'], 
            maxLength: 10  
        },
        age: { 
            type: Number, 
            required: true, 
            min: [18, 'Age must be 18, got {VALUE}'], 
            max: 60 
        },
        password: { 
            type: String, 
            required: true 
        },
        role: {
            type: String,
            enum: {
                values: ["USER", "ADMIN", "SUPERADMIN"],
                message: "Role is not valid"
            },
            uppercase: true,
            default: 'USER'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export const User = model('User', userSchema)
