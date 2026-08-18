# ============================================================
# app.py
# ============================================================

from fastapi import FastAPI
from pydantic import BaseModel,Field
from typing import List
import pathlib
import pandas as pd
import pickle
import json
import csv
import os

data_root = data_root = pathlib.Path(os.getcwd())
#print(list(data_root.iterdir()))
model_file = data_root/"model.pkl"
performance_file = data_root/"performance.json"
model_parameter_file = data_root/"model_parameters.json"
data_file = data_root/"train_data.csv"
# ============================================================
# 1. LOAD TRAINED MODEL
# ============================================================
model = None
param_dict= None
perm_dict = None
sig_dec = 3

def load_model():
    with open(model_file,"rb") as file:
        global model
        model = pickle.load(file)
    
    with open(model_parameter_file,'r') as file:
        global param_dict
        param_dict = json.load(file)
    
    with open(performance_file,'r') as file:
        global perm_dict
        perm_dict = json.load(file)
        
load_model()

# ============================================================
# 3. FASTAPI APPLICATION
# ============================================================

app = FastAPI( title="house price prediction",
               description=("API for house price using linear regression."),
               version="1.0.0"
               )

# ============================================================
# 4. INPUT DATA MODEL
# ============================================================

class HouseData(BaseModel):
    id:str 
    square_footage: int =Field(gt=0)
    bedrooms: int =Field(gt=0)
    bathrooms: float =Field(gt=0)
    year_built: int = Field(gt=999)
    lot_size: int =Field(gt=0)
    distance_to_city_center : float =Field(gt=0)
    school_rating: float = Field(gt=0,le=10)
    


# ============================================================
# 5. OUTPUT DATA MODELS
# ============================================================
class PredictionResult(BaseModel):
    id : str
    price: float
    square_footage: int =Field(gt=0)
    bedrooms: int =Field(gt=0)
    bathrooms: float =Field(gt=0)
    year_built: int = Field(gt=999)
    lot_size: int =Field(gt=0)
    distance_to_city_center : float =Field(gt=0)
    school_rating: float = Field(gt=0,le=10)


class BatchPredictionResponse(BaseModel):

    predictions: List[PredictionResult]

# ============================================================
# 6. HOME / HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "message": "house price prediction API",
        "status": "running"
    }


# ============================================================
# 7. BATCH PREDICTION API
# ============================================================
@app.post("/predict")
def predict(houses: List[HouseData]):
    # --------------------------------------------------------
    # Convert incoming JSON data to DataFrame
    # --------------------------------------------------------
    #print('#'*100)
    #for h in houses:
    #    print(h)
    input_data = pd.DataFrame(
        [
            {
                "square_footage":h.square_footage ,
                "bedrooms": h.bedrooms,
                "bathrooms": h.bathrooms,
                "year_built": h.year_built,
                "lot_size":h.lot_size,
                "distance_to_city_center":h.distance_to_city_center,
                "school_rating":h.school_rating
            }
            for h in houses
        ]
    )

    # --------------------------------------------------------
    # Make predictions
    # --------------------------------------------------------
    pred_prices = model.predict(input_data)
    # --------------------------------------------------------
    # Format predictions
    # --------------------------------------------------------
    results = []
    for i in range(len(pred_prices)):
        result_dict = {'price':pred_prices[i]}
        result_dict.update(houses[i])            
        result = PredictionResult(**result_dict)
        results.append(result)
    # --------------------------------------------------------
    # Return response
    # --------------------------------------------------------
    return results


# ============================================================
# 8. REGRESSION PARAMETERS API
# ============================================================
@app.get(
    "/parameters"
)
def regression_parameters():
    return {key:round(value,sig_dec) for key,value in param_dict.items()}
# ============================================================
# 9. MODEL PERFORMANCE API
# ============================================================
@app.get(
    "/model-performance"
)
def model_performance():
    return perm_dict

@app.get("/dataset")
def get_dataset():
    df = pd.read_csv(data_file)
    rows = []
    for _,row in df.iterrows():
        rows.append(row.to_dict())
    return rows