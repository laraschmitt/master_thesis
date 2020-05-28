




import pandas as pd
import numpy as np


######################### load data ##############################################
whole2017 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2017_whole_year.csv')
# print(whole2017.head())

whole2018 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2018_whole_year.csv')
# print(whole2018.head())

whole2019 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2019_whole_year.csv')
# print(whole2019.head())


##### function to extract timestamp column and slice the column to remove unnecessary end
### and remove year from timestamp

def get_filtered(df):
    #
    df_filtered = df[np.logical_not(df['dnn_variety'].isin(['ORNAMENTAL'])) &
                            df['feedforward_integer'].isin([5, 4, 3])
                            & (df['app_name'].isin(['Plantix', 'Plantix Preview']))]

    df_fil = df_filtered[['timestamp']]
    df_fil_copy = df_fil.copy()
    # add dummy column with 1 values
    df_fil_copy['count'] = 1
    # remove year and hours
    df_fil_copy['timestamp'] = df_fil_copy['timestamp'].str[5:10]
    # group by timestamp
    df_fil_group = df_fil_copy.groupby(['timestamp']).sum()
    df_fil_group = df_fil_group.reset_index()

    return df_fil_group

################################# apply ###########################

df_timestamp_2017 = get_filtered(whole2017)
df_timestamp_2018 = get_filtered(whole2018)
df_timestamp_2019 = get_filtered(whole2019)
print(df_timestamp_2019.head(30))


import matplotlib.pyplot as plt
import matplotlib.ticker as ticker


####################### plot unfiltered data ##############################
## what happened 2017? extremely hight count at some point
plt.figure(figsize=(35, 5))
plt.title('Filtered data count (detected as plant & app: plantix (without gatherix')
plt.plot('timestamp', 'count', data=df_timestamp_2017, marker='', color='black', linewidth=1, label='2017')
plt.plot('timestamp', 'count', data=df_timestamp_2018, marker='', color='blue', linewidth=1, label='2018')
plt.plot('timestamp', 'count', data=df_timestamp_2019, marker='', color='darkorange', linewidth=1, label='2019')
plt.xticks(rotation='vertical')
axes= plt.axes()
axes.set_ylim([0, 3500])
axes.set_yticks([500, 1000, 1500, 2000, 2500, 3000, 3500])
axes.set_xlim(['01-01', '12-30'])
axes.set_xticks(['01-01', '02-01', '03-01', '04-01', '05-01', '06-01', '07-01', '08-01', '09-01', '10-01', '11-01', '12-01'])
plt.ylim(ymin=0)
plt.xlim(xmin=0)  # should be 89 when 31.3 included xmax=88
plt.xlabel("Time")
plt.ylabel("Count")
plt.legend()
#plt.tight_layout()
plt.show()