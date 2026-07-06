# 💎 DeepSeek Balance — 手机余额查询

每 **30 秒**自动查询 [DeepSeek API](https://platform.deepseek.com/) 账户余额，支持夸克 / Chrome / Safari。

## 🚀 使用步骤

电脑端启动服务器，手机夸克浏览器扫码打开：

```bash
cd "C:\Users\Lenovo\Desktop\test\deepseek money"
npm start
```

终端显示二维码地址后：

1. 电脑浏览器打开 **`http://localhost:3000/qr`**（显示二维码）
2. 手机打开 **夸克浏览器** → 地址栏点击 **📷 扫码**
3. 扫描电脑屏幕上的二维码
4. 输入 DeepSeek API Key → 点击保存
5. 余额每 30 秒自动刷新 ✅

> 手机和电脑需连接 **同一 WiFi**。

## 📱 添加到手机主屏幕

- **夸克浏览器**：菜单 → "添加到桌面"
- **Safari (iPhone)**：底部分享 → "添加到主屏幕"
- **Chrome (Android)**：菜单 → "添加到主屏幕"

## 🔑 获取 API Key

登录 [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) 创建 Key（`sk-` 开头）。

## ⚠️ 遇到问题？

| 问题 | 解决方法 |
|------|----------|
| 网络错误 | 确保已运行 `npm start`，不要直接双击 HTML 文件 |
| 认证失败 | API Key 无效或已过期，重新设置 |
| 手机连不上 | 手机和电脑必须在同一 WiFi，检查防火墙 |
