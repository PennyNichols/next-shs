# SHS Site 2025

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
- java (v21.0.7 or higher)

- If you are contributing to this project as a free agent, you will also require a Firebase account. Developers on the team will be provided with environment variables.

## Installation

1. Clone the repository:

Instructions to Clone with SSH Keys
1. Check for existing SSH keys in your terminal (Git Bash on Windows, Terminal on macOS/Linux):
```sh
ls -al ~/.ssh
```
Look for files named id_rsa.pub, id_ed25519.pub, or similar. If you find one, proceed to Step 3.
2. Generate a New SSH Key (if needed):
If you don't have an existing key or prefer a new one, generate it (replace your_email@example.com with your GitHub registered email):
```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```
Or for RSA (older, but widely supported):
```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
Press Enter to accept the default file location (~/.ssh/id_ed25519 or ~/.ssh/id_rsa).

You'll be prompted to enter a passphrase; remember it!

3. Add Your SSH Key to the SSH Agent:
Start the SSH agent in the background:
```sh
eval "$(ssh-agent -s)"
```
4. Add your private SSH key to the agent (replace id_ed25519 with your key file name if different):
```sh
ssh-add ~/.ssh/id_ed25519
```
If you set a passphrase, you'll be prompted to enter it.

5. Add Your SSH Public Key to GitHub:
Copy your public key:

macOS/Linux:
```sh
pbcopy < ~/.ssh/id_ed25519.pub
```
Or for older systems/no pbcopy:
```sh
cat ~/.ssh/id_ed25519.pub
```
Windows (Git Bash):
```sh
cat ~/.ssh/id_ed25519.pub | clip
```
6. Go to GitHub:

- Log in to your GitHub account.
- Go to Settings (your profile picture in the top right) > SSH and GPG keys.
- Click New SSH key or Add SSH key.
- Give it a descriptive Title (e.g., "My Work Laptop").
- Paste your copied public key into the Key field.
- Click Add SSH key. You may be asked to re-enter your GitHub password.

7. Clone the Repository + Navigate to Project:
Run the clone command in your terminal using the SSH URL:
```sh
  git clone git@github.com:PennyNichols/SHS-next.git
  cd shs-site-2024
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
   NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_DATABASE_URL=your_firebase_database_url
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

3. generate a .firebaserc file in the root directory with these contents:
   ```plaintext
    {
      "projects": {
        "default": "next-shs"
      }
    }
   ```

4. install root directory dependencies (npm install or yarn install)
5. install functions/ directory dependencies (npm install or yarn install)
6. initiate emulators
  ```sh
  (firebase init emulators) 
  ```
7. start emulators 
  ```sh
  (firebase emulators:start)
  ```

## Firebase Emulator Commands:

Navigate to your project's root directory (where firebase.json is located) for most commands.

1. Sets up the emulator configuration in your firebase.json and downloads the necessary emulator binaries. Run this once. The project is already initialized, select "No" when prompted to initialize a new project, and it will proceed to configure emulators.
```sh
  firebase init emulators
```

2. Starts all Firebase emulators configured in your firebase.json. This is the primary command for local development.
```sh
  firebase emulators:start
```

3. Start only a subset of emulators (e.g., if you only need functions and Firestore):
```sh
  firebase emulators:start --only functions,firestore,auth,storage
  firebase emulators:start --export-on-exit=[path]:
```

4. Saves the current state of your emulated data (Firestore, RTDB, Storage, Auth) to a local directory when the emulators shut down. Useful for preserving test data.
```sh
  firebase emulators:start --export-on-exit=./firebase-data
  firebase emulators:start --import=[path]:
```

5. Loads previously saved emulator data from the specified path when starting the emulators.
```sh
  firebase emulators:start --import=./firebase-data
  firebase emulators:exec "your-test-command" --only [emulators]:
```

6. Starts the specified emulators, runs a shell command (e.g., npm test), and then shuts down the emulators. For CI/CD pipelines and automated testing.
```sh
  firebase emulators:exec "npm test" --only functions,firestore
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
┣ 📂.firebase
┣ 📂.github
┃ ┣ 📂workflows
┃ ┃ ┗ 📜eslint.yml
┃ ┗ 📜CODEOWNERS
┣ 📂.vscode
┃ ┗ 📜settings.json
┣ 📂components
┃ ┣ 📂ActionButtons
┃ ┃ ┣ 📜CallButton.jsx
┃ ┃ ┣ 📜CreateBlogButton.jsx
┃ ┃ ┣ 📜EstimateRequestButton.jsx
┃ ┃ ┣ 📜ReviewButton.jsx
┃ ┃ ┣ 📜ShareButton.jsx
┃ ┃ ┗ 📜TextButton.jsx
┃ ┣ 📂Award
┃ ┃ ┗ 📜Award.jsx
┃ ┣ 📂ComingSoon
┃ ┃ ┗ 📜ComingSoon.jsx
┃ ┣ 📂Footer
┃ ┃ ┣ 📜Footer.jsx
┃ ┃ ┗ 📜MinFooter.jsx
┃ ┣ 📂Forms
┃ ┃ ┣ 📂AuthForm
┃ ┃ ┃ ┗ 📜AuthForm.jsx
┃ ┃ ┣ 📂BlogForm
┃ ┃ ┃ ┣ 📜BlogForm.jsx
┃ ┃ ┃ ┗ 📜BlogFormWYSIWYG.jsx
┃ ┃ ┣ 📂EstimateRequestForm
┃ ┃ ┃ ┣ 📜EstimateRequestForm.jsx
┃ ┃ ┃ ┗ 📜validation.js
┃ ┃ ┗ 📂JobApplication
┃ ┃   ┗ 📜JobApplication.jsx
┃ ┣ 📂Hero
┃ ┃ ┣ 📜CompanyNameHeader.jsx
┃ ┃ ┣ 📜Hero.jsx
┃ ┃ ┣ 📜HeroActionArea.jsx
┃ ┃ ┣ 📜HeroContainer.jsx
┃ ┃ ┣ 📜HeroHeader.jsx
┃ ┃ ┗ 📜HeroScroll.jsx
┃ ┣ 📂Layout
┃ ┣ 📂NavBar
┃ ┃ ┗ 📜NavBar.jsx
┃ ┣ 📂ReusableComponents
┃ ┃ ┣ 📂ActionButton
┃ ┃ ┃ ┗ 📜ActionButton.tsx
┃ ┃ ┣ 📂ArrowButtons
┃ ┃ ┃ ┗ 📜ArrowButtons.jsx
┃ ┃ ┣ 📂baseComponents
┃ ┃ ┃ ┣ 📜ContentBox.jsx
┃ ┃ ┃ ┣ 📜index.js
┃ ┃ ┃ ┣ 📜PageContainer.jsx
┃ ┃ ┃ ┣ 📜PageTitle.tsx
┃ ┃ ┃ ┣ 📜Section.jsx
┃ ┃ ┃ ┗ 📜SectionTitle.jsx
┃ ┃ ┣ 📂CustomCheckbox
┃ ┃ ┃ ┗ 📜CustomCheckbox.jsx
┃ ┃ ┣ 📂CustomModal
┃ ┃ ┃ ┗ 📜CustomModal.tsx
┃ ┃ ┣ 📂CustomTextField
┃ ┃ ┃ ┣ 📜CustomTextField.tsx
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂DropdownMultiSelect
┃ ┃ ┃ ┗ 📜DropdownMultiSelect.jsx
┃ ┃ ┣ 📂GroupedMultiSelect
┃ ┃ ┃ ┗ 📜GroupedMultiSelect.jsx
┃ ┃ ┣ 📂TruncatedChip
┃ ┃ ┃ ┗ 📜TruncatedChip.jsx
┃ ┃ ┗ 📂TypographyHangingIndent
┃ ┃   ┗ 📜TypographyHangingIndent.jsx
┃ ┣ 📂ReviewCard
┃ ┃ ┗ 📜ReviewCard.jsx
┃ ┣ 📂ServicesAccordion
┃ ┃ ┗ 📜ServicesAccordion.jsx
┃ ┣ 📂SubscribeForm
┃ ┃ ┗ 📜SubscribeForm.jsx
┃ ┗ 📂SVG
┃   ┣ 📜CementMixerSvg.jsx
┃   ┣ 📜LogoSvg.jsx
┃   ┣ 📜LogoWithTextSvg.jsx
┃   ┗ 📜VilliageSvg.jsx
┣ 📂constants
┃ ┣ 📜careers.js
┃ ┣ 📜companyDetails.js
┃ ┣ 📜FAQ.js
┃ ┣ 📜privacyPolicy.js
┃ ┗ 📜services.js
┣ 📂contexts
┣ 📂extensions
┣ 📂functions
┃ ┣ 📜.eslintrc.js
┃ ┣ 📜.gitignore
┃ ┣ 📜authMiddleware.js
┃ ┣ 📜index.js
┃ ┣ 📜package.json
┣ 📂hooks
┃ ┣ 📂auth
┃ ┃ ┗ 📜auth.js
┃ ┣ 📜FirebaseService.js
┃ ┣ 📜useMedia.js
┃ ┣ 📜useRecaptcha.js
┃ ┗ 📜useUser.js
┣ 📂lib
┃ ┗ 📜firebaseAdmin.ts
┣ 📂pages
┃ ┣ 📂admin
┃ ┣ 📂api
┃ ┃ ┗ 📜verify-recaptcha.js
┃ ┣ 📂blog
┃ ┃ ┣ 📜[id].tsx
┃ ┃ ┗ 📜index.jsx
┃ ┣ 📂services
┃ ┃ ┣ 📜[id].jsx
┃ ┃ ┗ 📜index.jsx
┃ ┣ 📜_app.js
┃ ┣ 📜_document.js
┃ ┣ 📜about.jsx
┃ ┣ 📜auth.jsx
┃ ┣ 📜careers.jsx
┃ ┣ 📜FAQ.jsx
┃ ┣ 📜index.jsx
┃ ┣ 📜news.jsx
┃ ┣ 📜privacy-policy.jsx
┃ ┣ 📜service-terms.jsx
┃ ┗ 📜testimonials.jsx
┣ 📂public
┃ ┣ 📂icons
┃ ┣ 📂images
┃ ┣ 📜favicon.ico
┃ ┣ 📜favicon.svg
┃ ┣ 📜next.svg
┃ ┗ 📜vercel.svg
┣ 📂src
┃ ┣ 📂app
┃ ┃ ┣ 📜EmotionRegistry.js
┃ ┃ ┣ 📜globals.css
┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┗ 📜not-found.jsx
┃ ┣ 📂theme
┃ ┃ ┣ 📜colors.js
┃ ┃ ┣ 📜components.ts
┃ ┃ ┣ 📜globalSlickStyles.js
┃ ┃ ┣ 📜index.ts
┃ ┃ ┣ 📜otherThemeConstants.js
┃ ┃ ┣ 📜palette.js
┃ ┃ ┣ 📜theme.js
┃ ┃ ┗ 📜typography.ts
┃ ┣ 📂types
┃ ┃ ┗ 📜express.d.ts
┃ ┣ 📜createEmotionCache.js
┃ ┗ 📜mui.d.ts
┣ 📂utils
┃ ┗ 📜utils.js
┣ 📜.env.local
┣ 📜.eslintrc.json
┣ 📜.firebaserc
┣ 📜.gitignore
┣ 📜.prettierrc.json
┣ 📜database.rules.json
┣ 📜eslint.config.mjs
┣ 📜firebase.json
┣ 📜firebase.ts
┣ 📜firestore.indexes.json
┣ 📜firestore.rules
┣ 📜jsconfig.json
┣ 📜next.config.js
┣ 📜package.json
┣ 📜postcss.config.js
┣ 📜README.md
┣ 📜storage.rules
┗ 📜tsconfig.json

```

## Security Rules:
Update your Firestore security rules to allow the necessary permissions for adding documents:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // --- Helper Functions for Role-Based Access Control ---

    // Checks if the requesting user is authenticated.
    function isAuthenticated() {
      return request.auth != null;
    }

    // Retrieves the user's role from their corresponding 'users' document.
    // This is crucial for dynamic role-based permissions.
    function getUserRole(userId) {
      return get(/databases/$(database)/documents/users/$(userId)).data.role;
    }

    // Checks if the authenticated user has 'super' privileges.
    function isSuperUser() {
      return isAuthenticated() && getUserRole(request.auth.uid) == 'super';
    }

    // Checks if the authenticated user has 'admin' or 'super' privileges.
    function isAdmin() {
      return isAuthenticated() && (getUserRole(request.auth.uid) == 'admin' || getUserRole(request.auth.uid) == 'super');
    }

    // --- Collection-Specific Rules ---

    // ## Collection: `users`
    // Stores user profiles and roles.
    match /users/{userId} {
      // Read access:
      // - Users can read their own profile.
      // - 'admin' or 'super' users can read any user profile.
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());

      // Update access:
      // - Users can update their own profile, but CANNOT change their 'role' field.
      // - 'admin' users can update any user profile, but CANNOT change the 'role' field.
      // - 'super' users can update any user profile, INCLUDING changing the 'role' field.
      allow update: if isAuthenticated() && (
        (request.auth.uid == userId && request.resource.data.role == resource.data.role) ||
        (isAdmin() && (!request.resource.data.role || isSuperUser()))
      );

      // Create access:
      // - A user can create their own profile during initial signup (where document ID matches UID).
      // - Ensures 'createdAt' timestamp is set by the server at the time of creation.
      allow create: if isAuthenticated() && request.auth.uid == userId && request.resource.data.createdAt == request.time;

      // Delete access:
      // - A user can initiate deletion of their own account (client-side trigger).
      // - Note: Actual backend deletion logic might have additional 'super' user checks and prevent self-deletion from critical data.
      allow delete: if isAuthenticated() && request.auth.uid == userId;
    }

    // ## Collection: `subscribers`
    // Manages email subscription requests.
    match /subscribers/{subscriptionId} {
      // Create access:
      // - Anyone (authenticated or unauthenticated) can subscribe.
      allow create: if true;

      // Read and Delete access:
      // - Strictly forbidden for direct client-side access.
      // - These operations must be handled exclusively via secure backend Cloud Functions
      //   to ensure proper authorization (admin/super roles) and data integrity.
      allow read, delete: if false;
    }

    // ## Collection: `blogPosts`
    // Stores content for the blog.
    match /blogPosts/{blogPostId} {
      // Read access:
      // - All blog posts are publicly readable by everyone.
      allow read: if true;

      // Create, Update, Delete access:
      // - Strictly forbidden for direct client-side access.
      // - These operations must be handled exclusively via secure backend Cloud Functions
      //   by 'admin' or 'super' users for content management.
      allow create, update, delete: if false;
    }

    // ## Collection: `estimate_requests`
    // Manages incoming service estimate requests.
    match /estimate_requests/{requestId} {
      // Create access:
      // - Anyone (authenticated or unauthenticated) can submit a new estimate request.
      // - Ensures 'createdAt' timestamp is set by the server at the time of creation.
      allow create: if request.resource.data.createdAt == request.time;

      // Read access:
      // - Clients can read only their own submitted requests (based on `userId` field).
      // - 'admin' or 'super' users can read any estimate request.
      allow read: if isAuthenticated() && (
        request.auth.uid == resource.data.userId ||
        isAdmin()
      );

      // Update access:
      // - Only 'admin' or 'super' users are allowed to update estimate requests.
      // - Clients are prevented from directly modifying requests. Backend functions
      //   should handle other specific field updates if needed.
      allow update: if isAuthenticated() && isAdmin();

      // Delete access:
      // - Only 'admin' or 'super' users are allowed to delete estimate requests.
      allow delete: if isAuthenticated() && isAdmin();
    }
  }
}
```
