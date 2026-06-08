# Product Requirements Document (PRD)
# Huzur Mostar - Backend Implementation

**Version:** 1.0
**Date:** February 3, 2026
**Status:** Planning Phase
**Author:** Development Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Goals & Objectives](#3-goals--objectives)
4. [User Personas](#4-user-personas)
5. [Feature Requirements](#5-feature-requirements)
6. [Technical Specifications](#6-technical-specifications)
7. [Database Schema](#7-database-schema)
8. [API Endpoints](#8-api-endpoints)
9. [Admin Panel Specifications](#9-admin-panel-specifications)
10. [Security Requirements](#10-security-requirements)
11. [Laravel & PHP Beginner Guide](#11-laravel--php-beginner-guide)
12. [Implementation Phases](#12-implementation-phases)
13. [Success Metrics](#13-success-metrics)
14. [Risks & Mitigations](#14-risks--mitigations)
15. [Glossary](#15-glossary)

---

## 1. Executive Summary

### 1.1 Purpose

This document outlines the requirements for implementing a backend system for the Huzur Mostar website, currently a static Angular frontend. The backend will enable dynamic content management, user accounts, and e-commerce capabilities.

### 1.2 Scope

- Admin panel for content management
- Blog post management system
- Media/image library management
- User account system for customers
- Order management system
- RESTful API for Angular frontend integration

### 1.3 Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 21 (existing) |
| Backend Framework | Laravel 11 |
| Admin Panel | Filament 3 |
| Database | MySQL 8.0 |
| Server | PHP 8.2+ |
| Hosting | global.ba (cPanel) |

---

## 2. Project Overview

### 2.1 Current State

The Huzur Mostar website is currently a static Angular application with:
- Server-side rendering (SSR)
- Markdown-based blog posts
- Static images and content
- Contact form via PHP email script
- Deployed on global.ba and Netlify

### 2.2 Desired State

A full-featured website with:
- Dynamic content management through admin panel
- Database-driven blog system
- Centralized media library
- Customer accounts with authentication
- Order placement and tracking
- All hosted on global.ba

### 2.3 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        global.ba Hosting                         │
│                                                                  │
│  ┌─────────────────────┐         ┌─────────────────────────┐    │
│  │                     │         │                         │    │
│  │   Angular Frontend  │  HTTP   │   Laravel Backend       │    │
│  │   ─────────────────│ ◄─────► │   ─────────────────     │    │
│  │                     │  JSON   │                         │    │
│  │   • Landing Page    │         │   • REST API (/api/*)   │    │
│  │   • Blog Display    │         │   • Admin Panel (/admin)│    │
│  │   • Products Page   │         │   • Authentication      │    │
│  │   • User Dashboard  │         │   • File Storage        │    │
│  │   • Order Pages     │         │                         │    │
│  │                     │         │                         │    │
│  └─────────────────────┘         └───────────┬─────────────┘    │
│                                              │                   │
│                                              ▼                   │
│                                  ┌─────────────────────┐         │
│                                  │                     │         │
│                                  │   MySQL Database    │         │
│                                  │   ─────────────────│         │
│                                  │                     │         │
│                                  │   • Users           │         │
│                                  │   • Blog Posts      │         │
│                                  │   • Products        │         │
│                                  │   • Orders          │         │
│                                  │   • Media           │         │
│                                  │   • Site Content    │         │
│                                  │                     │         │
│                                  └─────────────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Goals & Objectives

### 3.1 Business Goals

| Goal | Description | Success Metric |
|------|-------------|----------------|
| G1 | Enable non-technical content updates | Admin can update content without developer |
| G2 | Support future e-commerce | Order system ready for product sales |
| G3 | Build customer relationships | User accounts with order history |
| G4 | Improve content freshness | Blog posts updated weekly |

### 3.2 Technical Objectives

| Objective | Description |
|-----------|-------------|
| O1 | Implement secure authentication for admin and users |
| O2 | Create RESTful API consumed by Angular frontend |
| O3 | Build scalable database schema for future growth |
| O4 | Ensure mobile-responsive admin panel |
| O5 | Implement proper image optimization and storage |

---

## 4. User Personas

### 4.1 Admin User (You)

**Name:** Site Administrator
**Role:** Full system access
**Goals:**
- Manage all blog posts (create, edit, delete, publish)
- Upload and organize images/media
- View and manage customer accounts
- Process and track orders
- Update page content (text, images)

**Technical Skill:** Beginner (no Laravel/PHP experience)

### 4.2 Customer User (Future)

**Name:** Website Visitor / Customer
**Role:** Limited access to own data
**Goals:**
- Create account and login
- Browse products
- Place orders
- View order history
- Update profile information

### 4.3 Guest User

**Name:** Anonymous Visitor
**Role:** Read-only public content
**Goals:**
- View website content
- Read blog posts
- View products
- Contact via form

---

## 5. Feature Requirements

### 5.1 Admin Panel Features

#### 5.1.1 Dashboard
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| AD-01 | Overview Stats | High | Display total users, orders, posts count |
| AD-02 | Recent Activity | Medium | Show recent orders and registrations |
| AD-03 | Quick Actions | Medium | Shortcuts to common tasks |

#### 5.1.2 Blog Management
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| BM-01 | Create Post | High | Rich text editor with image embedding |
| BM-02 | Edit Post | High | Modify existing posts |
| BM-03 | Delete Post | High | Remove posts (soft delete) |
| BM-04 | Publish/Draft | High | Toggle post visibility |
| BM-05 | Featured Image | High | Set main image for post |
| BM-06 | Categories | Medium | Organize posts by category |
| BM-07 | Tags | Low | Add tags for filtering |
| BM-08 | SEO Fields | Medium | Meta title, description, slug |
| BM-09 | Schedule Post | Low | Publish at future date |

#### 5.1.3 Media Library
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| ML-01 | Upload Images | High | Single and bulk upload |
| ML-02 | Browse Media | High | Grid view of all media |
| ML-03 | Delete Media | High | Remove unused images |
| ML-04 | Image Details | Medium | Alt text, title, dimensions |
| ML-05 | Search Media | Medium | Find images by name |
| ML-06 | Collections | Low | Organize into folders |

#### 5.1.4 Page Content Management
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| PC-01 | Edit Homepage Sections | High | Modify hero, features, etc. |
| PC-02 | Edit About Page | Medium | Update about content |
| PC-03 | Edit Contact Info | High | Phone, email, address |
| PC-04 | Manage Banners | Medium | Announcement banners |

#### 5.1.5 User Management
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| UM-01 | View Users | High | List all registered users |
| UM-02 | User Details | High | View individual user info |
| UM-03 | Disable User | Medium | Block problematic accounts |
| UM-04 | User Search | Medium | Find users by name/email |
| UM-05 | Export Users | Low | CSV export of user list |

#### 5.1.6 Order Management
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| OM-01 | View Orders | High | List all orders |
| OM-02 | Order Details | High | View full order information |
| OM-03 | Update Status | High | Change order status |
| OM-04 | Order Search | Medium | Find by order number/customer |
| OM-05 | Order Notes | Medium | Add internal notes |
| OM-06 | Print Invoice | Low | Generate PDF invoice |

### 5.2 Customer Features (Frontend)

#### 5.2.1 Authentication
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| CA-01 | Register | High | Create new account |
| CA-02 | Login | High | Email/password login |
| CA-03 | Logout | High | End session |
| CA-04 | Forgot Password | High | Reset via email |
| CA-05 | Email Verification | Medium | Confirm email address |

#### 5.2.2 User Dashboard
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| UD-01 | View Profile | High | See account information |
| UD-02 | Edit Profile | High | Update name, phone, address |
| UD-03 | Change Password | High | Update password |
| UD-04 | Order History | High | List of past orders |
| UD-05 | Order Details | High | View specific order |

#### 5.2.3 Ordering
| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| OR-01 | Add to Cart | High | Select products |
| OR-02 | View Cart | High | Review selected items |
| OR-03 | Checkout | High | Enter delivery info |
| OR-04 | Place Order | High | Submit order |
| OR-05 | Order Confirmation | High | Confirmation page/email |

### 5.3 Public API Features

| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| API-01 | Get Blog Posts | High | List posts for frontend |
| API-02 | Get Single Post | High | Fetch post by slug |
| API-03 | Get Page Content | High | Fetch editable content |
| API-04 | Get Products | Medium | List products |
| API-05 | Submit Contact | High | Contact form submission |

---

## 6. Technical Specifications

### 6.1 Hosting Environment (global.ba)

| Specification | Value |
|---------------|-------|
| PHP Version | 8.2 or 8.3 (recommended) |
| MySQL Version | 8.0 |
| Control Panel | cPanel |
| SSL | Free Let's Encrypt |
| Storage | SSD (depends on plan) |

### 6.2 Laravel Requirements

| Requirement | Version |
|-------------|---------|
| Laravel | 11.x |
| Filament | 3.x |
| PHP | >= 8.2 |
| Composer | Latest |
| Node.js | >= 18 (for asset building) |

### 6.3 Directory Structure on global.ba

```
/home/username/
├── public_html/                    # Document root
│   ├── index.html                  # Angular app entry
│   ├── main.js                     # Angular bundle
│   ├── styles.css                  # Angular styles
│   ├── assets/                     # Angular assets
│   │   └── img-optimized/
│   ├── api/                        # Laravel public folder (symlink or copy)
│   │   ├── index.php               # Laravel entry point
│   │   ├── .htaccess
│   │   └── storage/                # Public storage symlink
│   └── .htaccess                   # Main routing rules
│
├── laravel-backend/                # Laravel application (outside public)
│   ├── app/
│   │   ├── Models/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   ├── Filament/               # Admin panel resources
│   │   └── Providers/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php                 # API routes
│   │   └── web.php                 # Admin routes
│   ├── resources/
│   ├── storage/
│   │   ├── app/
│   │   │   └── public/             # Uploaded files
│   │   ├── framework/
│   │   └── logs/
│   ├── .env                        # Environment config
│   ├── composer.json
│   └── artisan
│
└── logs/                           # Error logs
```

### 6.4 URL Routing Structure

| URL Pattern | Handler | Description |
|-------------|---------|-------------|
| `/` | Angular | Homepage |
| `/blog` | Angular | Blog listing |
| `/blog/:slug` | Angular | Blog post |
| `/products` | Angular | Products page |
| `/account/*` | Angular | User dashboard |
| `/api/*` | Laravel | REST API endpoints |
| `/admin/*` | Laravel/Filament | Admin panel |

### 6.5 .htaccess Configuration

```apache
# Main .htaccess in public_html

RewriteEngine On
RewriteBase /

# Handle API requests - send to Laravel
RewriteCond %{REQUEST_URI} ^/api
RewriteRule ^api/(.*)$ api/index.php [L]

# Handle Admin requests - send to Laravel
RewriteCond %{REQUEST_URI} ^/admin
RewriteRule ^admin/(.*)$ api/index.php [L]

# Handle Laravel storage/public files
RewriteCond %{REQUEST_URI} ^/storage
RewriteRule ^storage/(.*)$ api/storage/$1 [L]

# Angular SPA fallback - serve index.html for all other routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
```

---

## 7. Database Schema

### 7.1 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     admins      │       │      users      │       │    products     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │       │ id              │
│ name            │       │ name            │       │ name            │
│ email           │       │ email           │       │ slug            │
│ password        │       │ password        │       │ description     │
│ avatar          │       │ phone           │       │ price           │
│ role            │       │ address         │       │ stock           │
│ created_at      │       │ city            │       │ featured_image  │
│ updated_at      │       │ postal_code     │       │ status          │
└─────────────────┘       │ email_verified  │       │ created_at      │
        │                 │ created_at      │       │ updated_at      │
        │                 │ updated_at      │       └────────┬────────┘
        │                 └────────┬────────┘                │
        │                          │                         │
        ▼                          │                         │
┌─────────────────┐                │                         │
│   blog_posts    │                │                         │
├─────────────────┤                │                         │
│ id              │                │                         │
│ title           │                │                         │
│ slug            │                │                         │
│ excerpt         │                │                         │
│ content         │                │                         │
│ featured_image  │                ▼                         │
│ status          │       ┌─────────────────┐                │
│ author_id (FK)──┼──────►│     orders      │                │
│ published_at    │       ├─────────────────┤                │
│ created_at      │       │ id              │                │
│ updated_at      │       │ user_id (FK)────┼────────────────┤
└────────┬────────┘       │ order_number    │                │
         │                │ status          │                │
         │                │ subtotal        │                │
         ▼                │ shipping        │                │
┌─────────────────┐       │ total           │                │
│ blog_categories │       │ shipping_addr   │                │
├─────────────────┤       │ notes           │                │
│ id              │       │ created_at      │                │
│ name            │       │ updated_at      │                │
│ slug            │       └────────┬────────┘                │
│ created_at      │                │                         │
└─────────────────┘                │                         │
                                   ▼                         │
┌─────────────────┐       ┌─────────────────┐                │
│  page_contents  │       │  order_items    │                │
├─────────────────┤       ├─────────────────┤                │
│ id              │       │ id              │                │
│ page_key        │       │ order_id (FK)───┼────────────────┤
│ section_key     │       │ product_id (FK)─┼────────────────┘
│ content (JSON)  │       │ quantity        │
│ updated_at      │       │ unit_price      │
└─────────────────┘       │ total           │
                          └─────────────────┘
┌─────────────────┐
│     media       │
├─────────────────┤
│ id              │
│ filename        │
│ path            │
│ mime_type       │
│ size            │
│ alt_text        │
│ collection      │
│ uploaded_by     │
│ created_at      │
└─────────────────┘
```

### 7.2 Table Definitions

#### 7.2.1 admins
```sql
CREATE TABLE admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

#### 7.2.2 users
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    address VARCHAR(255) NULL,
    city VARCHAR(100) NULL,
    postal_code VARCHAR(20) NULL,
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

#### 7.2.3 blog_posts
```sql
CREATE TABLE blog_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NULL,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255) NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    author_id BIGINT UNSIGNED NOT NULL,
    meta_title VARCHAR(255) NULL,
    meta_description TEXT NULL,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (author_id) REFERENCES admins(id),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    INDEX idx_slug (slug)
);
```

#### 7.2.4 blog_categories
```sql
CREATE TABLE blog_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

CREATE TABLE blog_post_category (
    blog_post_id BIGINT UNSIGNED NOT NULL,
    blog_category_id BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (blog_post_id, blog_category_id),
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (blog_category_id) REFERENCES blog_categories(id) ON DELETE CASCADE
);
```

#### 7.2.5 page_contents
```sql
CREATE TABLE page_contents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    page_key VARCHAR(100) NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    content JSON NOT NULL,
    updated_at TIMESTAMP NULL,

    UNIQUE KEY unique_page_section (page_key, section_key)
);
```

#### 7.2.6 media
```sql
CREATE TABLE media (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT UNSIGNED NOT NULL,
    alt_text VARCHAR(255) NULL,
    title VARCHAR(255) NULL,
    collection VARCHAR(100) DEFAULT 'default',
    uploaded_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,

    FOREIGN KEY (uploaded_by) REFERENCES admins(id) ON DELETE SET NULL,
    INDEX idx_collection (collection),
    INDEX idx_mime_type (mime_type)
);
```

#### 7.2.7 products
```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    short_description VARCHAR(500) NULL,
    price DECIMAL(10, 2) NOT NULL,
    compare_price DECIMAL(10, 2) NULL,
    stock INT DEFAULT 0,
    sku VARCHAR(100) NULL UNIQUE,
    featured_image VARCHAR(255) NULL,
    gallery JSON NULL,
    status ENUM('draft', 'active', 'out_of_stock', 'archived') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,

    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug)
);
```

#### 7.2.8 orders
```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping DECIMAL(10, 2) DEFAULT 0,
    tax DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,

    -- Customer info (for guest checkout or snapshot)
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NULL,

    -- Shipping address
    shipping_address VARCHAR(255) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NULL,
    shipping_country VARCHAR(100) DEFAULT 'Bosnia and Herzegovina',

    notes TEXT NULL,
    admin_notes TEXT NULL,

    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_user_id (user_id),
    INDEX idx_order_number (order_number),
    INDEX idx_created_at (created_at)
);
```

#### 7.2.9 order_items
```sql
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);
```

---

## 8. API Endpoints

### 8.1 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password with token | No |
| GET | `/api/auth/user` | Get current user | Yes |
| PUT | `/api/auth/user` | Update current user | Yes |
| PUT | `/api/auth/password` | Change password | Yes |

### 8.2 Blog Endpoints (Public)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/blog/posts` | List published posts | No |
| GET | `/api/blog/posts/:slug` | Get single post | No |
| GET | `/api/blog/categories` | List categories | No |
| GET | `/api/blog/categories/:slug/posts` | Posts by category | No |

**Query Parameters for `/api/blog/posts`:**
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 10, max: 50)
- `category` - Filter by category slug
- `search` - Search in title and content

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Welcome to Our Blog",
      "slug": "welcome-to-our-blog",
      "excerpt": "This is our first blog post...",
      "featured_image": "/storage/blog/welcome-post.jpg",
      "author": {
        "name": "Admin"
      },
      "category": {
        "name": "News",
        "slug": "news"
      },
      "published_at": "2026-02-01T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 47
  }
}
```

### 8.3 Page Content Endpoints (Public)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/content/:page_key` | Get all sections for page | No |
| GET | `/api/content/:page_key/:section_key` | Get specific section | No |

**Response Example for `/api/content/homepage`:**
```json
{
  "data": {
    "hero": {
      "title": "Welcome to Huzur Mostar",
      "subtitle": "Beautiful flowers for every occasion",
      "image": "/storage/content/hero-image.jpg",
      "cta_text": "Shop Now",
      "cta_link": "/products"
    },
    "about_preview": {
      "title": "About Us",
      "text": "We are a family-owned flower shop...",
      "image": "/storage/content/about-preview.jpg"
    }
  }
}
```

### 8.4 Product Endpoints (Public)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | List active products | No |
| GET | `/api/products/:slug` | Get single product | No |
| GET | `/api/products/featured` | Get featured products | No |

### 8.5 Order Endpoints (Authenticated)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/orders` | List user's orders | Yes |
| GET | `/api/orders/:id` | Get order details | Yes |
| POST | `/api/orders` | Create new order | Yes* |
| POST | `/api/orders/guest` | Guest checkout | No |

*Guest checkout available without authentication

**Create Order Request:**
```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ],
  "shipping": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+387 61 123 456",
    "address": "Some Street 123",
    "city": "Mostar",
    "postal_code": "88000"
  },
  "notes": "Please deliver in the morning"
}
```

### 8.6 Contact Endpoint (Public)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/contact` | Submit contact form | No |

---

## 9. Admin Panel Specifications

### 9.1 Dashboard

**Widgets:**
1. **Statistics Cards**
   - Total Users
   - Total Orders (this month)
   - Total Revenue (this month)
   - Published Blog Posts

2. **Recent Orders Table**
   - Last 5 orders with status
   - Quick link to view details

3. **Recent Users**
   - Last 5 registered users

4. **Quick Actions**
   - New Blog Post button
   - View Orders button

### 9.2 Blog Posts Resource

**List View Columns:**
- Title (searchable)
- Author
- Category
- Status (badge)
- Published Date
- Actions (Edit, Delete)

**Filters:**
- Status (Draft, Published, Archived)
- Category
- Author
- Date Range

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| Title | Text Input | Required, max 255 |
| Slug | Text Input | Auto-generated, unique |
| Excerpt | Textarea | Max 500 |
| Content | Rich Text Editor | Required |
| Featured Image | File Upload | Image, max 2MB |
| Category | Select | Optional |
| Status | Select | Required |
| Published At | DateTime | Optional |
| Meta Title | Text Input | Max 60 |
| Meta Description | Textarea | Max 160 |

### 9.3 Media Library Resource

**Grid View:**
- Thumbnail preview
- Filename
- Upload date
- Size
- Actions (View, Delete)

**Upload:**
- Drag and drop support
- Multiple file upload
- Supported formats: JPG, PNG, WebP, GIF
- Max file size: 5MB

### 9.4 Page Contents Resource

**Organized by Page:**
- Homepage
  - Hero Section
  - Features Section
  - About Preview
  - Contact Info
- About Page
  - Main Content
  - Team Section
- Contact Page
  - Address
  - Working Hours
  - Map Coordinates

**Dynamic JSON Editor** for flexible content structure.

### 9.5 Users Resource

**List View Columns:**
- Name
- Email
- Phone
- City
- Registered Date
- Orders Count
- Status

**Actions:**
- View Details
- View Orders
- Disable/Enable Account

### 9.6 Orders Resource

**List View Columns:**
- Order Number
- Customer Name
- Email
- Total
- Status (color-coded badge)
- Date
- Actions

**Status Colors:**
- Pending: Yellow
- Confirmed: Blue
- Processing: Purple
- Shipped: Orange
- Delivered: Green
- Cancelled: Red

**Detail View:**
- Customer Information
- Shipping Address
- Order Items Table
- Order Timeline
- Admin Notes (editable)
- Status Change Dropdown

### 9.7 Products Resource

**List View Columns:**
- Image (thumbnail)
- Name
- Price
- Stock
- Status
- Featured (toggle)
- Actions

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| Name | Text Input | Required, max 255 |
| Slug | Text Input | Auto-generated, unique |
| Short Description | Textarea | Max 500 |
| Description | Rich Text Editor | Optional |
| Price | Money Input | Required, min 0 |
| Compare Price | Money Input | Optional |
| Stock | Number | Required, min 0 |
| SKU | Text Input | Optional, unique |
| Featured Image | File Upload | Image, max 2MB |
| Gallery | Multiple File Upload | Images, max 5MB each |
| Status | Select | Required |
| Featured | Toggle | Default false |

---

## 10. Security Requirements

### 10.1 Authentication

| Requirement | Implementation |
|-------------|----------------|
| Password Hashing | bcrypt (Laravel default) |
| Session Security | HTTP-only cookies, secure flag |
| CSRF Protection | Laravel CSRF tokens |
| Rate Limiting | 60 requests/minute for auth endpoints |

### 10.2 Authorization

| Role | Permissions |
|------|-------------|
| super_admin | Full access to everything |
| admin | All except user management |
| editor | Blog and media only |

### 10.3 Data Validation

- All inputs validated server-side
- File uploads scanned for malware
- SQL injection prevention via Eloquent ORM
- XSS prevention via Blade templating

### 10.4 API Security

| Measure | Implementation |
|---------|----------------|
| CORS | Configured for your domain only |
| API Rate Limiting | 120 requests/minute |
| Authentication | Laravel Sanctum tokens |

---

## 11. Laravel & PHP Beginner Guide

### 11.1 What is Laravel?

Laravel is a PHP web framework that makes building web applications easier. Think of it like Angular for the backend - it provides structure, tools, and conventions so you don't have to build everything from scratch.

**Key Concepts:**

| Concept | Angular Equivalent | Description |
|---------|-------------------|-------------|
| Routes | app.routes.ts | Define URLs and what handles them |
| Controllers | Components | Handle HTTP requests |
| Models | Interfaces/Types | Represent database tables |
| Migrations | - | Database schema version control |
| Eloquent ORM | - | Interact with database using PHP |
| Blade | Templates | HTML templating (for admin views) |
| Middleware | Guards/Interceptors | Run code before requests |

### 11.2 What is Filament?

Filament is a pre-built admin panel for Laravel. Instead of building forms, tables, and dashboards from scratch, Filament generates them automatically based on your configuration. It's similar to using a UI component library, but for entire admin interfaces.

### 11.3 Local Development Setup

#### Prerequisites

1. **Install PHP 8.2+**
   ```bash
   # macOS with Homebrew
   brew install php

   # Verify installation
   php -v
   ```

2. **Install Composer** (PHP package manager, like npm)
   ```bash
   # macOS with Homebrew
   brew install composer

   # Verify installation
   composer -V
   ```

3. **Install MySQL** (or use MAMP/XAMPP)
   ```bash
   # macOS with Homebrew
   brew install mysql
   brew services start mysql

   # Set root password
   mysql_secure_installation
   ```

#### Create Laravel Project

```bash
# Navigate to projects folder
cd ~/Documents/projects/repos

# Create new Laravel project
composer create-project laravel/laravel huzur-backend

# Enter project directory
cd huzur-backend

# Install Filament
composer require filament/filament

# Install Filament panels
php artisan filament:install --panels

# Create admin user
php artisan make:filament-user
```

#### Project Structure Explained

```
huzur-backend/
├── app/
│   ├── Models/              # Database models (like interfaces)
│   │   └── User.php         # Example: User model
│   ├── Http/
│   │   ├── Controllers/     # Handle HTTP requests
│   │   └── Middleware/      # Request filters
│   ├── Filament/
│   │   └── Resources/       # Admin panel resources
│   └── Providers/           # Service configuration
│
├── config/                  # Configuration files
│   ├── app.php
│   ├── database.php
│   └── filament.php
│
├── database/
│   ├── migrations/          # Database schema changes
│   └── seeders/             # Sample data
│
├── routes/
│   ├── api.php              # API routes (/api/*)
│   └── web.php              # Web routes (admin panel)
│
├── resources/
│   └── views/               # Blade templates
│
├── storage/                 # File uploads, logs, cache
│   └── app/
│       └── public/          # Public uploaded files
│
├── public/                  # Web accessible files
│   └── index.php            # Entry point
│
├── .env                     # Environment variables
├── composer.json            # Dependencies (like package.json)
└── artisan                  # CLI tool (like ng CLI)
```

#### Essential Commands

```bash
# Start development server
php artisan serve
# Access at http://localhost:8000

# Database commands
php artisan migrate              # Run migrations
php artisan migrate:fresh        # Reset database
php artisan migrate:status       # Check migration status

# Create files
php artisan make:model BlogPost -m     # Model + migration
php artisan make:controller ApiController
php artisan make:filament-resource BlogPost

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# List all routes
php artisan route:list
```

### 11.4 Understanding Eloquent (ORM)

Eloquent is Laravel's way of interacting with the database using PHP objects instead of writing SQL.

**Example: BlogPost Model**

```php
<?php
// app/Models/BlogPost.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogPost extends Model
{
    use SoftDeletes;  // Enable soft delete (deleted_at)

    // Fields that can be mass-assigned
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'status',
        'author_id',
        'published_at',
    ];

    // Cast fields to specific types
    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Relationship: BlogPost belongs to Admin (author)
    public function author()
    {
        return $this->belongsTo(Admin::class, 'author_id');
    }

    // Relationship: BlogPost has many Categories
    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class);
    }

    // Scope: Only published posts
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }
}
```

**Using the Model:**

```php
// Get all published posts
$posts = BlogPost::published()->get();

// Get single post by slug
$post = BlogPost::where('slug', 'my-post')->first();

// Create new post
$post = BlogPost::create([
    'title' => 'My New Post',
    'slug' => 'my-new-post',
    'content' => 'Post content here...',
    'status' => 'draft',
    'author_id' => 1,
]);

// Update post
$post->update(['status' => 'published']);

// Delete post (soft delete)
$post->delete();
```

### 11.5 Understanding Migrations

Migrations are like version control for your database schema. Instead of manually creating tables, you write PHP code that Laravel executes.

**Example Migration:**

```php
<?php
// database/migrations/2026_02_03_000001_create_blog_posts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();                              // BIGINT auto-increment
            $table->string('title');                   // VARCHAR(255)
            $table->string('slug')->unique();          // VARCHAR(255) with unique index
            $table->text('excerpt')->nullable();       // TEXT, can be null
            $table->longText('content');               // LONGTEXT
            $table->string('featured_image')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignId('author_id')->constrained('admins');  // Foreign key
            $table->timestamp('published_at')->nullable();
            $table->timestamps();                      // created_at, updated_at
            $table->softDeletes();                     // deleted_at

            // Indexes
            $table->index('status');
            $table->index('published_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
```

### 11.6 Understanding API Routes

```php
<?php
// routes/api.php

use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\AuthController;

// Public routes (no authentication required)
Route::prefix('blog')->group(function () {
    Route::get('/posts', [BlogController::class, 'index']);
    Route::get('/posts/{slug}', [BlogController::class, 'show']);
});

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
});
```

### 11.7 Understanding Filament Resources

Filament Resources automatically generate CRUD (Create, Read, Update, Delete) interfaces.

```php
<?php
// app/Filament/Resources/BlogPostResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Content';

    // Form for Create/Edit
    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, $set) =>
                    $set('slug', str($state)->slug())
                ),

            Forms\Components\TextInput::make('slug')
                ->required()
                ->unique(ignoreRecord: true),

            Forms\Components\Textarea::make('excerpt')
                ->maxLength(500)
                ->rows(3),

            Forms\Components\RichEditor::make('content')
                ->required()
                ->columnSpanFull(),

            Forms\Components\FileUpload::make('featured_image')
                ->image()
                ->directory('blog')
                ->maxSize(2048),

            Forms\Components\Select::make('status')
                ->options([
                    'draft' => 'Draft',
                    'published' => 'Published',
                    'archived' => 'Archived',
                ])
                ->required(),

            Forms\Components\DateTimePicker::make('published_at'),
        ]);
    }

    // Table for List view
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('author.name')
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'draft',
                        'success' => 'published',
                        'gray' => 'archived',
                    ]),

                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
```

### 11.8 Deployment to global.ba

#### Step 1: Prepare Laravel for Production

```bash
# In your local Laravel project

# Install dependencies without dev packages
composer install --optimize-autoloader --no-dev

# Generate optimized files
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Step 2: Create Database on global.ba

1. Login to cPanel
2. Go to "MySQL Databases"
3. Create new database (e.g., `username_huzur`)
4. Create database user with strong password
5. Add user to database with ALL PRIVILEGES

#### Step 3: Upload Files

**Option A: Using cPanel File Manager**
1. Zip your Laravel project
2. Upload to a folder OUTSIDE public_html (e.g., `/home/username/laravel-backend/`)
3. Extract the zip file

**Option B: Using FTP/SFTP**
1. Connect with FileZilla or similar
2. Upload entire Laravel folder to `/home/username/laravel-backend/`

#### Step 4: Configure .env

Create/edit `.env` file in your Laravel folder:

```env
APP_NAME="Huzur Mostar"
APP_ENV=production
APP_KEY=base64:GENERATE_WITH_php_artisan_key:generate
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=username_huzur
DB_USERNAME=username_dbuser
DB_PASSWORD=your_secure_password

SANCTUM_STATEFUL_DOMAINS=yourdomain.com
SESSION_DOMAIN=.yourdomain.com

FILESYSTEM_DISK=public
```

#### Step 5: Set Up Public Access

In cPanel, create symbolic link or copy public folder:

```bash
# SSH into server or use cPanel Terminal

# Create symlink from Laravel public to public_html/api
ln -s /home/username/laravel-backend/public /home/username/public_html/api

# Create storage symlink
cd /home/username/laravel-backend
php artisan storage:link
```

#### Step 6: Run Migrations

```bash
# Via SSH or cPanel Terminal
cd /home/username/laravel-backend
php artisan migrate --force
php artisan db:seed --force  # If you have seeders
```

#### Step 7: Set Permissions

```bash
chmod -R 775 storage bootstrap/cache
chown -R username:username storage bootstrap/cache
```

### 11.9 Recommended Learning Resources

**Official Documentation:**
- Laravel: https://laravel.com/docs/11.x
- Filament: https://filamentphp.com/docs

**Video Courses (Beginner-Friendly):**
- Laravel from Scratch (Laracasts) - Free
- Laravel Bootcamp: https://bootcamp.laravel.com
- Filament YouTube tutorials

**Practice Projects:**
1. Build a simple blog (posts, categories)
2. Add authentication
3. Create admin panel with Filament

---

## 12. Implementation Phases

### Phase 1: Foundation (Estimated: First milestone)

**Objectives:**
- Set up Laravel project
- Configure Filament admin panel
- Deploy to global.ba

**Tasks:**
- [ ] Install Laravel 11 locally
- [ ] Install and configure Filament
- [ ] Create Admin model and authentication
- [ ] Set up MySQL database locally
- [ ] Create basic admin dashboard
- [ ] Test admin login
- [ ] Deploy to global.ba
- [ ] Verify admin panel works on production

**Deliverables:**
- Working admin login at `yourdomain.com/admin`
- Empty dashboard with navigation

---

### Phase 2: Blog System

**Objectives:**
- Full blog management in admin
- Public API for Angular frontend

**Tasks:**
- [ ] Create BlogPost model and migration
- [ ] Create BlogCategory model and migration
- [ ] Build BlogPost Filament resource
- [ ] Build BlogCategory Filament resource
- [ ] Implement rich text editor with image embedding
- [ ] Create blog API endpoints
- [ ] Test API endpoints
- [ ] Update Angular to fetch from API

**Deliverables:**
- Create/Edit/Delete blog posts in admin
- Blog posts API returning JSON
- Angular displaying blog from API

---

### Phase 3: Media Library

**Objectives:**
- Centralized image management
- Integration with blog and content

**Tasks:**
- [ ] Create Media model and migration
- [ ] Build Media Filament resource with grid view
- [ ] Implement bulk upload
- [ ] Add image picker to blog editor
- [ ] Create media API endpoints
- [ ] Set up storage configuration for global.ba

**Deliverables:**
- Upload/browse/delete media in admin
- Select images from library in other resources

---

### Phase 4: Page Content Management

**Objectives:**
- Editable website content sections
- No code changes needed for text updates

**Tasks:**
- [ ] Create PageContent model and migration
- [ ] Build PageContent Filament resource
- [ ] Define content structure for each page
- [ ] Create content API endpoints
- [ ] Update Angular components to use dynamic content
- [ ] Seed initial content from current static values

**Deliverables:**
- Edit homepage sections from admin
- Edit about page content from admin
- Angular fetching content dynamically

---

### Phase 5: User Accounts

**Objectives:**
- Customer registration and login
- Profile management

**Tasks:**
- [ ] Configure User model for customers
- [ ] Create authentication API endpoints
- [ ] Build User Filament resource (admin view)
- [ ] Implement email verification
- [ ] Create password reset flow
- [ ] Build Angular authentication pages
- [ ] Build Angular user dashboard
- [ ] Test complete auth flow

**Deliverables:**
- User registration/login on website
- Admin can view all users
- Users can update their profile

---

### Phase 6: Products & Orders

**Objectives:**
- Product catalog management
- Order placement and tracking

**Tasks:**
- [ ] Create Product model and migration
- [ ] Create Order and OrderItem models/migrations
- [ ] Build Product Filament resource
- [ ] Build Order Filament resource
- [ ] Create product API endpoints
- [ ] Create order API endpoints
- [ ] Build Angular product display
- [ ] Build Angular cart functionality
- [ ] Build Angular checkout flow
- [ ] Implement order confirmation emails
- [ ] Test complete order flow

**Deliverables:**
- Add/edit products in admin
- View orders in admin with status updates
- Customers can browse products
- Customers can place orders
- Order confirmation emails sent

---

### Phase 7: Polish & Optimization

**Objectives:**
- Performance optimization
- Final testing and refinements

**Tasks:**
- [ ] Add caching for API responses
- [ ] Optimize database queries
- [ ] Add API rate limiting
- [ ] Implement error logging and monitoring
- [ ] Security audit
- [ ] Performance testing
- [ ] Create admin user documentation
- [ ] Backup strategy implementation

**Deliverables:**
- Fast, secure, production-ready system
- Documentation for admin users

---

## 13. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Admin can create blog post | < 5 minutes | Manual testing |
| Page load time (API) | < 200ms | Browser DevTools |
| Image upload | < 10 seconds for 2MB | Manual testing |
| Order processing | Admin notified within 1 minute | Email testing |
| System uptime | 99.9% | Monitoring tools |
| Zero critical security issues | 0 vulnerabilities | Security scan |

---

## 14. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Learning curve delays | High | Medium | Follow structured tutorials, start simple |
| global.ba hosting limitations | Medium | High | Test early, have backup plan |
| Data loss during development | Medium | High | Regular backups, version control |
| Security vulnerabilities | Medium | High | Use Laravel/Filament defaults, security audit |
| Performance issues | Low | Medium | Caching, optimization in Phase 7 |
| Scope creep | Medium | Medium | Stick to PRD, defer new features |

---

## 15. Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - how Angular communicates with Laravel |
| **CRUD** | Create, Read, Update, Delete - basic data operations |
| **Eloquent** | Laravel's ORM for database interactions |
| **Filament** | Admin panel package for Laravel |
| **Migration** | Database schema version control in Laravel |
| **Model** | PHP class representing a database table |
| **ORM** | Object-Relational Mapping - interact with database using objects |
| **REST** | Representational State Transfer - API design standard |
| **Sanctum** | Laravel package for API authentication |
| **Seeder** | Script to populate database with initial data |
| **Soft Delete** | Mark as deleted without removing from database |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-03 | Development Team | Initial document |

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Owner | | | |
| Developer | | | |

---

*This document is a living document and will be updated as the project progresses.*
