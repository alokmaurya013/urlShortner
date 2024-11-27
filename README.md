```markdown
# URL Shortener Backend

This is a backend application for a URL shortener service built using **Node.js**, **Express**, **MongoDB**, and **Shortid**.
#Backend render Url=https://urlshorteneralok.onrender.com/
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

## Documentation

### API Endpoints

This section provides detailed documentation for each API endpoint available in the application.

---

### 1. `POST /shorten`
Shortens a given URL.

**Request**:
- **Method**: `POST`
- **Endpoint**: `/shorten`
- **Request body**: 
  ```json
  {
    "originalUrl": "https://www.example.com"
  }
  ```

**Response**:
- **Status**: `201 Created`
- **Body**:
  ```json
  {
    "shortId": "abcd1234",
    "message": "Short URL created successfully"
  }
  ```

**Description**:
This endpoint takes the original URL provided in the request body and generates a shortened URL. The `shortId` is generated using the `shortid` library and stored in the MongoDB database.

---

### 2. `GET /:shortId`
Redirects to the original URL associated with the provided short ID.

**Request**:
- **Method**: `GET`
- **Endpoint**: `/:shortId` (e.g., `/SZiLqyXnp`)

**Response**:
- **Status**: `302 Found` (Redirect)
- **Body**: The user is redirected to the original URL (e.g., `https://www.example.com`).

**Description**:
This endpoint accepts a short ID as a URL parameter and redirects the user to the original URL associated with that ID. It also increments the click count and updates the last accessed time in the database.

---

### 3. `GET /stats/:shortId`
Fetches statistics (click count, last accessed time) for a given short ID.

**Request**:
- **Method**: `GET`
- **Endpoint**: `/stats/:shortId` (e.g., `/stats/SZiLqyXnp`)

**Response**:
- **Status**: `200 OK`
- **Body**:
  ```json
  {
    "originalUrl": "https://www.example.com",
    "shortId": "abcd1234",
    "clicks": 42,
    "lastAccessed": "2024-11-26T12:34:56Z"
  }
  ```

**Description**:
This endpoint returns statistics for the given short ID. The response includes the original URL, the short ID, the number of times the shortened URL has been accessed (click count), and the last time it was accessed.

---

### Rate Limiting

To prevent abuse, the API applies rate limiting to all routes. If a user exceeds the allowed number of requests, they will receive a `429 Too Many Requests` response. Rate limiting is applied via the `express-rate-limit` middleware.

---

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

Create a `.env` file in the root of the project directory and add your MongoDB URI and desired port:

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

---

## Sample Requests

### 1. Shortening a URL

#### Request
```bash
curl -X POST http://localhost:5000/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://www.example.com"}'
```

#### Response
```json
{
  "shortId": "abcd1234",
  "message": "Short URL created successfully"
}
```

### 2. Redirecting to the Original URL

#### Request
```bash
curl -X GET http://localhost:5000/abcd1234
```

#### Response
The browser will be redirected to the original URL `https://www.example.com`.

### 3. Getting URL Stats

#### Request
```bash
curl -X GET http://localhost:5000/stats/abcd1234
```

#### Response
```json
{
  "originalUrl": "https://www.example.com",
  "shortId": "abcd1234",
  "clicks": 42,
  "lastAccessed": "2024-11-26T12:34:56Z"
}
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Explanation of the Documentation

1. **API Endpoints**: 
   - Each endpoint (`POST /shorten`, `GET /:shortId`, `GET /stats/:shortId`) is explained with the method, the request body or parameters, and the response.
   
2. **Rate Limiting**: 
   - A brief explanation of how rate limiting is implemented using `express-rate-limit`, ensuring users don’t abuse the API.

3. **Project Setup**: 
   - A clear step-by-step guide on how to clone the repository, install dependencies, set up MongoDB, and run the server.

4. **Sample Requests**: 
   - Provides example `curl` commands for each of the major actions in the API (shorten URL, redirect, get stats).
