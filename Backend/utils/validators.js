// src/utils/validators.js
function validateDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
        throw new Error('End date must be after start date');
    }

    if (start < new Date()) {
        throw new Error('Start date must be in the future');
    }
}

module.exports = { validateDates };