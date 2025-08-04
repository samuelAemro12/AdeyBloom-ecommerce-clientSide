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

### Frontend Framework
- **React 19** - Latest React with modern hooks and features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing and navigation

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Comprehensive icon library
- **Lucide React** - Beautiful, customizable icons
- **Headless UI** - Unstyled, accessible UI components

### State Management & HTTP
- **Context API** - Global state management for auth, cart, wishlist
- **Axios** - HTTP client for API communication
- **Custom Hooks** - Reusable logic for data fetching and state

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **TypeScript Support** - Type definitions for better development

## 📁 Project Structure

```
Client-side/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar with language switcher
│   │   ├── Footer.jsx       # Site footer
│   │   ├── ProductCard.jsx  # Product display card
│   │   ├── SearchBar.jsx    # Product search functionality
│   │   └── LoadingSpinner.jsx
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Landing page with hero section
│   │   ├── ProductDetails.jsx # Individual product view
│   │   ├── ProductListing.jsx # Product catalog with filters
│   │   ├── Cart.jsx         # Shopping cart
│   │   ├── Checkout.jsx     # Checkout with Chapa payment
│   │   ├── UserProfile.jsx  # User account management
│   │   ├── OrderHistory.jsx # Order tracking
│   │   ├── WishlistPage.jsx # Saved products
│   │   ├── AboutUs.jsx      # Company information
│   │   ├── ContactUs.jsx    # Contact form
│   │   ├── FAQ.jsx          # Frequently asked questions
│   │   └── admin/           # Admin panel pages
│   │       ├── AdminDashboard.jsx
│   │       ├── ProductsPanel.jsx
│   │       ├── OrdersPanel.jsx
│   │       ├── UsersPanel.jsx
│   │       ├── ContactManagement.jsx
│   │       └── Settings.jsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state
│   │   ├── CartContext.jsx  # Shopping cart state
│   │   ├── WishlistContext.jsx # Wishlist management
│   │   ├── ToastContext.jsx # Notification system
│   │   └── TranslationContext.jsx # i18n management
│   ├── services/            # API service functions
│   │   ├── authService.js   # Authentication APIs
│   │   ├── productService.js # Product management
│   │   ├── orderService.js  # Order processing
│   │   ├── cartService.js   # Cart operations
│   │   └── contactService.js # Contact form
│   ├── i18n/                # Internationalization
│   │   └── translation.js   # English/Amharic translations
│   ├── routes/              # Routing configuration
│   │   ├── index.jsx        # Main router setup
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── config/              # Configuration files
│   │   └── axios.js         # Axios configuration
│   ├── payment/             # Payment integration
│   │   ├── CallbackPage.jsx # Payment callback handler
│   │   └── SuccessPage.jsx  # Payment success page
│   └── layouts/             # Layout components
│       └── RootLayout.jsx   # Main app layout
├── package.json
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
   cd beauty-products-ecommerce-clientSide/Client-side
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_CHAPA_PUBLIC_KEY=your_chapa_public_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
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

## 🙏 Acknowledgments

- Ethiopian beauty industry for inspiration
- React community for excellent documentation
- Tailwind CSS for the amazing utility framework
- Chapa for Ethiopian payment gateway integration

---

**AdeyBloom** - Empowering Ethiopian beauty through technology 🌸
