from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from models.detector import YOLODetector
from schemas import DetectionResponse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="VisionGuard API",
    description="Real-time object detection using YOLO models",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize YOLO detector
detector = YOLODetector()

@app.on_event("startup")
async def startup_event():
    """Load YOLO model on startup"""
    logger.info("Loading YOLO model...")
    detector.load_model()
    logger.info("YOLO model loaded successfully")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "VisionGuard API is running", "status": "healthy"}

@app.post("/detect/image", response_model=DetectionResponse)
async def detect_image(file: UploadFile = File(...)):
    """
    Detect objects in uploaded image using YOLO model
    
    Args:
        file: Uploaded image file (jpg, png, etc.)
        
    Returns:
        DetectionResponse with detected objects and annotated image
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        logger.info(f"Processing image: {file.filename}")
        
        # Read image data
        image_data = await file.read()
        
        # Run detection
        detections, annotated_image = detector.detect(image_data)
        
        logger.info(f"Found {len(detections)} objects")
        
        return DetectionResponse(
            detections=detections,
            annotated_image=annotated_image
        )
        
    except Exception as e:
        logger.error(f"Detection error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

# TODO: Extend for video detection
# @app.post("/detect/video")
# async def detect_video(file: UploadFile = File(...)):
#     """Future endpoint for video object detection"""
#     pass

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)