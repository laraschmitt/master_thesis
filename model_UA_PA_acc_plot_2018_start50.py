import matplotlib.pyplot as plt

########################## 2018 ############################################################################

fig = plt.figure(figsize=(8,4))
axis_font = {'fontname': 'Arial', 'size': '9', 'weight': 'light'}




plt.axis('off')
#plt.axis.patch.set_alpha(0.5)
#Axes.set_alpha(self, alpha)






#cur_axes = plt.gca()
#cur_axes.axes.get_xaxis().set_visible(False)
#cur_axes.axes.get_yaxis().set_visible(False)

title_font = {'fontname':'Arial', 'size':'9', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'}
#plt.title('2017', title_font)
plt.yticks([])
plt.xticks([])


###############################################################################################################
plot_cropped = fig.add_subplot(1,5,1)
plot_cropped.grid(color='lightgrey', linestyle='-', linewidth=0.5)
plt.title('cropped', title_font)

# errorbars
plt.errorbar(92.65, 8, xerr=1.03,
            fmt='.', elinewidth=1, markersize=4, capsize=3, capthick=0.5, label = 'PA', color='g') # , label='prod acc_model 2018 DNN 50 ACC 100\'s'
plt.errorbar(96.79, 8, xerr=1.55,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 100\'s'

plt.errorbar(88.02, 7, xerr=1.38,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 30\'s'
plt.errorbar(96.79, 7, xerr=1.55,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 30\'s'

plt.errorbar(93.39, 6, xerr=1.09,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 10\'s'
plt.errorbar(96.79, 6, xerr=1.55,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 10\'s'

plt.errorbar(92.74, 5, xerr=1.04,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 100\'s'
plt.errorbar(97.19, 5, xerr=1.45,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, label = 'UA', color='b') # , label='user acc_model 2018 DNN 80 ACC 100\'s'

plt.errorbar(86.13, 4, xerr=1.49,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 30\'s'
plt.errorbar(95.00, 4, xerr=1.91,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 30\'s'

plt.errorbar(93.27, 3, xerr=1.13,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 10\'s'
plt.errorbar(96.2, 3, xerr=1.68,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 10\'s'


plt.errorbar(92.75, 2, xerr=1.19,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 topcrops\'s'
plt.errorbar(94.58, 2, xerr=1.99,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # label='user acc_model 2018 topcrops\'s',

plt.errorbar(93.18, 1, xerr=1.43,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # label='prod acc_model 2018 bestestime\'s',
plt.errorbar(93.78, 1, xerr=2.12,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # label='user acc_model 2018 bestestimate\'s',

plt.errorbar(92.66, 0, xerr=1.04,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='g') # label='prod acc_model 2018 fused\'s',
plt.errorbar(96.59, 0, xerr=1.60,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # label='user acc_model 2018 fused\'s',


plt.yticks([])
plt.yticks([0,1,2,3,4,5,6,7,8], ['(9) fused loc. prov. (2400)', '(8) best loc. estimate (2400)', '(7) major crops (5600)', '(6) ≥ 80%, ≤ 10m (6400)', '(5) ≥ 80%, ≤ 30m (6400)', '(4) ≥ 80%, ≤ 100m (6400)', '(3) ≥ 50%, ≤ 10m (6400)', '(2) ≥ 50%, ≤ 30m (6400)',  '(1) ≥ 50%, ≤ 100m (6400)'])
plt.yticks([0,1,2,3,4,5,6,7,8])
plt.xticks([50,60,70,80,90,100, 103], ['50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_cropped.get_xticks()[:-1])
for label in (plot_cropped.get_xticklabels() + plot_cropped.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

L=plt.legend(loc ='center bottom', bbox_to_anchor=(1.15, -0.05), fontsize='small', labelspacing=0.2, framealpha=0.0, ncol = 2, borderpad = 0.9)
#L.get_texts()[0].set_text('2017')
#L.get_texts()[1].set_text('2018')

plt.ylabel("feat. subset (feat. count)", axis_font,  labelpad = 8)
###############################################################################################################

plot_water = fig.add_subplot(1, 5, 2)
plt.title('water', title_font)
# errorbars
# errorbars
plt.errorbar(98.75, 8, xerr=2.43,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #, label='prod acc_model 2018 DNN 50 ACC 100\'s'
plt.errorbar(100.0, 8, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #, label='user acc_model 2018 DNN 50 ACC 100\'s

#plt.errorbar(96.82, 7, xerr=6.03,
 #           fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 30\'s'
import numpy as np
plt.errorbar(96.82, 7, xerr=np.array([[6.03 , 3]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'

plt.errorbar(100.0, 7, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 30\'s

#plt.errorbar(98.63, 6, xerr=2.65,
 #           fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 10\'s',
import numpy as np
plt.errorbar(98.57, 6 ,xerr=np.array([[2.76 , 1.0]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'
plt.errorbar(100.0, 6, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #, label='user acc_model 2018 DNN 50 ACC 10\'s',

#plt.errorbar(98.82, 5, xerr=2.29,
#            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g')#label='prod acc_model 2018 DNN 80 ACC 100\'s

plt.errorbar(98.57, 5 ,xerr=np.array([[2.76 , 1.0]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'



#plt.errorbar(99.5, 5, xerr=0.98,
 #           fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 100\'s'
plt.errorbar(98.57, 5 ,xerr=np.array([[0.98 , 1.0]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='prod acc_model 2018 bestestime\'s'


#plt.errorbar(98.63, 4, xerr=2.65,
#            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #, label='prod acc_model 2018 DNN 80 ACC 30\'s'

plt.errorbar(98.23, 4, xerr=np.array([[2.65 , 1.7]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'
plt.errorbar(100.0, 4, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 30\'s'

#plt.errorbar(98.57, 3, xerr=2.76,
 #           fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 10\'s'


plt.errorbar(98.57, 3 ,xerr=np.array([[2.76 , 1.0]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'
plt.errorbar(100, 3, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 10\'s'


#plt.errorbar(98.23, 2, xerr=3.41,
 #           fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 topcrops\'s'

plt.errorbar(98.23, 2, xerr=np.array([[3.41 , 1.7]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'
plt.errorbar(100.0, 2, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 topcrops\'s'

plt.errorbar(89.46, 1, xerr=8.22,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #, label='prod acc_model 2018 bestestime\'s'
plt.errorbar(100.0, 1, xerr=0,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 bestestimate\'s'

plt.errorbar(97.32, 0, xerr=2.95,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 fused\'s'
plt.errorbar(99.0, 0, xerr=1.38,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 fused\'s'


plot_water.grid(b = True, color='lightgray', linestyle='-', linewidth=0.5, axis='both')


plt.xticks([])
plt.xticks([50,60,70,80,90,100, 103], ['50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_water.get_xticks()[:-1])
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

plt.errorbar(73.91, 8, xerr=13.08,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 100\'s'
plt.errorbar(79.00, 8, xerr=5.66,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 100\'s'

plt.errorbar(77.00, 7, xerr=8.81,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #, label='prod acc_model 2018 DNN 50 ACC 30\'s'
plt.errorbar(83.5, 7, xerr=5.16,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 30\'s'

plt.errorbar(80.48, 6, xerr=9.00,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 10\'s'
plt.errorbar(89.50, 6, xerr=4.26,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 10\'s'

plt.errorbar(76.08, 5, xerr=11.62,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') #, label='prod acc_model 2018 DNN 80 ACC 100\'s'
plt.errorbar(82.00, 5, xerr=5.34,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 100\'s'

plt.errorbar(80.18, 4, xerr=10.26,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 30\'s'
plt.errorbar(88, 4, xerr=4.52/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 30\'s'

plt.errorbar(77.69, 3, xerr=8.81,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 10\'s'
plt.errorbar(91.0, 3, xerr=3.98/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #, label='user acc_model 2018 DNN 80 ACC 10\'s'


plt.errorbar(71.52, 2, xerr=9.1,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 topcrops\'s'
plt.errorbar(92.5, 2, xerr=3.66,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 topcrops\'s'

plt.errorbar(73.21, 1, xerr=7.01,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'
plt.errorbar(94, 1, xerr=3.3/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 bestestimate\'s'

plt.errorbar(81.39, 0, xerr=10.73,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 fused\'s'
plt.errorbar(83.5, 0, xerr=5.16/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 fused\'s'

plot_urban.grid(color='lightgrey', linestyle='-', linewidth=0.5)




plt.xticks([])
plt.xticks([50,60,70,80,90,100, 103], ['50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_urban.get_xticks()[:-1])
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

plt.errorbar(97.36, 8, xerr=2.77,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 100\'s'
plt.errorbar(87.67, 8, xerr=3.73,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 100\'s'

plt.errorbar(96.63, 7, xerr=2.97,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 30\'s'
plt.errorbar(86.33, 7, xerr=3.89,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 30\'s'

plt.errorbar(96.56, 6, xerr=2.91,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 10\'s'
plt.errorbar(88.67, 6, xerr=3.59,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 10\'s'

plt.errorbar(97.40, 5, xerr=2.74,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 100\'s
plt.errorbar(87.67, 5, xerr=3.74,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5,  color='b') # label='user acc_model 2018 DNN 80 ACC 100\'s',

plt.errorbar(97.31, 4, xerr=2.69,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 30\'
plt.errorbar(88.0, 4, xerr=3.68,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # label='user acc_model 2018 DNN 80 ACC 30\'s'

plt.errorbar(96.05, 3, xerr=3.1/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 10\'s'
plt.errorbar(88.67, 3, xerr=3.59,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #label='user acc_model 2018 DNN 80 ACC 10\'s'


plt.errorbar(96.09, 2, xerr=3.16,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 topcrops\'s'
plt.errorbar(88.0, 2, xerr=3.68,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 topcrops\'s'

plt.errorbar(95.27, 1, xerr=3.06,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'
plt.errorbar(88.33, 1, xerr=3.64,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 bestestimate\'s'

plt.errorbar(93.43, 0, xerr=3.97,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 fused\'s'
plt.errorbar(87.67, 0, xerr=3.73/2,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 fused\'s'




plot_woody.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])
plt.xticks([50,60,70,80,90,100, 103], ['50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_woody.get_xticks()[:-1])

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

plt.errorbar(82.86, 8, xerr=12.01,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 100\'s'
plt.errorbar(65.63, 8, xerr=4.97,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 100\'s'

#plt.errorbar(93.82, 7, xerr=7.62,
#            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 30\'s'


import numpy as np
plt.errorbar(93.82, 7, xerr=np.array([[7.62 , 6]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'




plt.errorbar(64.49, 7, xerr=5.01,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 30\'s'

plt.errorbar(85.06, 6, xerr=11.49,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 50 ACC 10\'s'
plt.errorbar(69.60, 6, xerr=4.81,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 50 ACC 10\'s'

plt.errorbar(86.66, 5, xerr=13.63,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 100\'s'
plt.errorbar(65.06, 5, xerr=4.99,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 100\'s'

plt.errorbar(84.75, 4, xerr=10.80,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 30\'s'
plt.errorbar(69.32, 4, xerr=4.82,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 30\'s'

plt.errorbar(86.54, 3, xerr=11.48,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 DNN 80 ACC 10\'s'
plt.errorbar(70.86, 3, xerr=4.77,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 DNN 80 ACC 10\'s'


plt.errorbar(84.79, 2, xerr=8.62,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 topcrops\'s'
plt.errorbar(73.86, 2, xerr=4.6,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 topcrops\'s'

plt.errorbar(86.62, 1, xerr=5.56,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'
plt.errorbar(81.25, 1, xerr=4.08,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') #  label='user acc_model 2018 bestestimate\'s'

#plt.errorbar(84.19, 0, xerr=23.34,
 #           fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 fused\'s'

import numpy as np
plt.errorbar(84.19, 0, xerr=np.array([[23.34 , 15.9]]).T,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='g') # , label='prod acc_model 2018 bestestime\'s'




plt.errorbar(56.25, 0, xerr=5.19,
            fmt='.', elinewidth=1, markersize=3, capsize=3, capthick=0.5, color='b') # , label='user acc_model 2018 fused\'s'






plot_unsown.grid(color='lightgrey', linestyle='-', linewidth=0.5)

plt.xticks([])

plt.xticks([50,60,70,80,90,100, 103], ['50', '60', '70', '80', '90', '100', ''])
plt.xticks(plot_unsown.get_xticks()[:-1])
for label in (plot_unsown.get_xticklabels() + plot_unsown.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(8)

plt.yticks([0,1,2,3,4,5,6,7,8])
plot_unsown.yaxis.set_ticks_position('none')
for label in (plot_unsown.get_yticklabels()):
    label.set_visible(False)



#fig.subplots_adjust(left=0.28, bottom=0.1, right=0.99)
fig.subplots_adjust(left=0.25, bottom=0.2, right=0.98, wspace = 0.17)

plt.savefig("/Users/lara/thesis_data/pyplots/model_UA_PA_2018.png", format="png", dpi=600)
plt.show()