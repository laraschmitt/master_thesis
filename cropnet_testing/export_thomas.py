import pandas as pd

path = '/Users/lara/thesis_data/PEAT_data/'

whole2017 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2017_whole_year.csv')
whole2018 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2018_whole_year.csv')
whole2019 = pd.read_csv('/Users/lara/thesis_data/PEAT_data/2019_whole_year.csv')

print('2017 total', len(whole2017))   # 508453 incl. gatherix
#print('2018 total', len(whole2018))   # 666193
#print('2019 total', len(whole2019))   # 393797

df_2017_plantix = whole2017[whole2017['app_name'].isin(['Plantix', 'Plantix Preview'])]
print('2017 only plantix',len(df_2017_plantix))  # 267050

df_2018_plantix = whole2018[whole2018['app_name'].isin(['Plantix', 'Plantix Preview'])]
#print('2018 only plantix',len(df_2018_plantix))  # 411846

df_2019_plantix = whole2019[whole2019['app_name'].isin(['Plantix', 'Plantix Preview'])]
#print('2019 only plantix',len(df_2019_plantix))  # 328104

################# drop duplicates ##################################
df_2017_plantix_unique_loc= df_2017_plantix.drop_duplicates(['pla_id'])
print('df_2017_plantix_unique_loc',len(df_2017_plantix_unique_loc)) # 189413

df_2018_plantix_unique_loc= df_2018_plantix.drop_duplicates(['pla_id'])
#print('df_2018_plantix_unique_loc',len(df_2018_plantix_unique_loc)) # 409975

df_2019_plantix_unique_loc= df_2019_plantix.drop_duplicates(['pla_id'])
#print('df_2019_plantix_unique_loc',len(df_2019_plantix_unique_loc)) # 327964



print(df_2017_plantix_unique_loc.head())
############################# FF ##################################

df_2017_ff= df_2017_plantix_unique_loc[df_2017_plantix_unique_loc['feedforward_integer'].isin([5, 4, 3])]
print('2017 plantix + detected as plant ',len(df_2017_ff)) # 114830

df_2018_ff= df_2018_plantix_unique_loc[df_2018_plantix_unique_loc['feedforward_integer'].isin([5, 4, 3])]
print('2018 plantix + detected as plant ',len(df_2018_ff)) #277735

df_2019_ff= df_2019_plantix_unique_loc[df_2019_plantix_unique_loc['feedforward_integer'].isin([5, 4, 3])]
print('2018 plantix + detected as plant ',len(df_2019_ff)) # 247360

print(df_2017_ff.head())

######################## EXPORT AS CSV ############################

df_2017_ff.to_csv(path + "AP_2017_fil_app_and_ff.csv", header=True,  index=False,
                  encoding='utf-8')

df_2018_ff.to_csv(path + "AP_2018_fil_app_and_ff.csv", header=True,  index=False,
                  encoding='utf-8')

df_2019_ff.to_csv(path + "AP_2019_fil_app_and_ff.csv", header=True,  index=False,
                  encoding='utf-8')