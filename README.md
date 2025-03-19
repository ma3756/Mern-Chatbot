# MERN Chatbot

A chatbot application built using the **MERN (MongoDB, Express.js, React, Node.js)** stack and integrated with the Hugging Face API for AI-powered conversations.

## Features
- User-friendly chat interface.
- AI-powered responses using Hugging Face API.
- Stores chat history in MongoDB.
- Built with React for frontend and Express.js for backend.

## Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **AI Model:** Hugging Face API (BlenderBot 400M Distill)

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or later)
- **MongoDB** (local or Atlas)
- **MongoDB Compass** (for database management, optional)

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/mern-chatbot.git
cd mern-chatbot
```

### 2. Install Dependencies
#### Backend (Server)
```sh
cd server
npm install
```
#### Frontend (React App)
```sh
cd client
npm install
```

### 3. Set Up Environment Variables
Create a **.env** file in the `server` directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-chatbot
HUGGINGFACE_API_KEY=your_huggingface_api_key
```
Replace `your_huggingface_api_key` with your actual Hugging Face API key.

### 4. Start MongoDB
If running locally, start MongoDB:
```sh
mongod
```
Or, use MongoDB Atlas and update the `MONGO_URI` in `.env`.

### 5. Run the Application
#### Start Backend Server
```sh
cd server
npm start
```
#### Start Frontend
```sh
cd client
npm start
```
The frontend will be available at **http://localhost:3000**.

## Testing API (Without Postman)
If you don't have Postman or Curl, use the browser:
1. Start the backend server.
2. Open your browser and go to:
   ```
   http://localhost:5000/api/chat?message=hello
   ```
3. You should receive a JSON response from the chatbot.

## Viewing Chat Data in MongoDB Compass
1. Open MongoDB Compass.
2. Connect to: `mongodb://localhost:27017/mern-chatbot`
3. Select the `chats` collection to view stored conversations.

## Troubleshooting
- **MongoDB Error (System Error 5 / Access Denied):** Run the command prompt as administrator.
- **"Requested service already started" error:** Restart MongoDB using:
  ```sh
  net stop MongoDB
  net start MongoDB
  ```
- **API Authorization Error:** Check your Hugging Face API key in the `.env` file.

## Future Enhancements
- Implement user authentication.
- Support multiple AI models.
- Deploy to a cloud platform (Heroku, Vercel, etc.).

## License
This project is licensed under the MIT License.
