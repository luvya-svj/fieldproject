import React, { createContext, useContext, useState, useEffect } from 'react';

const UserLocationContext = createContext();

export const UserLocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null); // { lat, lon, address }
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const toggleEmergencyMode = () => setEmergencyMode(prev => !prev);
    const toggleDarkMode = () => setDarkMode(prev => !prev);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const requestLocation = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lon: longitude, address: "Current Location" });
                setError(null);
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        requestLocation();
    }, []);

    return (
        <UserLocationContext.Provider value={{
            location, error, loading, requestLocation,
            emergencyMode, toggleEmergencyMode,
            darkMode, toggleDarkMode
        }}>
            {children}
        </UserLocationContext.Provider>
    );
};

export const useUserLocation = () => {
    const context = useContext(UserLocationContext);
    if (!context) {
        throw new Error("useUserLocation must be used within a UserLocationProvider");
    }
    return context;
};
