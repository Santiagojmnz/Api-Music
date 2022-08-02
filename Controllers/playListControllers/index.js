const { playListRegister } = require('./register');

const { deletePlayList, updatePList} = require('./updateAndDelete');

module.exports = {
    playListRegister,
    updatePList,
    deletePlayList
}