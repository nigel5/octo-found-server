const router = require('express').Router();
const Item = require('../models/Item')

router.get('/all', function (req, res, next) {
    res.render('Something.....');
});
 
 // get all item
router.get('/', (req, res) => {
    Item.find() 
    .then( items => {
        res.status( 200 ).json( items )
      })
      .catch( err=> {
        res.status( 400 ).json( {err} )
      }) 
})

// get a item by ID
router.get('/:id', (req, res) => {
    Item.findById() 
    .then( item => {
        res.status( 200 ).json( item )
      })
      .catch( err=> {
        res.status( 400 ).json( {err} )
      }) 
})


 // create a item
 router.post('/new', (req, res) => { 
     console.log(req.body);
     Item.create(req.body) 
    .then(newItem => res.json(newItem) )
    .catch( err => res.json( {err} ) ) 
}) 
 // update a item
 router.put('/:id', (req, res) => { 
    Item.findOneAndUpdate({
       _id: req.params.id
   },req.body) 
    .then( item =>  res.json(item ))
    .catch( err => res.json( err)) 
    
})
 // get delete a item
 router.delete('/:id', (req, res) => { 
    Item.findById( { 
        _id: req.params.id
   }) 
    .then(item => item.remove())
    .catch( err =>  res.json( err ))  
})

 

module.exports = router;