const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express()
const port = 3000
app.use(express.static('public')) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const {login,addAccount,removeAccount,addRestaurant,createCouponCode,findResturantByFilter,addReview,getAllRestaurants,getReviews}= require('./model/mongoDB')
const uri = "mongodb+srv://Itay:uTdLFfmpWFmczk38@cluster0.ntd12kk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}
connectToMongo();

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})


app.get('/restaurant', async (req, res) => {
  const restaurantType = req.query.restaurantType;
  const restaurantLocation = req.query.restaurantLocation;
  const database = client.db('restaurant_database');
  const collection = database.collection('restaurants');

  // filter restaurant
    const restaurants = await findResturantByFilter(restaurantType, restaurantLocation, collection);
    res.json(restaurants);

    
});


// check users login
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const loggedIn = await login(username, password);

  if (loggedIn === 1) {
    // User role is "manager," redirect to manager page
    res.redirect('/manager.html');
  } else if (loggedIn === 2) {
    // User role is "customer," redirect to customer page
    res.redirect('/client.html');
  } else {
    // The user does not exist, so show an error message.
    res.send('<script>alert("Try again incorrect Username or Password"); window.location.href = "/index.html";</script>');
  }
});

app.post('/accounts', async (req, res) => {
  console.log('req.body', req.body)
  const {username, password, role} = req.body
    const {IsSuccess} = await addAccount(username, password, role)
    if (IsSuccess) {
      res.status(200).json({message: "New Account was added!"})
    }
    else{res.status(400).json({message: "Could not add account"})}
})

//delete user
app.delete('/accounts', async (req, res) => {
  console.log('req.body', req.body)
  const {username} = req.body
    const {IsSuccess} = await removeAccount(username)
    if (IsSuccess) {
      res.status(200).json({message: "Account was deleted"})
    }
    else{res.status(400).json({message: "Account was not deleted sucessfully"})}
})

// add new resturant
app.post('/resturant', async (req, res) => {
  console.log('req.body', req.body)
  const {restaurantName,restaurantType,restaurantLocation} = req.body
    const {IsSuccess} = await addRestaurant(restaurantName, restaurantType, restaurantLocation)
    if (IsSuccess) {
      res.status(200).json({message: "Resturant was added to the list sucessfully!"})
    }
    else{res.status(400).json({message: "Resturant was not added to the list sucessfully"})}
})

// add new coupon code
app.post('/coupons', async (req, res) => {
  console.log('req.body', req.body)
  const {restaurantName, couponCode, discount} = req.body
    const {IsSuccess} = await createCouponCode(restaurantName, couponCode, discount) 
    if (IsSuccess) {
      res.status(200).json({message: "Coupon code was created sucessfully!"})
    }
    else{res.status(400).json({message: "Coupon code was not created sucessfully!"})}
})

// get resturants by filter
app.get('/restaurants', async (req, res) => {
  const restaurantType = req.query.restaurantType;
  const database = client.db('restaurant_database');
  const collection = database.collection('restaurants');

    if (restaurantType) {
      const restaurants = await findResturantByFilter(restaurantType, collection);
      res.json(restaurants);
    } else {
      const restaurants = await getAllRestaurants();
      res.json(restaurants);
    }
  });


// add review
app.post('/reviews', async (req, res) => {
  console.log('req.body', req.body)
  const {restaurantName, rate, description, customerName, photo} = req.body
    const {IsSuccess} = await addReview(restaurantName, rate, description, customerName, photo) 
    if (IsSuccess) {
      res.status(200).json({message: "Thank you for the review!"})
    }
    else{res.status(400).json({message: "Could not save review"})}
})

app.get('/reviews', async (req, res) => {
  const destination = req.query.destination;
  const database = client.db('restaurant_database');
  database.collection('reviews');

    const reviews = await getReviews();
    res.json(reviews);
  });

