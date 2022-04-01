// La classe définit l'objet tel qu'il est dans la base de donnée pour pouvoir manipuler les variables de ce dernier
export class Product {

    id: string;
    sku: string; 
    name: string; 
    description: string; 
    unitPrice: number; 
    imageUrl: string; 
    active: boolean; 
    unitsInStock: number; 
    dateCreated: Date; 
    lastUpdated: Date; 
}
