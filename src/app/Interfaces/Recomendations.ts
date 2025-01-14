import { AliExpressProduct, AmazonProduct } from "./Products";


export interface Recommendations {
    recomendation: {
        [key: string]: (AliExpressProduct | AmazonProduct)[];
    };
}


