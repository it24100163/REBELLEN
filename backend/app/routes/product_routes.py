from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.product import Product

router = APIRouter()


class ProductCreate(BaseModel):
    name: str
    description: str
    price: int
    color: str
    image: str | None = None


@router.get("/")
def get_products():
    db: Session = SessionLocal()
    products = db.query(Product).all()
    db.close()
    return products

@router.get("/{product_id}")
def get_single_product(product_id: int):
    db: Session = SessionLocal()

    product = db.query(Product).filter(Product.id == product_id).first()

    db.close()

    return product


@router.post("/")
def add_product(product: ProductCreate):
    db: Session = SessionLocal()

    new_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        color=product.color,
        image=product.image
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    db.close()

    return {
        "message": "Product added successfully",
        "product": {
            "id": new_product.id,
            "name": new_product.name,
            "price": new_product.price,
            "color": new_product.color
        }
    }

@router.delete("/{product_id}")
def delete_product(product_id: int):
    db: Session = SessionLocal()

    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        db.close()
        return {"message": "Product not found"}

    db.delete(product)
    db.commit()
    db.close()

    return {"message": "Product deleted successfully"}

@router.put("/{product_id}")
def update_product(product_id: int, updated_product: ProductCreate):

    db: Session = SessionLocal()

    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:

        db.close()

        return {
            "message": "Product not found"
        }

    product.name = updated_product.name
    product.description = updated_product.description
    product.price = updated_product.price
    product.color = updated_product.color
    product.image = updated_product.image

    db.commit()

    db.refresh(product)

    db.close()

    return {
        "message": "Product updated successfully"
    }