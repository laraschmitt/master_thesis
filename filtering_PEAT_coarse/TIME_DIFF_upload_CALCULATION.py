### TEST CREATE TIME DIFFERENCE COLUMN:
import pandas as pd
#work2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2019_AP_jan_march_district_acc_date_userid.csv')
work2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2018_AP_jan_march_district_acc_date_userid.csv')
#work2019 = pd.read_csv('/Users/lara/thesis_data/work_PEAT_data/2017_AP_jan_march_district_acc_date_userid.csv')

df_2019 = work2019.copy()
print(len(df_2019))

# create new clean photo taken time column
filename_date_format = '%Y%m%d_%H%M%S'

# Need to remove weirdly named filenames
indexes = df_2019[df_2019['filename'].str.contains('PEATpI')].index
df_2019 = df_2019.drop(indexes)

df_2019['photo_taken'] = pd.to_datetime(df_2019['filename'].str[5:20], format=filename_date_format)
df_2019['date'] = pd.to_datetime(df_2019['date'], format=filename_date_format)

df_2019['photo'] = df_2019['date'].apply(lambda x: pd.Timestamp(x))
df_2019['date'] = df_2019['date'].apply(lambda x: pd.Timestamp(x))

df_2019['time_diff'] = (df_2019['date'] - df_2019['photo_taken']).astype('timedelta64[m]')


## TEST ATTACH IMAGE FROM LIBRARY ATTRIBUTE


fil3 = df_2019[df_2019['time_diff'] > 3.00]
fil5 = df_2019[df_2019['time_diff'] > 5.00]
fil10 = df_2019[df_2019['time_diff'] > 10.00]

print(len(fil3))
print(len(fil5))
print(len(fil10))



