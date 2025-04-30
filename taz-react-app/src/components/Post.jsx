import React from 'react';

const Post = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            {posts.map((post) => {
                const categoryImageUrl = `${process.env.PUBLIC_URL}/images/${post.category_img_url}`; // カテゴリ画像パスを生成
                const postImageUrl = `${process.env.PUBLIC_URL}/images/${post.image_url}`; // 投稿画像パスを生成

                return (
                    <article key={post.id} className="post">
                        <header>
                            <div className="title">
                                <h2><a href={`/post/${post.id}`}>{post.title}</a></h2>
                                <p>{post.short_description || "Lorem ipsum dolor amet nullam consequat etiam feugiat"}</p>
                            </div>
                            <div className="meta">
                                <time className="published" dateTime={post.published_at}>
                                    {new Date(post.published_at).toLocaleDateString()}
                                </time>
                                <a href={`/category/${post.category_id}`}  className="author">
                                <span className="name">{post.category_name}</span>
                                    <a href={`/category/${post.category_id}`}><img src={categoryImageUrl} alt={post.category_name} /></a>
                                </a>
                            </div>
                        </header>
                        <a href={`/post/${post.id}`} className="image featured">
                            <img src={postImageUrl} alt={post.title} />
                        </a>
                        <p>{post.content}</p>
                        <footer>
                            <ul className="actions">
                                <li><a href={`/post/${post.id}`} className="button large">Continue Reading</a></li>
                            </ul>
                            <ul className="stats">
                                <li><a href={`/category/${post.category_id}`}>{post.category_name}</a></li>
                                <li><a href={`/post/${post.id}/likes`} className="icon solid fa-heart">{post.likes}</a></li>
                                <li><a href={`/post/${post.id}/comments`} className="icon solid fa-comment">{post.comments}</a></li>
                            </ul>
                        </footer>
                    </article>
                );
            })}
        </section>
    );
};

export default Post;