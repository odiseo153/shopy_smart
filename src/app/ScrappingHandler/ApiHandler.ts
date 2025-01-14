import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { Product } from '../Interfaces/Products';

dotenv.config();

const API_KEY_GEMINI = process.env.API_KEY_GEMINI;


class ProductScraper {
  private headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
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

  async getAmazonProducts(query: string): Promise<Product[] | null> {
    const url = 'https://real-time-amazon-data.p.rapidapi.com/search';
    const params = {
      query,
      page: '7',
      country: 'US',
      sort_by: 'RELEVANCE',
      product_condition: 'ALL',
      is_prime: 'false',
      deals_and_discounts: 'NONE',
    };

    const headers = {
      'x-rapidapi-key': 'f80d59416bmshba4d1c3787cc46ep101db5jsndb95bb993bc7',
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
    };

    try {
      const response = await axios.get(url, { headers, params });
      return response.data?.data?.products || null;
    } catch (e) {
      console.error(`Error fetching Amazon products: ${e}`);
      return null;
    }
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

      console.log(products);
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

      console.log(products);
      return products;
    } catch (error) {
      console.error(`Error en la solicitud: ${error}`);
      return [];
    }
  }

}

export default ProductScraper;
