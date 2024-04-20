# Shopping Cart App

The Shopping Cart App is a web application built with React and Redux that allows users to browse store items, add them to the cart, and manage their shopping cart.

## Features

- Browse store items and view their details
- Add items to the shopping cart
- Increase or decrease the quantity of items in the cart
- Remove items from the cart
- View the total price of the items in the cart
- Toggle the visibility of the cart
- Persist shopping cart data using localStorage

## Technologies Used

- React
- Redux
- React-Bootstrap
- Cypress (for end-to-end testing)
- Jest and react-testing-library (for unit testing)
- TypeScript
- TaneStack/ReactQuary

## Setup and Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the development server.
5. Open your browser and go to `http://localhost:5173` to view the application.

## Usage

1. On the home page, browse the available store items.
2. Click on an item to view its details.
3. To add an item to the cart, click the "Add to Cart" button on the item details page.
4. To increase or decrease the quantity of an item in the cart, use the respective buttons in the cart.
5. To remove an item from the cart, click the "Remove" button in the cart.
6. To toggle the visibility of the cart, click the "Toggle Cart" button.
7. The total price of the items in the cart is displayed at the bottom of the cart.

## Development

- Run `npm run test` to execute unit tests using Jest.
- Run `npx cypress open` to execute end-to-end tests using Cypress.
- The Redux store and actions are defined in the `src/reducers/cartReducer.ts` and `src/actions/cartActions.ts` files.
- The store items data is fetched from the server using the `getProductsList` function in `src/utilities/ApiUtilities.tsx`.
- The components for the store items, cart, and spinner are located in the `src/components` directory.

# Deployment
- The site is deployed using GitHub action workflows and GitHub page for host
- Check it out via the link : [Ecom Store](https://aymane-bendahmane.github.io/Ecommerce-Website-ReactTS/)