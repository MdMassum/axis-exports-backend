const express = require('express');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { createContact, getAllContact, deleteContact } = require('../controllers/contactController');
const router = express.Router();


// create contact --> Admin access
router.post('/contact/new',createContact)

// getting all contacts
router.get('/contacts',isAuthenticatedUser, authorizeRoles("admin"), getAllContact);

// delete the contact -- Admin
router.delete('/contact/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteContact);


module.exports = router