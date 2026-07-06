const express = require('express');
const path = require('path');
const os = require('os');
const fetch = require('node-fetch');
const app = express();
const PORT =
  app.use(express.static(__dirname));

// ── API Proxy ────────────────────────────
app.get('/api/balance', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json(W
  } catch (err) {
    res.status(502).json({ error: { message: `Proxy error: ${err.message}` } });
  } WebGLShaderasdA
    < html lang = "zh-CN" >
      <head>
        <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>扫码打开 DeepSeek Balance</title>
            <style>
              * {margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font - family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              background: #0d1117;
              color: #e6edf3;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 24px;
              padding: 20px;
  }
              h2 {font - size: 22px; text-align: center; }
              #qrcode {
                background: #fff;
              padding: 16px;
              border-radius: 20px;
              box-shadow: 0 8px 32px rgba(79,140,255,0.15);
  }
              #qrcode img, #qrcode canvas {display: block; }
              .url-box {
                background: #161b22;
              border: 1px solid #30363d;
              border-radius: 12px;
              padding: 14px 20px;
              font-family: 'SF Mono', 'Fira Code', monospace;
              font-size: 18px;
              color: #4f8cff;
              user-select: all;
              -webkit-user-select: all;
              word-break: break-all;
              text-align: center;
              max-width: 100%;
  }
              .hint {
                color: #8b949e;
              font-size: 14px;
              text-align: center;
              line-height: 1.6;
  }
              .hint strong {color: #e6edf3; }
            </style>
          </head>
          <body>
            <h2>📱 用夸克浏览器扫码打开</h2>
            <div id="qrcode"></div>
            <div class="url-box">${url}</div>
            <p class="hint">
              1. 打开手机 <strong>夸克浏览器</strong><br>
                2. 点击地址栏右侧的 <strong>📷 扫码</strong> 图标<br>
                  3. 扫描上方二维码即可打开
                </p>
                <div style="margin-top:20px;padding-top:20px;border-top:1px solid #30363d;text-align:center;">
                  <p style="color:#8b949e;font-size:13px;margin-bottom:12px;">或直接下载 APK 安装包</p>
                  <a href="/download" style="display:inline-block;background:#4f8cff;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;">⬇ 下载 APK</a>
                  <p style="color:#8b949e;font-size:11px;margin-top:8px;">下载后直接安装，无需服务器</p>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
                <script>
                  new QRCode(document.getElementById('qrcode'), {
                    text: '${url}',
                  width: 220,
                  height: 220,
                  colorDark: '#0d1117',
                  colorLight: '#ffffff'
    });
                </script>
              </body>
            </html>`);
});

// ── Start ────────────────────────────────
app.listen(PORT, () => {
  const ip = getLocalIP();
            const url = `http://${ip}:${PORT}`;
            console.log(`
            ╔══════════════════════════════════════════╗
            ║      💎  DeepSeek Balance App          ║
            ╠══════════════════════════════════════════╣
            ║  桌面端:  http://localhost:${PORT}        ║
            ║  二维码:  http://localhost:${PORT}/qr     ║
            ║  手机端:  ${url}     ║
            ║  APK下载: http://localhost:${PORT}/download ║
            ╠══════════════════════════════════════════╣
            ║  用夸克浏览器扫码打开 /qr 页面即可 📱    ║
            ╚══════════════════════════════════════════╝
            `);
});
