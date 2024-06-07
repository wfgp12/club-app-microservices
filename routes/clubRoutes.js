const express = require('express');
const router = express.Router();
const Club = require('../models/club');
const Solicitud = require('../models/Solicitud');
const axios = require('axios'); // Para realizar peticiones HTTP al servicio de jugadores
const { errorResponse, successResponse } = require('../utils/response-utils');

// Obtener todos los clubes
router.get('/', async (req, res) => {
    try {
        const clubs = await Club.findAll({ include: 'solicitudes', attributes:{exclude: ['createdAt', 'updatedAt']}});
        res.json(successResponse(clubs));
    } catch (error) {
        res.status(500).json(errorResponse(error.message, 500));
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, ciudad, director } = req.body;
        const club = await Club.create({ nombre, ciudad, director });

        res.status(201).json(successResponse(club));
    } catch (error) {
        res.status(500).json(errorResponse({ message: error.message }));
    }
});

// Solicitar unirse a un club
router.post('/:clubId/join', async (req, res) => {
    const token = req.headers.authorization;
    try {
        const { status, data } = await axios.get('http://localhost:3030/api/players', {
            headers: {
                'Authorization': token
            }
        });

        const club = await Club.findByPk(req.params.clubId);
        

        if (!club) {
            return res.status(404).json(errorResponse("Club no encontrado", 404));
        }

        // Crear una nueva solicitud
        const solicitud = await Solicitud.create({ playerId:data.data.id, ClubId: club.id });

        res.status(201).json(successResponse(solicitud));
    } catch (error) {
        console.log(error.message);
        res.status(500).json(errorResponse(error.message, 500));
    }
});

// Obtener el club al que pertenece un director
router.get('/:userId/club', async (req, res) => {
    try {
        const director = req.params.userId;
        
        const club = await  Club.findOne({
            where: {director}
        })
        res.json(successResponse(club));
    } catch (error) {
        res.status(500).json(errorResponse(error.message, 500));
    }
});

// Aceptar o denegar solicitud de un jugador
router.post('/:clubId/requests/:playerId', async (req, res) => {
    try {
        const club = await Club.findByPk(req.params.clubId);

        if (!club) {
            return res.status(404).json(errorResponse("Club no encontrado", 404));
        }

        const playerId = req.params.playerId;
        const solicitud = await Solicitud.findOne({ where: { playerId, ClubId: club.id } });

        if (!solicitud) {
            return res.status(404).json(errorResponse("Solicitud no encontrada", 404));
        }


        // Eliminar solicitud
        await solicitud.destroy();

        // Actualizar la ficha del jugador si se acepta
        if (req.body.accepted) {
            // Llamar al servicio de jugadores para actualizar la ficha
            await axios.put(`http://localhost:3030/api/players/${playerId}/club`, { clubId: club.id });
        }

        res.json(successResponse({ message: "Solicitud procesada exitosamente" }));
    } catch (error) {
        res.status(500).json(errorResponse(error.message, 500));
    }
});

// Obtener las solicitudes pendientes de un club
router.get('/:clubId/solicitudes', async (req, res) => {
    try {
        const clubId = req.params.clubId;

        // Buscar el club
        const club = await Club.findByPk(clubId, {
            include: { model: Solicitud, as: 'solicitudes', attributes: {exclude:['updatedAt', 'createdAt', ]} },
        });

        if (!club) {
            return res.status(404).json({ message: "Club no encontrado" });
        }

        // Obtener las solicitudes del club
        const solicitudes = club.solicitudes;
        // Obtener la información de los jugadores desde el microservicio de jugadores
        const solicitudesConDetalles = await Promise.all(solicitudes.map(async (solicitud) => {
            const response = await axios.get(`http://localhost:3030/api/players/${solicitud.playerId}`);
            return { ...response.data.data};
        }));

        res.json(successResponse(solicitudesConDetalles));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
