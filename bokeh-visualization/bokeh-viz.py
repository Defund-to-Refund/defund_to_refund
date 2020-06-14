from math import pi

import pandas as pd
import json

from bokeh.io import output_file, show
from bokeh.palettes import Spectral
from bokeh.plotting import figure
from bokeh.transform import cumsum
from bokeh.layouts import row
from bokeh.embed import json_item

#---------------------------------------------- Fig. 1

# imported 
value = [20, 20, 20, 20, 5, 5, 5, 5, 0]
value_percent = list(map(lambda x: "{}%".format(x), value))

# Data 
x1 = { 'LGBTQ Services': value[0] , 'Homeless Services': value[1], 'Cultural Affairs': value[2], 'Women\'s Services': value[3],
    'Children\'s Services': value[4], 'Public Libraries': value[5], 'Sanitation': value[6], 'Public Transportation ': value[7],
    'Healthcare Professionals': value[8]}

data = pd.Series(x1).reset_index(name='value').rename(columns={'index':'service'})
data['percent'] = value_percent
data['angle'] = data['value']/data['value'].sum() * 2*pi
data['color'] = Spectral[len(x1)]

# Figure 1
p1 = figure(plot_height=300, title="Total Funds", toolbar_location=None,
        tools="hover", tooltips="@service: @percent")

p1.wedge(x=0, y=1, radius=0.4,
        start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
        line_color=None, fill_color='color', source=data)

p1.axis.axis_label=None
p1.axis.visible= False
p1.grid.grid_line_color = None


#---------------------------------------------- Fig. 2

#imported
impact = [1000000, 2000000, 2000000, 30000, 30000, 30000, 70000, 40000, 60000]
impact_formatted = list(map(lambda x: "{:,}".format(x), impact))

# Data 
x2 = { 'LGBTQ Services': impact[0] , 'Homeless Services': impact[1], 'Cultural Affairs': impact[2], 'Women\'s Services': impact[3],
    'Children\'s Services': impact[4], 'Public Libraries': impact[5], 'Sanitation': impact[6], 'Public Transportation ': impact[7],
    'Healthcare Professionals': impact[8]}

data2 = pd.Series(x2).reset_index(name='impact').rename(columns={'index':'service'})
data2['impacted'] = impact_formatted 
data2['angle'] = data2['impact']/data2['impact'].sum() * 2*pi
data2['color'] = Spectral[len(x1)]

# Figure 2
p2 = figure(plot_height=300, title="Impacted People", toolbar_location=None,
        tools="hover", tooltips="@service: @impacted")


p2.wedge(x=0, y=1, radius=0.4,
        start_angle=cumsum('angle', include_zero=True), end_angle=cumsum("angle"),
        line_color=None, fill_color='color', source=data2)

p2.axis.axis_label=None
p2.axis.visible=False
p2.grid.grid_line_color = None

#---------------------------------------------- Legend
legend = figure(plot_height = 300, plot_width = 200, title="Legend", toolbar_location=None)

#created in order to incude legend annotation --> no wedge actually displayed here
legend.wedge(x=0, y=0, radius=0,
        start_angle=cumsum("angle"), end_angle=cumsum("angle"),
        line_color=None, fill_color='color', legend='service', source=data)

legend.legend.location = "center"

legend.axis.axis_label=None
legend.axis.visible=False
legend.grid.grid_line_color = None





# Display
output = row(p1, legend, p2)
item_text = json.dumps(json_item(output, "myplot"))
f = open("./src/data/bokeh_data.json", "a")
f.write(item_text)
f.close()