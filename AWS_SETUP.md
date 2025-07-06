# AWS S3 Setup Guide for Material Upload

This guide explains how to set up AWS S3 for the material upload functionality.

## Prerequisites

1. AWS Account
2. AWS CLI installed (optional but recommended)
3. Node.js application with the material upload functionality

## Step 1: Create S3 Bucket

1. Log in to AWS Console
2. Navigate to S3 service
3. Click "Create bucket"
4. Choose a unique bucket name (e.g., `digitalshala-materials`)
5. Select your preferred region
6. Configure options:
   - **Block Public Access**: Uncheck "Block all public access" (since we need public read access)
   - **Bucket Versioning**: Enable if needed
   - **Server-side encryption**: Enable (recommended)
7. Click "Create bucket"

## Step 2: Configure CORS

1. Select your bucket
2. Go to "Permissions" tab
3. Scroll down to "Cross-origin resource sharing (CORS)"
4. Click "Edit" and add the following configuration:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
]
```

**Note**: For production, replace `"*"` in `AllowedOrigins` with your specific domain.

## Step 3: Configure Bucket Policy

1. In the "Permissions" tab, click "Bucket policy"
2. Add the following policy (replace `your-bucket-name` with your actual bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

## Step 4: Create IAM User

1. Navigate to IAM service
2. Click "Users" → "Create user"
3. Enter a username (e.g., `digitalshala-s3-user`)
4. Select "Programmatic access"
5. Click "Next: Permissions"
6. Click "Attach existing policies directly"
7. Search for and select "AmazonS3FullAccess" (or create a custom policy)
8. Complete the user creation
9. **Important**: Save the Access Key ID and Secret Access Key

## Step 5: Environment Variables

Add the following environment variables to your `.env` file:

```env
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name
```

## Step 6: Custom IAM Policy (Optional but Recommended)

For better security, create a custom IAM policy instead of using `AmazonS3FullAccess`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name"
        }
    ]
}
```

## Step 7: Test Configuration

You can test your configuration using the AWS CLI:

```bash
# Test upload
aws s3 cp test-file.txt s3://your-bucket-name/materials/test/

# Test download
aws s3 cp s3://your-bucket-name/materials/test/test-file.txt ./downloaded-file.txt
```

## Security Best Practices

1. **Use IAM Roles**: For production deployments on AWS (EC2, Lambda, etc.), use IAM roles instead of access keys
2. **Rotate Access Keys**: Regularly rotate your access keys
3. **Least Privilege**: Only grant the minimum permissions necessary
4. **Monitor Usage**: Set up CloudTrail to monitor S3 access
5. **Encryption**: Enable server-side encryption for your bucket
6. **Lifecycle Policies**: Set up lifecycle policies to manage old files

## Cost Optimization

1. **Storage Classes**: Use appropriate storage classes (Standard, IA, Glacier) based on access patterns
2. **Lifecycle Policies**: Automatically move old files to cheaper storage classes
3. **Monitoring**: Set up billing alerts
4. **CDN**: Consider using CloudFront for frequently accessed files

## Troubleshooting

### Common Issues

1. **Access Denied**: Check IAM permissions and bucket policy
2. **CORS Errors**: Verify CORS configuration
3. **File Not Found**: Check file path and bucket name
4. **Upload Failures**: Verify file size limits and network connectivity

### Debug Commands

```bash
# Check bucket contents
aws s3 ls s3://your-bucket-name --recursive

# Check bucket policy
aws s3api get-bucket-policy --bucket your-bucket-name

# Check CORS configuration
aws s3api get-bucket-cors --bucket your-bucket-name
```

## Production Considerations

1. **Backup Strategy**: Implement backup strategies for your S3 data
2. **Monitoring**: Set up CloudWatch alarms for bucket metrics
3. **Compliance**: Ensure your setup meets compliance requirements
4. **Disaster Recovery**: Plan for disaster recovery scenarios
5. **Performance**: Monitor and optimize for performance requirements 