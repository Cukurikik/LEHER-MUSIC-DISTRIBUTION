
import type { Notification } from '../types';
import { NotificationType } from '../types';

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateTimestamp = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - Math.floor(Math.random() * 24));
    date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));
    return date.toISOString();
};

const mockNotifications: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'link'>[] = [
    { type: NotificationType.Release, title: "Release 'Cosmic Drift' is Live", message: "Congratulations! Your release 'Cosmic Drift' has been successfully delivered and is now live on all selected platforms." },
    { type: NotificationType.Revenue, title: "September 2024 Report Available", message: "Your monthly revenue report for September 2024 has been generated. Your net income was $765.45." },
    { type: NotificationType.Support, title: "Support Ticket #78910 Updated", message: "Our support team has replied to your ticket regarding takedown requests." },
    { type: NotificationType.SystemUpdate, title: "New Feature: AI Mastering", message: "Check out the new AI-powered mastering studio in your Toolkit to get your tracks release-ready." },
    { type: NotificationType.Alert, title: "Action Required: Payment Details", message: "Please update your payment information to ensure there are no delays with your next payout." },
    { type: NotificationType.Release, title: "Release 'Ocean Breath' Submitted", message: "Your release 'Ocean Breath' has been submitted for review. We'll notify you once it's approved." },
    { type: NotificationType.Revenue, title: "Withdrawal Processed", message: "Your withdrawal request for $520.00 has been successfully processed and sent to your bank." },
    { type: NotificationType.Release, title: "Release 'Future Echoes' Rejected", message: "Your release 'Future Echoes' was rejected due to an artwork issue. Please review the details and resubmit." },
    { type: NotificationType.SystemUpdate, title: "Welcome to Leher Quantum", message: "We've updated our dashboard with a new look and feel. We hope you enjoy the new experience!" },
    { type: NotificationType.Support, title: "Your Ticket is Closed", message: "Support Ticket #78852 has been resolved and closed. Feel free to open a new one if you need more help." },
    { type: NotificationType.Revenue, title: "New Earnings from Spotify", message: "You've just received new earnings from Spotify for the last period." },
    { type: NotificationType.Alert, title: "Unusual Login Activity", message: "We detected a login from a new device. If this wasn't you, please secure your account immediately." },
];

const assignLink = (type: NotificationType, title: string): string => {
    switch (type) {
        case NotificationType.Release:
            if(title.includes('Cosmic Drift')) return '/release/song-1';
            if(title.includes('Ocean Breath')) return '/release/song-2';
            return '/releases';
        case NotificationType.Revenue: return '/payments';
        case NotificationType.Support: return '/support';
        case NotificationType.Alert: return '/payments';
        case NotificationType.SystemUpdate: return '/';
        default: return '/';
    }
};

export const fetchNotifications = async (): Promise<Notification[]> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));

    return mockNotifications.map((n, index) => ({
        ...n,
        id: `notif-${Date.now()}-${index}`,
        timestamp: generateTimestamp(index * 0.5), // Spread notifications over time
        isRead: Math.random() > 0.4, // 60% are read
        link: assignLink(n.type, n.title)
    })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const generateSingleNotification = (): Notification => {
    const randomTemplate = getRandomElement(mockNotifications);
    const newId = `notif-${Date.now()}`;
    // Remove explicit "Simulated" text, make it look real
    const newTitle = randomTemplate.title; 

    return {
        ...randomTemplate,
        id: newId,
        title: newTitle,
        timestamp: new Date().toISOString(),
        isRead: false,
        link: assignLink(randomTemplate.type, newTitle),
    };
};
