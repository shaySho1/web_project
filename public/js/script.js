const fetchFunction = (html) => {
    fetch(html)
        .then(response => response.text())
        .then(htmlContent => {
            document.getElementById('body').innerHTML = htmlContent
        });
}

// add user by manager 
async function addNewAccount(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const newAccount = {username, password, role};
    const response = await fetch('/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAccount)
        })
    const data = await response.json();
    console.log('data', data)
    if (data==="Inserted sucessfully") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}

async function deleteAccount(event) {
    event.preventDefault();
    const username = document.getElementById('username-delete').value;
    const deleteuser = {username};
    const response = await fetch('/accounts', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteuser)
        })
    const data = await response.json();
    console.log('data', data)
    if (data==="deleted sucessfully") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}

async function addNewRestaurant(event) {
    event.preventDefault();
    const restaurantName = document.getElementById('restaurantName').value;
    const restaurantType = document.getElementById('restaurantType').value;
    const restaurantLocation = document.getElementById('restaurantLocation').value;
    const newResturant = {restaurantName,restaurantType,restaurantLocation};
    const response = await fetch('/resturant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResturant)
        })
    const data = await response.json();
    console.log('data', data)
    if (data==="Inserted sucessfully") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}

// add coupons
async function addCoupons(event) {
    event.preventDefault();
    const restaurantName = document.getElementById('restaurantName').value;
    const couponCode = document.getElementById('couponCode').value;
    const discount = document.getElementById('discount').value;
    const newCoupon = {restaurantName, couponCode, discount};
    const response = await fetch('/coupons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCoupon)
        })
    const data = await response.json();
    console.log('data', data)
    if (data==="comment sent sucessfully =)") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}

async function filterRestaurants() {
    const restaurantType = document.getElementById('restaurantType').value;
    console.log(restaurantType)
    const response = await fetch(`restaurants/?restaurantType=${restaurantType}`);
    const data = await response.json();
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = ''
    let resturant = ''

    data.forEach((restaurants) => {
        resturant += `
        <tr>
            <td>${restaurants.restaurantName}</td>
            <td>${restaurants.restaurantType}</td>
            <td>${restaurants.restaurantLocation}</td>

        </tr>`})
        restaurantList.innerHTML=resturant;
        const restaurantTable = document.querySelector('.restaurants-table');
        restaurantTable.style.display = 'block'; // Show the table
}

// add review
async function addrestaurantReview(event){
    event.preventDefault()
    const restaurantName =document.getElementById('restaurantName').value
    const description=document.getElementById('description').value
    const rate=document.getElementById('rate').value
    const customerName = document.getElementById('customerName').value
    const photo = document.getElementById('photo').value


    const newReview = {restaurantName, rate, description, customerName, photo}
    const response = await fetch ('/reviews', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),

    })
    const data = await response.json();
    console.log('data', data)
    if (data === "Inserted sucessfully") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}

// get all reviews
async function getAllReviews(){
    const respone = await fetch ('/reviews')
    const data = await respone.json();
    const reviewslist = document.getElementById('reviewsList')
    reviewslist.innerHTML=``
    let review = ''

    data.forEach((reviews) =>{
        review +=`<tr>
    <td>${reviews.restaurantName}</td>
    <td>${reviews.rate}</td>
    <td>${reviews.description}</td>
    <td>${reviews.customerName}</td>
    <td>${reviews.photo}</td>
    <tr>`})
    reviewslist.innerHTML=review;

    const reviewsTable = document.querySelector('.reviews-table');
    reviewsTable.style.display = 'block'; // Show the table
}
// show user all the flights
async function getAllRestaurants(){
    const respone = await fetch ('/Restaurants')
    const data = await respone.json();
    const restaurantsList = document.getElementById('restaurantList')
    restaurantsList.innerHTML=``
    let restaurant = ''

    data.forEach((restaurants) =>{
        restaurant +=`<tr>
    <td>${restaurants.restaurantName}</td>
    <td>${restaurants.restaurantType}</td>
    <td>${restaurants.restaurantLocation}</td>
    <tr>`})
    restaurantsList.innerHTML=restaurant;

    const restaurantTable = document.querySelector('.restaurants-table');
    restaurantTable.style.display = 'block'; // Show the table
    
}

document.addEventListener('DOMContentLoaded', () => {
    // Call a function to set up the event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Event listener for Discounts link
    const discountsLink = document.querySelector('#navigation li:nth-child(2) a');
    if (discountsLink) {
        discountsLink.addEventListener('click', () => {
            fetchCoupon();
        });
    }
}

//make fetchCoupon run onload
document.addEventListener('DOMContentLoaded', () => {
    fetchCoupon();
});
