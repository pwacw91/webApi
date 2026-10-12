const express = require('express');
const cors = require('cors'); // <--- 加上这一行
const pool = require('./db');
const app = express();
app.use(cors()); // 允许前端跨域访问

app.get('/api/messages', async (req, res) => {
  try {
    // 从 MySQL 查询数据
    const [rows] = await pool.promise().query('SELECT * FROM messages');
    res.json(rows); // 把数据发给前端
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
    console.log('后端服务器运行在 http://localhost:3000');
});