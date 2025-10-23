import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import './mock';
import reportWebVitals from './reportWebVitals';
// 解决antd5在react19中使用的兼容性问题
import '@ant-design/v5-patch-for-react-19'
import { Provider } from 'react-redux';
import { store } from './store';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';



const root = ReactDOM.createRoot(
  // as HTMLElement是类型断言，告诉TypeScript，document.getElementById('root')返回的元素是HTMLElement类型
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
);

// 如果你想开始测量应用的性能，请传递一个函数来记录结果（例如：reportWebVitals(console.log)）
// 或者将结果发送到分析端点。了解更多信息：https://bit.ly/CRA-vitals
reportWebVitals();
