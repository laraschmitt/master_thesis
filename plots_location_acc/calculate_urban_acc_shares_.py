import pandas as pd
import matplotlib.pyplot as plt


# import datasets and merge
coarse_filtered_2017 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2017_clean_complete_EE_ready.csv')
coarse_filtered_2018 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2018_clean_complete_EE_ready.csv')
coarse_filtered_2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2019_clean_complete_EE_ready.csv')

# merge coarse_filtered datsets
frames1 = [coarse_filtered_2017, coarse_filtered_2018, coarse_filtered_2019]
result1 = pd.concat(frames1, ignore_index=True)
print('total length before  filter', len(result1)) #      147047


# extract id column and accuracy

df_1 = result1.copy()[['_id', 'accuracy', 'app_name']]
print('length before subset', len(df_1))


# after filtered for urban areas and roads

no_urban_2017 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/peat_aoi_time_uloc_ff_nourban_noroads_shapes/CSV_peat_2017_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2018 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/peat_aoi_time_uloc_ff_nourban_noroads_shapes/CSV_peat_2018_aoi_time_uloc_ff_nourban_noroads.csv')
no_urban_2019 = pd.read_csv(
    '/Users/lara/thesis_data/work_PEAT_data/peat_aoi_time_uloc_ff_nourban_noroads_shapes/CSV_peat_2019_aoi_time_uloc_ff_nourban_noroads.csv')
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
compared = merged[~(merged.key2 == merged.key1)]
compared = compared.drop(['key1','key2'], axis=1)
# reset index
compared = compared.reset_index()


# rename accuracy_x column back to accuracy
compared.rename(columns={'accuracy_x':'accuracy'}, inplace=True)
compared.rename(columns={'app_name_x':'app_name'}, inplace=True)
print('urban_points len', len(compared)) ## 45647 urban points   --> 31.1% of the dataset


############################################################

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
#df.to_csv("/Users/lara/thesis_data/acc_check_100_python.csv", header=True,  index=False, encoding='utf-8')

# lenght of dataframe before/after urban filter and acc <= 100
print('total count to report', len(df))  #
print('lenght <= 100', len(df[df['accuracy'] <= 100]))   # 35096   17617   # URBAN: 17479
print('lenght <= 30', len(df[df['accuracy'] <= 30]))    # 24034    14859   # URBAN: 9175
print('lenght <= 10', len(df[df['accuracy'] <= 10]))    # 13399    11069   # URBAN: 2330

# length df of points <100m 17479 / total length URBAN 45647 ---> 38.3%  of the URBAN datapoints have an
# # accuracy of <= 100 m, better mobile signals in cities


# 30: 20.01 %
# 10:  5%