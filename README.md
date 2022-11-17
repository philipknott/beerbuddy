# beerbuddy
Craft beer review platform. Partner project for CSCI 4448 at CU Boulder.

 ## Project 6 Status Update
 ## Project Name: Beer Buddy
 ## Team members: 
 Philip Knott, Alex Moss

 ## Work Done:
Philip worked on initializing the repository with Node.js, Vite, React.js, and TypeScript. Basic components of the frontend have been implemented, including searching beers and viewing information for each beer. Overall website styling has been implemented using the Bulma CSS framework. Interface for adding beers to website have been created. 
Alex has implemented the backend components such as the MongoDB and the express.js and has connected them to the front end elements so beers can be added to the database. 

 ## Changes/Issues Encountered:
    We decided to implement a class for Brewery, which will have an association with zero or more Beer instances. This way, we can make sure that the brewery associated with multiple beers of the same brewery are attached to one singular source, rather than just be associated by the name of the brewery (which could potentially lead to problems when users search for breweries). This also allows for users to be able to view information about a specific brewery. 
    One challenge that we will have to address is accurately associating Beers with Breweries when either is created. In our current design, we have Brewery as an optional parameter for Beer, which might create some ambiguous ways to associate them together.
    
 ## Patterns:
    The Builder pattern has been implemented for creating Beer and Brewery instances via two concrete builders. Both Beer and Brewery instances require a name as a string parameter, and contain various unique optional parameters. For example, beer instances can have an associated IBU value. This pattern streamlines the process of creating a Beer or Brewery instance into one line, where you can daisy-chain “set” methods to eachother to create an instance with all desired parameters in less code than it would otherwise take. 
    The Singleton pattern has been implemented for a class called DB, which contains all the logic for fetching data from the database. Using lazy initialization, the singular instance of the DB class can be accessed across classes and components on the platform to handle queries and populate data onto our frontend.

 ## Class Diagram:
 ![unnamed](https://user-images.githubusercontent.com/77478318/202345501-2d505d2d-a6c1-40d5-bdb2-dd4a358d69e4.png)

 ## Plan for Next Iteration:
For the next iteration we need to implement the login for users as well as the rating system for the beers. We currently have a database that can hold the beers, but we need to create a system to prompt the user to input their rating as well as a method to store it under each beer.
