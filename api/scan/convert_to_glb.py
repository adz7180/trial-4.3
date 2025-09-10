# /api/scan/convert_to_glb.py

import trimesh
from shapely.geometry import Polygon

def extrude_polygon(coords, height):
    poly = Polygon(coords)
    return trimesh.creation.extrude_polygon(poly, height/100.0)

def convert_to_glb_from_geometry(objects, output_path):
    scene = trimesh.Scene()
    for obj in objects:
        mat = obj.get('material','default')
        if 'polygon' in obj:
            mesh = extrude_polygon(obj['polygon'], obj['h'])
        else:
            w,h = obj['w']/100.0, obj['h']/100.0
            mesh = trimesh.creation.box(extents=(w,0.3,h))
            mesh.apply_translation([obj['x']/100.0, obj['y']/100.0, h/2])
        mesh.metadata = {
            'type': obj['type'],
            'material': mat,
            'textureMaps': {
                'diffuse': f'/textures/{mat}/diffuse.png',
                'normal':  f'/textures/{mat}/normal.png',
                'roughness': f'/textures/{mat}/roughness.png',
                'ao': f'/textures/{mat}/ao.png'
            }
        }
        scene.add_geometry(mesh)
    # Export with Draco compression level 6
    scene.export(output_path, file_type='glb', draco_compression_level=6)
