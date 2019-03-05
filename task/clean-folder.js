const del = require('del');

module.exports.cleanWordSpace = (folders) => {
    return async () => {
        await del(folders).then((path) => {
            path.forEach(file => {
                console.log('delete the folder : ' + file)
            })
        })
    }
}