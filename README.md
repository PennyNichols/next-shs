# SHS Site 2024

This project is a web application for SHS Site 2024. It includes features such as an estimate request form and a subscription form, integrated with Firebase for data storage.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Firebase Setup](#firebase-setup)
- [Security Rules](#security-rules)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)
- Firebase account

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/shs-site-2024.git
   cd shs-site-2024
   ```

2. Install the dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

## Configuration

1. Create a [.env.local](http://_vscodecontentref_/1) file in the root directory and add your Firebase configuration:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

2. Create a [firebase.js](http://_vscodecontentref_/2) file in the [src](http://_vscodecontentref_/3) directory and add your Firebase configuration:

   ```javascript
   // filepath: /c:/Users/pnich/Documents/SHS-site-2024/shs/src/firebase.js
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   export { db };
   ```

## Running the Application

1. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
shs-site-2024/
├── public/
├── src/
│   ├── app/
│   │   └── layout.js
│   ├── components/
│   │   ├── Forms/
│   │   │   └── EstimateRequestForm/
│   │   │       └── EstimateRequestForm.jsx
│   │   ├── ReusableComponents/
│   │   │   └── CustomRecaptcha/
│   │   │       └── CustomRecaptcha.jsx
│   │   └── SubscribeForm/
│   │       └── index.jsx
│   ├── firebase.js
│   └── utils/
│       └── captcha.js
├── .env.local
├── package.json
└── README.md
```

Firebase Setup:
Go to the Firebase Console.
Create a new project.
Add a web app to your project and copy the Firebase configuration.
Update the .env.local file with your Firebase configuration.

Security Rules:
Update your Firestore security rules to allow the necessary permissions for adding documents:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rules for the 'subscriptions' collection
    match /subscriptions/{subscriptionId} {
      allow create: if request.auth == null; // Allow unauthenticated users to create subscriptions
      allow read: if false; // Disallow reading subscriptions by default
      allow update: if false; // Disallow updating subscriptions by default
      allow delete: if false; // Disallow deleting subscriptions by default
    }

    // Rules for the 'estimateRequests' collection
    match /estimateRequests/{requestId} {
      allow create: if request.auth == null; // Allow unauthenticated users to create estimate requests
      allow read: if false; // Disallow reading estimate requests by default
      allow update: if false; // Disallow updating estimate requests by default
      allow delete: if false; // Disallow deleting estimate requests by default
    }
  }
}
```
