# Resocial

> Small social media application using the MERN stack & Redux

Resocial is a social Media Application for chatting with other users. This Application allows users to create a secure account, follow other users, create posts and comment on those posts. They can also like other users post and their own.

This Application uses Redux to control statemanagement throughout the application and has Server & Client Side Security using Passport & JWTs.

![image](/uploads/resocial.gif)

## Technologies

---

### Frontend

- ReactJs
- Redux (State management)
- Axios (Http Requests)
- React-Boostrap (boostrap for react)

### Backend

- ExpressJS
- Mongoose
- JSON Web Tokens

## Features

---

- Create / Update user profile.
- Create Posts with uploaded images and text.
- Follow other users
- Carousel on post detail page for uploaded image
- View other users posts based on following status
- Comment on posts
- Like Posts

## Installation

---

### Env Variables

Create a .env file in then root and add the following

```
DB_CONNECT= mongodb://127.0.0.1:27017/(your mongodb)
SECRET = secret
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install

```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Database

---

In the implentation of this application there is 2 mongo models:

### User

> ![image](/uploads/user.png)
