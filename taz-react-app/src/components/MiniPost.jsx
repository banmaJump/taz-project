// MiniPost.jsx
import React from 'react';

const MiniPost = ({ post }) => {

    if (!post) {
        return null;
    }

    const isExternal = (url) => {
        return url && (url.startsWith('http://') || url.startsWith('https://'));
    };

    const categoryImageUrl = isExternal(post.category_img_url)
        ? post.category_img_url
        : `${process.env.PUBLIC_URL}/images/${post.category_img_url}`;

    const postImageUrl = isExternal(post.image_url)
        ? post.image_url
        : `${process.env.PUBLIC_URL}/images/${post.image_url}`;

    return (
        <article className="mini-post">
            <header>
                <h3><a href={`/post/${post.id}`}>{post.title}</a></h3>
                <time className="published" dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString()}
                </time>
                <a href={`/category/${post.category_id}`} className='author'><img src={categoryImageUrl} alt={post.category_name} /></a>
            </header>
            <a href={`/post/${post.id}`} className="image"><img src={postImageUrl} alt={post.title} /></a>
        </article>
    );
};

export default MiniPost;