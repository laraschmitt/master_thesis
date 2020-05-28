
import pandas as pd
df = pd.read_csv('/Users/lara/thesis_data/plantix_country_stats_2019.csv')

print(df.head())

print('sum', df.sum(axis = 0))  # 23046466

def divide(count):
    return count/23046466

df['percentage_of_total'] = df['count'].map(divide)



df_sorted = df.sort_values(by=['percentage_of_total'], ascending=False)
print(df_sorted.head(10))

'''
90   IN  16555417             0.718349 India
14   BD   1264270             0.054857 Bangladesh
156  PK   1232422             0.053476 Pakistan
25   BR   1044615             0.045326 Brazil
55   EG    578956             0.025121 Egypt

top 5: 90%

52   DZ    534607             0.023197 Algeria
91   IQ    325122             0.014107 Iraq
120  MA    278681             0.012092 Morocco
196  TN    160559             0.006967 Tunisia
97   JO    132331             0.005742 Jordan

'''

print(0.718349 + 0.054857 + 0.053476 + 0.045326 + 0.025121)