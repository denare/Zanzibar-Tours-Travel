from fastapi import APIRouter, HTTPException, status
from typing import List
from database import contacts_collection
from models import Contact, ContactCreate

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/", response_model=Contact)
async def create_contact(contact: ContactCreate):
    """Create a new contact inquiry"""
    try:
        # Create contact record
        contact_obj = Contact(**contact.dict())
        result = await contacts_collection.insert_one(contact_obj.dict(by_alias=True, exclude={"id"}))
        
        # Return created contact
        created_contact = await contacts_collection.find_one({"_id": result.inserted_id})
        return Contact(**created_contact)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating contact: {str(e)}"
        )


@router.get("/", response_model=List[Contact])
async def get_contacts():
    """Get all contact inquiries (admin endpoint)"""
    try:
        contacts = await contacts_collection.find().sort("created_at", -1).to_list(1000)
        return [Contact(**contact) for contact in contacts]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching contacts: {str(e)}"
        )


@router.put("/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """Update contact status (admin endpoint)"""
    try:
        from bson import ObjectId
        
        if not ObjectId.is_valid(contact_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid contact ID format"
            )
        
        if status not in ["new", "replied", "closed"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Status must be one of: new, replied, closed"
            )
        
        result = await contacts_collection.update_one(
            {"_id": ObjectId(contact_id)},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact not found"
            )
        
        return {"message": "Contact status updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating contact status: {str(e)}"
        )