# Beer Buddy
Craft beer review platform. Partner project for CSCI 4448 at CU Boulder. Demonstrates use of object-oriented design patterns (namely Adapter, Singleton, Builder, and Proxy)

## Team members: 
Philip Knott, Alex Moss

## Language Version
`TypeScript 4.6.4`

## Work Done:

Philip worked on initializing the repository with Node.js, Vite, React.js, and TypeScript. Basic components of the frontend have been implemented, including searching beers and viewing information for each beer. Overall website styling has been implemented using the Bulma CSS framework. Interface for adding beers to website have been created. 

Alex has implemented the backend components such as the MongoDB and the express.js and has connected them to the front end elements so beers can be added to the database. Alex also created the Proxy pattern and the Adapter pattern.

## Changes/Issues Encountered:

We decided to implement a class for Brewery, which will have an association with zero or more Beer instances. This way, we can make sure that the brewery associated with multiple beers of the same brewery are attached to one singular source, rather than just be associated by the name of the brewery (which could potentially lead to problems when users search for breweries). This also allows for users to be able to view information about a specific brewery. 

One challenge that we will have to address is accurately associating Beers with Breweries when either is created. In our current design, we have Brewery as an optional parameter for Beer, which might create some ambiguous ways to associate them together.
    
 ## Patterns:

- The Builder pattern has been implemented for creating Beer and Brewery instances via two concrete builders. Both Beer and Brewery instances require a name as a string parameter, and contain various unique optional parameters. For example, beer instances can have an associated IBU value. This pattern streamlines the process of creating a Beer or Brewery instance into one line, where you can daisy-chain “set” methods to eachother to create an instance with all desired parameters in less code than it would otherwise take. 

- The Singleton pattern has been implemented for a class called DB, which contains all the logic for fetching data from the database. Using lazy initialization, the singular instance of the DB class can be accessed across classes and components on the platform to handle queries and populate data onto our frontend.

- The proxy pattern is used in our app in order to prevent direct access to the MongoDB. We use the proxy to allow the frontend to pretend that it can access the MongoDB, but in reality it is going through the proxy into a backend server that has sole access to the MongoDB. In addition, we are using this to abide by the Cross-origin resource sharing (CORS) policy that is to be upheald on all webapps. In order to be able to send data between the backend and frontend this proxy allows the frontend to pretend that the backend is simple a part of the frontend, which is acceptable in the CORS policy.

- The adapter pattern we used to transfer data between the frontend and the backend. Since our backend only accepted data in the form of a struct and our frontend was using our unique "Beer" object to show data, we needed something to bring them together, which was the Adapter pattern.

## Class Diagram:
![proj7uml drawio](https://user-images.githubusercontent.com/24510995/206091440-12891468-6f81-4c15-b699-43364816d153.png)
