import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import HeroSection1 from '../assets/hero section 1.png';
import HeroSection2 from '../assets/hero section.png';
import HeroSection3 from '../assets/hero section (3).png';
import { useTranslation } from '../context/TranslationContext';

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Avg Rating' },
  { value: '50+', label: 'Products' },
];

const featureChips = [
  { emoji: '🌿', text: '100% Natural' },
  { emoji: '✨', text: 'Cruelty Free' },
  { emoji: '🇪🇹', text: 'Ethiopian Brand' },
];

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: '92vh',
        background:
          'linear-gradient(135deg, #FFF9F6 0%, #FFF0F7 45%, #F5EDFF 100%)',
      }}
    >
      {/* ── Decorative Blobs ─────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(197,133,215,0.12)', transform: 'translate(-50%,-50%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[38rem] h-[38rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,221,226,0.45)', transform: 'translate(35%,35%)' }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(0,128,128,0.06)' }}
      />

      {/* ── Main content grid ────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-24 pb-20 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Text ─────────────────────────────────────────── */}
          <div className="order-2 lg:order-1 flex flex-col">

            {/* Collection badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-6 px-4 py-1.5 rounded-full border"
              style={{
                background: 'rgba(197,133,215,0.10)',
                borderColor: 'rgba(197,133,215,0.25)',
              }}
            >
              <HiSparkles className="w-3.5 h-3.5 text-primary-accent" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary-accent">
                New 2025 Collection
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75 }}
              className="font-serif font-bold text-primary-text leading-[1.06] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4.25rem)' }}
            >
              Bloom Into{' '}
              <span className="relative inline-block text-primary-accent">
                Your Best
                {/* Decorative wavy underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 260 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-1 left-0 w-full"
                >
                  <path
                    d="M3 11 C55 3, 200 3, 257 11"
                    stroke="#FFDDE2"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              Self
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="text-secondary-text text-lg leading-relaxed mb-8 max-w-md"
            >
              Premium natural beauty crafted for Ethiopian women. Skincare that
              celebrates your radiance — ethically sourced, naturally inspired.
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="flex flex-wrap gap-2 mb-9"
            >
              {featureChips.map((chip) => (
                <span
                  key={chip.text}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-primary-text border border-cloud-gray/50 shadow-sm"
                  style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(6px)' }}
                >
                  {chip.emoji} {chip.text}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-accent hover:bg-brand-highlight text-white rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ '--tw-shadow': '0 10px 30px -8px rgba(197,133,215,0.45)' }}
              >
                <FiShoppingBag className="w-4 h-4" />
                {t('shopNow')}
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border-2 border-primary-text/15 text-primary-text hover:border-primary-accent hover:text-primary-accent hover:bg-primary-accent/5 transition-all duration-300"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-6 sm:gap-8 pt-7 border-t border-cloud-gray/50"
            >
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div>
                    <div className="text-2xl font-serif font-bold text-primary-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-secondary-text mt-0.5">{stat.label}</div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 bg-cloud-gray/50 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Image collage ────────────────────────────────── */}
          <div className="order-1 lg:order-2 relative">

            {/* Slowly rotating decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-10 -right-10 w-56 h-56 rounded-full border-2 border-dashed border-primary-accent/20 pointer-events-none"
            />
            {/* Soft glow behind thumbnails */}
            <div
              className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-2xl pointer-events-none"
              style={{ background: 'rgba(255,221,226,0.5)' }}
            />

            {/* ── Main hero image ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
              className="relative z-10"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: '2.5rem 2.5rem 2.5rem 0.75rem',
                  boxShadow: '0 32px 80px -16px rgba(197,133,215,0.28)',
                }}
              >
                <img
                  src={HeroSection1}
                  alt="AdeyBloom natural beauty products"
                  loading="eager"
                  decoding="sync"
                  className="w-full object-cover object-center"
                  style={{ height: 'clamp(380px, 48vw, 560px)' }}
                />
                {/* Bottom-up gradient for depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(47,47,47,0.28) 0%, transparent 55%)',
                  }}
                />
              </div>

              {/* ── Floating: Rating card ── */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="absolute -left-5 top-12 z-20 rounded-2xl px-4 py-3 border border-white/60"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 12px 32px -8px rgba(0,0,0,0.12)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2 shrink-0">
                    {['abi22', 'absa33', 'sam44'].map((u) => (
                      <img
                        key={u}
                        src={`https://i.pravatar.cc/32?u=adeybloom-${u}`}
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-amber-400 text-sm leading-none">★★★★★</div>
                    <p className="text-[11px] text-secondary-text font-medium mt-0.5">
                      10K+ Reviews
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ── Floating: Natural badge ── */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -right-4 bottom-36 z-20 text-white rounded-2xl px-4 py-3"
                style={{
                  background: '#008080',
                  boxShadow: '0 12px 32px -8px rgba(0,128,128,0.45)',
                }}
              >
                <p className="text-sm font-bold leading-none">🌿 Natural</p>
                <p className="text-[10px] mt-1" style={{ opacity: 0.78 }}>
                  Ethically Sourced
                </p>
              </motion.div>

              {/* ── Floating: "New Arrivals" pill ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute top-5 right-5 z-20 text-primary-text rounded-full px-3.5 py-1.5 text-xs font-bold"
                style={{
                  background: '#FFDDE2',
                  boxShadow: '0 4px 14px rgba(255,221,226,0.6)',
                }}
              >
                ✨ New Arrivals
              </motion.div>

              {/* ── Mini thumbnails ── */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="absolute -bottom-6 left-4 z-20 w-[108px] h-[88px] rounded-2xl overflow-hidden border-[3px] border-white"
                style={{ boxShadow: '0 8px 24px -6px rgba(0,0,0,0.18)' }}
              >
                <img
                  src={HeroSection2}
                  alt="AdeyBloom product"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.6 }}
                className="absolute -bottom-6 z-20 w-[90px] h-[88px] rounded-2xl overflow-hidden border-[3px] border-white"
                style={{
                  left: 'calc(1rem + 108px + 8px)',
                  boxShadow: '0 8px 24px -6px rgba(0,0,0,0.18)',
                }}
              >
                <img
                  src={HeroSection3}
                  alt="AdeyBloom product"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(106,106,106,0.5)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-cloud-gray/40 flex items-start justify-center pt-1.5"
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: 'rgba(197,133,215,0.45)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
