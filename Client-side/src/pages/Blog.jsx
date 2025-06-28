import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

const Blog = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      id: 1,
      title: t('blogPost1Title'),
      excerpt: t('blogPost1Excerpt'),
      author: t('blogAuthor1'),
      date: '2024-01-15',
      readTime: '5 min read',
      category: t('skincare'),
      image: '/blog-1.jpg'
    },
    {
      id: 2,
      title: t('blogPost2Title'),
      excerpt: t('blogPost2Excerpt'),
      author: t('blogAuthor2'),
      date: '2024-01-10',
      readTime: '7 min read',
      category: t('makeup'),
      image: '/blog-2.jpg'
    },
    {
      id: 3,
      title: t('blogPost3Title'),
      excerpt: t('blogPost3Excerpt'),
      author: t('blogAuthor1'),
      date: '2024-01-05',
      readTime: '4 min read',
      category: t('haircare'),
      image: '/blog-3.jpg'
    },
    {
      id: 4,
      title: t('blogPost4Title'),
      excerpt: t('blogPost4Excerpt'),
      author: t('blogAuthor2'),
      date: '2023-12-28',
      readTime: '6 min read',
      category: t('skincare'),
      image: '/blog-4.jpg'
    },
    {
      id: 5,
      title: t('blogPost5Title'),
      excerpt: t('blogPost5Excerpt'),
      author: t('blogAuthor1'),
      date: '2023-12-20',
      readTime: '8 min read',
      category: t('makeup'),
      image: '/blog-5.jpg'
    },
    {
      id: 6,
      title: t('blogPost6Title'),
      excerpt: t('blogPost6Excerpt'),
      author: t('blogAuthor2'),
      date: '2023-12-15',
      readTime: '5 min read',
      category: t('haircare'),
      image: '/blog-6.jpg'
    }
  ];

  const categories = [
    { name: t('all'), count: blogPosts.length },
    { name: t('skincare'), count: blogPosts.filter(post => post.category === t('skincare')).length },
    { name: t('makeup'), count: blogPosts.filter(post => post.category === t('makeup')).length },
    { name: t('haircare'), count: blogPosts.filter(post => post.category === t('haircare')).length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('beautyBlog')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('blogDescription')}
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-700 hover:text-primary-accent"
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                  <span className="text-gray-500">{t('featuredImage')}</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <span className="inline-block bg-primary-accent text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {t('featured')}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <FiUser className="mr-2" />
                  <span className="mr-4">{blogPosts[0].author}</span>
                  <FiCalendar className="mr-2" />
                  <span className="mr-4">{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  <FiClock className="mr-2" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <button className="bg-primary-accent text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                  {t('readMore')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <span className="text-gray-500">{t('blogImage')}</span>
              </div>
              <div className="p-6">
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FiUser className="mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <FiCalendar className="mr-2" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <button className="text-primary-accent hover:text-purple-700 font-medium transition-colors duration-300">
                  {t('readMore')} →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary-accent to-purple-600 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            {t('stayUpdated')}
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {t('newsletterDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              {t('subscribe')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog; 