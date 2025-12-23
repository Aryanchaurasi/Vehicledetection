import cv2
import numpy as np
from ultralytics import YOLO
import base64
from io import BytesIO
from PIL import Image
from typing import List, Tuple
from schemas import Detection
import logging

logger = logging.getLogger(__name__)

class YOLODetector:
    """YOLO object detection wrapper"""
    
    def __init__(self, model_path: str = "yolov8n.pt"):
        """
        Initialize YOLO detector
        
        Args:
            model_path: Path to YOLO model file (will auto-download if not exists)
        """
        self.model_path = model_path
        self.model = None
        
    def load_model(self):
        """Load YOLO model (downloads automatically if needed)"""
        try:
            self.model = YOLO(self.model_path)
            logger.info(f"YOLO model loaded: {self.model_path}")
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise
    
    def detect(self, image_data: bytes) -> Tuple[List[Detection], str]:
        """
        Run object detection on image
        
        Args:
            image_data: Raw image bytes
            
        Returns:
            Tuple of (detections list, base64 annotated image)
        """
        if self.model is None:
            raise RuntimeError("Model not loaded. Call load_model() first.")
        
        # Convert bytes to PIL Image
        image = Image.open(BytesIO(image_data))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Run inference
        results = self.model(image)
        
        # Process results
        detections = []
        annotated_image = None
        
        for result in results:
            # Extract detections
            if result.boxes is not None:
                boxes = result.boxes.xyxy.cpu().numpy()  # x1, y1, x2, y2
                confidences = result.boxes.conf.cpu().numpy()
                class_ids = result.boxes.cls.cpu().numpy()
                
                for box, conf, cls_id in zip(boxes, confidences, class_ids):
                    class_name = self.model.names[int(cls_id)]
                    
                    detection = Detection(
                        class_name=class_name,
                        confidence=float(conf),
                        bbox=box.tolist()
                    )
                    detections.append(detection)
            
            # Get annotated image
            annotated_img = result.plot()
            
            # Convert to base64
            _, buffer = cv2.imencode('.jpg', annotated_img)
            annotated_image = base64.b64encode(buffer).decode('utf-8')
        
        return detections, annotated_image