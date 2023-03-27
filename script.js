
fetch("productData.json")
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById("product-list");
    let trending = `<span class="position-absolute top-10 start-100 translate-middle badge2  badge-info">hot</span>`;

    for (let i = 0; i < data.products.length; i++) {

      const product = data.products[i];
      
      // Create a new HTML element for each product and add it to the product list

      const productElement = document.createElement("div");
         
      productElement.innerHTML = `
           <div class=" card m-4" style="width:300px">
        <div class="badge-overlay">
            <span class="top-left badge"> ${product.sale}</span>
        </div>
        <span
            class="position-absolute top-10 start-100 translate-middle badge1  badge-danger">
            -${product.tag}%
        </span>

        ${product.trending ? trending :""}

        <img src=${product.image} class="card-img-top" width="100%" height="300px">
        <div class="card-body pt-0 px-0">
            <div class="d-flex flex-row justify-content-between p-3 mid">
                <a class="d-flex flex-column text-muted mb-1">
                    ${product.category}
                </a>
                <p class="d-flex flex-column text-muted mb-2"> ${product.brand}
                </p>
            </div>
            <div class ="left-name">
            <strong> ${product.name}</strong>
            <p> $${product.price}&nbsp; &nbsp;&nbsp;&nbsp;<s>$${product.preprice}</s></p></div>
            <div class=" add mx-3 mt-3 d-block">
                <input type="number" class="quantity__input" value="1">
                
                <button type="button" onclick="getProductData(event, ${product.id},'cart')" class="btn btn-danger btn-block mb-1">ADD TO CART</button>
               
                        
                        &nbsp; &nbsp; &nbsp;
                <i class="fa-regular fa-heart mb-2" onclick="getProductData(event,${product.id},'wishlist')"></i> &nbsp; &nbsp;
                <i class="fa-solid  fa-arrow-right-arrow-left"></i>
                <div id="showcart-${product.id}" style="color:red;display:none">item succesfully added to the cart</div>
                
            </div>
            <div class="d-flex flex-row justify-content-between p-3 mid">
                <p class="d-flex flex-column mb-1">
                    <i class="fa-solid fa-dollar" style="color: lightgreen;"></i>Buy Now
                </p>
                <p class="d-flex flex-column mb-2"><i class="fa-solid fa-question"
                        style="color: red;"></i>Question
                </p>
            </div>
        </div>
    </div>
      `;
      productList.appendChild(productElement);
    }
    
  })
  .catch(error => console.error(error));



  let cartItems = []; 
  let wishlist = []; // Array to store products in the wishlist

  async function getProductData(event, productId, action) {
    event.preventDefault();
    const response = await fetch('productData.json');
    const data = await response.json();
    const product = data.products.find(product => product.id === productId);


       if (action === 'wishlist' && wishlist.includes(productId)) {
            alert('This product is already in your wishlist!');
            return;
        }
  
  
    // Perform the specified action (add to cart or add to wishlist)
    if (action === 'cart') {
    
      // Add the selected product to the cart
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
  
      } else {
        
        cartItems.push({ id: productId, quantity: 1, product });
      }
    
      
      const productCart = document.getElementById("product-add-to-cart");
  
      productCart.innerHTML = cartItems.map(item => `
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <img src="${item.product.image}" height="100px" width="100px">
            </div>
            <div class="col-md-6">
              <h3>${item.product.name}</h3>
              <p>$${item.product.price} x <b>${item.quantity}</b></p></div>
              <div class="col-lg-2">
              <span class="ml-10"> Total Price = ${item.product.price*item.quantity}</span></div>
              <i class="fa-reguler fa-circle-xmark fa-2x">hii</i>
            </div>
          </div>
      
      `);
      
      // total number of items
  
      let totalItems = 0;
  
      for (let i = 0; i < cartItems.length; i++) {
        totalItems += cartItems[i].quantity;
      }
       let totalitems = document.getElementById("additems");
           
        totalitems.innerHTML = `
        <div  style="font-size:25px;background-color:blue; color:white; border-radius: 50%; height: 35px;width: 35px">
        ${totalItems}
        </div>
        `
        
    } else if (action === 'wishlist') {

      // Add the selected product to the wishlist
       
       wishlist.push(productId);
      let item = document.getElementById("Wishlist-item");
     
      item.innerHTML +=`
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <img src="${product.img}" alt="" height="100px" width="100px">
         <button>Add to cart</button>
      `;
      
    }
  }
   

 
   
// seraching
const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');

searchBox.addEventListener('input', function(event) {
  const searchTerm = event.target.value.toLowerCase();
  searchResults.innerHTML = '';

  if (searchTerm.length >= 3) {
    fetch('productData.json')
      .then(response => response.json())
      .then(data => {
        const matches = data.products.filter(item => item.name.toLowerCase().includes(searchTerm));
        matches.forEach(item => {
          const li = document.createElement('li');
         li.innerHTML = `<li onclick= "searchedProduct(event,${item.id})" />${item.name}</a>`;

          searchResults.appendChild(li);
        });
      })
      .catch(error => console.log(error));
  }
});


// function to show product details
async function searchedProduct(event,productId) {
  // fetch the product details using the ID and do something with the data
  
      // do something with the product data, e.g. display it in a modal
      event.preventDefault();
      const response = await fetch('productData.json');
      const data = await response.json();
      const product = data.products.find(product => product.id === productId);
       document.getElementById("full").style.display="none";
        document.getElementById("searcheditem").innerHTML = ` 
        <h1 class="text-center">Searched Items</h1>
        
        <div class=" card m-4" style="width:310px">
        <div class="badge-overlay">
            <span class="top-left badge"> ${product.sale}</span>
        </div>
        <span
            class="position-absolute top-10 start-100 translate-middle badge1  badge-danger">
            -${product.tag}%
        </span>

        <img src=${product.image} class="card-img-top" width="100%" height="300px">
        <div class="card-body pt-0 px-0">
            <div class="d-flex flex-row justify-content-between p-3 mid">
                <a class="d-flex flex-column text-muted mb-1">
                    ${product.category}
                </a>
                <p class="d-flex flex-column text-muted mb-2"> ${product.brand}
                </p>
            </div>
            <div class ="left-name">
            <strong> ${product.name}</strong>
            <p> $${product.price}&nbsp; &nbsp;&nbsp;&nbsp;<s>$${product.preprice}</s></p></div>
            <div class=" add mx-3 mt-3 d-block">
                <input type="number" class="quantity__input" value="1">
                
                <button type="button" onclick="getProductData(event, ${product.id},'cart')" class="btn btn-danger btn-block mb-1">ADD TO CART</button>
                  
                        
                        &nbsp; &nbsp; &nbsp;
                <i class="fa-regular fa-heart mb-2" onclick="getProductData(event,${product.id},'wishlist')"></i> &nbsp; &nbsp;
                <i class="fa-solid  fa-arrow-right-arrow-left"></i>
            </div>
            <div class="d-flex flex-row justify-content-between p-3 mid">
                <p class="d-flex flex-column mb-1">
                    <i class="fa-solid fa-dollar" style="color: lightgreen;"></i>Buy Now
                </p>
                <p class="d-flex flex-column mb-2"><i class="fa-solid fa-question"
                        style="color: red;"></i>Question
                </p>
            </div>
        </div>
    </div>`
   

}

fetch("featuredCategory.json")
.then(response => response.json())
.then(data => {
  const productList = document.getElementById("product-list-2");
  for (let i = 0; i < data.products.length; i++) {

    const product = data.products[i];

    // Create a new HTML element for each product and add it to the product list

    const productElement = document.createElement("div");

    
    productElement.innerHTML = `
      <div class=" hidenav-7 card m-4" style="width:290px">


      <img src=${product.image} class="card-img-top" width="100%" height="270px">
      <div class="card-body pt-0 px-0">
          <div class="d-flex flex-row justify-content-between p-3 mid">
              <a class="d-flex flex-column text-muted mb-1">
                 
              </a>
              <p class="d-flex flex-column text-muted mb-2"> 
              </p>
          </div>
          <strong class="pl-3"> ${product.name}</strong>
          <p> </p>
         
            
              
              <button type="button"  class="btn btn-danger btn-block mb-1">ADD TO
                      CART</button>
                      
                      &nbsp; &nbsp; &nbsp;
              <i class="fa-regular fa-heart mb-2"></i> &nbsp; &nbsp;
              <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
          <div class="d-flex flex-row justify-content-between p-3 mid">
              <p class="d-flex flex-column mb-1">
                  <i class="fa-solid fa-dollar" style="color: lightgreen;"></i>Buy Now
              </p>
              <p class="d-flex flex-column mb-2"><i class="fa-solid fa-question"
                      style="color: red;"></i>Question
              </p>
          </div>
      </div>
  </div>
    `;
    productList.appendChild(productElement);
  }
})
.catch(error => console.error(error));



  
fetch("data.json")
.then(response => response.json())
.then(data => {
  const productList = document.getElementById("product-list-3");

  for (let i = 0; i < data.products.length; i++) {

    const product = data.products[i];

    // Create a new HTML element for each product and add it to the product list

    const productElement = document.createElement("div");
    
    productElement.innerHTML = `
         <div class="card m-4" style="width:300px">
             <img src=${product.image_url} class="card-img-top" width="100%" height="300px">
     
              
              <button type="button" class="btn btn-info btn-block mb-1">${product.category}</button>
                  
  </div>
    `;
    productList.appendChild(productElement);
  }
})
.catch(error => console.error(error));




fetch("brands.json")
.then(response => response.json())
.then(data => {
  const productList = document.getElementById("product-list-4");

  for (let i = 0; i < data.products.length; i++) {

    const product = data.products[i];

    // Create a new HTML element for each product and add it to the product list

    const productElement = document.createElement("div");
    
    productElement.innerHTML = `
    <div class="card  styleimger cus-card">
    <img src="${product.image}" alt="...">
</div>           
  </div>
    `;
    productList.appendChild(productElement);
  }
})
.catch(error => console.error(error));


//product cart
const cartAnchor = document.querySelector('.cart-anchor');
  const cartModal = new bootstrap.Modal(document.querySelector('#cartModal'));

  cartAnchor.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    cartModal.show(); // Show the modal
  });

// Get the login modal
var loginModal = document.getElementById("myModal");

// Get the button that opens the login modal
var loginBtn = document.getElementById("myBtn");

// Get the <span> element that closes the login modal
var loginCloseBtn = document.getElementsByClassName("close")[0];

// When the user clicks the login button, open the login modal
loginBtn.onclick = function() {
loginModal.style.display = "block";
}

// When the user clicks on <span> (x) in the login modal, close the modal
loginCloseBtn.onclick = function() {
loginModal.style.display = "none";
}

// Get the register modal
var registerModal = document.getElementById("myModal2");

// Get the button that opens the register modal
var registerBtn = document.getElementById("myBtn2");

// Get the <span> element that closes the register modal
var registerCloseBtn = document.getElementsByClassName("close2")[0];

// When the user clicks the register button, open the register modal
registerBtn.onclick = function() {
registerModal.style.display = "block";
}

// When the user clicks on <span> (x) in the register modal, close the modal
registerCloseBtn.onclick = function() {
registerModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == loginModal) {
loginModal.style.display = "none";
}
if (event.target == registerModal) {
registerModal.style.display = "none";
}
}

//wishlist
const wishlistLink = document.getElementById("wishlist-link");
const wishlistModal = document.getElementById("wishlist-modal");
const closeButton = document.querySelector(".close");

wishlistLink.addEventListener("click", () => {
    wishlistModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    wishlistModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == wishlistModal) {
        wishlistModal.style.display = "none";
    }
});
// register 
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
let users = []

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username-reg').value;
  const password = document.getElementById('password-reg').value;
  
  
  let user_obj = {
     username: username,
     pwd: password
  }

  
  let storedUsers = JSON.parse(localStorage.getItem("users"));

  if (storedUsers) { 
    for (let i = 0; i < storedUsers.length; i++) {
      if (storedUsers[i].username === username) {
        alert('Username already exists!');
        return;
      }
    }
  }

  
  users.push(user_obj);
  localStorage.setItem("users", JSON.stringify(users));


 
  alert('Registration successful!');
  registerModal.style.display = "none";
  registerForm.reset();
});

// Define the auth function
function auth() {
  let storedUsers = JSON.parse(localStorage.getItem("users"));
  
  let isLoggedIn = false;
  let username = "";

  if (storedUsers) { 
    for(let i = 0; i < storedUsers.length; i++) {
      if(storedUsers[i].loggedIn) 
      {
        isLoggedIn = true;
        username = storedUsers[i].username;
        break;
      }
      }
  }

  // Get the login, register, username-display and logout button elements
  const loginButton = document.getElementById("login-id");
  const registerButton = document.getElementById("register-id");
  const usernameDisplay = document.getElementById("username-display");
  const logoutButton = document.getElementById("logout-button");

  if(isLoggedIn) {
    // User is logged in, show the username and logout button, hide the login and register button
    loginButton.style.display = "none";
    registerButton.style.display = "none";
    usernameDisplay.style.display = "block";
    logoutButton.style.display = "block";
    usernameDisplay.textContent = `Welcome, ${username}!`;
  } else {
    // User is not logged in, show the login and register button, hide the username and logout button
    loginButton.style.display = "block";
    registerButton.style.display = "block";
    usernameDisplay.style.display = "none";
    logoutButton.style.display = "none";
  }
}

// Call the auth function on window load
window.onload = function() {
  auth();
}

// Update the loginForm event listener to set the loggedIn property for the user
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  let storedUsers = JSON.parse(localStorage.getItem("users"));
  let isLoginSuccessful = false; // flag variable

  if (storedUsers) { 
    for(let i = 0; i < storedUsers.length; i++) {
      if(username === storedUsers[i].username && password === storedUsers[i].pwd) {
        isLoginSuccessful = true;
        storedUsers[i].loggedIn = true; // Set the loggedIn property for the user
        localStorage.setItem("users", JSON.stringify(storedUsers)); // Update the stored users in local storage
        break; 
      }
    }
  }

  if(isLoginSuccessful) {
    loginModal.style.display = "none";
    alert("Login successful!");
    loginForm.reset();
    auth(); // Call the auth function to update the UI
  } else {
    alert("Invalid username or password!");
  }
});

// Update the logout button event listener to set the loggedIn property for the user to false
document.getElementById("logout-button").addEventListener("click",(e)=> {
  e.preventDefault();
  let storedUsers = JSON.parse(localStorage.getItem("users"));

  if (storedUsers) { 
    for(let i = 0; i < storedUsers.length; i++) {
      if(storedUsers[i].loggedIn) {
        storedUsers[i].loggedIn = false; // Set the loggedIn property for the user to false
        localStorage.setItem("users", JSON.stringify(storedUsers)); // Update the stored users in local storage
        break;
      }
    }
  }
  auth(); // Call the auth function to update the UI
});
