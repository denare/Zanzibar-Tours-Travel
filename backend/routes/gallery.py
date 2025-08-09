from fastapi import APIRouter, HTTPException, status
from typing import Dict, List
from database import gallery_collection
from models import GalleryImage

router = APIRouter(prefix="/api/gallery", tags=["gallery"])


@router.get("/", response_model=Dict[str, List[str]])
async def get_gallery():
    """Get all gallery images categorized"""
    try:
        images = await gallery_collection.find().to_list(1000)
        
        # Group images by category
        gallery_dict = {}
        for image in images:
            gallery_image = GalleryImage(**image)
            if gallery_image.category not in gallery_dict:
                gallery_dict[gallery_image.category] = []
            gallery_dict[gallery_image.category].append(gallery_image.url)
        
        return gallery_dict
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching gallery: {str(e)}"
        )


@router.get("/category/{category}", response_model=List[str])
async def get_gallery_by_category(category: str):
    """Get gallery images by specific category"""
    try:
        images = await gallery_collection.find({"category": category}).to_list(1000)
        return [image["url"] for image in images]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching gallery by category: {str(e)}"
        )


@router.get("/images", response_model=List[GalleryImage])
async def get_all_gallery_images():
    """Get all gallery images with full details"""
    try:
        images = await gallery_collection.find().to_list(1000)
        return [GalleryImage(**image) for image in images]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching gallery images: {str(e)}"
        )