# BCA Loading Animation

## Overview
The BCA Loading Animation is a full-screen video animation that plays when users first visit the website, similar to codehelp.com. It features the BCA_Animation.mp4 video with minimal neon background effects.

## Features

### 🎬 Video Animation
- **Video File**: `/public/BCA_Animation.mp4`
- **Duration**: 3 seconds
- **Auto-play**: With sound, looped, and plays inline
- **Volume Control**: Adjustable volume (70% default)
- **Responsive**: Scales properly on all devices

### ✨ Neon Effects
- **Animated Background**: Subtle gradient animations
- **Floating Particles**: 6 animated neon particles with glow effects
- **Video Glow**: Subtle glow around the video container
- **Progress Bar**: Animated progress bar at the bottom

### 🎨 Visual Elements
- **BCA Branding**: Large gradient text with "Bengal Coding Academy"
- **Tagline**: "Empowering Future Developers"
- **Loading Indicator**: Spinner while video loads
- **Smooth Transitions**: Fade in/out animations

### 🔊 Audio Features
- **Video Sound**: Original audio from BCA_Animation.mp4
- **Sound Toggle**: Button to enable/disable video sound
- **Volume Control**: Adjustable audio levels (70% default)

## Technical Implementation

### Components
- **LoadingAnimation.jsx**: Main animation component
- **App.jsx**: Integration with app state management
- **Layout.jsx**: Replay button in header

### State Management
- **Every Visit**: Shows animation every time the base URL is hit
- **No localStorage**: Animation runs on every page load
- **Replay Function**: Users can replay animation anytime

### Performance
- **Lazy Loading**: Video loads only when needed
- **Memory Management**: Proper cleanup of event listeners
- **Smooth Animations**: 60fps animations with Framer Motion

## Usage

### Automatic Display
The animation automatically shows:
- Every time the base URL is hit
- On every page refresh
- On every app load

### Manual Replay
Users can replay the animation by:
- Clicking the "Replay" button in the header
- Calling `window.replayBCAAnimation()` in browser console

### Customization
To modify the animation:
1. **Duration**: Change the timeout in `LoadingAnimation.jsx` (line 15)
2. **Video**: Replace `/public/BCA_Animation.mp4`
3. **Effects**: Modify the neon effects in the component
4. **Branding**: Update the text and styling

## Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## File Structure
```
web/
├── public/
│   └── BCA_Animation.mp4          # Video file
├── src/
│   ├── components/
│   │   └── LoadingAnimation.jsx   # Animation component
│   ├── App.jsx                    # App integration
│   └── components/
│       └── Layout.jsx             # Replay button
└── LOADING_ANIMATION.md           # This documentation
```

## Troubleshooting

### Video Not Playing
- Check if `BCA_Animation.mp4` exists in `/public/`
- Verify video format is MP4
- Check browser console for errors

### Animation Not Showing
- Check if `showLoadingAnimation` state is true
- Verify component is properly imported
- Ensure video file exists in public directory

### Performance Issues
- Ensure video file is optimized (under 5MB recommended)
- Check if too many animations are running
- Monitor browser performance tools

## Future Enhancements
- [ ] Add sound effects option
- [ ] Multiple animation themes
- [ ] User preference settings
- [ ] Analytics tracking
- [ ] A/B testing support
