
#################### WHOLE INDIA, RABI 2017/2018, plantix and gatherix ############################



from pymongo import MongoClient
from pprint import pprint
from bson.son import SON
import datetime as dt
#import requests

PLANTIX_DB_HOST_URL = "<MONGO_DB_HOST_URL>"

PLANTIX_DB = "plantix"
PLANTIX_COL = "plantix_data"

client = MongoClient(PLANTIX_DB_HOST_URL)
plantix_collection = client[PLANTIX_DB][PLANTIX_COL]

# Building the query used for Aggregation
date1 = {
    "begin": dt.datetime(2017, 11, 1),
    "end": dt.datetime(2018, 4, 1)
}
country = 'IN'

query1 = {
    "ip_country": country,
    "timestamp": {
        "$gt": date1["begin"],
        "$lte": date1["end"]
    }
}

    # Testing the query
projection = {
    # standard
    "_id": 1,
    #"filename": 1,
   # "user_id": 1,
    "latitude": 1,
    "longitude": 1,
    "timestamp": 1,
    "feedforward_integer": 1,
    #"upload_timestamp": 1,
    "dnn_variety": 1,
    "app_name": 1,
   # "pla_id": 1,
   # "ip_district": 1,

    # "images_captured": 1,
    # "images_uploaded": 1,
    "accuracy": 1,
    "date": 1,

 # "response": 1,

  # "dnn_peat_id": 1,
   # "image_from_gallery": 1  # not available for 2017 !!
    #"provider:": 1

}  # all_fields_district_acc_date_prov_gall

plantix_data1 = plantix_collection.find(query1, projection)

import pandas as pd
import numpy as np

df = pd.DataFrame(plantix_data1).dropna()

df.to_csv("<PATH_TO_DATA_FOLDER>")