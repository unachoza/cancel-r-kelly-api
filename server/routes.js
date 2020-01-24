const express = require('express')
const router = express.Router()

const cancelController = require('./controller.js')
console.log("this is cancelController", cancelController)

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
    
    next();
  });
  

router.get('/', cancelController.allUsers)
router.post('/users', cancelController.addUser)
router.post('/songs/', cancelController.addSong)
router.get('/deletedsongs', cancelController.countDeletedSongs)
router.put('/songs/:id', cancelController.updateSong)
router.get('/users/unique', cancelController.countUniqueUsers)

module.exports = router