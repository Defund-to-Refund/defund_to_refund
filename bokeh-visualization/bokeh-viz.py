from math import pi

import pandas as pd

from bokeh.io import output_file, show
from bokeh.palettes import Spectral
from bokeh.plotting import figure
from bokeh.transform import cumsum
from bokeh.layouts import row

output_file("pie.html")

# imported values
value = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

# Data
x1 = { 'LGBTQ Services': value[0] , 'Homeless Services': value[1], 'Cultural Affairs': value[2], 'Women\'s Services': value[3],
    'Children\'s Services': value[4], 'Public Libraries': value[5], 'Sanitation': value[6], 'Public Transportation ': value[7],
    'Healthcare Professionals': value[8]}

data = pd.Series(x1).reset_index(name='value').rename(columns={'index':'country'})
data['angle'] = data['value']/data['value'].sum() * 2*pi
data['color'] = Spectral[len(x1)]

# Figure 1
p1 = figure(plot_height=800, title="Total Funds", toolbar_location=None,
        tools="hover", tooltips="@country: @value")

p1.wedge(x=0, y=1, radius=0.4,
        start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
        line_color="white", fill_color='color', legend='country', source=data)

p1.axis.axis_label=None
p1.axis.visible= False
p1.grid.grid_line_color = None


# Figure 2
p2 = figure(plot_height=800, title="Impacted People", toolbar_location=None,
        tools="hover", tooltips="@country: @value")


p2.wedge(x=0, y=1, radius=0.4,
        start_angle=cumsum('angle', include_zero=True), end_angle=cumsum("angle"),
        line_color="white", fill_color='color', source=data)

p2.axis.axis_label=None
p2.axis.visible=False
p2.grid.grid_line_color = None


# Display
show(row(p1, p2))