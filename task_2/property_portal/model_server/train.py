# ============================================================
# train_model.py
# ============================================================
import pandas as pd
import numpy as np
import pickle
import pathlib
import json
import os

from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
from sklearn.model_selection import cross_validate

###############################################################
#filese to store result
##############################################################
#data_root = pathlib.Path(r'D:\develop\eclipse-workspace\fastapi')
data_root = pathlib.Path(os.getcwd())
model_file = data_root/"model.pkl"
performance_file = data_root/"performance.json"
model_parameter_file = data_root/"model_parameters.json"
# ============================================================
# 1. LOAD DATA
# ============================================================
train_df = pd.read_csv(data_root/"train_data.csv")
# ============================================================
# 2. DEFINE FEATURES AND TARGET
# ============================================================
features = train_df.columns[1:-1]
target = "price"
X_train = train_df[features]
y_train = train_df[target]
# ============================================================
# 3. DEFINE NUMERIC AND CATEGORICAL FEATURES
# ============================================================
numeric_features = ["square_footage","bathrooms","year_built",'lot_size','distance_to_city_center','school_rating']
categorical_features = ["bedrooms"]
#categorical_features = []
# ============================================================
# 4. CREATE PREPROCESSING PIPELINE
# ============================================================
preprocessor = ColumnTransformer(transformers=[("numeric",StandardScaler(),numeric_features),
                                               ("categorical",OneHotEncoder(drop="first",handle_unknown="ignore"),categorical_features)
                                               ]
                                )
# ============================================================
# 5. CREATE LINEAR REGRESSION MODEL
# ============================================================
model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "regression",
            LinearRegression()
        )
    ]
)

# ============================================================
# 6. TRAIN MODEL
# ============================================================
model.fit(X_train,y_train)
with open(data_root/model_file,"wb")as file:
    pickle.dump( model,file)

# ============================================================
# 7. DISPLAY REGRESSION PARAMETERS
# ============================================================
feature_vars = model.named_steps["preprocessor"].get_feature_names_out()
feature_vars =[var_name.split('__')[1] for var_name in feature_vars ]
regression = model.named_steps["regression"]
coefficients = regression.coef_
parameters_out = {ft:float(coef) for ft,coef in zip(feature_vars,coefficients)}
parameters_out['intercept']=float(regression.intercept_)

# ============================================================
# 7. CALCULATE PERFORMANCE METRICS WITH CROSS VALIDATION
# ============================================================
def calculate_metrics(estimator,X,y):
    yhat = estimator.predict(X)
    mae = mean_absolute_error(y, yhat)
    mse = mean_squared_error(y,yhat)
    rmse = np.sqrt(mse)
    r2 = r2_score(y,yhat)
    return {'MAE':mae, 'RMSE':rmse, 'R2':r2}


perm_measures= cross_validate(model,X_train, y_train,cv=10,scoring=calculate_metrics)
perm_measures = pd.DataFrame(perm_measures).mean().to_dict()
del perm_measures['fit_time']
del perm_measures['score_time']
perm_measures = {key.split('_')[1]:value for key, value in perm_measures.items()}

with open(model_parameter_file,'w') as file:
    json.dump(parameters_out,file)

with open(performance_file,'w') as file:
    json.dump(perm_measures,file)


