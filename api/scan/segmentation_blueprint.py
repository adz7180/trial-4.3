# /api/scan/segmentation_blueprint.py

import cv2
import numpy as np

def blueprint_segmentation(image_path):
    """Extract crisp wall segments from a scanned blueprint."""
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    # 1. Adaptive threshold (blockSize=51, C=15)
    bw = cv2.adaptiveThreshold(
        img, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV,
        blockSize=51, C=15
    )
    # 2. Morphological closing (7×7 kernel)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (7,7))
    closed = cv2.morphologyEx(bw, cv2.MORPH_CLOSE, kernel, iterations=2)
    # 3. Hough line detection (walls)
    lines = cv2.HoughLinesP(
        closed, rho=1, theta=np.pi/180,
        threshold=120, minLineLength=60, maxLineGap=12
    )
    segments = []
    if lines is not None:
        for x1,y1,x2,y2 in lines[:,0]:
            segments.append({
                'type': 'wall_segment',
                'coords': (x1, y1, x2, y2)
            })
    return segments
