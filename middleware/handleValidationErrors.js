const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response-utils');

const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json(errorResponse(errors.errors[0].msg, 400));
    }
    next();
};

module.exports = handleValidationResult;