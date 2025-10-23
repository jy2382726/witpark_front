import React from 'react';
import { UserOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { store } from '../../store';
import { clearAuth } from '../../store/login/authSlice';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a href="#profile" onClick={(e) => e.preventDefault()}>
        个人中心
      </a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: (
      <a href="#logout" onClick={(e) => e.preventDefault()}>
        退出登录
      </a>
    ),
    icon: <PoweroffOutlined />,
  },
];

const MyHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <Dropdown menu={{ items, onClick: (option) => {
        if (option.key === '1') {
          // 跳转到个人中心
          navigate('/profile');

        }else if (option.key === '2') {
          // 退出登录
          store.dispatch(clearAuth())
        }
      } }}>
        <a 
          href="#user-menu"
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            欢迎您, {store.getState().authSlice.username}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default MyHeader;
