import express from 'express';
// import bookingSchema from '../Models/bookingModel.js';
import { bookingSchema } from '../Models/booking.js';
import { getBooking, price, totaltripvalue, vehicleType } from '../Controllers/bookingController.js';
const router = express.Router()

router.get('/service/:company_id', getBooking )
// router.post('/create', async (req, res) => {
//     try {
//         const { booking_id, user_name, vehicle_type, estimated_fare, price, phone, date, time, company_id } = req.body;
//         console.log(req.body);
//         if (!company_id) {
//             return res.status(400).json({ message: 'Company ID is required' });
//         }
//         const booking = await bookingSchema.create({
//             booking_id,
//             user_name,
//             vehicle_type,
//             estimated_fare,
//             price,
//             phone,
//             date,
//             time,
//             company_id
//         });
//         res.status(201).json(booking);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
router.get('/totaltripvalue/:company_id',totaltripvalue)
router.get('/vehicletype/:company_id',vehicleType)
router.get('/price/:company_id', price)
export default router;