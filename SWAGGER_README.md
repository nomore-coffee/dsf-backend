# DigitalShala API Documentation

## Swagger UI Access

The DigitalShala API documentation is available through Swagger UI at:

**http://localhost:3000/api-docs**

## Features

### 🔐 Authentication
- JWT Bearer token authentication
- Role-based access control
- Login/Logout endpoints

### 🏢 Organization Management
- Create organizations with owner setup
- Organization CRUD operations
- Activation/deactivation controls
- SUPER_ADMIN specific endpoints

### 👥 User Management
- User creation and management
- Role-based user operations
- User activation/deactivation
- Class-based user organization

### 📚 Material Management
- Educational material upload and management
- File upload support (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, Images, Videos, Audio)
- Subject-based categorization
- Class-based filtering
- Organization and user-specific materials

### 📢 Notice Management
- Notice creation and management
- Multiple notice types (exam, sport, holiday, extra)
- Class-based notice distribution
- Filtering capabilities

### 📊 Attendance Tracking
- Student attendance recording
- Status tracking (present, absent, leave)
- Date range queries
- User and organization-based filtering

## API Endpoints Overview

### Auth Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

### Organization Endpoints
- `POST /orgs/setup` - Initial organization setup
- `POST /orgs` - Create organization (authenticated)
- `GET /orgs` - Get all organizations (ADMIN)
- `GET /orgs/super-admin/all` - Get all organizations (SUPER_ADMIN)
- `GET /orgs/:id` - Get organization by ID
- `PUT /orgs/:id` - Update organization
- `PATCH /orgs/:id/activate` - Activate organization
- `PATCH /orgs/:id/deactivate` - Deactivate organization

### User Endpoints
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/activate` - Activate user
- `PATCH /users/:id/deactivate` - Deactivate user
- `GET /users/super-admin/all` - Get all users (SUPER_ADMIN)
- `GET /users/test/all` - Test endpoint for all users

### Material Endpoints
- `POST /materials` - Create material (metadata)
- `POST /materials/upload` - Upload material with file
- `POST /materials/test-upload` - Test file upload
- `GET /materials` - Get all materials
- `GET /materials/:id` - Get material by ID
- `PUT /materials/:id` - Update material
- `DELETE /materials/:id` - Delete material
- `GET /materials/user/:userID` - Get materials by user
- `GET /materials/org/:orgID` - Get materials by organization
- `GET /materials/class/:forClass` - Get materials by class
- `GET /materials/subject/:materialSubject` - Get materials by subject
- `GET /materials/super-admin/all` - Get all materials (SUPER_ADMIN)

### Notice Endpoints
- `POST /notices` - Create notice
- `GET /notices` - Get all notices
- `GET /notices/filter` - Filter notices
- `PUT /notices/:id` - Update notice
- `DELETE /notices/:id` - Delete notice

### Attendance Endpoints
- `POST /attendance` - Create attendance record
- `PUT /attendance/:id` - Update attendance record
- `DELETE /attendance/:id` - Delete attendance record
- `GET /attendance/user/:userID` - Get attendance by user
- `GET /attendance/org/:orgID` - Get attendance by organization
- `GET /attendance/status/:status` - Get attendance by status
- `GET /attendance/date-range` - Get attendance by date range

## User Roles

- **SUPER_ADMIN**: Full system access
- **ADMIN**: Organization-level management
- **TEACHER**: Educational content management
- **STUDENT**: Access to materials and notices
- **PARENT**: Access to notices and attendance

## Getting Started

1. Start the application:
   ```bash
   npm run start:dev
   ```

2. Access Swagger UI:
   ```
   http://localhost:3000/api-docs
   ```

3. Use the "Authorize" button to add your JWT token for authenticated endpoints

4. Explore and test the API endpoints directly from the Swagger interface

## File Upload Support

The material upload endpoint supports the following file types:
- **Documents**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT
- **Images**: JPEG, PNG, GIF
- **Videos**: MP4, AVI, MOV
- **Audio**: MPEG, WAV

Maximum file size: 10MB

## Authentication

Most endpoints require JWT authentication. To authenticate:

1. Use the `/auth/login` endpoint with your credentials
2. Copy the `access_token` from the response
3. Click "Authorize" in Swagger UI
4. Enter: `Bearer <your_token>`
5. Click "Authorize"

The token will be automatically included in subsequent requests. 