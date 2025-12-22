import { model, Schema } from "mongoose"

const noteSchema = new Schema({
    // title: String,
    title: {type: String, required: true, trim: true}, // trim will remove extra white spaces "           Hello World        "
    // content: String,
    content: {type: String, default: ''},
    // publishDate: Number,
    category: {
        type: String,
        enum: ['personal', 'work', 'study', 'other'],
        default: 'personal'
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: {type: String, required: true},
        color: {type: String, default: 'gray'}
    }
},
{
    versionKey: false,
    timestamps: true
}
)

export const Note = model('Note', noteSchema)