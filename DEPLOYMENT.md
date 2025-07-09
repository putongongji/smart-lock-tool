# 智能锁换锁项目部署指南

本指南将帮助您通过 GitHub Pages 和 Cloudflare 部署智能锁换锁项目，实现 HTTPS 访问和全球 CDN 加速。

## 📋 部署前准备

- GitHub 账户
- Cloudflare 账户（免费版即可）
- 域名（可选，Cloudflare 和 GitHub Pages 都提供免费子域名）

## 🚀 第一步：GitHub Pages 部署

### 1. 创建 GitHub 仓库

1. 登录 GitHub，创建新仓库
2. 仓库名建议：`smart-lock-replacement`
3. 设置为 Public（GitHub Pages 免费版需要公开仓库）

### 2. 上传项目文件

将以下文件上传到仓库根目录：
```
smart-lock-replacement/
├── index.html
├── styles.css
├── script.js
├── .github/
│   └── workflows/
│       └── deploy.yml
└── DEPLOYMENT.md
```

### 3. 启用 GitHub Pages

1. 进入仓库设置页面（Settings）
2. 滚动到 "Pages" 部分
3. Source 选择 "GitHub Actions"
4. 保存设置

### 4. 验证部署

- 推送代码后，GitHub Actions 会自动运行
- 部署完成后，访问：`https://yourusername.github.io/smart-lock-replacement`

## 🌐 第二步：Cloudflare 配置

### 1. 添加站点到 Cloudflare

1. 登录 Cloudflare 控制台
2. 点击 "Add a Site"
3. 输入您的域名（如果没有域名，可以先使用 GitHub Pages 提供的域名）
4. 选择免费计划

### 2. 配置 DNS 记录

如果使用自定义域名：
1. 添加 CNAME 记录：
   - Name: `@` 或 `www`
   - Target: `yourusername.github.io`
   - Proxy status: 启用（橙色云朵）

如果使用 GitHub Pages 域名：
1. 可以跳过此步骤，直接进行 SSL 配置

### 3. 配置 SSL/TLS

1. 进入 SSL/TLS 设置
2. 选择 "Flexible" 模式（推荐）
3. 启用 "Always Use HTTPS"
4. 启用 "Automatic HTTPS Rewrites"

### 4. 配置页面规则（Page Rules）

创建以下规则强制 HTTPS：

**规则 1：HTTP 重定向到 HTTPS**
- URL: `http://yourdomain.com/*`
- 设置: "Always Use HTTPS"

**规则 2：WWW 重定向（可选）**
- URL: `http://www.yourdomain.com/*`
- 设置: "Always Use HTTPS"

### 5. 性能优化设置

1. **Speed** 标签页：
   - 启用 "Auto Minify"（HTML, CSS, JS）
   - 启用 "Brotli" 压缩

2. **Caching** 标签页：
   - 设置缓存级别为 "Standard"
   - 启用 "Always Online"

## 🔧 第三步：GitHub Pages 自定义域名配置

如果使用自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为您的域名，例如：`yourdomain.com`
3. 在 GitHub Pages 设置中验证自定义域名
4. 启用 "Enforce HTTPS"

## 📱 第四步：验证部署

### 测试清单

- [ ] HTTP 自动重定向到 HTTPS
- [ ] SSL 证书正常工作（浏览器显示锁图标）
- [ ] 页面加载速度正常
- [ ] 所有功能正常工作
- [ ] 移动端适配正常

### 测试工具

1. **SSL 测试**：https://www.ssllabs.com/ssltest/
2. **速度测试**：https://pagespeed.web.dev/
3. **安全测试**：https://securityheaders.com/

## 🛠️ 故障排除

### 常见问题

**1. GitHub Pages 部署失败**
- 检查 GitHub Actions 日志
- 确保仓库是公开的
- 验证文件路径和权限

**2. Cloudflare SSL 错误**
- 确保 SSL 模式设置为 "Flexible"
- 等待 SSL 证书生效（可能需要几分钟）
- 检查 DNS 记录是否正确

**3. 自定义域名无法访问**
- 验证 CNAME 文件内容
- 检查 DNS 传播状态
- 确保域名解析到正确的服务器

**4. 页面加载缓慢**
- 启用 Cloudflare 缓存
- 优化图片和资源
- 启用压缩功能

### 调试命令

```bash
# 检查 DNS 解析
nslookup yourdomain.com

# 检查 SSL 证书
openssl s_client -connect yourdomain.com:443

# 测试 HTTP 响应
curl -I https://yourdomain.com
```

## 🔄 更新和维护

### 自动部署

- 每次推送到 main 分支都会自动触发部署
- GitHub Actions 会自动构建和发布
- Cloudflare 会自动清除缓存

### 监控和分析

1. **GitHub Pages 使用情况**：仓库 Insights 页面
2. **Cloudflare 分析**：Cloudflare 控制台 Analytics 页面
3. **性能监控**：可集成 Google Analytics

## 📞 技术支持

如果遇到问题，可以参考：

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Cloudflare 文档](https://developers.cloudflare.com/)
- [项目 Issues](https://github.com/yourusername/smart-lock-replacement/issues)

---

**部署完成后，您的智能锁换锁项目将具备：**
- ✅ HTTPS 安全访问
- ✅ 全球 CDN 加速
- ✅ 自动部署更新
- ✅ 免费托管服务
- ✅ 高可用性保障