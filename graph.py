import tkinter as tk
from pandas import DataFrame
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

data1 = {'Year': ['2015','2016','2017','2018','2019'],
         'Views': [45000,42000,52000,49000,47000]
        }
df1 = DataFrame(data1,columns=['Year','Views'])



 

root= tk.Tk() 
  
figure1 = plt.Figure(figsize=(6,5), dpi=100)
ax1 = figure1.add_subplot(111)
bar1 = FigureCanvasTkAgg(figure1, root)
bar1.get_tk_widget().pack(side=tk.LEFT, fill=tk.BOTH)
df1 = df1[['Year','Views']].groupby('Year').sum()
df1.plot(kind='bar', legend=True, ax=ax1)
ax1.set_title('Amount of Views for "Movie"')


root.mainloop()
