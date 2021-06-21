# Interactive Hofstede Plot

I came across [Hofstede's cultural dimension theory](https://en.wikipedia.org/wiki/Hofstede%27s_cultural_dimensions_theory) recently and thought the visualization [Hostede-Insights website](https://www.hofstede-insights.com/country-comparison/germany,the-uk,the-usa/) were a bit lacking. While it's nice to see the comparison between various countries, it's hard to tell what the numeric values themselves mean since they don't seem to be normalize at first glace (maybe they are though). Without seeing where the countries of comparison fall with respect to ALL countries, it's hard to tell if 30 and 50 would be both above, below, or on different sides of the average. 

I found a raw dataset on what looks like it might be [Geert Hoftede's personal website](https://geerthofstede.com/research-and-vsm/dimension-data-matrix/) and I figured it would be a fun exercise to build a basic interactive plot with `d3.js`.

For an extra little bit of fun, I figure it might be interesting to use the country flags rather than points on the plot -- I found the `fonttool/regions-flags` [here]](https://github.com/fonttools/region-flags) and the github pages site [here](http://fonttools.github.io/region-flags/), so it should be easy enough to just point to the flag images there, like for instance the American stars and stripes:

![German Flag](http://fonttools.github.io/region-flags/svg/US.svg)

