from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from database import init_database
from fastapi.middleware.cors import CORSMiddleware

# Import route modules
from routes import tours, contact, transfers, gallery

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(
    title="Zanzibar Explore Tours API",
    description="Backend API for Zanzibar tourism website",
    version="1.0.0"
)

# Add a direct root route on app
@app.get("/")
async def root():
    return {"message": "Zanzibar Explore Tours API - Welcome!"}

# Create a router with the /api prefix for existing endpoints
api_router = APIRouter(prefix="/api")

# API router root and health check
@api_router.get("/")
async def api_root():
    return {"message": "Zanzibar Explore Tours API - API Root"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}

# Include the router in the main app
app.include_router(api_router)

# Include all route modules
app.include_router(tours.router)
app.include_router(contact.router)
app.include_router(transfers.router)
app.include_router(gallery.router)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database with sample data on startup"""
    try:
        await init_database()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Database initialization failed: {str(e)}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
