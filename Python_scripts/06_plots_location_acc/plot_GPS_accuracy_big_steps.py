#### GPS ACCURACY BARPLOT GET COUNTS
import matplotlib.pyplot as plt
import pandas as pd

path = '<PATH_TO_DATA_FOLDER>'

# import datasets and merge
coarse_filtered_2017 = pd.read_csv(path + '2017_clean_complete_EE_ready.csv')
coarse_filtered_2018 = pd.read_csv(path + '2018_clean_complete_EE_ready.csv')
coarse_filtered_2019 = pd.read_csv(path + '2019_clean_complete_EE_ready.csv')

# merge coarse_filtered datsets
frames1 = [coarse_filtered_2017, coarse_filtered_2018, coarse_filtered_2019]
result1 = pd.concat(frames1, ignore_index=True)

df = result1
total_l = len(df)
print('total data count ',len(df)) #147047

#### filter for count of gatherix share
df_100 = df[(df.accuracy <= 20000)]
print('df 100', len(df_100))   # 17617

df_gatherix_0 = df[(df.app_name == 'Gatherix') & (df.accuracy == 0)]
print('gatherix 0 len', len(df_gatherix_0))   # 1

df_plantix_0 = df[(df.app_name.isin(['com.peat.GartenBank', 'Plantix Preview', 'Plantix', 'Plantix Internal'])) & (df.accuracy == 0)]
print('plantix 0 len', len(df_plantix_0))   # 13426

df_gatherix_10 = df[(df.app_name == 'Gatherix') & (df['accuracy'] >= 0.01) & (df['accuracy'] <= 10)]
print('gatherix 10 len', len(df_gatherix_10))   #

df_plantix_10 = df[(df.app_name.isin(['com.peat.GartenBank', 'Plantix Preview', 'Plantix', 'Plantix Internal'])) & (df['accuracy'] >= 0.01) & (df['accuracy'] <= 10)]
print('plantix 10 len', len(df_plantix_10))   #

df_gatherix_30 = df[(df.app_name == 'Gatherix') & (df['accuracy'] >= 10) & (df['accuracy'] <= 30)]
print('gatherix 30 len', len(df_gatherix_30))  #

df_plantix_30 = df[(df.app_name.isin(['com.peat.GartenBank', 'Plantix Preview', 'Plantix', 'Plantix Internal'])) & (df['accuracy'] >= 10) & (df['accuracy'] <= 30)]
print('plantix 30 len', len(df_plantix_30))   #

df_gatherix_100 = df[(df.app_name == 'Gatherix') & (df['accuracy'] >= 30) & (df['accuracy'] <= 100)]
print('gatherix 100 len', len(df_gatherix_100))  #

df_plantix_100 = df[(df.app_name.isin(['com.peat.GartenBank', 'Plantix Preview', 'Plantix', 'Plantix Internal'])) & (df['accuracy'] >= 30) & (df['accuracy'] <= 100)]
print('plantix 100 len', len(df_plantix_100))   #

df_gatherix_4000 = df[(df.app_name == 'Gatherix') & (df.accuracy > 100)]
print('gatherix 4000 len', len(df_gatherix_4000))  #

df_plantix_4000 = df[(df.app_name.isin(['com.peat.GartenBank', 'Plantix Preview', 'Plantix', 'Plantix Internal'])) & (df.accuracy > 100)]
print('plantix 4000 len', len(df_plantix_4000))   #

# check how many submisions have an accuracy below 100m and over 0.00 (non-valid)
betw_1_10 = len(df.loc[(df['accuracy'].between(0.1, 10.0))])
print(betw_1_10)
betw_10_30 = len(df.loc[(df['accuracy'].between(10.000001, 30.0))])
print(betw_10_30)
betw_30_100 = len(df.loc[(df['accuracy'].between(30.00001, 100.0))])
print(betw_30_100)
betw_100_4000 = len(df.loc[(df['accuracy'].between(100.1, 10000))])
print(betw_100_4000)
no_acc = len(df.loc[df['accuracy'] == 0.00])
print(no_acc)

# calculate share of total
print('share 1-10', (betw_1_10/total_l))
print('share 10-30', (betw_10_30/total_l))
print('share 30-100', (betw_30_100/total_l)) 
print('share 100-4000', (betw_100_4000/total_l)) 
print('share no acc', (no_acc/total_l))  

# create overview plot (3 bins)
df.loc[(df['accuracy'] == 0.00), 'coarse_acc_range'] = 5

no_acc = len(df.loc[df['accuracy'] == 0.00])
print(no_acc) # 13428

df.loc[(df['accuracy'] >= 0.001) & (df['accuracy'] <= 10), 'coarse_acc_range'] = 1
print(len(df.loc[df['coarse_acc_range'] == 1]))


df.loc[(df['accuracy'] >= 0.001) & (df['accuracy'] <= 30), 'coarse_acc_range'] = 2
print(len(df.loc[df['coarse_acc_range'] == 2]))
df.loc[(df['accuracy'] >= 0.001) & (df['accuracy'] <= 100), 'coarse_acc_range'] = 3
print(len(df.loc[df['coarse_acc_range'] == 3]))
df.loc[(df['accuracy'] >= 0.001) & (df['accuracy'] <= 10000), 'coarse_acc_range'] = 4
print(len(df.loc[df['coarse_acc_range'] == 4]))

counts = df['coarse_acc_range'].value_counts()
print('counts', counts)

value_counts = [13396, 24031, 35093, 133338, 13428 ]
index = ['≤ 10m', '≤ 30m', '≤ 100m',
        '≤ 4000m', 'no accuracy']
df = pd.DataFrame({'value_counts': value_counts  }, index=index)
ax = df.plot.bar(rot=0, color = 'royalblue', width=0.85, figsize = (6,4))
axis_font = {'fontname':'Arial', 'size':'9'}
plt.xlabel("Accuracy", axis_font)
plt.ylabel("Submission count", axis_font)
for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)
ax.get_legend().remove()

plt.savefig('<PATH_TO_PNG_FILE>', format="png", dpi = 600)
plt.show()

