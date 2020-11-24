from sklearn.ensemble import RandomForestClassifier
forest = RandomForestClassifier(n_estimators = 100, oob_score = True)
import pandas as pd
from sklearn.model_selection import train_test_split

# Folder containing the working data
path_data_folder = '<PATH_TO_DATA_FOLDER>'

# samples
samples = '<NAME_CSV_FILE>'
samp_df = pd.read_csv(path_data_folder + samples)

y_df = samp_df['binary_id']
#x_df = samp_df.iloc[:, 1:]

bands = ['blue_med', 'green_med', 'red_med', 'nir_med', 'swir1_med', 'swir2_med',
            'blue_std', 'green_std', 'red_std', 'nir_std', 'swir1_std', 'swir2_std',
            'blue_p90', 'green_p90', 'red_p90', 'nir_p90', 'swir1_p90', 'swir2_p90',
            'blue_p10', 'green_p10', 'red_p10', 'nir_p10', 'swir1_p10', 'swir2_p10',
            'blue_mean', 'green_mean', 'red_mean', 'nir_mean', 'swir1_mean', 'swir2_mean']

#  Out-of-Bag Error (Misclassification Rate)
# Out-of-Bag is equivalent to validation or test data.
# In random forests, there is no need for a separate test set to validate result.
# It is estimated internally, during the run, as follows:
# As the forest is built on training data , each tree is tested on the 1/3rd of the samples (36.8%)
# not used in building that tree (similar to validation data set).
# This is the out of bag error estimate - an internal error estimate of a random forest as it is being constructed.

x_df = samp_df[bands]
Xtrain, Xtest, ytrain, ytest = train_test_split(x_df, y_df, test_size=0.3, random_state=42)

forest = RandomForestClassifier(n_estimators= 100, random_state=1, oob_score=True)
forest.fit(Xtrain, ytrain)

print('Score: ', forest.score(Xtrain, ytrain)) 
print(forest.oob_score_)   
print('Score: ', forest.score(Xtest, ytest)) 