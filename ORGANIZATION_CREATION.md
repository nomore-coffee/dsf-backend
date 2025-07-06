# Organization Creation with User Owner

This document explains how to create an organization along with a user who will be set as the organization owner.

## API Endpoint

**POST** `/orgs`

## Request Body

The request body should include both organization details and user details for the organization owner:

```json
{
  "orgName": "Digital Shala Academy",
  "orgEmail": "admin@digitalshala.com",
  "orgPassword": "securePassword123",
  "isActive": true,
  "ownerName": "John Doe",
  "ownerEmail": "john.doe@digitalshala.com",
  "ownerPassword": "userPassword123",
  "ownerClass": 10,
  "ownerRole": "admin"
}
```

## Field Descriptions

### Organization Fields
- `orgName` (required): Name of the organization
- `orgEmail` (required): Email address for the organization
- `orgPassword` (required): Password for the organization admin account
- `isActive` (optional): Whether the organization is active (defaults to true)

### User Owner Fields
- `ownerName` (required): Full name of the organization owner
- `ownerEmail` (required): Email address of the organization owner
- `ownerPassword` (required): Password for the organization owner account (minimum 6 characters)
- `ownerClass` (required): Class/grade of the user
- `ownerRole` (required): Role of the user (admin, student, teacher, parent)

## Process Flow

1. **User Creation**: A new user is created with the provided owner details
2. **Organization Creation**: The organization is created with the new user as the owner
3. **User Update**: The user's `orgID` field is updated with the organization's ID

## Response

The API returns the created organization object with the owner information populated.

## Example Response

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "orgName": "Digital Shala Academy",
  "orgEmail": "admin@digitalshala.com",
  "orgPassword": "hashedPassword",
  "orgOwner": "507f1f77bcf86cd799439012",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

- If the organization email already exists, a conflict error is returned
- If the user email already exists, a conflict error is returned
- If required fields are missing, validation errors are returned
- If the user role is invalid, a validation error is returned

## Authentication

This endpoint requires JWT authentication and appropriate role permissions. 