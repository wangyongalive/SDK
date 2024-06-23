const path = require("path");
const json = require("@rollup/plugin-json");
const { babel } = require("@rollup/plugin-babel");

// 路径解析函数
const resolveFile = (filePath) => path.resolve(__dirname, filePath);

// 独立的插件配置函数
const getJsonPlugin = () => json({ compact: true });

const getBabelPlugin = () => babel({
    extensions: [".js", ".ts"],
    babelHelpers: "bundled",
    presets: [
        [
            "@babel/env",
            {
                targets: {
                    browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
                },
            },
        ],
    ],
});

// 生成通用插件配置数组
const getPlugins = () => [
    getJsonPlugin(),
    getBabelPlugin()
];

// 输出配置的生成器函数
const createOutputConfig = (fileName, format) => ({
    file: resolveFile(`../dist/${fileName}`),
    format,
    name: format === "iife" ? "monitor" : undefined, // 仅在 iife 格式中使用 name 属性
    sourcemap: true,
});

// Rollup 配置
module.exports = [
    {
        plugins: getPlugins(),
        input: resolveFile("../src/webEyeSDK.js"),
        output: createOutputConfig("monitor.js", "iife"),
    },
    {
        plugins: getPlugins(),
        input: resolveFile("../src/webEyeSDK.js"),
        output: createOutputConfig("monitor.esm.js", "esm"),
    },
    {
        plugins: getPlugins(),
        input: resolveFile("../src/webEyeSDK.js"),
        output: createOutputConfig("monitor.cjs.js", "cjs"),
    },
];
