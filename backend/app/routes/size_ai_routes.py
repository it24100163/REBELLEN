from fastapi import APIRouter
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/ai", tags=["AI"])

MODEL_PATH = Path(__file__).resolve().parent.parent / "ml" / "size_model.pkl"

model = joblib.load(MODEL_PATH)


class SizeRequest(BaseModel):
    height: float
    weight: float


SIZE_CHART = {
    "M": {
        "chest": "45.5",
        "shoulder": "24.5",
        "sleeve": "11 11/16",
        "length": "30.5"
    },
    "L": {
        "chest": "47.5",
        "shoulder": "25.5",
        "sleeve": "12 1/8",
        "length": "31.5"
    },
    "XL": {
        "chest": "49.5",
        "shoulder": "26.5",
        "sleeve": "12.5",
        "length": "32.5"
    }
}


@router.post("/predict-size")
def predict_size(data: SizeRequest):

    prediction = model.predict(
        [[data.height, data.weight]]
    )[0]

    return {
        "recommended_size": prediction,
        "measurements": SIZE_CHART[prediction]
    }