
import pandas as pd
import numpy as np

######################### load data ##############################################

whole2018 = pd.read_csv('<PATH_TO_CSV_FILE>')

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
df_timestamp_2018 = get_time_col_ny(whole2018)

############# filter function: only plantix
def get_plantix(df):   # WITHOUT GATHERIX
    df_filtered = df[df['app_name'].isin(['Plantix', 'Plantix Preview', 'com.peat.GartenBank', 'Plantix Huawei','com.peat.GartenBank.preview'])]
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

df_2018_plantix = get_plantix(whole2018)


def get_filtered_pla_id_ff(df_unique_pla_id):
    #df_unique_pla_id = df.drop_duplicates(['pla_id'])
    df_filtered = df_unique_pla_id[df_unique_pla_id['app_name'].isin(['Plantix', 'Plantix Preview'])]
    df_filtered2 = df_filtered[df_filtered['feedforward_integer'].isin([5, 4, 3])]
    df_fil = df_filtered2[['timestamp']]
    df_fil_copy = df_fil.copy()
    # add dummy column with 1 values
    df_fil_copy['count'] = 1
    # remove year and hours
    df_fil_copy['timestamp'] = df_fil_copy['timestamp'].str[5:10]
    # group by timestamp
    df_fil_group = df_fil_copy.groupby(['timestamp']).sum()
    df_fil_group = df_fil_group.reset_index()

    return df_fil_group

df_fil_pla_id_ff_2018 = get_filtered_pla_id_ff(whole2018)

####################### plot unfiltered data ##############################
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

plt.figure(figsize=(4, 3))

# Set the font dictionaries (for plot title and axis titles)
title_font = {'fontname':'Arial', 'size':'11', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'} # Bottom vertical alignment for more space
axis_font = {'fontname':'Arial', 'size':'9'}

ax = plt.subplot() # Defines ax variable by creating an empty plot
# Set the tick labels font
for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

#plt.title('Amount of plantix submissions per day in Andhra Pradesh in 2018', title_font)
plt.plot('timestamp', 'count', data=df_2018_plantix, marker='', color='black', linewidth=0.5,linestyle='dotted', label='raw data') # dashed
plt.plot('timestamp', 'count', data=df_fil_pla_id_ff_2018, marker='', color='blue', linewidth=0.5, linestyle='solid', label='filtered for images detected as plant') # no other objects


axes= plt.axes()
plt.tick_params(width = 0.5)
plt.setp(axes.spines.values(), linewidth=0.5)

axes.set_xlim(['01-01', '12-30'])
axes.set_xticks(['01-01', '02-01', '03-01', '04-01', '05-01', '06-01', '07-01', '08-01', '09-01', '10-01', '11-01', '12-01'])
axes.set_xticklabels(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])

plt.ylim(ymin=0)
plt.xlim(xmin=0)  # should be 89 when 31.3 included;  xmax=88
plt.xlabel("Month", axis_font)
plt.ylabel("Count per day", axis_font)

L=plt.legend(loc=2, fontsize='xx-small', labelspacing=0.2, framealpha=0.5)
L.get_texts()[0].set_text('raw data, 2018')
L.get_texts()[1].set_text('unique images detected as plant, 2018')

plt.subplots_adjust(left=0.2, bottom=0.15)

plt.savefig("<PATH_TO_PNG_FILE>", format="png", dpi=600)
plt.show()