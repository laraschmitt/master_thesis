import matplotlib.pyplot as plt

########################## 2017 ############################################################################

fig = plt.figure()
axis_font = {'fontname':'Arial', 'size':'8'}
plt.xlabel('area-adjusted OA [95% CI]', axis_font)
plt.ylabel("feature subset", axis_font)

title_font = {'fontname':'Arial', 'size':'7', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'}
#plt.title('2017', title_font)
plt.yticks([])
plt.xticks([])
plt.axis('off')

###############################################################################################################
plot_cropped = fig.add_subplot(1,5,1)
plot_cropped.grid(color='lightgrey', linestyle='-', linewidth=0.5)
plt.title('cropped', title_font)

# errorbars
plt.errorbar(85.89, 8, xerr=1.39/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model 2017 DNN 50 ACC 100\'s', color='g')
plt.errorbar(96.00, 8, xerr=1.72/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model 2017 DNN 50 ACC 100\'s', color='b')


plt.errorbar(85.79, 0, xerr=1.30/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model fused\'s', color='g')
plt.errorbar(93.2, 0, xerr=2.21/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model fused\'s', color='b')


plt.yticks([])
plt.yticks([0,1,2,3,4,5,6,7,8], ['2019 only Plantix sub., DNN ≥ 80%, acc ≤ 10m', '2017 sub., DNN ≥ 80%, acc ≤ 10m', '2017 - 2019 sub., major crops, DNN ≥ 80%, acc ≤ 10m', '2017 - 2019 sub., DNN ≥ 80%, acc ≤ 10m', '2017 - 2019 sub., DNN ≥ 80%, acc ≤ 30m', '2017 - 2019 sub., DNN ≥ 80%, acc ≤ 100m', '2017 - 2019 sub., DNN ≥ 50%, acc ≤ 10m', '2017 - 2019 sub., DNN ≥ 50%, acc ≤ 30m',  '2017 - 2019 sub., DNN ≥ 50%, acc ≤ 100m'])
plt.yticks([0,1,2,3,4,5,6,7,8])
plt.xticks([0,20,40,60,80,100], ['0', '20', '40', '60', '80', '100'])
for label in (plot_cropped.get_xticklabels() + plot_cropped.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

fig.subplots_adjust(left=0.3)


###############################################################################################################

plot_water = fig.add_subplot(1, 5, 2)
plt.title('water', title_font)
# errorbars
plt.errorbar(93.74, 8, xerr=1.39/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model 2017 DNN 50 ACC 100\'s', color='g')
plt.errorbar(94.5, 8, xerr=3.17/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model 2017 DNN 50 ACC 100\'s', color='b')

plt.errorbar(93.31, 0, xerr=7.04/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model fused\'s', color='g')
plt.errorbar(94.5, 0, xerr=3.17/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model fused\'s', color='b')

plot_water.grid(b = True, color='lightgray', linestyle='-', linewidth=0.5, axis='both')


plt.xticks([])
plt.xticks([0,20,40,60,80,100], ['0', '20', '40', '60', '80', '100'])
for label in (plot_water.get_xticklabels() + plot_water.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_water.yaxis.set_ticks_position('none')
for label in (plot_water.get_yticklabels()):
    label.set_visible(False)



###############################################################################################################
plot_urban = fig.add_subplot(1, 5, 3)
plt.title('urban', title_font)
plt.errorbar(70.98, 8, xerr=9.97/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model 2017 DNN 50 ACC 100\'s', color='g')
plt.errorbar(72.00, 8, xerr=6.24/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model 2017 DNN 50 ACC 100\'s', color='b')


plt.errorbar(67.39, 0, xerr=9.43/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model fused\'s', color='g')
plt.errorbar(70.5, 0, xerr=6.34/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model fused\'s', color='b')


plot_urban.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])
plt.xticks([0,20,40,60,80,100], ['0', '20', '40', '60', '80', '100'])
for label in (plot_urban.get_xticklabels() + plot_urban.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_urban.yaxis.set_ticks_position('none')
for label in (plot_urban.get_yticklabels()):
    label.set_visible(False)



###############################################################################################################



plot_woody = fig.add_subplot(1, 5, 4)
plt.title('woody canopy', title_font)

plt.errorbar(92.33, 8, xerr=4.3/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model 2017 DNN 50 ACC 100\'s', color='g')
plt.errorbar(81.87, 8, xerr=4.39/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model 2017 DNN 50 ACC 100\'s', color='b')




plt.errorbar(83.84, 0, xerr=5.592,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model fused\'s', color='g')
plt.errorbar(81.67, 0, xerr=4.39/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model fused\'s', color='b')





plot_woody.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])
plt.xticks([0,20,40,60,80,100], ['0', '20', '40', '60', '80', '100'])
for label in (plot_woody.get_xticklabels() + plot_woody.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_woody.yaxis.set_ticks_position('none')
for label in (plot_woody.get_yticklabels()):
    label.set_visible(False)

###############################################################################################################

plot_unsown = fig.add_subplot(1, 5, 5)
plt.title('unsown/spars. veg.', title_font)

plt.errorbar(92.33, 8, xerr=4.3/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model 2017 DNN 50 ACC 100\'s', color='g')
plt.errorbar(81.87, 8, xerr=4.39/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model 2017 DNN 50 ACC 100\'s', color='b')



plt.errorbar(91.84, 0, xerr=21.61,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='prod acc_model fused\'s', color='g')
plt.errorbar(47.71, 0, xerr=5.24/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label='user acc_model fused\'s', color='b')







plot_unsown.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])
plt.xticks([0,20,40,60,80,100], ['0', '20', '40', '60', '80', '100'])
for label in (plot_unsown.get_xticklabels() + plot_unsown.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_unsown.yaxis.set_ticks_position('none')
for label in (plot_unsown.get_yticklabels()):
    label.set_visible(False)



plt.show()