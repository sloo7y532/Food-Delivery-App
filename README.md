# 🍔 Food Delivery App

A modern, full-featured food delivery mobile application built with React Native, Expo, and Appwrite. This app provides a seamless experience for users to browse menus, customize orders, and manage their cart.

![Food Delivery App](assets/readme/hero.png)

## ✨ Features

### 🔐 Authentication

- User registration and login
- Secure session management with Appwrite
- Protected routes for authenticated users
- Avatar generation with user initials

### 🍕 Menu & Browsing

- Browse food items by categories (Burgers, Pizza, Wraps, etc.)
- Search functionality with real-time filtering
- Detailed item views with nutritional information
- High-quality food images and descriptions

### 🛒 Shopping Cart

- Add items to cart with customizations
- Quantity management (increase/decrease)
- Support for toppings and side dishes
- Real-time cart total calculation
- Persistent cart state across app sessions

### 🎨 UI/UX

- Modern, clean design with custom components
- Consistent typography using Quicksand font family
- Responsive layout with platform-specific optimizations
- Smooth animations and transitions
- Dark mode support ready

### 📱 Navigation

- Tab-based navigation (Home, Search, Cart, Profile)
- Stack navigation for detailed views
- Authentication flow handling
- Deep linking support

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Backend**: Appwrite (Database, Authentication, Storage)
- **State Management**: Zustand
- **Styling**: TailwindCSS with NativeWind
- **Navigation**: Expo Router
- **TypeScript**: Full type safety
- **Error Tracking**: Sentry

## 📁 Project Structure

```
Food-Delivery-App/
├── app/                          # App screens and layouts
│   ├── (auth)/                   # Authentication screens
│   │   ├── Sign-in.tsx
│   │   ├── Sign-up.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                   # Main app tabs
│   │   ├── index.tsx             # Home screen
│   │   ├── Search.tsx            # Search screen
│   │   ├── Cart.tsx              # Cart screen
│   │   ├── Profile.tsx           # Profile screen
│   │   └── _layout.tsx
│   ├── MealDetails.tsx           # Item detail screen
│   ├── _layout.tsx               # Root layout
│   └── global.css                # Global styles
├── components/                   # Reusable UI components
│   ├── CustomButton.tsx          # Button component
│   ├── CustomInput.tsx           # Input field component
│   ├── MenuCard.tsx              # Menu item card
│   ├── CartItems.tsx             # Cart item component
│   ├── Filter.tsx                # Category filter
│   ├── SearchBar.tsx             # Search input
│   └── ...
├── lib/                          # Core utilities and services
│   ├── appwrite.ts               # Appwrite configuration and API calls
│   ├── useAppwrite.ts            # Custom hook for API calls
│   ├── data.ts                   # Demo data for seeding
│   └── seed.ts                   # Database seeding utility
├── store/                        # State management
│   ├── auth.store.ts             # Authentication state
│   └── cart-store.ts             # Shopping cart state
├── constant/                     # App constants and assets
│   └── index.ts                  # Images, categories, and static data
├── assets/                       # Static assets
│   ├── icons/                    # UI icons
│   ├── images/                   # App images
│   └── fonts/                    # Custom fonts
├── type.d.ts                     # TypeScript type definitions
└── Configuration files...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Appwrite server (local or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/food-delivery-app.git
   cd food-delivery-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

4. **Configure Appwrite**
   - Set up an Appwrite project
   - Create the required collections (see Database Schema section)
   - Configure authentication providers
   - Set up storage bucket for images

5. **Start the development server**

   ```bash
   npx expo start
   ```

6. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

### Database Setup

The app requires several Appwrite collections. Use the seeding utility to populate your database:

```bash
# Run the seed script (make sure to update the seed.ts file with your data)
npm run seed
```

## 📊 Database Schema

### Collections

1. **Users** (`userCollectionId`)
   - `name`: string
   - `email`: string
   - `avatar`: string
   - `accountid`: string (reference to Appwrite auth)

2. **Categories** (`categoryCollectionId`)
   - `name`: string
   - `description`: string

3. **Menu Items** (`menuCollectionId`)
   - `name`: string
   - `description`: string
   - `price`: number
   - `image_url`: string
   - `calories`: number
   - `protein`: number
   - `rating`: number
   - `categories`: string (reference to category)

4. **Customizations** (`customizationCollectionId`)
   - `name`: string
   - `price`: number
   - `type`: string

5. **Menu Customizations** (`menuCustomizationCollectionId`)
   - `menu`: string (reference to menu item)
   - `customizations`: string (reference to customization)

## 🎨 Design System

### Colors

- **Primary**: `#FE8C00` (Orange brand color)
- **Dark**: `#181C2E` (Primary text)
- **Gray**: `#878787` (Secondary text)
- **Error**: `#F14141` (Error states)
- **Success**: `#2F9B65` (Success states)

### Typography

- **Font Family**: Quicksand (Regular, Bold, SemiBold, Light, Medium)
- **Text Styles**: Defined in global.css with consistent sizing

### Components

All components follow a consistent design pattern:

- Proper spacing and margins
- Platform-specific styling when needed
- Accessibility considerations
- Reusable and composable

## 🔧 Key Features Implementation

### State Management

- **Authentication**: Zustand store managing user state and session
- **Cart**: Zustand store handling cart items, quantities, and customizations
- **Real-time updates**: Automatic UI updates when state changes

### Navigation

- **Tab Navigation**: Bottom tab bar with custom icons and styling
- **Stack Navigation**: Nested navigation for detailed views
- **Authentication Guard**: Automatic redirection based on auth state

### API Integration

- **Custom Hook**: `useAppwrite` for consistent API call handling
- **Error Handling**: Global error management with user-friendly messages
- **Loading States**: Automatic loading indicators for all async operations

## 📱 Screenshots

_Add screenshots of your app here_

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** for the amazing development platform
- **Appwrite Team** for the backend-as-a-service solution
- **NativeWind Team** for bringing Tailwind to React Native
- **Design Inspiration** from modern food delivery apps

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact:

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

**Built with ❤️ using React Native and Expo**
