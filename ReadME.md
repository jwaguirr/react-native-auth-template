### README

# React Native TypeScript Auth App

This is a React Native application built with TypeScript, designed for user authentication. The backend is implemented using Express and MongoDB, providing a secure and scalable API for user registration, login, and token management.

---

## Features

- **User Authentication**:
  - Register and login functionality.
  - Access and refresh token handling.
- **Frontend**:
  - Built with React Native and TypeScript.
  - Secure token storage using `SecureStore`.
- **Backend**:
  - API built with Express.
  - MongoDB as the database for user data.
  - Token-based authentication using JWT.

---

## Prerequisites

Ensure you have the following installed:

- Node.js and Yarn
- MongoDB
- React Native environment for your platform ([React Native Setup Guide](https://reactnative.dev/docs/environment-setup)).

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jwaguirr/react-native-auth-template.git
cd react-native-auth-app
```

### 2. Install Dependencies

#### Backend
Navigate to the `backend` directory and install dependencies:

```bash
cd backend
yarn install
```

#### Frontend
Navigate to the root directory and install dependencies for the React Native app:

```bash
cd ..
yarn install
```

---

## Running the Application

### 1. Start the Backend Server

Navigate to the `backend` directory and start the server:

```bash
cd backend
yarn run dev
```

This will start the Express server and connect it to your MongoDB instance. By default, the server runs on `http://localhost:5001`.

### 2. Start the React Native App

In the root directory, start the React Native app:

```bash
yarn run start
```

Follow the instructions in the terminal to run the app on an emulator or a physical device.

---

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory with the following environment variables:

```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── src/
│   ├── screens/
│   ├── hooks/
│   ├── navigation/
│   ├── components/
│   └── App.tsx
├── package.json
└── tsconfig.json
```

---

## Scripts

### Backend
- **`yarn run dev`**: Start the backend server in development mode.

### Frontend
- **`yarn run start`**: Start the React Native app.

---

## Dependencies

### Backend
- **Express**: For API development.
- **Mongoose**: For MongoDB integration.
- **jsonwebtoken**: For JWT handling.
- **dotenv**: For environment variables.

### Frontend
- **React Native**: For the mobile app.
- **TypeScript**: For type safety.
- **@tanstack/react-query**: For API data fetching and caching.
- **expo-secure-store**: For secure storage of tokens.

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
