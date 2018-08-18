// this is service where all the error catching will be store
//
// example: if got try and catch can have error log message and object that return in current process.
//
// the parameter are error text (needed) and object (optional)

exports.errorLog = function (text, obj = null) {
    console.log(text, obj);
};
