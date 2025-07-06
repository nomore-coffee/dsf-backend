# Material Upload with S3 Integration

This document explains how to use the material upload functionality with AWS S3 integration for teachers and admins.

## Prerequisites

### AWS S3 Configuration
You need to set up the following environment variables:

```env
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-s3-bucket-name
```

### S3 Bucket Setup
1. Create an S3 bucket in your AWS account
2. Configure CORS for the bucket to allow uploads from your domain
3. Set appropriate bucket policies for public read access

## API Endpoints

### Upload Material
**POST** `/materials/upload`

**Authentication**: Required (JWT token)
**Roles**: ADMIN, TEACHER

**Request**: Multipart form data

**Form Fields**:
- `file` (required): The file to upload
- `orgID` (required): Organization ID
- `userID` (required): User ID (uploader)
- `forClass` (required): Class/grade number
- `materialTitle` (required): Title of the material
- `materialSubject` (required): Subject (english, math, science, etc.)

### Create Material (without file)
**POST** `/materials`

**Authentication**: Required (JWT token)
**Roles**: ADMIN, TEACHER

**Request Body**:
```json
{
  "orgID": "507f1f77bcf86cd799439011",
  "userID": "507f1f77bcf86cd799439012",
  "forClass": 10,
  "materialTitle": "Mathematics Chapter 1",
  "materialSubject": "math"
}
```

## File Upload Specifications

### Supported File Types
- **Documents**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT
- **Images**: JPG, JPEG, PNG, GIF
- **Videos**: MP4, AVI, MOV
- **Audio**: MP3, WAV

### File Size Limits
- Maximum file size: 10MB

### File Organization
Files are organized in S3 with the following structure:
```
materials/{orgID}/{userID}/{timestamp}.{extension}
```

## Example Usage

### Using cURL
```bash
curl -X POST http://localhost:3000/materials/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/your/file.pdf" \
  -F "orgID=507f1f77bcf86cd799439011" \
  -F "userID=507f1f77bcf86cd799439012" \
  -F "forClass=10" \
  -F "materialTitle=Mathematics Chapter 1" \
  -F "materialSubject=math"
```

### Using JavaScript/Fetch
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('orgID', '507f1f77bcf86cd799439011');
formData.append('userID', '507f1f77bcf86cd799439012');
formData.append('forClass', '10');
formData.append('materialTitle', 'Mathematics Chapter 1');
formData.append('materialSubject', 'math');

fetch('/materials/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

## Response Format

### Success Response
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "orgID": "507f1f77bcf86cd799439011",
  "userID": "507f1f77bcf86cd799439012",
  "forClass": 10,
  "materialTitle": "Mathematics Chapter 1",
  "materialUrl": "https://your-bucket.s3.amazonaws.com/materials/507f1f77bcf86cd799439011/507f1f77bcf86cd799439012/1703123456789.pdf",
  "materialSubject": "math",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Error Responses
```json
{
  "statusCode": 400,
  "message": "File size exceeds maximum limit of 10MB"
}
```

```json
{
  "statusCode": 400,
  "message": "File type application/octet-stream is not allowed"
}
```

## Additional Endpoints

### Get Materials by Organization and Class
**GET** `/materials/org/{orgID}/class/{forClass}`

### Get Materials by Organization and Subject
**GET** `/materials/org/{orgID}/subject/{materialSubject}`

### Get All Materials
**GET** `/materials`

### Get Material by ID
**GET** `/materials/{id}`

### Update Material
**PUT** `/materials/{id}`

### Delete Material
**DELETE** `/materials/{id}`

## Security Features

1. **Role-based Access**: Only ADMIN and TEACHER roles can upload materials
2. **File Validation**: File type and size validation
3. **Authentication**: JWT token required for all operations
4. **Organization Isolation**: Materials are organized by organization ID
5. **Secure File Storage**: Files are stored in AWS S3 with proper access controls

## Error Handling

The system handles various error scenarios:
- Invalid file types
- File size exceeding limits
- Missing required fields
- Authentication failures
- S3 upload failures
- Database operation failures

## Best Practices

1. Always validate file types on the client side before upload
2. Implement progress indicators for large file uploads
3. Handle network failures gracefully
4. Implement retry mechanisms for failed uploads
5. Monitor S3 storage usage and costs
6. Regularly backup material metadata 