import matplotlib.pyplot as plt

########################## NORTH COASTAL ZONE ############################################################################

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
plt.title('cropped', title_font)

plt.errorbar(94.96, 1, xerr=2.1,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # label='prod 80
plt.errorbar(93.00, 1, xerr=5.03,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # label='user 80

plt.errorbar(90.04, 0, xerr=4.38,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # label='prod acc_best,
#plt.errorbar(89.00, 0, xerr=6.16,
#            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # label='user acc_best,


plotline1, caplines1, barlinecols1 = plot_cropped.errorbar(
    89.00, 0, xerr=6.16, xuplims= 102,
    fmt='.', elinewidth=0.8, markersize=3, capsize=3, capthick=0.5, color='b')
caplines1[0].set_marker('|')
caplines1[0].set_markersize(6)


plt.margins(y=0.5)
plt.yticks([0,1], ['(8) best loc. estimate (2400)', '(6) ≥ 80%, ≤ 10m (6400)'])
plt.ylabel("NORTH", axis_font,  labelpad = 8)

plt.xticks([10, 20, 30,40,50,60,70,80, 90, 100, 103], ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', ''])


for label in (plot_cropped.get_xticklabels()):
    label.set_visible(False)
plot_cropped.xaxis.set_ticks_position('none')

for label in (plot_cropped.get_xticklabels() + plot_cropped.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)
###############################################################################################################

plot_water = fig.add_subplot(2, 5, 2)
plt.title('water', title_font)


plt.errorbar(100, 1, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #, label='prod 80
plt.errorbar(100.0, 1, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user80

plt.errorbar(69.21, 0, xerr=29.24,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod accbest



#plt.errorbar(98.00, 0, xerr=3.92,
 #           fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_best

plotline1, caplines1, barlinecols1 = plot_water.errorbar(
    98.00, 0, xerr=3.92, xuplims= 100,
    fmt='.', elinewidth=0.8, markersize=3, capsize=3, capthick=0.5, color='b')

caplines1[0].set_marker('|')
caplines1[0].set_markersize(6)
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
plt.title('urban', title_font)

plt.errorbar(70.05, 1, xerr=14.91,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_80'
plt.errorbar(92.00, 1, xerr=7.6,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_m80

plt.errorbar(65.06, 0, xerr=11.57,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_best
plt.errorbar(92.00, 0, xerr=7.60,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_best'

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
plt.title('woody canopy', title_font)

plt.errorbar(98.5, 1, xerr=2.91,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_m80
plt.errorbar(99, 1, xerr=1.96,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc80'

plt.errorbar(100, 0, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_best
plt.errorbar(87.00, 0, xerr=6.62,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_best

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
plt.title('unsown/spars. veg.', title_font)

#plt.errorbar(100, 1, xerr=47.3/2, xuplims= 90,
#            fmt='o', elinewidth=1, markersize=5, capsize=0, capthick=0, color='g')  # , label='prod acc_80

plotline1, caplines1, barlinecols1 = plot_unsown.errorbar(
    100, 1, xerr=47.3, xuplims= 100,
    fmt='.', elinewidth=0.8, markersize=3, capsize=3, capthick=0.5, color='g')

caplines1[0].set_marker('|')
caplines1[0].set_markersize(6)

plt.errorbar(58., 1, xerr=13.82,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_80

plt.errorbar(76.17, 0, xerr=23.76,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod abest
plt.errorbar(76, 0, xerr=11.96,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user best

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

plt.savefig("/Users/lara/thesis_data/pyplots/north_model_UA_PA_2018.png", format="png", dpi=300)
plt.show()