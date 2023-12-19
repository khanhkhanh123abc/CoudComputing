const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    ManufacturerID: {
        type: String,
        required: [true, 'ManufacturerID is required'],
        unique: true
    },
    Name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name should not be more than 100 characters']
    },
    Location: {
        type: String,
        required: [true, 'Location is required']
    },
    ContactInfo: {
        type: String,
        required: [true, 'Contact Info is required']
        // You can add more specific validation for phone or email if needed
    },
    LogoURL: {
        type: String,
        required: [true, 'Logo URL is required'],
        match: [/\.(jpeg|jpg|gif|png)$/, 'Logo URL must be a valid image file']
    }
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
