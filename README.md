# Travel Factory API - Full Stack Project

This project consists of a **backend** built with Express.js and PostgreSQL and a **frontend** built with Vite, React, and TypeScript. It provides authentication and vacation request management.

---

# Web Development Intern Recruitment Test: Vacation Management Interface

## Objective
Develop a web application for managing vacation requests. The application should include two user interfaces:
- **Requester Interface**: For employees to request vacations.
- **Validator Interface**: For managers to review and approve/reject vacation requests.

The project must use **Vue.js/React** for the frontend, **Node.js** for the backend, and a **relational database** (e.g., PostgreSQL, MySQL).

## Deliverables
- A working application deployed locally with clear setup instructions.
- Well-documented code and a brief explanation of your approach.
- Basic test cases (unit tests or integration tests).

## Requirements
### Requester Interface
- A form to submit vacation requests with the following fields:
  - Start Date (required)
  - End Date (required)
  - Reason (optional)
- Display a list of the user's submitted requests with their statuses (Pending, Approved, or Rejected).

### Validator Interface
- A dashboard displaying all submitted vacation requests.
- Ability to filter requests by status (Pending, Approved, Rejected).
- Buttons to Approve or Reject a request.
- A comment field for providing feedback on rejected requests.

### Backend API (Node.js)
- Endpoints for:
  - Submitting a vacation request.
  - Retrieving vacation requests (by requester or all for the validator).
  - Approving/rejecting a request with optional comments.
- Input validation and error handling.
- Use of RESTful principles.

### Database
Tables for:
- **Users**: (id, name, role: Requester/Validator)
- **Vacation Requests**: (id, user_id, start_date, end_date, reason, status, comments, created_at)

## Additional Notes
- Use Vue Router / React Router for navigation between requester and validator interfaces.
- Use Axios for API calls.
- Use TypeORM or equivalent for database interaction.
- Ensure the UI is responsive and user-friendly.

## Evaluation Criteria
- **Code Quality**: Clean, modular, and well-documented code.
- **Functionality**: Meets requirements and handles edge cases.
- **Database Design**: Proper schema with efficient queries.
- **Creativity**: Any extra features or enhancements added.
- **Presentation**: Easy-to-follow setup instructions and clear implementation explanations.

## Instructions for the Candidate
- Use your repository to store the code or send it back.
- Add a README file explaining:
  - How to install and run the project.
  - Technical choices made.
  - Any known limitations.
- Estimated Time for the Test: **3 to 4 hours**.

---

# Backend

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
- `GET /api/v1/vacations/user/:id` - Retrieve all vacation requests from an specific user (requires authentication)
- `GET /api/v1/vacations/:id` - Get a specific vacation request (requires authentication)
- `PUT /api/v1/vacations/:id/approve` - Approve a vacation request (requires authentication)
- `PUT /api/v1/vacations/:id/reject` - Reject a vacation request (requires authentication)

---

# Frontend

## Folder Structure
```
Frontend/
├── src/
│   ├── api/
│   │   ├── api.tsx
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── LogoutButton.tsx
│   │   ├── RequestFilter.tsx
│   │   ├── RequestForm.tsx
│   │   ├── RequestItem.tsx
│   │   ├── RequestList.tsx
│   │   ├── RequestTable.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── RequestorDashboard.tsx
│   │   ├── ValidatorDashboard.tsx
│   ├── redux/
│   │   ├── store/
│   │   │   ├── store.tsx
│   │   ├── slices/
│   │   │   ├── authSlice.tsx
│   │   │   ├── requestSlice.tsx
│   │   │   ├── userSlice.tsx
│   │   │   ├── vacationSlice.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
├── package.json
```

## Technologies Used & Why
- **Vite**: Faster development environment with hot module replacement.
- **React + TypeScript**: Provides a scalable and type-safe frontend.
- **Redux Toolkit**: Simplifies state management.
- **Axios**: Streamlines HTTP requests and authentication.
- **Tailwind CSS**: Offers a utility-first approach to styling.

## Installation & Setup

### 1. Navigate to the frontend directory
```sh
cd frontend
```

### 2. Install dependencies
```sh
npm install
```

### 3. Start the frontend
```sh
npm run dev
```
The frontend will run on `http://localhost:5173` by default.

## Known Limitations
- **Code Optimization Needed**: There is extra code that can be cleaned up.

## Future Improvements
- **Implementing extra Features**: When Rejecting a vacation there is an option to add the reason for rejection.
- **Refining Redux Implementation**: Improve API interactions within Redux slices.
- **Code Cleanup & Optimization**: Remove redundant code to streamline performance.
- **User Experience Enhancements**: Enhance UI responsiveness and usability for a seamless workflow.