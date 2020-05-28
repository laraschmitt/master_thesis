### plot OBB Error for 1400, 2800 and 3200 sample size


import matplotlib.pyplot as plt

from collections import OrderedDict
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier

import pandas as pd

RANDOM_STATE = 123

'''
# Generate a binary classification dataset.
X, y = make_classification(n_samples=500, n_features=25,
                           n_clusters_per_class=1, n_informative=15,
                           random_state=RANDOM_STATE)
'''

####
path_data_folder = '/Users/lara/thesis_data/work_PEAT_data/06_td_for_gridsearch/'

# samples
#samples = 'td_peat_2017_dnn80_acc10_1200_noncropped_1200.csv'
#samples = 'td_peat_TOPCROPS_dnn80_acc10__2800_noncropped_2800.csv'
#samples = 'td_peat_3200_dnn80_acc10_noncropped_3200.csv'
samples = 'td_rice_nonrice_1600.csv'

#best hyperparameter combination {'min_samples_split': 2, 'n_estimators': 80}
samp_df = pd.read_csv(path_data_folder + samples)
print('dataframe sample size', len(samp_df))
#y = samp_df['binary_id']
y = samp_df['bin_rice_crop']
#x_df = samp_df.iloc[:, 1:]

bands = ['blue_med', 'green_med', 'red_med', 'nir_med', 'swir1_med', 'swir2_med',
            'blue_std', 'green_std', 'red_std', 'nir_std', 'swir1_std', 'swir2_std',
            'blue_p90', 'green_p90', 'red_p90', 'nir_p90', 'swir1_p90', 'swir2_p90',
            'blue_p10', 'green_p10', 'red_p10', 'nir_p10', 'swir1_p10', 'swir2_p10',
            'blue_mean', 'green_mean', 'red_mean', 'nir_mean', 'swir1_mean', 'swir2_mean']

X = samp_df[bands]

# NOTE: Setting the `warm_start` construction parameter to `True` disables
# support for parallelized ensembles but is necessary for tracking the OOB
# error trajectory during training.
ensemble_clfs = [
    ("RandomForestClassifier, max features='sqrt'",
        RandomForestClassifier(warm_start=True, oob_score=True,
                               max_features="sqrt",
                               random_state=RANDOM_STATE)),
    ("RandomForestClassifier, max features='log2'",
        RandomForestClassifier(warm_start=True, max_features='log2',
                               oob_score=True,
                               random_state=RANDOM_STATE)),
    ("RandomForestClassifier, max features=None",
        RandomForestClassifier(warm_start=True, max_features=None,
                               oob_score=True,
                               random_state=RANDOM_STATE))
]

# Map a classifier name to a list of (<n_estimators>, <error rate>) pairs.
error_rate = OrderedDict((label, []) for label, _ in ensemble_clfs)

# Range of `n_estimators` values to explore.
min_estimators = 25
max_estimators = 500

for label, clf in ensemble_clfs:
    for i in range(min_estimators, max_estimators + 1):
        clf.set_params(n_estimators=i)
        clf.fit(X, y)

        # Record the OOB error for each `n_estimators=i` setting.
        oob_error = 1 - clf.oob_score_
        error_rate[label].append((i, oob_error))

# Generate the "OOB error rate" vs. "n_estimators" plot.
for label, clf_err in error_rate.items():
    xs, ys = zip(*clf_err)
    plt.plot(xs, ys, label=label, linewidth=0.5)

#plt.figure(figsize=(4, 3))
plt.xlim(min_estimators, max_estimators)

title_font = {'fontname': 'Arial', 'size': '11.5', 'color': 'black', 'weight':'normal',
  'verticalalignment': 'bottom'} # Bottom vertical alignment for more space
plt.title('Sample size: 1600, number of feautures: 30', title_font, 'left')

# Set the tick labels font
ax = plt.subplot() # Defines ax variable by creating an empty plot
for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(10)

axes= plt.axes()
plt.tick_params(width=0.5)
plt.setp(axes.spines.values(), linewidth=0.5)


axes.set_yticks([0.30, 0.31, 0.32,  0.33,  0.34,  0.35,  0.36,  0.37])
axes.set_yticklabels(['0.30',  '0.31',  '0.32',  '0.33',  '0.34','0.35',  '0.36', '0.37'])

axes.set_xticks([50, 100,  150, 200,  250, 300, 350, 400, 450, 500])
axes.set_xticklabels(['50', '100', '150',  '200',  '250',  '300', '350', '400',  '450', '500'])

# labels
axis_font = {'fontname':'Arial', 'size':'11'}
plt.xlabel("n trees", axis_font)
plt.ylabel("OOB error rate", axis_font)
plt.legend(loc="upper right", fontsize='medium', labelspacing=0.2, framealpha=0.5)


plt.savefig("/Users/lara/thesis_data/pyplots/OBB_error_samplesize_1600.png", format="png", dpi=300)
plt.show()