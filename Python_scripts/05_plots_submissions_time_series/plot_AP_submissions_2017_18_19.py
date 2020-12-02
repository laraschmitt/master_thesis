import pandas as pd

whole2017 = pd.read_csv('<PATH_TO_CSV_FILE>')
whole2018 = pd.read_csv('<PATH_TO_CSV_FILE>')
whole2019 = pd.read_csv('<PATH_TO_CSV_FILE>')
jan2020 = pd.read_csv('<PATH_TO_CSV_FILE>')
#print('2017 total', len(whole2017))   
#print('2018 total', len(whole2018))   
#print('2019 total', len(whole2019))   


df_2017_plantix = whole2017[whole2017['app_name'].isin(['Plantix', 'Plantix Preview', 'com.peat.GartenBank', 'Plantix Huawei','com.peat.GartenBank.preview'])]
#print('2017 only plantix',len(df_2017_plantix))  

df_2018_plantix = whole2018[whole2018['app_name'].isin(['Plantix', 'Plantix Preview', 'com.peat.GartenBank', 'Plantix Huawei','com.peat.GartenBank.preview'])]
#print('2018 only plantix',len(df_2018_plantix))  

df_2019_plantix = whole2019.loc[(whole2019['app_name'].isin(['Plantix', 'Plantix Preview', 'com.peat.GartenBank', 'Plantix Huawei', 'com.peat.GartenBank.preview']))]
#print('2019 only plantix',len(df_2019_plantix))  

df_2020_plantix = jan2020[jan2020['app_name'].isin(['Plantix', 'Plantix Preview',  'com.peat.GartenBank', 'Plantix Huawei','com.peat.GartenBank.preview'])]

################# drop duplicates ##################################
df_2017_plantix_unique_loc= df_2017_plantix.drop_duplicates(['pla_id'])
#print('df_2017_plantix_unique_loc',len(df_2017_plantix_unique_loc)) 

df_2018_plantix_unique_loc= df_2018_plantix.drop_duplicates(['pla_id'])
#print('df_2018_plantix_unique_loc',len(df_2018_plantix_unique_loc)) 

df_2019_plantix_unique_loc= df_2019_plantix.drop_duplicates(['pla_id'])
#print('df_2019_plantix_unique_loc',len(df_2019_plantix_unique_loc)) 

df_2020_plantix_unique_loc= df_2020_plantix.drop_duplicates(['pla_id'])

############################# filte for feed forward integer ##################################

df_2017_ff= df_2017_plantix_unique_loc[df_2017_plantix_unique_loc['feedforward_integer'].isin([5, 4, 3])]
print('2017 plantix + detected as plant ',len(df_2017_ff)) # 114830

df_2018_ff= df_2018_plantix_unique_loc[df_2018_plantix_unique_loc['feedforward_integer'].isin([5, 4, 3])]
print('2018 plantix + detected as plant ',len(df_2018_ff)) #277735

df_2019_ff= df_2019_plantix_unique_loc[df_2019_plantix_unique_loc['feedforward_integer'].isin([5, 4, 3])]
print('2018 plantix + detected as plant ',len(df_2019_ff)) # 247360

df_2020_ff= df_2020_plantix_unique_loc[df_2020_plantix_unique_loc['feedforward_integer'].isin([5, 4, 3])]
#######################################################################
##### GROUP DFs BY TIMESTAMP

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

plot_df_2017 = get_time_col_ny(df_2017_ff)
plot_df_2018 = get_time_col_ny(df_2018_ff)
plot_df_2019 = get_time_col_ny(df_2019_ff)
plot_df_2020 = get_time_col_ny(df_2020_ff)

#######################################################
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

#plt.title('Amount of plantix submissions (filtered for detected as plant ) per day in Andra Pradesh in 2017 - 2019', title_font)
plt.plot('timestamp', 'count', data=plot_df_2017, marker='', color='green', linewidth=0.5, linestyle='solid', label='2017') # no other objects
plt.plot('timestamp', 'count', data=plot_df_2018, marker='', color='blue', linewidth=0.5, linestyle='solid', label='2018') # no other objects
plt.plot('timestamp', 'count', data=plot_df_2019, marker='', color='maroon', linewidth=0.5, linestyle='solid', label='2019') # no other objects
plt.plot('timestamp', 'count', data=plot_df_2020, marker='', color='black', linewidth=0.5, linestyle='solid', label='2020') # no other objects


axes= plt.axes()
plt.tick_params(width = 0.5)
plt.setp(axes.spines.values(), linewidth=0.5)

axes.set_xlim(['01-01', '12-30'])
axes.set_xticks(['01-01', '02-01', '03-01', '04-01', '05-01', '06-01', '07-01', '08-01', '09-01', '10-01', '11-01', '12-01'])
axes.set_xticklabels(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])

plt.ylim(ymin=0)
plt.xlim(xmin=0)  # should be 89 when 31.3 included xmax=88
plt.xlabel("Month", axis_font)
plt.ylabel("Count per day \n (unique images detected as plant)", axis_font)
#plt.legend()
#plt.legend(loc=2, fontsize = 'x-small')
#plt.legend(loc='upper center', bbox_to_anchor=(0.5, 1.00), shadow=True, ncol=2)
#plt.tight_layout()

L=plt.legend(loc=9, fontsize='xx-small', labelspacing=0.2, framealpha=0.5)
L.get_texts()[0].set_text('2017')
L.get_texts()[1].set_text('2018')
L.get_texts()[2].set_text('2019')
L.get_texts()[3].set_text('2020')
plt.subplots_adjust(left=0.2, bottom=0.15)

plt.savefig("<PATH_TO_PNG_FILE>", format="png", dpi=600)
plt.show()