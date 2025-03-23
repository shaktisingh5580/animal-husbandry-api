# Deployment Guide for Animal Husbandry Inventory System

This guide provides step-by-step instructions for deploying the Animal Husbandry Inventory System.

## Prerequisites

- Firebase account
- Vercel account
- Render account
- GitHub account

## Step 1: Set Up Firebase

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database in production mode
4. Generate a new private key for Firebase Admin SDK:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file securely

## Step 2: Deploy Backend to Render

1. Fork or clone the repository to your GitHub account
2. Sign in to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure the service:
   - Name: `animal-husbandry-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Select the "Free" plan

6. Add environment variables from your Firebase private key:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (make sure to include the entire key with newlines)
   - `FIREBASE_PRIVATE_KEY_ID`
   - `FIREBASE_CLIENT_ID`
   - `FIREBASE_CLIENT_CERT_URL`
   - `PORT` (set to 5000)

7. Click "Create Web Service"
8. Wait for the deployment to complete and note the URL (e.g., `https://animal-husbandry-api.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. Sign in to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next

4. Add environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_API_URL` (set to your Render backend URL)
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_PRIVATE_KEY_ID`
   - `FIREBASE_CLIENT_ID`
   - `FIREBASE_CLIENT_CERT_URL`

5. Click "Deploy"
6. Wait for the deployment to complete

## Step 4: Initialize Firestore

1. Run the initialization script to set up Firestore collections:

