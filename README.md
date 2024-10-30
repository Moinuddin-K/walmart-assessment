# Walmart-assessment

### Moinuddin Khaja


## Contents
  - [Introduction](#objective)
  - [Requirements](#requirements)
  - [Prerequisites](#prerequisites)
  - [Instructions to run the Project](#instructions-to-run-the-project)
  - [Scripts](#scripts)

## Introduction
We have to create a Application using React and backend of our choice (used Node.js) to showcase lazy loading to load data as the page is scrolled up and to enable search functionality to filter and retrieve items. The search should be able to search for item names, descriptions, prices, or image.

## Requirements
1. Develop a Simple Search User Interface using React.
2. Implement an API for setting up items.
3. Upon page load, display all the items and incorporate lazy loading to load data as the page is scrolled up (infinite scrolling).
4. Enable search functionality to filter and retrieve items. The search should be able to search for item names, descriptions, prices, or images.

## Prerequisites:
- Visual Studio Code or Any IDE 
- Database - MySQL
- Node.js

## Instructions to run the Project:
- Step 1: Clone the repository or download and unzip the source repository.
- Step 2: Open the project folder using Visual Studio Code or any IDE of your choice.
- Step 3: In the terminal cd into backend folder and run the command `npm install`.
- Step 4: Create a new file named .env and provide the following details - 
    - HOST = localhost
    - DB_USER = (Your MySQL user name)
    - PASSWORD = (Your MySQL password)
    - DATABASE = Walmart
    - DIALECT = mysql
    - DB_PORT = 3306
    - APP_PORT = 8080
- Step 5: Run the backend server using the command - `npm start server.js`. Your backend would be running now on - `http://localhost:8080/`
- Step 6: For running the Frontend server open a new terminal tab and cd into walmart folder and execute the command `npm install`.
- Step 7: Run the frontend server by executing the command `npm start server.js`
- Step 8: You can now access the website on the URL - `http://localhost:3000/`

## Scripts
- `npm start server.js`: starts the development server (Frontend)
- `npm start server.js`: starts the development server (Backend)