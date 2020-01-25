/* What do I want my server to do? 
    count users
    count deleted songs
    count found songs
*/

const db = require('../db/config');
const canceldatabase = {};
console.log(db)


canceldatabase.allUsers = () => {
  return db.query(`
    SELECT * FROM users
    `);
};

canceldatabase.addUser = user => {
  return db.one(
    `
    INSERT INTO users
    (display_name, email, country, time, songs)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [user.display_name, user.email, user.country, user.time, user.songs]
  );
};

canceldatabase.countUniqueUsers = async (req, res, db) => {
  try {
    const uniqueUsers = await db.one(`
    SELECT COUNT (DISTINCT display_name)
    FROM users
    `);
    console.log(uniqueUsers);
    return uniqueUsers;
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

canceldatabase.addSong = song => {
  console.log('this is song', song);
  return db.one(
    `
    INSERT INTO songs
    (name, artist, deleted)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [song.name, song.artist, song.deleted]
  );
};

canceldatabase.countDeletedSongs = async () => {
  try {
    const deletedSongs = await db.one(`
    SELECT COUNT(1) FROM songs
    WHERE deleted = true
    `);
    console.log(deletedSongs);
    return deletedSongs;
  } catch (error) {
    console.log({error});
    res.send({error}, "it's not you, it's me ");
  }
};

canceldatabase.updateSong = id => {
  console.log(id);
  return db.one(
    `
    UPDATE songs 
    SET deleted = TRUE
    WHERE id = $1
    `,
    [id]
  );
};

module.exports = canceldatabase;
