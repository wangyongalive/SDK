import fetchMonitor from "./fetch";
import observerEntries from "./observerEntries";
import observerLCP from "./observerLCP";
import observerFCP from "./observerFCP";
import observerLoad from "./observerLoad";
import observerPaint from "./observerPaint";
import xhrMonitor from "./xhr";

// 监控功能模块集合
const monitors = {
    fetch: fetchMonitor,
    entries: observerEntries,
    lcp: observerLCP,
    fcp: observerFCP,
    load: observerLoad,
    paint: observerPaint,
    xhr: xhrMonitor
};

// 使用默认参数直接定义每个监控功能的默认启用状态
export default function performance({
    fetch = true,
    entries = true,
    lcp = true,
    fcp = true,
    load = true,
    paint = true,
    xhr = true
} = {}) {
    // 通过迭代器启用对应的监控功能
    Object.entries({ fetch, entries, lcp, fcp, load, paint, xhr }).forEach(([key, isEnabled]) => {
        isEnabled && monitors[key]?.();
    });
}
