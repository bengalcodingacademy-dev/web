# Shimmer Component Documentation

## Overview
The Shimmer component provides a premium loading effect using the `shimmer.mp4` video file. It replaces traditional loading states and skeleton components throughout the application with an animated shimmer effect.

## Features
- **Video-based Animation**: Uses `shimmer.mp4` for smooth, premium loading effects
- **Multiple Types**: Supports different shimmer layouts (card, table, form, stats, text)
- **Customizable**: Configurable height, width, count, and styling
- **Performance Optimized**: Lightweight and efficient rendering

## Usage

### Basic Usage
```jsx
import Shimmer from '../components/Shimmer';

// Simple shimmer
<Shimmer />

// Card shimmer
<Shimmer type="card" />

// Multiple cards
<Shimmer type="card" count={3} />
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | 'card' | Shimmer type: 'card', 'table', 'form', 'stats', 'text' |
| `className` | string | '' | Additional CSS classes |
| `count` | number | 1 | Number of shimmer elements to render |
| `height` | string | 'auto' | Height of the shimmer element |
| `width` | string | '100%' | Width of the shimmer element |

### Shimmer Types

#### 1. Card Shimmer
```jsx
<Shimmer type="card" />
```
- Full course card layout with image and content areas
- Perfect for course listings, dashboard cards

#### 2. Table Shimmer
```jsx
<Shimmer type="table" />
```
- Row-based layout with avatar, text, and action areas
- Ideal for data tables, user lists

#### 3. Form Shimmer
```jsx
<Shimmer type="form" />
```
- Form field layout with labels and inputs
- Great for form loading states

#### 4. Stats Shimmer
```jsx
<Shimmer type="stats" />
```
- Statistics card layout with title and number areas
- Perfect for dashboard statistics

#### 5. Text Shimmer
```jsx
<Shimmer type="text" />
```
- Simple text placeholder
- Good for general loading states

## Implementation Examples

### Course Listing
```jsx
{loading ? (
  <Shimmer type="card" count={6} />
) : (
  courses.map(course => <CourseCard key={course.id} course={course} />)
)}
```

### Dashboard Stats
```jsx
{loading ? (
  <Shimmer type="stats" height="120px" />
) : (
  <StatsComponent />
)}
```

### Data Table
```jsx
{loading ? (
  <Shimmer type="table" count={5} />
) : (
  <DataTable data={data} />
)}
```

## Technical Details

### Video Integration
- Uses `shimmer.mp4` from the public folder
- Video is auto-playing, looped, and muted
- Applied with overlay blend modes for subtle effects
- Optimized for performance with `playsInline` attribute

### Styling
- Dark theme compatible with BCA color scheme
- Semi-transparent backgrounds with backdrop blur
- Gradient overlays for depth
- Responsive design with Tailwind CSS

### Performance
- Lightweight component with minimal overhead
- Efficient video rendering
- No JavaScript animations (video-based)
- Optimized for mobile devices

## Files Updated
The shimmer component has been integrated into the following pages:
- `Batches.jsx` - Course listings
- `Webinars.jsx` - Webinar listings  
- `UserDashboard.jsx` - Dashboard loading
- `CourseDetail.jsx` - Course detail loading
- `Announcements.jsx` - Announcement listings
- `Purchases.jsx` - Purchase history
- `App.jsx` - Authentication loading

## Browser Support
- Modern browsers with video support
- Mobile-friendly with touch optimization
- Graceful fallback for unsupported browsers
