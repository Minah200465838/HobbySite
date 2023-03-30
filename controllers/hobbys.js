const express = require('express');
const router = express.Router();

// use Hobby model for CRUD w/mongoose
const Hobby = require('../models/hobby');
const Category = require('../models/category');
// global auth check to make most methods private
const global = require('../controllers/globalFunctions');
// multer
const multer = require('multer');
const _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
const upload = multer({ storage: _storage });

/** GET hobby index */
router.get('/myhobby', (req, res) => {

     //** get data from mongodb using the hobby model ** -> cause errors..//
   Hobby.find((err, hobby) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(hobby);
            res.render('hobby/myhobby', {
                title: 'Hobby List',
                hobby: hobby,
                user: req.user
            });
        
        }
    });
   
});

router.get('/recommendation', (req, res) => {
    res.render('hobby/recommendation', {
        title: 'recommendation'
    });
});

//* multer */
// GET / upload- multer 
router.get('/upload', (req, res) => {
    res.render('hobby/upload', {
        title: 'upload'
    });
});

// POST / upload-multer
router.post('/upload', upload.single('userfile'), (req, res) => {
    res.send('Uploaded : '+req.file.filename);
    console.log(req.file); 
}); 
 // * multer end */

// GET /create - display form to add an hobby */
// injected our auth check function as middleware for security
router.get('/create', global.isAuthenticated, (req, res) => {
    // use Category model to fetch list of categories from db to populate category dropdown
    Category.find((err, categories) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('hobby/create', {
                categories: categories,
                title: "Create a New Hobby you've done",
                user: req.user
            });
        }
    }).sort('name');    
});

// POST /create - 
router.post('/create', global.isAuthenticated, (req, res) => {
    Hobby.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/hobby/myhobby');
        }
    });
});

/* GET /delete/abc123 => delete selected employer document using the url param.  : indicates param */
router.get('/delete/:_id', global.isAuthenticated, (req, res) => {
    Hobby.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/hobby/myhobby');
        }
    });
});

/* GET /edit/abc123 => fetch & display selected employer */
router.get('/edit/:_id', global.isAuthenticated, (req, res) => {
    Hobby.findById(req.params._id, (err, hobby) => {
        if (err) {
            console.log(err);
        }
        else {
            Category.find((err, categories) => {
                if (err) {
                    console.log(err);
                }
                else {
                     res.render('hobby/edit', {
                        hobby: hobby,
                        title: 'Edit hobby Details',
                        categories: categories,
                        user: req.user
                    });
                }
            }).sort('name');               
        }
    });
});

/* POST /edit/abc123 => update seleted employer */
router.post('/edit/:_id', global.isAuthenticated, (req, res) => {
    Hobby.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/hobby/myhobby');
        }
    });
});


// make public
module.exports = router;