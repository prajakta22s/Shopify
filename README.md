# E-commerce Application

This is a feature-rich e-commerce web application built using React and its ecosystem. The application includes functionalities for product listing, product detail view, cart management, user authentication, and order placement.

## Demo

You can view the live demo of the application [here](https://shopify-beige-theta.vercel.app/login).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [File Structure](#file-structure)

## Features

- Product Listing Page
  - Fetch product data from a mock API.
  - Display products in a grid layout with basic information (image, name, price).
  - Implement pagination for product listing.
- Product Detail Page
  - Show detailed information about a product (images, description, price, reviews).
  - Allow users to add the product to the cart.
- Shopping Cart
  - Implement a shopping cart to manage selected products.
  - Allow users to update the quantity of products in the cart.
  - Calculate and display the total price.
- User Authentication
  - Implement user registration and login functionality.
  - Use Firebase Authentication or another authentication service.
  - Protect certain routes to be accessible only to authenticated users.
- Order Placement
  - Allow users to place an order with the products in their cart.
  - Show order summary before finalizing the purchase.
  - Store order details in Firebase or another backend service.

## Technologies Used

- **Frontend**: React, React Router, Redux, styled-components
- **Backend**: Firebase Firestore, Firebase Authentication
- **Testing**: Jest, React Testing Library
- **Build Tools**: Create React App

## Setup Instructions

1. **Clone the Repository**

    ```sh
    git clone https://github.com/your-username/ecommerce-app.git
    cd ecommerce-app
    ```

2. **Install Dependencies**

    Ensure you have Node.js and npm installed. Then, run:

    ```sh
    npm install
    ```

3. **Setup Firebase**

    Create a Firebase project and add your web app. Copy your Firebase config and replace the placeholder values in the `.env` file.

    ```sh
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

    **Note:** Ensure the `.env` file is at the root of your project.

4. **Set Firestore Rules**

    Go to Firestore in your Firebase project and set the rules:

    ```plaintext
    service cloud.firestore {
      match /databases/{database}/documents {
        match /orders/{orderId} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```

## Running the Application

1. **Start the Development Server**

    ```sh
    npm start
    ```

    The application should now be running on [http://localhost:3000](http://localhost:3000).

## Running Tests

1. **Run All Tests**

    ```sh
    npm test
    ```

2. **Run Tests with Watch Mode**

    ```sh
    npm test -- --watch
    ```

## File Structure

```plaintext
ecommerce-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   ├── Cart.js
│   │   ├── Dashboard.js
│   │   ├── Header.js
│   │   ├── ProductDetail.js
│   │   ├── ProductList.js
│   │   ├── OrderSummary.js
│   │   ├── OrderConfirmation.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   ├── redux/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── authSlice.js
│   │   │   ├── cart/
│   │   │   │   ├── cartSlice.js
│   │   │   ├── product/
│   │   │   │   ├── productSlice.js
│   │   ├── store.js
│   ├── styles/
│   │   ├── globalStyles.js
│   ├── test/
│   │   ├── setup.js
│   │   ├── components/
│   │   │   ├── Header.test.js
│   │   │   ├── Dashboard.test.js
│   │   │   ├── Cart.test.js
│   ├── App.js
│   ├── index.js
│   ├── App.test.js
├── .env
├── package.json
├── README.md




## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
