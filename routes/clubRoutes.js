// Libraries
const express = require('express');
const router = express.Router();

// Controllers
const { 
    createClubController, 
    getAllClubsController, 
    getClubByIdController, 
    getClubByDirectorController, 
    acceptDeclineRequestController,
    getRequestByClubController,
    editClubController,
    requestJoinClubController
} = require('../controllers/club-controller');
// Middlewares - validators
const { authorizationValidator, playerAuthorizationValidator } = require('../middleware/validators/auth-validator');
const { createClubValidator, editClubValidator } = require('../middleware/validators/club-validator');
const handleValidationResult = require('../middleware/handleValidationErrors');
// Utils
const { errorResponse, successResponse } = require('../utils/response-utils');


// Obtener todos los clubes
router.get('/', [
    authorizationValidator('getAllClub'),
    handleValidationResult
], getAllClubsController)

// Obtener club por Id
router.get('/:id',[
    authorizationValidator('getClub'),
    handleValidationResult
], getClubByIdController)

// Crear un club nuevo
router.post('/', [
    authorizationValidator('createClub'),
    createClubValidator,
    handleValidationResult
], createClubController);

// editar club
router.put('/:id', [
    authorizationValidator('editClub'),
    editClubValidator,
    handleValidationResult
], editClubController);

// Solicitar unirse a un club
router.post('/:clubId/join', [
    playerAuthorizationValidator,
    handleValidationResult
], requestJoinClubController);

// Obtener el club de un director
router.get('/:userId/club', [
    authorizationValidator('getClub'),
    handleValidationResult
], getClubByDirectorController);

// Aceptar o denegar solicitud de un jugador
router.post('/:clubId/requests/:playerId', acceptDeclineRequestController);

// Obtener las solicitudes pendientes de un club
router.get('/:clubId/solicitudes', getRequestByClubController);


module.exports = router;
