export interface Detection {
  class_name: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
}

export interface DetectionResponse {
  detections: Detection[];
  annotated_image?: string;
}