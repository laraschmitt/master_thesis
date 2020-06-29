# BARPLOT PREPARATION: GET COUNTS

import pandas as pd
import matplotlib.pyplot as plt

path = '<PATH_TO_DATA_FOLDER>'

# import datasets and merge
coarse_filtered_2017 = pd.read_csv(path + '2017_clean_complete_EE_ready.csv')
coarse_filtered_2018 = pd.read_csv(path + '2018_clean_complete_EE_ready.csv')
coarse_filtered_2019 = pd.read_csv(path + '2019_clean_complete_EE_ready.csv')

# merge coarse_filtered datsets
frames1 = [coarse_filtered_2017, coarse_filtered_2018, coarse_filtered_2019]
result1 = pd.concat(frames1, ignore_index=True)
print('total length before  filter', len(result1)) 

# extract id column and accuracy
df_1 = result1.copy()[['_id', 'accuracy', 'app_name']]
print('length before subset', len(df_1))  
# import after filtered for urban areas and roads
no_urban_2017 = pd.read_csv(path +  'CSV_peat_2017_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2018 = pd.read_csv(path + 'CSV_peat_2018_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2019 = pd.read_csv(path + 'CSV_peat_2019_aoi_time_uloc_ff_nourban_noroads.csv')
frames2 = [no_urban_2017, no_urban_2018, no_urban_2019]
result2 = pd.concat(frames2, ignore_index=True)

print('total length  after filter', len(result2)) 


df_2 = result2.copy()[['_id', 'accuracy', 'app_name']]
print('length non urban subset', len(df_2))  

# subtract urban filtered from before filtered dataset to get urban points dataset
#urban_df = subset_result1[~subset_result1.isin(subset_result2)].dropna()
df_1['all'] = 1
df_2['non_urban'] = 1
merged = pd.merge(df_1, df_2, on=['_id', '_id'], how = 'left')
compared = merged[~(merged.all == merged.non_urban)]

# replace NAN values in non_urban columns with 0 (== urban)
compared = compared.fillna({'non_urban':2})
compared = compared.reset_index()

# rename accuracy_x column back to accuracy
compared.rename(columns={'accuracy_x':'accuracy'}, inplace=True)
compared.rename(columns={'app_name_x':'app_name'}, inplace=True)


df = compared

# print shares 
print('df_0 len', len(df[(df.accuracy == 0)])) 
print('df_10 len', len(df[(df['accuracy'] >= 0.01) & (df['accuracy'] <= 10)])) 
print('df_30 len', len(df[(df['accuracy'] > 10) & (df['accuracy'] <= 30)])) 
print('df_100 len', len(df[(df['accuracy'] > 30) & (df['accuracy'] <= 100)]))
print('df_1000 len', len(df[(df['accuracy'] > 100) & (df['accuracy'] <= 1000)])) 
print('df_gt1000 len', len(df[(df['accuracy'] > 1000)])) 



df_urban_0 = df[(df.non_urban == 2) & (df.accuracy == 0)]
print('df_urban_0 len', len(df_urban_0))   

df_rural_0 = df[(df.non_urban == 1) & (df.accuracy == 0)]
print('df_rural_0 0 len', len(df_rural_0))   

df_urban_10 = df[(df.non_urban == 2) & (df['accuracy'] >= 0.01) & (df['accuracy'] <= 10)]
print('df_urban_10 len', len(df_urban_10))  

df_rural_10 = df[(df.non_urban == 1) & (df['accuracy'] >= 0.01) & (df['accuracy'] <= 10)]
print('df_rural_10 0 len', len(df_rural_10))   
df_urban_30 = df[(df.non_urban == 2) & (df['accuracy'] > 10) & (df['accuracy'] <= 30)]
print('df_urban_30 len', len(df_urban_30))  

df_rural_30 = df[(df.non_urban == 1) & (df['accuracy'] > 10) & (df['accuracy'] <= 30)]
print('df_rural_30 len', len(df_rural_30))  

df_urban_100 = df[(df.non_urban == 2) & (df['accuracy'] > 30) & (df['accuracy'] <= 100)]
print('df_urban_100 len', len(df_urban_30))  

df_rural_100 = df[(df.non_urban == 1) & (df['accuracy'] > 30) & (df['accuracy'] <= 100)]
print('df_rural_100 len', len(df_rural_100))  

df_urban_1000 = df[(df.non_urban == 2) & (df['accuracy'] > 100) & (df['accuracy'] <= 1000)]
print('df_urban_1000 len', len(df_urban_1000))   

df_rural_1000 = df[(df.non_urban == 1) & (df['accuracy'] > 100) & (df['accuracy'] <= 1000)]
print('df_rural_1000 len', len(df_rural_1000))   

df_urban_20000 = df[(df.non_urban == 2) & (df['accuracy'] > 1000)]
print('df_urban_20000 len', len(df_urban_20000))  

df_rural_20000 = df[(df.non_urban == 1) & (df['accuracy'] > 1000)]
print('df_rural_20000 len', len(df_rural_20000))  

