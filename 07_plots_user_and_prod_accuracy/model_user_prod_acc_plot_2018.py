import matplotlib.pyplot as plt

########################## 2018 ############################################################################

fig = plt.figure(figsize=(8,4))
axis_font = {'fontname':'Arial', 'size':'9'}
plt.axis('off')
title_font = {'fontname':'Arial', 'size':'9', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'}

plt.yticks([])
plt.xticks([])

###############################################################################################################
plot_cropped = fig.add_subplot(1,5,1)
plot_cropped.grid(color='lightgrey', linestyle='-', linewidth=0.5)
plt.title('cropped', title_font)

# errorbars
plt.errorbar(92.65, 8, xerr=1.03/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label = 'PA', color='g') # prod acc_model 2018 DNN 50 ACC 100
plt.errorbar(96.79, 8, xerr=1.55/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 100
plt.errorbar(88.02, 7, xerr=1.38/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 30
plt.errorbar(96.79, 7, xerr=1.55/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 30
plt.errorbar(93.39, 6, xerr=1.09/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 10
plt.errorbar(96.79, 6, xerr=1.55/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 10
plt.errorbar(92.74, 5, xerr=1.04/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 100
plt.errorbar(97.19, 5, xerr=1.45/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label = 'UA', color='b') # user acc_model 2018 DNN 80 ACC 100
plt.errorbar(86.13, 4, xerr=1.49/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 30
plt.errorbar(95.00, 4, xerr=1.91/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 30
plt.errorbar(93.27, 3, xerr=1.13/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 10
plt.errorbar(96.2, 3, xerr=1.68/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 10
plt.errorbar(92.75, 2, xerr=1.19/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 topcrops
plt.errorbar(94.58, 2, xerr=1.99/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # user acc_model 2018 topcrops
plt.errorbar(93.18, 1, xerr=1.43/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # prod acc_model 2018 bestestime
plt.errorbar(93.78, 1, xerr=2.12/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # user acc_model 2018 bestestimate
plt.errorbar(92.66, 0, xerr=1.04/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # prod acc_model 2018 fused
plt.errorbar(96.59, 0, xerr=1.60/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # user acc_model 2018 fused

plt.yticks([])
plt.yticks([0,1,2,3,4,5,6,7,8], ['fused loc. prov.', 'best loc. estimate', 'major crops', '≥ 80%, ≤ 10m', '≥ 80%, ≤ 30m', '≥ 80%, ≤ 100m', '≥ 50%, ≤ 10m', '≥ 50%, ≤ 30m',  ' ≥ 50%, ≤ 100m'])
plt.yticks([0,1,2,3,4,5,6,7,8])
plt.xticks([0,10,20,30,40,50,60,70,80,90,100], ['0', '', '20', '', '40', '', '60', '', '80', '', '100'])
for label in (plot_cropped.get_xticklabels() + plot_cropped.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

L=plt.legend(loc ='center bottom', bbox_to_anchor=(1.1, -0.05), fontsize='small', labelspacing=0.2, framealpha=0.0, ncol = 2, borderpad = 0.9)
#L.get_texts()[0].set_text('2017')
#L.get_texts()[1].set_text('2018')

plt.ylabel("feature subset", axis_font, labelpad = 10)
###############################################################################################################

plot_water = fig.add_subplot(1, 5, 2)
plt.title('water', title_font)

# errorbars
plt.errorbar(98.75, 8, xerr=2.43/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #prod acc_model 2018 DNN 50 ACC 100
plt.errorbar(100.0, 8, xerr=0/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #user acc_model 2018 DNN 50 ACC 100
plt.errorbar(96.82, 7, xerr=6.03/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 30
plt.errorbar(100.0, 7, xerr=0/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 30
plt.errorbar(98.63, 6, xerr=2.65/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 10
plt.errorbar(100.0, 6, xerr=0/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #user acc_model 2018 DNN 50 ACC 10
plt.errorbar(98.82, 5, xerr=2.29/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g')#prod acc_model 2018 DNN 80 ACC 100
plt.errorbar(99.5, 5, xerr=0.98/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 100
plt.errorbar(98.63, 4, xerr=2.65/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #prod acc_model 2018 DNN 80 ACC 30
plt.errorbar(100.0, 4, xerr=0/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 30
plt.errorbar(98.57, 3, xerr=2.76/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 10
plt.errorbar(100, 3, xerr=0/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 10
plt.errorbar(98.23, 2, xerr=3.41/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 topcrops
plt.errorbar(100.0, 2, xerr=0/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 topcrops
plt.errorbar(89.46, 1, xerr=8.22/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #prod acc_model 2018 bestestime
plt.errorbar(100.0, 1, xerr=0/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 bestestimate
plt.errorbar(97.32, 0, xerr=2.95/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 fused
plt.errorbar(99.0, 0, xerr=1.38/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 fused

plot_water.grid(b = True, color='lightgray', linestyle='-', linewidth=0.5, axis='both')

plt.xticks([])
plt.xticks([0,10,20,30,40,50,60,70,80,90,100], ['0', '', '20', '', '40', '', '60', '', '80', '', '100'])
for label in (plot_water.get_xticklabels() + plot_water.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_water.yaxis.set_ticks_position('none')
for label in (plot_water.get_yticklabels()):
    label.set_visible(False)

###############################################################################################################

plot_urban = fig.add_subplot(1, 5, 3)
plt.title('urban', title_font)

plt.errorbar(73.91, 8, xerr=13.08/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 100
plt.errorbar(79.00, 8, xerr=5.66/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 100
plt.errorbar(77.00, 7, xerr=8.81/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #prod acc_model 2018 DNN 50 ACC 30
plt.errorbar(83.5, 7, xerr=5.16/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 30
plt.errorbar(80.48, 6, xerr=9.00/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 10
plt.errorbar(89.50, 6, xerr=4.26/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 10
plt.errorbar(76.08, 5, xerr=11.62/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #prod acc_model 2018 DNN 80 ACC 100
plt.errorbar(82.00, 5, xerr=5.34/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 100
plt.errorbar(80.18, 4, xerr=10.26/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 30
plt.errorbar(88, 4, xerr=4.52/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 30
plt.errorbar(77.69, 3, xerr=8.81/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 10
plt.errorbar(91.0, 3, xerr=3.98/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #user acc_model 2018 DNN 80 ACC 10
plt.errorbar(71.52, 2, xerr=9.1/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 topcrops
plt.errorbar(92.5, 2, xerr=3.66/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 topcrops
plt.errorbar(73.21, 1, xerr=7.01/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 bestestime
plt.errorbar(94, 1, xerr=3.3/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 bestestimate
plt.errorbar(81.39, 0, xerr=10.73/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 fused
plt.errorbar(83.5, 0, xerr=5.16/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 fused

plot_urban.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])
plt.xticks([0,10,20,30,40,50,60,70,80,90,100], ['0', '', '20', '', '40', '', '60', '', '80', '', '100'])
for label in (plot_urban.get_xticklabels() + plot_urban.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_urban.yaxis.set_ticks_position('none')
for label in (plot_urban.get_yticklabels()):
    label.set_visible(False)

plt.xlabel('class accuracy', axis_font, labelpad = 10)

###############################################################################################################

plot_woody = fig.add_subplot(1, 5, 4)
plt.title('woody canopy', title_font)

plt.errorbar(97.36, 8, xerr=2.77/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 100
plt.errorbar(87.67, 8, xerr=3.73/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 100
plt.errorbar(96.63, 7, xerr=2.97/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 30
plt.errorbar(86.33, 7, xerr=3.89/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 30
plt.errorbar(96.56, 6, xerr=2.91/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 10
plt.errorbar(88.67, 6, xerr=3.59/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 10
plt.errorbar(97.40, 5, xerr=2.74/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 100
plt.errorbar(87.67, 5, xerr=3.74/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # user acc_model 2018 DNN 80 ACC 100,
plt.errorbar(97.31, 4, xerr=2.69/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 30\'
plt.errorbar(88.0, 4, xerr=3.68/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 30
plt.errorbar(96.05, 3, xerr=3.1/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 10
plt.errorbar(88.67, 3, xerr=3.59/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #user acc_model 2018 DNN 80 ACC 10
plt.errorbar(96.09, 2, xerr=3.16/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 topcrops
plt.errorbar(88.0, 2, xerr=3.68/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 topcrops
plt.errorbar(95.27, 1, xerr=3.06/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 bestestime
plt.errorbar(88.33, 1, xerr=3.64/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 bestestimate
plt.errorbar(93.43, 0, xerr=3.97/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 fused
plt.errorbar(87.67, 0, xerr=3.73/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 fused

plot_woody.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])
plt.xticks([0,10,20,30,40,50,60,70,80,90,100], ['0', '', '20', '', '40', '', '60', '', '80', '', '100'])
for label in (plot_woody.get_xticklabels() + plot_woody.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_woody.yaxis.set_ticks_position('none')
for label in (plot_woody.get_yticklabels()):
    label.set_visible(False)

###############################################################################################################

plot_unsown = fig.add_subplot(1, 5, 5)
plt.title('unsown/spars. veg.', title_font)

plt.errorbar(82.86, 8, xerr=12.01/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 100
plt.errorbar(65.63, 8, xerr=4.97/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 100
plt.errorbar(93.82, 7, xerr=7.62/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 30
plt.errorbar(64.49, 7, xerr=5.01/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 30
plt.errorbar(85.06, 6, xerr=11.49/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 50 ACC 10
plt.errorbar(69.60, 6, xerr=4.81/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 50 ACC 10
plt.errorbar(86.66, 5, xerr=13.63/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 100
plt.errorbar(65.06, 5, xerr=4.99/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 100
plt.errorbar(84.75, 4, xerr=10.80/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 30
plt.errorbar(69.32, 4, xerr=4.82/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 30
plt.errorbar(86.54, 3, xerr=11.48/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 DNN 80 ACC 10
plt.errorbar(70.86, 3, xerr=4.77/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 DNN 80 ACC 10
plt.errorbar(84.79, 2, xerr=8.62/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 topcrops
plt.errorbar(73.86, 2, xerr=4.6/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 topcrops
plt.errorbar(86.62, 1, xerr=5.56/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 bestestime
plt.errorbar(81.25, 1, xerr=4.08/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #  user acc_model 2018 bestestimate
plt.errorbar(84.19, 0, xerr=23.34/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # prod acc_model 2018 fused
plt.errorbar(56.25, 0, xerr=5.19/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # user acc_model 2018 fused

plot_unsown.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])
plt.xticks([0,10,20,30,40,50,60,70,80,90,100], ['0', '', '20', '', '40', '', '60', '', '80', '', '100'])
for label in (plot_unsown.get_xticklabels() + plot_unsown.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_unsown.yaxis.set_ticks_position('none')
for label in (plot_unsown.get_yticklabels()):
    label.set_visible(False)

fig.subplots_adjust(left=0.2, bottom=0.2, right=0.99, wspace = 0.15)

plt.savefig('<PATH_TO_PNG_OUTPUT_FILE>', format="png", dpi=300)
plt.show()