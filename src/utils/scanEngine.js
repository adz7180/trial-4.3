
export function processBlueprint(file) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                rooms: ['Living Room', 'Kitchen', 'Bedroom'],
                structure: 'Auto-generated 3D layout from blueprint'
            });
        }, 2000);
    });
}
