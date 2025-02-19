# Bedoya Programming Q&A Cards

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Styled Components](https://img.shields.io/badge/styled--components-6.1.1-orange.svg)

An elegant programming learning Q&A card application with modern UI design, helping students better learn and review programming knowledge.

English | [简体中文](./README.md)

## ✨ Features

- 📱 Responsive Design: Perfect support for mobile and desktop
- 🎯 Category Navigation: Smart categorization of Q&A content
- 🔄 Flip Animation: Smooth card flip effects for better interaction
- 💾 Progress Saving: Automatically save learning progress
- 🎨 Modern Interface: Glass morphism design with elegant gradients
- 📝 Rich Text Support: Support for lists, paragraphs, and more
- 🌐 Cross-platform: Support for all modern browsers

## 🖥 Live Demo

[Demo Link](#) // TODO: Add your demo link

## 🛠 Tech Stack

- ⚛️ React 18
- 💅 Styled Components
- 📦 Vite
- 🎨 React Icons
- 📱 Ant Design Mobile

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/long183186468/programming-qa-cards.git

# Enter the project directory
cd programming-qa-cards

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔨 Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
programming-qa-cards/
├── src/
│   ├── components/        # Components directory
│   │   ├── Card.jsx      # Card component
│   │   └── CardDeck.jsx  # Card deck component
│   ├── data/             # Data directory
│   │   └── questionData.js # Q&A data
│   ├── services/         # Services directory
│   │   └── qaService.js  # Data processing service
│   ├── styles/           # Styles directory
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry file
├── public/              # Static assets
├── docs/               # Documentation
│   ├── CONTRIBUTING.md # Contribution guidelines
│   └── API.md         # API documentation
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Git ignore file
├── index.html         # HTML template
├── package.json       # Project configuration
├── README.md          # Project documentation
└── vite.config.js     # Vite configuration
```

## 🔍 Key Features

### 1. Category Navigation
- Top category navigation bar
- Quick theme switching
- Responsive layout adaptation

### 2. Card Interaction
- Smooth flip animation effects
- Touch swipe and click operations
- Automatic progress saving

### 3. Content Display
- Rich text format support
- Adaptive content height
- Optimized reading experience

### 4. Mobile Adaptation
- Responsive layout design
- Touch gesture support
- Optimized mobile interaction

## 📝 Data Format

Example Q&A data format:

```javascript
{
  "category_name": {
    "name": "Display Name",
    "description": "Category Description",
    "questions": [
      {
        "id": "unique_id",
        "question": "Question content",
        "answer": "Answer content",
        "tags": ["tag1", "tag2"]
      }
    ]
  }
}
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [Contributing Guidelines](./docs/CONTRIBUTING.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Ant Design Mobile](https://mobile.ant.design/)

## 📧 Contact

- Author: spark-boy
- Email: 183186468@qq.com
- GitHub: https://github.com/long183186468

## 🔄 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed update information 