import './index.scss'
import logo from '../../assets/logo.png'
import bg from '../../assets/bg.jpg'
import lgbg from '../../assets/lgbg.jpg'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, LoginData } from '../../api/users';
import { useDispatch } from 'react-redux';
import { setToken, setUsername } from '../../store/login/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [form] = Form.useForm<LoginData>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginData) => {
    try {
      setLoading(true);
      const { data: { token, username } } = await login(values);
      console.log(token, username);
      dispatch(setToken(token));
      dispatch(setUsername(username));
      navigate('/', { replace: true }); // 登录后重定向到首页，并且替换当前历史记录，防止用户点击返回按钮后又返回登录页
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("验证失败", error);
    }
  };

  // 表单提交失败时的处理
  const onFinishFailed = (errorInfo: any) => {
    setLoading(false);
    console.log("表单验证失败:", errorInfo);
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-content" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="login-content-right">
          <div className='title'>
            <div className='logo'>
              <img src={logo} alt="logo" width={100} />
            </div>
            <h1>朋远智慧园区管理平台</h1>
          </div>
          {/* 使用onFinish事件，支持回车键提交 */}
          <Form
            form={form}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item<LoginData>
              name="username"
              rules={[
                { required: true, message: '用户名不能为空' },
                { pattern: /^[a-zA-Z0-9_]{4,12}$/, message: '用户名只能包含字母、数字和下划线，长度必须在6到12个字符之间' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder='请输入用户名' />
            </Form.Item>

            <Form.Item<LoginData>
              name="password"
              rules={[
                { required: true, message: '密码不能为空' },
                { min: 6, max: 12, message: '密码长度必须在6到12个字符之间' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder='请输入密码' />
            </Form.Item>
            <Form.Item label={null}>
              {/* 使用htmlType="submit"让按钮支持表单提交 */}
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;