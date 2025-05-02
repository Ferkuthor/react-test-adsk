# User Management Dashboard with React + TypeScript

A responsive dashboard for managing user data with API integration.

## ✨ Features

- View users in a paginated table
- Add new users via modal form
- Real-time API synchronization
- Form validation
- Loading and error states
- Responsive design (mobile-friendly)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Library**: Material-UI v5 + MUI X DataGrid
- **API Client**: Fetch API
- **Mock API**: Beeceptor

## 📂 Project Structure

- App.tsx - Theme provider
- components/
  - CreateItemModal.tsx - User creation
- hooks/
  - useUserData.ts - API interaction logic
- pages/
  - HomePage.tsx - Main view

## 🌐 API Configuration

The app connects to:
https://react-test-adsk.free.beeceptor.com/users

Endpoints:

- GET - Fetch all users
- POST - Create new user

## 🎨 Customization

Edit App.tsx to modify:
Color scheme
Typography
Default component styles
