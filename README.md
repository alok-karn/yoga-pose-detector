# Getting Started

## Environment Setup

-   Create a `.env` file in the root directory with the following variable:
    ```dotenv
    MONGODB_URI=<your_mongodb_uri>
    ```

## Installation

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

## Upload all the data

```bash
    - http://localhost:3000/api/saveyogapose
```

## Project Structure

-   Component: Contains all reusable components.
-   lib: Includes helper functions like MongoDB connection (mongodb.js and mongoose.js).
-   models: Contains Mongoose schemas (ScheduledExercise and YogaPose).
-   pages:
    -   routine: Pages related to routine.
    -   yogascreen: Pages related to the yoga screen.
    -   index.js: Homepage/dashboard.
-   api:
    -   getyogapose: API to fetch all yoga poses.
    -   saveyogapose: API to save yoga poses.
    -   schedule: CRUD operations on scheduled exercises.
    -   updateStatus: Update status of yoga exercises performed for 2 minutes.

## Dependencies Used

-   rechart: Graph visualization.
-   mongoose: MongoDB connection.
-   next: Frontend framework.
-   tailwindcss: Styling utility.
-   fetch: API calls.
-   shadcn: UI components.
-   react-sweetalert: Alert popups.
