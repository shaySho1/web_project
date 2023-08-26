##The_Best_Restaurant
Project for web development course
Don’t know where to eat? our web site will help you to find the best place for you.
In our web you will find 2 types of users - customers and manager. Each can do and see different things.
The customers see the web site from his side and can search restaurants by criteria, see discount coupon if there is one, see the reviews and even add a review of his own and upload pictures if he needs to.
The manager can control all the users and he can add and delete users from the system, the manager can also add new restaurants and update a discount coupon if he wants.
We have 4 main processes:
-	The first one is adding a new restaurant to the restaurants list by the manager and the customer can watch all the restaurants.
-	The second is to add and delete coupons by manager, so when the customer is looking on specific restaurant he can see if it has coupon or not.
-	The third one is the customer ability to filter the restaurants list by type of food (Italian, Chinese, etc...).
-	The fourth one is the client being able to add a review based on a specific restaurant, he can add description about the restaurant and add a picture to help other users get more information about the restaurant.
The database is built in mongoDB and its uses 4 collections:
-	The first one is users, which has 2 kinds of users, manager and customer, each contain username, password and role, based on each role the system will give access  to certain pages.
-	The second collection is restaurants, which contain all restaurants data such as name, type of food, and the location of the restaurant.
-	The third one is reviews. In this collection is stored all the reviews by customers on each restaurant.
-	The fourth one is coupons, which stored all the coupons the manger added for each restaurant.
Our architecture is structured in three tiers: the client side, the application-server side, and the server-database side.
1.	Client Side: The client side Contain all elements located within the public folder. This includes HTML pages, CSS designs, and the script.js file which holds JavaScript functionality. Users interact with the user interface here. 
2.	Application-Server Side: The application-server, managed by the app.js file, is responsible for handling post, get, and delete requests initiated by users. It establishes connections to the database and retrieves relevant data for users. This process is ran by the Express library.
3.	Server-Database Side: The server-database side resides in the model folder. It manages functions for retrieving data from the database and handling database connections. This component works in conjunction with Node.js, which serves as a server environment enabling JavaScript to be used as a backend language, and not just frontend.

The code follows the MVC (Model-View-Controller) pattern, which divides it into 3 sections, each with its specific responsibilities:
-	The Model, represented by the mongoDB.js file, manages database interactions. It includes functions related to database operations and data retrieval. 
-	The Views encompass everything located within the public folder. This pertains to components accessible to clients, such as HTML pages, CSS designs, and the script.js file housing JavaScript functionality.
-	The Controller resides within the app.js file, directing the flow by managing routes and facilitating communication between the Model and the Views. 




