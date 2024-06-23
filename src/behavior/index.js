import onClick from './onClick';
import pageChange from './pageChange';
import pv from './pv';

// 监控功能模块集合
const monitors = {
    onClick,
    pageChange,
    pv
};

// 使用默认参数直接定义每个监控功能的默认启用状态
export default function behavior({
    onClick = true,
    pageChange = true,
    pv = true
} = {}) {
    // 通过迭代器启用对应的监控功能
    Object.entries({ onClick, pageChange, pv }).forEach(([key, isEnabled]) => {
        isEnabled && monitors[key]?.();
    });
}
