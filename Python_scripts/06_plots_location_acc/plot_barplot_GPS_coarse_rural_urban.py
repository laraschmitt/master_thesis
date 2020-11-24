import numpy as np
import matplotlib.pyplot as plt


N = 6

value_counts1 = ( 4597, 1987, 1579, 3348 , 36528, 3491  )
value_counts2 = ( 1289, 4241, 4241, 4241, 9928, 1792 )

ind = np.arange(N)    # the x locations for the groups
width = 0.85       # the width of the bars: can also be len(x) sequence

plt.figure(figsize=(4, 3))
title_font = {'fontname':'Arial', 'size':'9', 'color':'black', 'weight':'normal',
  'verticalalignment':'bottom'} #
#plt.title('Distribution of GPS accuracy in rural and urban areas', title_font)

p1 = plt.bar(ind, value_counts1, width, color = 'green' )
p2 = plt.bar(ind, value_counts2, width, color = 'red',
             bottom=value_counts1)

plt.xticks(ind, ('≤\u200910\u2009m', '>\u200910\u2009m\u2009-\u200930\u2009m', '>\u200930\u2009m\u2009-\u2009100\u2009m',
                 '>\u2009100m\u2009-1000\u2009m','>\u20091000\u2009m', 'no accuracy'))


axes= plt.axes()
plt.tick_params(width = 0.5)
plt.setp(axes.spines.values(), linewidth=0.5)


ax = plt.subplot() # Defines ax variable by creating an empty plot
# Set the tick labels font
for label in (ax.get_xticklabels() + ax.get_yticklabels()):
    label.set_fontname('Arial')
    label.set_fontsize(7)

ax.tick_params(axis='x', rotation=45)

# ticks
axes.set_yticks([5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000])
axes.set_yticklabels(['', '10000', '', '20000', '', '30000', '', '40000', '', '50000'])

#plt.yticks(np.arange(20000, 4000))
plt.legend((p1[0], p2[0]), ('rural areas, Jan-March 2017-2019', 'urban areas, Jan-March 2017-2019'), loc=2, fontsize = 'xx-small',
           labelspacing=0.2, framealpha=0.5)

axis_font = {'fontname':'Arial', 'size':'8'}
plt.xlabel("Accuracy", axis_font)
plt.ylabel("Submission count", axis_font)
plt.subplots_adjust(left=0.15, bottom=0.29, top = 0.97, right = 0.98)

plt.savefig("<PATH_TO_PNG_FILE>", format="png", dpi = 600)
plt.show()