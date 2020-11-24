import matplotlib.pyplot as plt
import numpy as np

########################## SCARCE ZONE ############################################################################

fig = plt.figure(figsize=(8,2))
axis_font = {'fontname': 'Arial', 'size': '10', 'weight': 'light'}
tick_font = {'fontname': 'Arial', 'size': '7', 'weight': 'light'}
plt.axis('off')

title_font = {'fontname':'Arial', 'size':'9', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'}
#plt.title('2017', title_font)
plt.yticks([])
plt.xticks([])

###############################################################################################################

plot_cropped = fig.add_subplot(2,5,1)
plot_cropped.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.errorbar(77.88, 1, xerr=3.23,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  label = 'PA', color='g') # prod acc_model 2018 bestestime
plt.errorbar(94.00, 1, xerr=4.68,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  label ='UA', color='b') # user acc_model 2018 bestestimate
plt.errorbar(74.47, 0, xerr=4.53,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # prod acc_model 2018 fused
plt.errorbar(84.00, 0, xerr=7.22,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # user acc_model 2018 fused

plt.margins(y=0.5, x =0.15)
plt.yticks([0,1], ['(8) best loc. estimate (2400)', '(6) ≥ 80%, ≤ 10m (6400)'])
plt.ylabel("SOUTH", axis_font,  labelpad = 8)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_cropped.get_xticks()[:-1])

for label in (plot_cropped.get_xticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(5.5)

for label in (plot_cropped.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

L=plt.legend(loc ='lower center', bbox_to_anchor=(0.55, -0.70), fontsize='small', labelspacing=0.2, framealpha=0.0, ncol = 2, borderpad = 0.9)

###############################################################################################################

plot_water = fig.add_subplot(2, 5, 2)

plt.errorbar(100.00, 1, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused
plt.errorbar(99.9, 1, xerr=np.array([[0 , 0]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused
plt.errorbar(100.00, 0, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused
plt.errorbar(99.9, 0, xerr=np.array([[0 , 0]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused

plot_water.grid(b = True, color='lightgray', linestyle='-', linewidth=0.5, axis='both')

plt.margins(y=0.5)
plt.yticks([0,1])
plot_water.yaxis.set_ticks_position('none')

for label in (plot_water.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_water.get_xticks()[:-1])

for label in (plot_water.get_xticklabels() + plot_water.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(5.5)

###############################################################################################################

plot_urban = fig.add_subplot(2, 5, 3)

plt.errorbar(90.32, 1, xerr=np.array([[8.47 , 8.47]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 bestestime
plt.errorbar(90.00, 1,xerr=8.40,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 bestestimate
plt.errorbar(75.56, 0, xerr=17.48,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused
plt.errorbar(92.00, 0, xerr=7.6,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused

plot_urban.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.margins(y=0.5)
plt.yticks([0,1])
plot_urban.yaxis.set_ticks_position('none')
for label in (plot_urban.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_urban.get_xticks()[:-1])

for label in (plot_urban.get_xticklabels() + plot_urban.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(5.5)
plt.xlabel('class accuracy', axis_font, labelpad = 10)

###############################################################################################################

plot_woody = fig.add_subplot(2, 5, 4)

plt.errorbar(84.7, 1, xerr=np.array([[18.04 , 12]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 bestestime\'s'
plt.errorbar(34.00, 1, xerr=np.array([[12 , 12]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 bestestimate\'s'
plt.errorbar(79.20, 0, xerr=17.62,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused\'s'
plt.errorbar(36.00, 0, xerr=13.44,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused\'s'

plot_woody.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.margins(y=0.5)
plt.yticks([0,1])
plot_woody.yaxis.set_ticks_position('none')
for label in (plot_woody.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_woody.get_xticks()[:-1])

for label in (plot_woody.get_xticklabels() + plot_woody.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(5.5)

###############################################################################################################

plot_unsown = fig.add_subplot(2, 5, 5)

plt.errorbar(68.58, 1, xerr=29.92,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label = 'PA', color='g') # , prod acc_model 2018 bestestime
plt.errorbar(74.00, 1, xerr=8.64,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label = 'UA', color='b') # , user acc_model 2018 bestestimate
plt.errorbar(60.02, 0, xerr=11.92,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused
plt.errorbar(83.00, 0, xerr=7.4,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused

plot_unsown.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.margins(y=0.5)
plt.yticks([0,1])
plot_unsown.yaxis.set_ticks_position('none')
for label in (plot_unsown.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])

plt.xticks(plot_unsown.get_xticks()[:-1])

for label in (plot_unsown.get_xticklabels() + plot_unsown.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(5.5)

####################################################################

fig.subplots_adjust(left=0.26, bottom=0.01, right=0.98, wspace=0.17)

plt.savefig("<PATH_TO_PNG_FILE>", format="png", dpi=300)
plt.show()