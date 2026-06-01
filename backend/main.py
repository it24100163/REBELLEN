from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "REBELLEN backend is running"}

@app.get("/products")
def get_products():
    return [
        {"id": 1, "name": "Rebellion Oversized Tee", "price": 4500, "color": "Black"},
        {"id": 2, "name": "Minimal Logo Tee", "price": 3900, "color": "White"},
    ]