# Ngọc Hải Đường - Jewelry E-commerce Website

A modern, responsive jewelry e-commerce website built with React, featuring jade bracelets and premium jewelry products.

## 🚀 Live Demo

**Website**: https://jewelery-web-51890.web.app

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **State Management**: Redux Toolkit
- **UI Library**: Ant Design
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Backend**: Firebase
- **Hosting**: Firebase Hosting
- **Analytics**: Firebase Analytics

## 📦 Firebase Integration

This project is fully integrated with Firebase services:

- **Firebase Hosting**: Live website deployment
- **Firebase Analytics**: User behavior tracking
- **Firestore**: Database (ready for implementation)
- **Firebase Auth**: Authentication (ready for implementation)
- **Firebase Storage**: File storage (ready for implementation)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jewelery-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Firebase Setup

1. **Install Firebase CLI** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy to Firebase**
   ```bash
   npm run deploy
   ```
   
   Or deploy only hosting:
   ```bash
   npm run deploy:hosting
   ```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Page components
│   ├── homepage/       # Homepage components
│   ├── collection-page/ # Collection page
│   └── product-detail/ # Product detail page
├── store/              # Redux store and slices
├── firebase/           # Firebase configuration and services
│   ├── config.js       # Firebase initialization
│   └── services.js     # Firebase service functions
├── data/               # Static data (JSON files)
└── design-system/      # Design system components
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run deploy` - Build and deploy to Firebase
- `npm run deploy:hosting` - Deploy only hosting

## 🌟 Features

### Homepage
- **Hero Section**: Showcases featured jade bracelets
- **Best Seller Section**: Displays popular products
- **New Arrivals Section**: Shows latest products
- **Featured Products Section**: Complete product catalog
- **Testimonials Section**: Customer reviews

### Collection Page
- **Advanced Filtering**: Search, price range, material, etc.
- **Sorting Options**: Name, price, newest, rating
- **Grid/List View**: Toggle between view modes
- **Pagination**: Efficient product browsing

### Product Detail Page
- **Product Images**: High-quality product photos
- **Detailed Information**: Specifications, materials, pricing
- **Related Products**: Similar product suggestions

### Navigation
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Enhanced user experience
- **SEO Optimized**: Proper meta tags and structure

## 🔥 Firebase Services

### Current Implementation
- ✅ **Firebase Hosting**: Live website deployment
- ✅ **Firebase Analytics**: User tracking
- ✅ **Firebase Config**: Proper initialization

### Ready for Implementation
- 🔄 **Firestore**: Replace static JSON data
- 🔄 **Firebase Auth**: User authentication
- 🔄 **Firebase Storage**: Product image storage
- 🔄 **Firebase Functions**: Backend API

## 📊 Analytics

Firebase Analytics is integrated and tracking:
- Page views
- User interactions
- Product views
- Navigation patterns

## 🔒 Security

- Firebase security rules ready for implementation
- Environment variables for sensitive data
- HTTPS enforced on production

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design System

- Consistent color palette
- Typography hierarchy
- Component library
- Spacing system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For any questions or support, please contact the development team.

---

**Live Website**: https://jewelery-web-51890.web.app
**Firebase Console**: https://console.firebase.google.com/project/jewelery-web-51890/overview
