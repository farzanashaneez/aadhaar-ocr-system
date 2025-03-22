# Aadhaar OCR System

## Overview
The Aadhaar OCR System is a web-based application that allows users to upload Aadhaar card images and extract text using Optical Character Recognition (OCR) technology. The system consists of a backend API built with Node.js and Express and a frontend client built with React and Material UI.

## Features
* Upload Aadhaar card images 
* Extract text using Tesseract.js 
* Secure API with Helmet and CORS 
* Image processing using Sharp 
* Frontend built with React and Material UI 

## Tech Stack

### Backend (Server)
* Node.js with Express.js
* Tesseract.js for OCR
* Sharp for image processing
* Multer for file uploads
* Helmet for security
* Sanitize-html for input sanitization

### Frontend (Client)
* React with Vite
* Material UI for UI components
* React Router for navigation
* TypeScript for static typing

## Installation & Setup

### Prerequisites
Ensure you have Node.js and npm/yarn installed on your system.

### Backend Setup
```sh
cd server
npm install
npm run dev
```

### Frontend Setup
```sh
cd client
npm install
npm run dev
```

## Usage
1. Run the backend server (`npm run dev` in the server folder)
2. Start the frontend client (`npm run dev` in the client folder)
3. Open the web application in your browser
4. Upload an Aadhaar card image and extract the text

## Author
Developed by Farzana Shaneez
