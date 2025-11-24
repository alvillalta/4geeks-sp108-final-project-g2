# Hello World

A trip-planning web application where users can discover travel destinations and create personalized itineraries.

## Demo

This demo shows the main application behavior of **Hello World**.

### Preview

![Navigation](src/front/assets/img/hello-world-gif.gif)

### Key Screens

| Home |
|------|
|![Home](src/front/assets/img/1.png)|

| Login | Create Trip | Trips |
|------|-------------------|-----------|
| ![Login](src/front/assets/img/2.png) | ![Create Trip](src/front/assets/img/3.png) | ![Trips](src/front/assets/img/4.png) |

| Activities | Create Activity | Activity Planning |
|------|-------------------|-----------|
| ![Activities](src/front/assets/img/5.png) | ![Create Activity](src/front/assets/img/6.png) | ![Activity Planning](src/front/assets/img/7.png) |

## Tech Stack

**Frontend:** React, Bootstrap  
**Backend:** Flask, SQLAlchemy  
**Authentication:** JWT  
**External API:** Google Maps API 

## Installation

### Frontend
```bash
npm install
npm start
```

### Backend
```bash
pipenv install
pipenv run start
```

### Create a .env file
---

## Environment Configuration

The project requires an `.env` file for both the frontend and the backend.  
These variables are not included in the repository, as they depend on your local setup.

Here is a minimal example of what should it look like:

```env
# Back-End Variables
DATABASE_URL=postgres://gitpod:postgres@localhost:5432/example
FLASK_APP_KEY="any key works"
FLASK_APP=src/app.py
FLASK_DEBUG=1
DEBUG=TRUE

# Front-End Variables
VITE_BASENAME=/
VITE_BACKEND_URL=your_database_url

# JWT
JWT_SECRET_KEY=your_jwt_secret_key

# External API
VITE_GOOGLE_MAPS_API_KEY=google_maps_api_key
```

---

## Backend Setup & Migrations

Here's how to manage the backend API

### 1. Generate new migrations
*(Skip this step if you haven’t made changes to `./src/api/models.py`)*

```bash
pipenv run migrate
```

### 2. Apply migrations

```bash
pipenv run upgrade
```

### 3. Start the backend server

```bash
pipenv run start
```

### 4. Reset all with the newest database configuration
*(Optional)*


```bash
pipenv run reset_db
```

---


## Usage

Once both servers are running:

- The React application will start at port `http://localhost:3000`
- The Flask API will be available at its configured port `http://localhost:3001`

---

## Features

- Engineered 10+ REST API endpoints with **Flask**, supporting authentication and data handling.
- Integrated the `Google Maps API` to enable interactive location selection and activity list creation.
- Built a **Bootstrap**-powered interface with conditional rendering in React for adaptive UI.

---

## Project Structure

```
src/front/     Front-end
src/api/       Back-end
```

---

## Contributing

Contributions are welcome!  
Please feel free to open an issue or submit a pull request.

---

## License

MIT License
