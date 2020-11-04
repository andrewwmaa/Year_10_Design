import tkinter as tk

OptionList = [
"This",
"is",
"a",
"list"
]
#construct
app = tk.Tk()

app.geometry('100x200')
#config
variable = tk.StringVar(app)
variable.set(OptionList[0])

opt = tk.OptionMenu(app, variable, *OptionList)
opt.config(width=90, font=('Helvetica', 12))
#pack
opt.pack()

app.mainloop()
