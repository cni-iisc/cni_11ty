module.exports = function() {
return {
    currentYear: new Date().getFullYear(),
    // get date in format like September 1, 2021
    lastModifiedDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }),
    // get currentTimeStamp in format like 2024-12-23 17:00:00
    currentTimeStamp: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }),

    };
};