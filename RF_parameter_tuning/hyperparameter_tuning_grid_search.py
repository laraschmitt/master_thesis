## GRID SEARCH FOR MODEL OPTIMIZATION and OBB ERROR PLOT

import time
import os
import gdal
import math
import csv
from osgeo import ogr
from osgeo import osr
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix

from matplotlib import colors, patches
import matplotlib.pyplot as plt
from scipy import stats
import seaborn as sns

sns.set()

# ####################################### SET TIME-COUNT ############################################################# #
starttime = time.strftime("%a, %d %b %Y %H:%M:%S", time.localtime())
print("--------------------------------------------------------")
print("Starting process, time: " + starttime)
print("")

# ####################################### FOLDER PATHS & global variables ############################################ #
# Folder containing the working data
path_data_folder = '/Users/lara/thesis_data/work_PEAT_data/06_td_for_gridsearch/'

# samples
samples = 'td_peat_2017_dnn80_acc10_1400_noncropped_1400.csv'
#best hyperparameter combination {'max_features': 4, 'n_estimators': 25}

samples = 'td_peat_3200_dnn60_acc100_noncropped_3200.csv'
#best hyperparameter combination {'max_features': 2, 'n_estimators': 200}

samples = 'td_peat_3200_dnn80_acc10_noncropped_3200.csv'
# best hyperparameter combination {'max_features': 10, 'n_estimators': 200}

samples = 'td_peat_201819_dnn80_acc10_1400_noncropped_1400.csv'
#best hyperparameter combination {'max_features': 2, 'n_estimators': 90}


samples = 'td_peat_TOPCROPS_dnn80_acc10__2800_noncropped_2800.csv'
# best hyperparameter combination {'max_features': 2, 'n_estimators': 200}

### TRY N EE ALL WITH DEFAULT VARIABLES PER SPLIT (SQRT) == MAX_FEATURES


# samples
samp_df = pd.read_csv(path_data_folder + samples)
print(samp_df.columns.values)

# ####################################### PROCESSING ################################################################# #
# Step 1. separate dependent from independent --------------------------------------------------------------------------
print("Step 1: separating dependent from independent STARTED at:", time.strftime("%H:%M:%S", time.localtime()))
y_df = samp_df['binary_id']
#x_df = samp_df.iloc[:, 1:]

bands = ['blue_med', 'green_med', 'red_med', 'nir_med', 'swir1_med', 'swir2_med',
            'blue_std', 'green_std', 'red_std', 'nir_std', 'swir1_std', 'swir2_std',
            'blue_p90', 'green_p90', 'red_p90', 'nir_p90', 'swir1_p90', 'swir2_p90',
            'blue_p10', 'green_p10', 'red_p10', 'nir_p10', 'swir1_p10', 'swir2_p10',
            'blue_mean', 'green_mean', 'red_mean', 'nir_mean', 'swir1_mean', 'swir2_mean']


x_df = samp_df[bands]


# Step 3. split data set into training and validation data -------------------------------------------------------------
print("Step 3: splitting data set into training and validation data STARTED at:", time.strftime("%H:%M:%S", time.localtime()))
Xtrain, Xtest, ytrain, ytest = train_test_split(x_df, y_df, test_size=0.3, random_state=42)

print("Step 3: splitting data set into training and validation data DONE", time.strftime("%H:%M:%S", time.localtime()))
print()

# Step 4. hyper parameter selection (grid search) ----------------------------------------------------------------------

from sklearn.ensemble import RandomForestClassifier
forest = RandomForestClassifier(random_state=1, oob_score=True)
n_estimators = [20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 200]
max_features = [2, 3, 4, 5, 6, 7, 8, 9, 10]



hyperF = dict(n_estimators = n_estimators,
              max_features = max_features)

grid = GridSearchCV(forest, hyperF, cv = 3, verbose = 1,
                      n_jobs = -1)
best = grid.fit(Xtrain, ytrain)


# Step 5. select best model parameters and fit -------------------------------------------------------------------------
print("Step 5: selecting best model parameters and fit STARTED at:", time.strftime("%H:%M:%S", time.localtime()))
model = grid.best_estimator_
print('best hyperparameter combination', grid.best_params_)
## best hyperparameter combination {'min_samples_split': 2, 'n_estimators': 50}

print('Score: ', best.score(Xtrain, ytrain))
print('oob score', best.oob_score_)


yfit = model.predict(Xtest)

print("Step 5: selecting best model parameters and fit DONE", time.strftime("%H:%M:%S", time.localtime()))
print()

# Step 6. classification report ----------------------------------------------------------------------------------------
print("Step 6: classification report:", time.strftime("%H:%M:%S", time.localtime()))
print(classification_report(ytest, yfit,
                            #target_names=faces.target_names
                            ))

mat = confusion_matrix(ytest, yfit)
sns.heatmap(mat.T, square=True, annot=True, fmt='d', cbar=False)
# ,xticklabels=faces.target_names,
# yticklabels=faces.target_names

plt.xlabel('true label')
plt.ylabel('predicted label')
#plt.show()