# TaskMate AI - CS50x Final Project

## Video Demo: [To be added]

## Description

TaskMate AI is a comprehensive task management web application that combines traditional productivity features with artificial intelligence to help users break down complex tasks into manageable subtasks. Built with Flask and integrated with Google's Gemini AI, this application provides an intelligent approach to personal task management.

The application was developed as my final project for Harvard's CS50x course, demonstrating the integration of web development technologies, database management, user authentication, and AI services in a practical, real-world application.

### What TaskMate AI Does

TaskMate AI serves as a personal productivity assistant that goes beyond simple to-do lists. Users can create, organize, and manage their tasks while leveraging AI capabilities to automatically break down complex projects into smaller, actionable steps. The application features a clean, intuitive interface built with Bootstrap and custom CSS, providing users with visual feedback on their productivity through comprehensive dashboard analytics.

### Why This Project

I chose to build TaskMate AI because I wanted to explore how artificial intelligence could enhance traditional productivity tools. Many task management applications exist, but few integrate AI in a meaningful way to help users tackle overwhelming projects. This project allowed me to combine my learning from CS50x with modern AI technologies while creating something genuinely useful for personal productivity.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login system with password hashing
- **Task Management**: Complete CRUD operations for tasks with priority levels and deadlines
- **AI-Powered Task Breaking**: Integration with Google Gemini AI to break complex tasks into subtasks
- **Dashboard Analytics**: Visual representation of task statistics and productivity metrics
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5.3.3

### Advanced Features
- **Smart Task Organization**: Tasks categorized by status (To Do, In Progress, Completed)
- **Priority Management**: High, Medium, and Low priority levels with visual indicators
- **Deadline Tracking**: Date-based task organization with overdue notifications
- **Real-time Updates**: Dynamic content updates without page refreshes
- **Rate-Limited AI**: Intelligent handling of AI API calls with user feedback

## Technology Stack

### Backend
- **Flask 3.1.1**: Python web framework for application structure
- **CS50 SQL**: Database abstraction layer for SQLite operations
- **SQLite**: Lightweight database for data persistence
- **Werkzeug**: Security utilities for password hashing
- **Google Generative AI**: Gemini model integration for task breakdown

### Frontend
- **HTML5/CSS3**: Semantic markup and modern styling
- **Bootstrap 5.3.3**: Responsive framework for UI components
- **Font Awesome**: Icon library for enhanced visual elements
- **Jinja2**: Template engine for dynamic content rendering
- **Custom CSS**: Enhanced styling for improved user experience

### Development Tools
- **Python Virtual Environment**: Isolated dependency management
- **Git**: Version control for project history
- **Requirements.txt**: Dependency specification for easy deployment

## Project Structure

```
taskmate-ai/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── taskmate.db           # SQLite database (created on first run)
├── utils/
│   ├── database.py       # Database initialization utilities
│   ├── ai.py            # AI integration module (placeholder)
│   └── database_clean.py # Database maintenance utilities
├── templates/
│   ├── layout.html       # Base template with navigation
│   ├── index.html        # Landing page
│   ├── dashboard.html    # Main dashboard with analytics
│   ├── my_task.html      # Task management interface
│   ├── add_task.html     # Task creation form
│   ├── edit_task.html    # Task editing interface
│   ├── login.html        # User login form
│   ├── register.html     # User registration form
│   ├── profile.html      # User profile page
│   └── apology.html      # Error page template
├── static/
│   ├── styles.css        # Main stylesheet
│   ├── css/
│   │   └── style.css     # Additional styling
│   └── script.js         # Client-side JavaScript
└── env/                  # Virtual environment (not in git)
```

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Git (for cloning the repository)

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd taskmate-ai
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv env
   ```

3. **Activate Virtual Environment**
   - On Windows:
     ```bash
     env\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source env/bin/activate
     ```

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set Up Environment Variables**
   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   FLASK_SECRET_KEY=your_secret_key_here
   ```

6. **Initialize Database**
   ```bash
   python utils/database.py
   ```

7. **Run the Application**
   ```bash
   flask run
   ```

8. **Access the Application**
   Open your browser and navigate to `http://127.0.0.1:5000`

## Usage Guide

### Getting Started
1. **Register**: Create a new account on the registration page
2. **Login**: Access your account using your credentials
3. **Dashboard**: View your task overview and productivity statistics

### Managing Tasks
1. **Create Tasks**: Use the "My Tasks" page to add new tasks with titles, descriptions, priorities, and deadlines
2. **Edit Tasks**: Click on any task to modify its details or change its status
3. **Delete Tasks**: Remove completed or cancelled tasks from your list
4. **Organize**: Filter and sort tasks by status, priority, or deadline

### AI Features
1. **Task Breaking**: When creating or editing a task, use the "Break with AI" feature
2. **Subtask Generation**: The AI will analyze your task and suggest actionable subtasks
3. **Rate Limiting**: The system manages AI usage to prevent quota exhaustion

### Dashboard Analytics
- **Task Distribution**: Visual pie chart of tasks by status
- **Priority Overview**: Breakdown of tasks by priority level
- **Progress Tracking**: Completion rates and productivity metrics
- **Recent Activity**: Timeline of recent task updates

## Design Decisions

### Database Schema
I chose SQLite for its simplicity and portability, perfect for a single-user application. The schema uses two main tables:
- **Users**: Stores authentication data with secure password hashing
- **Tasks**: Contains all task information with foreign key relationships

### AI Integration
The Google Gemini integration was chosen for its:
- Natural language processing capabilities
- Free tier availability for development
- Comprehensive API documentation
- Rate limiting that encourages thoughtful usage

### Frontend Architecture
Bootstrap was selected for rapid development while custom CSS provides:
- Consistent branding and visual identity
- Enhanced user experience beyond default Bootstrap components
- Responsive design patterns for mobile compatibility
- Accessibility considerations for diverse users

### Security Considerations
- Password hashing using Werkzeug's security utilities
- Session management through Flask's built-in session handling
- Input validation and sanitization on all forms
- Environment variables for sensitive configuration data

## Challenges and Solutions

### Challenge 1: AI API Integration
**Problem**: Managing rate limits and API errors gracefully
**Solution**: Implemented user feedback system with error handling and usage tracking

### Challenge 2: Database Design
**Problem**: Ensuring data integrity and relationship management
**Solution**: Used CS50's SQL library with proper foreign key constraints and validation

### Challenge 3: User Experience
**Problem**: Creating an intuitive interface for complex functionality
**Solution**: Iterative design process with user feedback and Bootstrap's responsive components

### Challenge 4: State Management
**Problem**: Maintaining application state across page navigation
**Solution**: Session-based authentication with proper logout handling and CSRF protection

## Future Enhancements

### Planned Features
- **Collaborative Tasks**: Multi-user task sharing and assignment
- **Calendar Integration**: Sync with Google Calendar or Outlook
- **Mobile App**: Native mobile application for iOS and Android
- **Advanced Analytics**: Detailed productivity reports and trends
- **Notification System**: Email and push notifications for deadlines

### Technical Improvements
- **Database Migration**: Move to PostgreSQL for production deployment
- **Caching Layer**: Implement Redis for improved performance
- **API Development**: RESTful API for third-party integrations
- **Testing Suite**: Comprehensive unit and integration tests
- **Deployment**: Docker containerization for cloud deployment

## Contributing

This project was developed as a CS50x final project and is primarily for educational purposes. However, suggestions and feedback are welcome through:
- Issue tracking for bug reports
- Feature requests for enhancement ideas
- Code review for learning opportunities

## License

This project is developed for educational purposes as part of Harvard's CS50x course. Please respect academic integrity guidelines when referencing or building upon this work.

## Acknowledgments

- **Harvard CS50x**: For providing the foundational knowledge and inspiration
- **Google Gemini AI**: For the artificial intelligence capabilities
- **Bootstrap Team**: For the responsive framework
- **Flask Community**: For the excellent web framework and documentation
- **CS50 Staff**: For the SQL library and educational resources

## Contact

Developed by [Your Name] as a CS50x Final Project
- GitHub: [Your GitHub Profile]
- Email: [Your Email]
- CS50x: [Your CS50x Username]

---

*This project represents the culmination of my learning journey through Harvard's CS50x course, combining web development, database management, artificial intelligence, and user experience design into a practical application that solves real-world productivity challenges.*
  - **my_task.html**: The interface for all task CRUD operations.
  - **login.html & register.html**: User authentication pages.

## Future Enhancements

- **Advanced AI Features**: Integrate AI for predicting task complexity, suggesting deadlines, and providing productivity analytics.

- **Collaboration**: Add features for team-based projects, allowing users to assign tasks and collaborate.

- **Categorization and Search**: Implement task categorization (e.g., work, personal) and a robust search functionality.

- **Mobile Applications**: Develop native mobile apps for iOS and Android to provide a seamless cross-platform experience.

