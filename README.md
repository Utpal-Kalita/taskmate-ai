# TaskMate AI - Intelligent Task Management Platform

A sophisticated, modern task management web application built with Flask, featuring comprehensive user authentication, advanced task management capabilities, and a stunning responsive UI with glassmorphism design.

## ✨ Key Features

### 🔐 **Advanced Authentication System**
- Secure user registration and login with password hashing
- Session-based authentication with automatic redirects
- Protected routes and user-specific data isolation
- Password confirmation validation

### 📋 **Comprehensive Task Management**
- **Create & Edit Tasks**: Full CRUD operations with intuitive forms
- **Status Tracking**: "To Do", "In Progress", and "Done" with visual indicators
- **Priority Levels**: High, Medium, Low priority classification
- **Deadline Management**: Set and track task deadlines
- **Smart Sorting**: Sort tasks by creation date, deadline, or priority
- **Task Statistics**: Real-time dashboard with completion metrics

### 🎨 **Modern User Interface**
- **Glassmorphism Design**: Beautiful transparent and frosted glass effects
- **Gradient Backgrounds**: Modern purple-to-blue gradients throughout
- **Responsive Layout**: Perfect experience on desktop, tablet, and mobile
- **Interactive Elements**: Smooth animations and hover effects
- **Consistent Navigation**: Unified navbar across all pages
- **Professional Landing Page**: Compelling hero section with feature highlights

### 📊 **Dashboard & Analytics**
- **Task Overview**: Visual cards showing total, completed, in-progress tasks
- **Overdue Tracking**: Automatic identification of overdue tasks
- **High Priority Display**: Quick access to important tasks
- **Upcoming Deadlines**: Timeline view of approaching due dates
- **Progress Visualization**: Clear metrics and statistics

### 🔧 **Technical Excellence**
- **Database Integration**: SQLite with CS50 SQL library
- **Environment Configuration**: Secure environment variable management
- **Error Handling**: Professional apology pages with helpful messages
- **Form Validation**: Comprehensive client and server-side validation
- **Security**: CSRF protection and input sanitization

## 🛠️ Technology Stack

### **Backend Technologies**
- **Python Flask 3.1.1**: Robust web framework with modern features
- **SQLite3**: Lightweight, serverless database
- **CS50 SQL Library**: Simplified database operations
- **Werkzeug**: Advanced password hashing and security
- **Python-dotenv**: Environment variable management

### **Frontend Technologies**
- **HTML5 & CSS3**: Modern web standards with semantic markup
- **Bootstrap 5.3.3**: Responsive framework with advanced components
- **Font Awesome 6.0**: Comprehensive icon library
- **Custom CSS**: Advanced glassmorphism and gradient effects
- **JavaScript**: Interactive elements and smooth animations

### **Development & Deployment**
- **Virtual Environment**: Isolated Python environment
- **Git Version Control**: Professional code management
- **Environment Variables**: Secure configuration management

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Utpal-Kalita/taskmate-ai.git
   cd taskmate-ai
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv env
   ```

3. **Activate the virtual environment**
   - On Windows:
     ```bash
     env\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source env/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   Create a `.env` file in the project root:
   ```
   SECRET_KEY=your-secret-key-here
   ```

6. **Run the application**
   ```bash
   python app.py
   ```

7. **Open your browser**
   Navigate to `http://127.0.0.1:5000`

## 📁 Project Architecture

```
taskmate-ai/
├── 📱 app.py                    # Main Flask application with all routes
├── 📦 requirements.txt          # Python dependencies
├── 🔐 .env                     # Environment variables (create this)
├── 📝 .gitignore              # Git ignore configuration
├── 🗄️ taskmate.db             # SQLite database (auto-created)
├── 📄 README.md               # Project documentation
├── 📁 templates/              # Jinja2 HTML templates
│   ├── 🏗️ layout.html         # Base template with navbar block
│   ├── 🏠 index.html          # Modern landing page with hero section
│   ├── 🔑 login.html          # User login with modern navbar
│   ├── ✍️ register.html       # User registration with validation
│   ├── 📊 dashboard.html      # Analytics dashboard with statistics
│   ├── ✅ my_task.html        # Task management with CRUD operations
│   ├── ✏️ edit_task.html      # Task editing interface
│   ├── 👤 profile.html        # User profile management
│   └── ❌ apology.html        # Error handling page
├── 📁 static/                 # Static assets (if needed)
├── 📁 utils/                  # Utility modules
│   ├── 🤖 ai.py              # AI-related functions (future)
│   └── 🗄️ database.py        # Database initialization and schema
└── 📁 env/                    # Virtual environment (local)
```

## 🎯 User Guide

### **Getting Started**
1. **Visit the Landing Page**: Beautiful hero section with TaskMate overview
2. **Create Account**: Click "Register" and fill in your credentials
3. **Secure Login**: Access your personal dashboard with task statistics

### **Dashboard Overview**
- **Task Statistics**: Visual cards showing total, completed, in-progress, and overdue tasks
- **High Priority Tasks**: Quick access to your most important tasks
- **Upcoming Deadlines**: Timeline of tasks approaching their due dates
- **Progress Tracking**: Real-time completion metrics

### **Task Management Workflow**
1. **Create Tasks**: Navigate to "My Tasks" and click "Add New Task"
2. **Set Details**: 
   - Task title and description
   - Priority level (High/Medium/Low)
   - Status (To Do/In Progress/Done)
   - Optional deadline
3. **Edit & Update**: Click edit button to modify task details
4. **Track Progress**: Update status as you work on tasks
5. **Delete Tasks**: Remove completed or cancelled tasks

### **Task Organization**
- **Smart Sorting**: Sort by creation date, deadline, or priority
- **Status Filtering**: Visual indicators for different task states
- **Priority Levels**: Color-coded priority classification
- **Deadline Tracking**: Automatic overdue detection

### **Navigation Features**
- **Consistent Design**: Modern glassmorphism navbar across all pages
- **Responsive Layout**: Seamless experience on all devices
- **Quick Access**: Easy navigation between dashboard, tasks, and profile

## 🗄️ Database Schema

### **Users Table**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **Tasks Table**
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'To Do',
    priority TEXT DEFAULT 'Medium',
    deadline DATE,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **Data Relationships**
- **One-to-Many**: Each user can have multiple tasks
- **User Isolation**: Tasks are filtered by user_id for security
- **Automatic Timestamps**: Creation and update times tracked
- **Flexible Priorities**: High, Medium, Low classification
- **Status Progression**: To Do → In Progress → Done workflow

## 🔐 Security & Best Practices

### **Authentication Security**
- **Password Hashing**: Werkzeug-based secure password storage
- **Session Management**: Server-side session handling with Flask
- **Route Protection**: Authentication required for all user areas
- **Input Validation**: Comprehensive form validation and sanitization

### **Data Security**
- **User Isolation**: Tasks strictly filtered by authenticated user ID
- **SQL Injection Prevention**: Parameterized queries with CS50 SQL
- **CSRF Protection**: Built-in Flask security features
- **Environment Variables**: Sensitive data stored securely

### **Code Quality**
- **Error Handling**: Graceful error pages with helpful messages
- **Template Security**: Jinja2 auto-escaping for XSS prevention
- **Clean Architecture**: Modular code structure with utils separation
- **Database Integrity**: Foreign key constraints and data validation

## 🚧 Development Roadmap

### **🎯 Completed Features**
- ✅ User authentication and registration system
- ✅ Complete CRUD operations for tasks
- ✅ Modern glassmorphism UI design
- ✅ Dashboard with analytics and statistics
- ✅ Task prioritization and deadline management
- ✅ Responsive design for all devices
- ✅ Smart task sorting and filtering
- ✅ Professional landing page
- ✅ Consistent navigation across all pages

### **🔮 Upcoming Features**
- [ ] **Advanced Search**: Full-text search across tasks
- [ ] **Task Categories**: Organize tasks by custom categories/tags
- [ ] **Reminders & Notifications**: Email and browser notifications
- [ ] **Team Collaboration**: Shared workspaces and task assignment
- [ ] **File Attachments**: Upload documents and images to tasks
- [ ] **Task Templates**: Create reusable task templates
- [ ] **Time Tracking**: Built-in time logging for tasks
- [ ] **Calendar Integration**: Visual calendar view of tasks
- [ ] **Export/Import**: Backup and restore task data
- [ ] **Mobile App**: Native iOS and Android applications

### **🤖 AI Integration (Future)**
- [ ] **Smart Suggestions**: AI-powered task recommendations
- [ ] **Auto-categorization**: Intelligent task classification
- [ ] **Deadline Prediction**: AI-based deadline estimation
- [ ] **Productivity Insights**: AI-generated productivity reports
- [ ] **Natural Language**: Create tasks using natural language input

## 📸 Screenshots & Demo

### **🏠 Landing Page**
- Modern hero section with gradient background
- Feature highlights and call-to-action buttons
- Responsive design with glassmorphism effects

### **📊 Dashboard**
- Task statistics with visual cards
- High priority tasks overview
- Upcoming deadlines timeline
- Progress tracking metrics

### **✅ Task Management**
- Comprehensive task list with sorting options
- Inline editing and status updates
- Priority-based color coding
- Deadline tracking with overdue indicators

### **🎨 Design Highlights**
- Consistent glassmorphism design language
- Purple-to-blue gradient themes
- Smooth animations and hover effects
- Mobile-responsive layout

## 🚀 Performance & Optimization

### **Frontend Performance**
- Optimized CSS with efficient selectors
- Minimal JavaScript for better load times
- Responsive images and assets
- Clean, semantic HTML structure

### **Backend Efficiency**
- Efficient SQL queries with proper indexing
- Session management with minimal overhead
- Optimized database operations
- Clean route handling and error management

### **Scalability Considerations**
- Modular code architecture for easy expansion
- Environment-based configuration
- Database design ready for additional features
- Clean separation of concerns

## 🤝 Contributing

We welcome contributions to TaskMate AI! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper testing
4. Commit with descriptive messages (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request with detailed description

### **Contribution Guidelines**
- Follow PEP 8 Python style guidelines
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation for new features
- Maintain consistent code formatting

### **Areas for Contribution**
- UI/UX improvements and new designs
- Backend optimization and new features
- Database enhancements and migrations
- Security improvements and testing
- Documentation and tutorial creation
- Bug fixes and performance optimization

## � License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

### **MIT License Summary**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ License and copyright notice required
- ❗ No warranty provided

## 👨‍💻 Author & Maintainer

**Utpal Kalita**
- 🐙 GitHub: [@Utpal-Kalita](https://github.com/Utpal-Kalita)
- 📧 Email: [Contact for collaborations]
- 🌐 Portfolio: [Your portfolio website]
- 💼 LinkedIn: [Your LinkedIn profile]

## 🙏 Acknowledgments & Credits

### **Technologies & Libraries**
- **CS50 Team**: For the excellent SQL library and educational resources
- **Flask Community**: For comprehensive documentation and examples
- **Bootstrap Team**: For the responsive framework and components
- **Font Awesome**: For the beautiful and comprehensive icon library

### **Design Inspiration**
- Modern glassmorphism design trends
- Contemporary task management applications
- Material Design principles
- Apple's Human Interface Guidelines

### **Special Thanks**
- Open source community for continuous inspiration
- Beta testers for valuable feedback and suggestions
- Contributors who help improve the project

---

## 🌟 Support the Project

If you find TaskMate AI helpful, please consider:

- ⭐ **Starring the repository** to show your support
- 🐛 **Reporting bugs** to help improve the application
- 💡 **Suggesting features** for future development
- 🤝 **Contributing code** to enhance functionality
- 📢 **Sharing the project** with others who might benefit

---

**TaskMate AI** - *Organize your life, achieve your goals* 🚀
