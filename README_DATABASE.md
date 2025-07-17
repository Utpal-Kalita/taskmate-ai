# Quick commands for viewing TaskMate database

# To see full descriptions (best for reading):
sqlite3 taskmate.db ".mode line" "SELECT * FROM tasks;"

# To see table format (good for overview):
sqlite3 taskmate.db ".mode table" "SELECT id, title, status, date(created_at) as created FROM tasks;"

# To see specific task details:
sqlite3 taskmate.db ".mode line" "SELECT * FROM tasks WHERE id = 1;"

# To see only your tasks (replace 1 with your user_id):
sqlite3 taskmate.db ".mode line" "SELECT * FROM tasks WHERE user_id = 1;"
