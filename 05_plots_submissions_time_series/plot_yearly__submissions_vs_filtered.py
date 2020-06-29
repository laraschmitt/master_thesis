

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

path = '<PATH_TO_DATA_FOLDER>'

######################### load data ##############################################
whole2017 = pd.read_csv(path + '2017_whole_year.csv')
whole2018 = pd.read_csv(path + '2018_whole_year.csv')
whole2019 = pd.read_csv(path + '2019_whole_year.csv')


# function to get time difference column
def get_time_col_ny(df):   # input:# filename
    # open SR file with gdal and read it as numpy array
    df_fil = df[['timestamp']]
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

df_timestamp_2017 = get_time_col_ny(whole2017)
df_timestamp_2018 = get_time_col_ny(whole2018)
df_timestamp_2019 = get_time_col_ny(whole2019)

############# filter function: only plantix
def get_plantix(df):   # WITHOUT GATHERIX
    #
    df_unique_pla_id = df.drop_duplicates(['pla_id'])
    df_filtered = df_unique_pla_id[(df_unique_pla_id['app_name'].isin(['Plantix', 'Plantix Preview']))]
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

df_2017_plantix = get_plantix(whole2017)
df_2018_plantix = get_plantix(whole2018)
df_2019_plantix = get_plantix(whole2019)




###################### filter function: UNIQUE PLA ids ##################################
def get_filtered_pla_id(df):    ## only unique PLA IDs !
    #
    #df_unique_pla_id = df['pla_id'].unique()
    df_unique_pla_id = df.drop_duplicates(['pla_id'])

    df_fil = df_unique_pla_id[['timestamp']]
    df_fil_copy = df_fil.copy()
    # add dummy column with 1 values
    df_fil_copy['count'] = 1
    # remove year and hours
    df_fil_copy['timestamp'] = df_fil_copy['timestamp'].str[5:10]
    # group by timestamp
    df_fil_group = df_fil_copy.groupby(['timestamp']).sum()
    df_fil_group = df_fil_group.reset_index()

    return df_fil_group


df_fil_2017_unique_pla_id = get_filtered_pla_id(whole2017)
print('count 2017 days', len(df_fil_2017_unique_pla_id.index))  ## only count of the days!! 364 -> one is missing!!
##print(len(whole2017['pla_id'].unique()))  # 223629
df_fil_2018_unique_pla_id = get_filtered_pla_id(whole2018)
print('count 2018 days', len(df_fil_2018_unique_pla_id))
df_fil_2019_unique_pla_id = get_filtered_pla_id(whole2019)
print('count 2019 days', len(df_fil_2019_unique_pla_id))


########################### filter function: PLA_ID + FF ####################################################
def get_filtered_pla_id_ff(df):
    #
    df_unique_pla_id = df.drop_duplicates(['pla_id'])
    df_filtered = df_unique_pla_id[(df_unique_pla_id['app_name'].isin(['Plantix', 'Plantix Preview'])& df_unique_pla_id[df_unique_pla_id['feedforward_integer'].isin([5, 4, 3]))]
    #df_filtered = df_unique_pla_id[df_unique_pla_id['feedforward_integer'].isin([5, 4, 3])]
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


df_fil_pla_id_ff_2017 = get_filtered_pla_id_ff(whole2017)
df_fil_pla_id_ff_2018 = get_filtered_pla_id_ff(whole2018)
df_fil_pla_id_ff_2019 = get_filtered_pla_id_ff(whole2019)


###################### filter function: PLA ID, FF, WITHOUT ORNAMENTAL  ##################################
def get_filtered_pla_id_ff_plantix(df):   # WITHOUT GATHERIX
    #
    df_unique_pla_id = df.drop_duplicates(['pla_id'])
    df_filtered = df_unique_pla_id[np.logical_not(df_unique_pla_id['dnn_variety'].isin(['ORNAMENTAL'])) &
                            df_unique_pla_id['feedforward_integer'].isin([5, 4, 3])
                            & (df_unique_pla_id['app_name'].isin(['Plantix', 'Plantix Preview']))]
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

df_fil_2017_pla_id_ff_plantix = get_filtered_pla_id_ff_plantix(whole2017)
df_fil_2018_pla_id_ff_plantix = get_filtered_pla_id_ff_plantix(whole2018)
df_fil_2019_pla_id_ff_plantix = get_filtered_pla_id_ff_plantix(whole2019)



####################### plot unfiltered data ##############################

#plt.figure(figsize=(35, 5))
plt.figure(figsize=(12, 3))

# Set the font dictionaries (for plot title and axis titles)
title_font = {'fontname':'Arial', 'size':'11', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'} # Bottom vertical alignment for more space
axis_font = {'fontname':'Arial', 'size':'9'}

ax = plt.subplot() # Defines ax variable by creating an empty plot
# Set the tick labels font
for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

plt.title('Raw data and filtered data year 2018, Count per day, Andhra Pradesh ', title_font)

plt.plot('timestamp', 'count', data=df_2018_plantix, marker='', color='darkgreen', linewidth=0.8,linestyle='dotted', label='raw Plantix data (2018)') # dashed
#plt.plot('timestamp', 'count', data=df_fil_2018_unique_pla_id, marker='', color='grey', linewidth=0.8, linestyle='dotted', label='filtered data (2018): unique location (excluded multiple submissions and only 1 image per picture hunter submission') # removed duplicates
plt.plot('timestamp', 'count', data=df_fil_pla_id_ff_2018, marker='', color='blue', linewidth=0.8, linestyle='solid', label='filtered data (2018): detected as plant') # no other objects


#plt.xticks(rotation='vertical')
axes= plt.axes()
#axes.set_ylim([0, 8000])
#axes.set_yticks([500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000])


#locs, labels = xticks()            # Get locations and labels
#xticks(ticks, [1,2,3,4,5])

axes.set_xlim(['01-01', '12-30'])
axes.set_xticks(['01-01', '02-01', '03-01', '04-01', '05-01', '06-01', '07-01', '08-01', '09-01', '10-01', '11-01', '12-01'])
axes.set_xticklabels(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])

plt.ylim(ymin=0)
plt.xlim(xmin=0)  # should be 89 when 31.3 included xmax=88
plt.xlabel("Month", axis_font)
plt.ylabel("Count per day", axis_font)
#plt.legend()
plt.legend(loc=2, fontsize = 'x-small')
#plt.legend(loc='upper center', bbox_to_anchor=(0.5, 1.00), shadow=True, ncol=2)
#plt.tight_layout()
plt.show()

##########################################

plt.figure(figsize=(12, 3))
# Set the font dictionaries (for plot title and axis titles)
title_font = {'fontname':'Arial', 'size':'11', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'} # Bottom vertical alignment for more space
axis_font = {'fontname':'Arial', 'size':'9'}
ax = plt.subplot() # Defines ax variable by creating an empty plot
# Set the tick labels font
for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

#plt.plot('timestamp', 'count', data=df_fil_pla_id_ff_2017, marker='', color='blue', linewidth=0.5, linestyle='dashed', label='filtered data (2017): unique pla id, detected as crop, gatherix & plantix ') # no other objects
plt.plot('timestamp', 'count', data=df_fil_2017_pla_id_ff_plantix, marker='', color='blue', linewidth=0.8, linestyle='solid', label='filtered data (2017):unique pla id, detected as crop, only plantix') # no other objects

#plt.plot('timestamp', 'count', data=df_fil_pla_id_ff_2018, marker='', color='green', linewidth=0.5, linestyle='dashed', label='filtered data (2018): unique pla id, detected as crop, gatherix & plantix') # no other objects
plt.plot('timestamp', 'count', data=df_fil_2018_pla_id_ff_plantix, marker='', color='green', linewidth=0.8, linestyle='solid', label='filtered data (2018): unique pla id, detected as crop,only plantix') # no other objects

#plt.plot('timestamp', 'count', data=df_fil_pla_id_ff_2019, marker='', color='maroon', linewidth=0.5, linestyle='dashed', label='filtered data (2019): unique pla id, detected as crop, gatherix & plantix') # no other objects
plt.plot('timestamp', 'count', data=df_fil_2019_pla_id_ff_plantix, marker='', color='maroon', linewidth=0.8, linestyle='solid', label='filtered data (2019):unique pla id, detected as crop, only plantix') # no other objects


axes= plt.axes()
axes.set_ylim([0, 5000])
axes.set_yticks([500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000])
axes.set_xlim(['01-01', '12-30'])
#plt.xticks(rotation='vertical')
axes.set_xticks(['01-01', '02-01', '03-01', '04-01', '05-01', '06-01', '07-01', '08-01', '09-01', '10-01', '11-01', '12-01'])
axes.set_xticklabels(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])
plt.ylim(ymin=0)
plt.xlim(xmin=0)  # should be 89 when 31.3 included xmax=88
plt.title('Filtered data count per day for years 2017, 2018 & 2019 ', title_font)
plt.xlabel("Date", axis_font)
plt.ylabel("Count per day", axis_font)
plt.legend(loc=2, fontsize = 'x-small')

plt.show()

