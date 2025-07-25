# TaskMate AI - Intelligent Task Management Platform
#### Video Demo: <URL HERE>
#### Description:

TaskMate AI is a web application that revolutionizes personal productivity by using artificial intelligence to break down large, complex projects into small, manageable subtasks. Built with Flask and integrated with Google's Gemini AI, this platform transforms overwhelming goals into clear, actionable steps, all within a secure and intuitive interface.

## Key Features

- **AI-Powered Task Breakdown**: Leverages Google's Gemini AI to analyze user-defined projects and automatically generate a list of actionable subtasks.

- **Full CRUD Functionality**: A comprehensive task management system for creating, reading, updating, and deleting tasks.

- **User Authentication**: Secure registration and login system with password hashing to ensure user data remains private.

- **Interactive Dashboard**: Displays task statistics, high-priority items, and upcoming deadlines at a glance.

- **Modern UI/UX**: Features a responsive, glassmorphism-inspired design with smooth animations and a clean layout.

- **Smart Task Management**: Includes features like priority-based color coding, smart sorting, and automatic overdue task detection.

## Tech Stack

- **Backend**: Python, Flask 3.1.1
- **Database**: SQLite (with CS50 SQL Library)
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5.3.3
- **AI**: Google Gemini API
- **Icons**: Font Awesome
- **Development Assistant**: GitHub Copilot

## Getting Started

To get a local copy up and running, follow these simple steps.

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd taskmate-ai
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file and add your Google AI API key:
   ```
   GOOGLE_AI_API_KEY=YOUR_API_KEY
   ```

5. **Run the application:**
   ```bash
   python app.py
   ```

## Usage

The application provides a seamless workflow for enhancing productivity:

1. **Register & Login**: Create an account or log in to access your personal dashboard.

2. **Use the AI Task Breaker**: On the dashboard, enter a large or complex task (e.g., "Launch a new marketing campaign"). The AI will generate a list of suggested subtasks.

3. **Manage Your Tasks**: Add the AI-generated subtasks to your list or create tasks manually. You can edit, delete, and update the status and priority of each task in the "My Tasks" section.

4. **Track Your Progress**: Use the dashboard to monitor your progress with statistics on completed, pending, and overdue tasks.

## Key Architectural Decisions

- **AI Integration**: Google's Gemini AI was selected for its strong natural language processing capabilities and generous free tier. To manage the API's rate limit of 15 requests per minute, the application implements a server-side 4-second delay between calls and provides clear client-side feedback, including loading states and error messages.

- **UI/UX Design**: A glassmorphism aesthetic was chosen to give the application a modern and professional feel. The design was heavily refined using GitHub Copilot, which assisted in generating CSS animations, responsive layouts, and optimizing the user interface.

- **Database Architecture**: SQLite was chosen for its simplicity and ease of deployment, making it ideal for this project's scope. The database schema ensures strict user data isolation through foreign key relationships and includes timestamps for future auditing or analytics features.

- **Security**: The application incorporates multiple security measures, including Werkzeug for password hashing, session-based authentication to protect routes, and parameterized SQL queries to prevent SQL injection attacks.

## File Structure

- **app.py**: Main Flask application file containing all routes, core logic, and AI integration.

- **utils/database.py**: Utility module for initializing the SQLite database and creating the schema.

- **static/**: Contains all static assets.
  - **script.js**: Handles client-side logic for AI interaction, including API calls and loading states.

- **templates/**: Contains all HTML templates.
  - **layout.html**: The base template providing consistent navigation and styling.
  - **dashboard.html**: The main user dashboard featuring the AI Task Breaker.
  - **my_task.html**: The interface for all task CRUD operations.
  - **login.html & register.html**: User authentication pages.

## Future Enhancements

- **Advanced AI Features**: Integrate AI for predicting task complexity, suggesting deadlines, and providing productivity analytics.

- **Collaboration**: Add features for team-based projects, allowing users to assign tasks and collaborate.

- **Categorization and Search**: Implement task categorization (e.g., work, personal) and a robust search functionality.

- **Mobile Applications**: Develop native mobile apps for iOS and Android to provide a seamless cross-platform experience.

