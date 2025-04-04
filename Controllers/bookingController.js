import { bookingSchema } from '../Models/booking.js';
// import mongoose from 'mongoose';

export const getBooking = async (req, res) => {
    try {
        const { company_id } = req.params;
        console.log(company_id, 'company_id');
        if (!company_id) {
            return res.status(400).json({ message: 'Company ID is required' });
        }
        const booking = await bookingSchema.find({ company_id });
        console.log(booking, 'booking');
        const categoryCounts = await bookingSchema.aggregate([
            { $match: { company_id: company_id } },
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 } 
              }
            },
            {
              $project: {
                _id: 0,
                status: "$_id",
                count: 1
              }
            }
          ]);
        console.log(categoryCounts,'categorizedBookings');
        const bookingCount = booking.length;
        console.log(bookingCount, 'bookingCount');
        if (!booking || booking.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this company ID' });
        }
        res.status(200).json({
            totalBookingCount: bookingCount,
            categorizedBookings: categoryCounts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const totaltripvalue = async (req, res) => {
    try {
        const { company_id } = req.params;
        console.log(company_id, 'company_id');
        
        if (!company_id) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        // Find all bookings for the company
        const bookings = await bookingSchema.find({ company_id });

        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this company ID' });
        }

        // Aggregate total trip value
        const totalTripValue = await bookingSchema.aggregate([
            { $match: { company_id } },
            { $group: { _id: null, totalValue: { $sum: "$price" } } }
        ]);

        // Monthly breakdown
        const monthlyTripValue = await bookingSchema.aggregate([
            { $match: { company_id } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } }, // ✅ Group by month
                    totalValue: { $sum: "$price" }
                }
            },
            { $sort: { "_id.month": 1 } } // ✅ Sort from Jan to Dec
        ]);

        // Total booking count
        const totalBookingCount = bookings.length;

        // Calculate average trip value
        const averageTripValue = totalBookingCount > 0 ? (totalTripValue[0]?.totalValue / totalBookingCount) : 0;

        res.status(200).json({
            totalTripValue: totalTripValue[0]?.totalValue || 0,
            averageFareValue: averageTripValue || 0,
            monthlyBreakdown: monthlyTripValue.map(item => ({
                month: item._id.month, 
                totalValue: item.totalValue
            }))
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const vehicleType = async (req, res) => {
    try {
        const { company_id } = req.params;
        console.log(company_id, 'company_id');
        
        if (!company_id) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        // Check if bookings exist
        const bookings = await bookingSchema.find({ company_id });
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this company ID' });
        }

        // Aggregate vehicle type count (ignoring months)
        const vehicleTypeBreakdown = await bookingSchema.aggregate([
            { $match: { company_id } },
            {
                $group: {
                    _id: "$vehicle_type",
                    Value: { $sum: 1 }
                }
            }
        ]);

        // Formatting response
        const formattedResponse = vehicleTypeBreakdown.map(({ _id, Value }) => ({
            Name: _id,
            Value
        }));

        res.status(200).json(formattedResponse);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const price = async (req, res) => {
    try {
        const { company_id } = req.params;
        console.log(company_id, 'company_id');

        if (!company_id) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        // Check if bookings exist
        const bookings = await bookingSchema.find({ company_id });
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this company ID' });
        }

        // Aggregate total price based on status
        const priceBreakdown = await bookingSchema.aggregate([
            { $match: { company_id } },
            {
                $group: {
                    _id: "$status",
                    Value: { $sum: "$price" }
                }
            }
        ]);

        // Formatting response
        const formattedResponse = priceBreakdown.map(({ _id, Value }) => ({
            Status: _id,
            Value
        }));

        res.status(200).json(formattedResponse);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
