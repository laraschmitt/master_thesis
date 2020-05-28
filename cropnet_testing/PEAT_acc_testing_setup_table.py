#### setting up PEAT testdata table

import pandas as pd
import numpy as np

pred = pd.read_csv('/Users/lara/thesis_data/PEAT_data/lara_predictions_dec.csv')

#print(len(pred))  # 639172
#print(pred.head())

# subset of relevant columns
df = pred[['dnn_variety_0', 'dnn_variety_similarity_0', 'filename']]

# remove stuff in string before actual filename and remove filename
df['filename_clean'] = df['filename'].str[44:]
df.drop(columns=['filename'])

# reoder
df = df[['filename_clean', 'dnn_variety_0', 'dnn_variety_similarity_0']]


#for col in df.columns:
#   print(col)

# create a column with the range values
df.loc[(df['dnn_variety_similarity_0'] < 0.4) , 'acc_range'] = 0
df.loc[(df['dnn_variety_similarity_0'] >= 0.4) & (df['dnn_variety_similarity_0'] < 0.5), 'acc_range'] = 40
df.loc[(df['dnn_variety_similarity_0'] >= 0.5) & (df['dnn_variety_similarity_0'] < 0.6), 'acc_range'] = 50
df.loc[(df['dnn_variety_similarity_0'] >= 0.5) & (df['dnn_variety_similarity_0'] < 0.6), 'acc_range'] = 50
df.loc[(df['dnn_variety_similarity_0'] >= 0.6) & (df['dnn_variety_similarity_0'] < 0.7), 'acc_range'] = 60
df.loc[(df['dnn_variety_similarity_0'] >= 0.7) & (df['dnn_variety_similarity_0'] < 0.8), 'acc_range'] = 70
df.loc[(df['dnn_variety_similarity_0'] >= 0.8) & (df['dnn_variety_similarity_0'] < 0.9), 'acc_range'] = 80
df.loc[(df['dnn_variety_similarity_0'] >= 0.9) & (df['dnn_variety_similarity_0'] < 1.0), 'acc_range'] = 90

# drop all rows that have accuracy value below 50
df.drop(df.loc[df['acc_range'] <50].index, inplace=True)

# groupby
groups = df.groupby(['dnn_variety_0', 'acc_range'])
# concat groups and select 20 per crop per acc_range
df2 = pd.concat([ groups.head(40) ]).sort_values(['dnn_variety_0', 'acc_range'], ascending=[True, False]).reset_index(drop=True)
print(len(df2))
df2.to_csv("/Users/lara/thesis_data/PEAT_data/acc_testing_all.csv", header=True,  index=False, encoding='utf-8')


############### filter for AP important crops ##################

#count = df['dnn_variety_0'].value_counts()
#print(count)
# excluded trees: MANGO, CITRUS, BANANA, PAPAYA, ROSE, POMEGRANATE, GUAVA, ORNAMENTAL, COCONUT, APPLE, NOPLANT, ALOE, PUMPKIN, CASHEW, GRAPE, MELON, OKRA
# TURMERIC, CABBAGE

top_crops_AP = ['RICE', 'PEPPER', 'COTTON', 'TOMATO', 'PEANUT', 'EGGPLANT', 'MAIZE', 'CUCUMBER', 'GRAM', 'BEAN', 'MELON', 'ONION', 'PIGEONPEA',
            'CHICKPEA', 'SUGARCANE', 'POTATO', 'WHEAT', 'SOYBEAN', 'MILLET', 'LENTIL', 'SORGHUM']

df_filtered= df2[df2.dnn_variety_0.isin(top_crops_AP)]
print(len(df_filtered))
df_filtered.to_csv("/Users/lara/thesis_data/PEAT_data/acc_testing_major_crops_AP.csv", header=True,  index=False, encoding='utf-8')