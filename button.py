import tkinter as tk
print("Start Program.")
root = tk.Tk() #builds main window

#widget/element is an element in a GUI
#button, text box, input box, slider, dropdown, image, video, etc.

#1: Construct the widget
btn1 = tk.Button(root, width = 100, height = 6)

#2: Config
btn1.config(text = "Hello!")

#3: Packing it
btn1.pack()

output = tk.Text(root, width = 100, height = 20)
output.config()
output.pack()
root.mainloop()
print("End Program.")
