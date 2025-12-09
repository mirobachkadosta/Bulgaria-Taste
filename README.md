# Bulgaria Taste 🍽️

A web platform for discovering and showcasing Bulgarian restaurants. Users can browse restaurants by location and cuisine type, while restaurant owners can create profiles and showcase their establishments.

## 🎯 Project Goal

Bulgaria Taste aims to connect food lovers with authentic Bulgarian restaurants and traditional eateries. The platform provides visibility for local restaurants while helping users discover new dining experiences across Bulgaria.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **UI Components**: Radix UI, Lucide Icons
- **Backend**: Supabase (PostgreSQL database, Authentication, Storage)
- **State Management**: Zustand

## 📋 Database Tables

### `restaurants`

- Stores restaurant information (name, logo, images, location_id, types_of_food, likes, dislikes, creator_email)

### `locations`

- Contains locations/cities (id, name)

### `type_food`

- Contains food/cuisine types (id, name)

### `user`

- User profiles (name, logo, email)

## 🗺️ Application Routes & Endpoints

### Public Routes

#### `/` - Home Page

**Goal**: Landing page introducing the platform  
**Features**:

- Platform introduction
- "How It Works" section
- "Why Us" section
- Latest uploaded restaurants showcase

#### `/restaurants` - Restaurants List

**Goal**: Browse and filter all registered restaurants  
**Features**:

- View all restaurants in a grid layout
- Filter by location (dropdown selector)
- Filter by cuisine type (dropdown selector)
- Clear filters button
- Restaurant cards showing logo, name, location, cuisine types, and like/dislike counts
- Click to view restaurant details

#### `/restaurant/:id/:name` - Restaurant Details

**Goal**: View detailed information about a specific restaurant  
**Features**:

- Restaurant logo, name, and location
- List of cuisine types offered
- Image carousel of restaurant photos
- Like/dislike buttons (interactive voting)
- Real-time like/dislike counter updates

#### `/about` - About Us

**Goal**: Information about the Bulgaria Taste platform  
**Features**:

- Platform mission and vision
- Information for restaurant owners
- Benefits of joining the platform

#### `/contact` - Contact Page

**Goal**: Contact information (currently placeholder)

### Authentication Routes

#### `/login` - Login Page

**Goal**: User authentication  
**Features**:

- Email and password login form
- Supabase authentication integration
- Redirect to home after successful login
- Protected route (redirects if already authenticated)

#### `/register` - Registration Page

**Goal**: New user registration  
**Features**:

- User signup form
- Account creation via Supabase Auth
- Protected route (redirects if already authenticated)

### Protected Routes (Require Authentication)

#### `/profile/:id` - User Profile

**Goal**: Manage user profile and view owned restaurants  
**Features**:

- View and edit user name
- Upload/change profile logo
- View all restaurants created by the user
- Delete owned restaurants
- Profile image stored in Supabase Storage

#### `/add-restaurant` - Add New Restaurant

**Goal**: Restaurant owners can register their establishments  
**Features**:

- Restaurant name input
- Location selection (dropdown from `locations` table)
- Multiple cuisine type selection (checkboxes from `type_food` table)
- Logo upload (single image)
- Multiple restaurant images upload (up to 10)
- Image validation and upload to Supabase Storage
- Form validation
- Creates entry in `restaurants` table with authenticated user's email

## 🔐 Authentication Flow

- Supabase handles user authentication
- `RedirectAuth` component protects login/register routes
- Global state (Zustand) manages user session
- Persistent authentication state across page refreshes
- User email links restaurants to their creators

## 🎨 UI Features

- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Dark/Light Mode**: Theme toggle support
- **Loading States**: Global loading indicator
- **Alert System**: Success and error notifications via toast messages
- **Smooth Navigation**: React Router integration
- **Accessible Components**: Radix UI primitives

## 📝 Key Workflows

### Restaurant Discovery

1. User visits `/restaurants`
2. Filters by location and/or cuisine type
3. Views restaurant cards
4. Clicks for detailed information
5. Can like/dislike restaurants

### Restaurant Registration

1. User registers/logs in
2. Navigates to `/add-restaurant`
3. Fills restaurant information
4. Uploads logo and images
5. Submits form
6. Restaurant appears in public listings

### Profile Management

1. User accesses `/profile/:id`
2. Updates personal information
3. Views owned restaurants
4. Can delete restaurants

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Main Dependencies

- `@supabase/supabase-js` - Backend integration
- `react-router-dom` - Navigation
- `zustand` - State management
- `tailwindcss` - Styling
- `@radix-ui/*` - UI components
- `lucide-react` - Icons
- `embla-carousel-react` - Image carousels
- `sonner` - Toast notifications

## 🌐 External Integrations

- **Supabase**: PostgreSQL database, authentication, and file storage
- All restaurant images and logos stored in Supabase Storage
- Real-time authentication state management

## 👥 User Roles

### Visitors (Unauthenticated)

- Browse restaurants
- View restaurant details
- Like/dislike restaurants

### Registered Users (Authenticated)

- All visitor capabilities
- Add new restaurants
- Manage profile
- Delete owned restaurants

---

**Project Status**: Active Development  
**Language**: Bulgarian (UI text)  
**License**: Private
