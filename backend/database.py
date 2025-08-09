import os
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from models import Tour, Vehicle, GalleryImage
import asyncio

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
tours_collection = db.tours
bookings_collection = db.bookings
contacts_collection = db.contacts
transfers_collection = db.transfer_bookings
vehicles_collection = db.vehicles
gallery_collection = db.gallery


async def init_database():
    """Initialize database with sample data"""
    
    # Check if data already exists
    if await tours_collection.count_documents({}) > 0:
        return
    
    # Sample tours data
    tours_data = [
        {
            "title": "Mnemba Island (Snorkeling & Dolphin Tour)",
            "description": "Enjoy a magical boat ride as you spot playful dolphins and snorkel in the crystal-clear waters near Mnemba, home to vibrant marine life.",
            "image": "https://images.unsplash.com/photo-1597799119438-cbf326f268b9",
            "price": 85.0,
            "duration": "Full Day",
            "category": "water",
            "features": ["Dolphin watching", "Snorkeling equipment", "Lunch included", "Professional guide"]
        },
        {
            "title": "Spice Farm Tour",
            "description": "Explore Zanzibar's aromatic spice farms, learn about the island's spice history, and taste fresh tropical fruits and spices right from the source.",
            "image": "https://images.unsplash.com/photo-1641677371014-5d0691ab5c0a",
            "price": 35.0,
            "duration": "Half Day",
            "category": "cultural",
            "features": ["Spice tasting", "Fruit sampling", "Traditional cooking demo", "Local guide"]
        },
        {
            "title": "Nakupenda Tour",
            "description": "Relax on a stunning sandbank surrounded by turquoise waters, swim, sunbathe, and enjoy fresh seafood under the open sky.",
            "image": "https://images.unsplash.com/photo-1619382749984-02521fd9fc43",
            "price": 65.0,
            "duration": "Full Day",
            "category": "water",
            "features": ["Sandbank visit", "Seafood lunch", "Swimming", "Snorkeling"]
        },
        {
            "title": "Nungwi Village Tour",
            "description": "Discover local life in Nungwi, visit traditional dhow builders, meet the locals, and explore one of Zanzibar's most beautiful coastal villages.",
            "image": "https://images.unsplash.com/photo-1621583628955-42fbc37bf424",
            "price": 45.0,
            "duration": "Half Day",
            "category": "cultural",
            "features": ["Village walk", "Dhow building", "Local interaction", "Cultural insights"]
        },
        {
            "title": "Sunset Cruise",
            "description": "Sail along the Indian Ocean in a traditional dhow as the sun sets, painting the sky with golden hues — a perfect romantic escape.",
            "image": "https://images.unsplash.com/photo-1666778439853-540bae64fa9f",
            "price": 55.0,
            "duration": "3 Hours",
            "category": "water",
            "features": ["Traditional dhow", "Sunset viewing", "Light refreshments", "Romantic atmosphere"]
        },
        {
            "title": "Safari Blue",
            "description": "A full-day adventure of island hopping, snorkeling, seafood feasting, and swimming in natural lagoons surrounded by coral reefs.",
            "image": "https://images.pexels.com/photos/5858974/pexels-photo-5858974.jpeg",
            "price": 95.0,
            "duration": "Full Day",
            "category": "water",
            "features": ["Island hopping", "Snorkeling", "Seafood lunch", "Natural lagoons"]
        },
        {
            "title": "Prison Island Tour",
            "description": "Visit the historic island once used to detain slaves, now home to giant tortoises and colonial ruins, just a short boat ride from Stone Town.",
            "image": "https://images.unsplash.com/photo-1634646350436-e1448c1d4f63",
            "price": 40.0,
            "duration": "Half Day",
            "category": "cultural",
            "features": ["Historical tour", "Giant tortoises", "Boat ride", "Colonial ruins"]
        },
        {
            "title": "Stone Town Tour",
            "description": "Walk through the rich history of Zanzibar's old city, with its winding alleys, ancient buildings, slave market, and vibrant culture.",
            "image": "https://images.unsplash.com/photo-1684514571318-64f1fca644af",
            "price": 30.0,
            "duration": "Half Day",
            "category": "cultural",
            "features": ["Walking tour", "Historical sites", "Local guide", "Cultural immersion"]
        },
        {
            "title": "Jozani Forest",
            "description": "Explore Zanzibar's only national park, home to the rare Red Colobus monkeys and a peaceful mangrove ecosystem.",
            "image": "https://images.unsplash.com/photo-1695643875095-f5620748605d",
            "price": 25.0,
            "duration": "Half Day",
            "category": "nature",
            "features": ["Red Colobus monkeys", "Nature walk", "Mangrove boardwalk", "Wildlife viewing"]
        },
        {
            "title": "Sea Walk",
            "description": "Experience underwater walking with a helmet, enjoy the ocean floor and its marine life without needing to swim or dive.",
            "image": "https://images.pexels.com/photos/5858974/pexels-photo-5858974.jpeg",
            "price": 75.0,
            "duration": "2 Hours",
            "category": "water",
            "features": ["Underwater walking", "Marine life viewing", "No swimming required", "Unique experience"]
        },
        {
            "title": "Deep Sea Fishing",
            "description": "Join experienced crews for a thrilling fishing trip in the deep waters of the Indian Ocean, chasing tuna, marlin, and more.",
            "image": "https://images.unsplash.com/flagged/photo-1564639566047-dc4a1b86a90f",
            "price": 120.0,
            "duration": "Full Day",
            "category": "water",
            "features": ["Deep sea fishing", "Professional crew", "Equipment included", "Fresh catch"]
        },
        {
            "title": "Zoo and Parks",
            "description": "Get up close with local wildlife, from exotic birds to rare reptiles, in well-maintained, family-friendly parks and zoos.",
            "image": "https://images.unsplash.com/photo-1502452302126-a987e1f3fea4",
            "price": 20.0,
            "duration": "3 Hours",
            "category": "nature",
            "features": ["Wildlife viewing", "Family friendly", "Educational", "Photo opportunities"]
        },
        {
            "title": "Safari Tour (Serengeti, Mikumi, Ngorongoro)",
            "description": "Extend your adventure to Tanzania's mainland and witness Africa's Big Five in the most iconic national parks in guided safari tours.",
            "image": "https://images.unsplash.com/photo-1632751334597-b26a1435ac2d",
            "price": 350.0,
            "duration": "3-5 Days",
            "category": "safari",
            "features": ["Big Five", "Professional guide", "Accommodation", "Multi-day adventure"]
        }
    ]
    
    # Insert tours
    for tour_data in tours_data:
        tour = Tour(**tour_data)
        await tours_collection.insert_one(tour.dict(by_alias=True, exclude={"id"}))
    
    # Sample vehicles data
    vehicles_data = [
        {
            "type": "Economy Car",
            "description": "Comfortable sedan for up to 3 passengers",
            "price": 25.0,
            "features": ["Air Conditioning", "Professional Driver", "Meet & Greet"],
            "capacity": 3
        },
        {
            "type": "SUV",
            "description": "Spacious SUV for up to 6 passengers with luggage",
            "price": 35.0,
            "features": ["Air Conditioning", "Professional Driver", "Meet & Greet", "Extra Luggage Space"],
            "capacity": 6
        },
        {
            "type": "Minivan",
            "description": "Perfect for groups up to 12 passengers",
            "price": 55.0,
            "features": ["Air Conditioning", "Professional Driver", "Meet & Greet", "Group Friendly"],
            "capacity": 12
        }
    ]
    
    # Insert vehicles
    for vehicle_data in vehicles_data:
        vehicle = Vehicle(**vehicle_data)
        await vehicles_collection.insert_one(vehicle.dict(by_alias=True, exclude={"id"}))
    
    # Sample gallery images
    gallery_data = [
        {"url": "https://images.unsplash.com/photo-1634646350433-fe03ad698448", "category": "beaches", "title": "Pristine Beach", "alt_text": "Beautiful beach with turquoise water"},
        {"url": "https://images.unsplash.com/photo-1621583628955-42fbc37bf424", "category": "beaches", "title": "Beach Life", "alt_text": "People enjoying beach activities"},
        {"url": "https://images.unsplash.com/photo-1619382749984-02521fd9fc43", "category": "beaches", "title": "Crystal Waters", "alt_text": "Crystal clear lagoon"},
        {"url": "https://images.unsplash.com/photo-1634646350436-e1448c1d4f63", "category": "beaches", "title": "Resort View", "alt_text": "Aerial view of beach resort"},
        {"url": "https://images.unsplash.com/photo-1684514571318-64f1fca644af", "category": "culture", "title": "Stone Town", "alt_text": "Historic Stone Town streets"},
        {"url": "https://images.unsplash.com/photo-1695643875095-f5620748605d", "category": "culture", "title": "Market Scene", "alt_text": "Bustling local market"},
        {"url": "https://images.unsplash.com/photo-1502452302126-a987e1f3fea4", "category": "culture", "title": "Aerial Stone Town", "alt_text": "Stone Town from above"},
        {"url": "https://images.unsplash.com/photo-1632751334597-b26a1435ac2d", "category": "culture", "title": "Sunset Culture", "alt_text": "Cultural site at sunset"},
        {"url": "https://images.pexels.com/photos/5858974/pexels-photo-5858974.jpeg", "category": "nature", "title": "Marine Life", "alt_text": "Underwater marine life"},
        {"url": "https://images.unsplash.com/photo-1641677371014-5d0691ab5c0a", "category": "nature", "title": "Spices", "alt_text": "Colorful spices"},
        {"url": "https://images.pexels.com/photos/6280412/pexels-photo-6280412.jpeg", "category": "nature", "title": "Spice Drying", "alt_text": "Traditional spice drying process"},
        {"url": "https://images.unsplash.com/photo-1711802536786-149a0d0c5879", "category": "wildlife", "title": "Traditional Dhow", "alt_text": "Traditional dhow boat"},
        {"url": "https://images.unsplash.com/photo-1666778439853-540bae64fa9f", "category": "wildlife", "title": "Dhow at Sunset", "alt_text": "Dhow sailing at sunset"}
    ]
    
    # Insert gallery images
    for image_data in gallery_data:
        gallery_image = GalleryImage(**image_data)
        await gallery_collection.insert_one(gallery_image.dict(by_alias=True, exclude={"id"}))
    
    print("Database initialized with sample data!")