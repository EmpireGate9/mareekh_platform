from fastapi import FastAPI, Request
from pydantic import BaseModel
import os

app = FastAPI(title="Mareekh Backend Stub", version="0.1.0")

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.get("/version")
def version():
    return {
        "app": os.getenv("APP_NAME", "mareekh-backend-stub"),
        "env": os.getenv("APP_ENV", "dev"),
        "version": "0.1.0"
    }

class Echo(BaseModel):
    message: str

@app.post("/echo")
def echo(payload: Echo):
    return {"you_said": payload.message}
