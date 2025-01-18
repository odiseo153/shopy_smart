import { Product } from "@/app/Interfaces/Products";
import { CardGrid } from "../Cards/grid/CardGrid";


  const recommendedProducts:Product[] = [
  {
    product_url: 'https://www.aliexpress.us/item/3256807978801614.html?spm=a2g0o.productlist.main.3.3f9a98Gb98GbKq&algo_pvid=613fa1c9-4246-4abd-82d4-574b428da7e7&algo_exp_id=613fa1c9-4246-4abd-82d4-574b428da7e7-1&pdp_npi=4%40dis%21USD%211499.00%211424.05%21%21%211499.00%211424.05%21%4021015b2417369734777188101eeacd%2112000044055282242%21sea%21US%216023605077%21X&curPageLogUid=IL4eSxgPzU9Q&utparam-url=scene%3Asearch%7Cquery_from%3A',
    product_photo: 'https://ae-pic-a1.aliexpress-media.com/kf/S25842548041b48569db0ac90964622den.png_220x220.png_.avif',
    product_title: 'LILLIPUT Q17 Monito 4K 12G-SDI HD 2.0 12G SFP Production Broadcast 7.3 inch HDR Monitor With Waveform PIP Mode Remote Terminal',
    product_price: '$1,424.05',
    product_star_rating: 4.8,
    brand: 'aliexpress',
    icon: 'https://c0.klipartz.com/pngpicture/900/512/gratis-png-iconos-del-ordenador-fuente-aliexpress-thumbnail.png',
  },
    {
      product_url: 'https://www.gearbest.ma/product/modern-design-adjustable-office-chair-ergonomic-chair-office-massage-chair-for-office/',
      product_photo: 'https://www.gearbest.ma/wp-content/uploads/2024/12/S4236773a33fb42318a796d7fcb09376bf.jpg_640x640.jpg_.webp',
      product_title: 'modern design adjustable office chair ergonomic chair office massage chair for office',
      product_price: '$963.30',
      product_star_rating: 4.5,
      brand: 'gearbest',
      icon: 'https://www.gearbest.ma/wp-content/uploads/2023/12/favicon-gearbest-100x100.ico',

    },
    {
      product_url: 'https://es.aliexpress.com/item/3256807880722738.html?spm=a2g0o.productlist.main.3.4d910Kv50Kv5SV&algo_pvid=d78071aa-f780-4d3c-8966-2e471f59ea11&algo_exp_id=d78071aa-f780-4d3c-8966-2e471f59ea11-1&pdp_npi=4%40dis%21USD%214.20%210.99%21%21%2130.72%217.22%21%4021010c9a17369719814262623eb715%2112000043518797681%21sea%21US%210%21ABX&curPageLogUid=J2pLRrj2Kijd&utparam-url=scene%3Asearch%7Cquery_from%3A',
      product_photo: 'https://th.bing.com/th/id/OIP.sFqUPcF5ztXnhTbRtYBAdQHaHa?rs=1&pid=ImgDetMain',
      product_title: 'Relojes digitales deportivos LED para hombre, reloj electrónico Simple con esfera cuadrada pequeña, banda de silicona, reloj informal de moda para hombre, montre homme',
      product_price: '$0.99',
      product_star_rating: 4.8,
      brand: 'aliexpress',
      icon: 'https://c0.klipartz.com/pngpicture/900/512/gratis-png-iconos-del-ordenador-fuente-aliexpress-thumbnail.png',
},
    {
      product_url: 'https://www.ebay.com/itm/375921177280?_skw=bag&itmmeta=01JHNTBXFJ80XKCW1D4FCHD3HV&hash=item5786a5f2c0:g:S5QAAOSwTqlnhFkU&itmprp=enc%3AAQAJAAAA4HoV3kP08IDx%2BKZ9MfhVJKnqWC80oVNg4T9na0fjRsHKtImqsTb%2BYlaV3KELb6AqLe3LAZr01r9W8dbIcqJjOXwYSElbshXstUzygIDtR8xcsGwOAwq5cLL%2FyZW0DBAM7vVUTBI07aoyVtcQSaeiwGy8M5jBYCDg7iKvabXmlGHPQLBaZgb9DRjHHZ0Em3RHRqWzazWVcHCqP41fvMF1JCrfUOvfKbe27uZySNhgdfQA5AQ7U0gTdyHOJRqrdzDrZibm0m%2Ffk%2FCcp%2BXtPjPHH81SDd%2FNUASSA3Nhe%2BpWea2w%7Ctkp%3ABFBMtNivuo1l',
      product_photo: 'https://i.ebayimg.com/images/g/S5QAAOSwTqlnhFkU/s-l1600.webp',
      product_title: '"Mochila de cuero genuino de 16"" marrón oscuro bolso hecho a mano, mochila bolso de cuero real".-',
      product_price: '$54.00',
      product_star_rating: 4.3,
      brand: 'ebay',
      icon: 'https://w7.pngwing.com/pngs/622/371/png-transparent-ebay-logo-ebay-sales-amazon-com-coupon-online-shopping-ebay-logo-text-logo-number.png',

    },
    {
      product_url: 'https://www.walmart.com/sp/track?bt=1&eventST=click&plmt=sp-search-middle~desktop~&pos=1&tax=3944_1089430_7052607_9433123_1411576&rdf=1&rd=https%3A%2F%2Fwww.walmart.com%2Fip%2FWireless-Mouse-2-4GHz-with-USB-Receiver-1200-DPI-Optical-Tracking-5-Buttons-Ambidextrous-PC-Mac-Laptop-Red%2F6455800070%3FclassType%3DVARIANT%26adsRedirect%3Dtrue&adUid=8b45eee8-f042-4300-993b-c99be09170c8&mloc=sp-search-middle&pltfm=desktop&pgId=mouse&pt=search&spQs=5u0mt1qT0LfJBsf_eaCiPJDfj_r1nnagetdR5LIVZWsiUsNj9U1vZ1YuALDt7O28zL-88XkobUMZBeLweJlHhmR7mgq_4mBT427l2u4pWj1ZNgrLFJU14Mhccv6a0Iw_-EPauAtAs-wH-vpLjezjVE3MjO6QGZSA00EJBWOJyRTrmbJOSnCcsX4qE0r7P_KXWBK4V53e178n0c_NTb0Njn2sLKKs9cIt9xYJgqzbvnhnCcq2CLbcqedix_C2YFKGb6fOI22j5pRBlbcoqeNDeP9CW0sfUJZnqA0mzTgxc4I&storeId=3081&couponState=na&bkt=ace1_default%7Cace2_default%7Cace3_default%7Ccoldstart_off%7Csearch_default&classType=VARIANT',
      product_photo: 'https://i5.walmartimages.com/seo/Wireless-Mouse-2-4GHz-with-USB-Receiver-1200-DPI-Optical-Tracking-5-Buttons-Ambidextrous-PC-Mac-Laptop-Red_83f3ef55-6cb5-43fa-b39f-3812c31b1fae.3b964b29525a5697b8661ea5f5c9d315.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
      product_title: 'Ratón Inalámbrico, 2,4 Ghz con Receptor USB, Seguimiento Óptico de 1200 Ppp, 5 Botones, Pc/mac/portátil Ambidiestro - Rojo',
      product_price: '$11.09',
      product_star_rating: 4.7,
      brand: 'walmart',
      icon: 'https://e7.pngegg.com/pngimages/45/625/png-clipart-yellow-logo-illustration-walmart-logo-grocery-store-retail-asda-stores-limited-icon-walmart-logo-miscellaneous-company-thumbnail.png',
 }
  ];


export default function RecommendedProductsSection() {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recommendedProducts.map((product, i) => (
            <CardGrid key={i} product={product}/>
          ))}
        </div>
      </section>
    );
  }
  