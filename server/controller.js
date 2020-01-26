const canceldatabase = require('./model');
const cancelController = {};
console.log('this is the cancel', canceldatabase);

//Count deleted Songs
cancelController.countDeletedSongs = (req, res) => {
  canceldatabase
    .countDeletedSongs()
    .then(data => {
      res.json({
        message: 'counting number of deleted songs',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

//count unique users to update usage stats
cancelController.countUniqueUsers = async (req, res) => {
  try {
    let users = await canceldatabase.countUniqueUsers();
    users = await users.json();
    users.send('all users here');
    return users;
  } catch (error) {
    res.status(500).res.send('controller situation , unique users');
  }
};

//Add Songs to Datbase
cancelController.addSong = (req, res) => {
  console.log('addSong');
  canceldatabase
    .addSong(req.body)
    .then(data => {
      res.json({
        message: 'counting this song',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
//Change delted from false to true
cancelController.updateSong = (req, res) => {
  canceldatabase
    .updateSong(req.params.id)
    .then(data => {
      res.json({
        message: ' song was changed to deleted ',
        data,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

//Get All Users
cancelController.allUsers = (req, res) => {
  canceldatabase
    .allUsers()
    .then(data => {
      res.json({
        message: 'all users here',
        data,
      });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
};

//Add User to Database
cancelController.addUser = (req, res) => {
  canceldatabase
    .addUser(req.body)
    .then(data => {
      res.json({
        message: 'added user',
        data,
      });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
};
module.exports = cancelController;
