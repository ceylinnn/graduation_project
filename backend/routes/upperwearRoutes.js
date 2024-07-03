// routes/upperwearRoutes.js
/*const express = require('express');
const router = express.Router();
const upperwearController = require('../controllers/UpperwearController');

router.post('/upperwear', upperwearController.addDummyUpperwears);

module.exports = router;*/

const express = require('express');
const router = express.Router();
const upperwearController = require('../controllers/UpperwearController');

router.post('/addDummy', upperwearController.addDummyUpperwears);
router.get('/', upperwearController.getAllUpperwear); 
router.get('/filter', upperwearController.filterUpperwearBySleeveLength);
router.get('/:id', upperwearController.getUpperwearById);  

module.exports = router;
