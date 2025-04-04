// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const booking = mongoose.Schema(
    {
        booking_id: { type: String, required: false },
        user_name: { type: String, required: false },
        vehicle_type: { type: String, required: false },
        estimated_fare: { type: String, required: false },
        price: { type: Number, required: false },
        phone: { type: String, required: true },
        date: { type: String, required: false },
        time: { type: String, required: false },
        company_id: {
            type: String,
            required: true,
        },
        createdAt: { type: Date, default: Date.now }
    }
);


export const bookingSchema  = mongoose.model('booking', booking);
