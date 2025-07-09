#!/bin/bash

# 智能锁换锁项目 - GitHub Pages 部署脚本
# 使用方法: ./deploy.sh [your-github-username] [repository-name] [custom-domain]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    echo -e "${2}${1}${NC}"
}

# 检查参数
if [ $# -lt 2 ]; then
    print_message "使用方法: $0 <github-username> <repository-name> [custom-domain]" $RED
    print_message "示例: $0 myusername smart-lock-replacement mydomain.com" $YELLOW
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2
CUSTOM_DOMAIN=${3:-""}

print_message "🚀 开始部署智能锁换锁项目到 GitHub Pages" $BLUE
print_message "GitHub 用户名: $GITHUB_USERNAME" $YELLOW
print_message "仓库名称: $REPO_NAME" $YELLOW

# 检查是否在正确的目录
if [ ! -f "index.html" ] || [ ! -f "script.js" ] || [ ! -f "styles.css" ]; then
    print_message "❌ 错误：请在项目根目录运行此脚本" $RED
    exit 1
fi

# 检查 git 是否已初始化
if [ ! -d ".git" ]; then
    print_message "📦 初始化 Git 仓库..." $BLUE
    git init
    git branch -M main
fi

# 更新 README.md 中的用户名
print_message "📝 更新 README.md 中的链接..." $BLUE
sed -i.bak "s/yourusername/$GITHUB_USERNAME/g" README.md
sed -i.bak "s/smart-lock-replacement/$REPO_NAME/g" README.md
rm -f README.md.bak

# 处理自定义域名
if [ -n "$CUSTOM_DOMAIN" ]; then
    print_message "🌐 配置自定义域名: $CUSTOM_DOMAIN" $BLUE
    echo "$CUSTOM_DOMAIN" > CNAME
else
    print_message "📋 使用 GitHub Pages 默认域名" $YELLOW
    rm -f CNAME
fi

# 添加所有文件到 git
print_message "📁 添加文件到 Git..." $BLUE
git add .

# 检查是否有更改需要提交
if git diff --staged --quiet; then
    print_message "ℹ️  没有新的更改需要提交" $YELLOW
else
    print_message "💾 提交更改..." $BLUE
    git commit -m "Deploy smart lock replacement project to GitHub Pages"
fi

# 检查是否已添加远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    print_message "🔗 添加远程仓库..." $BLUE
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
fi

# 推送到 GitHub
print_message "⬆️  推送到 GitHub..." $BLUE
git push -u origin main

print_message "✅ 部署完成！" $GREEN
print_message "" $NC
print_message "📋 接下来的步骤：" $BLUE
print_message "1. 访问 GitHub 仓库: https://github.com/$GITHUB_USERNAME/$REPO_NAME" $YELLOW
print_message "2. 进入 Settings > Pages" $YELLOW
print_message "3. Source 选择 'GitHub Actions'" $YELLOW
print_message "4. 等待部署完成（约 2-5 分钟）" $YELLOW
print_message "" $NC

if [ -n "$CUSTOM_DOMAIN" ]; then
    print_message "🌐 您的网站将在以下地址可用：" $GREEN
    print_message "   - https://$CUSTOM_DOMAIN" $GREEN
    print_message "   - https://$GITHUB_USERNAME.github.io/$REPO_NAME" $GREEN
    print_message "" $NC
    print_message "🔧 Cloudflare 配置：" $BLUE
    print_message "1. 登录 Cloudflare 并添加您的域名" $YELLOW
    print_message "2. 添加 CNAME 记录指向 $GITHUB_USERNAME.github.io" $YELLOW
    print_message "3. 启用 SSL/TLS 和 'Always Use HTTPS'" $YELLOW
else
    print_message "🌐 您的网站将在以下地址可用：" $GREEN
    print_message "   - https://$GITHUB_USERNAME.github.io/$REPO_NAME" $GREEN
fi

print_message "" $NC
print_message "📖 详细配置指南请查看: DEPLOYMENT.md" $BLUE
print_message "🎉 祝您使用愉快！" $GREEN