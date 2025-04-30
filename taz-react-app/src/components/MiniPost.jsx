// MiniPost.jsx
import React from 'react';

const MiniPost = ({ post }) => {

    if (!post) {
        return null;
    }

    const categoryImageUrl = `${process.env.PUBLIC_URL}/images/${post.category_img_url}`; // カテゴリ画像のパスを生成
    const postImageUrl = `${process.env.PUBLIC_URL}/images/${post.image_url}`; // 投稿画像のパスを生成

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