# auth-server :Authentication System.

# Author: Bushra Bilal.

# Links and Resourcs:

- [PR Link](https://github.com/bushra-401-advanced-javascript/auth-server/pull/1)

# Setup:

- Enviroument Variables:
  - PORT=3000
  - MONGODB_URI='mongodb://localhost:27017/auth-db'
  - SECRET='auth_secret'

  ## How to initialize/run your application: 

  - clone app's repo

  - install the packages:  
    `npm i base-64 bcryptjs cors dotenv express jsonwebtoken mongoose morgan`

  - to run the server:  
    `node index.js`

  - hit the routes using Postman/Swagger:  
    - Sign-up route - POST: `http://localhost:3000/signup/`  
    - Sign-in route - POST: `http://localhost:3000/signin/`  
    - Get all users - GET: `http://localhost:3000/users/` 

# UML
