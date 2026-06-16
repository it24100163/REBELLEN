from sqlalchemy import Column, Integer, String
from app.database import Base

class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    description = Column(String, nullable=False)

    price = Column(Integer, nullable=False)

    color = Column(String, nullable=False)

    image = Column(String, nullable=True)

    category = Column(String, nullable=False, default="street-legends")

    stock_m = Column(Integer, nullable=False, default=0)

    stock_l = Column(Integer, nullable=False, default=0)

    stock_xl = Column(Integer, nullable=False, default=0)