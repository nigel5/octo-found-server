const router = require('express').Router();
const Item = require('../models/Item');
const rB = require('./responseBuilder');

router.get('/all', function (req, res) {
    res.render("There's nothing here.....");
});

// Fetch all items
router.get('/', (req, res) => {
    Item.find({status: {$ne: 'deleted'}})
        .then((items) => {
            res.status(200).json(Object.assign({}, items));
        })
        .catch((err) => {
            res.status(500).json({err: err});
        });
});

// Fetch item by id
router.get('/:id', (req, res) => {
    if (!req.params.id) return res.status(400);

    Item.findById(req.params.id)
        .then((item) => {
            // No item with this id
            if (!item) {
                return res.status(404).json({err: "Not found"});
            }

            res.status(200).json(item);
        })
        .catch((err) => {
            res.status(500).json({err: err});
        });
});

// Add new item
router.post('/new', (req, res) => {
    // Verify request
    if (!req.body.name || !req.body.comment || !req.body.status) {
        return res.status(400).json({err: 'Bad Request: Not enough information provided to fulfil request'});
    }

    // Use a cat placeholder if no image is provided
    if (!req.body.imageURL) {
      req.body.imageURL = `https://placekitten.com/200/${Math.floor(Math.random() * 10)}`
          +`${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
    }

    const payload = {
        name: req.body.name,
        comment: req.body.comment,
        imageURL: req.body.imageURL,
        status: req.body.status,
        dateAdded: req.body.dateAdded || Date.now()
    };

    Item.create(payload)
        .then((newItem) => {
            res.status(200).json(newItem)
        })
        .catch((err) => {
            res.status(500).json({err: err})
        });
});
// Update item by id
router.put('/:id', (req, res) => {
    if (!req.params.id) return res.status(400);
    // Verify request has at least one param to update otherwise just return original
    if (req.body.name || req.body.comment || req.body.imageURL || req.body.status) {
        Item.findOneAndUpdate({_id: req.params.id}, req.body)
            .then((item) => {
                res.status(200).json(item);
            })
            .catch((err) => {
                res.status(500).json({err: err});
            })
    } else {
        Item.findById(req.params.id)
            .then((item) => {
                // No item with this id
                if (!item) {
                    return res.status(404).json({err: "Not found"});
                }

                res.status(200).json(item);
            })
            .catch((err) => {
                res.status(500).json({err: err});
            })
    }
});
// Delete item by id (The item is not actually deleted, it it only marked as deleted)
router.delete('/:id', (req, res) => {
    if (!req.params.id) return res.status(400);

    Item.findOneAndUpdate({_id: req.params.id}, {status: "deleted"})
        .then((item) => {
            res.status(200).json(item);
        })
        .catch((err) => {
            res.status(500).json({err: err});
        })

    //  Item.findById( {
    //      _id: req.params.id
    // })
    //  .then((item) => {
    //    // item.remove()
    //  })
    //  .catch((err) => {
    //    res.json({err: err})
    //  })
})


module.exports = router;
