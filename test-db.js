const mongoose = require('mongoose');

async function testDB() {
  try {
    await mongoose.connect('mongodb+srv://dsf_main:digital%402025@cluster0.1texgvj.mongodb.net/digitalShala');
    console.log('Connected to MongoDB');
    
    // Check users collection
    const User = mongoose.model('User', new mongoose.Schema({}));
    const users = await User.find({});
    console.log('Users in database:', users.length);
    users.forEach(user => {
      console.log('User:', {
        id: user._id,
        email: user.userEmail,
        role: user.role,
        name: user.userName
      });
    });
    
    // Check organizations collection
    const Org = mongoose.model('Org', new mongoose.Schema({}));
    const orgs = await Org.find({});
    console.log('Organizations in database:', orgs.length);
    orgs.forEach(org => {
      console.log('Org:', {
        id: org._id,
        email: org.orgEmail,
        name: org.orgName,
        owner: org.orgOwner
      });
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testDB(); 