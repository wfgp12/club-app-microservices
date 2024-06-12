// Schemas
const { default: axios } = require("axios");
const Club = require("../models/club");
const Solicitud = require("../models/Solicitud");
// Utils
const { errorResponse, successResponse } = require("../utils/response-utils");

module.exports = {
    createClubController: async (req, res) => {
        const { name, address, phone, city, stadium, country, directorId } = req.body;
        try {
            const club = await Club.create({ name, address, phone, city, stadium, country, directorId });

            res.status(201).json(successResponse(club));
        } catch (error) {
            res.status(500).json(errorResponse({ message: error.message }));
        }
    },
    editClubController: async (req, res) => {
        const { name, address, phone, city, stadium, country } = req.body;
        try {

            const club = await Club.findByPk(req.params.id);
            if (!club) {
                return res.status(404).json(errorResponse('Club no encontrado', 404));
            }

            // Actualizar los campos del club
            if (name) club.name = name;
            if (address) club.address = address;
            if (phone) club.phone = phone;
            if (city) club.city = city;
            if (stadium) club.stadium = stadium;
            if (country) club.country = country;

            // Guardar los cambios en la base de datos
            await club.save();

            res.status(200).json(successResponse(club));
        } catch (error) {
            res.status(500).json(errorResponse({ message: error.message }));
        }
    },
    getAllClubsController: async (_req, res) => {
        try {
            const clubs = await Club.findAll({ include: 'solicitudes', attributes: { exclude: ['createdAt', 'updatedAt'] } });
            res.json(successResponse(clubs));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getClubByIdController: async (req, res) => {
        const { id } = req.params;
        try {
            const clubs = await Club.findByPk(id, { attributes: { exclude: ['solicitudes'] } });
            res.json(successResponse(clubs));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getClubByDirectorController: async (req, res) => {
        try {
            const directorId = req.params.userId;
            
            const club = await Club.findOne({
                where: { directorId }
            })
            res.json(successResponse(club));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    acceptDeclineRequestController: async (req, res) => {
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

            await solicitud.destroy();

            if (req.body.accepted) {
                await axios.put(`http://localhost:3030/api/players/${playerId}/club`, { clubId: club.id });
            }

            res.json(successResponse({ message: "Solicitud procesada exitosamente" }));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getRequestByClubController: async (req, res) => {
        try {
            const clubId = req.params.clubId;
            const club = await Club.findByPk(clubId, {
                include: {
                    model: Solicitud, as: 'solicitudes',
                    attributes: { exclude: ['updatedAt', 'createdAt',] }
                },
            });

            if (!club) return res.status(404).json(errorResponse("Club no encontrado"));

            const solicitudes = club.solicitudes;
            const solicitudesConDetalles = await Promise.all(solicitudes.map(async (solicitud) => {
                const response = await axios.get(`http://localhost:3030/api/players/${solicitud.playerId}`);
                return { ...response.data.data };
            }));

            res.json(successResponse(solicitudesConDetalles));
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    requestJoinClubController: async (req, res) => {
        try {
            const club = await Club.findByPk(req.params.clubId);
            if (!club) return res.status(404).json(errorResponse("Club no encontrado", 404));

            const solicitud = await Solicitud.create({ playerId: req.body.playerId, ClubId: club.id });

            res.status(201).json(successResponse(solicitud));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
}