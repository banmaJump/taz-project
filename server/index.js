// const mysql = require('mysql2/promise');

// // 環境変数からデータベース接続情報を取得
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// exports.handler = async (event) => {
//     try {
//         let response;
//         const path = event.path;
//         const method = event.httpMethod;
//         const queryParams = event.queryStringParameters || {};
//         const pathParams = event.pathParameters || {};

//         if (method === 'GET' && path === '/api/test-connection') {
//             const [rows] = await pool.query('SELECT * FROM categories');
//             response = {
//                 statusCode: 200,
//                 body: JSON.stringify(rows),
//             };
//         } else if (method === 'GET' && path === '/api/posts') {
//             const page = parseInt(queryParams.page) || 1;
//             const limit = 5;
//             const offset = (page - 1) * limit;

//             const [countResults] = await pool.query('SELECT COUNT(*) AS total FROM posts');
//             const totalPosts = countResults[0].total;
//             const totalPages = Math.ceil(totalPosts / limit);

//             const query = `
//                 SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
//                 FROM posts
//                 JOIN categories ON posts.category_id = categories.id
//                 ORDER BY posts.published_at DESC
//                 LIMIT ? OFFSET ?
//             `;
//             const [results] = await pool.query(query, [limit, offset]);

//             response = {
//                 statusCode: 200,
//                 body: JSON.stringify({
//                     posts: results,
//                     totalPages: totalPages,
//                 }),
//             };
//         } else if (method === 'GET' && path === '/api/posts/ordered') {
//             const postIds = [3, 1, 2, 4];
//             const placeholders = postIds.map(() => '?').join(',');
//             const query = `
//                 SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
//                 FROM posts
//                 JOIN categories ON posts.category_id = categories.id
//                 WHERE posts.id IN (${placeholders})
//                 ORDER BY FIELD(posts.id, ${placeholders})
//             `;
//             const [results] = await pool.query(query, [...postIds, ...postIds]);
//             response = {
//                 statusCode: 200,
//                 body: JSON.stringify(results),
//             };
//         } else if (method === 'GET' && path.startsWith('/api/posts/')) {
//             const id = pathParams.id;
//             const query = `
//                 SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
//                 FROM posts
//                 JOIN categories ON posts.category_id = categories.id
//                 WHERE posts.id = ?
//             `;
//             const [results] = await pool.query(query, [id]);
//             if (results.length === 0) {
//                 response = {
//                     statusCode: 404,
//                     body: JSON.stringify({ error: 'Post not found' }),
//                 };
//             } else {
//                 response = {
//                     statusCode: 200,
//                     body: JSON.stringify(results[0]),
//                 };
//             }
//         } else if (method === 'GET' && path === '/api/search') {
//             const query = queryParams.query;
//             const searchQuery = `%${query}%`;
//             const searchquery = `
//                 SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
//                 FROM posts
//                 JOIN categories ON posts.category_id = categories.id
//                 WHERE posts.title LIKE ? OR posts.content LIKE ?
//             `;
//             const [results] = await pool.query(searchquery, [searchQuery, searchQuery]);
//             response = {
//                 statusCode: 200,
//                 body: JSON.stringify(results),
//             };
//         } else if (method === 'GET' && path === '/api') {
//             response = {
//                 statusCode: 200,
//                 body: JSON.stringify('Welcome to the API!'),
//             };
//         } else {
//             response = {
//                 statusCode: 404,
//                 body: JSON.stringify({ error: 'Not Found' }),
//             };
//         }

//         return response;
//     } catch (error) {
//         console.error('Error:', error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Internal Server Error' }),
//         };
//     }
// };

// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const app = express();
// const port = 3010;

// // MySQL接続プールの設定
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'mysql19323',
//     database: 'TAZ_BONES_DB',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });
//ここに問題あり。重要。nano /home/ec2-user/node-app/index.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config(); // .env ファイルを読み込む

const app = express(); // app オブジェクトの生成

// CORS を有効化 (app オブジェクト生成後に記述)
app.use(cors({
  origin: 'http://localhost:3000' // 必要に応じてオリジンを限定
}));

app.use(express.json()); // JSON リクエストボディの解析 (もしあれば)

const port = 3010;

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root', // ここを確認
    password: process.env.DB_PASSWORD || 'mysql19323', // ここを確認
    database: process.env.DB_DATABASE || 'TAZ_BONES_DB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//ルートパスのテスト
app.get('/api', (req, res) => {
    res.send('Welcome to the API!');
});

// テスト用エンドポイント
app.get('/api/test-connection', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ページネーション付きの投稿一覧取得エンドポイント
app.get('/api/posts', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        // 全投稿数を取得
        const [countResults] = await pool.query('SELECT COUNT(*) AS total FROM posts');
        const totalPosts = countResults[0].total;
        const totalPages = Math.ceil(totalPosts / limit);

        // 投稿データを取得
        const query = `
            SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
            FROM posts
            JOIN categories ON posts.category_id = categories.id
            ORDER BY posts.published_at DESC
            LIMIT ? OFFSET ?
        `;
        const [results] = await pool.query(query, [limit, offset]);

        res.json({
            posts: results,
            totalPages: totalPages
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 指定した順序で投稿一覧を取得するエンドポイント
app.get('/api/posts/ordered', async (req, res) => {
    try {
        const postIds = [3, 1, 2, 4];
        const placeholders = postIds.map(() => '?').join(',');
        const query = `
            SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
            FROM posts
            JOIN categories ON posts.category_id = categories.id
            WHERE posts.id IN (${placeholders})
            ORDER BY FIELD(posts.id, ${placeholders})
        `;
        const [results] = await pool.query(query, [...postIds, ...postIds]);
        res.json(results);
    } catch (error) {
        console.error('Error fetching ordered posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//PostDetail.jsxで使う
app.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
            FROM posts
            JOIN categories ON posts.category_id = categories.id
            WHERE posts.id = ?
        `;
        const [results] = await pool.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//検索機能
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    try {
        const results = await Post.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { content: { [Op.like]: `%${query}%` } },
                ],
            },
        });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

//PostsList.jsx
// app.get('/api/posts', (req, res) => {
//     const query = `
//         SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
//         FROM posts
//         JOIN categories ON posts.category_id = categories.id
//         ORDER BY posts.published_at DESC
//         Limit 10
//     `;
//     connection.query(query, (error, results) => {
//         if (error) {
//             console.error('Error fetching posts:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json(results);
//     });
// });