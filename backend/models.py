import sqlite3
from database import DB_NAME

def save_contact(name, email, message):
    print(f"Guardando contacto: {name}") 
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
        (name, email, message)
    )
    conn.commit()
    conn.close()
    print("Contacto guardado")
