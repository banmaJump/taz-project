// /taz-react-app/src/components/PostsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostsList = ({ posts }) => {
    const navigate = useNavigate();

    if (!posts) {
        return <div>Loading posts...</div>;
    }

    return (
        <section>
            <ul className="posts">
                {posts.map((post) => (
                    <li key={post.id}>
                        <article>
                            <header>
                                <h3>
                                    <a href={`/post/${post.id}`}>{post.title}</a>
                                </h3>
                                <time className="published" dateTime={post.published_at}>
                                    {new Date(post.published_at).toLocaleDateString()}
                                </time>
                                <p>カテゴリ: {post.category_name}</p>
                            </header>
                            {post.category_img_url && (
                                <a href={`/post/${post.id}`} className="image">
                                    <img
                                        src={
                                            post.category_img_url.startsWith('http://') || post.category_img_url.startsWith('https://')
                                                ? post.category_img_url
                                                : `${process.env.PUBLIC_URL}/images/${post.category_img_url}`
                                        }
                                        alt={post.category_name}
                                    />
                                </a>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PostsList;