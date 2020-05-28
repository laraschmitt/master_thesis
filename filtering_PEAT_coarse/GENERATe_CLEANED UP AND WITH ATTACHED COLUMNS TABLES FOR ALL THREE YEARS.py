# GENERATE CLEANED UP AND WITH ATTACHED COLUMNS TABLES FOR ALL THREE YEARS


### already done:
# spatial filter with correct shapefile in QGIS


import pandas as pd
path = '/Users/lara/thesis_data/PEAT_data/'

df_jan_march_2017 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/01_raw_data/2017_AP_jan_march_district_acc_date_userid.csv')
df_jan_march_2018 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/01_raw_data/2018_AP_jan_march_district_acc_date_userid.csv')
df_jan_march_2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/01_raw_data/2019_AP_jan_march_district_acc_date_userid.csv')

## copy
df_2017 = df_jan_march_2017.copy()
df_2018 = df_jan_march_2018.copy()
df_2019 = df_jan_march_2019.copy()

# create binary app_name column
print(df_2018.app_name.unique())
# ['Plantix' 'Plantix Preview' 'Gatherix' 'com.peat.GartenBank'
#  'Plantix Huawei' 'com.peat.GartenBank.preview']

df_2017.rename(columns={'app_name': 'app_name_detail'}, inplace=True)
df_2017.loc[(df_2017['app_name_detail'].isin(['Plantix', 'Plantix Preview', 'Gatherix', 'com.peat.GartenBank', 'Plantix Huawei','com.peat.GartenBank.preview'])), 'app_name'] = 'Plantix'
df_2017.loc[(df_2017['app_name_detail'].isin(['Gatherix'])), 'app_name'] = 'Gatherix'

df_2018.rename(columns={'app_name': 'app_name_detail'}, inplace=True)
df_2018.loc[(df_2018['app_name_detail'].isin(['Plantix', 'Plantix Preview', 'Gatherix', 'com.peat.GartenBank', 'Plantix Huawei','com.peat.GartenBank.preview'])), 'app_name'] = 'Plantix'
df_2018.loc[(df_2018['app_name_detail'].isin(['Gatherix'])), 'app_name'] = 'Gatherix'

df_2019.rename(columns={'app_name': 'app_name_detail'}, inplace=True)
df_2019.loc[(df_2019['app_name_detail'].isin(['Plantix', 'Plantix Preview', 'Gatherix', 'com.peat.GartenBank', 'Plantix Huawei','com.peat.GartenBank.preview'])), 'app_name'] = 'Plantix'
df_2019.loc[(df_2019['app_name_detail'].isin(['Gatherix'])), 'app_name'] = 'Gatherix'

# create YEAR column
df_2017['year'] = df_2017['date'].str[0:4].astype(int)
df_2018['year'] = df_2018['date'].str[0:4].astype(int)
df_2019['year'] = df_2019['date'].str[0:4].astype(int)

# create RICE / NOT RICE column
df_2017.loc[(df_2017['dnn_variety'] == 'RICE'), 'rice_crop'] = 'RICE'
df_2017.loc[(df_2017['dnn_variety'] != 'RICE'), 'rice_crop'] = 'OTHER'

df_2018.loc[(df_2018['dnn_variety'] == 'RICE'), 'rice_crop'] = 'RICE'
df_2018.loc[(df_2018['dnn_variety'] != 'RICE'), 'rice_crop'] = 'OTHER'

df_2019.loc[(df_2019['dnn_variety'] == 'RICE'), 'rice_crop'] = 'RICE'
df_2019.loc[(df_2019['dnn_variety'] != 'RICE'), 'rice_crop'] = 'OTHER'


# raw count for timeframe
print('df_2017_len',len(df_2017))  # 47154
print('df_2018_len',len(df_2018))  # 182120
print('df_2019_len',len(df_2019))  # 99480


# check amount of plantix vs. gatherix images
# 2017
df_2017_plantix = df_2017[df_2017['app_name'].isin(['Plantix'])]
print('df_2017_plantix', len(df_2017_plantix ))  #
df_2017_gatherix = df_2017[df_2017['app_name'].isin(['Gatherix'])]
print('df_2017_gatherix', len(df_2017_gatherix))  #

# 2018
df_2018_plantix = df_2018[df_2018['app_name'].isin(['Plantix'])]
print('df_2018_plantix', len(df_2018_plantix))  #
df_2018_gatherix = df_2018[df_2018['app_name'].isin(['Gatherix'])]
print('df_2018_gatherix', len(df_2018_gatherix))  #

# 2019
df_2019_plantix = df_2019[df_2019['app_name'].isin(['Plantix'])]
print('df_2019_plantix', len(df_2019_plantix))  #
df_2019_gatherix = df_2019[df_2019['app_name'].isin(['Gatherix'])]
print('df_2019_gatherix', len(df_2019_gatherix))  #

###################remove non-plant images###########################
df_2017_ff = df_2017[df_2017['feedforward_integer'].isin([5, 4, 3])]
df_2018_ff = df_2018[df_2018['feedforward_integer'].isin([5, 4, 3])]
df_2019_ff = df_2019[df_2019['feedforward_integer'].isin([5, 4, 3])]

print('df_2017_ff ',len(df_2017_ff))  # 34268 = 72.7% of raw count (27.3%  removed)
print('df_2018_ff ',len(df_2018_ff))  # 137440 = 75.5%
print('df_2019_ff ',len(df_2019_ff))  # 82494  = 82.9%

# check amount of plantix vs. gatherix images
# 2017
df_2017_ff_plantix = df_2017_ff[df_2017_ff['app_name'].isin(['Plantix'])]
print('df_2017_ff_plantix', len(df_2017_ff_plantix ))  #
df_2017_ff_gatherix = df_2017_ff[df_2017_ff['app_name'].isin(['Gatherix'])]
print('df_2017_ff_gatherix', len(df_2017_ff_gatherix))  #

# 2018
df_2018_ff_plantix = df_2018_ff[df_2018_ff['app_name'].isin(['Plantix'])]
print('df_2018_ff_plantix', len(df_2018_ff_plantix))  #
df_2018_ff_gatherix = df_2018_ff[df_2018_ff['app_name'].isin(['Gatherix'])]
print('df_2018_ff_gatherix', len(df_2018_ff_gatherix))  #

# 2019
df_2019_ff_plantix = df_2019_ff[df_2019_ff['app_name'].isin(['Plantix'])]
print('df_2019_ff_plantix', len(df_2019_ff_plantix))  #
df_2019_ff_gatherix = df_2019_ff[df_2019_ff['app_name'].isin(['Gatherix'])]
print('df_2019_ff_gatherix', len(df_2019_ff_gatherix))  #



####################################################################
# remove multiple submissions from the same plant
df_2017_ff_unique_pla_id = df_2017_ff.drop_duplicates(['pla_id'])
df_2018_ff_unique_pla_id = df_2018_ff.drop_duplicates(['pla_id'])
df_2019_ff_unique_pla_id = df_2019_ff.drop_duplicates(['pla_id'])

print('df_2017_ff_unique_pla_id', len(df_2017_ff_unique_pla_id))  # 7774
print('df_2018_ff_unique_pla_id', len(df_2018_ff_unique_pla_id))  # 79781
print('df_2019_ff_unique_pla_id', len(df_2019_ff_unique_pla_id))  # 60197

###### remove multiple submission from the same lat/long combination with the same crop (GPS position)
df_2017_ff_unique_pla_id['lat_long_crop'] = df_2017_ff_unique_pla_id['lat_long_crop'] = (df_2017_ff_unique_pla_id.latitude.astype(str).str.cat(df_2017_ff_unique_pla_id.longitude.astype(str), sep='_'))\
    .str.cat((df_2017_ff_unique_pla_id.dnn_variety).astype(str), sep='_')

df_2018_ff_unique_pla_id['lat_long_crop'] = df_2018_ff_unique_pla_id['lat_long_crop'] = (df_2018_ff_unique_pla_id.latitude.astype(str).str.cat(df_2018_ff_unique_pla_id.longitude.astype(str), sep='_'))\
    .str.cat((df_2018_ff_unique_pla_id.dnn_variety).astype(str), sep='_')

df_2019_ff_unique_pla_id['lat_long_crop'] = df_2019_ff_unique_pla_id['lat_long_crop'] = (df_2019_ff_unique_pla_id.latitude.astype(str).str.cat(df_2019_ff_unique_pla_id.longitude.astype(str), sep='_'))\
    .str.cat((df_2019_ff_unique_pla_id.dnn_variety).astype(str), sep='_')


df_2017_ff_unique_pla_id_latlongcrop = df_2017_ff_unique_pla_id.drop_duplicates(subset='lat_long_crop')
df_2018_ff_unique_pla_id_latlongcrop = df_2018_ff_unique_pla_id.drop_duplicates(subset='lat_long_crop')
df_2019_ff_unique_pla_id_latlongcrop = df_2019_ff_unique_pla_id.drop_duplicates(subset='lat_long_crop')

print('df_2017_unique_pla_id unique latlong',len(df_2017_ff_unique_pla_id_latlongcrop))  # 4927
print('df_2018_unique_pla_id unique latlong',len(df_2018_ff_unique_pla_id_latlongcrop))  # 63917
print('df_2019_unique_pla_id unique latlong',len(df_2019_ff_unique_pla_id_latlongcrop))  # 41165

# remove images with same lat_long
# check if it's the same date/time
df_2017_ff_unique_pla_id_latlongcrop['lat_long'] = df_2017_ff_unique_pla_id_latlongcrop['lat_long'] = (df_2017_ff_unique_pla_id_latlongcrop.latitude.astype(str).str.cat(df_2017_ff_unique_pla_id_latlongcrop.longitude.astype(str), sep='_'))
df_2018_ff_unique_pla_id_latlongcrop['lat_long'] = df_2018_ff_unique_pla_id_latlongcrop['lat_long'] = (df_2018_ff_unique_pla_id_latlongcrop.latitude.astype(str).str.cat(df_2018_ff_unique_pla_id_latlongcrop.longitude.astype(str), sep='_'))
df_2019_ff_unique_pla_id_latlongcrop['lat_long'] = df_2019_ff_unique_pla_id_latlongcrop['lat_long'] = (df_2019_ff_unique_pla_id_latlongcrop.latitude.astype(str).str.cat(df_2019_ff_unique_pla_id_latlongcrop.longitude.astype(str), sep='_'))


# check amount of plantix vs. gatherix images
# 2017
df_2017_ff_unique_pla_id_latlongcrop_plantix = df_2017_ff_unique_pla_id_latlongcrop[df_2017_ff_unique_pla_id_latlongcrop['app_name'].isin(['Plantix'])]
print('df_2017_ff_unique_pla_id_latlongcrop_plantix', len(df_2017_ff_unique_pla_id_latlongcrop_plantix ))  #
df_2017_ff_unique_pla_id_latlongcrop_gatherix = df_2017_ff_unique_pla_id_latlongcrop[df_2017_ff_unique_pla_id_latlongcrop['app_name'].isin(['Gatherix'])]
print('df_2017_ff_unique_pla_id_latlongcrop_gatherix', len(df_2017_ff_unique_pla_id_latlongcrop_gatherix))  #

# 2018
df_2018_ff_unique_pla_id_latlongcrop_plantix = df_2018_ff_unique_pla_id_latlongcrop[df_2018_ff_unique_pla_id_latlongcrop['app_name'].isin(['Plantix'])]
print('df_2018_ff_unique_pla_id_latlongcrop_plantix', len(df_2018_ff_unique_pla_id_latlongcrop_plantix))  #
df_2018_ff_unique_pla_id_latlongcrop_gatherix = df_2018_ff_unique_pla_id_latlongcrop[df_2018_ff_unique_pla_id_latlongcrop['app_name'].isin(['Gatherix'])]
print('df_2018_ff_unique_pla_id_latlongcrop_gatherix', len(df_2018_ff_unique_pla_id_latlongcrop_gatherix))  #

# 2019
df_2019_ff_unique_pla_id_latlongcrop_plantix = df_2019_ff_unique_pla_id_latlongcrop[df_2019_ff_unique_pla_id_latlongcrop['app_name'].isin(['Plantix'])]
print('df_2019_ff_unique_pla_id_latlongcrop_plantix', len(df_2019_ff_unique_pla_id_latlongcrop_plantix))  #
df_2019_ff_unique_pla_id_latlongcrop_gatherix = df_2019_ff_unique_pla_id_latlongcrop[df_2019_ff_unique_pla_id_latlongcrop['app_name'].isin(['Gatherix'])]
print('df_2019_ff_unique_pla_id_latlongcrop_gatherix', len(df_2019_ff_unique_pla_id_latlongcrop_gatherix))







df_2017_ul_ff = df_2017_ff_unique_pla_id_latlongcrop.drop_duplicates(subset='lat_long')
df_2018_ul_ff = df_2018_ff_unique_pla_id_latlongcrop.drop_duplicates(subset='lat_long')
df_2019_ul_ff = df_2019_ff_unique_pla_id_latlongcrop.drop_duplicates(subset='lat_long')

print('df_2017_ul_ff',len(df_2017_ul_ff))  # 4054
print('df_2018_ul_ff',len(df_2018_ul_ff))  # 53955
print('df_2019_ul_ff',len(df_2019_ul_ff))  # 33595




########################################################################################################################

# check amount of plantix vs. gatherix images
# 2017
df_2017_ul_ff_plantix = df_2017_ul_ff[df_2017_ul_ff['app_name'].isin(['Plantix'])]
print('df_2017_ul_ff_plantix', len(df_2017_ul_ff_plantix))  # 3913
df_2017_ul_ff_gatherix = df_2017_ul_ff[df_2017_ul_ff['app_name'].isin(['Gatherix'])]
print('df_2017_ul_ff_gatherix', len(df_2017_ul_ff_gatherix))  # 141

# 2018
df_2018_ul_ff_plantix = df_2018_ul_ff[df_2018_ul_ff['app_name'].isin(['Plantix'])]
print('df_2018_ul_ff_plantix', len(df_2018_ul_ff_plantix))  # 52962
df_2018_ul_ff_gatherix = df_2018_ul_ff[df_2018_ul_ff['app_name'].isin(['Gatherix'])]
print('df_2018_ul_ff_gatherix', len(df_2018_ul_ff_gatherix))  # 991

# 2019
df_2019_ul_ff_plantix = df_2019_ul_ff[df_2019_ul_ff['app_name'].isin(['Plantix'])]
print('df_2019_ul_ff_plantix', len(df_2019_ul_ff_plantix))  # 33121
df_2019_ul_ff_gatherix = df_2019_ul_ff[df_2019_ul_ff['app_name'].isin(['Gatherix'])]
print('df_2019_ul_ff_gatherix', len(df_2019_ul_ff_gatherix))  # 474


#################### create timedifference (photo taken / photo upload) column###########################################################

#
# create new clean photo taken time column
filename_date_format = '%Y%m%d_%H%M%S'

# 2017
df_2017_ul_ff['photo_taken'] = pd.to_datetime(df_2017_ul_ff['filename'].str[5:20], format=filename_date_format)
df_2017_ul_ff['date'] = pd.to_datetime(df_2017_ul_ff['date'], format=filename_date_format)

df_2017_ul_ff['photo'] = df_2017_ul_ff['date'].apply(lambda x: pd.Timestamp(x))
df_2017_ul_ff['date'] = df_2017_ul_ff['date'].apply(lambda x: pd.Timestamp(x))

df_2017_ul_ff['time_diff'] = (df_2017_ul_ff['date'] - df_2017_ul_ff['photo_taken']).astype('timedelta64[m]')

# 2018
# Need to remove weirdly named filenames
indexes = df_2018_ul_ff[df_2018_ul_ff['filename'].str.contains('PEATpI')].index
df_2018_ul_ff = df_2018_ul_ff.drop(indexes)

df_2018_ul_ff['photo_taken'] = pd.to_datetime(df_2018_ul_ff['filename'].str[5:20], format=filename_date_format)
df_2018_ul_ff['date'] = pd.to_datetime(df_2018_ul_ff['date'], format=filename_date_format)

df_2018_ul_ff['photo'] = df_2018_ul_ff['date'].apply(lambda x: pd.Timestamp(x))
df_2018_ul_ff['date'] = df_2018_ul_ff['date'].apply(lambda x: pd.Timestamp(x))

df_2018_ul_ff['time_diff'] = (df_2018_ul_ff['date'] - df_2018_ul_ff['photo_taken']).astype('timedelta64[m]')

# 2019
df_2019_ul_ff['photo_taken'] = pd.to_datetime(df_2019_ul_ff['filename'].str[5:20], format=filename_date_format)
df_2019_ul_ff['date'] = pd.to_datetime(df_2019_ul_ff['date'], format=filename_date_format)

df_2019_ul_ff['photo'] = df_2019_ul_ff['date'].apply(lambda x: pd.Timestamp(x))
df_2019_ul_ff['date'] = df_2019_ul_ff['date'].apply(lambda x: pd.Timestamp(x))

df_2019_ul_ff['time_diff'] = (df_2019_ul_ff['date'] - df_2019_ul_ff['photo_taken']).astype('timedelta64[m]')

# drop rows with timedelta > 5 min
print(df_2018_ul_ff.time_diff.unique())

#fil3 = df_2019[df_2019['time_diff'] > 3.00]
#fil5 = df_2019[df_2019['time_diff'] > 5.00]
#fil10 = df_2019[df_2019['time_diff'] > 10.00]


#################   append the cropnet detection results   #####################################################
pred_imp = pd.read_csv('/Users/lara/thesis_data/PEAT_data/lara_predictions_dec.csv')
cropnet = pred_imp.copy()

# remove stuff in string before actual filename
cropnet['filename'] = cropnet['filename'].str[44:]

df_2017_ul_ff_DNN_join = pd.merge(df_2017_ul_ff, cropnet[['_id', 'dnn_variety_0','dnn_variety_similarity_0']], left_on=['_id'],
             right_on= ['_id'], how='left')

df_2018_ul_ff_DNN_join = pd.merge(df_2018_ul_ff, cropnet[['_id', 'dnn_variety_0','dnn_variety_similarity_0']], left_on=['_id'],
             right_on= ['_id'], how='left')

df_2019_ul_ff_DNN_join = pd.merge(df_2019_ul_ff, cropnet[['_id', 'dnn_variety_0','dnn_variety_similarity_0']], left_on=['_id'],
             right_on= ['_id'], how='left')

# rename similarity column to simpler naming
df_2017_ul_ff_DNN_join=df_2017_ul_ff_DNN_join.rename(columns = {'dnn_variety_similarity_0':'dnn_sim'})
df_2018_ul_ff_DNN_join=df_2018_ul_ff_DNN_join.rename(columns = {'dnn_variety_similarity_0':'dnn_sim'})
df_2019_ul_ff_DNN_join=df_2019_ul_ff_DNN_join.rename(columns = {'dnn_variety_similarity_0':'dnn_sim'})


# fill nan values in dnn_sim columns with 0.99

df_2017_ul_ff_DNN_join = df_2017_ul_ff_DNN_join.fillna({'dnn_sim': 0.99})
df_2018_ul_ff_DNN_join = df_2018_ul_ff_DNN_join.fillna({'dnn_sim': 0.99})
df_2019_ul_ff_DNN_join = df_2019_ul_ff_DNN_join.fillna({'dnn_sim': 0.99})



###################   join 'image_from_library'   ###################################################################
# join 'image_from_gallery' attribute where available for 2018 and 2019
# import datasets:

gallery_2017 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/01_raw_data/2017_AP_jan_march_id_image_from_gall.csv')
gallery_2018 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/01_raw_data/2018_AP_jan_march_id_image_from_gall.csv')
gallery_2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/01_raw_data//2019_AP_jan_march_id_image_from_gall.csv')

df_2017_ul_ff_DNN_join_gall = pd.merge(df_2017_ul_ff_DNN_join, gallery_2017[['_id', 'image_from_gallery']], left_on=['_id'],
             right_on= ['_id'], how='left')

df_2018_ul_ff_DNN_join_gall = pd.merge(df_2018_ul_ff_DNN_join, gallery_2018[['_id', 'image_from_gallery']], left_on=['_id'],
             right_on= ['_id'], how='left')

df_2019_ul_ff_DNN_join_gall = pd.merge(df_2019_ul_ff_DNN_join, gallery_2019[['_id', 'image_from_gallery']], left_on=['_id'],
             right_on= ['_id'], how='left')


# replace values in image_from_gallery column with meaningful strings (not/gallery), gatherix images are None

df_2017_ul_ff_DNN_join_gall = df_2017_ul_ff_DNN_join_gall.replace({'image_from_gallery': {True: 'gallery', False: 'not', None: 'not'}})
df_2018_ul_ff_DNN_join_gall = df_2018_ul_ff_DNN_join_gall.replace({'image_from_gallery': {True: 'gallery', False: 'not', None: 'not'}})
df_2019_ul_ff_DNN_join_gall = df_2019_ul_ff_DNN_join_gall.replace({'image_from_gallery': {True: 'gallery', False: 'not', None: 'not'}})

# filter for image not from gallery

df_2017_ul_ff_DNN_notgall = df_2017_ul_ff_DNN_join_gall[df_2017_ul_ff_DNN_join_gall['image_from_gallery'] == 'not']
print('df_2017_ul_ff_DNN_notgall', len(df_2017_ul_ff_DNN_notgall))

df_2018_ul_ff_DNN_notgall = df_2018_ul_ff_DNN_join_gall[df_2018_ul_ff_DNN_join_gall['image_from_gallery'] == 'not']
print('df_2018_ul_ff_DNN_notgall', len(df_2018_ul_ff_DNN_notgall))

df_2019_ul_ff_DNN_notgall = df_2019_ul_ff_DNN_join_gall[df_2019_ul_ff_DNN_join_gall['image_from_gallery'] == 'not']
print('df_2019_ul_ff_DNN_notgall', len(df_2019_ul_ff_DNN_notgall))


# check amount of plantix vs. gatherix images
# 2017
df_2017_ul_ff_DNN_notgall_plantix = df_2017_ul_ff_DNN_notgall[df_2017_ul_ff_DNN_notgall['app_name'].isin(['Plantix'])]
print('df_2017_ul_ff_DNN_notgall_plantix', len(df_2017_ul_ff_DNN_notgall_plantix ))  #
df_2017_ul_ff_DNN_notgall_gatherix = df_2017_ul_ff_DNN_notgall[df_2017_ul_ff_DNN_notgall['app_name'].isin(['Gatherix'])]
print('df_2017_ul_ff_DNN_notgall_gatherix', len(df_2017_ul_ff_DNN_notgall_gatherix))  #

# 2018
df_2018_ul_ff_DNN_notgall_plantix = df_2018_ul_ff_DNN_notgall[df_2018_ul_ff_DNN_notgall['app_name'].isin(['Plantix'])]
print('df_2018_ul_ff_DNN_notgall_plantix', len(df_2018_ul_ff_DNN_notgall_plantix))  #
df_2018_ul_ff_DNN_notgall_gatherix = df_2018_ul_ff_DNN_notgall[df_2018_ul_ff_DNN_notgall['app_name'].isin(['Gatherix'])]
print('df_2018_ul_ff_DNN_notgall_gatherix', len(df_2018_ul_ff_DNN_notgall_gatherix))  #

# 2019
df_2019_ul_ff_DNN_notgall_plantix = df_2019_ul_ff_DNN_notgall[df_2019_ul_ff_DNN_notgall['app_name'].isin(['Plantix'])]
print('df_2019_ul_ff_DNN_notgall_plantix', len(df_2019_ul_ff_DNN_notgall_plantix))  #
df_2019_ul_ff_DNN_notgall_gatherix = df_2019_ul_ff_DNN_notgall[df_2019_ul_ff_DNN_notgall['app_name'].isin(['Gatherix'])]
print('df_2019_ul_ff_DNN_notgall_gatherix', len(df_2019_ul_ff_DNN_notgall_gatherix))  #


########################################################################################################################

# reorder

df_2017_ul_ff_DNN_notgall = df_2017_ul_ff_DNN_notgall[['Unnamed: 0', 'year', 'latitude', 'longitude', 'accuracy', 'app_name', 'dnn_variety','dnn_sim', 'photo_taken', 'date',
'time_diff', 'timestamp', 'image_from_gallery', 'rice_crop', 'filename',  'pla_id', '_id', 'user_id', 'ip_district', 'feedforward_integer']]

df_2018_ul_ff_DNN_notgall = df_2018_ul_ff_DNN_notgall[['Unnamed: 0', 'year', 'latitude', 'longitude', 'accuracy', 'app_name', 'dnn_variety','dnn_sim', 'photo_taken', 'date',
'time_diff', 'timestamp', 'image_from_gallery', 'rice_crop', 'filename',  'pla_id', '_id', 'user_id', 'ip_district', 'feedforward_integer']]

df_2019_ul_ff_DNN_notgall = df_2019_ul_ff_DNN_notgall[['Unnamed: 0', 'year', 'latitude', 'longitude', 'accuracy', 'app_name', 'dnn_variety','dnn_sim', 'photo_taken', 'date',
'time_diff', 'timestamp', 'image_from_gallery', 'rice_crop', 'filename',  'pla_id', '_id', 'user_id', 'ip_district', 'feedforward_integer']]

# check
for col in df_2019_ul_ff_DNN_join_gall.columns:
    print(col)

########################################################################################################################
# export

print('df_2017_ul_ff_DNN_notgall ',len(df_2017_ul_ff_DNN_notgall)) #
print('df_2018_ul_ff_DNN_notgall ',len(df_2018_ul_ff_DNN_notgall)) #
print('df_2019_ul_ff_DNN_notgall ',len(df_2019_ul_ff_DNN_notgall)) #

df_2017_ul_ff_DNN_notgall.to_csv("/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2017_clean_complete_EE_ready.csv", header=True,  index=False, encoding='utf-8')
df_2018_ul_ff_DNN_notgall.to_csv("/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2018_clean_complete_EE_ready.csv", header=True,  index=False, encoding='utf-8')
df_2019_ul_ff_DNN_notgall.to_csv("/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2019_clean_complete_EE_ready.csv", header=True,  index=False, encoding='utf-8')


