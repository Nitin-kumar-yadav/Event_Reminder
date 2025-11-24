# Event Reminder Project

## Overview
A web application to manage and remind users of important events, featuring secure authentication and a responsive UI.

## Features

### Frontend
- **Tech Stack**: React, Tailwind CSS, Zustand, Axios.
- **Authentication**: Signup with Email OTP verification, Login, Logout.
- **Event Management**: Create, Read, Update, and Delete (CRUD) personal events.
- **UI/UX**: 
  - Responsive design for all devices.
  - Dark/Light mode toggle.
  - Real-time UI updates (Optimistic UI).
  - Loading skeletons and toast notifications.

### Backend
- **Tech Stack**: Node.js, Express.js, MongoDB (Mongoose).
- **Security**: 
  - JWT-based authentication (HttpOnly cookies).
  - Password hashing (Bcrypt).
  - OTP verification for email ownership.
- **Database**: 
  - User and Event schemas.
  - **Auto-Cleanup**: Unverified users are automatically deleted after 10 minutes (TTL Index).
- **API**: RESTful endpoints for Auth and Events.

## Roadmap

### Phase 1: Core Stability (Current)
- [x] Secure Auth Flow (Signup -> OTP -> Login).
- [x] Basic Event CRUD.
- [x] Persistent Login State.
- [x] Theme Support.

### Phase 2: Enhanced User Experience
- [ ] **Search & Filter**: Find events by title or date.
- [ ] **Calendar View**: Visual monthly/weekly calendar for events.
- [ ] **Profile Management**: Update username, password, and avatar.

### Phase 3: Advanced Features
- [ ] **Notifications**: 
  - Browser Push Notifications.
  - Email Reminders for upcoming events.
- [ ] **Categories**: Tag events (e.g., Work, Personal, Birthday).
- [ ] **Social Login**: Google/GitHub authentication.
- [ ] **Shared Events**: Invite other users to events.
