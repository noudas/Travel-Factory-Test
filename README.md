# Backend - Travel Factory API

This is the backend for the Travel Factory project. It provides authentication and vacation request management using Express.js and PostgreSQL with NeonDB.

## Folder Structure
```
Backend/
├── controllers/
│   ├── userController.js
│   ├── vacationRequestsController.js
├── models/
│   ├── userModel.js
│   ├── vacationRequestsModel.js
├── routes/
│   ├── index.js
│   ├── userRoutes.js
│   ├── vacationRoutes.js
├── utils/
│   ├── auth.js
│   ├── db-init.js
│   ├── validators.js
├── .env (Not committed to version control)
├── package.json
├── server.js
```

## Installation & Setup

### 1. Clone the repository
```sh
git clone https://github.com/your-repo.git
cd backend
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up the environment variables
Create a `.env` file in the root directory and configure the following:
```env
DATABASE_URL="your_postgresql_connection_url"
JWT_SECRET="your_jwt_secret_key"

# PostgreSQL Connection Details
PGHOST='your_db_host'
PGDATABASE='your_db_name'
PGUSER='your_db_user'
PGPASSWORD='your_db_password'
```

### 4. Start the server
```sh
npm start
```
The server will run on `http://localhost:3000` by default.

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login and receive a JWT token
- `POST /api/v1/users/logout` - Logout the user
- `GET /api/v1/users/profile` - Get user profile (requires authentication)

### Vacation Requests
- `POST /api/v1/vacations/` - Submit a vacation request (requires authentication)
- `GET /api/v1/vacations/` - Retrieve all vacation requests (requires authentication)
- `GET /api/v1/vacations/:id` - Get a specific vacation request (requires authentication)
- `PUT /api/v1/vacations/:id/approve` - Approve a vacation request (requires authentication)
- `PUT /api/v1/vacations/:id/reject` - Reject a vacation request (requires authentication)

### JWT Authentication
Include the token in the `Authorization` header as follows:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Technical Choices Made
- **Express.js**: Chosen for its simplicity and efficiency in building RESTful APIs.
- **PostgreSQL with NeonDB**: A managed database service allowing for serverless access and scalability.
- **JWT for Authentication**: Secure and stateless authentication mechanism.
- **Modular Architecture**: Separation of concerns with controllers, models, routes, and utilities.
- **dotenv**: Used for managing environment variables securely.

## Known Limitations
- **No Rate Limiting**: API endpoints currently do not have request throttling.
- **No Refresh Token Mechanism**: JWT authentication does not include refresh tokens yet.
- **Basic Error Handling**: Limited error messages and validation feedback for API responses.
- **No Role-Based Access Control (RBAC)**: All authenticated users have the same level of access.

## Contribution
Feel free to fork this repository and submit a pull request for improvements!

## License
This project is licensed under the ISC License.

