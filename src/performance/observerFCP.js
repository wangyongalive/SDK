import { lazyReportBatch } from '../report';

export default function observerFCP() {
  const entryHandler = (list) => {
    // 使用 find 方法找到第一个符合条件的条目
    const fcpEntry = list.getEntries().find(entry => entry.name === 'first-contentful-paint');
    
    if (fcpEntry) {
      observer.disconnect(); // 找到后立即断开观察者
      const json = fcpEntry.toJSON();
      console.log(json);
      const reportData = {
        ...json,
        type: 'performance',
        subType: fcpEntry.name,
        pageUrl: window.location.href,
      };
      // 发送数据
      lazyReportBatch(reportData);
    }
  };

  // 创建并设置 PerformanceObserver
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'paint', buffered: true });
}
