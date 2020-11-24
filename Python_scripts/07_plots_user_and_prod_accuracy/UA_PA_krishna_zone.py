import matplotlib.pyplot as plt

########################## KRISHNA ZONE ############################################################################

fig = plt.figure(figsize=(8,2))
axis_font = {'fontname': 'Arial', 'size': '9', 'weight': 'light'}
plt.axis('off')

title_font = {'fontname':'Arial', 'size':'9', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'}
#plt.title('2017', title_font)
plt.yticks([])
plt.xticks([])

###############################################################################################################

plot_cropped = fig.add_subplot(2,5,1)
plot_cropped.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plot_cropped.set_xlim([30, 100])

plt.errorbar(98.44, 1, xerr=0.66,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # prod acc_model 2018 bestestime
plt.errorbar(99.50, 1, xerr=0.98, uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # user acc_model 2018 bestestimate
plt.errorbar(98.41, 0, xerr=1.14,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # prod acc_model 2018 fused
plt.errorbar(99.00, 0, xerr=1.38,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # user acc_model 2018 fused

plt.margins(y=0.5)
plt.yticks([0,1], ['(8) best loc. estimate (2400)', '(6) ≥ 80%, ≤ 10m (6400)'])
plt.ylabel("KRISHNA", axis_font,  labelpad = 8)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])

for label in (plot_cropped.get_xticklabels()):
    label.set_visible(False)
plot_cropped.xaxis.set_ticks_position('none')

for label in (plot_cropped.get_xticklabels() + plot_cropped.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)
###############################################################################################################

plot_water = fig.add_subplot(2, 5, 2)

plt.errorbar(88.32, 1, xerr=9.95,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #, prod acc_model 2018 bestestime
plt.errorbar(100, 1, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 bestestimate
plt.errorbar(97.32, 0, xerr=2.95,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused
plt.errorbar(99.0, 0, xerr=1.38,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused

plot_water.grid(b = True, color='lightgray', linestyle='-', linewidth=0.5, axis='both')

plt.margins(y=0.5)
plt.yticks([0,1])
plot_water.yaxis.set_ticks_position('none')
for label in (plot_water.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])

for label in (plot_water.get_xticklabels()):
    label.set_visible(False)
plot_water.xaxis.set_ticks_position('none')
###############################################################################################################
plot_urban = fig.add_subplot(2, 5, 3)

plt.errorbar(90.11, 1, xerr=8.4,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 bestestime

plotline1, caplines1, barlinecols1 = plot_urban.errorbar(
    98.00, 1, xerr=3.92, xuplims= 100,
    fmt='.', elinewidth=0.8, markersize=3, capsize=3, capthick=0.5, color='b')

caplines1[0].set_marker('|')
caplines1[0].set_markersize(6)

plt.errorbar(88.28, 0, xerr=7.79,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused

plotline1, caplines1, barlinecols1 = plot_urban.errorbar(
    98.00, 0, xerr=3.92, xuplims= 100,
    fmt='.', elinewidth=0.8, markersize=3, capsize=3, capthick=0.5, color='b')

caplines1[0].set_marker('|')
caplines1[0].set_markersize(6)

plot_urban.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.margins(y=0.5)
plt.yticks([0,1])
plot_urban.yaxis.set_ticks_position('none')
for label in (plot_urban.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])
for label in (plot_urban.get_xticklabels()):
    label.set_visible(False)
plot_urban.xaxis.set_ticks_position('none')

###############################################################################################################
plot_woody = fig.add_subplot(2, 5, 4)

plt.errorbar(100, 1, xerr=0,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 bestestime
plt.errorbar(100, 1, xerr=0,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 bestestimate
plt.errorbar(97.90, 0, xerr=3.25,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 fused
plt.errorbar(98.00, 0, xerr=2.76,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused

plot_woody.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.margins(y=0.5)
plt.yticks([0,1])
plot_woody.yaxis.set_ticks_position('none')
for label in (plot_woody.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])

for label in (plot_woody.get_xticklabels()):
    label.set_visible(False)
plot_woody.xaxis.set_ticks_position('none')

###############################################################################################################

plot_unsown = fig.add_subplot(2, 5, 5)

plt.errorbar(100, 1, xerr=0,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , prod acc_model 2018 bestestime
plt.errorbar(71, 1, xerr=8.94,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 bestestimate

plotline1, caplines1, barlinecols1 = plot_unsown.errorbar(
    100, 0, xerr=10.88, xuplims= 100,
    fmt='.', elinewidth=0.8, markersize=3, capsize=3, capthick=0.5, color='g')

caplines1[0].set_marker('|')
caplines1[0].set_markersize(6)

plt.errorbar(82, 0, xerr=7.57,uplims=100,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , user acc_model 2018 fused

plot_unsown.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.margins(y=0.5)
plt.yticks([0,1])
plot_unsown.yaxis.set_ticks_position('none')
for label in (plot_unsown.get_yticklabels()):
    label.set_visible(False)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])
for label in (plot_unsown.get_xticklabels()):
    label.set_visible(False)
plot_unsown.xaxis.set_ticks_position('none')

####################################################################

fig.subplots_adjust(left=0.26, bottom=0.01, right=0.98, wspace = 0.17)

plt.savefig("<PATH_TO_PNG_FILE>", format="png", dpi=300)
plt.show()