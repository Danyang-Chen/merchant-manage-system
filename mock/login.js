export default {
  'POST /api/login': (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === 'admin') {
      res.json({
        respCode: 200,
        message: '登录成功',
        currentUser: { username: 'admin' },
      });
    } else {
      res.json({
        respCode: 500,
        message: '登陆失败',
      });
    }
  },
};
