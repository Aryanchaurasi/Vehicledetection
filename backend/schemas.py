from pydantic import BaseModel
from typing import List, Optional

class Detection(BaseModel):
    """Single object detection result"""
    class_name: str
    confidence: float
    bbox: List[float]  # [x1, y1, x2, y2]

class DetectionResponse(BaseModel):
    """Response model for detection endpoint"""
    detections: List[Detection]
    annotated_image: Optional[str] = None  # Base64 encoded image