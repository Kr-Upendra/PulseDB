# Pulsedb

Pulsedb is a backend service built with Node.js, Express, MongoDB, and TypeScript for managing books. It includes authentication and authorization, CRUD operations for book data, and role-based access control for different users.

This README will guide you through setting up and using the API.

## Features

1. Authentication: Login and registration routes, using JWT (JSON Web Tokens).

2. Authorization: Role-based access control to determine which users can access certain resources.
3. Admin users can add or delete books.
4. Admin and moderator users can update books.
5. All authenticated users can view book details and lists.
6. Book Management: Create, read, update, and delete book records with role-based permissions.
7. User Profile: Authenticated users can view their profiles.

## Prerequisites

Before setting up the project, make sure you have the following:

- Node.js (version 20 or higher)
- MongoDB instance running locally or on a cloud provider like MongoDB Atlas.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/pulsedb.git
cd pulsedb
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

   - Copy the .env.sample file to create your own .env file:

   ```bash
   cp .env.sample .env
   ```

   - Open the .env file and update the following environment variables:

   ```env
   PORT=8000
   MONGO_URI=your_mongo_uri
   JWT_SECRET_TOKEN=your_secret_string
   JWT_SECRET_TOKEN_EXPIRE=your_preferred_expire_time
   NODE_ENV=developement,production
   ```

4. Start the server:

   - To run the application in development mode.

   ```bash
   npm run dev
   ```

   - To run the application in production mode.

   ```bash
   npm run start
   ```

This will start the server on http://localhost:8000 (or another port if configured differently).

## API Routes

### Authentication Routes

1.  <b>POST /api/auth/register</b>

    - <b>Description:</b> Register a new user.

    - <b>Required Fields:</b>

      - `username` (string): The user's desired username.

      - `email` (string): The user's email address.
      - `password` (string): The user's password. It should be at least 6 characters long for security reasons.

    - <b>Request Body</b> (example):

      ```json
      {
        "username": "exampleUser",
        "email": "user@example.com",
        "password": "password123"
      }
      ```

    - <b>Response</b>: If registration is successful, you will receive a confirmation message:

      ```json
      {
        "status": "success",
        "message": "User registered successfully!"
      }
      ```

2.  <b>POST /api/auth/login</b>

    - <b>Description</b>: Login with your credentials to receive a JWT token.

    - <b>Required Fields:</b>

      - `email` (string): The user's email address.
      - `password` (string): The user's password.

    - <b>Request Body</b> (example):

      ```json
      {
        "email": "user@example.com",
        "password": "password123"
      }
      ```

    - <b>Response</b>: If the credentials are correct, you will receive a response like above:

      ```json
      {
        "status": "success",
        "message": "You are logged in successfully.",
        "data": {
          "user": {userdata} ,
          "token": "jwt_token"
        }
      }
      ```

    - <b>Use of Token</b>: The JWT token you receive must be included in the Authorization header of any request that requires authentication. Here's how you can include the token:

    - <b>Example:</b>

      ```makefile
      Authorization: Bearer <jwt_token_here>
      ```

      Replace <jwt_token_here> with the token you received during login.
