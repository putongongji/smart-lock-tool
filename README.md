# 智能锁换锁工作流程系统

一个现代化的智能锁更换工作流程管理界面，提供直观的步骤指导和进度跟踪。

## 🚀 在线演示

- **GitHub Pages**: [https://your-github-username.github.io/smart-lock-replacement](https://your-github-username.github.io/smart-lock-replacement)
- **本地预览**: `http://localhost:8000`

## 📦 快速部署

### 部署到 GitHub Pages + Cloudflare

详细部署指南请参考：[DEPLOYMENT.md](./DEPLOYMENT.md)

### 本地运行

```bash
# 克隆项目
git clone https://github.com/your-github-username/smart-lock-replacement.git
cd smart-lock-replacement

# 启动本地服务器
python3 -m http.server 8000
# 或者
npx serve .

# 访问 http://localhost:8000
```

## 🔧 功能特性

- **工作流程管理**：备份数据 → 解绑旧锁 → 绑定新锁 → 还原数据
- **实时进度跟踪**：每个步骤的状态和进度可视化
- **子步骤详情**：还原数据步骤包含详细的子任务
- **响应式设计**：支持桌面和移动设备
- **现代化界面**：Material Design 风格的用户界面

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: CSS Grid, Flexbox, CSS Variables
- **图标**: Material Design Icons
- **部署**: GitHub Pages + Cloudflare

## 📁 项目结构

```
smart-lock-replacement/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互逻辑
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions 部署配置
├── DEPLOYMENT.md       # 部署指南
├── CNAME.example       # 自定义域名配置示例
└── README.md           # 项目说明
```

## 文件结构

```
smart-lock-replacement/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互逻辑
└── README.md           # 说明文档
```

## 使用方法

### 本地预览

1. 在项目目录下启动HTTP服务器：
   ```bash
   # 使用Python 3
   python3 -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   ```

2. 在手机浏览器中访问：`http://你的电脑IP:8000`

### 操作流程

1. **备份数据**: 点击"开始备份"按钮，系统会自动备份当前锁的用户数据
2. **解绑旧锁**: 备份完成后，点击"开始解绑"移除旧锁绑定
3. **绑定新锁**: 
   - 扫描新锁二维码获取序列号
   - 搜索蓝牙设备并选择目标设备
   - 点击"开始绑定"完成新锁绑定
4. **还原数据**: 将备份的用户数据恢复到新锁上

## 技术特性

- **响应式设计**: 适配各种手机屏幕尺寸
- **渐进式增强**: 基础功能在所有浏览器中可用
- **无依赖**: 纯HTML/CSS/JavaScript实现
- **PWA就绪**: 可添加到手机主屏幕

## 浏览器兼容性

- iOS Safari 12+
- Android Chrome 70+
- 微信内置浏览器
- 支付宝内置浏览器

## 开发说明

本项目采用原生Web技术开发，无需构建工具，可直接在浏览器中运行。所有的交互效果和动画都经过移动端优化，确保流畅的用户体验。

## 更新日志

### v1.0.0 (2025-01-09)
- 初始版本发布
- 实现完整的换锁流程
- 支持移动端操作
- 添加进度反馈和状态管理