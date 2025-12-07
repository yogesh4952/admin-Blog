import blog from '../models/blog.js';
export const postBlog = async (req, res) => {
    console.log(req.body);
    try {
        const { title, author, content } = req.body;
        if (!title || !author || !content)
            return res.json({
                success: false,
                message: 'All fields are required',
            });
        const data = { title, author, content };
        await blog.create(data);
        return res.json({
            success: true,
            message: 'Post success',
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.json({
                success: false,
                message: error.message,
            });
    }
};
//# sourceMappingURL=blogController.js.map