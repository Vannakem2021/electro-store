# Elecxo Admin Dashboard - Comprehensive Planning Document

## 1. Project Overview

The Elecxo Admin Dashboard is a comprehensive administrative interface for managing all aspects of the e-commerce platform. It will maintain visual consistency with the existing Elecxo design system while providing powerful tools for store management.

### Design Principles

- **Visual Consistency**: Maintain teal color scheme, Rubik fonts, rounded-md borders, clean minimal aesthetic
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG 2.1 AA compliance with proper contrast ratios
- **Internationalization**: Full English/Khmer support using existing i18n system
- **User Experience**: Intuitive navigation and efficient workflows

### Technical Foundation

- **Framework**: Next.js 15 + TypeScript
- **State Management**: React Context API with localStorage persistence
- **Styling**: Tailwind CSS v4 with existing design tokens
- **Authentication**: Role-based access control system
- **Data**: Mock data structure foundation with API-ready architecture

## 2. Complete Feature List & Requirements

### 2.1 Core Management Features

#### Product Management

- **CRUD Operations**: Create, read, update, delete products
- **Bulk Operations**: Import/export, bulk edit, bulk delete
- **Inventory Tracking**: Stock levels, low stock alerts, reorder points
- **Variant Management**: Colors, sizes, storage options with pricing
- **Image Management**: Multiple images, gallery management, image optimization
- **SEO Management**: Meta titles, descriptions, keywords
- **Category Assignment**: Multiple categories, featured products
- **Pricing Management**: Regular prices, discounts, promotional pricing

#### Category Management

- **Hierarchical Categories**: Parent/child relationships, unlimited depth
- **Category Attributes**: Icons, descriptions, SEO settings
- **Display Management**: Sort order, visibility, featured categories
- **Bulk Operations**: Move products, merge categories

#### Order Management

- **Order Processing**: View, edit, update order status
- **Fulfillment Tracking**: Shipping labels, tracking numbers
- **Payment Management**: Payment status, refunds, partial payments
- **Customer Communication**: Order updates, shipping notifications
- **Returns & Exchanges**: RMA management, return processing

#### Customer Management

- **Customer Profiles**: Personal information, order history
- **Account Management**: Account status, password resets
- **Communication Tools**: Email campaigns, notifications
- **Segmentation**: Customer groups, loyalty programs
- **Support Tickets**: Customer service integration

#### Inventory Management

- **Stock Tracking**: Real-time inventory levels
- **Warehouse Management**: Multiple locations, transfers
- **Supplier Management**: Vendor information, purchase orders
- **Automated Alerts**: Low stock, out of stock notifications
- **Inventory Reports**: Stock valuation, movement reports

### 2.2 Analytics & Reporting

#### Sales Analytics

- **Revenue Tracking**: Daily, weekly, monthly, yearly reports
- **Product Performance**: Best sellers, slow movers, profit margins
- **Customer Analytics**: Acquisition, retention, lifetime value
- **Geographic Reports**: Sales by region, shipping analytics
- **Trend Analysis**: Seasonal patterns, growth metrics

#### Dashboard Widgets

- **Key Metrics**: Revenue, orders, customers, conversion rates
- **Real-time Data**: Live sales, active users, inventory alerts
- **Quick Actions**: Recent orders, pending tasks, notifications
- **Performance Charts**: Interactive graphs and visualizations

### 2.3 System Administration

#### User Management

- **Admin Accounts**: Role-based permissions, access control
- **Role Management**: Custom roles, permission sets
- **Activity Logging**: Admin actions, login history
- **Security Settings**: Two-factor authentication, session management

#### Settings & Configuration

- **Store Settings**: Basic information, contact details, policies
- **Payment Configuration**: Payment gateways, currency settings
- **Shipping Settings**: Zones, rates, methods
- **Tax Configuration**: Tax rates, rules, exemptions
- **Email Templates**: Order confirmations, notifications
- **System Maintenance**: Backups, updates, performance monitoring

## 3. Detailed Page Structure & Navigation

### 3.1 Main Navigation Structure

```
Admin Dashboard
├── Dashboard (Overview)
├── Products
│   ├── All Products
│   ├── Add Product
│   ├── Categories
│   ├── Inventory
│   └── Bulk Actions
├── Orders
│   ├── All Orders
│   ├── Pending Orders
│   ├── Shipped Orders
│   └── Returns
├── Customers
│   ├── All Customers
│   ├── Customer Groups
│   └── Support Tickets
├── Analytics
│   ├── Sales Reports
│   ├── Product Reports
│   ├── Customer Reports
│   └── Traffic Analytics
├── Marketing
│   ├── Promotions
│   ├── Coupons
│   ├── Email Campaigns
│   └── SEO Tools
├── Settings
│   ├── Store Settings
│   ├── Payment Settings
│   ├── Shipping Settings
│   ├── Tax Settings
│   └── User Management
└── System
    ├── Backups
    ├── Logs
    ├── Performance
    └── Updates
```

### 3.2 Page Layouts

#### Dashboard Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Admin Header (Logo, Search, Notifications, Profile)    │
├─────────────────────────────────────────────────────────┤
│ Sidebar │ Main Content Area                             │
│ Nav     │ ┌─────────────────────────────────────────┐   │
│         │ │ Page Header (Title, Actions, Breadcrumb)│   │
│         │ ├─────────────────────────────────────────┤   │
│         │ │ Content Area                            │   │
│         │ │ (Tables, Forms, Charts, Cards)          │   │
│         │ │                                         │   │
│         │ │                                         │   │
│         │ └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### Responsive Behavior

- **Desktop**: Full sidebar navigation, multi-column layouts
- **Tablet**: Collapsible sidebar, adaptive grid layouts
- **Mobile**: Hidden sidebar with hamburger menu, single-column layouts

## 4. Component Architecture & Reusable Elements

### 4.1 Layout Components

#### AdminLayout

- **Purpose**: Main layout wrapper for all admin pages
- **Features**: Sidebar navigation, header, responsive behavior
- **Props**: `children`, `title`, `breadcrumbs`

#### AdminSidebar

- **Purpose**: Navigation sidebar with collapsible sections
- **Features**: Active state management, role-based visibility
- **Props**: `collapsed`, `onToggle`, `userRole`

#### AdminHeader

- **Purpose**: Top navigation bar with user actions
- **Features**: Search, notifications, profile dropdown
- **Props**: `user`, `notifications`, `onLogout`

### 4.2 Data Display Components

#### DataTable

- **Purpose**: Reusable table component for listing data
- **Features**: Sorting, filtering, pagination, bulk actions
- **Props**: `data`, `columns`, `actions`, `pagination`

#### StatsCard

- **Purpose**: Dashboard metric display cards
- **Features**: Icon, title, value, trend indicator
- **Props**: `title`, `value`, `icon`, `trend`, `color`

#### Chart

- **Purpose**: Data visualization component
- **Features**: Multiple chart types, responsive, interactive
- **Props**: `type`, `data`, `options`, `height`

### 4.3 Form Components

#### FormField

- **Purpose**: Standardized form input wrapper
- **Features**: Label, validation, error display
- **Props**: `label`, `error`, `required`, `children`

#### ImageUpload

- **Purpose**: Product image upload component
- **Features**: Drag & drop, preview, multiple files
- **Props**: `multiple`, `maxFiles`, `onUpload`, `preview`

#### RichTextEditor

- **Purpose**: Product description editor
- **Features**: WYSIWYG editing, HTML output
- **Props**: `value`, `onChange`, `placeholder`

### 4.4 UI Components (Extending Existing)

#### AdminButton

- **Purpose**: Extended button component for admin actions
- **Features**: Loading states, confirmation dialogs
- **Props**: `variant`, `size`, `loading`, `confirm`

#### Modal

- **Purpose**: Overlay dialogs for forms and confirmations
- **Features**: Responsive, keyboard navigation, backdrop
- **Props**: `isOpen`, `onClose`, `title`, `children`

#### Notification

- **Purpose**: Toast notifications for admin actions
- **Features**: Auto-dismiss, action buttons, queue management
- **Props**: `type`, `message`, `duration`, `actions`

## 5. Data Models & API Requirements

### 5.1 Extended Data Models

#### Admin User Model

```typescript
interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  permissions: Permission[];
  isActive: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string; // 'create' | 'read' | 'update' | 'delete'
}
```

#### Order Management Model

```typescript
interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";
type FulfillmentStatus =
  | "unfulfilled"
  | "partial"
  | "fulfilled"
  | "shipped"
  | "delivered";
```

### 5.2 API Endpoints Structure

#### Authentication Endpoints

- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/me` - Get current admin user
- `POST /api/admin/auth/refresh` - Refresh token

#### Product Management Endpoints

- `GET /api/admin/products` - List products with filters
- `POST /api/admin/products` - Create new product
- `GET /api/admin/products/:id` - Get product details
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/products/bulk` - Bulk operations

#### Order Management Endpoints

- `GET /api/admin/orders` - List orders with filters
- `GET /api/admin/orders/:id` - Get order details
- `PUT /api/admin/orders/:id` - Update order
- `POST /api/admin/orders/:id/fulfill` - Fulfill order
- `POST /api/admin/orders/:id/refund` - Process refund

#### Analytics Endpoints

- `GET /api/admin/analytics/dashboard` - Dashboard metrics
- `GET /api/admin/analytics/sales` - Sales reports
- `GET /api/admin/analytics/products` - Product performance
- `GET /api/admin/analytics/customers` - Customer analytics

### 5.3 State Management Structure

#### Admin Context

```typescript
interface AdminContextType {
  user: AdminUser | null;
  permissions: Permission[];
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
}
```

#### Dashboard Context

```typescript
interface DashboardContextType {
  metrics: DashboardMetrics;
  isLoading: boolean;
  refreshMetrics: () => Promise<void>;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}
```

## 6. Implementation Phases & Priorities

### Phase 1: Foundation (Week 1-2)

**Priority: Critical**

- [ ] Admin authentication system
- [ ] Basic admin layout and navigation
- [ ] Role-based access control
- [ ] Admin dashboard overview page
- [ ] Basic product listing and management

### Phase 2: Core Management (Week 3-4)

**Priority: High**

- [ ] Complete product CRUD operations
- [ ] Category management system
- [ ] Order management interface
- [ ] Customer management basic features
- [ ] Inventory tracking system

### Phase 3: Advanced Features (Week 5-6)

**Priority: Medium**

- [ ] Analytics and reporting dashboard
- [ ] Bulk operations for products
- [ ] Advanced order fulfillment
- [ ] Email notification system
- [ ] Settings and configuration pages

### Phase 4: Enhancement (Week 7-8)

**Priority: Low**

- [ ] Advanced analytics and charts
- [ ] Marketing tools and promotions
- [ ] System administration tools
- [ ] Performance optimization
- [ ] Advanced search and filtering

## 7. Authentication & Security Considerations

### 7.1 Authentication Strategy

- **JWT-based Authentication**: Secure token-based system
- **Role-based Access Control**: Granular permissions system
- **Session Management**: Secure session handling with refresh tokens
- **Two-factor Authentication**: Optional 2FA for enhanced security

### 7.2 Security Measures

- **Input Validation**: Comprehensive validation on all inputs
- **SQL Injection Prevention**: Parameterized queries and ORM usage
- **XSS Protection**: Content sanitization and CSP headers
- **CSRF Protection**: Token-based CSRF prevention
- **Rate Limiting**: API rate limiting to prevent abuse
- **Audit Logging**: Comprehensive logging of admin actions

### 7.3 Permission System

```typescript
const PERMISSIONS = {
  PRODUCTS: {
    CREATE: "products:create",
    READ: "products:read",
    UPDATE: "products:update",
    DELETE: "products:delete",
  },
  ORDERS: {
    CREATE: "orders:create",
    READ: "orders:read",
    UPDATE: "orders:update",
    DELETE: "orders:delete",
    FULFILL: "orders:fulfill",
    REFUND: "orders:refund",
  },
  CUSTOMERS: {
    READ: "customers:read",
    UPDATE: "customers:update",
    DELETE: "customers:delete",
  },
  ANALYTICS: {
    READ: "analytics:read",
  },
  SETTINGS: {
    READ: "settings:read",
    UPDATE: "settings:update",
  },
  USERS: {
    CREATE: "users:create",
    READ: "users:read",
    UPDATE: "users:update",
    DELETE: "users:delete",
  },
};
```

## 8. File Structure & Organization

### 8.1 Directory Structure

```
src/
├── app/
│   ├── admin/                    # Admin routes
│   │   ├── layout.tsx           # Admin layout wrapper
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── products/            # Product management
│   │   ├── orders/              # Order management
│   │   ├── customers/           # Customer management
│   │   ├── analytics/           # Analytics pages
│   │   ├── settings/            # Settings pages
│   │   └── auth/                # Admin authentication
├── components/
│   ├── admin/                   # Admin-specific components
│   │   ├── layout/             # Admin layout components
│   │   ├── forms/              # Admin form components
│   │   ├── tables/             # Data table components
│   │   ├── charts/             # Chart components
│   │   └── ui/                 # Admin UI components
├── contexts/
│   ├── AdminContext.tsx         # Admin authentication
│   ├── DashboardContext.tsx     # Dashboard state
│   └── PermissionContext.tsx    # Permission management
├── hooks/
│   ├── useAdmin.ts              # Admin authentication hook
│   ├── usePermissions.ts        # Permission checking hook
│   └── useAdminApi.ts           # Admin API calls hook
├── lib/
│   ├── admin-api.ts             # Admin API functions
│   ├── permissions.ts           # Permission utilities
│   └── admin-utils.ts           # Admin utility functions
└── types/
    ├── admin.ts                 # Admin-related types
    ├── orders.ts                # Order management types
    └── analytics.ts             # Analytics types
```

## 9. Implementation Progress

### Phase 1: Foundation (Week 1-2) - IN PROGRESS

- [x] **Admin authentication system** - COMPLETED
- [x] **Role-based access control** - COMPLETED
- [x] Basic admin layout and navigation - COMPLETED
- [x] Admin dashboard overview page - COMPLETED
- [x] **Basic product listing and management** - COMPLETED

### Implementation Status

**Current Feature**: Basic Product Listing and Management - COMPLETED

- ✅ AdminContext with comprehensive authentication state management
- ✅ Admin login page with role-based access and demo credentials
- ✅ Complete admin layout structure (AdminLayout, AdminSidebar, AdminHeader)
- ✅ Permission checking hooks and utilities (usePermissions)
- ✅ Permission-based UI components (PermissionGate, AccessDenied, RoleBadge, PermissionsList, ProtectedRoute)
- ✅ Role-based dashboard with dynamic content based on user permissions
- ✅ Comprehensive product management system with DataTable, filtering, sorting, and pagination
- ✅ Product detail view with complete product information display
- ✅ Admin-specific product types and data structures
- ✅ StatusBadge component for visual status indicators
- ✅ Following existing authentication and design patterns

**Phase 1 Foundation**: COMPLETED - Ready for Phase 2 Core Management

## 10. Next Steps

1. **Review and Approval**: Review this planning document and approve the approach
2. **Environment Setup**: Set up admin-specific routing and authentication
3. **Foundation Implementation**: Begin with Phase 1 implementation
4. **Iterative Development**: Implement features in phases with regular reviews
5. **Testing and Refinement**: Comprehensive testing and user feedback integration

This comprehensive plan provides a solid foundation for building a professional, scalable admin dashboard that maintains consistency with the existing Elecxo design system while providing powerful management capabilities.
