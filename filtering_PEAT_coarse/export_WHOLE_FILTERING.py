################## WORK FILE __________________FILTER DATA ###########################
import pandas as pd
path = '/Users/lara/thesis_data/PEAT_data/'

work2017 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2017_AP_jan_march_district_acc_date_userid.csv')
work2018 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2018_AP_jan_march_district_acc_date_userid.csv')
work2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2019_AP_jan_march_district_acc_date_userid.csv')

## copy
df_2017 = work2017.copy()
df_2018 = work2018.copy()
df_2019 = work2019.copy()

# raw count for timeframe
print('df_2017_len',len(df_2017))  # 47154
print('df_2018_len',len(df_2018))  # 182120
print('df_2019_len',len(df_2019))  # 99480

# remove double submissions // gatherix
df_2017_ul= df_2017.drop_duplicates(['pla_id'])
df_2018_ul= df_2018.drop_duplicates(['pla_id'])
df_2019_ul= df_2019.drop_duplicates(['pla_id'])

print('df_2017_plantix_unique_loc',len(df_2017_ul))  # 10429
print('df_2018_plantix_unique_loc',len(df_2018_ul))  # 121925
print('df_2019_plantix_unique_loc',len(df_2019_ul))  # 76761

# remove non-plant images
df_2017_ul_ff= df_2017_ul[df_2017_ul['feedforward_integer'].isin([5, 4, 3])]
df_2018_ul_ff= df_2018_ul[df_2018_ul['feedforward_integer'].isin([5, 4, 3])]
df_2019_ul_ff= df_2019_ul[df_2019_ul['feedforward_integer'].isin([5, 4, 3])]

print('df_2017_ul_ff ',len(df_2017_ul_ff)) # 7371
print('df_2018_ul_ff ',len(df_2018_ul_ff)) # 79537
print('df_2019_ul_ff ',len(df_2019_ul_ff)) # 60161

# check amount of gatherix images
# 2017
df_2017_ul_ff_plantix = df_2017_ul_ff[df_2017_ul_ff['app_name'].isin(['Plantix', 'Plantix Preview'])]
print('df_2017_ul_ff_plantix',len(df_2017_ul_ff_plantix))  # 6868

df_2017_ul_ff_gatherix = df_2017_ul_ff[df_2017_ul_ff['app_name'].isin(['Gatherix'])]
print('df_2017_ul_ff_gatherix',len(df_2017_ul_ff_gatherix))  # 503

# 2018
df_2018_ul_ff_plantix = df_2018_ul_ff[df_2018_ul_ff['app_name'].isin(['Plantix', 'Plantix Preview'])]
print('df_2018_ul_ff_plantix',len(df_2018_ul_ff_plantix))  # 71706

df_2018_ul_ff_gatherix = df_2018_ul_ff[df_2018_ul_ff['app_name'].isin(['Gatherix'])]
print('df_2018_ul_ff_gatherix',len(df_2018_ul_ff_gatherix))  # 7827

# 2019
df_2019_ul_ff_plantix = df_2019_ul_ff[df_2019_ul_ff['app_name'].isin(['Plantix', 'Plantix Preview'])]
print('df_2019_ul_ff_plantix',len(df_2019_ul_ff_plantix))  # 53544

df_2019_ul_ff_gatherix = df_2019_ul_ff[df_2019_ul_ff['app_name'].isin(['Gatherix'])]
print('df_2019_ul_ff_gatherix',len(df_2019_ul_ff_gatherix))  # 6507

## check accuracy amounts without filtering out urban areas:

# 2017
df_2017_plantix_acc_high = df_2017_ul_ff_plantix[df_2017_ul_ff_plantix['accuracy'].between(1, 30)]
print('df_2017_plantix_acc_high', len(df_2017_plantix_acc_high)) # 5381

df_2017_acc_30_100 = df_2017_ul_ff_plantix[df_2017_ul_ff_plantix['accuracy'].between(30, 100)]
print('df_2017_acc_30_100', len(df_2017_acc_30_100)) # 310

df_2017_acc_high_100_10000 = df_2017_ul_ff_plantix[df_2017_ul_ff_plantix['accuracy'].between(100, 10000)]
print('df_2017_acc_high_100_10000', len(df_2017_acc_high_100_10000)) # 1144


# 2018
df_2018_plantix_acc_high = df_2018_ul_ff_plantix[df_2018_ul_ff_plantix['accuracy'].between(1, 30)]
print('df_2018_plantix_acc_high', len(df_2018_plantix_acc_high)) # 8799

df_2018_acc_30_100 = df_2018_ul_ff_plantix[df_2018_ul_ff_plantix['accuracy'].between(30, 100)]
print('df_2018_acc_30_100', len(df_2018_acc_30_100)) # 7608

df_2018_acc_high_100_10000 = df_2018_ul_ff_plantix[df_2018_ul_ff_plantix['accuracy'].between(100, 10000)]
print('df_2018_acc_high_100_10000', len(df_2018_acc_high_100_10000)) # 55341


# 2019
df_2019_plantix_acc_high = df_2019_ul_ff_plantix[df_2019_ul_ff_plantix['accuracy'].between(1, 30)]
print('df_2019_plantix_acc_high', len(df_2019_plantix_acc_high)) # 2927

df_2019_acc_30_100 = df_2019_ul_ff_plantix[df_2019_ul_ff_plantix['accuracy'].between(30, 100)]
print('df_2019_acc_30_100', len(df_2019_acc_30_100)) # 6246

df_2019_acc_high_100_10000 = df_2019_ul_ff_plantix[df_2019_ul_ff_plantix['accuracy'].between(100, 10000)]
print('df_2019_acc_high_100_10000', len(df_2019_acc_high_100_10000)) # 34255


# filter in high acc top crops

top_crops_AP = ['RICE', 'PEPPER', 'COTTON', 'TOMATO', 'PEANUT', 'EGGPLANT', 'MAIZE', 'CUCUMBER', 'GRAM', 'BEAN', 'MELON', 'ONION', 'PIGEONPEA',
            'CHICKPEA', 'SUGARCANE', 'POTATO', 'WHEAT', 'SOYBEAN', 'MILLET', 'LENTIL', 'SORGHUM']

df_2017_plantix_acc_high_top_crops_AP= df_2017_plantix_acc_high[df_2017_plantix_acc_high.dnn_variety.isin(top_crops_AP)]
print('df_2017_plantix_acc_high_top_crops_AP', len(df_2017_plantix_acc_high_top_crops_AP)) # 4862

df_2018_plantix_acc_high_top_crops_AP= df_2018_plantix_acc_high[df_2018_plantix_acc_high.dnn_variety.isin(top_crops_AP)]
print('df_2018_plantix_acc_high_top_crops_AP', len(df_2018_plantix_acc_high_top_crops_AP)) # 5132

df_2019_plantix_acc_high_top_crops_AP= df_2019_plantix_acc_high[df_2019_plantix_acc_high.dnn_variety.isin(top_crops_AP)]
print('df_2019_plantix_acc_high_top_crops_AP', len(df_2019_plantix_acc_high_top_crops_AP)) # 2024


# join dnn cropnet results for plantix images
cropnet = pd.read_csv('/Users/lara/thesis_data/worK_PEAT_data/lara_predictions_dec.csv')
# remove stuff in string before actual filename and remove filename
cropnet['filename'] = cropnet['filename'].str[44:]

df_2017_plantix_acc_high_top_crops_AP_DNN_join = pd.merge(df_2017_plantix_acc_high_top_crops_AP, cropnet[['_id', 'dnn_variety_0','dnn_variety_similarity_0']], left_on=['_id'],
             right_on= ['_id'], how='left')

df_2018_plantix_acc_high_top_crops_AP_DNN_join = pd.merge(df_2018_plantix_acc_high_top_crops_AP, cropnet[['_id', 'dnn_variety_0','dnn_variety_similarity_0']], left_on=['_id'],
             right_on= ['_id'], how='left')

df_2019_plantix_acc_high_top_crops_AP_DNN_join = pd.merge(df_2019_plantix_acc_high_top_crops_AP, cropnet[['_id', 'dnn_variety_0','dnn_variety_similarity_0']], left_on=['_id'],
             right_on= ['_id'], how='left')

## filter for crop DNN acc over 50:
#data.loc[data['id'] > 2000, "first_name"] = "John"

df_2017_plantix_acc_high_top_crops_AP_DNN_gt50 = df_2017_plantix_acc_high_top_crops_AP_DNN_join[df_2017_plantix_acc_high_top_crops_AP_DNN_join['dnn_variety_similarity_0'] > 0.5]
print('df_2017_plantix_acc_high_top_crops_AP_DNN_gt50', len(df_2017_plantix_acc_high_top_crops_AP_DNN_gt50)) # 4546

df_2018_plantix_acc_high_top_crops_AP_DNN_gt50 = df_2018_plantix_acc_high_top_crops_AP_DNN_join[df_2018_plantix_acc_high_top_crops_AP_DNN_join['dnn_variety_similarity_0'] > 0.5]
print('df_2018_plantix_acc_high_top_crops_AP_DNN_gt50', len(df_2018_plantix_acc_high_top_crops_AP_DNN_gt50)) # 4069

df_2019_plantix_acc_high_top_crops_AP_DNN_gt50 = df_2019_plantix_acc_high_top_crops_AP_DNN_join[df_2019_plantix_acc_high_top_crops_AP_DNN_join['dnn_variety_similarity_0'] > 0.5]
print('df_2019_plantix_acc_high_top_crops_AP_DNN_gt50', len(df_2019_plantix_acc_high_top_crops_AP_DNN_gt50)) # 1717


# export

df_2017_plantix_acc_high_top_crops_AP_DNN_gt50.to_csv("/Users/lara/thesis_data/work_PEAT_data/import_EE_2017.csv", header=True,  index=False, encoding='utf-8')
df_2018_plantix_acc_high_top_crops_AP_DNN_gt50.to_csv("/Users/lara/thesis_data/work_PEAT_data/import_EE_2018.csv", header=True,  index=False, encoding='utf-8')
df_2019_plantix_acc_high_top_crops_AP_DNN_gt50.to_csv("/Users/lara/thesis_data/work_PEAT_data/import_EE_2019.csv", header=True,  index=False, encoding='utf-8')