const canceldatabase = require('./model')
const cancelController = {}
console.log("this is the cancel", canceldatabase)


//Get All Users
cancelController.allUsers = (req, res) => {
    canceldatabase.allUsers()
    .then(data => {
        res.json({
            message: 'all users here',
            data: data
        })
    })
    .catch(err => {
        res.status(500).json({err})
    })
}

//Add User to Database
cancelController.addUser = (req, res) => {
    canceldatabase.addUser(req.body) 
    .then(data => {
        res.json({
            message: "added user",
            data: data
        })
    }) 
    .catch(err => {
        res.status(500).json({err})
    })
}

//Add Songs to Datbase
cancelController.addSong = (req, res) => {
    console.log("addSong")
    canceldatabase.addSong(req.body)
    .then(data => {
        res.json({
            message: "counting this song",
            data: data
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

//Count deleted Songs
cancelController.countDeletedSongs = (req, res) => {
    canceldatabase.countDeletedSongs()
    .then(data => {
        res.json({
            message: "counting number of deleted songs",
            data: data
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
    
    
}

//Change delted from false to true
cancelController.updateSong = (req, res) => {
    canceldatabase.updateSong(req.params.id)
    .then(data => {
        res.json({
            message: " song was changed to deleted ",
            data: data
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

cancelController.countUniqueUsers = (req,res) => {
    canceldatabase.countUniqueUsers()
    .then(data => {
        res.json({
            message: 'all users here',
            data: data
        })
    })
        .catch(err => {
        res.status(500).res.send({err},"controller situation , unique users" )
    })
}

module.exports = cancelController 