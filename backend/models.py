from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Any
from datetime import datetime, date, time
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, handler=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod 
    def __get_pydantic_json_schema__(cls, _source_type: Any, _handler) -> dict:
        return {"type": "string"}


# Tour Models
class Tour(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: str
    image: str
    price: float
    duration: str
    category: str  # water, cultural, nature, safari
    features: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class TourCreate(BaseModel):
    title: str
    description: str
    image: str
    price: float
    duration: str
    category: str
    features: List[str] = []


# Booking Models
class Booking(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    tour_id: str
    customer_name: str
    email: EmailStr
    phone: str
    booking_date: date
    guests: int
    special_requests: Optional[str] = ""
    status: str = "pending"  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class BookingCreate(BaseModel):
    tour_id: str
    customer_name: str
    email: EmailStr
    phone: str
    booking_date: date
    guests: int
    special_requests: Optional[str] = ""


# Contact Models
class Contact(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str
    status: str = "new"  # new, replied, closed
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str


# Transfer Models
class Vehicle(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    type: str
    description: str
    price: float
    features: List[str]
    capacity: int
    available: bool = True

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class TransferBooking(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    customer_name: str
    email: EmailStr
    phone: str
    flight_number: str
    arrival_date: date
    arrival_time: time
    passengers: int
    vehicle_type: str
    destination: str
    special_requests: Optional[str] = ""
    status: str = "pending"  # pending, confirmed, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class TransferBookingCreate(BaseModel):
    customer_name: str
    email: EmailStr
    phone: str
    flight_number: str
    arrival_date: date
    arrival_time: time
    passengers: int
    vehicle_type: str
    destination: str
    special_requests: Optional[str] = ""


# Gallery Models
class GalleryImage(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    url: str
    category: str  # beaches, culture, nature, wildlife
    title: str
    alt_text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class GalleryImageCreate(BaseModel):
    url: str
    category: str
    title: str
    alt_text: str