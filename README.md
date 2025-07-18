# SHS Site 2025

This project is the foundational web application for SHS Site 2025, designed to evolve into a comprehensive construction business and operations management platform. The current Minimum Viable Product (MVP) focuses on core functionalities such as client estimate requests, subscription management, and establishing role-based access control (RBAC) for super, admin, employee, contractor, and client users. It leverages Next.js for a performant front-end and a Google Cloud/Firebase backend for scalability and security.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  1. [Configure GitHub SSH keys](#configure-github-ssh-keys)
  2. [Generate a new SSH key](#generate-a-new-ssh-key-if-needed)
  3. [Add your SSH key to the SSH Agent](#add-your-ssh-key-to-the-ssh-agent)
  4. [Add your private SSH key to the agent](#add-your-private-ssh-key-to-the-agent)
  5. [Add Your Public SSH key to GitHub](#add-your-public-ssh-key-to-github)
  6. [Clone the repository](#clone-the-repository)
  7. [Install project dependencies](#install-project-dependencies)
- [Environment Configuration](#environment-configuration)
  1. [Create root .env files](#create-env-files-in-the-root-directory)
  2. [Create functions .env files](#create-env-file-in-the-functions-directory)
  3. [Obtain environment variables](#obtain-environment-variables)
  4. [Generate a .firebaserc file](#generate-a-firebaserc-file)
- [Firebase Emulators Configuration](#firebase-emulator-configuration)
  1. [Log in to Firebase](#log-in-to-firebase)
  2. [Compile Cloud Functions](#compile-cloud-functions)
  3. [Initialize Firebase emulators](#initialize-firebase-emulators)
- [Firebase Emulator Commands](#firebase-emulator-commands)
  1. [Set Firebase environment](#tell-firebase-which-environment)
  2. [Start the emulators](#start-the-emulators)
  3. [Start a subset of emulators](#start-only-a-subset-of-emulators)
  4. [Save the emulator data](#save-the-current-state-of-your-emulated-data)
  5. [Load saved emulator data](#load-previously-saved-emulator)
  6. [Load saved emulator data and save on exit](#load-previously-saved-data-and-save-on-exit)
  6. [Run a shell command](#start-specified-emulators-and-run-a-shell-command)
- [Running the Application](#running-the-application)
  1. [Start emulators](#start-the-emulators)
  2. [Start development server](#start-the-development-server)
- [Local Firebase Setup](#local-firebase-setup)
  1. [Initial user setup](#initial-user-setup-for-emulators)
  2. [Cloud Firestore collections](#cloud-firestore-collections)
  3. [Firebase Storage](#firebase-storage)
- [Firestore Security Rules](#firestore-security-rules)
  1. [Important security rule concepts](#important-concepts)
  2. [Update security rules in the project](#update-security-rules-in-the-project)
  3. [Update security rules in the Firebase Console](#update-security-rules-in-the-firebase-console)
  4. [Update security rules in the CLI](#update-security-rules-in-the-cli)
- [Version Control and Merging](#version-control-and-merging)
  1. [Core principles](#core-principles)
  2. [Branching strategy](#branching-strategy)
  3. [Pull request process](#pull-request-pr-process)
  4. [Merging practices](#merging-practices)
  5. [Creating branches](#creating-branches)
- [Deployment](#deployment)
  1. [General deployment information](#general-deployment-information)
  2. [Deploy to `dev`](#deploy-to-dev)
  2. [Deploy to `staging`](#deploy-to-staging)
  2. [Deploy to `prod`](#deploy-to-prod)
- [Contributing](#contributing)
  1. [Coding standards](#coding-standards)
  2. [Running tests](#running-tests)
  3. [Branch naming conventions](#branch-naming-conventions)
- [Project Structure](#project-structure)
  1. [Top level directories](#top-level-directories)
  2. [File tree](#project-file-tree)
- [Troubleshooting](#troubleshooting)
  1. [npm install during initial project set up](#npm-install-on-project-start-up)
  2. [npm install failing after initial project set up](#npm-install-after-successful-initial-project-setup)
  3. [Failing branch name](#failing-branch-name)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following **requirements**:

  1. `Node.js v22.x` (LTS version required for Firebase) 
  2. `npm v11.x` or higher. We recommend using a Node Version Manager (like `nvm`) to easily switch between versions.
  3. `Java Development Kit (JDK) v21.0.7` or higher is required for running the Firebase Emulators.
  4. Firebase Tools CLI: Install globally via `npm`: 

    npm install -g firebase-tools
    
## Installation

### Configure GitHub SSH keys

  Check for existing SSH keys in your terminal (Git Bash on Windows, Terminal on macOS/Linux)

    ls -al ~/.ssh

  Look for files named `id_rsa.pub`, `id_ed25519.pub`, or similar. If you find one, **do not** generate a new one. Doing so will effect your other project(s). If you already have an SSH key and it is configured with your GitHub account, continue to step 6 (**Clone the Repository**).

### Generate a new SSH key (if needed)

  If you don't have an existing key or prefer a new one, generate one.

  Replace 'your_email@example.com' with **your GitHub registered email**

    ssh-keygen -t ed25519 -C "your_email@example.com"

  Press Enter to **accept the default file location** (~/.ssh/id_ed25519 or ~/.ssh/id_rsa).

  - You'll be prompted to enter a passphrase. **Remember this** passphrase, it is important! Please, do not leave it blank.
  - If the SSH key generation was successful, you should see something like this:

    ![SSH successful keygen](./public/images/image-8.png)

    - If you encounter this error, you are using the wrong CLI:

    ![SSH generation error](./public/images/image-2.png)

    If you are using VSCode, you can easily use Git Bash by selecting the option from the "+" dropdown:

    ![Changing CLIs in VSCode](./public/images/image-3.png)

### Add your SSH key to the SSH agent

  - Start the SSH agent in the background:

    ```bash
    eval "$(ssh-agent -s)"
    ```

    This will return something like this:

    ![Agent pid](./public/images/image-9.png)

### Add your private SSH key to the agent

  - Replace id_ed25519 with your key file name if different. Use `id_rsa` if you have an older key:

  ```bash
  ssh-add ~/.ssh/id_ed25519
  ```
  
  If successful, you should see something like this:

  ![Identity added](./public/images/image-10.png)

### Add your public SSH key to GitHub

  - Copy your public key:

    macOS/Linux: `pbcopy < ~/.ssh/id_ed25519.pub`
    Windows (Git Bash): `cat ~/.ssh/id_ed25519.pub | clip`

    If successful, the terminal will show no response. Even though there is no response, the text is in your clipboard.

  - Link SSH Key to GitHub:
    1. Log in to your GitHub account.
    2. Go to Settings (your profile picture in the top right):

    ![GitHub account settings](./public/images/image-4.png)

    3. Click the option "SSH and GPG keys":

    ![SSH and GPG key setting](./public/images/image-5.png)

    4. Click New SSH key or Add SSH key:

    ![Add new SSH key](./public/images/image-6.png)

      - Give it a descriptive Title (e.g., "My Work Laptop").
      - Paste your copied public key into the Key field
      - Click Add SSH key and enter your passcode.

    5. Confirm your key is in your GitHub SSH keys:

    ![Active key](./public/images/image-7.png)

### Clone the repository

  - Ensure your SSH key is **password protected** and follow these steps to clone the repository:
    1. Obtain the SSH cloning URL from the SSH tab of the "Code" dropdown on the repository [homepage](https://github.com/PennyNichols/next-shs#):

      You should see the dropdown here:

      ![Repository Code dropdown](./public/images/image-11.png)

      Under the "SSH" tab you will see this:

      ![SSH clone tab](./public/images/image-12.png)

      If you do not see the previous image on your screen, it is most likely the SSH key was set up incorrectly and will need to be done, again. If your keys are incorrect, the SSH tab will look like this and **you must return to step 2**:

      ![Incorrect SSH key](./public/images/image-1.png)
    
    2. Clone the repository from your command line:

      ![SSH url](./public/images/image-13.png)

      ```bash
        git clone git@github.com:PennyNichols/next-shs.git
      ```

### Install project dependencies

  - Dependencies must be installed both in the root directory (`next-shs/`) of the project and in the functions directory (`next-shs/functions/`) within the project following these steps:
    1. In the same terminal you just cloned the repo in, run these commands to enter the project root directory and install the root dependencies:

    ```bash
    cd next-shs
    npm install
    ```

    2. Move to the functions directory and install the /function dependencies

    ```bash
    cd functions
    npm install
    ```

  **For help with `npm install` on initial set up, view the [npm install on start up](#npm-install-on-project-start-up) troubleshooting steps in the [Troubleshooting](#troubleshooting) section of this document.**
  
  **For help with `npm install` after initial setup, view the [npm install after start up](#npm-install-after-successful-initial-project-setup) troubleshooting steps in the [Troubleshooting](#troubleshooting) section of this document.**

## Environment Configuration
  
  **Developers on the team will be provided with the appropriate `.env` files. Proceed to [Firebase Emulators Configuration](#firebase-emulator-configuration)**

  - For this multi-environment system to be viable in your project, you must have: 
    1. Three Firebase projects set up - `dev`, `staging`, and `prod`. 
    2. At least 2 Vercel projects set up - `staging` and `prod`.
      - Optionally, add a 3rd Vercel project for `dev`.

### Create `.env` files in the root directory:
    - Depending on your role and permissions, you may need up to three `.env` files - `.env.local`, `.env.staging`, `.env.prod`.
    - **External devs**
      - add this configuration to whichever environments you intend to execute and obtain the values following the instructions in **[Obtain Environment Variables](#obtain-environment-variables)** below.
      - You will need to add these environment variables to their respective Vercel projects.

    ```plaintext
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_API_BASE_URL=next_public_api_base_url
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
    NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
    ```

### Create `.env` file in the `functions` directory:
    - The `functions` directory needs a single .env.local file.
    - This file is to provide Firebase emulators with the `dev` environment to run on your local machine.
    - These environment variables are set directly in Vercel for our `staging` and `prod` environments.
    - External devs, add this configuration and obtain the values following the instructions in **[Obtain Environment Variables](#obtain-environment-variables)** below.

    ```plaintext
    RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
    RECAPTCHA_VERIFY_URL=recaptcha_verify_url
    FIREBASE_PRIVATE_KEY=your_firebase_private_key
    FIREBASE_CLIENT_EMAIL=your_firebase_client_email
    FIREBASE_DATABASE_URL=your_firebase_database_url
    FIREBASE_PROJECT_ID=your_firebase_project_id
    ```

### Obtain environment variables

    - **Create your Firebase and Google Cloud projects:**
      1. **Go to the Firebase Console:** Navigate to console.firebase.google.com.
      2. **Add a Project:** Click the "+ Add project" card.
      3. **Enter a Project Name:** Type in your desired project name. This is the user-facing name you'll see in the console. If you are running multiple environments, name them with either the prefix dev-your-project-name or the suffix your-project-name-dev
      4. **Confirm the Project ID:** Firebase will suggest a globally unique project ID based on the name. You can edit it, but this ID is permanent and cannot be changed later. Make sure you're happy with it.
      5. **Google Analytics (Optional):** Decide if you want to enable Google Analytics. It's recommended for most apps.
      6. **Create: Click "Create project".** This could take a minute or two.

      You should now have a Firebase project and a linked Google Cloud project with the same name and ID.

    - **Access Your Google Cloud Project directly from Firebase:**
      1. In the Firebase console, go to your project.
      2. Click the gear icon ⚙️ next to "Project Overview" and select "Project settings."
      3. On the "General" tab, you'll see a link to your project in the Google Cloud console.

      Alternatively, you can go directly to the Google Cloud console and select the project from the dropdown menu at the top of the page. It will have the same project ID you just created.

    - **Enable the necessary Cloud APIs:**
      1. In your Google Cloud console left-side menu, select **APIs and Services**
      2. Navigate to the API library. Search for and ensure these APIs are enabled:
        - **Cloud Resource Manager API** (cloudresourcemanager.googleapis.com): Manages your cloud project resources.
        - **Firebase Management API** (firebase.googleapis.com): Allows for programmatic management of your Firebase project.
        - **Firebase Rules API** (firebaserules.googleapis.com): Manages security rules for Firestore and Cloud Storage.
        - **Cloud Storage** (storage.googleapis.com): This is the underlying service to store and serve user-generated content in Firebase Storage.
        - **Cloud Firestore API** (firestore.googleapis.com): The main API for the Firestore database.
        - **Cloud Functions API** (cloudfunctions.googleapis.com): To deploy and run your backend code.
        - **Cloud Build API** (cloudbuild.googleapis.com): Builds the container images for your functions.
        - **Artifact Registry API** (artifactregistry.googleapis.com): Stores and manages the container images created by Cloud Build.
        - **Cloud Run Admin API** (run.googleapis.com): Manages and runs the deployed function containers.
        - **Identity Toolkit API** (identitytoolkit.googleapis.com): The backend for Firebase Authentication, managing users and credentials.
        - **Token Service API** (sts.googleapis.com): Issues security tokens for authentication.
        - **Firebase Hosting API** (firebasehosting.googleapis.com): Manages your hosting sites. If you connect your hosting to a Cloud Run service, the Cloud Run Admin API will also be used.
        - **Cloud Secret Manager API** (secretmanager.googleapis.com): Many extensions use this to handle secrets and API keys securely. 
        - Other APIs may be required depending on the specific extension you install.

    - **Configure public Firebase env variables:**
      1. Go to the Firebase [console](https://console.firebase.google.com/).
      2. Select your project.
      3. In the project overview, click the icon (the web icon) to view your project configuration object and use the values to set these env variables:
        - `NEXT_PUBLIC_FIREBASE_API_KEY` (`apiKey`) 
          - If this does not auto-generate, create it in the Google Cloud console on the next step.
        - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` (`authDomain`)
        - `NEXT_PUBLIC_FIREBASE_PROJECT_ID` (`projectId`)
        - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (`storageBucket`)
        - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` (`messagingSenderId`)
        - `NEXT_PUBLIC_FIREBASE_APP_ID` (`appId`)
        - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (`measurementId`)  

    - **Configure `NEXT_PUBLIC_FIREBASE_API_KEY`** 
      1. Go to your Google Cloud console. 
      2. In the left menu, select **APIs and Services > Credentials**. Here you should see the API key created by your Firebase project. 
        - If you **do not** see an API key there, click **Create credentials > API key**.
        - The Firebase API key will be auto-generated. 
      3. Click the corresponding **Show key** button and copy the value :
        - `NEXT_PUBLIC_FIREBASE_API_KEY` (paste API key)
      3. Click on the API key to view the details.
      4. Under **Application restrictions**, select **Websites**
      5. Ensure you have these website referrers, at minimum. If you do not, add them.
        - `127.0.0.1:5000`
        - `localhost:3000`
        - `<YOUR_CLOUD_PROJECT_ID>.web.app`
        - `<YOUR_CLOUD_PROJECT_ID>.firebaseapp.com`
      6. Click **save**. Your API key is now properly configured for this application.

    - **Configure private Firebase env variables:**
      These are for the backend. They should not be used in any client facing code. They do not need the prefix `NEXT_PUBLIC_` for our express app to use them. The private key and client email are part of a service account allowing the backend to interact with Firebase services with admin privileges.
      1. In the Firebase console, go to **Project settings** (click the gear icon ⚙️).
      2. Select the **Service accounts** tab.
      3.	Click the **Generate new private key** button. A JSON file will be downloaded.
        **Do not store this JSON file in your remote repository**
      4.	From this downloaded JSON file, you can get these env variables:
        - `FIREBASE_PRIVATE_KEY`: (`private_key`), including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`. **wrap it in quotes**.
        - `FIREBASE_CLIENT_EMAIL` (`client_email`)
        - `FIREBASE_PROJECT_ID`: This is the same as `NEXT_PUBLIC_FIREBASE_PROJECT_ID`.

    - **Configure Firebase Realtime Database env variable**
      1. In the left-hand menu of the Firebase console, select **Build > Realtime Database**.
      2. Create a new Realtime Database instance. 
        - If you encounter an unknown error, ensure **all** of the required APIs have been enabled in your Google Cloud console.
      3. The URL for your database will be displayed at the top of the data viewer:
        - `FIREBASE_DATABASE_URL` (`https://<your-project-id>-default-rtdb.firebaseio.com`) 

    - **Configure Firebase Emulators env variable**
      The Firebase Emulators env variable is a self-set value to indicate whether the application should connect to local emulators or live services.
      - `NEXT_PUBLIC_USE_FIREBASE_EMULATORS`: `true` for local use or `false` for live services 

    - **Configure Google reCAPTCHA env variables**
      1. Go to the Google Cloud reCAPTCHA [admin console](https://www.google.com/recaptcha/admin/create): 
      2. Register your site:
        - Provide a label for your site.
        - Choose **reCAPTCHA v3**.
        - Add your domain (e.g., localhost for local development).
      3.	After submitting, you will be provided with a **Site Key** and a **Secret Key**:
        - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (Site Key)
        - `RECAPTCHA_SECRET_KEY` (Secret Key)
        - `RECAPTCHA_VERIFY_URL` (`https://www.google.com/recaptcha/api/siteverify`)
      4. **You must verify reCAPTCHA v3 on the server**
        - The verification function can be viewed in `next-shs/src/app/api/recaptcha/route.ts`

### Generate a `.firebaserc` file

    - In the root directory, create a file named `.firebaserc` with these contents:

      ```plaintext
      {
        "projects": {
          "default": "<YOUR_FIREBASE_DEV_PROJECT_ID>",
          "dev": "<YOUR_FIREBASE_DEV_PROJECT_ID>",
          "staging": "<YOUR_FIREBASE_STAGING_PROJECT_ID>",
          "prod": "<YOUR_FIREBASE_PROD_PROJECT_ID>"
        }
      }
      ```

## Firebase Emulator Configuration:

### Log in to Firebase
    - Authenticating the Firebase CLI with your Google account is required by Firebase.

    ```bash
    firebase login
    ```

### Compile Cloud Functions
    - Cloud functions must be compiled before starting the emulators for the first time and after changing backend code.

    From the root `next-shs` directory:

    ```bash
    cd functions
    npm run build
    cd ..
    ```

### Initialize Firebase emulators

    **Members of the team**, skip this and proceed to [Firebase Emulator Commands](#firebase-emulator-commands).
    
    **This project is already initialized**: Do **not** run `firebase init emulators`, it will not give you any options to select. 

    - If you would like a custom emulator configuration, edit the `firebase.json` details directly and execute the `npm run build` command again.

## Firebase Emulator Commands

### Tell Firebase which environment
    - The environment options for this project are `dev`, `staging`, and `prod`.

    ```bash
    firebase use <ENV>
    ```

    - If successful, you should see this message in the terminal:

    ```bash
    Now using alias dev (next-shs)
    ```

### Start the emulators

  ```bash
  firebase emulators:start
  ```

### Start only a subset of emulators

  ```bash
    firebase emulators:start --only functions,firestore,auth,storage
  ```

### Save the current state of your emulated data 
    - Firebase emulators do not store state between sessions. 
    - Once you shut down the emulator, all entries made will be lost. 
    - You can save inserted data for Firestore, RTDB, Storage, and Auth to a local directory when the emulators shut down:

    ```bash
    firebase emulators:start --export-on-exit=<path>
    
    firebase emulators:start --export-on-exit=./firebase-data
    ```

### Load previously saved emulator 
    - To load previously exported emulator data from a specified path:

    ```bash
      firebase emulators:start --import=<path>

      firebase emulators:start --import=./firebase-data
    ```

### Load previously saved data and save on exit

  ```bash
  firebase emulators:start --import=./firebase-data --export-on-exit
  ```

### Start specified emulators and run a shell command
    - Firebase emulators can execute test scripts by running an indicated shell command (e.g., `npm test`), and then shuting down the emulators. 
    - This is most useful for CI/CD pipelines and automated testing.

    ```bash
      firebase emulators:exec "your-test-command" --only <emulators>

      firebase emulators:exec "npm test" --only functions,firestore
    ```

## Running the Application

### Start the emulators
    - It is crucial to make sure the **emulators are running BEFORE the development server**.
      
      1. Open a new terminal
      2. Choose your desired start up method from [Firebase Emulator Commands](#firebase-emulator-commands)
     

### Start the development server
    - After making absolutely sure your emulators **are already running**: 
    
      1. Open another new terminal
      2. Start the Next.js development server
        - For this project, there are three command options to start the server.

          ```bash
          npm run dev
          ```

          ```bash
          npm run dev:staging
          ```

          ```bash
          npm run dev:prod
          ```

        - Use `dev` to connect to the local emulators if Firebase is set to use dev.
        - use `dev:staging` to connect to the **LIVE** staging project if Firebase is set to use staging.
        - use `dev:prod` to connect to the **LIVE** production project if Firebase is set to use prod.

    **ONLY AUTHORIZED DEVS WILL HAVE ACCESS TO PROD CREDENTIALS**

### Open your browser and navigate to [localhost:3000](localhost:3000).

## Local Firebase Setup

### Initial user setup for emulators:
    - You'll need to create a test user and assign them a "super" or "admin" role in the emulated Firestore "users" collection in order to test role-based access control:

      1. Sign up a new user through the application's sign-up page while the **emulators are running**.

      2. Access the Firebase Emulator UI 
        - You can use [localhost:/4000](localhost:4000) or any of these more specific local addresses:

        ![Firebase emulator URLs](./public/images/image.png)

      3. Navigate to the Firestore tab
        - Manually add a `role` field to the `users` document corresponding with the newly registered UID (e.g., `role: 'super'`).

### Cloud Firestore collections:

    - `users`: Stores user profiles, including role (`super`, `admin`, `employee`, `contractor`, `client`), contact information, service addresses, etc.
    - `estimate_requests`: Stores all incoming estimate requests
    - `subscribers`: Stores email subscription entries
    - `blogPosts`: Stores content for the blog section
    - `contact_request`: Stores all incoming contact requests
    - `employee_applications`: Stores all employee applications submitted through the platform.

### Firebase Storage
    - Stores user-uploaded content and platform images (e.g., profile pictures, blog post images, estimate request images.)

## Firestore Security Rules:

  **Security rules already exist for this project**

  - When you need to **add or edit** rules, you must ensure the permissions for each environment are appropriately secure.

  - `next-shs/firestore_rules/` 
    - `dev.rules`
    - `staging.rules`
    - `prod.rules`

  - `next-shs/storage_rules/` 
    - `dev.rules`
    - `staging.rules`
    - `prod.rules`

  - `staging.rules` and `prod.rules` should be identical, as staging is a test environment for prod.
  - Permissions for `dev.rules` are less restrictive than `staging.rules` and `prod.rules`.

### Important concepts
    - `get()` : Used to fetch data 
      `get(/databses/$(database)/documents/users/$(userId)).data.role` securely fetches the role field from a user's document in the users collection.
    - `resource.data` : Used to post data
      - `request.resource.data` refers to the data that is being written (new data for `create` or altered existing data for `update`)
      - `resource.data` refers to the existing data of the document being modified (`update` or `delete`)

### Update security rules in the project 
    - When **updating** any Firestore security rules, ensure you are editing the rules for the correct environment and role restrictions are set appropriately.
    - When **creating** new security rules, the rule must be added to the rules file for each environment, separately, with sufficient permissions restrictions

### Update security rules in the Firebase Console

    **TEAM MEMBERS**: Skip this section and [Update from the CLI](#update-your-firestore-rules-in-the-cli).

    **Do not use the console for multi-environment set ups!** Instead, [Update from the CLI](#update-your-firestore-rules-in-the-cli)
  
    - It is vital to make sure they match the security rules within your Firebase Console, *exactly*, to allow the necessary permissions for adding documents.

      1. Go to your Firebase Console
        - Open your browser and navigate to `console.firebase.google.com` [here](console.firebase.google.com). You should see a screen like this:

        ![Firebase console homepage](./public/images/image-14.png)

      2. Select your project 
        - You should see the project you want to update from your Firebase homepage. Click on the project you designated for this application. You should see a screen like this:

        ![Firebase project homepage](./public/images/image-15.png)

      3. Navigate to the Firestore
        - In the left navigation menu, there is an option called "Firestore Database". It is also located in the "Build" accordion component. You should see the option here:

        ![Firebase side navigation](./public/images/image-16.png)

      4. Open "Rules" tab
        - Click on the "Rules" tab at the top of your Firestore page. It should look like this:

        ![Firestore Rules tab](./public/images/image-17.png)

      5. Insert Firestore rules
        - Under the section matching the previous image, you will see a text editor. It should look like this (with different content):

        ![Firestore Rules text editor](./public/images/image-18.png)

        - **Delete** the existing content from the text editor.
        - **Copy & Paste** the new content from your `dev.rules` file.
        - After editing the rules, you should see a banner at the top of the text editor that looks like this:

        ![Unpublished changes banner](./public/images/image-19.png)

        - After you have finished inserting all of the content, exactly matching your `firestore.rules` file, click the "Publish" button. If the process was successful, you should see this toast:

        ![Success toast](./public/images/image-20.png)

      **Repeat the process for storage.rules**
    
### Update security rules in the CLI 
      - When deploying the rules in a multi-environment project, do **not** use the Firebase Console directly. 
      - Deploy different rules for each environment separately from the CLI using these commands:

      **Deploy dev rules to your dev project**
      ```bash
      firebase use dev
      firebase deploy --only firestore:rules,storage:rules
      ```

      **Deploy staging rules to your staging project**
      ```bash
      firebase use staging
      firebase deploy --only firestore:rules,storage:rules
      ```

      **Deploy prod rules to your prod project**
      ```bash
      firebase use prod
      firebase deploy --only firestore:rules,storage:rules
      ```

## Version Control and Merging

### Core principles
    - All code changes must be submitted through a Pull Request.
    - Direct commits to the `staging` and `prod` branches are **prohibited**.
    - The `prod` branch must **always** be stable and reflect the **current** state of the production environment.

### Branching strategy
    - GitHub workflows for this project enforce strict [branch naming conventions](#branch-naming-conventions)

    **If you are unsure of how to name a branch, copy the task details and the [branch naming conventions](#branch-naming-conventions) and ask Copilot what would be the best fit.**
    
    - **`dev`**
      - All `dev` branches are created from the `staging` branch.
      - `dev` branches are **NEVER** merged back into `staging`
      - **Before commiting** any changes to `dev` branches, request a preliminary review from Copilot in the Source Control tab in VSCode:

      ![Requesting a review from Copilot before committing changes](image.png)

      - There are two types of `dev` branches:

        1. **`dev/task` branches**
          - Contain changes for individual tasks or small groups of closely related tasks.
          - Too many changes in a single `dev/task` branch can make it difficult to debug the code.
          - Commit messages must be clear, concise,  and describe the changes made.
          - Each `dev/task` branch must be thoroughly tested by the assigned developer before a PR is created.
          - `dev/task` branches are categorized into 4 types:
            1. **Bugs:** Errors found in testing, noticed by any team member, or reported by users in production.
            ```bash
            dev/task/bug/<task-number>/<task-description>
            ```
            2. **Chore:** Minor changes that aren't bugs and general code clean up.
            ```bash
            dev/task/chore/<task-number>/<task-description>
            ```
            3. **Refactor:** Changes to components and features that are not broken with the goal of improving the code readability, code reusability, UI appearance, user experience, general app flow, app performance, etc. 
            ```bash
            dev/task/refactor/<task-number>/<task-description>
            ```
            4. **Feature:** Entirely new features and components.
            ```bash
            dev/task/feat/<task-number>/<task-description>
            ```

        2. **`dev/pbi` branches**
          - All `dev/task` branches derived from a single PBI are merged together, **one at a time**, into a `dev/pbi` branch after each `dev/task` PR is approved and passing all checks.
          - After each branch is merged in, a new commit should be pushed.
          - Commit messages for `dev/pbi` branches must contain the task number and a short description.
          - `dev/pbi` branches are deployed to the `dev` environment and thoroughly tested to the task requirements after each individual `dev/task` branch is merged in to maximize debugging efficacy.

    - **`staging`**
      - The main `staging` branch should always reflect `prod`.
      - Code changes are **NEVER** commited directly to `staging`.
      - There are three kinds of `staging` branches:
        1. **PBI:** After PR approval, each `dev/pbi` branch is converted to an identical `staging/pbi` branch.
        - The name of `staging/pbi` branches should reflect the name of the corresponding `dev/pbi` branch.
        ```bash
        staging/pbi/<pbi-number>/<pbi-description>
        ```
        2. **Feature:** All `staging/pbi` branches are merged, **one at a time**, into `staging/feat` branches after all `dev/pbi` branches for a feature have been converted to `staging/pbi` branches. 
          - After each `staging/pbi` branch is added to the `staging/feat` branch, deploy to the staging environment and test against the PBI requirements.
          - After all `staging/pbi` branches have been merged into the `staging/feat` branch, a PR is created and reviewed.
          - After PR approval, QA will thoroughly test the feature.
          ```bash
          staging/feat/<feature-name>
          ```
        3. **Release:** When `staging/feat` PRs are approved, they are added to a single `staging/release` branch and tested.
          - After each `staging/feat` branch is added to a `staging/release` branch, it is thoroughly tested by all parties.
        ```bash
        staging/release/<version-number>
        ```
      
    - **`prod`**
      - When all planned features for a production release are merged into a single `staging/release` branch and the PR is created, it is tested one more time by all parties and then merged into `prod`.
      - This branch is **only** for **production-ready** code.
      - `prod` is only updated by merging a `staging/release` branch during a scheduled release or a `prod/hotfix` branch to fix a production bug.
      **Remember to merge back into `staging` after all changes**
      - The code in this branch is **always** the code currently deployed in the `prod` environment.
      - `prod` code is automatically deployed to the `prod` environment on every successful merge from `staging/release` or `prod/hotfix`.
      - After successful release to production, the `prod` branch is back-merged into the main `staging` branch to 'reset' for the next development cycle.
      - There are two `prod` branches
        1. The **main** `prod` branch that is a reflection of currently deployed production code.
        2. **Hotfix:** For urgent fixes that must be deployed to production quickly.
          - These are the **only** branches that should be created directly from the `prod` branch.
          - `prod/hotfix` branches merge back into `prod` after approval.
        ```bash
        prod/hotfix/<bug-description>
        ```
      - **NEVER** push commits or merge branches other than `staging/release` or `prod/hotfix` branches into `prod`.

### Pull Request (PR) process
    - **When to create a PR**

      - `dev/task` PRs should be created by the branch owner after code changes are tested against task requirements, and are ready for review.

      - `dev/pbi` PRs should be created when all of the `dev/task` branches belonging to the PBI have approved PRs, have been merged into the `dev/pbi` branch, and have been thoroughly tested against all task and PBI requirements.

      - `staging/pbi` branches are created by converting `dev/pbi` PRs after approval; they **do not** require PRs themselves.

      - `staging/feat` PRs are created after combining and testing all of the `staging/pbi` branches belonging to a feature, one at a time.

      - `staging/release` PRs are created after all of the `staging/feat` branches belonging to a scheduled production release have been merged in and tested, one at a time.

      - After final approval of a `staging/release` PR, the `staging/release` branch is merged into the `prod` branch, triggering automatic deployment.

      - After successful deployment of the `prod` branch, `prod` is back-merged to reset `staging`.

    - **What is the PR process**
      1. Commit your final changes to your local branch
      2. Push the commit to GitHub
      3. Deploy changes to the appropriate environment and **test** the changes.
      3. Navigate to the [repository](https://github.com/PennyNichols/next-shs) on GitHub 
      4. Open Pull Request on GitHub



-------------------------------------------------------



        - **Option 1** 
          - At the top of the code section, there will be a toast that says "recent pushes to...". Click the toast and it will take you to a new PR.



        IMAGE




        - **Option 2**
          - Navigate to the repository's Pull Request tab.
          - Click the green "New" button




      IMAGE + MORE INSTRUCTIONS




-------------------------------------------------------
      5. Fill out each section of the PR template with appropriate details, documentation, and screenshots, if applicable.
      6. Click "Draft Pull Request" to start the PR process without automatically requesting reviews from codeowners.
      7. When drafted, the automatic checks for the PR should begin processing. 
        - A green checkmark will show next to the test at the bottom of the PR if the code passed.
        - A red X will appear next to the test if the code failed.
          1. Click on the failing test to see the output log.
          2. Search the log for `error`
          3. Fix the indicated errors and push the code to the remote branch.
          4. The PR will automatically pick up the changes and begin running the checks again.
          5. Repeat steps 1-4 until all checks are passing.
      8. After all checks have passed, request an AI review by clicking "Copilot" in the "Reviewers" section of the PR. It may take a few minutes for the review process to complete.
      9. Address all comments and code change suggestions provided by Copilot
      10. Repeat steps 8 and 9 until Copilot approves the PR.
      11. Set the status of the PR to "Ready for review"
        - GitHub will automatically request a review from all code owners for the edited files.
        - You can manually request a review from any other team member on the project, even if they are not a codeowner of the edited files.

### Merging practices
      
    - **When to merge**
      1. `dev`
        - After all `dev/task` branches for a single PBI are complete and PRs are approved, merge them all into a single `dev/pbi`
        - When multiple developers need to test features in the `dev` environment simultaneously, create a new combined branch to deploy the branches together.

      2. `staging`
        - **Only** `prod` is merged into `staging` after a successful release.
        - Nothing else is merged into `staging` directly.
        - For organization and visibility, all `dev/pbi` branches are converted to `staging/pbi` branches after PR approval.
        - Once the `staging/pbi` branches belonging to a feature have been converted from `dev/pbi` to `staging/pbi`, they can be merged into a single `staging/feat` branch for testing.
        - After the `staging/feat` PR has been approved, the branch can be merged into a `staging/release` branch where it will wait until all the features included in a planned production release are merged into the `staging/release` branch.

      3. `prod`
        - After all `staging/feat` branches have been merged into the `staging/release` branch, had thorough testing, and have recieved approvals from all parties, the `staging/release` branch is merged into `prod`.
        - After merging into `prod` and confirming a successful deployment, `prod` is merged into `staging` to reset `staging`.

    - **How to merge**   
      **After** all changes have been tested against requirements, the PR is passing all checks, and the required approvals have been obtained, run the appropriate merge command in your terminal.

        1. `dev/task` merges into `dev/pbi`
        2. `dev/pbi` merges into `staging/pbi`
        3. `staging/pbi` merges into `staging/feat`
        4. `staging/feat` merges into `staging/release`
        5. `staging/release` merges into `prod`
        6. `prod/hotfix` merges into `prod`
        6. `prod` merges into `staging`

      The general pattern is: 
      ```bash
      git checkout <target-branch>
      git merge <incoming-branch>
      ```
      
      **Every PR** must have approval by 1 code owner and Copilot before merging will be available.
        - If Copilot is insisting on a change you don't agree with and will not give you approval, review from 1 additional team member is sufficient.

      - **All branches** stem from `staging` **except** `prod` and `prod/hotfix` branches.
      - `staging` and `prod/hotfix` branches are created from `prod`.

### Creating branches
    - Creating branches is simple and generally follows the same pattern - make sure everything is up to date, checkout to the origin branch, create the new branch from origin branch.
    - The newly created branch will contain all of the code from the it was created from, be sure you are starting from the **correct origin**.

      1. **Update local to origin**
        - Always make sure your local code is up to date with the remote repository.

        - Checkout to and update your local `staging` branch:
        ```bash
        git checkout staging
        git pull origin
        ```

        - Ensure your working branch is up to date and merge the latest `staging` code into your working branch:
        ```bash
        git checkout dev/task/chore/123/example-task
        git pull origin
        git merge staging
        ```

      2. **Creating new `dev/task` branches**
        - All assignments **except hotfixes** will begin as a `dev/task` branch.

        - Ensure Git Bash is currently working in the `staging` branch and it is up to date with the remote repository:
        ```bash
        git checkout staging
        git pull origin
        ```

        - Create new `dev/task` branch from `staging`
        ```bash
        git checkout -b dev/task/chore/123/task-description
        ```

      3. **Creating `dev/pbi` branches**
        - Ensure Git Bash is working in the `staging` branch and create a new `dev/pbi` branch.
        ```bash
        git checkout staging
        git pull origin
        git checkout -b dev/pbi/35/pbi-description
        ```

        - Merge `dev/task` branches belonging to the PBI into the `dev/pbi` branch
        ```bash
        git merge dev/task/chore/123/task-description
        ```

        **Repeat to merge all tasks belonging to the PBI into the `dev/pbi` branch**

      4. **Creating `staging/pbi` branches**
        - Ensure `staging` and `dev/pbi` are up to date with the remote `staging` branch:
        ```bash
        git checkout staging
        git pull origin
        
        git checkout dev/pbi/35/pbi-description
        git pull origin
        ```

        - Checkout to `staging`, create the new `staging/pbi` branch with the same PBI number and description as the corresponding `dev/pbi`, and merge your `dev/pbi` branch into it:
        ```bash
        git checkout staging
        git checkout -b staging/pbi/35/pbi-description
        git merge dev/pbi/35/pbi-description
        ```

      5. **Creating `staging/feat` branches**
        - Update `staging` and your target `staging/pbi` with the remote repository:
        ```bash
        git checkout staging
        git pull origin

        git checkout staging/pbi/35/pbi-description
        git pull origin
        ```

        - Create new `staging/feat` branch from `staging` and merge `staging/pbi` branches.
        ```bash
        git checkout staging
        git checkout -b staging/feat/feature-name
        git merge staging/pbi/35/pbi-description
        ```

        **Repeat for all PBIs belonging to the target feature**

      6. **Creating `staging/release` branches**
        - Ensure `staging` and `staging/feat` branches are up to date with the remote repository:
        ```bash
        git checkout staging
        git pull origin

        git checkout staging/feat/feature-name
        git pull origin
        ```

        - Create the new `staging/release` branch from the `staging` branch and merge `staging/feat` branches:
        ```bash
        git checkout staging
        git checkout -b staging/release/v1.0.0
        git merge staging/feat/feature-name
        ```

        **Repeat for all features planned for the production release**

      6. **Creating a `prod/hotfix` branch**
        - Ensure your local `prod` branch is up to date with the remote repository:
        ```bash
        git checkout prod
        git pull origin
        ```

        - Create the `prod/hotfix` branch from the `prod` branch:

        ```bash
        git checkout -b prod/hotfix/prod-bug-description
        ```

## Deployment

### General deployment information

    **Only team members can deploy to our environments, external developers need their own environments**

    - We will deploy to `dev`, `staging`, and `prod` at different phases of the development lifecycle.
    - Only deploy to environments for which you are **authorized** to deploy to.
    - We deploy using scripts defined in `package.json` that automatically select the correct Firebase project, copy the appropriate security rules, and deploy all services.

    **Always** make sure your branch is up to date with the remote `staging` branch before deploying to the `dev` or `staging` environments.

### Deploy to `dev`
    - Complete the **Dev Deployment Log** in the repository wiki
      1. **Before** deployment
      2. **After** testing is complete

    - **When to deploy**
      **Multiple times per day**

      1. Every time you want to test a new feature, bug fix, or integration in a shared cloud environment mirroring the real set up.
      2. Before merging a `dev/pbi` Pull Request into a `staging/pbi` branch.  
      
    - **Who can deploy**
      - All team members are required to deploy and test changes for all of their owned `dev/task` branches.
      - Any developer can deploy their branch to see their changes live and test integrations with existing code.
      - Firebase emulators reduce the frequency of deployments to our shared `dev` environment by creating a simulated environment on your local machine, use them for regular development testing.
      - Use deployments to the shared `dev` environment for final testing before submitting PRs.
      - If more than one developer needs to deploy at a time, we use communication and collaboration to create combined branches with all changes to be tested. 

      - To stay informed about who is currently using the `dev` environment, check the **Dev Deployment Log** in repository [wiki](https://github.com/PennyNichols/next-shs/wiki) on GitHub.
    
    - **How to deploy**
    ```bash
    npm run deploy:dev
    ```

### Deploy to `staging`
    - Deployment to `staging` is for testing code changes before sending to production.

    - Complete the **Staging Deployment Log** in the repository wiki
      1. **Before** deployment
      2. **After** testing is complete

    - **When to deploy**
      1. After converting a `dev/pbi` branch to a `staging/pbi` branch and preliminary testing has already occurred on `dev/pbi` in a `dev` deployment.
      2. After **each** `staging/pbi` branch belonging to a single feature is merged into a `staging/feat` branch.
      3. After **each** `staging/feat` branch included in a specific release is merged into a `staging/release` branch.
    
    - **Who can deploy**
      - Owners of a PBI can deploy their `staging/pbi` branch to staging.
      - Only a team lead can deploy a `staging/feat` or `staging/release` branch.

    - **How to deploy**
    ```bash
    npm run deploy:staging
    ```

### Deploy to `prod`
    - **When to deploy**
      - Before deploying to `prod`, the `staging/release` or `prod/hotfix` PR must thoroughly reviewed and tested by **ALL** parties.
      - We **only** deploy to `prod` after rigorous testing and explicit approval by QA, stakeholders, team lead, and every developer who contributed to the feature.
        - **QA** must test against every task requirement, every PBI requirement, and every feature requirement.
        - **Team lead** must test against every feature requirement.
        - **Each developer** must test against against task requirements of their assigned tasks and PBI requirements of their assigned PBIs
      - Deploying to `prod` is a scheduled and closely monitored event.

    - **Who can deploy**
      - Deployments to `prod` are restricted to our automated CI/CD pipeline.
      - If a manual deployment is ever required, only a tech lead can deploy. 

    - **How to deploy**
      - When a `staging/release` or `prod/hotfix` branch is merged into `prod`, our CI/CD pipeline automatically depoys to the `prod` environement.
      - If a manual deployment outside of the normal lifecycle flow is required:

      ```bash
      npm run deploy:prod
      ```

## Contributing

### Coding standards
  - This project enforces code style and quality using `ESLint` and `Prettier`. 
  - Pull requests with **errors will not be committed**.
  - All pull requests are **required** to be reviewed by Copilot and at least one code owner and pass all checks before the commit option will become available.
  - It will be most beneficial if you **run the linter and format** before pushing a new branch and all subsequent commits:

  ```bash
  npm run lint:fix
  npm run format
  ```

### Running tests
  - Run unit/integration tests with `npm test`.

### Branch naming conventions

  **All branches** enforce "slug-case" style (lowercase letters, numbers, and hyphens)

  - **Development Branches:** Used for every day development work.

    1. **`dev/task` branches**
    ```bash
    dev/task/<task-type>/<task-number>/<description>
    ```
    Example:
    ```bash
    dev/task/chore/123/example-task
    ```

    2. **`dev/pbi` branches**
    ```bash
    dev/pbi/<pbi-number>/<description>
    ```
    Example:
    ```bash
    dev/pbi/35/example-pbi
    ```

  - **Staging Branches:** Used for preparing changes to be released in production.

    1. **`staging/pbi` branches**

      **The name of a `staging/pbi` branch should match the name of the `dev/pbi` from which it was created**

    ```bash
    staging/pbi/<pbi-number>/<description> 
    ```
    Example:
    ```bash
    dev/pbi/35/example-pbi
    ```

    2. **`staging/feat` branches**
    ```bash
    staging/feat/<feature-name>
    ```
    Example:
    ```bash
    staging/feat/user-authentication-flow
    ```

    3. **`staging/release` branches**
    ```bash
    staging/release/<version-number>
    ```
    Example:
    ```bash
    staging/release/v1.0.0
    ```

  - **Production branches:** Only used to fix urgent bugs in our `prod` environment.
  
  **`prod/hotfix` branches are the only branches that are created from the main `prod` branch.**

    1. **`prod/hotfix` branches**

    ```bash
    prod/hotfix/<bug-description>
    ```
    Example:
    ```bash
    prod/hotfix/job-application-form-submit-button-disabled
    ```

  **For help with failing name checks, see [Failing Branch Name](#failing-branch-name) in the [Troubleshooting](#troubleshooting) section below.**

## Project Structure

### Top-level directories

  -  **`.github/`**: Contains GitHub-specific configurations, including CI/CD workflows (like ESLint checks) and the `CODEOWNERS` file for pull request reviews.
  - **`firestore_rules/`**: Holds the security rules for the Firestore database, with separate files for each environment (`dev`, `staging`, `prod`).
  - **`functions/`**: Contains all backend logic as Firebase Cloud Functions. This serves as the secure API for operations requiring elevated privileges. It has its own `package.json` and dependencies.
  - **`public/`**: Stores all static assets that are served directly by Next.js, such as images, icons, and fonts.
  - **`src/`**: The main source code directory for the Next.js frontend application. All pages, components, contexts, hooks, and styles are located here.
  - **`storage_rules/`**: Holds the security rules for Cloud Storage, with separate files for each environment.

### Project File Tree

  ```plaintext
  ┣ 📂.firebase
  ┃ ┗ 📜hosting.Lm5leHQ.cache
  ┣ 📂.github
  ┃ ┣ 📂workflows
  ┃ ┃ ┣ 📜branch-naming.yml
  ┃ ┃ ┗ 📜eslint.yml
  ┃ ┗ 📜CODEOWNERS
  ┣ 📂.next
  ┣ 📂.vscode
  ┃ ┗ 📜settings.json
  ┣ 📂extensions
  ┣ 📂firestore_rules
  ┃ ┣ 📜dev.rules
  ┃ ┣ 📜prod.rules
  ┃ ┗ 📜staging.rules
  ┣ 📂functions
  ┃ ┣ 📂lib
  ┃ ┃ ┣ 📂middleware
  ┃ ┃ ┃ ┣ 📜authMiddleware.js
  ┃ ┃ ┣ 📂routes
  ┃ ┃ ┃ ┣ 📜blogPosts.js
  ┃ ┃ ┃ ┣ 📜estimateRequests.js
  ┃ ┃ ┃ ┣ 📜subscribers.js
  ┃ ┃ ┣ 📂utils
  ┃ ┃ ┃ ┣ 📜admin.js
  ┃ ┃ ┣ 📜types.js
  ┃ ┣ 📂src
  ┃ ┃ ┣ 📂middleware
  ┃ ┃ ┃ ┣ 📜authMiddleware.ts
  ┃ ┃ ┣ 📂routes
  ┃ ┃ ┃ ┣ 📜blogPosts.ts
  ┃ ┃ ┃ ┣ 📜estimateRequests.ts
  ┃ ┃ ┃ ┗ 📜subscribers.ts
  ┃ ┃ ┣ 📂utils
  ┃ ┃ ┃ ┗ 📜admin.ts
  ┃ ┃ ┗ 📜types.ts
  ┣ 📂public
  ┃ ┣ 📂icons
  ┃ ┣ 📂images
  ┣ 📂src
  ┃ ┣ 📂app
  ┃ ┃ ┣ 📂(main)
  ┃ ┃ ┃ ┣ 📂(auth)
  ┃ ┃ ┃ ┃ ┣ 📂login
  ┃ ┃ ┃ ┃ ┣ 📂sign-up
  ┃ ┃ ┃ ┃ ┗ 📜layout.tsx
  ┃ ┃ ┃ ┣ 📂about
  ┃ ┃ ┃ ┣ 📂admin
  ┃ ┃ ┃ ┃ ┣ 📂_components
  ┃ ┃ ┃ ┃ ┃ ┣ 📜AdminHeader.tsx
  ┃ ┃ ┃ ┃ ┃ ┗ 📜AdminSidebar.tsx
  ┃ ┃ ┃ ┃ ┣ 📂clients
  ┃ ┃ ┃ ┃ ┣ 📂contact-requests
  ┃ ┃ ┃ ┃ ┣ 📂dashboard
  ┃ ┃ ┃ ┃ ┣ 📂estimates
  ┃ ┃ ┃ ┃ ┗ 📜layout.tsx
  ┃ ┃ ┃ ┣ 📂blog
  ┃ ┃ ┃ ┃ ┣ 📂[id]
  ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
  ┃ ┃ ┃ ┣ 📂careers
  ┃ ┃ ┃ ┣ 📂faq
  ┃ ┃ ┃ ┣ 📂news
  ┃ ┃ ┃ ┃ ┣ 📂[id]
  ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
  ┃ ┃ ┃ ┣ 📂privacy-policies
  ┃ ┃ ┃ ┣ 📂service-terms
  ┃ ┃ ┃ ┣ 📂services
  ┃ ┃ ┃ ┃ ┣ 📂[id]
  ┃ ┃ ┃ ┗ 📂testimonials
  ┃ ┃ ┣ 📂api
  ┃ ┃ ┃ ┗ 📂recaptcha
  ┃ ┃ ┃   ┗ 📜route.ts
  ┃ ┃ ┣ 📜EmotionRegistry.tsx
  ┃ ┃ ┣ 📜globals.css
  ┃ ┃ ┣ 📜layout.tsx
  ┃ ┃ ┣ 📜not-found.tsx
  ┃ ┃ ┣ 📜page.tsx
  ┃ ┃ ┗ 📜providers.tsx
  ┃ ┣ 📂assets
  ┃ ┃ ┗ 📂svg
  ┃ ┣ 📂components
  ┃ ┃ ┣ 📂action-buttons
  ┃ ┃ ┃ ┣ 📂CallButton
  ┃ ┃ ┃ ┣ 📂CreateBlogButton
  ┃ ┃ ┃ ┣ 📂EstimateRequestButton
  ┃ ┃ ┃ ┣ 📂ReviewButton
  ┃ ┃ ┃ ┣ 📂ShareButton
  ┃ ┃ ┃ ┣ 📂SmsButton
  ┃ ┃ ┣ 📂auth
  ┃ ┃ ┃ ┣ 📂AuthForm
  ┃ ┃ ┃ ┃ ┗ 📜AuthForm.tsx
  ┃ ┃ ┣ 📂common
  ┃ ┃ ┃ ┣ 📂ActionButton
  ┃ ┃ ┃ ┣ 📂ArrowButtons
  ┃ ┃ ┃ ┣ 📂ContentBox
  ┃ ┃ ┃ ┣ 📂CustomCheckbox
  ┃ ┃ ┃ ┣ 📂CustomModal
  ┃ ┃ ┃ ┣ 📂CustomTextField
  ┃ ┃ ┃ ┣ 📂DropdownMultiSelect
  ┃ ┃ ┃ ┣ 📂GroupedMultiSelect
  ┃ ┃ ┃ ┣ 📂NavButton
  ┃ ┃ ┃ ┣ 📂PageContainer
  ┃ ┃ ┃ ┣ 📂PageTitle
  ┃ ┃ ┃ ┣ 📂Section
  ┃ ┃ ┃ ┣ 📂SectionTitle
  ┃ ┃ ┃ ┣ 📂TruncatedChip
  ┃ ┃ ┃ ┗ 📂TypographyHangingIndent
  ┃ ┃ ┣ 📂forms
  ┃ ┃ ┃ ┣ 📂BlogForm
  ┃ ┃ ┃ ┣ 📂EstimateRequestForm
  ┃ ┃ ┃ ┣ 📂JobApplication
  ┃ ┃ ┃ ┣ 📂SubscribeForm
  ┃ ┃ ┣ 📂layout
  ┃ ┃ ┃ ┣ 📂Footer
  ┃ ┃ ┃ ┗ 📂NavBar
  ┃ ┃ ┗ 📂sections
  ┃ ┃   ┣ 📂Award
  ┃ ┃   ┣ 📂ComingSoon
  ┃ ┃   ┣ 📂Hero
  ┃ ┃   ┃ ┣ 📂components
  ┃ ┃   ┃ ┃ ┣ 📂HeroHeader
  ┃ ┃   ┃ ┃ ┣ 📜CompanyNameHeader.tsx
  ┃ ┃   ┃ ┃ ┣ 📜HeroActionArea.tsx
  ┃ ┃   ┃ ┃ ┣ 📜HeroContainer.tsx
  ┃ ┃   ┃ ┃ ┣ 📜HeroScroll.tsx
  ┃ ┃   ┣ 📂ReviewCard
  ┃ ┃   ┣ 📂ServicesAccordion
  ┃ ┣ 📂constants
  ┃ ┃ ┣ 📜careers.ts
  ┃ ┃ ┣ 📜companyDetails.ts
  ┃ ┃ ┣ 📜FAQ.ts
  ┃ ┃ ┣ 📜privacyPolicy.ts
  ┃ ┃ ┗ 📜services.ts
  ┃ ┣ 📂contexts
  ┃ ┃ ┣ 📂AuthContext
  ┃ ┃ ┗ 📂FirebaseCollectionContext
  ┃ ┣ 📂hooks
  ┃ ┃ ┣ 📂auth
  ┃ ┃ ┃ ┗ 📜useUser.ts
  ┃ ┃ ┣ 📜useMedia.ts
  ┃ ┃ ┗ 📜useRecaptcha.ts
  ┃ ┣ 📂lib
  ┃ ┃ ┣ 📂createEmotionCache
  ┃ ┃ ┣ 📂firebase
  ┃ ┃ ┃ ┣ 📜firebase.ts
  ┃ ┃ ┃ ┣ 📜firebaseAdmin.ts
  ┃ ┃ ┣ 📂services
  ┃ ┃ ┃ ┣ 📜apiService.ts
  ┃ ┃ ┣ 📂utils
  ┃ ┣ 📂styles
  ┃ ┃ ┣ 📂theme
  ┃ ┃ ┃ ┣ 📂components
  ┃ ┃ ┃ ┃ ┣ 📜_base.ts
  ┃ ┃ ┃ ┃ ┣ 📜_buttons.ts
  ┃ ┃ ┃ ┃ ┣ 📜_content.ts
  ┃ ┃ ┃ ┃ ┣ 📜_dialogs.ts
  ┃ ┃ ┃ ┃ ┣ 📜_forms.ts
  ┃ ┃ ┃ ┃ ┣ 📜_navigation.ts
  ┃ ┃ ┃ ┣ 📜colors.ts
  ┃ ┃ ┃ ┣ 📜globalSlickStyles.ts
  ┃ ┃ ┃ ┣ 📜otherThemeConstants.ts
  ┃ ┃ ┃ ┣ 📜palette.ts
  ┃ ┃ ┃ ┗ 📜typography.ts
  ┃ ┃ ┣ 📜globals.css
  ┃ ┃ ┗ 📜variables.css
  ┃ ┗ 📂types
  ┃   ┣ 📜express.d.ts
  ┃   ┗ 📜mui.d.ts
  ┣ 📂storage_rules
  ┃ ┣ 📜dev.rules
  ┃ ┣ 📜prod.rules
  ┃ ┗ 📜staging.rules
  ┣ 📜.env.local
  ┣ 📜.env.prod
  ┣ 📜.env.staging
  ┣ 📜.firebaserc
  ┣ 📜database.rules.json
  ┣ 📜firebase.json
  ┣ 📜package.json

  ```

## Troubleshooting

### npm install (on project start up)

  1. Read the error message. Look closely for `Err!` lines in the console output.

  2. Verify `Node.js` and `npm` versions. You should have:

    - `Node.js `**v22.x** or higher
    - `npm `**v11.x** or higher

    To find your version numbers:

    ```bash
    node -v
    npm -v
    ```

    If there is a mismatch, use a version manager like `nvm` to switch to the required version. 
    
    See instructions for switching versions [here](https://medium.com/@madhawaawishka/switching-node-js-versions-with-nvm-53aff64ac4f2#:~:text=nvm%20allows%20you%20to%20install,on%20via%20the%20command%20line.).

  3. Clear `npm cache` (precautionary) and attempt to reinstall:

    ```bash
    npm cache clean --force
    npm install
    ```

  4. Check network/proxy for issues in the console

    - Errors like `ETIMEDOUT`, `EAI_AGAIN`, `SSL_CERT_ERR` are indicative of network issues.
    - Ensure `npm proxy` settings are correct with these commands:

      1. To check the HTTP proxy: `npm config get proxy`

      2. To check the HTTPS proxy: `npm config get https-proxy`

      3. To test if `npm` can reach the registry through your configured proxy: `npm ping`

        - If successful, it should return something like this:

        ```json
        {}
        ```

        - If unsuccessful, it will return network errors like `ETIMEDOUT`, `ECONNRESET`, or `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`. 
        - This indicates the proxy settings are incorrect or there are underlying network/SSL issues. 
        - For help debugging network/SSL issues, please reach out to me or find troubleshooting instructions from a reputable source. 
        - **Do not** set `strict-ssl` to `false`, as it is not secure.

  5. If none of the above methods are successful, try running with a verbose output for more detailed debugging information with this command:

  ```bash
  npm install --loglevel verbose
  ```

  6. If you still can't figure it out, copy your `ERR!` lines from your terminal and paste them into a search engine or AI model (Gemini, Copilot, ChatGPT, your choice). Many common errors have well-known solutions.

### npm install (after successful initial project setup)

  1. Read the error message. Look closely for `Err!` lines in the console output.

  2. Clear `npm cache`: `npm cache clean --force`

  3. Delete `node_modules` and `package-lock.json`:

    - First, ensure your local environment is **not actively running** in any terminals.
    - Delete `node_modules` and `package-lock.json`: 

    ```bash
    rm -rf node_modules
    rm -rf package-lock.json
    ```

    - Attempt to reinstall dependencies: `npm install`

  4. Verify `Node.js` and `npm` versions. You should have:

    - `Node.js` **v22.x** or higher
    - `npm` **v11.x** or higher

    To find your version numbers run these command:

    ```bash
    node -v
    npm -v
    ```

    If there is a mismatch, use a version manager like `nvm` to switch to the required version. See instructions for switching versions [here](https://medium.com/@madhawaawishka/switching-node-js-versions-with-nvm-53aff64ac4f2#:~:text=nvm%20allows%20you%20to%20install,on%20via%20the%20command%20line.).

  5. Check network/proxy for issues in the console

    - Errors like `ETIMEDOUT`, `EAI_AGAIN`, `SSL_CERT_ERR` are indicative of network issues.
    - Temporarily disable VPN/proxy (NOT recommended), or ensure npm proxy settings are correct with these commands:

      1. To check the HTTP proxy: `npm config get proxy`

      2. To check the HTTPS proxy: `npm config get https-proxy`

      3. To test if `npm` can reach the registry through your configured proxy: `npm ping`

        - If successful, it should return something like this:

        ```json
        {}
        ```

        - If unsuccessful, it will return network errors like `ETIMEDOUT`, `ECONNRESET`, or `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`. 
        - This indicates the proxy settings are incorrect or there are underlying network/SSL issues. 
        - For help debugging network/SSL issues, please reach out to me or find troubleshooting instructions from a reputable source. 
        - **Do not** set `strict-ssl` to `false`, as it is not secure.

  6. Try running with a verbose output for more detailed debugging information: `npm install --loglevel verbose`

  7. Check permissions to make sure they are correct for `npm`: 

    - If errors mention `EACCES` or permission denied, the problem is likely the permissions configuration on your local machine.
    - To bypass permissions and install anyway (use with caution, only if absolutely necessary):

    ```bash
    sudo npm install
    ```

    - To fix `npm` permissions:

    ```bash
    sudo chown -R $(whoami) ~.npm
    ```

    - After running the permission mod command above, attempt to install again: `npm install`

    - If you continue to get an `EACCES` or permission denied error message, configure `npm` to use a different global directory:

      1. Create a directory for global installations in your `user` folder and configure `npm` to use it:

      ```bash
      mkdir ~.npm-global
      npm config set prefix '~.npm-global'
      ```

      2. Add this new directory to your system's `PATH` environment variable:

        - Open or create your shells profile file. This should be in your `users` folder. Your shells profile file could be `~/.bashrc`, `~/.zshrc`, or `~/.profile`.
        - Open the file with your text editor and add this line at the end of the file:

        `export PATH=~/.npm-global/bin:$PATH`

        - Save the file.

      4. Apply the new changes to your current shell session using this command (just one, dependent on the name of your shell's profile file name in your home directory):

      ```bash
      source ~/.bashrc
      ```

      ```bash
      source ~/.zshrc
      ```

      ```bash
      source ~/.profile
      ```
    
    5. Test your changes by attempting to install a package globally without `sudo` using this command (using any package you like, ideally a small one):

    ```bash
    npm install -g jshint
    ```

    6. Ensure you are using the same filesystem as you are using to configure `npm` permissions to store your project and install the dependencies.

      - For example, if you are using WSL to run the project, but the files and permissions are in your Windows filesytem, you will encounter either an `EACCES` or `EPERM` errors.
      - Debug filesystem issues with these steps:

        1. Make sure the project directory, permissions, and CLI are in the same filesystem.
        2. Once you are sure you are using and storing everything within a single filesystem, return to **step 4**.
      
    ** If you are still having problems, or frequently have permission errors:**

    - Use a tool like Node Version Manager `nvm` or `volta` to automatically handle permissions correclty. These tool install Node.js and `npm` to your user directory from the start. This is the ideal solution to frequent permissions errors.

    - Still having permission problems?
      Clone the repository in a different filesystem (e.g., WSL for windows)

  8. Try updating `npm`.

    - To update `npm` to the latest version, run this command:

    ```bash
    npm install -g npm@latest
    ```

  9. Check `package.json` for typos, missing commas, incorrect version ranges, etc.

  10. Check for specific dependency issues.

    - Try installing each dependency individually with `--force` to determine if one or more of the dependencies are the issue with this command:

    ```bash
    npm install --force
    ```

  11. If you still can't figure it out, copy your `ERR!` lines from your terminal and paste them into a search engine or AI model (Gemini, Copilot, ChatGPT, your choice). Many common errors have well-known solutions.

### Failing Branch Name Check
  - All branches must follow the naming conventions mentioned in the [Contributing](#contributing) section above. 
  - If you accidentally created and worked on a branch with an incorrect naming pattern, your PR will not pass necessary checks. To rename your branch, follow these steps:

    1. In your CLI, switch to the branch that needs renaming

    ```bash
    git checkout <old-branch-name>
    ```

    2. Rename the local branch. The `-m` flag is for "move" (rename)

    ```bash
    git branch -m <new-branch-name>
    ```

    3. Delete the old, incorrectly named branch from the remote repository

    ```bash
    git push origin --delete <old-branch-name>
    ```

    4. Push the new, correclty named branch to the remote repository. The `-u` (or `--set-upstream`) flag sets the upstream ranch for future push and pull commands to automatically track the new remote branch.

    ```bash
    git push -u origin <new-branch-name>
    ```

    5. Confirm the new branch is working and run this command to cleanup local references to branches that no longer exist on the remote repository.

    ```bash
    git remote prune origin
    ```

    6. Update your Pull Request
      - Go to PR on GitHub
      - GitHub may have automatically updated the PR, but if not there should be an option to associate the PR with a new branch.
      - If GitHub does not automatically update the PR and you do not see the option to change the associated branch, close the PR linked to the old branch and create a new PR with the new branch.

## License
  - This project is proprietary and is not licensed for public use. All rights are reserved by Penny Nichols.
  - Contributions are welcom, but require a Contributor License Agreement (CLA) to be signed. Please contact Penny Nichols to request access or discuss contributions.