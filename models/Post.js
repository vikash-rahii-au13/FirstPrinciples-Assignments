import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        default: []
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Inactive', 'Active', 'Delete'],
        default: 'Active',
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model("Posts", postSchema)