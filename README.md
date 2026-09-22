# 🌸 AdeyBloom - Beauty Products E-commerce Frontend

A modern, responsive React-based frontend for a beauty products e-commerce platform. Built with cutting-edge technologies and designed specifically for Ethiopian users with bilingual support (English/Amharic).

## ✨ Features

### 🛍️ Core E-commerce Features
- **Product Catalog** - Browse and search beauty products with advanced filtering
- **Shopping Cart** - Add, update, remove items with persistent storage
- **Wishlist** - Save favorite products for later purchase
- **User Authentication** - Secure login/register with JWT tokens
- **Order Management** - Complete checkout process with order tracking
- **User Profile** - Manage personal information and order history

### 🌍 Localization & Accessibility
- **Bilingual Support** - Full English and Amharic (አማርኛ) translation
- **Cultural Awareness** - Designed for Ethiopian market and preferences
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Modern UI/UX** - Clean, intuitive interface with smooth animations

### 💳 Payment Integration
- **Chapa Payment Gateway** - Secure Ethiopian payment processing
- **Multiple Payment Methods** - Support for various local payment options
- **Real-time Payment Status** - Instant payment confirmation and callbacks

### 👨‍💼 Admin Panel
- **Dashboard** - Overview of sales, orders, and system metrics
- **Product Management** - CRUD operations for products and categories
- **Order Management** - Track and update order statuses
- **User Management** - Manage customer accounts and roles
- **Contact Management** - Handle customer inquiries and support

## 🛠️ Tech Stack

- **Dynamic Testimonials** - Live customer reviews carousel (falls back to curated static samples if API empty)
- **React 19** - Latest React with modern hooks and features
- **Vite** - Fast build tool and development server
- **Remote-First Fallback** - Automatic switch from production API to local dev API on network / 5xx failure (with manual override helpers)
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Comprehensive icon library
- **Context API** - Global state management for auth, cart, wishlist
- **Axios** - HTTP client for API communication
- **Axios Remote-First Strategy** - Auto-fallback from production API to local dev API on network/5xx failure

### Authentication
- HTTP-only cookie based (no manual token injection required in requests)
- `AuthContext` calls `/auth/me` on mount to hydrate user state

### Error Handling
- 404 on remote before fallback triggers a console hint to check that the environment base is missing `/api`.
- Product fetch gracefully substitutes demo products if initial load fails, keeping the homepage populated.

## 📁 Project Structure

```
AdeyBloom-ecommerce-clientSide/
├── Admin-side/                          # Admin dashboard (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── SalesChart.jsx       # Dashboard sales chart
│   │   │   │   └── TopProducts.jsx      # Dashboard top products
│   │   │   ├── AppProviders.jsx         # Auth + Toast provider wrapper
│   │   │   ├── LoadingSpinner.jsx       # Global loading spinner
│   │   │   ├── ProtectedAdminRoute.jsx  # Admin route guard
│   │   │   └── Toast.jsx               # Toast notification component
│   │   ├── config/
│   │   │   └── axios.js                # Axios instance with remote-first fallback
│   │   ├── context/
│   │   │   ├── AuthContext.jsx          # Authentication state
│   │   │   ├── ToastContext.jsx         # Toast notification state
│   │   │   ├── TranslationContext.jsx   # i18n state (EN/AM)
│   │   │   └── useAuth.js              # Auth hook
│   │   ├── i18n/
│   │   │   └── translation.js          # English/Amharic translations
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx           # Admin login page
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx   # Dashboard overview
│   │   │       ├── AdminLayout.jsx      # Sidebar + header layout wrapper
│   │   │       ├── ContactManagement.jsx# Customer inquiries
│   │   │       ├── OrdersPanel.jsx      # Order management
│   │   │       ├── ProductsPanel.jsx    # Product CRUD
│   │   │       ├── Settings.jsx         # Store settings
│   │   │       └── UsersPanel.jsx       # User management
│   │   ├── routes/
│   │   │   └── index.jsx               # Admin router
│   │   ├── services/
│   │   │   ├── admin.service.js         # Admin API calls
│   │   │   ├── auth.service.js          # Auth API calls
│   │   │   └── contactService.js        # Contact API calls
│   │   ├── index.css
│   │   └── main.jsx                     # Entry point
│   └── .env                             # VITE_API_BASE_URL, keys
│
├── Client-side/                         # Customer-facing storefront (React + Vite)
│   ├── src/
│   │   ├── assets/                      # Images, product photos
│   │   ├── components/
│   │   │   ├── AddressManagement.jsx    # Address form/management
│   │   │   ├── AppProviders.jsx         # Context provider wrapper
│   │   │   ├── CartItem.jsx             # Single cart item row
│   │   │   ├── CartSummary.jsx          # Cart totals sidebar
│   │   │   ├── CheckoutForm.jsx         # Checkout form
│   │   │   ├── CTASection.jsx           # Call-to-action section
│   │   │   ├── FeaturedProducts.jsx     # Homepage featured grid
│   │   │   ├── Footer.jsx              # Site footer
│   │   │   ├── HeroSection.jsx          # Homepage hero carousel
│   │   │   ├── ImageUpload.jsx          # Image upload component
│   │   │   ├── LoadingSpinner.jsx       # Global loading spinner
│   │   │   ├── Navbar.jsx              # Top navigation bar
│   │   │   ├── OrderDetails.jsx         # Single order detail view
│   │   │   ├── OrderList.jsx            # Order history list
│   │   │   ├── ProductCard.jsx          # Product display card
│   │   │   ├── ProductSkeleton.jsx      # Loading placeholder
│   │   │   ├── SearchBar.jsx            # Product search
│   │   │   ├── Testimonials.jsx         # Customer reviews carousel
│   │   │   ├── Toast.jsx               # Toast notification
│   │   │   └── WishlistButton.jsx       # Add-to-wishlist button
│   │   ├── config/
│   │   │   └── axios.js                # Axios with remote-first fallback
│   │   ├── context/
│   │   │   ├── AuthContext.jsx          # Authentication state
│   │   │   ├── CartContext.jsx          # Shopping cart state
│   │   │   ├── ToastContext.jsx         # Toast notification state
│   │   │   ├── TranslationContext.jsx   # i18n state (EN/AM)
│   │   │   ├── useAuth.js              # Auth hook
│   │   │   ├── UserContext.jsx          # User profile state
│   │   │   ├── useRequireAuth.js       # Protected route hook
│   │   │   └── WishlistContext.jsx      # Wishlist state
│   │   ├── i18n/
│   │   │   └── translation.js          # English/Amharic translations
│   │   ├── layouts/
│   │   │   └── RootLayout.jsx          # Main app layout
│   │   ├── pages/
│   │   │   ├── AboutUs.jsx              # About page
│   │   │   ├── Cart.jsx                 # Shopping cart
│   │   │   ├── Checkout.jsx             # Checkout flow
│   │   │   ├── ContactUs.jsx            # Contact form
│   │   │   ├── FAQ.jsx                  # FAQ page
│   │   │   ├── HomePage.jsx             # Landing page
│   │   │   ├── NotFound.jsx             # 404 page
│   │   │   ├── OrderConfirmation.jsx    # Order success
│   │   │   ├── OrderHistory.jsx         # Past orders
│   │   │   ├── ProductDetails.jsx       # Single product view
│   │   │   ├── ProductListing.jsx       # Product catalog
│   │   │   ├── Shipping.jsx             # Shipping info
│   │   │   ├── SignIn.jsx               # Sign in page
│   │   │   ├── SignUp.jsx               # Sign up page
│   │   │   ├── UserProfile.jsx          # User profile
│   │   │   ├── Wishlist.jsx             # Wishlist page
│   │   │   └── WishlistPage.jsx         # Wishlist alt route
│   │   ├── payment/
│   │   │   ├── CallbackPage.jsx         # Chapa payment callback
│   │   │   └── SuccessPage.jsx          # Payment success
│   │   ├── routes/
│   │   │   ├── index.jsx               # Main router
│   │   │   └── ProtectedRoute.jsx       # Auth route guard
│   │   ├── services/
│   │   │   ├── auth.service.js          # Auth API calls
│   │   │   ├── cartService.js           # Cart API calls
│   │   │   ├── categoryService.js       # Category API calls
│   │   │   ├── contactService.js        # Contact form API
│   │   │   ├── orderService.js          # Order API calls
│   │   │   ├── productService.js        # Product API calls
│   │   │   ├── profileService.js        # Profile API calls
│   │   │   ├── reviewService.js         # Review API calls
│   │   │   └── wishlistService.js       # Wishlist API calls
│   │   ├── index.css
│   │   └── main.jsx                     # Entry point
│   └── .env                             # VITE_API_BASE_URL, keys
│
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AdeyBloom-ecommerce-clientSide
   ```

2. **Install dependencies for Client-side**
   ```bash
   cd Client-side
   npm install
   ```

3. **Install dependencies for Admin-side**
   ```bash
   cd ../Admin-side
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in each app's root directory:

   **Client-side** (`Client-side/.env`):
   ```env
   VITE_API_BASE_URL=https://adeybloom-ecommerce-backend-1.onrender.com
   VITE_API_BASE_URL_LOCAL=http://localhost:5000
   VITE_CHAPA_PUBLIC_KEY=your_chapa_public_key
   ```

   **Admin-side** (`Admin-side/.env`):
   ```env
   VITE_API_BASE_URL=https://adeybloom-ecommerce-backend-1.onrender.com
   VITE_API_BASE_URL_LOCAL=http://localhost:5000
   VITE_CHAPA_PUBLIC_KEY=your_chapa_public_key
   ```

   > The API base URL should NOT include `/api` — the axios config appends it automatically.

5. **Start development servers**
   ```bash
   # Client-side (port 5173)
   cd Client-side && npm run dev

   # Admin-side (port 5174)
   cd Admin-side && npm run dev
   ```

### Build for Production

```bash
# Client-side
cd Client-side && npm run build

# Admin-side
cd Admin-side && npm run build
```

## 🌐 API Integration

The frontend communicates with the backend API through:

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT tokens stored in HTTP-only cookies
- **Error Handling**: Centralized error management with user-friendly messages

### Key API Endpoints
- `POST /auth/login` - User authentication
- `GET /products` - Fetch products with filtering
- `POST /cart` - Add items to cart
- `POST /orders` - Create new orders
- `GET /orders/my-orders` - User order history

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Purple/pink gradient theme (#C585D7)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable, accessible UI components

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Seamless tablet experience
- **Desktop**: Full-featured desktop interface
- **Touch Friendly**: Large touch targets and gestures

### Animations
- **Page Transitions**: Smooth navigation between pages
- **Loading States**: Engaging loading animations
- **Micro-interactions**: Hover effects and button animations
- **Form Feedback**: Real-time validation and feedback

## 🌍 Internationalization

### Supported Languages
- **English** - Primary language
- **Amharic (አማርኛ)** - Ethiopian language support

### Translation Features
- **Dynamic Language Switching** - Real-time language toggle
- **Context-Aware Translations** - Proper cultural adaptations
- **Persistent Language Selection** - Remembers user preference
- **Fallback System** - Graceful handling of missing translations
- **Currency Formatting** - Ethiopian Birr (ETB) support

## 💳 Payment Integration

### Chapa Payment Gateway
- **Ethiopian Payment Processing** - Local payment gateway
- **Multiple Payment Methods** - Bank transfers, mobile money
- **Secure Transactions** - PCI compliant payment processing
- **Real-time Callbacks** - Instant payment status updates
- **Test Mode Support** - Development and testing capabilities

### Payment Flow
1. User completes checkout form
2. Order is created in the system
3. Redirect to Chapa payment gateway
4. Payment processing
5. Callback to success/failure page
6. Order status update

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Role-based access control
- **Input Validation** - Client-side form validation
- **XSS Protection** - Sanitized user inputs
- **HTTPS Ready** - Production-ready security headers

## 📱 Mobile Features

- **Progressive Web App** - PWA capabilities
- **Responsive Design** - Mobile-optimized interface
- **Touch Gestures** - Swipe navigation and interactions
- **Mobile Payments** - Optimized mobile payment flow

## 🧪 Testing & Quality

- **ESLint Configuration** - Code quality enforcement
- **Component Testing** - Unit tests for critical components
- **Performance Monitoring** - Core Web Vitals tracking
- **Accessibility Testing** - WCAG compliance

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel** - Recommended for React apps
- **Netlify** - Easy deployment with CI/CD
- **AWS S3 + CloudFront** - Scalable cloud deployment
- **Docker** - Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Samuel Aemro** - *Lead Developer* - [@samuelAemro12](https://github.com/samuelAemro12)
- **davee1625** - *Developer* - [@davee1625](https://github.com/davee1625)

## 🙏 Acknowledgments

- Ethiopian beauty industry for inspiration
- React community for excellent documentation
- Tailwind CSS for the amazing utility framework
- Chapa for Ethiopian payment gateway integration

---

**AdeyBloom** - Empowering Ethiopian beauty through technology 🌸
