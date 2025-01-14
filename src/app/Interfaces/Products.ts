
export interface Products{
    aliexpress:AliExpressProduct[],
    amazon:AmazonProduct[],
}

export interface AmazonProduct {
    asin: string;
    climate_pledge_friendly: boolean;
    currency: string;
    delivery: string;
    has_variations: boolean;
    is_amazon_choice: boolean;
    is_best_seller: boolean;
    is_prime: boolean;
    product_minimum_offer_price: string; // Keeping it as string to include currency symbol
    product_num_offers: number;
    product_num_ratings: number;
    product_original_price: string; // Keeping it as string to include currency symbol
    product_photo: string;
    product_price: string; // Keeping it as string to include currency symbol
    product_star_rating: number; // Assuming star rating can be a string for formatting
    product_title: string;
    product_url: string;
    sales_volume: string;   
    brand: string; // Original price of the product (can be empty)
    icon: string; // Original price of the product (can be empty)
}

export interface AliExpressProduct {
    product_url: string; // URL of the product
    product_photo: string; // URL of the product image
    product_title: string; // Name of the product
    product_price: string; // Current price of the product (including currency)
    product_star_rating: number; // Assuming star rating can be a string for formatting
    product_original_price: string; // Original price of the product (can be empty)
    brand: string; // Original price of the product (can be empty)
    icon: string; // Original price of the product (can be empty)
}

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
