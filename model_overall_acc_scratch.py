import matplotlib.pyplot as plt
from scipy import stats
import numpy as np

#plt.style.use('seaborn-whitegrid')
fig, ax = plt.subplots(figsize=(6, 4))
plt.grid(color='lightgrey', linestyle='-', linewidth=0.8)

title_font = {'fontname':'Arial', 'size':'9', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'}

plt.title('2017', title_font)
ax.errorbar(86.87, 1, xerr=(1.35) / 2,
            fmt='.', elinewidth=0.9, markersize=8, capsize=5,capthick = 1, label='model DNN 50 ACC 100\'s', color='k')

ax.set_ylim(-0.6, 1.6)
#ax.legend(loc='best', fontsize=11, framealpha=1, frameon=True)

# labels
axis_font = {'fontname':'Arial', 'size':'9'}
plt.xlabel('area-adjusted OA [95% CI]', axis_font)
plt.ylabel("feature subset", axis_font)

ax.set_xticks([85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95])
ax.set_xticklabels(['85', '', '', '', '', '90', '', '', '', '', '95'])

ax.set_yticks([0,1,2,3,4,5,6,7,8])
ax.set_yticklabels(['2019 only Plantix sub., DNN ≥ 80%, acc ≤ 10m', '2017 sub., DNN ≥ 80%, acc ≤ 10m', '2017 - 2019 sub., major crops, DNN ≥ 80%, acc ≤ 10m', '2017 - 2019 sub., DNN ≥ 80%, acc ≤ 10m', '2017 - 2019 sub., DNN ≥ 80%, acc ≤ 30m', '2017 - 2019 sub., DNN ≥ 80%, acc ≤ 100m', '2017 - 2019 sub., DNN ≥ 50%, acc ≤ 10m', '2017 - 2019 sub., DNN ≥ 50%, acc ≤ 30m',  '2017 - 2019 sub., DNN ≥ 50%, acc ≤ 100m'])

foo = fig.add_subplot(2,3,1)
foo.text(0.5, 0.5, str((2, 3, 4)), fontsize=18, ha='center')
plt.title('2019', title_font)
foo.set_yticks([0,1,2,3,4,5,6,7,8])

foo2 = fig.add_subplot(2, 3, 2)
foo3 = fig.add_subplot(2, 3, 3)

for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)
fig.subplots_adjust(left=0.3)
#ax.yaxis.set_major_formatter(plt.NullFormatter())
#fig.tight_layout();







plt.savefig("/Users/lara/thesis_data/pyplots/overall_acc.png", format="png", dpi = 600)
plt.show()
