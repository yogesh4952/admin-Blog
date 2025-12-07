import mongoose from 'mongoose';
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const blog = mongoose.model('blog', BlogSchema);
export default blog;
//# sourceMappingURL=blog.js.map