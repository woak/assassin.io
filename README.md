assassin.io  
Author: Teddy Laurita

A website to administrate a game of assassin!

-------------SETUP-------------  
  
---Front end---  
For development server (automatically hot loads)  
  navigate to /client and run ```npm start```  

To build a production version  
  navigate to /client and run ```npm run build```  
  
---Back end---  
NOTE: requires node js:  
https://nodejs.org/en/download/  

To run server
  navigate to /lib and run ```node server.js```  
  
  
  
---Deployment---
this app is hosted through heroku, in order to deploy run the following command  
```git push heroku master```   

NOTE: dependencies must be added to the root package.json
TODO: fix the package.jsons - there's three rn and it's fucking atrocious

NOTE: to view prod database run ```heroku pg:psql``` in this dir