
# Load the library with the iris dataset
from sklearn.datasets import load_iris

# Load scikit's random forest classifier library
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load pandas
import pandas as pd

# Load numpy
import numpy as np


path_data_folder = '/Users/lara/thesis_data/work_PEAT_data/06_td_for_gridsearch/'

# samples
samples = 'td_peat_2017_dnn80_acc10_1400_noncropped_1400.csv'
#samples = 'td_peat_TOPCROPS_dnn80_acc10__2800_noncropped_2800.csv'
#samples = 'td_peat_3200_dnn80_acc10_noncropped_3200.csv'

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


# Create two new dataframes, one with the training rows, one with the test rows
#train, test = df[df['is_train']==True], df[df['is_train']==False]

# Create a list of the feature column's names
features = x_df.columns[:]
print(features)

# View features


clf = RandomForestClassifier(n_jobs=2, random_state=0)

clf.fit(Xtrain[features], ytrain)

clf.predict(Xtest[features])

# View a list of the features and their importance scores
print(list(zip(Xtrain[features], clf.feature_importances_)))



#samples = 'td_peat_TOPCROPS_dnn80_acc10__2800_noncropped_2800.csv'
#[('blue_med', 0.014435110162321282),
# ('green_med', 0.032183679433053426),
# ('red_med', 0.02824853040548037),
# ('nir_med', 0.06358884085537844),   !!!!!!!!!
# ('swir1_med', 0.03921507524346504),
# ('swir2_med', 0.05233350595406689),
# ('blue_std', 0.014705690548187031),
# ('green_std', 0.013414185881673469),
# ('red_std', 0.015305407422510162),
# ('nir_std', 0.05730660284972444),  !!!!!!!!!!!!!!!
# ('swir1_std', 0.01948353972503839),
# ('swir2_std', 0.01910608479837203),
# ('blue_p90', 0.016041160086041017),
# ('green_p90', 0.02025678332141352),
# ('red_p90', 0.018056137122674353),
# ('nir_p90', 0.11581383505457017),
# ('swir1_p90', 0.03642385857736688),
# ('swir2_p90', 0.024401465649325164),
# ('blue_p10', 0.021483265408310744),
# ('green_p10', 0.02745381214444685),
# ('red_p10', 0.022491001822755433),
# ('nir_p10', 0.026806906360208167),
# ('swir1_p10', 0.021738470215060555),
# ('swir2_p10', 0.02705069768225747),
# ('blue_mean', 0.01979294225142185),
# ('green_mean', 0.04811682634209958),
# ('red_mean', 0.02810691549466101),
# ('nir_mean', 0.09550611101983451), !!!!!!!
# ('swir1_mean', 0.0255830717625821),
# ('swir2_mean', 0.03555048640569968)]
