export interface Libro {
    id?: number,
    nombre: string,
    autor: string,
    codigo: string,
    descripcion: string,
    tipo: string[],
    descargable: boolean,
    principal: boolean,
    ubicacion?: string,
    url?: string,
    imagen?: ImagenFile,
    documento?: DocFile
    
}

export interface ImagenFile {
    id?: number,
    libro_id: number,
    imagen: string
}

export interface DocFile {
    id?: number,
    libro_id: number,
    doc: string
}