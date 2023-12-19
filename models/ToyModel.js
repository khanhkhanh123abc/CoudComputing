const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
    ToyID: {
        type: String,
        required: [true, 'ToyID is required'],
        unique: true
    },
    Name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name should not be more than 100 characters']
    },
    Type: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['Action Figure', 'Puzzle', 'Doll', 'Educational', 'Other']
    },
    AgeGroup: {
        type: String,
        required: [true, 'Age Group is required'],
        match: [/^\d+-\d+ years$/, 'Age Group should be in the format "x-y years"']
    },
    ImageURL: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/\.(jpeg|jpg|gif|png)$/, 'Image URL must be a valid image file']
    },
    ManufacturerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: [true, 'ManufacturerID is required']
    }
});

module.exports = mongoose.model('Toys', toySchema);
