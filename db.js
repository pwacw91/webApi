const mysql = require('mysql2');
require('dotenv').config(); // 必须放在最上面第一行！加载 .env 文件


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


// 初始化表并插入数据
async function initDB() {
  try {
    // 创建 messages 表
    await pool.promise().query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255) NOT NULL
      )
    `);

    // 检查有没有数据，没有就插入
    const [rows] = await pool.promise().query('SELECT COUNT(*) as count FROM messages');
    if (rows[0].count === 0) {
      await pool.promise().query(`INSERT INTO messages (text) VALUES ('我是从 MySQL 数据库读出来的数据'), ('你好，MySQL！')`);
      console.log('MySQL 数据库初始化完成，已插入默认数据。');
    }
  } catch (err) {
    console.error('数据库初始化失败，请检查数据库连接配置：', err.message);
  }
}

initDB(); // 启动时执行初始化

module.exports = pool; // 导出连接池供 server.js 使用