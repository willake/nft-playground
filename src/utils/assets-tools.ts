export function importAllImages(req: __WebpackModuleApi.RequireContext) {
    let images : any[] = [];
    
    req.keys().forEach((item, index) => { 
        images.push(req(item)); 
    });
    
    return images;
}