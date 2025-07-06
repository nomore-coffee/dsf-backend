const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function testUpload() {
  try {
    // Create form data
    const form = new FormData();
    
    // Add the file
    form.append('file', fs.createReadStream('/Users/amansharma9846/Downloads/PRS-Logo.ai.jpg'));
    
    // Add other form fields
    form.append('orgID', '686a2e142e5cf31304f7c86c');
    form.append('userID', '686a2e142e5cf31304f7c86a');
    form.append('forClass', '10');
    form.append('materialTitle', 'Maths Chapter 1');
    form.append('materialSubject', 'math');
    
    console.log('Testing upload to:', 'http://localhost:3000/materials/test-upload');
    
    // Test the upload endpoint
    const response = await axios.post('http://localhost:3000/materials/test-upload', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testUpload(); 