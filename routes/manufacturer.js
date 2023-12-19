var express = require('express');
var router = express.Router();
var ManufacturerModel = require('../models/ManufacturerModel');
var ToyModel = require('../models/ToyModel');

router.get('/', async (req, res) => {
   var brands = await ManufacturerModel.find({});
   res.render('manufacturer/index', { brands });
})

router.get('/add', (req, res) => {
   res.render('manufacturer/add');
})

router.post('/add', async (req, res) => {
   var manufacturer = req.body;
   await ManufacturerModel.create(manufacturer);
   res.redirect('/manufacturer');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM mobiles WHERE manufacturer = "id"
   var mobiles = await ToyModel.find({ manufacturer : id }).populate('manufacturer');
   res.render('manufacturer/detail', { mobiles })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //cách 1
   try {
      //SQL: DELETE FROM brands WHERE manufacturer = id
      await ManufacturerModel.findByIdAndDelete(id);
      console.log('Delete manufacturer succeed !');
   } catch (err) {
      console.log('Delete manufacturer fail. Error: ' + err);
   };

   //cách 2
   var manufacturer = await ManufacturerModel.findById(id);
   await ManufacturerModel.deleteOne(manufacturer);

   res.redirect('/manufacturer');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM brands
   //     TRUNCATE TABLE brands
   await ManufacturerModel.deleteMany();
   console.log('Delete all manufacturer succeed !');
   res.redirect('/manufacturer');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var manufacturer = await ManufacturerModel.findById(id);
   res.render('manufacturer/edit', { manufacturer });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var manufacturer = req.body;
   try {
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await ManufacturerModel.findByIdAndUpdate(id, manufacturer);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/manufacturer');
})

module.exports = router;