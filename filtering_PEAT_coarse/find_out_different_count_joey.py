
import pandas as pd
import numpy as np
##################### 2019 ########################################
data_joey = pd.read_csv('/Users/lara/Dropbox/M10_Master_Thesis/06_training_data/01_td_PEAT/01_raw_PEAT_data/joey_aoi.csv')
#print(len(data2019)) ## 48251

## extract timestamp column
df_joey = data_joey[['timestamp']]
df_joey_copy = df_joey.copy()
df_joey_copy['count_joey'] = 1

# slice the timestamp column (only the first 10 digits)
df_joey_copy['timestamp'] = df_joey_copy['timestamp'].str[0:10]
print(df_joey_copy.head())

# group by timestamp
df_joey_group = df_joey_copy.groupby(['timestamp']).sum()
df_joey_group = df_joey_group.reset_index()
#print(df_2019_group[:100])

# remove year from timestamp 2019
#df_2018_group['timestamp'] = df_2018_group['timestamp'].replace(regex=r' [0-4]{2}:[0-4]{2}:[0-4]{2}', value='')
df_joey_group['timestamp'] = df_joey_group['timestamp'].str[5:10]
print('joey', df_joey_group[:100])


##################### 2019 ########################################
data2019 = pd.read_csv('/Users/lara/Dropbox/M10_Master_Thesis/06_training_data/01_td_PEAT/01_raw_PEAT_data/rabi_2018_2019.csv')
#print(len(data2019)) ## 48251

## extract timestamp column
df2019 = data2019[['timestamp']]
df_2019_copy = df2019.copy()
df_2019_copy['count_value_2019'] = 1

# slice the timestamp column (only the first 10 digits)
df_2019_copy['timestamp'] = df_2019_copy['timestamp'].replace(regex=r' [0-9]{2}:[0-9]{2}:[0-9]{2}', value='')

# group by timestamp
df_2019_group = df_2019_copy.groupby(['timestamp']).sum()
df_2019_group = df_2019_group.reset_index()
#print(df_2019_group[:100])

# remove year from timestamp 2019
#df_2018_group['timestamp'] = df_2018_group['timestamp'].replace(regex=r' [0-4]{2}:[0-4]{2}:[0-4]{2}', value='')
df_2019_group['timestamp'] = df_2019_group['timestamp'].str[5:]
print(df_2019_group[:100])


#################### filtered 2019 ##############################
# filter 2019 data
#df[df['A'].isin([3, 6])]
data2019_fil = data2019[np.logical_not(data2019['dnn_variety'].isin(['ORNAMENTAL']))&
                        data2019['feedforward_integer'].isin([5, 4])
                        & (data2019['app_name'].isin(['Plantix', 'Plantix Preview']))]

                      #  [(data2019.feedforward_integer == 5)
                      #  | (data2019.feedforward_integer == 4)]] # & (data2019.feedforward_integer == 2)    &   (data2019.app_name == 'Plantix')
# print('filtered_size', len(data2019_fil)) # 24939   #(data2019.feedforward_integer == 2)


## extract timestamp column
df2019_fil = data2019_fil[['timestamp']]
df_2019_fil_copy = df2019_fil.copy()
df_2019_fil_copy['count_value_filtered_2019'] = 1

# slice the timestamp column (only the first 10 digits)
df_2019_fil_copy['timestamp'] = df_2019_fil_copy['timestamp'].replace(regex=r' [0-9]{2}:[0-9]{2}:[0-9]{2}', value='')

# group by timestamp
df_2019_fil_group = df_2019_fil_copy.groupby(['timestamp']).sum()
df_2019_fil_group = df_2019_fil_group.reset_index()
#print(df_2019_group[:100])

# remove year from timestamp 2019
df_2019_fil_group['timestamp'] = df_2019_fil_group['timestamp'].str[5:]
print(df_2019_group[:100])


##################### 2018 ########################################
data2018 = pd.read_csv('/Users/lara/Dropbox/M10_Master_Thesis/06_training_data/01_td_PEAT/01_raw_PEAT_data/rabi_2017_2018.csv')
#print(len(data2018)) ## 48251

## extract timestamp column
df2018 = data2018[['timestamp']]
df_2018_copy = df2018.copy()
df_2018_copy['count_value_2018'] = 1

# slice the timestamp column (only the first 10 digits)
df_2018_copy['timestamp'] = df_2018_copy['timestamp'].replace(regex=r' [0-9]{2}:[0-9]{2}:[0-9]{2}', value='')

# group by timestamp
df_2018_group = df_2018_copy.groupby(['timestamp']).sum()
df_2018_group = df_2018_group.reset_index()
#print(df_2018_group[:100])

# remove year from timestamp 2018
df_2018_group['timestamp'] = df_2018_group['timestamp'].str[5:]
print(df_2018_group[:100])

##################### 2017 ########################################
data2017 = pd.read_csv('/Users/lara/Dropbox/M10_Master_Thesis/06_training_data/01_td_PEAT/01_raw_PEAT_data/rabi_2016_2017.csv')
#print(len(data2018)) ## 48251

## extract timestamp column
df2017 = data2017[['timestamp']]
df_2017_copy = df2017.copy()
df_2017_copy['count_value_2017'] = 1

# slice the timestamp column (only the first 10 digits)
df_2017_copy['timestamp'] = df_2017_copy['timestamp'].replace(regex=r' [0-9]{2}:[0-9]{2}:[0-9]{2}', value='')

# group by timestamp
df_2017_group = df_2017_copy.groupby(['timestamp']).sum()
df_2017_group = df_2017_group.reset_index()
#print(df_2018_group[:100])

# remove year from timestamp 2018
df_2017_group['timestamp'] = df_2017_group['timestamp'].str[5:]
print(df_2017_group[:100])


####### JOIN ##############################
joined = df_2018_group.join(df_2019_group.set_index('timestamp'), on='timestamp')
joined = joined.join(df_2017_group.set_index('timestamp'), on='timestamp')
joined = joined.join(df_joey_group.set_index('timestamp'), on='timestamp')
joined = joined.join(df_2019_fil_group.set_index('timestamp'), on='timestamp')



# subset to only timeframe of interest
joined= joined[92:]
print(joined.head())

total2017 = joined['count_value_2017'].sum()
total2018 = joined['count_value_2018'].sum()
total2019 = joined['count_value_2019'].sum()
print ('2017 count total images 01-01 - 03-30', total2017, '\n'
       '2018 count total images 01-01 - 03-30', total2018, '\n'
       '2019 count total images 01-01 - 03-30', total2019,)

############## plot


import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

#plt.figure(figsize=(20,8))
# multiple line plot
#plt.plot('timestamp', 'count_value_2017', data=joined, marker='', color='green', linewidth=1)
#plt.plot('timestamp', 'count_value_2018', data=joined, marker='', color='blue', linewidth=1)
plt.plot('timestamp', 'count_value_2019', data=joined, marker='', color='grey', linewidth=1)
plt.plot('timestamp', 'count_value_filtered_2019', data=joined, marker='', color='orange', linewidth=1)
plt.plot('timestamp', 'count_joey', data=joined, marker='', color='black', linewidth=1)
plt.xticks(rotation='vertical')
axes= plt.axes()
axes.set_ylim([0,4500])
axes.set_yticks([500, 1000, 1500,2000, 2500, 3000, 3500, 4000, 4500])
#plt.xticks(np.arange(3))
#plt.figure(figsize=(7,5))  # <- increase figure margin
plt.tight_layout()
plt.ylim(ymin=0)
plt.xlim(xmin=0, xmax=88) # should be 89 when 31.3 included
plt.legend()
plt.show()

fig = plt.figure()
plt.plot('timestamp', 'count_joey', data=joined, marker='', color='black', linewidth=1)
fig.suptitle('test title')
plt.xlabel('xlabel')
plt.xticks(rotation='vertical')
plt.ylabel('ylabel')
plt.legend()
plt.show()
fig.savefig('test.png')