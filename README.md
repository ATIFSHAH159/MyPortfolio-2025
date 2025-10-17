# 🚀 Syed Atif Shah - Portfolio Website

A modern, space-themed portfolio website showcasing my skills, projects, and experience as a Web & Mobile Developer. Built with React.js frontend and Node.js backend, featuring stunning animations, responsive design, and an immersive cosmic experience with full-stack functionality.

## ✨ Features

- **Space-themed Design**: Immersive cosmic experience with animated backgrounds
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Glass-morphism effects, smooth animations, and interactive elements
- **Fast Performance**: Optimized React components and efficient rendering
- **Interactive Sections**: 
  - Hero section with animated astronaut
  - Skills showcase with solar system animation
  - Project gallery with 3D computer display
  - Testimonials carousel
  - Contact form with interactive space avatar
- **AI Assistant Chatbot**: Floating, theme-aligned assistant that answers questions about Atif Shah’s profile, skills, and projects
- **Floating Launcher**: Circular "AI" button with floating label; opens a responsive chat panel
- **Smooth Navigation**: Sticky navigation with smooth scrolling
- **Framer Motion Animations**: Beautiful entrance and hover animations
- **Gradient Effects**: Stunning color gradients and glow effects
- **Contact Form**: Functional contact form with email service
- **Interactive Avatar**: Space avatar that responds to user interactions
- **Dynamic Backgrounds**: Animated videos and images that enhance the experience

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18+
- **Styling**: CSS3 with custom properties and animations
- **Animations**: Framer Motion
- **Icons**: lucide-react and react-icons
- **Build Tool**: Create React App
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Email Service**: Nodemailer
- **AI Chat Endpoint**: Invokes Python script via Node to get Gemini responses
- **Environment**: dotenv
- **CORS**: Cross-Origin Resource Sharing enabled
- **Body Parser**: JSON and URL-encoded data parsing

### AI Assistant (Python)
- **Orchestration**: LangChain
- **Model**: Google Gemini via `langchain-google-genai`
- **Env Management**: python-dotenv

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Development Server**: Nodemon (backend)
- **Hot Reload**: React development server

## 📁 Project Structure

```
MyPortfolio/
├── frontend/                      # React.js Frontend Application
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Footer.js
│   │   │   ├── Menubar.js
│   │   │   ├── Ticker.js
│   │   │   ├── WorkBanner.js
│   │   │   └── Chatbot.js
│   │   ├── Pages/
│   │   │   ├── AboutUs.js
│   │   │   ├── ContactPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── Projects.js
│   │   │   ├── Skills.js
│   │   │   └── Testimonials.js
│   │   ├── Services/
│   │   │   └── Apis.js
│   │   ├── Assets/
│   │   │   ├── Css/
│   │   │   │   ├── AboutUs.css
│   │   │   │   ├── Chatbot.css
│   │   │   │   ├── ContactPage.css
│   │   │   │   ├── Footer.css
│   │   │   │   ├── HomePage.css
│   │   │   │   ├── Menubar.css
│   │   │   │   ├── Projects.css
│   │   │   │   ├── Skills.css
│   │   │   │   ├── Testimonials.css
│   │   │   │   ├── Ticker.css
│   │   │   │   └── WorkBanner.css
│   │   │   ├── Documents/
│   │   │   │   └── Atif Cv.pdf
│   │   │   ├── Images/
│   │   │   │   ├── About.png
│   │   │   │   ├── astronaut.png
│   │   │   │   ├── astronaut2.jpg
│   │   │   │   ├── astronaut3.png
│   │   │   │   ├── astronaut4.png
│   │   │   │   ├── contactimage.png
│   │   │   │   ├── digital brain (2).png
│   │   │   │   ├── logo.png
│   │   │   │   ├── minirobot.png
│   │   │   │   └── profilepicture.png
│   │   │   └── Videos/
│   │   │       ├── blackhole.mp4
│   │   │       ├── galaxy.mp4
│   │   │       ├── glob.mp4
│   │   │       └── technologies.mp4
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
└── Server/
    ├── Controllers/
    │   ├── emailController.js
    │   └── chatController.js
    ├── Routes/
    │   ├── emailRoutes.js
    │   └── chatRoutes.js
    ├── AI Assistant/
    │   └── chat.py
    ├── index.js
    ├── package.json
    └── package-lock.json
```

## 🖼️ Screenshots

Below are screenshots of key sections in the application (Education appears after About):

![About](src/Assets/Screenshots/About.png)
![Education](src/Assets/Screenshots/Education.png)
![Hero Section](src/Assets/Screenshots/HeroSection.png)
![Skills](src/Assets/Screenshots/skills.png)
![Projects](src/Assets/Screenshots/project.png)
![Testimonials](src/Assets/Screenshots/Testimonials.png)
![Contact](src/Assets/Screenshots/Contact.png)
![Chatbot](src/Assets/Screenshots/chatbot.png)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git
- Email service credentials (Gmail, Outlook, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ATIFSHAH159/Atif-portfolio-2025
   cd portfolio
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Server
   npm install
   ```

4. **Environment Setup (Server)**
   Create a `.env` file in the `Server` directory:
   ```env
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   # AI Assistant
   GOOGLE_API_KEY=your-gemini-api-key
   ```

5. **Python Dependencies (for AI Assistant)**
   The Node server spawns a Python process to answer chat prompts. Install Python 3.10+ and these packages (in your preferred environment/venv):
   ```bash
   pip install langchain-google-genai langchain-core python-dotenv google-generativeai
   ```

6. **Start the Backend Server**
   ```bash
   cd Server
   npm run dev
   # or
   npm start
   ```

7. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```

8. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

9. **Use the AI Assistant**
   - Click the circular "AI" button at the bottom-right (label "AI Assistant ↓").
   - The chat opens and auto-focuses the input. Press Enter to send.
   - The assistant answers based on curated resume info.

## 🎨 Design Features

### Color Palette
- **Primary**: `#1de9ff` (Cyan)
- **Secondary**: `#8a2be2` (Blue Violet)
- **Background**: Dark space theme with gradients
- **Text**: White with various opacity levels

### Typography
- **Primary Font**: Inter, sans-serif
- **Headings**: Bold weights with gradient text effects
- **Body**: Clean, readable font with proper line heights

### Animations
- **Framer Motion**: Smooth page transitions and component animations
- **CSS Animations**: Floating elements, twinkling stars, and orbital motions
- **Hover Effects**: Interactive buttons and cards with smooth transitions

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Create React App](https://create-react-app.dev/) for the development environment
- Space-themed inspiration from various design resources
- All the open-source libraries that made this project possible

## 📞 Contact

If you have any questions or want to collaborate, feel free to reach out:

- **Email**: [aatifshah15@gmail.com]
---

⭐ **Star this repository if you found it helpful!**

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Loading Time**: < 3 seconds on average connection
- **Mobile Performance**: Optimized for mobile devices
- **API Response Time**: < 500ms for email service
- **Server Uptime**: 99.9% availability
- **Database**: No database required (stateless design)

## 🔌 API Endpoints

### Email Service
- **POST** `/api/email/contact` - Send contact form email
  - **Body**: `{ name, email, subject, message }`
  - **Response**: `{ success: boolean, message: string }`

### Health Check
- **GET** `/api/health` - Server health status
  - **Response**: `{ message: string, timestamp: string }`

### AI Assistant
- **POST** `/api/chat` - Send a prompt to the AI assistant
  - **Body**: `{ message: string }`
  - **Response**: `{ success: boolean, response: string }`



---

**Built with ❤️ by Syed Atif Shah**
