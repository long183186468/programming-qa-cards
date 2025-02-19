# 贝朵亚 AI 编程问答卡片 (Bedoya Programming Q&A Cards)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Styled Components](https://img.shields.io/badge/styled--components-6.1.1-orange.svg)

一个优雅的编程学习问答卡片应用，采用现代化的 UI 设计，帮助学生更好地学习和复习编程知识。

[English](./README_EN.md) | 简体中文

## ✨ 特性

- 📱 响应式设计：完美支持移动端和桌面端
- 🎯 分类导航：按不同主题智能分类展示问答内容
- 🔄 翻转动画：流畅的卡片翻转动效，提供良好的交互体验
- 💾 进度保存：自动记录学习进度，随时继续学习
- 🎨 现代界面：采用玻璃态设计，优雅的渐变色和动画效果
- 📝 富文本支持：支持列表、段落等多种文本格式
- 🌐 跨平台：支持各种现代浏览器

## 🖥 在线预览

[在线演示地址](#) // TODO: 添加你的演示地址

## 🛠 技术栈

- ⚛️ React 18
- 💅 Styled Components
- 📦 Vite
- 🎨 React Icons
- 📱 Ant Design Mobile

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/programming-qa-cards.git

# 进入项目目录
cd programming-qa-cards

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🔨 开发

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint
```

## 📁 项目结构

```
programming-qa-cards/
├── src/
│   ├── components/        # 组件目录
│   │   ├── Card.jsx      # 卡片组件
│   │   └── CardDeck.jsx  # 卡片组展示组件
│   ├── data/             # 数据目录
│   │   └── questionData.js # 问答数据
│   ├── services/         # 服务目录
│   │   └── qaService.js  # 数据处理服务
│   ├── styles/           # 样式目录
│   ├── App.jsx          # 主应用组件
│   └── main.jsx         # 入口文件
├── public/              # 静态资源
├── docs/               # 文档
│   ├── CONTRIBUTING.md # 贡献指南
│   └── API.md         # API文档
├── .eslintrc.json     # ESLint 配置
├── .gitignore         # Git 忽略文件
├── index.html         # HTML 模板
├── package.json       # 项目配置
├── README.md          # 项目说明
└── vite.config.js     # Vite 配置
```

## 🔍 主要功能

### 1. 分类导航
- 顶部分类导航栏
- 支持快速切换不同主题
- 响应式布局适配

### 2. 卡片交互
- 流畅的翻转动画效果
- 支持触摸滑动和点击操作
- 自动保存浏览进度

### 3. 内容展示
- 支持富文本格式
- 自适应内容高度
- 优化的阅读体验

### 4. 移动适配
- 响应式布局设计
- 触摸手势支持
- 优化的移动端交互

## 📝 数据格式

问答数据格式示例：

```javascript
{
  "分类名称": {
    "name": "显示名称",
    "description": "分类描述",
    "questions": [
      {
        "id": "unique_id",
        "question": "问题内容",
        "answer": "答案内容",
        "tags": ["标签1", "标签2"]
      }
    ]
  }
}
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

详细信息请查看 [贡献指南](./docs/CONTRIBUTING.md)

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详细信息

## 🙏 致谢

- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Ant Design Mobile](https://mobile.ant.design/)

## 📧 联系方式

- 作者：spark-boy
- Email：183186468@qq.com
- GitHub：https://github.com/long183186468

## 🔄 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解详细更新信息 