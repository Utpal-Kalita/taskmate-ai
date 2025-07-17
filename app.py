from flask import Flask, render_template, request, session, redirect, url_for, flash
from dotenv import load_dotenv
import os
import google.generativeai as genai
from werkzeug.security import check_password_hash, generate_password_hash
from cs50 import SQL
from utils.ai import generate_subtasks
from utils.database import init_database, add_task, get_all_tasks, add_subtask, get_subtasks

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key-change-this')

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///taskmate.db")

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
    return render_template("dashboard.html")

@app.route("/add_task", methods=["GET", "POST"])
def add_task():
    # Check if user is logged in
    if "user_id" not in session:
        return redirect("/login")
        
    if request.method == "POST":
        # get form data correctly
        title = request.form.get("title")
        description = request.form.get("description")
        status = request.form.get("status") or "To Do"  # Default to "To Do" if not provided

        # validation
        if not title:
            return apology("must provide a task title", 400)
        if not description:
            return apology("must provide a task description", 400)

        # insert into DB with user_id and status
        db.execute("INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)", 
                  title, description, status, session["user_id"])

        # redirect after success
        return redirect("/dashboard")

    else:
        # Show all tasks table
        tasks = db.execute("SELECT * FROM tasks WHERE user_id = ?", session["user_id"])
        return render_template("add_task.html", all_tasks=tasks)
        



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

        return redirect("/")
    # else only display the register page
    else:
         return render_template("register.html")


if __name__ == "__main__":
    app.run(debug=True)
