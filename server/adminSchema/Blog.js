// src/Schema/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    // ... fields ...
}, { 
    collection: 'my_custom_blogs' // Custom collection name
});

export default mongoose.model('Blog', blogSchema);
