# TaskMate AI - Intelligent Task Manager

A modern, AI-powered task management web application built with Flask, featuring user authentication, task management, and a beautiful responsive UI.

## 🚀 Features

- **User Authentication**: Secure registration and login system with password hashing
- **Task Management**: Create, view, and organize tasks with status tracking
- **Beautiful UI**: Modern, responsive design with Bootstrap 5
- **Database Integration**: SQLite database with CS50 SQL library
- **Session Management**: Secure user sessions
- **Status Tracking**: Track tasks with "To Do", "In Progress", and "Done" statuses
- **User-Specific Tasks**: Each user sees only their own tasks

## 🛠️ Technologies Used

- **Backend**: Python Flask 3.1.1
- **Database**: SQLite3 with CS50 SQL library
- **Frontend**: HTML5, CSS3, Bootstrap 5.3.3
- **Security**: Werkzeug password hashing
- **Icons**: Font Awesome 6.0
- **Environment**: Python virtual environment

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

## 📁 Project Structure

```
taskmate-ai/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (create this)
├── .gitignore           # Git ignore file
├── taskmate.db          # SQLite database (auto-created)
├── templates/           # HTML templates
│   ├── layout.html      # Base template
│   ├── index.html       # Landing page
│   ├── login.html       # Login page
│   ├── register.html    # Registration page
│   ├── dashboard.html   # User dashboard
│   ├── add_task.html    # Add/view tasks page
│   ├── profile.html     # User profile page
│   └── apology.html     # Error page
├── static/              # Static files (CSS, JS, images)
└── utils/               # Utility modules
    ├── ai.py           # AI-related functions
    └── database.py     # Database initialization
```

## 🎯 Usage

### Registration & Login
1. Visit the homepage
2. Click "Register" to create a new account
3. Fill in username, password, and confirmation
4. Login with your credentials

### Managing Tasks
1. After login, navigate to "Add Task"
2. Fill in task title, description, and status
3. Click "Add Task" to save
4. View all your tasks in the table below
5. Tasks are color-coded by status:
   - 📝 **To Do** (Yellow)
   - ⏳ **In Progress** (Blue)
   - ✅ **Done** (Green)

## 🗄️ Database Schema

### Users Table
- `id`: Primary key
- `username`: Unique username
- `hash`: Hashed password

### Tasks Table
- `id`: Primary key
- `title`: Task title
- `description`: Task description
- `status`: Task status (To Do, In Progress, Done)
- `user_id`: Foreign key to users table
- `created_at`: Timestamp
- `completed_at`: Completion timestamp

## 🔐 Security Features

- Password hashing with Werkzeug
- Session-based authentication
- CSRF protection
- User-specific data isolation
- Input validation and sanitization

## 🚧 Roadmap

- [ ] Task editing and deletion
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task prioritization
- [ ] AI-powered task suggestions
- [ ] Export/import functionality
- [ ] Team collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Utpal Kalita**
- GitHub: [@Utpal-Kalita](https://github.com/Utpal-Kalita)

## 🙏 Acknowledgments

- CS50 for the amazing SQL library
- Bootstrap team for the responsive framework
- Font Awesome for the beautiful icons
- Flask community for excellent documentation

---

⭐ If you find this project helpful, please give it a star!
