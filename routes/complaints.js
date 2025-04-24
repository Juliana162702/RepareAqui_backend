const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const Resident = require('../models/Resident');

// Criar uma nova reclamação
router.post('/', async (req, res) => {
    try {
        const { residentId, type, description, location } = req.body;

        // Verifica se o morador existe
        const resident = await Resident.findById(residentId);
        if (!resident) {
            return res.status(404).json({ message: 'Morador não encontrado' });
        }

        // Cria a reclamação
        const complaint = new Complaint({
            resident: residentId,
            type,
            description,
            location
        });

        await complaint.save();

        res.status(201).json(complaint);
    } catch (error) {
        console.error('Erro ao criar reclamação:', error);
        res.status(400).json({ message: 'Erro ao criar reclamação' });
    }
});

// Listar todas as reclamações com dados do morador
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('resident');
        res.status(200).json(complaints);
    } catch (error) {
        console.error('Erro ao listar reclamações:', error);
        res.status(500).json({ message: 'Erro ao listar reclamações' });
    }
});

// Buscar reclamação específica por ID
router.get('/:complaintId', async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.complaintId).populate('resident');
        if (!complaint) {
            return res.status(404).json({ message: 'Reclamação não encontrada' });
        }
        res.json(complaint);
    } catch (error) {
        console.error('Erro ao buscar reclamação:', error);
        res.status(500).json({ message: 'Erro ao buscar reclamação' });
    }
});

// Atualizar status ou informações de uma reclamação
router.put('/:complaintId', async (req, res) => {
    try {
        const { type, description, location, status } = req.body;

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.complaintId,
            { type, description, location, status },
            { new: true }
        ).populate('resident');

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Reclamação não encontrada' });
        }

        res.json(updatedComplaint);
    } catch (error) {
        console.error('Erro ao atualizar reclamação:', error);
        res.status(400).json({ message: 'Erro ao atualizar reclamação' });
    }
});

// Deletar uma reclamação
router.delete('/:complaintId', async (req, res) => {
    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.complaintId);

        if (!deletedComplaint) {
            return res.status(404).json({ message: 'Reclamação não encontrada' });
        }

        res.json({ message: 'Reclamação removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover reclamação:', error);
        res.status(500).json({ message: 'Erro ao remover reclamação' });
    }
});

module.exports = router;
