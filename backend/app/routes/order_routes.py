from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.order import Order

router = APIRouter()

class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    address: str
    total: int
    items: str
    social_link: str | None = None
    payment_method: str
    customer_email: str | None = None

@router.put("/{order_id}")
def update_order_status(order_id: int):

    db: Session = SessionLocal()

    order = db.query(Order).filter(Order.id == order_id).first()

    if order is None:

        db.close()

        return {
            "message": "Order not found"
        }

    if order.status == "Pending":

        order.status = "Processing"

    elif order.status == "Processing":

        order.status = "Delivered"

    db.commit()

    db.refresh(order)

    db.close()

    return {
        "message": "Order updated successfully"
    }    

@router.post("/")
def create_order(order: OrderCreate):
    db: Session = SessionLocal()

    new_order = Order(
        customer_name=order.customer_name,
        phone=order.phone,
        address=order.address,
        total=order.total,
        status="Pending",
        items=order.items,
        social_link=order.social_link,
        payment_method=order.payment_method,
        customer_email=order.customer_email,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    db.close()

    return {"message": "Order placed successfully", "order_id": new_order.id}

@router.get("/")
def get_orders():
    db: Session = SessionLocal()
    orders = db.query(Order).filter(Order.admin_deleted == False).all()
    db.close()
    return orders

@router.get("/customer/{email}")
def get_customer_orders(email: str):
    db = SessionLocal()

    orders = db.query(Order).filter(
        Order.customer_email == email
    ).order_by(Order.created_at.desc()).all()

    db.close()
    return orders

@router.delete("/{order_id}")
def delete_order(order_id: int):
    db: Session = SessionLocal()

    order = db.query(Order).filter(Order.id == order_id).first()

    if order is None:
        db.close()
        return {"message": "Order removed from admin panel"}
    order.admin_deleted = True
    db.commit()
    db.commit()
    db.close()

    return {"message": "Order deleted successfully"}