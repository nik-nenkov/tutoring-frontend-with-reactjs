# Simple Single-Page Application with React.js, Vite, TypeScript, and Spring Boot

This project is a modern single-page application (SPA) built using the following technologies:

- **React.js**: A popular JavaScript library for building user interfaces, using a component-based architecture.
- **Vite**: A fast build tool and development server that provides instant hot module replacement and optimized builds for modern web projects.
- **TypeScript (TS)**: A superset of JavaScript that adds static typing, improving code quality and developer experience.
- **JSX**: A syntax extension for JavaScript that allows you to write HTML-like code within your React components.
- **Spring Boot**: The backend is powered by a Spring Boot Java server, providing RESTful APIs for the frontend.
- **PostgreSQL**: The application uses PostgreSQL as its relational database for persistent data storage.

## Getting Started

1. **Frontend**:  
    The frontend is located in this repository. It uses Vite for development and build processes.  
    - To start the frontend, run:  
      ```bash
      npm install
      npm run dev
      ```
    - Make sure to update the API URL in `App.tsx` (or `App.js`) to point to your Spring Boot backend server.

2. **Backend**:  
    The backend is a separate Spring Boot project that exposes REST APIs and connects to a PostgreSQL database.  
    - Ensure your backend server is running and accessible.

3. **Database**:  
    - Set up a PostgreSQL database and configure your Spring Boot backend to connect to it.

## Project Structure

- `src/` - Contains React components written in TypeScript and JSX.
- `public/` - Static assets.
- `vite.config.ts` - Vite configuration file.

## Notes

- This project demonstrates a full-stack setup with a modern React frontend and a robust Java backend.
- For more details on backend setup, refer to the backend repository's README.

