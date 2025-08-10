import sqlite3
from database import DB_NAME  # Importar la ruta absoluta de la base

print("Revisando base de datos en:", DB_NAME)

conn = sqlite3.connect(DB_NAME)  # Usar la misma ruta absoluta
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*) FROM contacts")
total = cursor.fetchone()[0]
print(f"Total contactos guardados: {total}")

cursor.execute("SELECT * FROM contacts ORDER BY id DESC LIMIT 5")
recent = cursor.fetchall()
print("Últimos contactos guardados:")
for c in recent:
    print(f"ID:{c[0]}, Name:{c[1]}, Email:{c[2]}, Message:{c[3]}, Created_at:{c[4]}")

conn.close()
