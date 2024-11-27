```markdown
# URL Shortener Backend

This is a backend application for a URL shortener service built using **Node.js**, **Express**, **MongoDB**, and **Shortid**.

## Features

- Shorten long URLs into short URLs.
- Redirect to the original URL from the shortened URL.
- Track and display statistics (number of clicks, last accessed time) for each shortened URL.
- Rate limiting to prevent abuse of the API.
- Support for MongoDB to store URL mappings.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building the backend.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store the original URLs and shortened URLs.
- **Shortid**: A package for generating unique short IDs for URLs.
- **dotenv**: To manage environment variables.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **express-rate-limit**: To apply rate limiting on the API.

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/alokmaurya013/urlshortner.git
```

### 2. Install Dependencies

Navigate into the project directory and install the dependencies:

```bash
cd urlshortner
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root of the project directory and add your MongoDB URI:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### 4. Start the Server

To start the backend server, run:

```bash
npm start
```

By default, the server will run on port `5000`, unless specified otherwise in the `.env` file.

## API Endpoints

### 1. `POST /shorten`
Shortens a given URL.

**Request body**:
```json
{
  "originalUrl": "https://www.example.com"
}
```

**Response**:
```json
{
  "shortId": "abcd1234",
  "message": "Short URL created successfully"
}
```

### 2. `GET /:shortId`
Redirects to the original URL associated with the provided short ID.

Example URL: `http://localhost:5000/shortId`

### 3. `GET /stats/:shortId`
Fetches statistics (click count, last accessed time) for a given short ID.

Example Response:
```json
{
  "originalUrl": "https://www.example.com",
  "shortId": "abcd1234",
  "clicks": 42,
  "lastAccessed": "2024-11-26T12:34:56Z"
}
```

## Rate Limiting

To prevent abuse, rate limiting is applied to all API routes. If a user exceeds the allowed number of requests, they will receive a `429 Too Many Requests` error.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
