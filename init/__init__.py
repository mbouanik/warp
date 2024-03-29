from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from os import getenv
# from flask_wtf.csrf import CSRFProtect

load_dotenv()

db = SQLAlchemy()
bcrypt = Bcrypt()
# csrf = CSRFProtect()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URI")
    app.config["SECRET_KEY"] = getenv("SECRET_KEY")
    # app.config["SQLALCHEMY_ECHO"] = True
    # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

    from routes import app_routes

    app.register_blueprint(app_routes)

    return app
