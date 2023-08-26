const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Itay:uTdLFfmpWFmczk38@cluster0.ntd12kk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// check login
const login = async (username,password) => {
  const client = new MongoClient(uri,{useUnifiedTopology: true});

  try{
      await client.connect();
      console.log('connect');
      const database = client.db('restaurant_database');
      const collection = database.collection('accounts');
      const user = await collection.findOne({ username: username, password: password });

    if (user) {
      // Check the role of the user and return corresponding value
      if (user.role === 'manager') {
        console.log('manager')
        return 1;
      } else if (user.role === 'customer') {
        console.log('customer')
        return 2;
      }
    }
  } catch (error) {
      console.error('error');
      throw new Error ('faild');
  } finally {
      await client.close();
  }
};

// creating new user in the system
const addAccount = async (username, password, role) => {
    await client.connect()
    const database = client.db('restaurant_database');
    const collection = database.collection('accounts');

    // Create a new user document
    const newUser = {
      username: username,
      password: password,
      role: role
    };

    try {
      const result = await collection.insertOne(newUser);
      console.log('User inserted:', result.insertedId);
      return {result:result.insertedId, IsSuccess:true};
    } catch (error) {
      console.error('Error inserting user:', error);
      return {IsSuccess:false}
    }
  };

  const removeAccount = async (username) => {
    const database = client.db('restaurant_database');
    const collection = database.collection('accounts');
  
    try {
      const result = await collection.deleteOne({ username: username });
      if (result.deletedCount === 1) {
        console.log('User deleted:', username);
        return {result:result.deletedId, IsSuccess:true}; 
      } else {
        console.log('User not found:', username);
        return true ;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return {IsSuccess:false};
    }
  };

// creating new user in the system
const addRestaurant = async (restaurantName,restaurantType,restaurantLocation) => {
    await client.connect()
    const database = client.db('restaurant_database');
    const collection = database.collection('restaurants');

    // add new resturant
    const newResturant = {
      restaurantName: restaurantName,
      restaurantType: restaurantType,
      restaurantLocation: restaurantLocation
    };
      const result = await collection.insertOne(newResturant);
      console.log('new resturant:', result.insertedId);
      return {result:result.insertedId, IsSuccess:true};
  };

  const createCouponCode = async (restaurantName, couponCode, discount) => {
    try {
      await client.connect();
      const database = client.db('restaurant_database');
      const collection = database.collection('coupons');

      // Create a new coupon
      const newCoupon = {
        restaurantName: restaurantName,
        couponCode: couponCode,
        discount: discount
      };
  
      // Insert the new coupon document
      const result = await collection.insertOne(newCoupon);
      console.log('Coupon inserted successfully');
      return { result: result.insertedId, IsSuccess: true };
    } catch (error) {
      console.error('Error inserting coupon:', error);
      return { IsSuccess: false };
    }
  };

  const getAllRestaurants = async () => {
    const client = new MongoClient(uri,{useUnifiedTopology: true});
    try{
        await client.connect();
        console.log('connect');
        console.log('Connected to the database.');
        const database = client.db('restaurant_database');
        const collection = database.collection('restaurants');
        const restaurants = await collection.find().toArray();
        console.log(restaurants);
        return restaurants;
    } catch (error) {
        console.error('error');
        throw new Error ('faild');
    } finally {
        await client.close();
    }
};

  const findResturantByFilter = async (restaurantType) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
        console.log('Connecting to the database...');
        await client.connect();
        console.log('Connected to the database.');
        const database = client.db('restaurant_database');
        const collection = database.collection('restaurants');
        const filter = {};
        if (restaurantType) filter.restaurantType = restaurantType;
        const restaurants = await collection.find(filter).toArray();
  
        return restaurants;

    };

    // Add new Review
    async function addReview(restaurantName, rate, description, customerName, photo) {
      try {
        await client.connect()
        const database = client.db('restaurant_database');
        const collection = database.collection('reviews');
    
        const newReview = {
          restaurantName: restaurantName,
          rate: rate,
          description: description,
          customerName: customerName,
          photo: photo
          };
    
        const result = await collection.insertOne(newReview);
        console.log('Inserted review with ID:', result.insertedId);
        return {result:result.insertedId, IsSuccess:true};
      } catch (error) {
        console.error('Error inserting review:', error);
        return {IsSuccess:false}
      }
    }

    // get All Reviews
const getReviews = async () => {
  const database = client.db('restaurant_database');
  const collection = database.collection('reviews');

  try {
    const reviews = await collection.find().toArray();
    console.log('All reviews fetched:', reviews);
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};

  
//done

// exporting querys to use in app.js
module.exports={
  run,login,addAccount,removeAccount, addRestaurant,createCouponCode,findResturantByFilter,addReview,getAllRestaurants,getReviews
}
