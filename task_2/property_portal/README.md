PROPERTY PORTAL
===============

This project contains two applications:

1. Property Value Estimator
2. Property Market Analysis

Architecture
------------

portal_frontend
    |
    +-- Property Value Estimator
    |
    +-- Property Market Analysis
              |
              v
    market_analysis_backend
              |
              +---- Redis
              |
              +---- Model Server (linear regression model)

Model Server API
----------------

GET /health

GET /parameters

POST /predict

GET /dataset


Prediction API
--------------

POST /predict accepts a JSON array directly.

Example:

[
  {
    "id": "house-001",
    "square_footage": 2200,
    "bedrooms": 3,
    "bathrooms": 2,
    "year_built": 2005,
    "lot_size": 6500,
    "distance_to_city_center": 8.5,
    "school_rating": 8
  }
]


The response is also a JSON array.

Example:

[
  {
    "id": "house-001",
    "square_footage": 2200,
    "bedrooms": 3,
    "bathrooms": 2,
    "year_built": 2005,
    "lot_size": 6500,
    "distance_to_city_center": 8.5,
    "school_rating": 8,
    "price": 575000
  }
]


Parameters API
--------------

GET /parameters

Example:

{
  "intercept": 125000,
  "square_footage": 210.4,
  "bedrooms_3": 45000,
  "bedrooms_4": 78000,
  "bathrooms": 18000,
  "year_built": 42000,
  "lot_size": 15000,
  "distance_to_city_center": -21000,
  "school_rating": 35000
}


Important:
- bedrooms=2 is the reference category.
- bedrooms_3 represents the coefficient for bedrooms=3.
- bedrooms_4 represents the coefficient for bedrooms=4.
- All non-categorical independent variables are standardized by the model server.


History
-------

Property Value Estimator stores previous predictions in:

history/estimates.csv

No database is used.


Redis
-----

Redis is used only for caching market-analysis data and statistics.

The system does not use Redis as the primary data store.


Running
-------
1. Start the system:

   docker compose up --build

2. Open:

   http://localhost:3000


Frontend:
   http://localhost:3000

Market backend:
   http://localhost:8080

Model server:
   http://localhost:8000

Redis:
   localhost:6379