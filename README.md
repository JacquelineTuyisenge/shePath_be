# Capstone Project - ShePath

## Overview
This repository contains the backend code for the Capstone Project. It is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/). The backend serves as the API for the frontend application.


## 📖 Description

The **ShePath Application** is a platform designed to empower women by providing mentorship, resources, and a supportive community.

## Table of Contents
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JacquelineTuyisenge/shePath_be.git
   cd shePath_be

## 🔗 GitHub Repositories
- **Backend Repository**: [ShePath Backend](hhttps://github.com/JacquelineTuyisenge/shePath_be.git)
- **Frontend Repository**: [ShePath Frontend](https://github.com/JacquelineTuyisenge/shePath_fe.git)

---

## 🛠️ How to Set Up the Environment and the Project

### Prerequisites
- Node.js (v16+)
- PostgreSQL (for the database)
- Sequelize (for ORM in the backend)
- React.js (for the frontend)

### Backend Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/JacquelineTuyisenge/shePath_be.git
   cd shepath-be
   ```

2. Install dependencies:

```bash
npm install
```

3. Set up database

 - ensure pgAdmin is installed and have tablePlus for better experience
 - creave **.env** file and include following:
   - PORT
   - DB
   - TEST_DB
   - JWT_SECRET
   - NODE_ENV
   - DB_PROD
   - BASE_URL
   - EMAIL
   - PASS
   - CLOUDNAME
   - APIKEY
   - APISECRET

4. Start server and run migrations
```bash
npm run start
npm run migrate
npm run seed
```


### Frontend
Clone the frontend repository:

```bash
git clone https://github.com/JacquelineTuyisenge/shePath_fe.git
cd shepath-fe
```

Install dependencies:

```bash
npm install
```
Create a .env file 

Start the React development server:

```bash
npm run dev
```
Open the app in your browser at :
https://she-path-front.vercel.app


🚀 Deployment Plan

### Backend
- RailWay

## Contributing
- Jaqueline Tuyisenge