// app/components/utils/ShareButton.jsx
"use client"; // Add this line to make it a Client Component

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';

const ShareButton = ({ url }) => {
    const shareToTwitter = () => {
        const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        window.open(tweetUrl, '_blank');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard!');
    };

    return (
        <div className="flex gap-2">
            <button onClick={shareToTwitter} className="text-blue-500">
                <FontAwesomeIcon icon={faShareAlt} /> {/* Share icon */}
            </button>
            <button onClick={copyToClipboard} className="text-blue-500">
                <FontAwesomeIcon icon={faClipboard} /> {/* Copy icon */}
            </button>
        </div>
    );
};

export default ShareButton;
