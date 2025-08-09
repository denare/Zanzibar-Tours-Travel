from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId
from database import vehicles_collection, transfers_collection
from models import Vehicle, TransferBooking, TransferBookingCreate

router = APIRouter(prefix="/api/transfers", tags=["transfers"])


@router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles():
    """Get all available transfer vehicles"""
    try:
        vehicles = await vehicles_collection.find({"available": True}).to_list(1000)
        return [Vehicle(**vehicle) for vehicle in vehicles]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching vehicles: {str(e)}"
        )


@router.post("/bookings", response_model=TransferBooking)
async def create_transfer_booking(booking: TransferBookingCreate):
    """Create a new transfer booking"""
    try:
        # Verify vehicle type exists
        vehicle = await vehicles_collection.find_one({"type": booking.vehicle_type, "available": True})
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle type not found or not available"
            )
        
        # Check capacity
        vehicle_obj = Vehicle(**vehicle)
        if booking.passengers > vehicle_obj.capacity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Vehicle capacity exceeded. Maximum passengers: {vehicle_obj.capacity}"
            )
        
        # Create booking
        booking_obj = TransferBooking(**booking.dict())
        result = await transfers_collection.insert_one(booking_obj.dict(by_alias=True, exclude={"id"}))
        
        # Return created booking
        created_booking = await transfers_collection.find_one({"_id": result.inserted_id})
        return TransferBooking(**created_booking)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating transfer booking: {str(e)}"
        )


@router.get("/bookings/{booking_id}", response_model=TransferBooking)
async def get_transfer_booking(booking_id: str):
    """Get specific transfer booking by ID"""
    try:
        if not ObjectId.is_valid(booking_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid booking ID format"
            )
        
        booking = await transfers_collection.find_one({"_id": ObjectId(booking_id)})
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transfer booking not found"
            )
        
        return TransferBooking(**booking)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching transfer booking: {str(e)}"
        )


@router.get("/bookings", response_model=List[TransferBooking])
async def get_transfer_bookings():
    """Get all transfer bookings (admin endpoint)"""
    try:
        bookings = await transfers_collection.find().sort("created_at", -1).to_list(1000)
        return [TransferBooking(**booking) for booking in bookings]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching transfer bookings: {str(e)}"
        )


@router.put("/bookings/{booking_id}/status")
async def update_transfer_status(booking_id: str, status: str):
    """Update transfer booking status"""
    try:
        if not ObjectId.is_valid(booking_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid booking ID format"
            )
        
        if status not in ["pending", "confirmed", "completed", "cancelled"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Status must be one of: pending, confirmed, completed, cancelled"
            )
        
        result = await transfers_collection.update_one(
            {"_id": ObjectId(booking_id)},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transfer booking not found"
            )
        
        return {"message": "Transfer booking status updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating transfer status: {str(e)}"
        )