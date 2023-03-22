const express = require('express');
const router = express.Router();

/** GET hobby index */
router.get('/myhobby', (req, res) => {
    res.render('hobby/myhobby', {
        title: 'myhobby'
    });
});

router.get('/recommendation', (req, res) => {
    res.render('hobby/recommendation', {
        title: 'recommendation'
    });
});





// make public
module.exports = router;