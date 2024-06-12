const { check } = require("express-validator");
const Club = require("../../models/club");

module.exports = {
    createClubValidator: [
        check('name')
            .notEmpty().withMessage('Name is required').bail()
            .isString().withMessage('Name must be a string').bail()
            .custom(async (name) => {
                const existingClub = await Club.findOne({ where: { name } });
                if (existingClub) {
                    throw new Error("The team name is already in use");
                }
            }),
        check('address')
            .notEmpty().withMessage('Address is required').bail()
            .isString().withMessage('Address must be a string').bail(),
        check('phone')
            .notEmpty().withMessage('Phone is required').bail()
            .matches(/^\d{10}$/).withMessage('Phone must be a valid 10-digit number').bail()
            .custom(async (phone) => {
                const existingClub = await Club.findOne({ where: { phone } });
                if (existingClub) {
                    throw new Error("The team phone is already in use");
                }
            }),
        check('city')
            .notEmpty().withMessage('City is required').bail()
            .isString().withMessage('City must be a string').bail(),
        check('stadium')
            .notEmpty().withMessage('State is required').bail()
            .isString().withMessage('State must be a string').bail(),
        check('country')
            .notEmpty().withMessage('Country is required').bail()
            .isString().withMessage('Country must be a string').bail(),
        check('directorId')
            .notEmpty().withMessage('directorId is required').bail()
            .isString().withMessage('directorId must be a string').bail()
            .custom(async (directorId) => {
                const existingClub = await Club.findOne({ where: { directorId } });
                if (existingClub) {
                    throw new Error("User already has a club registered");
                }
            }),
    ],
    editClubValidator: [
        check('name').optional()
            .notEmpty().withMessage('Name is required').bail()
            .isString().withMessage('Name must be a string').bail()
            .custom(async (name) => {
                const existingClub = await Club.findOne({ where: { name } });
                if (existingClub) {
                    throw new Error("The team name is already in use");
                }
            }),
        check('address').optional()
            .notEmpty().withMessage('Address is required').bail()
            .isString().withMessage('Address must be a string').bail(),
        check('phone').optional()
            .notEmpty().withMessage('Phone is required').bail()
            .matches(/^\d{10}$/).withMessage('Phone must be a valid 10-digit number').bail()
            .custom(async (phone) => {
                const existingClub = await Club.findOne({ where: { phone } });
                if (existingClub) {
                    throw new Error("The team phone is already in use");
                }
            }),
        check('city').optional()
            .notEmpty().withMessage('City is required').bail()
            .isString().withMessage('City must be a string').bail(),
        check('stadium').optional()
            .notEmpty().withMessage('State is required').bail()
            .isString().withMessage('State must be a string').bail(),
        check('country').optional()
            .notEmpty().withMessage('Country is required').bail()
            .isString().withMessage('Country must be a string').bail(),
    ],
}