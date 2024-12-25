# Book App

This application provides a RESTful API for managing a collection of books. It allows users to perform CRUD (Create, Read, Update, Delete) operations on books.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud-based instance)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd book-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
- **Development Mode**: 
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

The server will start at `http://localhost:4000`.

## API Endpoints

### Base URL
`http://localhost:4000/api/v1/book`

### Endpoints

#### 1. Create a Book
**POST** `/`

**Request:**
```bash
curl --location 'http://localhost:4000/api/v1/book/' \
--header 'Content-Type: application/json' \
--data '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "price": "10.99"
}'
```

**Response:**
- `201 Created`: Book successfully added.
- `400 Bad Request`: Invalid input.

---

#### 2. Get All Books
**GET** `/`

**Request:**
```bash
curl --location 'http://localhost:4000/api/v1/book/'
```

**Response:**
- `200 OK`: Returns a list of all books.
- `404 Not Found`: No books found.

---

#### 3. Get a Book by ID
**GET** `/:id`

**Request:**
```bash
curl --location 'http://localhost:4000/api/v1/book/676bb7af48bdd89846be22f3'
```

**Response:**
- `200 OK`: Returns the book with the specified ID.
- `404 Not Found`: Book not found.

---

#### 4. Update a Book
**PATCH** `/:id`

**Request:**
```bash
curl --location --request PATCH 'http://localhost:4000/api/v1/book/676bb7af48bdd89846be22f3' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Baby John",
    "price": "1200"
}'
```

**Response:**
- `200 OK`: Book successfully updated.
- `400 Bad Request`: Invalid input.
- `404 Not Found`: Book not found.

---

#### 5. Delete a Book
**DELETE** `/:id`

**Request:**
```bash
curl --location --request DELETE 'http://localhost:4000/api/v1/book/676bb7af48bdd89846be22f3'
```

**Response:**
- `200 OK`: Book successfully deleted.
- `404 Not Found`: Book not found.

## Database Schema

### Book Model
```javascript
{
    "title": "String", // Required, unique
    "author": "String", // Required
    "year": "Number", // Required
    "price": "String", // Optional
    "createdAt": "Date", // Auto-generated
    "updatedAt": "Date" // Auto-generated
}
```

## License
This project is licensed under the MIT License.