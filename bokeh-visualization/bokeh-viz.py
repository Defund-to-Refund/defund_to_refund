from math import pi

import pandas as pd
import json

from bokeh.io import output_file, show
from bokeh.palettes import Spectral
from bokeh.plotting import figure
from bokeh.transform import cumsum
from bokeh.layouts import row
from bokeh.embed import json_item


def plot_row(value_data, impact_data, data_file):
    """
    Plot two figures (pie charts) arranged in a row and separated by a legend annotation.
    """
    #---------------------------------------------- Fig. 1
    value = value_data
    value_percent = list(map(lambda x: "{}%".format(x), value))

    # Structure data 
    x1 = { 'LGBTQ Services': value[0] , 'Homeless Services': value[1], 'Cultural Affairs': value[2], 'Women\'s Services': value[3]}

    data = pd.Series(x1).reset_index(name='value').rename(columns={'index':'service'})
    data['percent'] = value_percent
    data['angle'] = data['value']/data['value'].sum() * 2*pi
    data['color'] = Spectral[len(x1)]

    # Structure figure 1
    p1 = figure(plot_height=300, title="Total Funds", toolbar_location=None,
            tools="hover", tooltips="@service: @percent")

    p1.wedge(x=0, y=1, radius=0.4,
            start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
            line_color=None, fill_color='color', source=data)

    p1.axis.axis_label=None
    p1.axis.visible= False
    p1.grid.grid_line_color = None
    p1.background_fill_color= "gray"
    p1.background_fill_alpha = 0.4


    #---------------------------------------------- Fig. 2
    impact = impact_data
    impact_formatted = list(map(lambda x: "{:,}".format(x), impact))

    # Structure data 
    x2 = { 'LGBTQ Services': impact[0] , 'Homeless Services': impact[1], 'Cultural Affairs': impact[2], 'Women\'s Services': impact[3]}

    data2 = pd.Series(x2).reset_index(name='impact').rename(columns={'index':'service'})
    data2['impacted'] = impact_formatted 
    data2['angle'] = data2['impact']/data2['impact'].sum() * 2*pi
    data2['color'] = Spectral[len(x1)]

    # Structure figure 2
    p2 = figure(plot_height=300, title="Impacted People", toolbar_location=None,
            tools="hover", tooltips="@service: @impacted")


    p2.wedge(x=0, y=1, radius=0.4,
            start_angle=cumsum('angle', include_zero=True), end_angle=cumsum("angle"),
            line_color=None, fill_color='color', source=data2)

    p2.axis.axis_label=None
    p2.axis.visible=False
    p2.grid.grid_line_color = None
    p2.background_fill_color= "gray"
    p2.background_fill_alpha = 0.4

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
    legend.background_fill_color = "gray"
    legend.background_fill_alpha = 0.4


    # Output
    output = row(p1, legend, p2)
    item_text = json.dumps(json_item(output, "myplot"))
    
    f = open("./src/data/" + data_file + ".json", "a")
    f.write(item_text)
    f.close()
  

# Mock Data
args1A = [40, 20, 20, 20]
args1B = [40*5000, 20*3000, 20*1000, 2*7000]
name1 = "bokeh_data_1"

args2A = [25, 25, 25, 25]
args2B = [25*5000, 25*3000, 25*1000, 25*7000]
name2 = "bokeh_data_2"

args3A = [10, 10, 10, 70]
args3B = [10*5000, 10*3000, 10*1000, 70*1000]
name3 = "bokeh_data_3"

plot_row(args1A, args1B, name1)
plot_row(args2A, args2B, name2)
plot_row(args3A, args3B, name3)