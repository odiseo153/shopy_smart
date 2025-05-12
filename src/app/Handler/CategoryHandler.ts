import { Product } from "../Interfaces/Products";
import ProductsHandler from "./ProductsHandler";

export enum ProductCategory {
  GENERAL = 'general',
  CLOTHING = 'clothing',
  ELECTRONICS = 'electronics',
  SPORTS = 'sports',
  LUXURY = 'luxury'
}

interface PlatformInfo {
  name: string;
  categories: ProductCategory[];
}

class CategoryHandler {
  private readonly platformsConfig: Record<string, PlatformInfo> = {
    ebay: { name: 'ebay', categories: [ProductCategory.GENERAL, ProductCategory.ELECTRONICS, ProductCategory.CLOTHING],},
    walmart: { name: 'walmart', categories: [ProductCategory.GENERAL, ProductCategory.ELECTRONICS, ProductCategory.CLOTHING], },
    aliexpress: { name: 'aliexpress', categories: [ProductCategory.GENERAL, ProductCategory.ELECTRONICS, ProductCategory.CLOTHING], },
    nike: { name: 'nike', categories: [ProductCategory.CLOTHING, ProductCategory.SPORTS],},
    asos: { name: 'asos', categories: [ProductCategory.CLOTHING, ProductCategory.LUXURY], },
    bestbuy: { name: 'bestbuy', categories: [ProductCategory.ELECTRONICS], },
    romwe: { name: 'romwe', categories: [ProductCategory.CLOTHING],  },
    patagonia: { name: 'patagonia', categories: [ProductCategory.CLOTHING, ProductCategory.SPORTS], }
  };

  constructor(private productHandler: ProductsHandler) {}

  private getPlatformsByCategory(category: ProductCategory): string[] {
    return Object.entries(this.platformsConfig)
      .filter(([_, info]) => info.categories.includes(category))
      .map(([platform]) => platform);
  }

  async getProductsByCategory(search: string): Promise<Product[]> {
    const category = await this.productHandler.getCategorieFromProduct(search);
    const platforms = this.getPlatformsByCategory(category);
  
    const fetchMethods: Record<string, (search: string) => Promise<Product[]>> = {
      ebay: this.productHandler.getEbayProducts.bind(this.productHandler),
      walmart: this.productHandler.getWalmartProducts.bind(this.productHandler),
      aliexpress: this.productHandler.getAliExpressProducts.bind(this.productHandler),
    };
  
    const results = await Promise.allSettled(
      platforms.map(platform => fetchMethods[platform]?.(search) ?? Promise.resolve([]))
    );
  
    return results
      .filter(result => result.status === "fulfilled")
      .flatMap(result => (result as PromiseFulfilledResult<Product[]>).value);
  }
  

  getPlatformCategories(platformName: string): ProductCategory[] {
    return this.platformsConfig[platformName]?.categories || [];
  }

  isPlatformInCategory(platformName: string, category: ProductCategory): boolean {
    return this.getPlatformCategories(platformName).includes(category);
  }
}

export default CategoryHandler;
