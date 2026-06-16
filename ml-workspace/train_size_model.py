import pandas as pd
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "dataset" / "rebellen_size_dataset_2400.csv"
MODEL_PATH = BASE_DIR / "models" / "size_model.pkl"

df = pd.read_csv(DATASET_PATH)

X = df[["height", "weight"]]
y = df["size"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    max_depth=8
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Model training completed!")
print(f"Accuracy: {accuracy * 100:.2f}%")
print()
print(classification_report(y_test, y_pred))

joblib.dump(model, MODEL_PATH)

print(f"Model saved to: {MODEL_PATH}")