from flask import Flask, render_template, request, session, redirect, url_for, flash, jsonify
from dotenv import load_dotenv
import os
import time
from werkzeug.security import check_password_hash, generate_password_hash
from cs50 import SQL
from utils.database import init_database
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key-change-this')

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///taskmate.db")

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_AI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

# Rate limiting for API calls
last_api_call = 0
api_call_delay = 4  # 4 seconds between calls to stay under 15/minute


# Initialize database on startup
init_database()

def apology(message, code=400):
    """Render message as an apology to user."""
    return render_template("apology.html", top=code, bottom=message), code

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    if "user_id" not in session:
        return redirect("/login")
    
    # Import date at the top
    from datetime import date
    
    user_id = session["user_id"]
    today = date.today().isoformat()  # 'YYYY-MM-DD'
    
    # Get task counts
    total_tasks = db.execute("SELECT COUNT(*) FROM tasks WHERE user_id = ?", user_id)[0]["COUNT(*)"]
    completed_tasks = db.execute("SELECT COUNT(*) FROM tasks WHERE user_id = ? AND status = 'Done'", user_id)[0]["COUNT(*)"]
    in_progress_tasks = db.execute("SELECT COUNT(*) FROM tasks WHERE user_id = ? AND status = 'In Progress'", user_id)[0]["COUNT(*)"]
    todo_tasks = db.execute("SELECT COUNT(*) FROM tasks WHERE user_id = ? AND status = 'To Do'", user_id)[0]["COUNT(*)"]
    overdue_tasks = db.execute("SELECT COUNT(*) FROM tasks WHERE deadline < ? AND user_id = ? AND status != 'Done'", today, user_id)[0]["COUNT(*)"]
    
    # Fetch high priority tasks for logged-in user (prioritize those with deadlines)
    high_priority_tasks = db.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND priority = ? ORDER BY deadline IS NULL, deadline ASC LIMIT 5",
        user_id,
        "High"
    )
    
    # Fetch upcoming tasks (only tasks with deadlines)
    upcoming_tasks = db.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND deadline IS NOT NULL AND deadline >= ? ORDER BY deadline ASC LIMIT 5",
        user_id,
        today
    )

    return render_template("dashboard.html", 
                         total_tasks=total_tasks,
                         completed_tasks=completed_tasks,
                         in_progress_tasks=in_progress_tasks,
                         todo_tasks=todo_tasks,
                         overdue_tasks=overdue_tasks,
                         high_priority_tasks=high_priority_tasks, 
                         upcoming_tasks=upcoming_tasks)

@app.route("/my_task", methods=["GET", "POST"])
def my_task():
    # Check if user is logged in
    if "user_id" not in session:
        return redirect("/login")
        
    if request.method == "POST":
        # get form data correctly
        title = request.form.get("title")
        description = request.form.get("description")
        status = request.form.get("status") or "To Do"  # Default to "To Do" if not provided
        priority = request.form.get("priority") or "Medium"  # Default to "Medium" if not provided
        deadline = request.form.get("deadline")  # Get deadline from form

        # validation
        if not title:
            return apology("must provide a task title", 400)
        if not description:
            return apology("must provide a task description", 400)

        # insert into DB with user_id, status, priority, and deadline
        db.execute("INSERT INTO tasks (title, description, status, priority, deadline, user_id) VALUES (?, ?, ?, ?, ?, ?)", 
                  title, description, status, priority, deadline, session["user_id"])

        # redirect after success
        return redirect("/my_task")

    else:
        # Get sort option from query param
        sort_by = request.args.get("sort_by") or "created_at"

        # Allow only specific columns for sorting
        allowed_sorts = {
            "created_at": "created_at",
            "deadline": "deadline",
            "priority": "priority"
        }
        sort_column = allowed_sorts.get(sort_by, "created_at")

        # Fetch sorted tasks
        if sort_column == "priority":
            # Special sorting for priority: High > Medium > Low
            query = """
                SELECT * FROM tasks WHERE user_id = ? 
                ORDER BY 
                    CASE priority
                        WHEN 'High' THEN 1
                        WHEN 'Medium' THEN 2
                        WHEN 'Low' THEN 3
                        ELSE 4
                    END
            """
            tasks = db.execute(query, session["user_id"])
        else:
            tasks = db.execute(
                f"SELECT * FROM tasks WHERE user_id = ? ORDER BY {sort_column} DESC",
                session["user_id"]
            )
        return render_template("my_task.html", all_tasks=tasks)


@app.route("/edit_task/<int:task_id>", methods=["GET", "POST"])
def edit_task(task_id):
    """Edit a specific task"""
    if "user_id" not in session:
        return redirect("/login")
    
    # Get the task
    task_rows = db.execute("SELECT * FROM tasks WHERE id = ? AND user_id = ?", 
                          task_id, session["user_id"])
    
    if not task_rows:
        return apology("Task not found", 404)
    
    task = task_rows[0]
    
    if request.method == "POST":
        title = request.form.get("title")
        description = request.form.get("description")
        status = request.form.get("status")
        priority = request.form.get("priority")
        deadline = request.form.get("deadline")
        
        if not title or not description:
            return apology("Title and description are required", 400)
        
        # Update the task
        db.execute("UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, deadline = ? WHERE id = ? AND user_id = ?",
                  title, description, status, priority, deadline, task_id, session["user_id"])
        
        flash("Task updated successfully!", "success")
        return redirect("/my_task")
    
    return render_template("edit_task.html", task=task)

@app.route("/delete_task/<int:task_id>")
def delete_task(task_id):
    """Delete a specific task"""
    if "user_id" not in session:
        return redirect("/login")
    
    # Delete the task (only if it belongs to the current user)
    result = db.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", 
                       task_id, session["user_id"])
    
    flash("Task deleted successfully!", "success")
    return redirect("/my_task")

@app.route("/add_task", methods=["GET", "POST"])
def add_task():
    """Add task route for compatibility"""
    return redirect("/my_task")



@app.route("/profile")
def profile(): 
    return render_template("profile.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 400)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/dashboard")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # Get form inputs
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Check for missing username
        if not username:
            return apology("must provide username", 400)

        # Check for missing password
        elif not password:
            return apology("must provide password", 400)

        # Check if passwords match
        elif password != confirmation:
            return apology("passwords must match", 400)
        hash = generate_password_hash(password)

        try:
            db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash)
        except ValueError:
            return apology("username already taken", 400)

        # Login the user with new id
        rows = db.execute("SELECT id FROM users WHERE username = ?", username)
        session["user_id"] = rows[0]["id"]

        return redirect("/dashboard")
    # else only display the register page
    else:
         return render_template("register.html")

@app.route('/generate-subtasks', methods=['POST'])
def generate_subtasks():
    global last_api_call
    
    try:
        data = request.get_json()
        task = data.get('task', '')
        
        if not task:
            return jsonify({"error": "Task is required"}), 400

        # Rate limiting
        current_time = time.time()
        time_since_last_call = current_time - last_api_call
        
        if time_since_last_call < api_call_delay:
            time.sleep(api_call_delay - time_since_last_call)
        
        prompt = f"Break this task into 3 to 5 smaller subtasks: '{task}'"
        response = model.generate_content(prompt)
        last_api_call = time.time()
        
        return jsonify({"subtasks": response.text})
    except Exception as e:
        error_msg = str(e)
        print(f"Error generating subtasks: {error_msg}")
        
        # Check if it's a rate limit error
        if "429" in error_msg or "quota" in error_msg.lower():
            return jsonify({"error": "API rate limit exceeded. Please wait a moment and try again."}), 429
        
        return jsonify({"error": "Failed to generate subtasks"}), 500

if __name__ == "__main__":
    app.run(debug=False, host='127.0.0.1', port=5000)
