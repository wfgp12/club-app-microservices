const { default: axios } = require("axios");
const { header } = require("express-validator");

module.exports = {
    authorizationValidator: (permission) => [
        header('Authorization')
            .exists().withMessage('Token de sesión requerido en los headers').bail()
            .custom(async (token, { req }) => {
                try {
                    const { data } = await axios.post('http://localhost:3000/api/permissions/validatePermission', {
                        permission
                    }, {
                        headers: {
                            'Authorization': token
                        }
                    });
                    req.body.directorId = data.data._id
                } catch (error) {
                    throw new Error(error.response.data.error.message)
                }
            })
    ],
    playerAuthorizationValidator: [
        header('Authorization')
            .exists().withMessage('Token de sesión requerido en los headers').bail()
            .custom(async (token, { req }) => {
                try {
                    const { data } = await axios.get('http://localhost:3030/api/players', {
                        headers: {
                            'Authorization': token
                        }
                    });
                    
                    req.body.playerId = data.data.id
                } catch (error) {
                    throw new Error(error.response.data.error.message)
                }
            })
    ]
}