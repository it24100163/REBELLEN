from app.database import SessionLocal, engine
from app.models.product import Product
from app.database import Base

Base.metadata.create_all(bind=engine)

db = SessionLocal()

product1 = Product(
    name="REBELLEN Oversized Tee",
    description="Premium oversized unisex t-shirt",
    price=4500,
    color="Black",
    image=""
)

product2 = Product(
    name="Minimal White Tee",
    description="Clean minimal fashion t-shirt",
    price=3900,
    color="White",
    image=""
)

db.add(product1)
db.add(product2)

db.commit()

print("Products added successfully")