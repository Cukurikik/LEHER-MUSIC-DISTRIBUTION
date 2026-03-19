import React from 'react';
import ReleaseIcon from './ReleaseIcon';

// Spotify - Circle with waves
const SpotifyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z"/>
    </svg>
);

// Apple Music - Musical Note
const AppleMusicIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.998 17.15c-.14.41-.45.75-.826.98-.41.24-.89.36-1.44.36-.6 0-1.16-.14-1.68-.42-.51-.28-.9-.67-1.15-1.15-.25-.49-.38-.97-.38-1.45 0-.58.1-1.14.3-1.66.2-.52.49-.98.88-1.38.38-.4.84-.73 1.35-.98.52-.25.98-.38 1.38-.38.11 0 .22.01.32.03.58.12 1.1.41 1.51.84.41.44.68.95.79 1.51.11.57.11 1.04.11 1.41 0 .5-.11.98-.33 1.42l-.002-8.36c0-.68-.36-1.23-1.08-1.65L10.972 4.8c-.72-.42-1.3-.42-1.74-.01-.44.42-.66.98-.66 1.69v7.36c-.52-.24-.98-.36-1.38-.36-.41 0-.86.13-1.38.38-.51.25-.88.58-1.1.98-.22.4-.33.86-.33 1.38 0 .48.13.97.38 1.45.25.48.64.87 1.15 1.15.52.28 1.08.42 1.68.42.55 0 1.03-.12 1.44-.36.38-.23.69-.57.83-.98.13-.44.23-.91.31-1.42l.002-7.45 3.826 1.93v4.8c-.52-.24-.98-.36-1.38-.36-.41 0-.86.13-1.38.38-.51.25-.88.58-1.1.98-.22.4-.33.86-.33 1.38 0 .48.13.97.38 1.45.25.48.64.87 1.15 1.15.52.28 1.08.42 1.68.42.55 0 1.03-.12 1.44-.36.38-.23.69-.57.83-.98.13-.44.23-.91.31-1.42z"/>
    </svg>
);

// YouTube Music - Play button in circle
const YouTubeMusicIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.92A7.92 7.92 0 1 1 12 4.08a7.92 7.92 0 0 1 0 15.84zm0-13.2a5.28 5.28 0 1 0 0 10.56 5.28 5.28 0 0 0 0-10.56zm-1.32 7.524v-4.488l3.96 2.244-3.96 2.244z"/>
    </svg>
);

// Amazon Music - "A" with arrow
const AmazonMusicIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M15.67 12.16c-.24 2.44-1.83 3.34-3.5 3.34-2.22 0-3.38-1.67-3.38-4.08 0-2.38 1.4-4.38 3.78-4.38 1.89 0 3.07 1.23 3.07 3.29h2.5c-.05-4.31-3.2-5.16-5.47-5.16-3.83 0-6.39 2.77-6.39 6.34 0 3.52 2.5 6.4 6.25 6.4 2.95 0 5.5-1.68 5.72-4.69l.02-.46h-2.6zM22.27 15.55c-.3-.51-1.63-.34-2.66-.04-1.53.44-2.76.35-3.34.21-.32-.08-.46-.19-.46-.19l-.54 1.64s.36.3 1.2.53c.66.18 1.99.38 3.71-.13 1.04-.31 1.79-.82 2.09-1.35.16-.28.17-.52.17-.52l-.17-.15z"/>
    </svg>
);

// Tidal - Diamond pattern
const TidalIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.006 0L8.225 3.782l3.781 3.78 3.781-3.78L12.006 0zM4.444 3.782L.662 7.563l3.782 3.781 3.78-3.78-3.78-3.782zm15.125 0l-3.781 3.781 3.78 3.781 3.782-3.781-3.782-3.781zM8.225 11.345L4.444 15.126l3.781 3.781 3.781-3.781-3.781-3.781zm7.562 0l-3.781 3.781 3.781 3.781 3.781-3.781-3.781-3.781zM12.006 15.126l-3.781 3.781 3.781 3.782 3.781-3.782-3.781-3.781z"/>
    </svg>
);

// Deezer - Equalizer bars
const DeezerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1.714 10.286h3.429v5.143H1.714zm5.143 0h3.429v5.143H6.857zm0-6.857h3.429v3.428H6.857zm5.143 12h3.429v-5.143H12zm0-8.572h3.429v3.429H12zm5.143 8.572h3.428v-5.143h-3.428zm0-8.572h3.428v3.429h-3.428z"/>
    </svg>
);

// SoundCloud - Cloud with lines
const SoundCloudIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1.175 12.222c-.116 2.178 1.462 3.616 3.005 3.535H10.22V7.731c-1.044 0-2.073.394-2.532.765-1.491 1.205-1.18 3.741-2.46 3.741-.265 0-.474-.176-.474-.665 0-1.308 1.34-2.841 2.906-3.841.221-.14.098-.479-.149-.489-2.592-.106-4.981 2.121-6.336 5.244v-.264zm21.65 1.108c0-3.39-2.702-5.956-6.03-5.555-.417-3.075-3.072-5.444-6.28-5.444-.156 0-.311.007-.466.019v13.407h6.92c3.17 0 5.856-2.358 5.856-2.427z"/>
    </svg>
);

// TikTok - Music note glitch
const TikTokIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.525.311v11.39a2.536 2.536 0 1 1-2.537-2.536H12.52v-2.25H9.987a2.536 2.536 0 1 1 0-5.072h2.537v2.25h2.537a2.536 2.536 0 0 1 2.537 2.536v2.536a7.608 7.608 0 1 0-7.608 7.608v-2.85a4.752 4.752 0 1 1 4.752-4.752Z"/>
    </svg>
);

// Meta (Facebook/Instagram) - Infinity loop
const MetaIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M16.924 8.24c-1.563 0-2.897.78-3.84 1.867l-1.083 1.303-1.083-1.303c-.943-1.086-2.277-1.867-3.84-1.867-2.76 0-5 2.24-5 5s2.24 5 5 5c1.563 0 2.897-.78 3.84-1.867l1.083-1.303 1.083 1.303c.943 1.086 2.277 1.867 3.84 1.867 2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 7.5c-.621 0-1.185-.278-1.58-.726l-2.26-2.716c-.627-.754-1.526-1.189-2.488-1.189s-1.861.435-2.488 1.189l-2.26 2.716c-.395.448-.959.726-1.58.726-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5c.621 0 1.185.278 1.58.726l2.26 2.716c.627.754 1.526 1.189 2.488 1.189s1.861-.435 2.488-1.189l2.26-2.716c.395-.448.959-.726 1.58-.726 1.378 0 2.5 1.122 2.5 2.5s-1.122 2.5-2.5 2.5z"/>
    </svg>
);

// Bandcamp - Triangle/Fan shape
const BandcampIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M0 18.75h24V24H0Z M12 5.25L17.25 15H6.75Z"/>
    </svg>
);

const platformIcons: Record<string, React.FC<{className?: string}>> = {
    spotify: SpotifyIcon,
    applemusic: AppleMusicIcon,
    youtubemusic: YouTubeMusicIcon,
    amazonmusic: AmazonMusicIcon,
    tidal: TidalIcon,
    deezer: DeezerIcon,
    soundcloud: SoundCloudIcon,
    bandcamp: BandcampIcon,
    tiktok: TikTokIcon,
    meta: MetaIcon,
    facebook: MetaIcon,
    instagram: MetaIcon,
};

export const getPlatformIcon = (platformName: string, className = 'w-6 h-6') => {
    // Normalize by making lowercase and removing spaces and hyphens.
    const normalizedName = platformName.toLowerCase().replace(/[\s-]/g, '');
    const IconComponent = platformIcons[normalizedName] || ReleaseIcon; 
    return <IconComponent className={className} />;
};

export default platformIcons;