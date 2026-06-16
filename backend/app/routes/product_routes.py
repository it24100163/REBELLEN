from fastapi import APIRouter, HTTPException
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
    category: str
    stock_m: int = 0
    stock_l: int = 0
    stock_xl: int = 0


class StockReduceRequest(BaseModel):
    size: str
    quantity: int = 1


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
        image=product.image,
        category=product.category,
        stock_m=product.stock_m,
        stock_l=product.stock_l,
        stock_xl=product.stock_xl,
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    db.close()

    return {"message": "Product added successfully"}


@router.put("/{product_id}")
def update_product(product_id: int, updated_product: ProductCreate):
    db: Session = SessionLocal()
    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        db.close()
        return {"message": "Product not found"}

    product.name = updated_product.name
    product.description = updated_product.description
    product.price = updated_product.price
    product.color = updated_product.color
    product.image = updated_product.image
    product.category = updated_product.category
    product.stock_m = updated_product.stock_m
    product.stock_l = updated_product.stock_l
    product.stock_xl = updated_product.stock_xl

    db.commit()
    db.refresh(product)
    db.close()

    return {"message": "Product updated successfully"}


@router.put("/{product_id}/reduce-stock")
def reduce_stock(product_id: int, data: StockReduceRequest):
    db: Session = SessionLocal()
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        db.close()
        raise HTTPException(status_code=404, detail="Product not found")

    if data.size == "M":
        if product.stock_m < data.quantity:
            db.close()
            raise HTTPException(status_code=400, detail="Not enough M stock")
        product.stock_m -= data.quantity

    elif data.size == "L":
        if product.stock_l < data.quantity:
            db.close()
            raise HTTPException(status_code=400, detail="Not enough L stock")
        product.stock_l -= data.quantity

    elif data.size == "XL":
        if product.stock_xl < data.quantity:
            db.close()
            raise HTTPException(status_code=400, detail="Not enough XL stock")
        product.stock_xl -= data.quantity

    else:
        db.close()
        raise HTTPException(status_code=400, detail="Invalid size")

    db.commit()
    db.refresh(product)

    result = {
        "message": "Stock updated successfully",
        "stock_m": product.stock_m,
        "stock_l": product.stock_l,
        "stock_xl": product.stock_xl,
    }

    db.close()
    return result


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