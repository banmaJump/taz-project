const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'https://taz-project.onrender.com'], 
};
app.use(cors(corsOptions));
app.use(express.json());

const port = 3010;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api', (req, res) => {
  res.send('APIの接続に成功です！');
});

app.get('/api/test-connection', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('データベースクエリ中にエラーが発生しました:', error.message);
    console.error('スタックトレース:', error.stack);
    if (error.code === 'ER_BAD_DB_ERROR') {
      res.status(400).json({ error: 'DBに接続できませんでした。' });
    } else {
      res.status(500).json({ error: 'サーバ内部でエラーが発生しました。' });
    }
  }
});

app.get('/api/posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
      const [totalCountResult] = await pool.query('SELECT COUNT(*) AS total FROM posts');
      const totalCount = totalCountResult[0].total;

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
          totalCount: totalCount,
      });
  } catch (error) {
      console.error('データベースクエリ中にエラーが発生しました:', error.message);
      console.error('スタックトレース:', error.stack);
      res.status(500).json({ error: 'サーバ内部でエラーが発生しました。' });
  }
});


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
    console.error('データベースクエリ中にエラーが発生しました:', error.message);
    console.error('スタックトレース:', error.stack);
    res.status(500).json({ error: 'サーバ内部でエラーが発生しました。' });
  }
});

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
      return res.status(404).json({ error: '指定された投稿が見つかりませんでした。' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('データベースクエリ中にエラーが発生しました:', error.message);
    console.error('スタックトレース:', error.stack);
    res.status(500).json({ error: 'サーバ内部でエラーが発生しました。' });
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.query;

  if (!query || query.trim().length < 1) {
    return res.status(400).json({ error: '検索語は1文字以上で入力してください。' });
  }

  try {
    const sql = `
            SELECT posts.*, categories.name AS category_name, categories.img_url AS category_img_url
            FROM posts
            JOIN categories ON posts.category_id = categories.id
            WHERE posts.title LIKE ? OR posts.content LIKE ? OR categories.name LIKE ?
        `;

    const [results] = await pool.query(sql, [`%${query}%`, `%${query}%`, `%${query}%`]);
    res.json(results);

  } catch (err) {
    console.error('検索エラー:', err);
    res.status(500).json({ error: 'サーバ内部でエラーが発生しました。' });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}に接続中！`);
});