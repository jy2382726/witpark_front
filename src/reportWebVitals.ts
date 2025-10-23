// 从 web-vitals 库导入 ReportHandler 类型
import { ReportHandler } from 'web-vitals';

/**
 * 报告网页性能指标的函数
 * @param onPerfEntry - 可选参数，用于处理性能指标的回调函数
 */
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  // 检查 onPerfEntry 是否存在且为函数
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // 动态导入 web-vitals 库
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // 收集累积布局偏移 (CLS) 指标并通过回调函数报告
      getCLS(onPerfEntry);
      // 收集首次输入延迟 (FID) 指标并通过回调函数报告
      getFID(onPerfEntry);
      // 收集首次内容渲染 (FCP) 指标并通过回调函数报告
      getFCP(onPerfEntry);
      // 收集最大内容渲染 (LCP) 指标并通过回调函数报告
      getLCP(onPerfEntry);
      // 收集首次字节到达时间 (TTFB) 指标并通过回调函数报告
      getTTFB(onPerfEntry);
    });
  }
};

// 导出 reportWebVitals 函数作为默认导出
export default reportWebVitals;
