const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');
const Complaint = require('../models/Complaint');

// Criar um novo morador (com ou sem reclamações)
router.post('/', async (req, res) => {
    try {
        const { name, neighborhood, complaints } = req.body;
        
        const resident = new Resident({ name, neighborhood });
        await resident.save();
        
        if (complaints && complaints.length > 0) {
            const complaintsToAdd = complaints.map(complaint => ({
                ...complaint,
                resident: resident._id
            }));
            await Complaint.insertMany(complaintsToAdd);
        }
        
        const populatedResident = await Resident.findById(resident._id)
            .populate('complaints');
            
        res.status(201).json(populatedResident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST /residents/addComplaint
router.post('/addComplaint', async (req, res) => {
    try {
        const { name, neighborhood, complaint } = req.body;

        let resident = await Resident.findOne({ name, neighborhood });

        if (!resident) {
            resident = new Resident({ name, neighborhood });
            await resident.save();
        }

        const newComplaint = new Complaint({ ...complaint, resident: resident._id });
        await newComplaint.save();

        resident.complaints.push(newComplaint._id);
        await resident.save();

        res.status(201).json({ message: 'Reclamação adicionada', resident });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar todos os moradores com reclamações populadas
router.get('/', async (req, res) => {
    try {
        const residents = await Resident.find().populate('complaints');
        res.json(residents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Adicionar reclamação a um morador existente
router.post('/:residentId/complaints', async (req, res) => {
    try {
        const { type, description, location } = req.body;
        
        const complaint = new Complaint({
            resident: req.params.residentId,
            type,
            description,
            location
        });
        
        await complaint.save();
        
        // Atualiza o morador com a nova reclamação
        await Resident.findByIdAndUpdate(
            req.params.residentId,
            { $push: { complaints: complaint._id } },
            { new: true }
        );
        
        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar uma reclamação específica
router.put('/:residentId/complaints/:complaintId', async (req, res) => {
    try {
        const { type, description, location, status } = req.body;
        
        const updatedComplaint = await Complaint.findOneAndUpdate(
            { 
                _id: req.params.complaintId,
                resident: req.params.residentId 
            },
            { type, description, location, status },
            { new: true }
        );
        
        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Reclamação não encontrada' });
        }
        
        res.json(updatedComplaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remover uma reclamação
router.delete('/:residentId/complaints/:complaintId', async (req, res) => {
    try {
        // Remove a reclamação
        const complaint = await Complaint.findOneAndDelete({
            _id: req.params.complaintId,
            resident: req.params.residentId
        });
        
        if (!complaint) {
            return res.status(404).json({ message: 'Reclamação não encontrada' });
        }
        
        // Remove a referência no morador
        await Resident.findByIdAndUpdate(
            req.params.residentId,
            { $pull: { complaints: req.params.complaintId } }
        );
        
        res.json({ message: 'Reclamação removida com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deletar um morador por ID
router.delete('/:residentId', async (req, res) => {
    try {
        // Primeiro, remove todas as reclamações associadas ao morador
        await Complaint.deleteMany({ resident: req.params.residentId });

        // Depois, remove o morador em si
        const deletedResident = await Resident.findByIdAndDelete(req.params.residentId);

        if (!deletedResident) {
            return res.status(404).json({ message: 'Morador não encontrado' });
        }

        res.json({ message: 'Morador e suas reclamações foram removidos com sucesso' });
    } catch (error) {
        console.error('Erro ao remover morador:', error);
        res.status(500).json({ message: 'Erro ao remover morador' });
    }
});

module.exports = router;

