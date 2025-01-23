import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { Product } from '../Interfaces/Products';
import { ProductCategory } from './CategoryHandler';

dotenv.config();

const API_KEY_GEMINI = process.env.API_KEY_GEMINI;



class ProductsHandler {
  private headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US;q=0.5',
  };



  async getEbayProducts(search: string): Promise<Product[]> {
    const url = `https://www.ebay.com/sch/i.html?_nkw=${search}`;
    const response = await axios.get(url, { headers: this.headers });
    const $ = cheerio.load(response.data);

    const products: Product[] = [];

    $('div.s-item__wrapper').each((_, container) => {
      try {
        const title = $(container).find('div.s-item__title').text().trim();
        const link = $(container).find('a').attr('href');
        const price = $(container).find('span.s-item__price').text().trim();
        const imageUrl = $(container).find('img').attr('src') || 'No image available';

        if (title !== 'Shop on eBay') {
          products.push({
            product_photo: imageUrl,
            product_title: title,
            product_price: price,
            product_url: link || '',
            brand: 'ebay',
            icon: 'https://w7.pngwing.com/pngs/622/371/png-transparent-ebay-logo-ebay-sales-amazon-com-coupon-online-shopping-ebay-logo-text-logo-number.png',
          });
        }
      } catch (e) {
        console.error(`Error parsing product: ${e}`);
      }
    });

    return products;
  }

  async getWalmartProducts(search: string): Promise<Product[]> {
    const url = `https://www.walmart.com/search?q=${search}`;
    const response = await axios.get(url, { headers: this.headers });
    const $ = cheerio.load(response.data);

    const products: Product[] = [];

    $('div.mb0.ph0-xl.pt0-xl.bb.b--near-white.w-25.pb3-m.ph1').each((_, product) => {
      try {
        const title = $(product).find('span.w_iUH7').text().trim();
        const price = $(product).find('div[data-automation-id="product-price"] span.f2').text().trim() || 'N/A';
        const image = $(product).find('img[data-testid="productTileImage"]').attr('src') || '';
        const link = $(product).find('a').attr('href') || '';

        products.push({
          product_title: title,
          product_price: price,
          product_photo: image,
          product_url: link,
          brand: 'walmart',
          icon: 'https://e7.pngegg.com/pngimages/45/625/png-clipart-yellow-logo-illustration-walmart-logo-grocery-store-retail-asda-stores-limited-icon-walmart-logo-miscellaneous-company-thumbnail.png',
        });
      } catch (e) {
        console.error(`Error processing product: ${e}`);
      }
    });

    return products;
  }


  async getAliExpressProducts(search: string): Promise<Product[]> {
    const url = `https://www.aliexpress.us/w/wholesale-${search}.html?spm=a2g0o.home.search.0`;
    const response = await axios.get(url, { headers: this.headers });
    const $ = cheerio.load(response.data);

    const products: Product[] = [];

    $('div.multi--modalContext--1Hxqhwi').each((_, product) => {
      try {
        const image = $(product).find('img.images--item--3XZa6xf').attr('src') || '';
        const title = $(product).find('h3.multi--titleText--nXeOvyr').text().trim();
        const priceOriginal = $(product).find('div.multi--price-original--1zEQqOK').text().trim();
        const price = $(product).find('div.multi--price-sale--U-S0jtj').text().trim();
        const link = $(product).find('a.multi--container--1UZxxHY.cards--card--3PJxwBm.search-card-item').attr('href') || '';

        products.push({
          product_photo: image,
          product_title: title,
          product_original_price: priceOriginal,
          product_price: price,
          product_url: link,
          brand: 'aliexpress',
          icon: 'https://c0.klipartz.com/pngpicture/900/512/gratis-png-iconos-del-ordenador-fuente-aliexpress-thumbnail.png',
        });
      } catch (e) {
        console.error(`Error parsing AliExpress product: ${e}`);
      }
    });

    return products;
  }


  async getProductsGearbest(search: string): Promise<Product[]> {
    const url = `https://www.gearbest.ma/?s=${search}&post_type=product&product_cat=`;

    try {
      const response = await axios.get(url, { headers: this.headers });

      if (response.status !== 200) {
        console.error(`Error al hacer la solicitud: ${response.status}`);
        return [];
      }

      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('div.product').each((_, element) => {
        const title = $(element)
          .find('h3.flowhidden.mb10.fontnormal.position-relative')
          .text()
          .trim();
        const price = $(element).find('span.price').text().trim();
        const link = $(element).find('a').attr('href');
        const imgTag = $(element).find('img[data-src]').attr('data-src');

        products.push({
          product_title: title || 'N/A',
          product_price: price || 'N/A',
          product_url: link || 'N/A',
          brand: 'gearbest',
          icon: 'https://www.gearbest.ma/wp-content/uploads/2023/12/favicon-gearbest-100x100.ico',
          product_photo: imgTag || 'N/A',
        });
      });

      return products;
    } catch (error) {
      console.error(`Error en la solicitud: ${error}`);
      return [];
    }
  }

  async getProductsRomwe(search: string): Promise<Product[]> {
    const url = `https://es.romwe.com/pdsearch/${search}`;

    try {
      const response = await axios.get(url, { headers: this.headers });

      if (response.status !== 200) {
        console.error(`Error al hacer la solicitud: ${response.status}`);
        return [];
      }

      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('section.product-card').each((_, element) => {
        const title = $(element)
          .find('a.goods-title-link')
          .text()
          .trim();
        const price = $(element)
          .find('span.normal-price-ctn__sale-price')
          .text()
          .trim();
        const link = $(element).find('a').attr('href');
        const imgTag = $(element)
          .find('div.crop-image-container')
          .attr('data-before-crop-src');

        products.push({
          product_title: title || 'N/A',
          product_price: price || 'N/A',
          product_url: link ? `https://es.romwe.com${link}` : 'N/A',
          brand: 'romwe',
          icon: 'https://play-lh.googleusercontent.com/ioRftbQYaiyt5Igo7TjkP7huMuBzC7T4FVV40HTul3E_RaBy1O5wn5cO0It6BKzHOw',
          product_photo: imgTag || 'N/A',
        });
      });

      return products;
    } catch (error) {
      console.error(`Error en la solicitud: ${error}`);
      return [];
    }
  }



  async getBestBuyProducts(search: string): Promise<Product[]> {
    const url = `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(search)}&_dyncharset=UTF-8&_dynSessConf=&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys`;

    try {
      const response = await axios.get(url, { headers: this.headers });

      if (response.status !== 200) {
        console.error(`Error al hacer la solicitud: ${response.status}`);
        return [];
      }

      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('li.sku-item').each((_, element) => {
        const title = $(element).find('h4.sku-title').text().trim();
        const price = $(element).find('span[aria-hidden="true"]').text().trim();
        const link = $(element).find('a').attr('href');
        const image = $(element).find('img.product-image').attr('src');

        products.push({
          product_title: title || 'N/A',
          product_price: price || 'N/A',
          product_url: link ? `https://www.bestbuy.com${link}` : 'N/A',
          brand: 'bestbuy',
          icon: 'https://cdn.dribbble.com/users/1399110/screenshots/15908208/best_buy_refresh.png',
          product_photo: image || 'N/A',
        });
      });

      return products;
    } catch (error) {
      console.error(`Error en la solicitud: ${error}`);
      return [];
    }
  }



  async getAsosProducts(search: string): Promise<Product[]> {
    const url = `https://www.asos.com/search/?q=${search}`;
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    };

    try {
      const response = await axios.get(url, { headers });

      if (response.status !== 200) {
        console.error(`Error al hacer la solicitud: ${response.status}`);
        return [];
      }

      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('a.productLink_KM4PI').each((_, element) => {
        try {
          const productUrl = $(element).attr('href') || 'N/A';
          const productImage = $(element).find('img').attr('src') || 'N/A';
          const productName = $(element)
            .find('p.productDescription_sryaw')
            .text()
            .trim() || 'N/A';

          const originalPrice = $(element)
            .find('span.originalPrice_jEWt1')
            .text()
            .trim() || 'N/A';
          const salePrice = $(element)
            .find('span.saleAmount_C4AGB')
            .text()
            .trim() || 'N/A';
          const discount = $(element)
            .find('div.productDeal_RiYVs')
            .text()
            .trim() || 'N/A';

          products.push({
            product_title: productName,
            product_price: salePrice || originalPrice,
            product_url: productUrl.startsWith('http') ? productUrl : `https://www.asos.com${productUrl}`,
            product_photo: productImage,
            product_original_price: originalPrice,
            brand: 'asos',
            icon: 'https://e7.pngegg.com/pngimages/510/48/png-clipart-asos-com-fashion-brand-clothing-online-shopping-others-fashion-logo-thumbnail.png',
          });
        } catch (error) {
          console.error(`Error procesando un producto: ${error}`);
        }
      });

      return products;
    } catch (error) {
      console.error(`Error en la solicitud: ${error}`);
      return [];
    }
  }

  async getNikeProducts(search: string): Promise<Product[]> {
    const url = `https://www.nike.com/es/w?q=${search}&vst=${search}`;
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    };

    try {
      const response = await axios.get(url, { headers });

      if (response.status !== 200) {
        console.error(`Error al hacer la solicitud: ${response.status}`);
        return [];
      }

      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('div.product-card__body').each((_, item) => {
        try {
          const productName = $(item).find('div.product-card__title').text().trim() || 'N/A';
          const productUrl = $(item).find('a.product-card__link-overlay').attr('href') || 'N/A';
          const productImage = $(item).find('product-card__hero-image css-1fxh5tw').attr('src') || 'N/A';

          const currentPrice = $(item).find('product-price is--current-price css-1ydfahe').text().trim() || 'N/A';
          const originalPrice = $(item).find('product-price es__styling is--current-price css-11s12ax').text().trim() || 'N/A';

          products.push({
            product_title: productName,
            product_price: currentPrice || originalPrice,
            product_url: productUrl.startsWith('http') ? productUrl : `https://www.nike.com${productUrl}`,
            product_photo: productImage,
            product_original_price: originalPrice,
            brand: 'nike',
            icon: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/nike-512.png'
          });
        } catch (error) {
          console.error(`Error procesando un producto: ${error}`);
        }
      });

      return products;
    } catch (error) {
      console.error(`Error en la solicitud: ${error}`);
      return [];
    }
  }

  async getPatagoniaProducts(search: string): Promise<Product[]> {
    const url = `https://www.patagonia.com/search/?q=${search}`;
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    };

    try {
      const response = await axios.get(url, { headers });

      if (response.status !== 200) {
        console.error(`Error al hacer la solicitud: ${response.status}`);
        return [];
      }

      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('div.product-tile__content').each((_, container) => {
        try {
          const productName = $(container).find('p.product-tile__name').text().trim() || 'Nombre no disponible';
          const productPrice = $(container).find('div.price').text().trim() || 'Precio no disponible';
          const productImageUrl = $(container).find('meta').attr('content')?.trim() || 'URL de imagen no disponible';
          const productLink = $(container).find('a').attr('href')?.trim() || 'Enlace no disponible';

          products.push({
            product_title: productName,
            product_price: productPrice,
            product_url: productLink.startsWith('http') ? productLink : `https://www.patagonia.com${productLink}`,
            product_photo: productImageUrl,
            brand: 'patagonia',
            icon: 'https://i.pinimg.com/736x/5e/5d/f8/5e5df87c306b242fc92186f2dabc892b.jpg',
          });
        } catch (error) {
          console.error(`Error procesando un producto: ${error}`);
        }
      });

      return products;
    } catch (error) {
      console.error(`Error en la solicitud: ${error}`);
      return [];
    }
  }



  async getCategorieFromProduct(product: string): Promise<ProductCategory> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY_GEMINI}`;
    const headers = { 'Content-Type': 'application/json' };

    const prompt = `
    Quiero que actúes como un clasificadór profesional de productos. 
    Devuelve la categoría del producto en esta estructura JSON:
    {
      "category": "general | clothing | electronics | sports | luxury"
    }
    teniendo en cuenta que el producto es "${product}".
  `;

    const data = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    try {
      const response = await axios.post(url, data, { headers });

      if (response.status !== 200) {
        console.error("Error en la API:", response.data);
        return ProductCategory.GENERAL; // Categoría por defecto
      }

      const responseData = response.data;

      if (!responseData.candidates || !responseData.candidates.length) {
        console.error("No se encontraron candidatos en la respuesta de la API.");
        return ProductCategory.GENERAL; // Categoría por defecto
      }

      const generatedText = responseData.candidates[0].content.parts[0].text;
      const cleanedText = generatedText.replace(/```json|```/g, '').trim();

      let parsedResponse: any;

      try {
        parsedResponse = JSON.parse(cleanedText);
        console.log(parsedResponse)
      } catch (parseError) {
        console.error("Error al parsear el JSON generado:", parseError);
        return ProductCategory.GENERAL; // Categoría por defecto
      }

      const category = parsedResponse.category?.toLowerCase();

      return category in ProductCategory ? ProductCategory[category as keyof typeof ProductCategory] : ProductCategory.GENERAL;

    } catch (error) {
      console.error("Error en la solicitud a la API:", error);
      return ProductCategory.GENERAL; // Categoría por defecto
    }
  }





}

export default ProductsHandler;
