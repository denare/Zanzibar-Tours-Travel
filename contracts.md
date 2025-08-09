# Zanzibar Explore Tours - Backend Integration Contracts

## Overview
This document outlines the integration contracts between frontend (React) and backend (FastAPI) for the Zanzibar Explore Tours website.

## Current Mock Data (to be replaced)

### 1. Tours Data (`/app/frontend/src/data/mock.js`)
**Current Mock Structure:**
```javascript
{
  id: 1,
  title: "Tour Title",
  description: "Tour Description", 
  image: "image_url",
  price: "$85",
  duration: "Full Day",
  category: "water|cultural|nature|safari"
}
```

### 2. Gallery Images (`/app/frontend/src/data/mock.js`)
**Current Mock Structure:**
```javascript
galleryImages: {
  beaches: ["url1", "url2", ...],
  culture: ["url1", "url2", ...],
  nature: ["url1", "url2", ...],
  wildlife: ["url1", "url2", ...]
}
```

### 3. Airport Transfers (`/app/frontend/src/data/mock.js`)
**Current Mock Structure:**
```javascript
{
  id: 1,
  type: "Economy Car",
  description: "Vehicle description",
  price: "$25", 
  features: ["feature1", "feature2", ...]
}
```

## API Contracts

### 1. Tours Management

#### GET /api/tours
- **Purpose**: Retrieve all tour packages
- **Response**: Array of tour objects
- **Frontend Usage**: Tours page, Home page featured tours

#### GET /api/tours/:id  
- **Purpose**: Get specific tour details
- **Response**: Single tour object
- **Frontend Usage**: Booking modal, tour details

#### POST /api/bookings
- **Purpose**: Create new tour booking
- **Payload**: 
```json
{
  "tourId": "string",
  "customerName": "string",
  "email": "string", 
  "phone": "string",
  "date": "date",
  "guests": "number",
  "message": "string"
}
```
- **Frontend Usage**: BookingModal.js

### 2. Contact & Inquiries

#### POST /api/contact
- **Purpose**: Handle contact form submissions
- **Payload**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string", 
  "message": "string"
}
```
- **Frontend Usage**: Contact.js form

### 3. Airport Transfers

#### GET /api/transfers/vehicles
- **Purpose**: Get available transfer vehicles
- **Response**: Array of vehicle objects
- **Frontend Usage**: AirportTransfers.js

#### POST /api/transfers/bookings
- **Purpose**: Create transfer booking
- **Payload**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "flightNumber": "string",
  "arrivalDate": "date",
  "arrivalTime": "time",
  "passengers": "number",
  "vehicleType": "string",
  "destination": "string", 
  "specialRequests": "string"
}
```
- **Frontend Usage**: AirportTransfers.js form

### 4. Gallery

#### GET /api/gallery
- **Purpose**: Get categorized gallery images
- **Response**: Object with categorized image arrays
- **Frontend Usage**: Gallery.js

## Database Models

### 1. Tour Model
```python
class Tour:
    id: ObjectId
    title: str
    description: str  
    image: str
    price: float
    duration: str
    category: str  # water, cultural, nature, safari
    features: List[str]
    created_at: datetime
    updated_at: datetime
```

### 2. Booking Model  
```python
class Booking:
    id: ObjectId
    tour_id: ObjectId
    customer_name: str
    email: str
    phone: str
    booking_date: date
    guests: int
    special_requests: str
    status: str  # pending, confirmed, cancelled
    created_at: datetime
```

### 3. Contact Model
```python
class Contact:
    id: ObjectId
    name: str
    email: str
    phone: str
    subject: str
    message: str
    status: str  # new, replied, closed
    created_at: datetime
```

### 4. TransferBooking Model
```python
class TransferBooking:
    id: ObjectId
    customer_name: str
    email: str 
    phone: str
    flight_number: str
    arrival_date: date
    arrival_time: time
    passengers: int
    vehicle_type: str
    destination: str
    special_requests: str
    status: str  # pending, confirmed, completed
    created_at: datetime
```

### 5. Vehicle Model
```python
class Vehicle:
    id: ObjectId
    type: str
    description: str
    price: float
    features: List[str]
    capacity: int
    available: bool
```

### 6. GalleryImage Model
```python
class GalleryImage:
    id: ObjectId
    url: str
    category: str  # beaches, culture, nature, wildlife
    title: str
    alt_text: str
    created_at: datetime
```

## Frontend Integration Plan

### Phase 1: Replace Mock Data
1. **Tours**: Replace `tours` import with API call to `/api/tours`
2. **Gallery**: Replace `galleryImages` with API call to `/api/gallery`  
3. **Transfers**: Replace `airportTransfers` with API call to `/api/transfers/vehicles`

### Phase 2: Form Integration
1. **BookingModal**: Submit to `/api/bookings` instead of console.log
2. **Contact Form**: Submit to `/api/contact` instead of console.log
3. **Transfer Form**: Submit to `/api/transfers/bookings` instead of console.log

### Phase 3: Error Handling & Loading States
1. Add loading spinners during API calls
2. Add error handling for failed requests  
3. Add success/failure toast notifications
4. Add form validation

## Error Handling Strategy
- **Frontend**: Use try-catch blocks with toast notifications
- **Backend**: Return structured error responses with appropriate HTTP status codes
- **Validation**: Both client-side and server-side validation

## Data Flow
1. **User visits website** → Frontend loads tour data from `/api/tours`
2. **User fills booking form** → Frontend submits to `/api/bookings` 
3. **Backend processes** → Saves to MongoDB, sends confirmation
4. **Frontend receives response** → Shows success/error message

## Authentication (Future Enhancement)
- Currently no authentication required for bookings
- Future: Add admin authentication for tour management
- JWT tokens for secure API access

## Next Steps
1. Implement MongoDB models in FastAPI
2. Create API endpoints with proper validation
3. Replace frontend mock data with API calls
4. Test integration end-to-end
5. Add proper error handling and loading states