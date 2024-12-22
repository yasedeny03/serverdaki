# Image Gallery Application

A professional image gallery application with local storage, user management, and album organization capabilities.

## Features

- User authentication and role-based access control
- Album management and organization
- Image upload with automatic thumbnail generation
- Drag-and-drop image ordering
- Responsive image grid layout
- Image lightbox with navigation
- Bulk image actions
- Admin dashboard
- Customizable display settings

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Modern web browser

## Project Structure

```
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions
│   ├── store/         # State management (Zustand)
│   └── types/         # TypeScript types
├── public/            # Static assets
└── uploads/          # Local image storage
    ├── images/       # Original images
    └── thumbnails/   # Generated thumbnails
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gallery-app
```

2. Install dependencies:
```bash
npm install
```

3. Create uploads directory:
```bash
mkdir -p uploads/images uploads/thumbnails
```

4. Set proper permissions:
```bash
chmod 755 uploads
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Production Build

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Default Login

- Password: `admin123` (Administrator account)

## Configuration

The application uses environment variables for configuration. Create a `.env` file:

```env
# Upload Settings
VITE_UPLOAD_DIR=/path/to/uploads

# Server Settings
VITE_PORT=3000
VITE_HOST=localhost
```

## Features

### User Management
- Role-based access control (Admin/User)
- Unique password-based authentication
- Album access permissions

### Album Management
- Create, edit, and delete albums
- Organize images into albums
- Set album permissions per user

### Image Management
- Upload multiple images
- Automatic thumbnail generation
- Drag-and-drop reordering
- Bulk selection and actions
- Image optimization

### Display Options
- Adjustable grid layout (2-4 columns)
- Multiple sort options
- Lightbox view with navigation
- Responsive design

## Security Considerations

1. File Upload Security
   - File type validation
   - Size limits
   - Secure file naming

2. User Authentication
   - Unique password requirement
   - Role-based access control
   - Session management

3. Data Protection
   - Local storage security
   - Upload directory permissions
   - Error handling

## Maintenance

1. Regular Cleanup
   - Remove unused images
   - Clean thumbnail cache
   - Monitor disk space

2. Performance
   - Image optimization
   - Thumbnail caching
   - Lazy loading

## License

MIT License