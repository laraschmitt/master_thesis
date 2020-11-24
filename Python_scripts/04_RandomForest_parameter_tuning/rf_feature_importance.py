
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

path_data_folder = '<PATH_TO_DATA_FOLDER>'

# samples
samples = '<NAME_CSV_FILE>'

#best hyperparameter combination {'min_samples_split': 2, 'n_estimators': 80}
samp_df = pd.read_csv(path_data_folder + samples)

y_df = samp_df['binary_id']

bands = ['blue_med', 'green_med', 'red_med', 'nir_med', 'swir1_med', 'swir2_med',
            'blue_std', 'green_std', 'red_std', 'nir_std', 'swir1_std', 'swir2_std',
            'blue_p90', 'green_p90', 'red_p90', 'nir_p90', 'swir1_p90', 'swir2_p90',
            'blue_p10', 'green_p10', 'red_p10', 'nir_p10', 'swir1_p10', 'swir2_p10',
            'blue_mean', 'green_mean', 'red_mean', 'nir_mean', 'swir1_mean', 'swir2_mean']

x_df = samp_df[bands]

Xtrain, Xtest, ytrain, ytest = train_test_split(x_df, y_df, test_size=0.3, random_state=42)

# Create a list of the feature column's names
features = x_df.columns[:]
print(features)

# create classifier
clf = RandomForestClassifier(n_jobs=2, random_state=0)
clf.fit(Xtrain[features], ytrain)
clf.predict(Xtest[features])

# View a list of the features and their importance scores
print(list(zip(Xtrain[features], clf.feature_importances_)))
