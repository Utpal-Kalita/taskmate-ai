import sqlite3

conn = sqlite3.connect('taskmate.db')
cursor = conn.cursor()

print("Tasks table structure:")
cursor.execute('PRAGMA table_info(tasks)')
for row in cursor.fetchall():
    print(row)

print("\nUsers table structure:")
cursor.execute('PRAGMA table_info(users)')
for row in cursor.fetchall():
    print(row)

print("\nAll tables:")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
for row in cursor.fetchall():
    print(row)

conn.close()
