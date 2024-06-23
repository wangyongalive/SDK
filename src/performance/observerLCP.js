import { lazyReportBatch } from "../report";

export default function observerLCP() {
  const entryHandler = (list) => {
    // 断开观察者，防止进一步的事件处理
    if (observer) {
      observer.disconnect();
    }
    const latestEntry = list.getEntries().pop(); // 获取最新的 LCP 条目
    if (latestEntry) {
      const json = latestEntry.toJSON();
      console.log(json);
      const reportData = {
        ...json,
        type: "performance",
        subType: latestEntry.name,
        pageUrl: window.location.href,
      };
      // 发送数据
      lazyReportBatch(reportData);
    }
  };

  // 创建一个新的 PerformanceObserver 实例
  const observer = new PerformanceObserver(entryHandler);
  // 开始观察 LCP 事件
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
