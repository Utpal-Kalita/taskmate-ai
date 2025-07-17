"""
Database utilities for TaskMate AI
"""
import sqlite3
import os
from typing import List, Dict, Optional


def get_db_connection():
    """Get a connection to the SQLite database"""
    conn = sqlite3.connect('taskmate.db')
    conn.row_factory = sqlite3.Row  # This allows us to access columns by name
    return conn


def init_database():
    """Initialize the database with required tables"""
    conn = get_db_connection()
    
    # Create tasks table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP NULL
        )
    ''')
    
    # Create subtasks table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS subtasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP NULL,
            FOREIGN KEY (task_id) REFERENCES tasks (id)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Database initialized successfully!")


def add_task(title: str, description: str = "") -> int:
    """Add a new task to the database"""
    conn = get_db_connection()
    cursor = conn.execute(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        (title, description)
    )
    task_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return task_id


def get_all_tasks() -> List[Dict]:
    """Get all tasks from the database"""
    conn = get_db_connection()
    tasks = conn.execute(
        'SELECT * FROM tasks ORDER BY created_at DESC'
    ).fetchall()
    conn.close()
    return [dict(task) for task in tasks]


def add_subtask(task_id: int, title: str, description: str = "") -> int:
    """Add a subtask to a specific task"""
    conn = get_db_connection()
    cursor = conn.execute(
        'INSERT INTO subtasks (task_id, title, description) VALUES (?, ?, ?)',
        (task_id, title, description)
    )
    subtask_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return subtask_id


def get_subtasks(task_id: int) -> List[Dict]:
    """Get all subtasks for a specific task"""
    conn = get_db_connection()
    subtasks = conn.execute(
        'SELECT * FROM subtasks WHERE task_id = ? ORDER BY created_at',
        (task_id,)
    ).fetchall()
    conn.close()
    return [dict(subtask) for subtask in subtasks]


def update_task_status(task_id: int, status: str):
    """Update the status of a task"""
    conn = get_db_connection()
    if status == 'completed':
        conn.execute(
            'UPDATE tasks SET status = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
            (status, task_id)
        )
    else:
        conn.execute(
            'UPDATE tasks SET status = ?, completed_at = NULL WHERE id = ?',
            (status, task_id)
        )
    conn.commit()
    conn.close()


def update_subtask_status(subtask_id: int, status: str):
    """Update the status of a subtask"""
    conn = get_db_connection()
    if status == 'completed':
        conn.execute(
            'UPDATE subtasks SET status = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
            (status, subtask_id)
        )
    else:
        conn.execute(
            'UPDATE subtasks SET status = ?, completed_at = NULL WHERE id = ?',
            (status, subtask_id)
        )
    conn.commit()
    conn.close()


if __name__ == "__main__":
    # Initialize database when run directly
    init_database()
