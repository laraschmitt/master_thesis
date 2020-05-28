import pandas as pd
import matplotlib.pyplot as plt


# import datasets and merge
coarse_filtered_2017 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2017_clean_complete_EE_ready.csv')
coarse_filtered_2018 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2018_clean_complete_EE_ready.csv')
coarse_filtered_2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2019_clean_complete_EE_ready.csv')

# merge coarse_filtered datsets
frames1 = [coarse_filtered_2017, coarse_filtered_2018, coarse_filtered_2019]
result1 = pd.concat(frames1, ignore_index=True)
print('total length before  filter', len(result1)) #      147047


# extract id column and accuracy

df_1 = result1.copy()[['_id', 'accuracy', 'app_name']]
print('length before subset', len(df_1))


# after filtered for urban areas and roads

no_urban_2017 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/05_peat_aoi_time_uloc_ff_nourban_noroads_shapes/csvs/CSV_peat_2017_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2018 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/05_peat_aoi_time_uloc_ff_nourban_noroads_shapes/csvs/CSV_peat_2018_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2019 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/05_peat_aoi_time_uloc_ff_nourban_noroads_shapes/csvs/CSV_peat_2019_aoi_time_uloc_ff_nourban_noroads.csv')
frames2 = [no_urban_2017, no_urban_2018, no_urban_2019]
result2 = pd.concat(frames2, ignore_index=True)

print('total length  after filter', len(result2)) #    101400


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


######################################################################





# always put in here dataframe to plot
df = compared
#df = result1


#######################################################################################
# filter dataset
# drop all rows with accuracy = 100 (non valid anndroid location)
df.drop(df.loc[df['accuracy'] ==0].index, inplace=True)
print('length after kicking out 0 acc', len(df)) #

########################### PROBLEM CHECKING ####################################
# drop all rows that have accuracy value over 100 TEST
df.drop(df.loc[df['accuracy'] >100].index, inplace=True)
print('length after kicking out acc > 100', len(df)) #


# calculate urban/ non-urban percentages in the dataset of <100m
print('test',len(df.loc[df['non_urban'] == 2]))   # 13434/22531 = 59.7%   = URBAN
#
print('test2',len(df.loc[df['non_urban'] == 1]))  # 9097/22531  = 40.3%


# create range column as bin for histogram
range1 = range(1, 100)
for x in range1:
    df.loc[(df['accuracy'] >= x) & (df['accuracy'] < x+1), 'acc_range'] = x

########### create plot (1m - 100m, gatherix and plantix #################################

my_colors = ['green', 'red']

df.groupby(['acc_range', 'non_urban']).size().unstack().plot(kind='bar',stacked=True, figsize = (4,3), colors = my_colors)


title_font = {'fontname': 'Arial', 'size': '9', 'color': 'black', 'weight':'normal',
  'verticalalignment': 'bottom'} # Bottom vertical alignment for more space



#plt.title('Distribution of GPS accuracy before urban filter applied', title_font)
#plt.title('Distribution of GPS accuracy in rural and urban areas', title_font)



axes= plt.axes()
plt.tick_params(width = 0.5)
plt.setp(axes.spines.values(), linewidth=0.5)




# ticks
axes.set_yticks([250, 500, 760, 1000, 1250, 1500, 1750])
axes.set_yticklabels(['', '500', '', '1000', '', '1500', ''])

#axes.set_xticks([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
axes.set_xticks([9, 19, 29, 39, 49, 59, 69, 79, 89, 99])
axes.set_xticklabels(['10\u2009m', '20\u2009m', '30\u2009m', '40\u2009m', '50\u2009m', '60\u2009m', '70\u2009m', '80\u2009m', '90\u2009m', '100\u2009m'])
plt.xticks(rotation='horizontal')
ax = plt.subplot() # Defines ax variable by creating an empty plot
# Set the tick labels font
for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)
# labels
axis_font = {'fontname':'Arial', 'size':'9'}
plt.xlabel("Accuracy", axis_font)
plt.ylabel("Submission count", axis_font)
# legend

L=plt.legend(loc=1, fontsize='x-small', labelspacing=0.2, framealpha=0.5)

L.get_texts()[0].set_text('rural areas, Jan-March 2017-2019')
L.get_texts()[1].set_text('urban areas, Jan-March 2017-2019')
#plt.legend(loc=1, fontsize = 'x-small')

plt.subplots_adjust(left=0.15, bottom=0.15)
plt.savefig("/Users/lara/thesis_data/pyplots/GPS_rural_urban_allyears.png", format="png", dpi = 600)

plt.show()


