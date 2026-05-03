import logo from '../assets/brand/big-bites-logo.png';
import heroFood from '../assets/images/hero-food.svg';

import mayonnaiseImg from '../assets/menu/Mayonnaise.png';
import pattasChickenLegImg from '../assets/menu/Pattas-Chicken-Leg.png';
import malaiChickenLegImg from '../assets/menu/Malai-chicken.png';
import tandooriBBQImg from '../assets/menu/Tandoori-BBQ.png';
import lemonMintMojitoImg from '../assets/menu/Lemon-mint-mojito.png';
import cottonCandyMojitoImg from '../assets/menu/Cotton-candy-mojito.png';
import blueCuracaoMojitoImg from '../assets/menu/Blue-Curacao-Mojito.png';
import chickenWings2Img from '../assets/menu/Chicken-Wings-2.png';
import hariyaliKebabImg from '../assets/menu/Hariyali-Kebab.png';
import specialPooriShawarmaImg from '../assets/menu/Spcl-Poori-Shawarma.png';
import hariyaliTikkaImg from '../assets/menu/Hariyali-Tikka.png';
import chickenWings3Img from '../assets/menu/Chicken-Wings-3.png';
import malaiKebabImg from '../assets/menu/Malai-Kebab.png';
import hariyaliChickenLegImg from '../assets/menu/Hariyali-Chicken.png';
import reshmiLegImg from '../assets/menu/Reshmi-Leg.png';
import seekhKebabImg from '../assets/menu/Seekh-Kebab.png';
import plainLegImg from '../assets/menu/Plain-Leg.png';
import malaiBBQImg from '../assets/menu/Malai-BBQ.png';
import plainBBQImg from '../assets/menu/Plain-BBQ.png';
import chickenWings5Img from '../assets/menu/Chicken-Wings-5.png';
import specialAlfahamChickenImg from '../assets/menu/Spcl-Alfaham-Chicken.png';
import specialChickenChipsImg from '../assets/menu/Spcl-Chicken-Chips.png';
import bubbleGumMojitoImg from '../assets/menu/Bubble-Gum-Mojito.png';
import malaiTikkaImg from '../assets/menu/Malai-Tikka.png';
import chickenTikkaImg from '../assets/menu/Chicken-Tikka.png';
import cheeseShawarmaImg from '../assets/menu/cheese_shawarma.png';
import chilliGarlicShawarmaImg from '../assets/menu/chilli_garlic_shawarma.png';
import classicShawarmaImg from '../assets/menu/classic_shawarma.png';
import greenPepperBBQImg from '../assets/menu/green_pepper_bbq_chicken.png';
import mexicanShawarmaImg from '../assets/menu/mexican_shawarma.png';
import pepperBBQImg from '../assets/menu/pepper_bbq_chicken.png';
import periPeriBBQImg from '../assets/menu/peri_peri_bbq_chicken.png';
import periPeriShawarmaImg from '../assets/menu/peri-peri-shawarma.png';
import schezwanShawarmaImg from '../assets/menu/schezwan_shawarma.png';
import specialBunShawarmaImg from '../assets/menu/Spcl-Bun-Shawarma.png';

export const brand = {
  name: 'Big Bites',
  shortName: 'BigBites',
  tagline: 'Premium Shawarma, BBQ & Mojitos',
  subTagline: 'Fresh Shawarma, BBQ & Mojitos',
  logo,
  heroFood,
  phoneDisplay: '+91 73970 45556',
  phoneRaw: '7397045556',
  phoneHref: 'tel:+917397045556',
  whatsappNumber: '917397045556',
  website: 'thebigbites.in',
  websiteUrl: 'https://www.thebigbites.in/',
  email: 'hello@thebigbites.in',
  address: 'BiG BiTES, Tiruvallur, Tamil Nadu',
  locationLine: 'Tiruvallur | Sriperumbudur | Pattabiram | Andhra',
  mapsUrl: 'https://www.google.com/maps/place/BiG+BiTES/@13.1222788,79.9113846,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52910059b00881:0xc910340e9da106a8!8m2!3d13.1222788!4d79.9113846!16s%2Fg%2F11vwvwbx9v',
  mapsEmbed: 'https://www.google.com/maps?q=13.1222788,79.9113846&z=17&output=embed',
  instagram: 'https://www.instagram.com/big.bites_official?igsh=MWV1NTYwOW1rOHFuMw==',
  youtube: 'https://www.youtube.com/@BigBites-Official',
};

export const outletStats = [
  { value: '2024', label: 'Brand started' },
  { value: '9+', label: 'Outlets running' },
  { value: '50K+', label: 'Customers served' },
];

export const businessStats = [
  { value: '3', label: 'Own outlets' },
  { value: '6', label: 'Franchise outlets' },
  { value: '₹2.6L', label: 'Franchise investment' },
  { value: 'Fast', label: 'Local demand' },
];

export const branchOptions = [
  { name: 'Tiruvallur Main', area: 'Tiruvallur', whatsapp: '917397045556', type: 'Own outlet' },
  { name: 'Sriperumbudur', area: 'Sriperumbudur', whatsapp: '917397045556', type: 'Franchise' },
  { name: 'Pattabiram', area: 'Pattabiram', whatsapp: '917397045556', type: 'Franchise' },
  { name: 'Uthukottai', area: 'Uthukottai', whatsapp: '917397045556', type: 'Franchise' },
  { name: 'Andhra', area: 'Andhra', whatsapp: '917397045556', type: 'Franchise' },
];

export const storeHours = {
  openHour: 11,
  closeHour: 23,
  label: '11:00 AM – 11:00 PM',
};

export function getStoreStatus(now = new Date()) {
  const hour = now.getHours() + now.getMinutes() / 60;
  const isOpen = hour >= storeHours.openHour && hour < storeHours.closeHour;
  return {
    isOpen,
    label: isOpen ? 'Open Now' : 'Closed Now',
    helper: isOpen ? 'Accepting pickup and delivery orders' : 'Pre-order now for the next opening time',
    hours: storeHours.label,
  };
}

export const categories = [
  { name: 'Special', slug: 'special', route: '/menu#special', caption: 'Big Bites exclusives', icon: 'sparkles' },
  { name: 'Shawarma', slug: 'shawarma', route: '/menu#shawarma', caption: 'Signature rolls', icon: 'wrap' },
  { name: 'BBQ', slug: 'bbq', route: '/menu#bbq', caption: 'Smoky grilled', icon: 'flame' },
  { name: 'Mojitos', slug: 'mojitos', route: '/menu#mojitos', caption: 'Fresh chillers', icon: 'cup' },
  { name: 'Cart', slug: 'cart', route: '/cart', caption: 'Checkout order', icon: 'cart' },
];

export const menuFilters = ['All', 'Special', 'Shawarma', 'BBQ', 'Leg', 'Kebab', 'Wings', 'Tikka', 'Mojitos', 'Add-ons'];

const shawarma100 = [
  { label: 'Roll', price: 100 },
  { label: 'Special Roll', price: 130 },
  { label: 'Plate', price: 150 },
  { label: 'Special Plate', price: 170 },
];

const bbq130 = [
  { label: 'Quarter', price: 130 },
  { label: 'Half', price: 240 },
  { label: 'Full', price: 430 },
];

export const menuItems = [
  { id: 1, category: 'Special', slug: 'special', name: 'Poori Shawarma (6)', price: '₹100', variants: [{ label: '6 Pieces', price: 100 }], image: specialPooriShawarmaImg, tag: 'Special', description: 'Big Bites special poori shawarma platter with 6 pieces.', spice: 1 },
  { id: 2, category: 'Special', slug: 'special', name: 'Bun Shawarma', price: '₹120', variants: [{ label: 'Bun', price: 120 }], image: specialBunShawarmaImg, tag: 'Special', description: 'A unique shawarma-style filling served inside a soft toasted bun.', spice: 1 },
  { id: 3, category: 'Special', slug: 'special', name: 'Chicken Chips Pack', price: '₹130 (Without Chips)', variants: [{ label: 'Pack without chips', price: 130 }], image: specialChickenChipsImg, tag: 'Crunchy', description: 'Big Bites special chicken chips pack with bold masala flavour.', spice: 2 },
  { id: 4, category: 'Special', slug: 'special', name: 'Alfaham BBQ', price: '₹130 • ₹240 • ₹430', variants: bbq130, image: specialAlfahamChickenImg, tag: 'Hot Pick', description: 'Special alfaham barbeque available in multiple portion sizes.', spice: 2 },

  { id: 5, category: 'Shawarma', slug: 'shawarma', name: 'Classic Shawarma', price: 'Roll ₹90 • Plate ₹140 • Spl Plate ₹160', variants: [{ label: 'Roll', price: 90 }, { label: 'Plate', price: 140 }, { label: 'Special Plate', price: 160 }], image: classicShawarmaImg, tag: 'Signature', description: 'Classic shawarma wrap from the core Big Bites menu.', spice: 1 },
  { id: 6, category: 'Shawarma', slug: 'shawarma', name: 'Mexican Shawarma', price: 'Roll ₹100 • Spl Roll ₹130 • Plate ₹150 • Spl Plate ₹170', variants: shawarma100, image: mexicanShawarmaImg, tag: 'Popular', description: 'A bolder shawarma with extra flavour and premium upgrade options.', spice: 2 },
  { id: 7, category: 'Shawarma', slug: 'shawarma', name: 'Peri Peri Shawarma', price: 'Roll ₹100 • Spl Roll ₹130 • Plate ₹150 • Spl Plate ₹170', variants: shawarma100, image: periPeriShawarmaImg, tag: 'Spicy', description: 'Peri peri style shawarma with a stronger spicy kick.', spice: 3 },
  { id: 8, category: 'Shawarma', slug: 'shawarma', name: 'Cheese Shawarma', price: 'Roll ₹100 • Spl Roll ₹130 • Plate ₹150 • Spl Plate ₹170', variants: shawarma100, image: cheeseShawarmaImg, tag: 'Cheesy', description: 'Creamy cheese-forward shawarma with premium serving options.', spice: 1 },
  { id: 9, category: 'Shawarma', slug: 'shawarma', name: 'Schezwan Shawarma', price: 'Roll ₹100 • Spl Roll ₹130 • Plate ₹150 • Spl Plate ₹170', variants: shawarma100, image: schezwanShawarmaImg, tag: 'Hot', description: 'Schezwan-inspired shawarma with a spicy street-style flavour profile.', spice: 3 },
  { id: 10, category: 'Shawarma', slug: 'shawarma', name: 'Chilli Garlic Shawarma', price: 'Roll ₹100 • Spl Roll ₹130 • Plate ₹150 • Spl Plate ₹170', variants: shawarma100, image: chilliGarlicShawarmaImg, tag: 'Garlic', description: 'Chilli-garlic style shawarma with a punchy savoury finish.', spice: 3 },

  { id: 11, category: 'BBQ', slug: 'bbq', name: 'Plain BBQ', price: 'Quarter ₹120 • Half ₹230 • Full ₹430', variants: [{ label: 'Quarter', price: 120 }, { label: 'Half', price: 230 }, { label: 'Full', price: 430 }], image: plainBBQImg, tag: 'Classic', description: 'Classic barbeque chicken available in quarter, half, and full portions.', spice: 1 },
  { id: 12, category: 'BBQ', slug: 'bbq', name: 'Pepper BBQ', price: 'Quarter ₹130 • Half ₹240 • Full ₹430', variants: bbq130, image: pepperBBQImg, tag: 'Popular', description: 'Pepper-seasoned barbeque chicken with smoky flavour.', spice: 2 },
  { id: 13, category: 'BBQ', slug: 'bbq', name: 'Peri Peri BBQ', price: 'Quarter ₹130 • Half ₹240 • Full ₹430', variants: bbq130, image: periPeriBBQImg, tag: 'Spicy', description: 'Peri peri barbeque with stronger heat and bold flavour.', spice: 3 },
  { id: 14, category: 'BBQ', slug: 'bbq', name: 'Green Pepper BBQ', price: 'Quarter ₹130 • Half ₹240 • Full ₹430', variants: bbq130, image: greenPepperBBQImg, tag: 'Chef Pick', description: 'Green pepper flavoured barbeque with rich grilled taste.', spice: 2 },
  { id: 15, category: 'BBQ', slug: 'bbq', name: 'Malai BBQ', price: 'Quarter ₹130 • Half ₹240 • Full ₹430', variants: bbq130, image: malaiBBQImg, tag: 'Creamy', description: 'Malai-style creamy barbeque with a softer spice profile.', spice: 1 },
  { id: 16, category: 'BBQ', slug: 'bbq', name: 'Tandoori', price: 'Quarter ₹120 • Half ₹220 • Full ₹400', variants: [{ label: 'Quarter', price: 120 }, { label: 'Half', price: 220 }, { label: 'Full', price: 400 }], image: tandooriBBQImg, tag: 'Tandoori', description: 'Tandoori barbeque in quarter, half, and full portions.', spice: 2 },

  { id: 17, category: 'Leg', slug: 'leg', name: 'Plain Leg (1)', price: '₹50', variants: [{ label: '1 Piece', price: 50 }], image: plainLegImg, tag: 'Single', description: 'Single barbeque-style chicken leg piece.', spice: 1 },
  { id: 18, category: 'Leg', slug: 'leg', name: 'Hariyali Leg (1)', price: '₹70', variants: [{ label: '1 Piece', price: 70 }], image: hariyaliChickenLegImg, tag: 'Herby', description: 'Herb-marinated chicken leg with green masala flavour.', spice: 1 },
  { id: 19, category: 'Leg', slug: 'leg', name: 'Malai Leg (1)', price: '₹70', variants: [{ label: '1 Piece', price: 70 }], image: malaiChickenLegImg, tag: 'Creamy', description: 'Creamy malai-marinated chicken leg piece.', spice: 1 },
  { id: 20, category: 'Leg', slug: 'leg', name: 'Pattas Leg (1)', price: '₹70', variants: [{ label: '1 Piece', price: 70 }], image: pattasChickenLegImg, tag: 'Spiced', description: 'Spiced chicken leg with bolder masala profile.', spice: 2 },
  { id: 21, category: 'Leg', slug: 'leg', name: 'Reshmi Leg (1)', price: '₹70', variants: [{ label: '1 Piece', price: 70 }], image: reshmiLegImg, tag: 'Mild', description: 'Soft, mild, reshmi-style chicken leg preparation.', spice: 1 },

  { id: 22, category: 'Kebab', slug: 'kebab', name: 'Hariyali Kebab (6)', price: '₹100', variants: [{ label: '6 Pieces', price: 100 }], image: hariyaliKebabImg, tag: 'Herby', description: 'Hariyali-marinated kebab portion.', spice: 1 },
  { id: 23, category: 'Kebab', slug: 'kebab', name: 'Malai Kebab (6)', price: '₹100', variants: [{ label: '6 Pieces', price: 100 }], image: malaiKebabImg, tag: 'Creamy', description: 'Creamy malai-style kebab portion.', spice: 1 },
  { id: 24, category: 'Kebab', slug: 'kebab', name: 'Seekh Kebab', price: '₹110', variants: [{ label: 'Regular', price: 110 }], image: seekhKebabImg, tag: 'Grilled', description: 'Seekh-style kebab with bold grilled flavour.', spice: 2 },

  { id: 25, category: 'Wings', slug: 'wings', name: 'Big Bites Wings (2)', price: '₹80', variants: [{ label: '2 Pieces', price: 80 }], image: chickenWings2Img, tag: '2 Pcs', description: 'Crispy, juicy wings in a 2-piece serving.', spice: 2 },
  { id: 26, category: 'Wings', slug: 'wings', name: 'Big Bites Wings (3)', price: '₹110', variants: [{ label: '3 Pieces', price: 110 }], image: chickenWings3Img, tag: '3 Pcs', description: '3-piece serving of Big Bites wings.', spice: 2 },
  { id: 27, category: 'Wings', slug: 'wings', name: 'Big Bites Wings (5)', price: '₹160', variants: [{ label: '5 Pieces', price: 160 }], image: chickenWings5Img, tag: '5 Pcs', description: '5-piece serving for a bigger appetite.', spice: 2 },

  { id: 28, category: 'Tikka', slug: 'tikka', name: 'Hariyali Tikka (6)', price: '₹100', variants: [{ label: '6 Pieces', price: 100 }], image: hariyaliTikkaImg, tag: 'Herby', description: 'Hariyali tikka portion with fresh herb flavour.', spice: 1 },
  { id: 29, category: 'Tikka', slug: 'tikka', name: 'Chicken Tikka (6)', price: '₹100', variants: [{ label: '6 Pieces', price: 100 }], image: chickenTikkaImg, tag: 'Classic', description: 'Classic chicken tikka with grilled masala flavour.', spice: 2 },
  { id: 30, category: 'Tikka', slug: 'tikka', name: 'Malai Tikka (6)', price: '₹100', variants: [{ label: '6 Pieces', price: 100 }], image: malaiTikkaImg, tag: 'Creamy', description: 'Creamy malai tikka with a softer, rich profile.', spice: 1 },

  { id: 31, category: 'Mojitos', slug: 'mojitos', name: 'Blue Curacao', price: '₹70', variants: [{ label: 'Regular', price: 70 }], image: blueCuracaoMojitoImg, tag: 'Refreshing', description: 'Cool and refreshing mojito-style drink.', spice: 0 },
  { id: 32, category: 'Mojitos', slug: 'mojitos', name: 'Cotton Candy', price: '₹70', variants: [{ label: 'Regular', price: 70 }], image: cottonCandyMojitoImg, tag: 'Sweet', description: 'Sweet and colourful mojito-style cooler.', spice: 0 },
  { id: 33, category: 'Mojitos', slug: 'mojitos', name: 'Bubble Gum', price: '₹70', variants: [{ label: 'Regular', price: 70 }], image: bubbleGumMojitoImg, tag: 'Fun', description: 'Fun, sweet cooler with bubble gum flavour.', spice: 0 },
  { id: 34, category: 'Mojitos', slug: 'mojitos', name: 'Lemon Mint', price: '₹70', variants: [{ label: 'Regular', price: 70 }], image: lemonMintMojitoImg, tag: 'Classic', description: 'Classic lemon mint cooler for a fresh finish.', spice: 0 },
  { id: 35, category: 'Add-ons', slug: 'addons', name: 'Extra Mayonnaise', price: '₹20', variants: [{ label: 'Cup', price: 20 }], image: mayonnaiseImg, tag: 'Add-on', description: 'Creamy extra mayonnaise add-on.', spice: 0 },
];

export const featuredItems = menuItems.filter((item) => [1, 5, 8, 12, 31, 34].includes(item.id));

export const cartUpsellIds = [34, 31, 35];
export const cartUpsellItems = menuItems.filter((item) => cartUpsellIds.includes(item.id));

export const orderAddOns = [
  { id: 'mayo', name: 'Extra Mayonnaise', price: 20 },
  { id: 'flakes', name: 'Peri Peri Flakes', price: 10 },
  { id: 'garlic-mayo', name: 'Garlic Mayo', price: 20 },
  { id: 'water', name: 'Water Bottle', price: 20 },
];

export const couponHints = [
  { code: 'BIGBITES10', label: '10% off up to ₹50' },
  { code: 'FAMILY50', label: '₹50 off above ₹499' },
  { code: 'BBNEW20', label: '₹20 off above ₹200' },
  { code: 'SHAWARMA89', label: 'Roll offer note' },
  { code: 'VOTE89', label: 'Election offer note' },
];

export const offers = [
  { title: 'Election Ink Offer', subtitle: 'Show your voting ink proof and enjoy Roll Shawarma at a special price.', price: 'Roll Shawarma ₹89', badge: 'Limited Time', meta: '24 Apr 2026', cta: 'Add coupon VOTE89' },
  { title: 'Cart Coupon', subtitle: 'Add items to cart, enter coupon code and checkout through WhatsApp.', price: 'BIGBITES10', badge: 'App Offer', meta: 'Limited period', cta: 'Use in cart' },
  { title: 'Franchise Partner Pack', subtitle: 'Low investment business model with setup, menu, branding and launch support.', price: '₹2,60,000', badge: 'Partner Offer', meta: 'Apply now', cta: 'Apply for franchise' },
];

export const franchiseBenefits = [
  { title: 'Low Investment', desc: 'A practical startup model designed for fast-food entrepreneurs.' },
  { title: 'High Demand Menu', desc: 'Shawarma, BBQ, wings and mojitos already have strong local demand.' },
  { title: 'Brand & Launch Support', desc: 'Menu support, local campaign ideas and digital growth guidance.' },
  { title: 'Simple Operations', desc: 'Repeatable menu flow and practical systems for day-to-day running.' },
];

export const franchiseSupport = ['Site selection guidance', 'Store design and branding kit', 'Staff training support', 'Vendor onboarding guidance', 'Launch marketing support', 'Ongoing operations review'];

export const investmentCards = [
  { tag: 'Total Investment', value: '₹2,60,000', sub: 'Low-investment entry point for a proven food business model.' },
  { tag: 'Expected Monthly Profit', value: '₹20,000 – ₹35,000', sub: 'Expected first 3 months profit based on execution and location.', highlight: true },
  { tag: 'Business Model', value: 'Low Investment', sub: 'Designed for scalable local growth with controlled startup cost.' },
];

export function createWhatsAppLink(message = 'Hi Big Bites, I need help with an order.') {
  const envNumber = import.meta.env.VITE_FOUNDER_WHATSAPP;
  const cleanEnvNumber = typeof envNumber === 'string' ? envNumber.replace(/\D/g, '') : '';
  const number = cleanEnvNumber.length >= 10 ? cleanEnvNumber : brand.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
