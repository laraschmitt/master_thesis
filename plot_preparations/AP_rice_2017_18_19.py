
############## DATA FOR RICE PLOT #########################
import pandas as pd

whole2017 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2017_whole_year.csv')
whole2018 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2018_whole_year.csv')
whole2019 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2019_whole_year.csv')

df_2017 = whole2017.copy()
df_2018 = whole2018.copy()
df_2019 = whole2019.copy()

df_0 = df_2017.append(df_2018, ignore_index=True)
df = df_0.append(df_2019, ignore_index=True)

#print('total', len(df))   # 1568443
# filter for rice

# extract rice column

df_rice = df[df['dnn_variety'] == 'RICE'] # 274203


path = '/Users/lara/thesis_data/PEAT_data/'
df_rice.to_csv(path + "AP_rice_2017_18_19.csv", header=True,  index=False,
                  encoding='utf-8')