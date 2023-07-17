# Getting Started with Pokemon server

Welcome to the Pokemon project! This readme file will guide you through the installation and usage of the application.

# Installation

1. To get started, follow these steps:

   Clone the repository using the following command:

   `git clone https://github.com/WamashuduSengani/Pokemon.git`

2. Navigate to the project directory:

   cd Pokemon

3. Install the project dependencies:

   In your terminal run this command `npm install` while in the project's directory

4. The application uses Apollo Server to interact with the Pokemon API using GraphQL. To configure Apollo Server, create a .env file in the project root directory and provide the following environment variables:   

  API_URL=https://pokeapi.co/api/v2/  

# Usage

To run the application, use the following command:

   In your terminal run this command `npm start` while in the project's directory

   Once the server is running, you can query the server in your browser by visiting http://localhost:4000 and it will take you to the Apollo playground.

   For example you can query the server using this 

   query ExampleQuery {
      getAllPokemons {
        name
       }
      }

   Feel free to explore the Pokemon api and enjoy the experience!

   If you have any questions or encounter any issues, please don't hesitate to reach out to me. Happy coding!
