from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db
from models import save_contact
from mailer import send_email
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde React

# Inicializar base de datos
init_db()

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "API Reflexo Agency online "})

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "GET":
        return "<h1>Ruta /contact activa</h1>"

    if request.method == "POST":
        try:
            data = request.json
            name = data.get("name")
            email = data.get("email")
            message = data.get("message")

            if not name or not email or not message:
                return jsonify({"success": False, "error": "Todos los campos son obligatorios"}), 400

            # Guardar en BD
            save_contact(name, email, message)

            # Enviar email
            subject = f"Nuevo mensaje de {name}"
            body = f"Nombre: {name}\nCorreo: {email}\nMensaje:\n{message}"
            send_email(subject=subject, body=body, to=os.getenv("SMTP_TO"))

            return jsonify({"success": True})

        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=5000, debug=True)
