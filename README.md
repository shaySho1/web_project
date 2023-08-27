#The_Best_Restaurant

Project for web development course

Don’t know where to eat? our web site will help you to find the best place for you.

In our web you will find 2 types of users - customers and manager. Each can do and see different things.

The customers see the web site from his side and can search restaurants by criteria, , see the reviews and even add a review of his own and upload pictures if he needs to.

The manager can control all the users and he can add and delete users from the system, the manager can also add new restaurants and update a discount coupon if he wants.

We have 4 main processes:

-	The first one is adding a new restaurant to the restaurants list by the manager and the customer can watch all the restaurants.
  
-	The second is to add coupons by manager.
  
-	The third one is the customer ability to filter the restaurants list by type of food (Italian, Chinese, etc...).
  
-	The fourth one is the customer being able to add a review based on a specific restaurant, he can add description about the restaurant and add a picture to help other users get more information about the restaurant.
  
The database is built in mongoDB and its uses 4 collections:

-	The first one is accounts, which has 2 kinds of users, manager and customer, each contain username, password and role, based on each role the system will give access to certain pages.
  
-	The second collection is restaurants, which contain all restaurants data such as name, type of food, and the location of the restaurant.
  
-	The third one is reviews. In this collection is stored all the reviews by customers on each restaurant.
  
-	The fourth one is coupons, which stored all the coupons the manger added for each restaurant.
  
Our architecture is structured in three tiers: the client side, the application-server side, and the server-database side.

1.	Client Side: The client side Contain all elements located within the public folder. This includes HTML pages, CSS designs, and the script.js file which holds JavaScript functionality. Users interact with the user interface here.
   
2.	Application-Server Side: The application-server, managed by the app.js file, is responsible for handling post, get, and delete requests initiated by users. It establishes connections to the database and retrieves relevant data for users. This process is run by the Express library.
   
3.	Server-Database Side: The server-database side resides in the model folder. It manages functions for retrieving data from the database and handling database connections. This component works in conjunction with Node.js, which serves as a server environment enabling JavaScript to be used as a backend language, and not just frontend.

The code follows the MVC (Model-View-Controller) pattern, which divides it into 3 sections, each with its specific responsibilities:

-	The Model, represented by the mongoDB.js file, manages database interactions. It includes functions related to database operations and data retrieval.
  
-	The Views encompass everything located within the public folder. This pertains to components accessible to clients, such as HTML pages, CSS designs, and the script.js file housing JavaScript functionality.
  
-	The Controller resides within the app.js file, directing the flow by managing


[](url)
<img width="1163" alt="Screenshot 2023-08-27 at 0 27 15" src="https://github.com/shaySho1/web_project/assets/110743152/1f9bb70d-1c9d-43b3-a4ae-60d469fcab97">
<img width="1367" alt="Screenshot 2023-08-27 at 1 11 54" src="https://github.com/shaySho1/web_project/assets/110743152/395a490f-3a75-4fa3-9333-c63b71fdaea4">

<img width="1367" alt="Screenshot 2023-08-27 at 1 11 54" src="https://github.com/shaySho1/web_project/assets/110743152/64413507-910b-43ef-b727-1d86c955a9c0">
<img width="1206" alt="Screenshot 2023-08-27 at 1 11 58" src="https://github.co
<img width="1248" alt="Screenshot 2023-08-27 at 0 27 01" src="https://github.com/shaySho1/web_project/assets/110743152/43f167ef-9806-4f5e-aa48-79c6be9a46df">
<img width="1135" alt="Screenshot 2023-08-27 at 0 27 07" src="https://github.com/shaySho1/web_project/assets/110743152/13709e2f-63af-4755-9f4f-ec9fe25aa84d">
m/shaySho1/web_project/assets/110743152/5471ac9c-a4b5-448e-b602-92370a3634b9">
<img width="1150" alt="Screenshot 2023-08-27 at 1 12 03" src="https://github.com/shaySho1/web_project/assets/110743152/05dda9f6-291c-410e-b7fd-0321e39be575">


