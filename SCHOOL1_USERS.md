# School1 Organization - User Credentials

## Organization Details
- **Organization Name**: School1
- **Organization ID**: `687357a914b0285b1ca0a477`
- **Organization Email**: admin@school1.com
- **Organization Password**: school1pass123

## User Accounts Created

### 🔐 Super Admin
- **Name**: Super Admin
- **Email**: superadmin@school1.com
- **Password**: superadmin123
- **Role**: super_admin
- **Class**: 12
- **User ID**: `687357a914b0285b1ca0a475`
- **Permissions**: Full system access, can view all organizations and users

### 👨‍💼 Admin Users
#### 1. Sarah Admin
- **Name**: Sarah Admin
- **Email**: sarah.admin@school1.com
- **Password**: sarah123
- **Role**: admin
- **Class**: 12
- **User ID**: `687357f914b0285b1ca0a48e`
- **Permissions**: Organization-level management, user creation, material management

#### 2. Admin User (from School1 Admin org)
- **Name**: Admin User
- **Email**: admin@school1admin.com
- **Password**: admin123
- **Role**: admin
- **Class**: 12
- **User ID**: `687357d014b0285b1ca0a47e`
- **Organization**: School1 Admin (`687357d014b0285b1ca0a480`)
- **Permissions**: Organization-level management

### 👨‍🏫 Teachers
#### 1. John Teacher
- **Name**: John Teacher
- **Email**: teacher@school1.com
- **Password**: teacher123
- **Role**: teacher
- **Class**: 10
- **User ID**: `687357df14b0285b1ca0a485`
- **Permissions**: Material creation, notice creation, educational content management

#### 2. Emma Teacher
- **Name**: Emma Teacher
- **Email**: emma.teacher@school1.com
- **Password**: emma123
- **Role**: teacher
- **Class**: 11
- **User ID**: `6873580214b0285b1ca0a491`
- **Permissions**: Material creation, notice creation, educational content management

### 👨‍🎓 Students
#### 1. Alice Student
- **Name**: Alice Student
- **Email**: student@school1.com
- **Password**: student123
- **Role**: student
- **Class**: 10
- **User ID**: `687357e614b0285b1ca0a488`
- **Permissions**: Access to materials and notices

#### 2. David Student
- **Name**: David Student
- **Email**: david.student@school1.com
- **Password**: david123
- **Role**: student
- **Class**: 11
- **User ID**: `6873580d14b0285b1ca0a494`
- **Permissions**: Access to materials and notices

### 👨‍👩‍👧‍👦 Parents
#### 1. Bob Parent
- **Name**: Bob Parent
- **Email**: parent@school1.com
- **Password**: parent123
- **Role**: parent
- **Class**: 10
- **User ID**: `687357f014b0285b1ca0a48b`
- **Permissions**: Access to notices and attendance

#### 2. Lisa Parent
- **Name**: Lisa Parent
- **Email**: lisa.parent@school1.com
- **Password**: lisa123
- **Role**: parent
- **Class**: 11
- **User ID**: `6873581914b0285b1ca0a497`
- **Permissions**: Access to notices and attendance

## API Testing Commands

### Login Commands
```bash
# Super Admin Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "superadmin@school1.com", "userPassword": "superadmin123", "role": "super_admin"}'

# Admin Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "sarah.admin@school1.com", "userPassword": "sarah123", "role": "admin"}'

# Teacher Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "teacher@school1.com", "userPassword": "teacher123", "role": "teacher"}'

# Student Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "student@school1.com", "userPassword": "student123", "role": "student"}'

# Parent Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "parent@school1.com", "userPassword": "parent123", "role": "parent"}'
```

### Example API Usage with JWT Token
```bash
# Get all users (requires admin token)
curl -X GET http://localhost:3000/users/test/all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"

# Get all materials (requires any authenticated user)
curl -X GET http://localhost:3000/materials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"

# Get all notices (requires any authenticated user)
curl -X GET http://localhost:3000/notices \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Role-Based Permissions

### Super Admin
- ✅ View all organizations
- ✅ View all users across organizations
- ✅ Full system access

### Admin
- ✅ Create users within organization
- ✅ Manage organization settings
- ✅ Create and manage materials
- ✅ Create and manage notices
- ✅ Activate/deactivate users

### Teacher
- ✅ Create and manage materials
- ✅ Create and manage notices
- ✅ View materials and notices

### Student
- ✅ View materials
- ✅ View notices
- ❌ Cannot create content

### Parent
- ✅ View notices
- ✅ View attendance records
- ❌ Cannot create content

## Testing Scenarios

1. **Login as different roles** to test authentication
2. **Create materials** using teacher/admin accounts
3. **Create notices** using teacher/admin accounts
4. **View materials** using student accounts
5. **View notices** using all role types
6. **Test attendance tracking** using parent accounts
7. **Test user management** using admin accounts

## Notes

- All users are created in the School1 organization (`687357a914b0285b1ca0a477`)
- Passwords are hashed using bcrypt
- All users are active by default
- JWT tokens expire after 24 hours
- Each role has specific API endpoint access based on the controller decorators 