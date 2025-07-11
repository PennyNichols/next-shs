# SHS Site 2025

This project is the foundational web application for SHS Site 2025, designed to evolve into a comprehensive construction business and operations management platform. The current Minimum Viable Product (MVP) focuses on core functionalities such as client estimate requests, subscription management, and robust role-based access control (RBAC) for super, admin, employee, contractor, and client users. It leverages Next.js for a performant front-end and a Google Cloud/Firebase backend for scalability and security.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Configuration](#project-configuration)
- [Firebase Emulators Configuration](#firebase-emulator-configuration)
- [Firebase Emulator Commands](#firebase-emulator-commands)
- [Running the Application](#running-the-application)
- [Firebase Setup](#firebase-setup)
- [Firestore Security Rules](#firestore-security-rules)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v18.x or higher (LTS versions are recommended) 
- npm v8.x or higher. We recommend using a Node Version Manager (like nvm) to easily switch between versions.
- Java Development Kit (JDK) v21.0.7 or higher is required for running the Firebase Emulators.
- Firebase Tools CLI: Install globally via npm: 
```sh
npm install -g firebase-tools
```

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
  cd SHS-next
```

8. Install project dependencies in the root directory (SHS-next/)
```sh
npm install
```

9. Move to the functions directory and install dependencies (SHS-next/functions)
```sh
cd functions
npm install
```

## Project Configuration

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
- Developers on the team will be provided with environment variables.
- If you are contributing to this project as a free agent, you will also require a Firebase account.
* Obtaining Environment Variables
  - (NEXT_PUBLIC_FIREBASE_*) variables come from Firebase project settings
  - (FIREBASE_PRIVATE_KEY and FIREBASE_CLIENT_EMAIL) variables come from generating a new private key for a service account in the Firebase console (Project settings > Service accounts)
  - (NEXT_PUBLIC_RECAPTCHA_SITE_KEY) comes from Google reCAPTCHA v3 setup.

3. generate a .firebaserc file in the root directory with these contents:
   ```plaintext
    {
      "projects": {
        "default": "next-shs"
      }
    }
   ```

## Firebase Emulator Configuration:

Navigate to your project's root directory (where firebase.json is located) for most commands.

1. Initialize Firebase Emulators
- Run this command only once and make sure you are in the root folder (SHS-next/)
```sh
  firebase init emulators
```
- This command sets up the emulator configuration in your firebase.json and downloads the necessary emulator binaries. 
- This project is already initialized, select "No" when prompted to initialize a new project, and it will proceed to configure emulators.
- Select the emulators you need (Firestore, Authentication, Storage, and Functions).

2. Once complete, test it out by starting Firebase emulators configured in your firebase.json. This is the primary command for local development.
```sh
  firebase emulators:start
```

## Firebase Emulator Commands

1. Start the emulators in your local environment:
```sh
  firebase emulators:start
  ```

2. Start only a subset of emulators:
```sh
  firebase emulators:start --only functions,firestore,auth,storage
  firebase emulators:start --export-on-exit=[path]:
```

4. Save the current state of your emulated data (Firestore, RTDB, Storage, Auth) to a local directory when the emulators shut down.
```sh
  firebase emulators:start --export-on-exit=./firebase-data
  firebase emulators:start --import=[path]:
```

5. Load previously saved emulator data from the specified path when starting the emulators.
```sh
  firebase emulators:start --import=./firebase-data
  firebase emulators:exec "your-test-command" --only [emulators]:
```

6. Start the specified emulators, runs a shell command (e.g., npm test), and then shuts down the emulators. For CI/CD pipelines and automated testing.
```sh
  firebase emulators:exec "npm test" --only functions,firestore
```

## Running the Application

1. Start emulators (choose a method from above). It is crucial to make sure the emulators are running BEFORE the development server.

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.


## Firebase Setup

1. Initial User Setup for Emulators:

  - You'll need to create a test user and assign them a "super" or "admin" role in the emulated Firestore "users" collection in order to test role-based access control.

    1. Sign up a new user through the application's /sign-up page while the emulators are running
    2. Access the Firebase Emulator UI (localhost:/4000 or any of these more specific local addresses)
      ![alt text](image.png)
    3. Navigate to the Firestore tab and manually add a "role" field to the "users" document corresponding with the newly registered UID (e.g., role: 'super')

2. Key Cloud Firestore Collections:

  - **users**: Stores user profiles, including role (super, admin, employee, contractor, client), contact information, service addresses, etc.
  - **estimate_requests**: Stores all incoming estimate requests
  - **subscribers**: Stores email subscription entries
  - **blogPosts**: Stores content for the blog section
  - **contact_request**: Stores all incoming contact requests
  - **employee_applications**: Stores all employee applications submitted through the platform.

3. Firebase Storage

  - Stores user-uploaded content and platform images (e.g., profile pictures, blog post images, estimate request images.)

## Firestore Security Rules:

1. Important concepts:
  - get() : Used to fetch data 
    This function securely fetches the role field from a user's document in the users collection.
    ```javascript
    get(/databses/$(database)/documents/users/$(userId)).data.role
    ```
  - resource.data : Used to post data
    - This refers to the data that is being written (new data for "create" or proposed new data for "update")
      ```javascript
        request.resource.data
      ```
    - This refers to the existing data of the document being modified ("update" or "delete")
      ```javascript
        resource.data
      ``` 

2. Update your Firestore security rules to allow the necessary permissions for adding documents:

```javascript
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

## Contributing

1. Coding Standards

  - This project enforces code style and quality using ESLint and Prettier. 
  - Pull requests with errors will not be committed.
  - All pull requests are required to be reviewed by Copilot and at least one code owner before the commit option will become available.
  - It will be most beneficial if you run the linter and format before pushing a new branch and all subsequent commits using these commands:

  ```sh
  npm run lint:fix
  ```
  ```sh
  npm run format
  ```

3. Running Tests

  - Run unit/integration tests with this command:
    ```sh
    npm test
    ```

4. Branch Naming Conventions

  **All branches** enforce "slug-case" style (lowercase letters, numbers, and hyphens)

  - Feature Branches: Used when developing new features
    ```sh
      feat/<descriptive-name>
    ```
      Example:
        ```
        feat/user-profile-page
        ```
  - Bugfix Branches: Used for fixing bugs in existing code
    ```sh
    bugfix/<descriptive-name>
    ```
      Example:
        ```
        bugfix/login-form-validation
        ```
  - Hotfix Branches: Used for urgent fixes to production
    ```sh
    hotfix/<descriptive-name>
    ```
      Example:
        ```
        hotfix/critical-auth-issue
        ```
  - Release Branches: Branched from main. Used to deploy for testing in preparation for new releases.
    ```sh
    release/<version-number>
    ```
      Example:
        ```
        release/1.0.0
        ```
  - Development/Integration Branches: Central branches where features are integrated and tested before being released.
    ```sh
    staging/<2-digit-year>.<2-digit-month>.<2-digit-day>
    ```
      Example:
        ```
        staging/25.07.25
        ```
  - Chore/Refactor Branches: For non-feature, non-bug changes like build process updates, refactoring, dependency upgrades, etc.
    ```sh
    chore/<descriptive-name>
    ```
      Example:
        ```
        chore/user-profile-page
        ```

## Troubleshooting

1. Failing Name Convention Check

  - All branches must follow the naming conventions mentioned in the Contributing section above. If you accidentally created and worked on a branch with an incorrect naming pattern, follow these steps:

    1. In your CLI, switch to the branch that needs renaming
    ```bash
    git checkout <old-branch-name>
    ```
    2. Rename the local branch. The -m flag is for "move" (rename)
    ```bash
    git branch -m <new-branch-name>
    ```
    3. Delete the old, incorrectly named branch from the remote repository
    ```bash
    git push origin --delete <old-branch-name>
    ```
    4. Push the new, correclty named branch to the remote repository. The -u (or --set-upstream) flag sets the upstream ranch for future push and pull commands to automatically track the new remote branch.
    ```bash
    git push -u origin <new-branch-name>
    ```
    5. Confirm the new branch is working and run this command to cleanup local references to branches that no longer exist on the remote repository.
    ```bash
    git remote prune origin
    ```
    5. Update your Pull Request
      - Go to PR on GitHub
      - GitHub may have automatically updated the PR, but if not there should be an option to associate the PR with a new branch.
      - If GitHub does not automatically update the PR and you do not see the option to change the branch, close the PR linked to the old branch and create a new PR with the new branch.

## Project Structure

1. Top-level directories
  - functions/ : Contains Firebase Cloud Functions, which serve as the secure backend API for operations requiring elevated privileges or server-side logic (e.g., user role management, data writes requiring admin access).
  - src/app/ : Next.js App Router structure for pages and API routes.
  - src/components/ : Reusable React components categorized by their function (e.g., auth, common, forms, layout, sections).
  - src/contexts/ : React Context API implementations for global state management (e.g., AuthContext, FirebaseCollectionContext).
  - src/lib/ : Utility functions and third-party service integrations (e.g., Firebase initialization, API service calls, Emotion cache).
  - src/styles/ : Centralized theme configurations, global CSS, and utility variables for Material UI.

```plaintext
┣ 📂.firebase
┣ 📂.github
┃ ┣ 📂workflows
┃ ┃ ┗ 📜eslint.yml
┃ ┗ 📜CODEOWNERS
┣ 📂.next
┣ 📂.vscode
┃ ┗ 📜settings.json
┣ 📂extensions
┣ 📂functions
┃ ┣ 📂middleware
┃ ┃ ┗ 📜authMiddleware.ts
┃ ┣ 📜index.ts
┣ 📂public
┃ ┣ 📂icons
┃ ┣ 📂images
┃ ┣ 📜favicon.ico
┃ ┣ 📜favicon.svg
┃ ┣ 📜next.svg
┃ ┗ 📜vercel.svg
┣ 📂src
┃ ┣ 📂app
┃ ┃ ┣ 📂(main)
┃ ┃ ┃ ┣ 📂(auth)
┃ ┃ ┃ ┃ ┣ 📂login
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📂sign-up
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┗ 📜layout.tsx
┃ ┃ ┃ ┣ 📂about
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂admin
┃ ┃ ┃ ┃ ┣ 📂_components
┃ ┃ ┃ ┃ ┃ ┣ 📜AdminHeader.tsx
┃ ┃ ┃ ┃ ┃ ┗ 📜AdminSidebar.tsx
┃ ┃ ┃ ┃ ┣ 📂clients
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📂contact-requests
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📂estimates
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┗ 📜layout.tsx
┃ ┃ ┃ ┣ 📂blog
┃ ┃ ┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂careers
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂faq
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂news
┃ ┃ ┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂privacy-policies
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂service-terms
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂services
┃ ┃ ┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┗ 📂testimonials
┃ ┃ ┃   ┗ 📜page.tsx
┃ ┃ ┣ 📂api
┃ ┃ ┃ ┗ 📂verify-recaptcha
┃ ┃ ┃   ┗ 📜route.ts
┃ ┃ ┣ 📜EmotionRegistry.tsx
┃ ┃ ┣ 📜globals.css
┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┣ 📜not-found.tsx
┃ ┃ ┣ 📜page.tsx
┃ ┃ ┗ 📜providers.tsx
┃ ┣ 📂assets
┃ ┃ ┗ 📂svg
┃ ┃   ┣ 📂CementMixerSvg
┃ ┃   ┃ ┗ 📜CementMixerSvg.tsx
┃ ┃   ┣ 📂LogoSvg
┃ ┃   ┃ ┗ 📜LogoSvg.tsx
┃ ┃   ┣ 📂LogoWithTextSvg
┃ ┃   ┃ ┗ 📜LogoWithTextSvg.tsx
┃ ┃   ┗ 📂VilliageSvg
┃ ┃     ┗ 📜VilliageSvg.tsx
┃ ┣ 📂components
┃ ┃ ┣ 📂action-buttons
┃ ┃ ┃ ┣ 📂CallButton
┃ ┃ ┃ ┃ ┗ 📜CallButton.tsx
┃ ┃ ┃ ┣ 📂CreateBlogButton
┃ ┃ ┃ ┃ ┗ 📜CreateBlogButton.tsx
┃ ┃ ┃ ┣ 📂EstimateRequestButton
┃ ┃ ┃ ┃ ┗ 📜EstimateRequestButton.tsx
┃ ┃ ┃ ┣ 📂ReviewButton
┃ ┃ ┃ ┃ ┗ 📜ReviewButton.tsx
┃ ┃ ┃ ┣ 📂ShareButton
┃ ┃ ┃ ┃ ┗ 📜ShareButton.tsx
┃ ┃ ┃ ┣ 📂SmsButton
┃ ┃ ┃ ┃ ┗ 📜SmsButton.tsx
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┣ 📂AuthForm
┃ ┃ ┃ ┃ ┗ 📜AuthForm.tsx
┃ ┃ ┃ ┗ 📜index.tsx
┃ ┃ ┣ 📂common
┃ ┃ ┃ ┣ 📂ActionButton
┃ ┃ ┃ ┃ ┗ 📜ActionButton.tsx
┃ ┃ ┃ ┣ 📂ArrowButtons
┃ ┃ ┃ ┃ ┣ 📜ArrowButtons.tsx
┃ ┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┃ ┣ 📂ContentBox
┃ ┃ ┃ ┃ ┗ 📜ContentBox.tsx
┃ ┃ ┃ ┣ 📂CustomCheckbox
┃ ┃ ┃ ┃ ┗ 📜CustomCheckbox.tsx
┃ ┃ ┃ ┣ 📂CustomModal
┃ ┃ ┃ ┃ ┗ 📜CustomModal.tsx
┃ ┃ ┃ ┣ 📂CustomTextField
┃ ┃ ┃ ┃ ┣ 📜CustomTextField.tsx
┃ ┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┃ ┣ 📂DropdownMultiSelect
┃ ┃ ┃ ┃ ┗ 📜DropdownMultiSelect.tsx
┃ ┃ ┃ ┣ 📂GroupedMultiSelect
┃ ┃ ┃ ┃ ┗ 📜GroupedMultiSelect.tsx
┃ ┃ ┃ ┣ 📂NavButton
┃ ┃ ┃ ┃ ┗ 📜NavButton.tsx
┃ ┃ ┃ ┣ 📂PageContainer
┃ ┃ ┃ ┃ ┗ 📜PageContainer.tsx
┃ ┃ ┃ ┣ 📂PageTitle
┃ ┃ ┃ ┃ ┗ 📜PageTitle.tsx
┃ ┃ ┃ ┣ 📂Section
┃ ┃ ┃ ┃ ┗ 📜Section.tsx
┃ ┃ ┃ ┣ 📂SectionTitle
┃ ┃ ┃ ┃ ┗ 📜SectionTitle.tsx
┃ ┃ ┃ ┣ 📂TruncatedChip
┃ ┃ ┃ ┃ ┗ 📜TruncatedChip.tsx
┃ ┃ ┃ ┗ 📂TypographyHangingIndent
┃ ┃ ┃   ┗ 📜TypographyHangingIndent.tsx
┃ ┃ ┣ 📂forms
┃ ┃ ┃ ┣ 📂BlogForm
┃ ┃ ┃ ┃ ┣ 📜BlogForm.tsx
┃ ┃ ┃ ┃ ┣ 📜BlogFormWYSIWYG.tsx
┃ ┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┃ ┣ 📂EstimateRequestForm
┃ ┃ ┃ ┃ ┣ 📜EstimateRequestForm.tsx
┃ ┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┃ ┗ 📜validation.ts
┃ ┃ ┃ ┣ 📂JobApplication
┃ ┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┃ ┗ 📜JobApplication.tsx
┃ ┃ ┃ ┣ 📂SubscribeForm
┃ ┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┃ ┗ 📜SubscribeForm.tsx
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂layout
┃ ┃ ┃ ┣ 📂Footer
┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
┃ ┃ ┃ ┃ ┗ 📜MinFooter.tsx
┃ ┃ ┃ ┗ 📂NavBar
┃ ┃ ┃   ┗ 📜NavBar.tsx
┃ ┃ ┗ 📂sections
┃ ┃   ┣ 📂Award
┃ ┃   ┃ ┗ 📜Award.tsx
┃ ┃   ┣ 📂ComingSoon
┃ ┃   ┃ ┗ 📜ComingSoon.tsx
┃ ┃   ┣ 📂Hero
┃ ┃   ┃ ┣ 📂components
┃ ┃   ┃ ┃ ┣ 📂HeroHeader
┃ ┃   ┃ ┃ ┃ ┣ 📜HeroHeader.styles.tsx
┃ ┃   ┃ ┃ ┃ ┗ 📜HeroHeader.tsx
┃ ┃   ┃ ┃ ┣ 📜CompanyNameHeader.tsx
┃ ┃   ┃ ┃ ┣ 📜HeroActionArea.tsx
┃ ┃   ┃ ┃ ┣ 📜HeroContainer.tsx
┃ ┃   ┃ ┃ ┣ 📜HeroScroll.tsx
┃ ┃   ┃ ┃ ┗ 📜index.ts
┃ ┃   ┃ ┣ 📜Hero.tsx
┃ ┃   ┃ ┗ 📜index.ts
┃ ┃   ┣ 📂ReviewCard
┃ ┃   ┃ ┗ 📜ReviewCard.tsx
┃ ┃   ┣ 📂ServicesAccordion
┃ ┃   ┃ ┗ 📜ServicesAccordion.tsx
┃ ┃   ┗ 📜index.ts
┃ ┣ 📂constants
┃ ┃ ┣ 📜careers.ts
┃ ┃ ┣ 📜companyDetails.ts
┃ ┃ ┣ 📜FAQ.ts
┃ ┃ ┣ 📜privacyPolicy.ts
┃ ┃ ┗ 📜services.ts
┃ ┣ 📂contexts
┃ ┃ ┣ 📂AuthContext
┃ ┃ ┃ ┣ 📜AuthContext.tsx
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┗ 📂FirebaseCollectionContext
┃ ┃   ┣ 📜FirebaseCollectionContext.tsx
┃ ┃   ┗ 📜index.ts
┃ ┣ 📂hooks
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜useUser.ts
┃ ┃ ┣ 📜index.ts
┃ ┃ ┣ 📜useMedia.ts
┃ ┃ ┗ 📜useRecaptcha.ts
┃ ┣ 📂lib
┃ ┃ ┣ 📂createEmotionCache
┃ ┃ ┃ ┣ 📜createEmotionCache.ts
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂firebase
┃ ┃ ┃ ┣ 📜firebase.ts
┃ ┃ ┃ ┣ 📜firebaseAdmin.ts
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂services
┃ ┃ ┃ ┣ 📜apiService.ts
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂utils
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜utils.ts
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂styles
┃ ┃ ┣ 📂theme
┃ ┃ ┃ ┣ 📂components
┃ ┃ ┃ ┃ ┣ 📜_base.ts
┃ ┃ ┃ ┃ ┣ 📜_buttons.ts
┃ ┃ ┃ ┃ ┣ 📜_content.ts
┃ ┃ ┃ ┃ ┣ 📜_dialogs.ts
┃ ┃ ┃ ┃ ┣ 📜_forms.ts
┃ ┃ ┃ ┃ ┣ 📜_navigation.ts
┃ ┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┃ ┣ 📜colors.ts
┃ ┃ ┃ ┣ 📜globalSlickStyles.ts
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┣ 📜otherThemeConstants.ts
┃ ┃ ┃ ┣ 📜palette.ts
┃ ┃ ┃ ┗ 📜typography.ts
┃ ┃ ┣ 📜globals.css
┃ ┃ ┗ 📜variables.css
┃ ┗ 📂types
┃   ┣ 📜express.d.ts
┃   ┗ 📜mui.d.ts
┣ 📜.env.local
┣ 📜.eslintrc.json
┣ 📜.firebaserc
┣ 📜.prettierrc.json
┣ 📜database.rules.json
┣ 📜firebase.json
┣ 📜firestore.rules
┣ 📜README.md
┗ 📜tsconfig.json
```

