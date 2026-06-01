from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)
    total = Column(Integer, nullable=False)
    status = Column(String, default="Pending")
    items = Column(Text, nullable=True)
    social_link = Column(String, nullable=True)
    payment_method = Column(String, nullable=True)