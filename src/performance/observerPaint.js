import { lazyReportBatch } from '../report';
export default function observerPaint() {
    const entryHandler = (list) => {
        const entries = list.getEntriesByName('first-paint');
        if (entries.length > 0) {
            observer.disconnect();
            const entry = entries[0];
            const json = entry.toJSON();
            console.log(json);
            const reportData = {
                ...json,
                type: 'performance',
                subType: entry.name,
                pageUrl: window.location.href,
            };
            // 发送数据
            lazyReportBatch(reportData);
        }

    }

    // 统计和计算fp的时间
    const observer = new PerformanceObserver(entryHandler);
    // buffered: true 确保观察到所有paint事件
    observer.observe({ type: 'paint', buffered: true });


}
