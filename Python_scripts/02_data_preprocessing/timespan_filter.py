
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
print('df_2017_plantix_ul_time', len(df_2017_plantix_ul_time)) 

df_2018_plantix_ul_time = df_2018_plantix_ul[(df_2018_plantix_ul['dt'] > '2018-01-01') & (df_2018_plantix_ul['dt'] < '2018-03-31')]
#print(df_2018_plantix_ul_time.head())
print('df_2018_plantix_ul_time', len(df_2018_plantix_ul_time)) 

df_2019_plantix_ul_time = df_2019_plantix_ul[(df_2019_plantix_ul['dt'] > '2019-01-01') & (df_2019_plantix_ul['dt'] < '2019-03-31')]
#print(df_2019_plantix_ul_time.head())
print('df_2019_plantix_ul_time', len(df_2019_plantix_ul_time)) 

