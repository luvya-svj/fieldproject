import React from 'react';

const MapEmbed = ({ address, coordinates, height = "300px", width = "100%" }) => {
    // If coordinates are provided, use them, otherwise use address
    const query = coordinates
        ? `${coordinates.lat},${coordinates.lon}`
        : encodeURIComponent(address);

    const mapUrl = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="map-container" style={{ width, height, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
            <iframe
                title={coordinates ? "Map centered on user location" : `Map of ${address}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={mapUrl}
                style={{ border: 0, display: 'block' }}
                allowFullScreen
            />
        </div>
    );
};

export default MapEmbed;
