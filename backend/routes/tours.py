from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId
from database import tours_collection, bookings_collection
from models import Tour, Booking, BookingCreate

router = APIRouter(prefix="/api/tours", tags=["tours"])


@router.get("/", response_model=List[Tour])
async def get_tours():
    """Get all tour packages"""
    try:
        tours = await tours_collection.find().to_list(1000)
        return [Tour(**tour) for tour in tours]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching tours: {str(e)}"
        )


@router.get("/{tour_id}", response_model=Tour)
async def get_tour(tour_id: str):
    """Get specific tour by ID"""
    try:
        if not ObjectId.is_valid(tour_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid tour ID format"
            )
        
        tour = await tours_collection.find_one({"_id": ObjectId(tour_id)})
        if not tour:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tour not found"
            )
        
        return Tour(**tour)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching tour: {str(e)}"
        )


@router.get("/category/{category}", response_model=List[Tour])
async def get_tours_by_category(category: str):
    """Get tours by category"""
    try:
        tours = await tours_collection.find({"category": category}).to_list(1000)
        return [Tour(**tour) for tour in tours]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching tours by category: {str(e)}"
        )


@router.post("/bookings", response_model=Booking)
async def create_booking(booking: BookingCreate):
    """Create a new tour booking"""
    try:
        # Verify tour exists
        if not ObjectId.is_valid(booking.tour_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid tour ID format"
            )
        
        tour = await tours_collection.find_one({"_id": ObjectId(booking.tour_id)})
        if not tour:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tour not found"
            )
        
        # Create booking
        booking_obj = Booking(**booking.dict())
        result = await bookings_collection.insert_one(booking_obj.dict(by_alias=True, exclude={"id"}))
        
        # Return created booking
        created_booking = await bookings_collection.find_one({"_id": result.inserted_id})
        return Booking(**created_booking)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating booking: {str(e)}"
        )


@router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    """Get specific booking by ID"""
    try:
        if not ObjectId.is_valid(booking_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid booking ID format"
            )
        
        booking = await bookings_collection.find_one({"_id": ObjectId(booking_id)})
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Booking not found"
            )
        
        return Booking(**booking)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching booking: {str(e)}"
        )