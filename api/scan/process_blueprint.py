#!/usr/bin/env python3
import sys, traceback
import json
import cv2, numpy as np, fitz, torch, torchvision
from torchvision.transforms import functional as F
from shapely.geometry import Polygon
from convert_to_glb import convert_to_glb_from_geometry
from segmentation_blueprint import blueprint_segmentation

# Load Mask R-CNN once
model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True)
model.eval()
CLASS_MAP = {1: 'wall', 2: 'door', 3: 'window'}

def convert_pdf_to_image(pdf_path):
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)
    pix = page.get_pixmap(matrix=fitz.Matrix(3,3))
    img_path = pdf_path.replace('.pdf', '.png')
    pix.save(img_path)
    return img_path

def detect_objects(image, file_path):
    objects, suggestions = [], []
    # 1) blueprint segmentation on the actual file
    try:
        segments = blueprint_segmentation(file_path)
        for seg in segments:
            x1,y1,x2,y2 = seg['coords']
            w,h = abs(x2-x1), abs(y2-y1)
            objects.append({'type':'wall','x':min(x1,x2),'y':min(y1,y2),'w':w,'h':h,'material':'painted drywall'})
            suggestions.append('Blueprint wall segment added.')
    except Exception as e:
        suggestions.append('Blueprint segmentation failed.')
        print('Segmentation error:', e, file=sys.stderr)

    # 2) Mask R-CNN for windows/doors/etc.
    tensor = F.to_tensor(image).unsqueeze(0)
    with torch.no_grad():
        out = model(tensor)[0]
    for i, score in enumerate(out['scores']):
        if score < 0.7: continue
        cls = out['labels'][i].item()
        if cls not in CLASS_MAP: continue
        mask = out['masks'][i,0].mul(255).byte().cpu().numpy()
        cnts,_ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for cnt in cnts:
            poly = cv2.approxPolyDP(cnt,5,True).reshape(-1,2)
            if Polygon(poly).area < 200: continue
            x,y,w,h = cv2.boundingRect(cnt)
            typ = CLASS_MAP[cls]
            mat = 'glass' if typ=='window' else 'wood'
            objects.append({'type':typ,'x':x,'y':y,'w':w,'h':h,'material':mat,'polygon':poly.tolist()})
            suggestions.append(f'Detected {typ}, default to {mat}.')
    return objects, suggestions

def process_blueprint(file_path, output_glb_path):
    try:
        if file_path.lower().endswith('.pdf'):
            file_path = convert_pdf_to_image(file_path)
        image = cv2.imread(file_path)
        if image is None:
            raise ValueError(f'Cannot read image: {file_path}')
        image = cv2.resize(image, (1024,1024))
        objs, sugg = detect_objects(image, file_path)
        convert_to_glb_from_geometry(objs, output_glb_path)
        # Output valid JSON
        print(json.dumps({'suggestions': sugg}))
        return 0
    except Exception:
        traceback.print_exc()
        return 1

if __name__ == '__main__':
    out_path = sys.argv[2]
    sys.exit(process_blueprint(sys.argv[1], out_path))
