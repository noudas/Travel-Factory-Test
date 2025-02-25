function validateDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    if (start >= end) throw new Error('End date must be after start date');
    if (start < today.setHours(0, 0, 0, 0)) throw new Error('Start date must be in the future');
}

module.exports = { validateDates };
