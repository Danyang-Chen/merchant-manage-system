1. 写接口 POST请求 获取参数 req.body req.params req.query (nodejs 接口 request 请求)
2. 判断用户名和密码，返回是否登陆成功(respCode,message,currentUser)
3. 表单提交函数 Form.onFinish
4. axios执行POST请求 axios.post(url, params) axios.post('/api/login', { username, password })
5. 获取请求结果，第二步返回的信息，判断是否登录成功
6. 控制Modal是否显示
7. 登陆成功后就不再显示登录框了，localStorage。登陆成功的话就把用户信息存进去currentUser
8. 根据是否有localStorage的登录用户决定Model显不显示