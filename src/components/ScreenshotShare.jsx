import React, { useState } from 'react';
import { Camera, Check, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

// 📸 ScreenshotCapture Component
// Client-side screenshot capturing! Creates an image and downloads it automatically.

const ScreenshotShare = () => {
    const [isCapturing, setIsCapturing] = useState(false);
    const [copied, setCopied] = useState(false);

    const captureAndDownload = async () => {
        try {
            setIsCapturing(true);

            // Hide the share button so it doesn't appear in the screenshot
            const shareBtn = document.getElementById('screenshot-share-btn-wrapper');
            if (shareBtn) shareBtn.style.display = 'none';

            // Capture EXACTLY the current scrolled position
            const canvas = await html2canvas(document.body, {
                y: window.scrollY,
                height: window.innerHeight,
                windowHeight: window.innerHeight,
                scale: 2, // High DPI
                useCORS: true,
                logging: false,
                ignoreElements: (el) => el.tagName === 'IFRAME',
            });

            // Restore the share button
            if (shareBtn) shareBtn.style.display = 'block';

            // Convert to a blob
            const blob = await new Promise((resolve) =>
                canvas.toBlob(resolve, 'image/png', 1.0)
            );
            if (!blob) throw new Error('Could not create image blob');

            // Desktop/Mobile: Download the image
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'setu-page-view.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            setCopied(true);
            setTimeout(() => setCopied(false), 3000);

        } catch (err) {
            console.error('[ScreenshotShare] Error:', err);
            // Ensure button is restored if it failed
            const shareBtn = document.getElementById('screenshot-share-btn-wrapper');
            if (shareBtn) shareBtn.style.display = 'block';
            alert('Failed to capture screenshot. Please try again.');
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <div
            id="screenshot-share-btn-wrapper"
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
            <button
                onClick={captureAndDownload}
                disabled={isCapturing}
                title="Download screenshot"
                className={`group relative flex items-center justify-center p-4 rounded-full shadow-2xl transition-all duration-300 \${
          isCapturing 
            ? 'bg-emerald-600 cursor-not-allowed scale-95' 
            : copied
              ? 'bg-green-500 hover:bg-green-600 hover:scale-105'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110 hover:shadow-indigo-500/50'
        } text-white`}
            >
                {isCapturing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : copied ? (
                    <Check className="w-6 h-6" />
                ) : (
                    <Camera className="w-6 h-6" />
                )}

                {/* Tooltip */}
                <span className="absolute right-full mr-4 whitespace-nowrap px-3 py-2 bg-slate-800 text-slate-100 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform translate-x-2 group-hover:translate-x-0">
                    {copied ? 'Image Downloaded!' : isCapturing ? 'Capturing view...' : 'Download Screenshot'}
                </span>
            </button>
        </div>
    );
};

export default ScreenshotShare;
