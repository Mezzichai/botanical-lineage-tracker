WIP

Botanical Lineage Tracker is a wep app that allows users to keep track of, and visualize the familial relationships of the specific plant species individuals.

An example of the problem domain would suffice in understanding the utility of this application:

Imagine you are interested in selecting for specific morphological or chemical characteristics within a plant species.
Assuming you are working with hundreds or even thousands of individuals, it will prove a difficult task to keep track 
of their specific familial lineages without a GUI, which is very important if we are selecting for specific inherited 
characteristics.


Features include but are not limited to:

 - "tree view", which is a visualization tool for viewing the children of a given individual in a family tree like structure
 ![bfca04400c867d29a7f1b91fc002e419](https://github.com/Mezzichai/botanical-lineage-tracker/assets/76605204/679d9a2a-841f-4efe-a50e-03a9b8f390ef)


 - "grid view", a simplified view of individuals of a particular species that can be filtered and sorted at a fine granularity

 - low level control over each individual- water schedules, substrate compostitions, etc will default to the users species-specific
defaults, but can manually set as having its own individual-specific parameters

Frontend built with:

 - React
 - Redux (including RTK query)
 - Tanstack-Router
 - TypeScript

Backend built with:
 - Postgres
 - Express
 - NodeJS

System Info:
 - Node version - 18.12.1
 - Browser and version - Chrome version 124.0.6367.203
 - Postgres version - 16.1


