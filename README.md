 Turbojugend Test Site

This is a Vue 3 project for managing Turbojugend chapters and user profiles. It includes Firebase authentication, a JSON server for mock data, and Tailwind CSS for styling.

## Features

- **Firebase Authentication**: Login with Google.
- **Chapter Management**: View chapters and their details.
- **User Profiles**: Display user-specific chapter memberships.
- **Mock API**: JSON server for local data simulation.
- **Responsive Design**: Tailwind CSS for styling.

## Project Structure

- `src/`: Contains the main application code.
  - `views/`: Vue components for different pages (e.g., Home, Chapters, Profile).
  - `services/api.ts`: API functions for fetching data.
  - `firebase.ts`: Firebase configuration and authentication logic.
  - `router/`: Vue Router configuration.
- `db.json`: Mock database for the JSON server.

## Setup and Usage

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/turbojugend.git
   cd turbojugend

2. Install dependencies:

npm install

3. Create a .env file in the root directory and add your Firebase configuration:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Running the Project
Start the JSON server:
npm run json-server

Start the development server:
npm run dev
Open the app in your browser at http://localhost:5173.


Building for Production
To build the project for production:

npm run build

License
This project is licensed under the MIT License.