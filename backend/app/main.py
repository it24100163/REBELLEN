from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routes.product_routes import router as product_router
from app.routes.user_routes import router as user_router
from app.models.user import User
from app.models.order import Order
from app.routes.order_routes import router as order_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(
    product_router,
    prefix="/products",
    tags=["Products"]
)

app.include_router(
    user_router,
    prefix="/users",
    tags=["Users"]
)

app.include_router(
    order_router,
    prefix="/orders",
    tags=["Orders"]
)

@app.get("/")
def home():

    return {
        "message": "REBELLEN Backend Running"
    }