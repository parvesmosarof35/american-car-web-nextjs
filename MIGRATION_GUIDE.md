# React to Next.js Migration Guide

## Overview
Your React/Vite application has been successfully migrated to Next.js 16 with the App Router. This guide explains the key structural changes and how to complete the migration.

## Key Changes

### 1. State Management
- **Redux Store**: Moved from `src/Redux/store.js` to `lib/store.ts`
- **Auth Slice**: Moved from `src/Redux/Slice/authSlice.js` to `lib/slices/auth-slice.ts`
- **RTK Query Base API**: Moved from `src/Redux/api/baseApi.js` to `lib/api/base-api.ts`
- **Providers**: Created `app/providers.tsx` for Redux + Persist setup

### 2. Routing Structure
\`\`\`
Old (React Router):
src/routes/Route.jsx → createBrowserRouter

New (Next.js App Router):
app/(public)/           → Pages with navbar/footer
app/(auth)/             → Auth pages without navbar
app/userdashboard/      → Protected dashboard routes
\`\`\`

### 3. Component File Structure
\`\`\`
Old:
src/shared/Navbar/Navbar.jsx
src/shared/Footer/Footer.jsx
src/pages/Home/Home.jsx

New:
components/shared/navbar.tsx
components/shared/footer.tsx
components/pages/home/index.tsx
\`\`\`

### 4. API Configuration
- API base URL: `lib/config.ts`
- Auth API endpoints: `lib/api/auth-api.ts`
- All RTK Query hooks available through the new API files

## What You Need to Do

### 1. Move Your Page Components
Copy your page components from `src/pages/` to `components/pages/`:
\`\`\`bash
components/
├── pages/
│   ├── home/
│   │   └── index.tsx
│   ├── auth/
│   │   ├── login/index.tsx
│   │   └── sign-up/index.tsx
│   └── [other pages...]
\`\`\`

### 2. Move Shared Components
Copy from `src/shared/` to `components/shared/`:
\`\`\`bash
components/
├── shared/
│   ├── blog-card/
│   ├── custom-banner/
│   ├── buttons/
│   └── [other shared...]
\`\`\`

### 3. Create RTK Query API Endpoints
Convert your Redux API slices to RTK Query endpoints:
\`\`\`typescript
// Before (src/Redux/api/PlatesApis/allListedPlatesApi.js)
export const allPlatesApi = baseApi.injectEndpoints({...})

// After (lib/api/plates-api.ts)
export const platesApi = baseApi.injectEndpoints({...})
\`\`\`

### 4. Update Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Update with your actual API URLs
3. Ensure `NEXT_PUBLIC_*` prefixed vars are used only for client-side

### 5. WebSocket Connection
The WebSocket URL is auto-detected on the client side:
\`\`\`typescript
import { getWsUrl } from '@/lib/config'

const wsUrl = getWsUrl() // Auto-picks wss:// or ws://
\`\`\`

### 6. Update Imports
Replace React Router imports:
\`\`\`typescript
// OLD
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

// NEW
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
\`\`\`

## Protected Routes

### For Private Routes (Auth Required)
\`\`\`typescript
import PrivateRoute from '@/components/protected/private-route'

export default function Page() {
  return (
    <PrivateRoute>
      <YourComponent />
    </PrivateRoute>
  )
}
\`\`\`

### For Premium Routes (Subscription Required)
\`\`\`typescript
import PremiumRoute from '@/components/protected/premium-route'

export default function Page() {
  return (
    <PremiumRoute>
      <YourComponent />
    </PremiumRoute>
  )
}
\`\`\`

## Hooks Usage

### Redux Hooks
\`\`\`typescript
import { useAppDispatch } from '@/lib/hooks/use-app-dispatch'
import { useAppSelector } from '@/lib/hooks/use-app-selector'

const dispatch = useAppDispatch()
const token = useAppSelector(state => state.auth.token)
\`\`\`

### Navigation
\`\`\`typescript
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()

router.push('/path')
\`\`\`

## Remaining Tasks

1. **Convert all page components** from `src/pages/` to `components/pages/`
2. **Convert all shared components** from `src/shared/` to `components/shared/`
3. **Convert all API slices** from `src/Redux/api/` to `lib/api/`
4. **Create layout components** for dashboard sections
5. **Update all imports** throughout the codebase
6. **Test authentication flow**
7. **Test protected routes**
8. **Deploy to Vercel**

## Deployment

1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## Support Files

- `lib/store.ts` - Redux store configuration
- `lib/config.ts` - API URLs and utility functions
- `app/providers.tsx` - Redux + Toast + Persist setup
- `lib/hooks/` - Custom Redux hooks
