// Components
export { VideoControls } from './VideoControls';
export { Watermark } from './Watermark';
export { ProtectionWarning } from './ProtectionWarning';

// Hooks
export { useVideoProgress, useVideoProtection } from './hooks';

// Utils
export const formatArabicDateTime = () => {
    const now = new Date();
    return now.toLocaleDateString('ar-JO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
