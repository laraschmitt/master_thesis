
import pandas as pd

# import results josn
acc_range_results = pd.read_json('/Users/lara/thesis_data/PEAT_data/acc_range_50_100_results.json')

acc_range_results.to_csv("/Users/lara/thesis_data/PEAT_data/acc_range_50_100_results.csv", header=True,  index=False, encoding='utf-8')

#print(acc_range_results.head())
print(len(acc_range_results)) # 4200

# drop null crows
#df = acc_range_results[acc_range_results.predicate != 'None']
df = acc_range_results.dropna()
print(len(df))  # 3574

# group by crop and acc_range
groups = df.groupby(['dnn_variety_0', 'acc_range'])
print(groups.head())


# get group

# for every crop, for every acc_range:
bean_90 = df.groupby(['dnn_variety_0', 'acc_range']).get_group(('BEAN', 90.0))
# print(bean_90.describe().head())

# calculate the share of correctly detected images
bean_90_count_correct = bean_90['predicate'].value_counts(1) # 1 = normalizes: relative frequency of the values
print('count correct', bean_90_count_correct)
print(type(bean_90_count_correct))  # pandas series


# need to iterate over the groups and acc range (2 levels)
# and then write new dataframe
# give always a new name like : take "BEAN" and add 90" -> write that in row 1 and put in the next column the count correct


# define final dataframe for collecting results and later export
final_df = pd.DataFrame(columns={'Crop': [],
                           'Range_50_60': [],
                           'Range_60_70': [],
                           'Range_70_80': [],
                           'Range_80_90': [],
                           'Range_90_100': []
                           })
# check columnn names
print(list(final_df))

# function to extract share of correctly detected images per range step per crop

for crop_name in df.dnn_variety_0.unique():
    #print(crop_name)

    df_subset_50_total_size = (df.acc_range.loc[(df.acc_range == 50.0) & (df.dnn_variety_0 == crop_name)]).size
    df_subset_50_correct_size = (df.predicate.loc[(df.acc_range == 50.0) & (df.dnn_variety_0 == crop_name) & (df.predicate == '1')]).size
    share_50 = df_subset_50_correct_size/df_subset_50_total_size

    df_subset_60_total_size = (df.acc_range.loc[(df.acc_range == 60.0) & (df.dnn_variety_0 == crop_name)]).size
    df_subset_60_correct_size = (df.predicate.loc[(df.acc_range == 60.0) & (df.dnn_variety_0 == crop_name) & (df.predicate == '1')]).size
    share_60 = df_subset_60_correct_size/df_subset_50_total_size

    df_subset_70_total_size = (df.acc_range.loc[(df.acc_range == 70.0) & (df.dnn_variety_0 == crop_name)]).size
    df_subset_70_correct_size = (df.predicate.loc[(df.acc_range == 70.0) & (df.dnn_variety_0 == crop_name) & (df.predicate == '1')]).size
    share_70 = df_subset_70_correct_size/df_subset_70_total_size

    df_subset_80_total_size = (df.acc_range.loc[(df.acc_range == 80.0) & (df.dnn_variety_0 == crop_name)]).size
    df_subset_80_correct_size = (df.predicate.loc[(df.acc_range == 80.0) & (df.dnn_variety_0 == crop_name) & (df.predicate == '1')]).size
    share_80 = df_subset_80_correct_size/df_subset_80_total_size

    df_subset_90_total_size = (df.acc_range.loc[(df.acc_range == 90.0) & (df.dnn_variety_0 == crop_name)]).size
    df_subset_90_correct_size = (df.predicate.loc[(df.acc_range == 90.0) & (df.dnn_variety_0 == crop_name) & (df.predicate == '1')]).size
    share_90 = df_subset_90_correct_size/df_subset_90_total_size


    final_df = final_df.append({'Crop': crop_name,
                'Range_50_60': share_50,
                'Range_60_70': share_60,
                'Range_70_80': share_70,
                'Range_80_90': share_80,
                'Range_90_100': share_90,
                            }, ignore_index=True)

# write to csv
final_df.to_csv("/Users/lara/thesis_data/PEAT_data/acc_testing_shares.csv", header=True,  index=False, encoding='utf-8')
