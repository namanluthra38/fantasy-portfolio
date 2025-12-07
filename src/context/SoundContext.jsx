
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('soundMuted');
        return saved ? JSON.parse(saved) : false;
    });

    const hoverSoundRef = useRef(null);
    const clickSoundRef = useRef(null);
    const bgmRef = useRef(null);
    const closeSoundRef = useRef(null);

    // ONE-TIME INITIALIZATION
    useEffect(() => {
        hoverSoundRef.current = new Audio('/sounds/hover.mp3');
        clickSoundRef.current = new Audio('/sounds/click.mp3');
        closeSoundRef.current = new Audio('/sounds/close.mp3');
        bgmRef.current = new Audio('/sounds/ambient_forest.mp3');

        // Volume Configuration
        if (bgmRef.current) {
            bgmRef.current.loop = true;
            bgmRef.current.volume = 0.3;
        }
        if (hoverSoundRef.current) hoverSoundRef.current.volume = 0.25;
        if (clickSoundRef.current) clickSoundRef.current.volume = 0.01;
        if (closeSoundRef.current) closeSoundRef.current.volume = 0.01;

        // Cleanup on unmount
        return () => {
            if (bgmRef.current) bgmRef.current.pause();
        };
    }, []);

    // SYNC MUTE STATE & PERSISTENCE
    useEffect(() => {
        localStorage.setItem('soundMuted', JSON.stringify(isMuted));

        if (bgmRef.current) {
            if (isMuted) {
                bgmRef.current.pause();
            } else {
                bgmRef.current.play().catch(e => {
                    console.log("Audio play failed (autoplay policy):", e);
                });
            }
        }
    }, [isMuted]);

    // AUTOPLAY HANDLER
    // We attach this once. It checks the *current* persistence/state via refs or just tries to play.
    // Since we need to know 'isMuted' inside the listener, and isMuted changes, 
    // we can either re-attach listener or use a ref to track muted state.
    // Simpler: Re-attach listener if it fails? 
    // Actually, distinct effect for interaction is safest to avoid stale closures if we use state.
    useEffect(() => {
        const handleInteraction = () => {
            // Only try to play if NOT muted and currently paused
            if (!isMuted && bgmRef.current && bgmRef.current.paused) {
                bgmRef.current.play().then(() => {
                    // Success!
                }).catch(e => {
                    // Failed (still blocked?)
                });
            }
        };

        // We listen to interactions always, but the logic inside decides action.
        // To avoid memory leaks with re-binding, we can be smart.
        // Actually, just binding 'click' globally is fine if we remove it once we successfully play?
        // But if user mutes, we pause. If they unmute, the other effect plays.
        // The interaction listener is mainly for the *first* start.

        const forceStart = () => {
            if (bgmRef.current && bgmRef.current.paused && !isMuted) {
                bgmRef.current.play().catch(() => { });
            }
        }

        window.addEventListener('click', forceStart);
        window.addEventListener('keydown', forceStart);

        return () => {
            window.removeEventListener('click', forceStart);
            window.removeEventListener('keydown', forceStart);
        };
    }, [isMuted]);


    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const playHover = () => {
        if (!isMuted && hoverSoundRef.current) {
            hoverSoundRef.current.currentTime = 0;
            hoverSoundRef.current.play().catch(() => { });
        }
    };

    const playClick = () => {
        if (!isMuted && clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play().catch(() => { });
        }
    };

    const playClose = () => {
        if (!isMuted && closeSoundRef.current) {
            closeSoundRef.current.currentTime = 0;
            closeSoundRef.current.play().catch(() => { });
        }
    }

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playClose }}>
            {children}
        </SoundContext.Provider>
    );
};
