import pandas as pd
path = '/Users/lara/thesis_data/PEAT_data/'

whole2017 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2017_whole_year.csv')
whole2018 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2018_whole_year.csv')
whole2019 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2019_whole_year.csv')

#print('2017 total', len(whole2017))   # 508453 incl. gatherix
#print('2018 total', len(whole2018))   # 666193
#print('2019 total', len(whole2019))   # 393797

df_2017 = whole2017.copy()
df_2018 = whole2018.copy()
df_2019 = whole2019.copy()

### spatial filter to exclude funny points

#borders = ogr.Open(path + '/Users/lara/thesis_data/shapes_and_layers/OSM_AP_borders.shp', 0)
# not done because data in csv not in shapefile, did it in QGIS
############ FILTER: PLANTIX ########################
df_2017_plantix = df_2017[df_2017['app_name'].isin(['Plantix', 'Plantix Preview'])]
#print('2017 only plantix',len(df_2017_plantix))  # 267050
#print(df_2017_plantix.head())

df_2018_plantix = df_2018[df_2018['app_name'].isin(['Plantix', 'Plantix Preview'])]
#print('2018 only plantix',len(df_2018_plantix))  # 411846
#print(df_2018_plantix.head())

df_2019_plantix = df_2019[df_2019['app_name'].isin(['Plantix', 'Plantix Preview'])]
#print('2019 only plantix',len(df_2019_plantix))  # 328104
#print(df_2019_plantix.head())

############ FILTER: UNIQUE LOCATION ######################## (several submission from one user)
df_2017_plantix_ul= df_2017_plantix.drop_duplicates(['pla_id'])
print('df_2017_plantix_unique_loc',len(df_2017_plantix_ul))  # 189413

df_2018_plantix_ul= df_2018_plantix.drop_duplicates(['pla_id'])
print('df_2018_plantix_unique_loc',len(df_2018_plantix_ul))  # 409975

df_2019_plantix_ul= df_2019_plantix.drop_duplicates(['pla_id'])
print('df_2019_plantix_unique_loc',len(df_2019_plantix_ul))  # 327964

############ FILTER: TIMESPAN ########################
## change the timestamp column:
# slice the timestamp column (only the first 10 digits)
df_2017_plantix_ul['dt'] = df_2017_plantix_ul['timestamp'].replace(regex=r' [0-9]{2}:[0-9]{2}:[0-9]{2}', value='')
df_2018_plantix_ul['dt'] = df_2018_plantix_ul['timestamp'].replace(regex=r' [0-9]{2}:[0-9]{2}:[0-9]{2}', value='')
df_2019_plantix_ul['dt'] = df_2019_plantix_ul['timestamp'].replace(regex=r' [0-9]{2}:[0-9]{2}:[0-9]{2}', value='')
#print(df_2017_plantix.head())
#print(df_2018_plantix.head())
#print(df_2019_plantix.head())

# set to date format
df_2017_plantix_ul['dt'] = pd.to_datetime(df_2017_plantix_ul['dt'])
df_2018_plantix_ul['dt'] = pd.to_datetime(df_2018_plantix_ul['dt'])
df_2019_plantix_ul['dt'] = pd.to_datetime(df_2019_plantix_ul['dt'])

## extract dates for timespan of interest
df_2017_plantix_ul_time = df_2017_plantix_ul[(df_2017_plantix_ul['dt'] > '2017-01-01') & (df_2017_plantix_ul['dt'] < '2017-03-31')]
#print(df_2017_plantix_ul_time.head())
print('df_2017_plantix_ul_time', len(df_2017_plantix_ul_time)) # 9742

df_2018_plantix_ul_time = df_2018_plantix_ul[(df_2018_plantix_ul['dt'] > '2018-01-01') & (df_2018_plantix_ul['dt'] < '2018-03-31')]
#print(df_2018_plantix_ul_time.head())
print('df_2018_plantix_ul_time', len(df_2018_plantix_ul_time)) # 112793

df_2019_plantix_ul_time = df_2019_plantix_ul[(df_2019_plantix_ul['dt'] > '2019-01-01') & (df_2019_plantix_ul['dt'] < '2019-03-31')]
#print(df_2019_plantix_ul_time.head())
print('df_2019_plantix_ul_time', len(df_2019_plantix_ul_time)) # 69011


############ FILTER: FEEDFORWARD 3,4,5 ########################

df_2017_plantix_ul_time_ff= df_2017_plantix_ul_time[df_2017_plantix_ul_time['feedforward_integer'].isin([5, 4, 3])]
print('df_2017_plantix_ul_time_ff ',len(df_2017_plantix_ul_time_ff)) # 6830

df_2018_plantix_ul_time_ff= df_2018_plantix_ul_time[df_2018_plantix_ul_time['feedforward_integer'].isin([5, 4, 3])]
print('df_2018_plantix_ul_time_ff ',len(df_2018_plantix_ul_time_ff)) # 71093

df_2019_plantix_ul_time_ff= df_2019_plantix_ul_time[df_2019_plantix_ul_time['feedforward_integer'].isin([5, 4, 3])]
print('df_2019_plantix_ul_time_ff ',len(df_2019_plantix_ul_time_ff)) # 52756

# compare with border cropped:
cropped2017 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/AP_2017_spatialfil_plantix_ul_time_ff.csv')
print('cropped2017 ',len(cropped2017)) # 6809

cropped2018 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/AP_2018_spatialfil_plantix_ul_time_ff.csv')
print('cropped2018 ',len(cropped2018)) # 70751

cropped2019 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/AP_2019_spatialfil_plantix_ul_time_ff.csv')
print('cropped2019 ',len(cropped2019)) # 52428

############ EXPORT ########################

df_2017_plantix_ul_time_ff.to_csv(path + "AP_2017_plantix_ul_time_ff.csv", header=True,  index=False,
                  encoding='utf-8')

df_2018_plantix_ul_time_ff.to_csv(path + "AP_2018_plantix_ul_time_ff.csv", header=True,  index=False,
                  encoding='utf-8')

df_2019_plantix_ul_time_ff.to_csv(path + "AP_2019_plantix_ul_time_ff.csv", header=True,  index=False,
                  encoding='utf-8')