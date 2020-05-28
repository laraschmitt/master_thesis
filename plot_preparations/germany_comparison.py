import pandas as pd


df = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2017_2019_GERMANY.csv')
#df = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2019_whole_year_AP-filtered.csv')
print(len(df))
print(df.head())

print('df_0 len', len(df[(df.accuracy == 0)])) # 7064/91588 = 7.7%
print('df_10 len', len(df[(df['accuracy'] >= 0.01) & (df['accuracy'] <= 10)])) # 7935 8.6%
print('df_30 len', len(df[(df['accuracy'] > 10) & (df['accuracy'] <= 30)])) # 7935   = 8.6%
print('df_100 len', len(df[(df['accuracy'] > 30) & (df['accuracy'] <= 100)])) # 8234  = 8.9%
print('df_1000 len', len(df[(df['accuracy'] > 100) & (df['accuracy'] <= 1000)])) # 8085  = 8.8%
print('df_gt1000 len', len(df[(df['accuracy'] > 1000)])) # 53908   = 58.9%



'''
INDIA 2018:RAW
df_0 len 428822
df_10 len 1730
df_30 len 3631
df_100 len 5003
df_1000 len 6180
df_gt1000 len 43832

GERMANY:
df_0 len 38505
valid acc values for 2017-2019
df_10 len 510
df_30 len 18651
df_100 len 3464
df_1000 len 1898
df_gt1000 len 1387


'''