# VisionGuard - Real-time Object Detection Web App

A full-stack web application for real-time object detection using YOLO models, FastAPI backend, and React frontend.

## Features

- Upload images for object detection
- Real-time YOLO model inference
- Interactive results display with bounding boxes
- Clean, modern UI with React + Vite
- FastAPI backend with automatic documentation

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python 3.8+
- **ML Model**: YOLOv8 (ultralytics)
- **API**: RESTful with automatic OpenAPI docs

## Quick Start

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## API Usage

### Detect Objects in Image

```bash
curl -X POST "http://localhost:8000/detect/image" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@your-image.jpg"
```

### Response Format

```json
{
  "detections": [
    {
      "class": "person",
      "confidence": 0.95,
      "bbox": [100, 150, 200, 300]
    }
  ],
  "annotated_image": "base64-encoded-image-string"
}
```

## Project Structure

```
VisionGuard/
├── backend/
│   ├── main.py
│   ├── models/
│   ├── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Configuration

### Environment Variables

**Frontend (.env)**:
```
VITE_API_BASE_URL=http://localhost:8000
```

**Backend**:
- Model path: `models/yolov8n.pt` (auto-downloaded)
- CORS origins: `http://localhost:5173`

## Extending the Application

### Adding Video Support
- Extend `/detect/video` endpoint in `main.py`
- Add video processing logic in `models/detector.py`
- Update frontend components for video upload

### Changing YOLO Model
- Replace model file in `models/detector.py`
- Update `MODEL_PATH` variable
- Restart backend server

## Development

- Backend runs on port 8000 with auto-reload
- Frontend runs on port 5173 with hot module replacement
- CORS configured for local development