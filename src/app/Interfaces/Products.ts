
export interface Product {
    product_url: string; // URL of the product
    product_photo: string; // URL of the product image
    product_title: string; // Name of the product
    product_price: string; // Current price of the product (including currency)
    product_star_rating?: number; // Assuming star rating can be a string for formatting
    product_original_price?: string; // Original price of the product (can be empty)
    brand: string; // Original price of the product (can be empty)
    icon: string; // Original price of the product (can be empty)
}
