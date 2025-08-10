import smtplib
import os
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr

def send_email(subject, body, to):
    try:
        smtp_user = os.getenv("SMTP_USER")
        smtp_pass = os.getenv("SMTP_PASS")
        smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", 587))

        # Crear mensaje con codificación UTF-8
        msg = MIMEText(body, _charset="utf-8")
        msg['From'] = formataddr(("Constructora SAC", smtp_user))
        msg['To'] = to
        msg['Subject'] = Header(subject, "utf-8")

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to, msg.as_string())

        print("Correo enviado con éxito")

    except Exception as e:
        print("Error enviando correo:", e)
        raise
