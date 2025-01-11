/**
 * filewatchHandler handles file change event handling
 * param {string} - event type Eg: `add`, `change`, `unlink`
 * param {string} - file name that triggered the event
 *
*/
const filewatchHandler = (event, path) => {
    switch (event) {
        case 'add':
            console.log(`file: ${path} was added`)
            break;
        case 'unlink':
            console.log(`file: ${path} was removed`)
            break;
        case 'change':
            console.log(`file: ${path} was modified`)
            break;
    }
}

module.exports = {
    filewatchHandler
}
