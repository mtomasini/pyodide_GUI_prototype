# A GUI for a Python script using `pyodide`

> Author: Matteo Tomasini
>
> Date: 13.02.2023

This repository contains the equivalent of my [previous work](https://github.com/mtomasini/SimpleGUI_prototype) to create a GUI to run a python script under the hood. The goal of the GUI is for an external user to be able to input parameters into the script without having to deal with the code. The usage of `pyodide` to this goal (and `vega-lite` for the plotting part) allowed me to create __a simple yet modern-looking user interface__ using `pico.css` for the frontend.

While `pyodide` proved very useful to reach the goal, I found a few disadvantages during the process:

1) because of how the package works, the process is quite slow - mostly due to the import of the necessary packages under the hood.
2) the developer would need knowledge in more than just one language. When I used `PySimpleGUI` I remained within framework, and the whole application was written in Python - always an advantage. 
3) in terms of development time, writing a whole frontend in html and then connecting to bits of code is longer than writing a GUI that can import scripts directly and run them in the command line at the same time as the frontend.

It was still a useful experience. I will keep playing around with these ideas.
