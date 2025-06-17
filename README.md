# Elecxo - Premium Electronics E-commerce Website

A modern, responsive e-commerce website built with Next.js, TypeScript, and Tailwind CSS. Features a complete electronics store UI with product catalog, categories, and shopping functionality.

![Elecxo Homepage](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&crop=center)

## 🚀 Features

### ✨ Complete E-commerce UI

- **Responsive Navigation Bar** with logo, menu, search, cart, and user actions
- **Dynamic Hero Section** with rotating banners and call-to-action buttons
- **Category Grid** with 6 product categories (Accessories, Camera, Laptop, Smart Phone, Gaming, Smart Watch)
- **Featured Products Section** with product cards and promotional banners
- **Best Seller Section** with special badges and customer statistics
- **Comprehensive Footer** with company info, links, and social media

### 📄 Product Detail Pages

- **Dynamic Product Pages** with URL-based routing (`/products/[id]`)
- **Image Gallery** with zoom functionality and thumbnail navigation
- **Comprehensive Product Info** including pricing, ratings, and stock status
- **Quantity Selector** with stock validation
- **Product Specifications** with detailed technical information
- **Customer Reviews Section** with rating breakdown and sample reviews
- **Related Products** based on category with seamless navigation
- **Breadcrumb Navigation** for clear site hierarchy
- **Add to Cart & Buy Now** buttons with consistent styling
- **Product Badges** for Best Seller, New, and Discount indicators

### 🎨 Modern Design

- **Mobile-first responsive design** that works on all devices
- **Clean, modern UI** with smooth animations and transitions
- **Professional color scheme** with blue primary colors
- **High-quality product images** from Unsplash
- **Consistent typography** using Geist font family

### 🛠️ Technical Features

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS 4** for styling and responsive design
- **Modular component architecture** for easy maintenance
- **Type-safe development** with comprehensive TypeScript types
- **Mock data structure** ready for API integration
- **Optimized images** with Next.js Image component

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage with all sections
│   └── globals.css        # Global styles and utilities
├── components/            # Reusable React components
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx    # Navigation bar
│   │   ├── Footer.tsx    # Footer component
│   │   └── index.ts      # Layout exports
│   ├── sections/         # Page sections
│   │   ├── HeroSection.tsx        # Hero banner with carousel
│   │   ├── CategorySection.tsx    # Product categories grid
│   │   ├── ProductSection.tsx     # Featured products
│   │   ├── BestSellerSection.tsx  # Best selling products
│   │   └── index.ts              # Section exports
│   ├── ui/               # UI components
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── ProductCard.tsx      # Product display card
│   │   ├── CategoryCard.tsx     # Category display card
│   │   └── index.ts            # UI exports
│   └── index.ts          # Main component exports
├── data/                 # Mock data and utilities
│   ├── categories.json   # Product categories data
│   ├── products.json     # Products data with 8 items
│   └── index.ts         # Data exports and helper functions
├── types/               # TypeScript type definitions
│   ├── product.ts      # Product and cart types
│   ├── category.ts     # Category types
│   └── index.ts        # Type exports
└── lib/                # Utility functions
    └── utils.ts        # Helper functions for formatting, etc.
```

## 🛍️ Product Categories

1. **Accessories** - Phone cases, chargers, and mobile accessories
2. **Camera** - Digital cameras, lenses, and photography equipment
3. **Laptop** - Laptops, notebooks, and portable computers
4. **Smart Phone** - Latest smartphones and mobile devices
5. **Gaming** - Gaming consoles, controllers, and accessories
6. **Smart Watch** - Smartwatches, fitness trackers, and wearables

## 🗂️ Page Structure

### Available Routes

- **Homepage** (`/`) - Main landing page with hero, categories, and featured products
- **Products Listing** (`/products`) - All products with grid layout
- **Product Detail** (`/products/[id]`) - Individual product pages with full details
- **Category Pages** (`/categories/[id]`) - Products filtered by category
- **Dynamic Navigation** - Breadcrumb navigation across all pages

### Product Detail Page Features

- **Image Gallery** with zoom and thumbnail navigation
- **Product Information** with pricing, ratings, and stock status
- **Tabbed Content** for description, specifications, and reviews
- **Quantity Selector** with stock validation
- **Action Buttons** for Add to Cart and Buy Now
- **Related Products** section with category-based recommendations

## 📱 Featured Products

- Apple MacBook Air 15" M2 Chip
- Sony WH-1000XM5 Wireless Headphones
- PlayStation 5 Console
- Apple AirPods Pro (2nd Gen)
- iPhone 15 Pro Max
- Canon EOS R5 Mirrorless Camera
- Apple Watch Series 9
- Samsung Galaxy S24 Ultra

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd e-commerce
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## 🔧 Configuration

### Image Optimization

The project is configured to use Unsplash images. The `next.config.ts` file includes:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
```

## 🎯 API Integration Ready

The project is structured to easily integrate with backend APIs:

### Data Structure

All mock data follows a consistent structure that can be easily replaced with API calls:

```typescript
// Example: Replace mock data with API calls
export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Replace with actual API call
  // const response = await fetch('/api/products?featured=true');
  // return response.json();
  return products.filter((product) => product.isFeatured);
};
```

### Recommended API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/:id` - Remove item from cart

## 🎨 Customization

### Colors

The project uses a blue-based color scheme. To customize:

1. **Primary Colors**: Update blue colors in Tailwind classes
2. **Brand Colors**: Modify the color variables in `globals.css`
3. **Component Themes**: Update individual component styling

### Typography

- **Primary Font**: Geist Sans (Google Fonts)
- **Monospace Font**: Geist Mono
- **Fallbacks**: Arial, Helvetica, sans-serif

### Layout

- **Max Width**: 7xl (1280px) for main content
- **Breakpoints**: Mobile-first responsive design
- **Grid System**: CSS Grid and Flexbox

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Key responsive features:

- Collapsible navigation menu on mobile
- Responsive product grids (1-2-4 columns)
- Optimized touch targets for mobile
- Responsive typography scaling

## 🔍 SEO Optimization

- **Meta Tags**: Comprehensive meta tags in layout
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Image Alt Text**: All images include descriptive alt text
- **Performance**: Optimized images and code splitting

## 🚀 Performance Features

- **Next.js Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **Font Optimization**: Google Fonts optimization with next/font
- **CSS Optimization**: Tailwind CSS purging for minimal bundle size

## 🧪 Testing Recommendations

For production deployment, consider adding:

```bash
# Unit Testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# E2E Testing
npm install --save-dev playwright

# Type Checking
npm run type-check
```

## 📦 Build and Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Unsplash** for high-quality product images
- **Vercel** for hosting and deployment platform

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
