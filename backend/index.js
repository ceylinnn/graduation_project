//index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const UserService = require('./services/userService');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route imports
const userRoutes = require('./routes/userRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const userProductRoutes = require('./routes/userProductRoutes');
const combinationRoutes = require('./routes/combinationRoutes');
const surveyQuestionRoutes = require('./routes/surveyQuestionRoutes');
const upperwearRoutes = require('./routes/upperwearRoutes');
const lowerwearRoutes = require('./routes/lowerwearRoutes');
const accessoryRoutes = require('./routes/accessoryRoutes');
const shoesRoutes = require('./routes/shoesRoutes');
const outerwearRoutes = require('./routes/outerwearRoutes');
const useranswersRoutes = require('./routes/useranswers');//
const userProductUpperwearRoutes = require('./routes/userProductUpperwearRoutes');
const userProductLowerwearRoutes = require('./routes/userProductLowerwearRoutes');
const userProductAccessoryRoutes = require('./routes/userProductAccessoryRoutes');
const userProductShoesRoutes = require('./routes/userProductShoesRoutes');
const userProductOuterwearRoutes = require('./routes/userProductOuterwearRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/survey', surveyRoutes);
app.use('/userprofile', userProfileRoutes);
app.use('/userproducts', userProductRoutes);
app.use('/combinations', combinationRoutes);
app.use('/surveyquestions', surveyQuestionRoutes);
app.use('/upperwear', upperwearRoutes);
app.use('/lowerwear', lowerwearRoutes);
app.use('/accessory', accessoryRoutes);
app.use('/shoes', shoesRoutes);
app.use('/outerwear', outerwearRoutes);
app.use('/useranswers', useranswersRoutes);//
app.use('/userproductupperwear', userProductUpperwearRoutes); 
app.use('/userproductlowerwear', userProductLowerwearRoutes);
app.use('/userproductaccessory', userProductAccessoryRoutes);
app.use('/userproductshoes', userProductShoesRoutes);
app.use('/userproductouterwear', userProductOuterwearRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// TEST findByEmail function
const testEmail = 'Example@gmail.com';
User.findByEmail(testEmail, (err, results) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Found user:', results);
    }
});













