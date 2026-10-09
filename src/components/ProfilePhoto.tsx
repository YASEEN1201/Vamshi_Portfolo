import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, RefreshCw } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProfilePhotoProps {
  className?: string;
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ className = '' }) => {
  const [imgSrc, setImgSrc] = useState<string>(PERSONAL_INFO.defaultPhotoPath);
  const [hasError, setHasError] = useState<boolean>(false);
  const [customPhotoUploaded, setCustomPhotoUploaded] = useState<boolean>(false);

  const handleImageError = () => {
    // If the default profile.jpg is not yet provided locally, switch to the tasteful placeholder
    if (!hasError) {
      setHasError(true);
      setImgSrc(PERSONAL_INFO.fallbackPlaceholderPath);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgSrc(url);
      setHasError(false);
      setCustomPhotoUploaded(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group ${className}`}
    >
      {/* Ambient electric blue backlight halo */}
      <div
        className="absolute -inset-2.5 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, #1d4ed8 40%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Outer subtle silver border ring */}
      <div className="relative p-1.5 sm:p-2 rounded-full bg-gradient-to-b from-slate-400/40 via-slate-600/20 to-slate-800/40 shadow-2xl backdrop-blur-sm">
        {/* Inner frame */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-[#12161f] border border-white/10 flex items-center justify-center">
          <img
            src={imgSrc}
            alt="Portrait of Vamsi Krishna Ramavarapu"
            onError={handleImageError}
            loading="eager"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Gentle cinematic top sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-80"
            aria-hidden="true"
          />

          {/* Subtle overlay for instant upload/preview when testing */}
          <label
            htmlFor="photo-upload-input"
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer text-center p-4"
            title="Click to preview your actual photograph directly"
          >
            <Camera className="w-8 h-8 text-blue-400 mb-2 drop-shadow" />
            <span className="text-xs font-medium text-white tracking-wide">
              {customPhotoUploaded ? 'Change Photo' : 'Upload / Preview Photo'}
            </span>
            <span className="text-[10px] text-slate-300 mt-1 max-w-[180px]">
              Or drop your photo into <code className="text-blue-300 font-mono">public/images/profile.jpg</code>
            </span>
          </label>
          <input
            id="photo-upload-input"
            type="file"
            accept="image/*"
            onChange={handleCustomUpload}
            className="sr-only"
          />
        </div>
      </div>

      {/* Small reset button if custom photo was previewed */}
      {customPhotoUploaded && (
        <button
          onClick={() => {
            setImgSrc(PERSONAL_INFO.defaultPhotoPath);
            setHasError(false);
            setCustomPhotoUploaded(false);
          }}
          className="absolute -bottom-2 right-4 px-2.5 py-1 text-[11px] font-medium bg-[#1a202c] border border-slate-700 text-slate-300 hover:text-white rounded-full flex items-center gap-1.5 shadow-lg transition-colors"
          title="Reset to default path"
        >
          <RefreshCw className="w-3 h-3 text-blue-400" />
          <span>Reset</span>
        </button>
      )}
    </motion.div>
  );
};
