import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { PortalDetails } from '../types';

export interface PortalProps {
  open: boolean;
  onClose: () => void;
  /** Small mono label above the title, e.g. "// Current mission". */
  tag?: string;
  title: string;
  subtitle?: string;
  /** Accent colour (hex) — borders, glow, tag. */
  accent?: string;
  /** Fallback body when no details.story is provided. */
  description?: string;
  details?: PortalDetails;
  /** Tech / tags shown as chips. */
  chips?: string[];
  /** Custom content rendered first (e.g. a large photo). */
  children?: React.ReactNode;
}

/**
 * Portal — the one detail surface for the whole site.
 * Cards on the page stay minimal; clicking one opens its portal with the full story.
 * Closes on Escape, backdrop click, or the close button. Locks page scroll while open.
 */
const Portal: React.FC<PortalProps> = ({
  open, onClose, tag, title, subtitle, accent = '#00f3ff', description, details, chips, children,
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const hasStory = Boolean(details?.story && details.story.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="portal-backdrop"
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ background: 'rgba(2,2,6,0.84)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onMouseDown={e => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="portal-title"
            className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-t-lg sm:rounded-sm"
            style={{
              background: 'rgba(5,5,16,0.97)',
              border: `1px solid ${accent}55`,
              boxShadow: `0 0 60px ${accent}22, 0 30px 80px rgba(0,0,0,0.6)`,
            }}
            initial={{ opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: 'easeOut' }}
          >
            {/* Corner accents */}
            <span className="portal-corner tl" style={{ borderColor: accent }} />
            <span className="portal-corner tr" style={{ borderColor: accent }} />
            <span className="portal-corner bl" style={{ borderColor: accent }} />
            <span className="portal-corner br" style={{ borderColor: accent }} />

            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4"
              style={{ background: 'linear-gradient(rgba(5,5,16,1) 70%, rgba(5,5,16,0))' }}
            >
              <div className="min-w-0">
                {tag && (
                  <span className="section-tag block mb-2" style={{ color: accent, opacity: 0.9 }}>
                    {tag}
                  </span>
                )}
                <h3 id="portal-title" className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="font-mono text-sm mt-1" style={{ color: accent }}>
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 p-2 rounded-sm text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 pb-8 space-y-6">
              {children}

              {details?.headline && (
                <p className="text-gray-100 text-base sm:text-lg leading-relaxed">{details.headline}</p>
              )}

              {hasStory
                ? details!.story!.map((paragraph, i) => (
                    <p key={i} className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                : description && (
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{description}</p>
                  )}

              {details?.highlights && details.highlights.length > 0 && (
                <div>
                  <span className="section-tag block mb-3">What I did</span>
                  <ul className="space-y-2">
                    {details.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                        <span className="font-mono text-xs mt-1" style={{ color: accent }}>▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {chips && chips.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {chips.map(chip => (
                    <span
                      key={chip}
                      className="font-mono text-xs px-2 py-1 rounded-sm text-gray-400"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {details?.links && details.links.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {details.links.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-colors hover:text-white"
                      style={{ border: `1px solid ${accent}66`, color: accent, background: `${accent}12` }}
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Portal;
