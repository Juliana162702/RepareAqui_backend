const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    resident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['vazamento_agua', 'vazamento_esgoto', 'falta_iluminacao', 'buraco_rua', 'lixo_inadequado', 'outros']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'pendente',
        enum: ['pendente', 'em_andamento', 'resolvido']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);