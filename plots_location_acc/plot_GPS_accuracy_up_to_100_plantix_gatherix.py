#### GPS ACCURACY BARPLOT
# (so far with whole dataset, needs to be replaced with filtered dataset)

# and in text comparision of counts (of whole unique dataset with filtered ones -> to see if there
# are then signigicnantly more valid accurcary values (because WIFI in cities) // !?

import matplotlib.pyplot as plt
import matplotlib.ticker as mtick
import pandas as pd

# import datasets and merge
coarse_filtered_2017 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2017_clean_complete_EE_ready.csv')
coarse_filtered_2018 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2018_clean_complete_EE_ready.csv')
coarse_filtered_2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/02_coarse_filtered_python/2019_clean_complete_EE_ready.csv')

# merge coarse_filtered datsets
frames1 = [coarse_filtered_2017, coarse_filtered_2018, coarse_filtered_2019]
result1 = pd.concat(frames1, ignore_index=True)
print('total length before  filter', len(result1)) #      147047

# after filtered for urban areas and roads

no_urban_2017 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/05_peat_aoi_time_uloc_ff_nourban_noroads_shapes/csvs/CSV_peat_2017_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2018 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/05_peat_aoi_time_uloc_ff_nourban_noroads_shapes/csvs/CSV_peat_2018_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2019 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/05_peat_aoi_time_uloc_ff_nourban_noroads_shapes/csvs/CSV_peat_2019_aoi_time_uloc_ff_nourban_noroads.csv')
frames2 = [no_urban_2017, no_urban_2018, no_urban_2019]
result2 = pd.concat(frames2, ignore_index=True)

print('total length  after filter', len(result2)) #    101400   --> 68.9% non-urban datapoints


##################''''!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'####################################


# always put in here dataframe to plot
df = result2
#df = coarse_filtered_2017
#df = coarse_filtered_2018
#df = coarse_filtered_2019


#######################################################################################
# filter dataset
# drop all rows with accuracy = 100 (non valid anndroid location)
df.drop(df.loc[df['accuracy'] ==0].index, inplace=True)
print('length after kicking out 0 acc', len(df)) #

########################### PROBLEM CHECKING ####################################
# drop all rows that have accuracy value over 100 TEST
df.drop(df.loc[df['accuracy'] >100].index, inplace=True)
print('length after kicking out acc > 100', len(df)) #
#df.to_csv("/Users/lara/thesis_data/acc_check_100_python.csv", header=True,  index=False, encoding='utf-8')

# lenght of dataframe before/after urban filter and acc <= 100
print('total count to report', len(df))  #
print('lenght <= 100', len(df[df['accuracy'] <= 100]))   # 9097
print('lenght <= 30', len(df[df['accuracy'] <= 30]))    #  7201
print('lenght <= 10', len(df[df['accuracy'] <= 10]))    # 4900



    #### filter for count of gatherix share
df_100 = df[(df.accuracy <= 100)]
print('df 100', len(df_100))   # 17617

df_gatherix_100 = df[(df.app_name == 'Gatherix') & (df.accuracy <= 100)]
print('gatherix 100 len', len(df_gatherix_100))   # 992/9097  = 10.9%

df_gatherix_10 = df[(df.app_name == 'Gatherix') & (df.accuracy <= 10)]
print('gatherix 10 len', len(df_gatherix_10))  # 770/9097 = 8.4%




# replace app_name (plantix varieties with only plantix)
# so that in the stack plantix is at the bottom --> is done by alphatical order
df["app_name"] = df["app_name"].replace(('com.peat.GartenBank', 'Plantix Preview', 'Plantix', 'Plantix Internal'), 'A')
df["app_name"] = df["app_name"].replace('Gatherix', 'B')


# create range column as bin for histogram
range1 = range(1, 100)
for x in range1:
    df.loc[(df['accuracy'] >= x) & (df['accuracy'] < x+1), 'acc_range'] = x

print('test', len(df.loc[df['acc_range'] <= 11]))


########### create plot (1m - 100m, gatherix and plantix #################################



my_colors = ['royalblue', 'darkorange']

df.groupby(['acc_range','app_name']).size().unstack().plot(kind='bar',stacked=True, figsize = (4,3), colors = my_colors)


title_font = {'fontname':'Arial', 'size':'9', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'} # Bottom vertical alignment for more space



#plt.title('Distribution of GPS accuracy before urban filter applied', title_font)
#plt.title('Distribution of GPS accuracy after urban filter applied', title_font)


axes= plt.axes()
plt.tick_params(width = 0.5)
plt.setp(axes.spines.values(), linewidth=0.5)

# ticks
axes.set_yticks([250, 500, 760, 1000, 1250, 1500, 1750])
axes.set_yticklabels(['', '500', '', '1000', '', '1500', ''])

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
L.get_texts()[0].set_text('Plantix, Jan-March 2017 - 2019')
L.get_texts()[1].set_text('Gatherix, Jan-March 2017 - 2019')

plt.subplots_adjust(left=0.15, bottom=0.15)
plt.savefig("/Users/lara/thesis_data/pyplots/GPS_plantix_gatherix_allyears.png", format="png", dpi = 600)
#plt.savefig("/Users/lara/thesis_data/pyplots/GPS_plantix_gatherix_2017.png", format="png", dpi = 600)
#plt.savefig("/Users/lara/thesis_data/pyplots/GPS_plantix_gatherix_2018.png", format="png", dpi = 600)
#plt.savefig("/Users/lara/thesis_data/pyplots/GPS_plantix_gatherix_2019.png", format="png", dpi = 600)

plt.show()


