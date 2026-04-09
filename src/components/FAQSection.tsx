/**
 * FAQ Section Component
 * 
 * Comprehensive frequently asked questions section with categorized filtering,
 * search functionality, and expandable question cards. Provides answers to
 * common player inquiries about the server.
 * 
 * Key Features:
 * - Categorized FAQ filtering (General, Gameplay, Technical, Payment, Rules)
 * - Expandable question cards with smooth animations
 * - Search functionality across questions and answers
 * - Responsive design for all devices
 * - Support contact integration
 * - Structured data for SEO optimization
 * 
 * FAQ Categories:
 * - General: Basic server information and joining instructions
 * - Gameplay: Game mechanics, features, and player interactions
 * - Technical: Version support, performance, and troubleshooting
 * - Payment: VIP ranks, pricing, and refund policies
 * - Rules: Server rules, moderation, and community guidelines
 * 
 * Content Structure:
 * - Question and answer pairs with detailed explanations
 * - Category-based organization for easy navigation
 * - Icon-based visual categorization
 * - Progressive disclosure for better UX
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Enhanced categorization and mobile optimization
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Server, Shield, Coins, Users, Zap } from 'lucide-react';

// ==================== INTERFACES ====================

/**
 * FAQ Item Interface
 * 
 * Represents a single frequently asked question with its answer and metadata.
 * 
 * @interface FAQItem
 * @property {number} id - Unique identifier for the FAQ item
 * @property {string} question - The question text
 * @property {string} answer - Detailed answer to the question
 * @property {string} category - Category classification for filtering
 * @property {React.ReactNode} icon - Icon component representing the category
 */
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'gameplay' | 'technical' | 'payment' | 'rules';
  icon: React.ReactNode;
}

/**
 * FAQ Category Interface
 * 
 * Represents a category filter option with display information.
 * 
 * @interface FAQCategory
 * @property {string} id - Category identifier
 * @property {string} name - Display name for the category
 * @property {React.ReactNode} icon - Icon component for the category
 */
interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// ==================== CONSTANTS ====================

/**
 * FAQ Data Configuration
 * 
 * Complete list of frequently asked questions organized by category.
 * Each question includes detailed answers and appropriate categorization.
 * 
 * @constant {FAQItem[]} faqData
 */
const faqData: FAQItem[] = [
  // General Questions
  {
    id: 1,
    question: "How do I join the CreeperCraft server?",
    answer: "Simply add 'play.creepercraft.net' to your Minecraft server list and connect! Make sure you're using the latest version of Minecraft Java Edition. No mods or special setup required.",
    category: 'general',
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 2,
    question: "What version of Minecraft do you support?",
    answer: "We support Minecraft Java Edition versions 1.19.x to 1.21.x. We recommend using the latest stable version for the best experience and access to all features.",
    category: 'technical',
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 3,
    question: "Is the server available 24/7?",
    answer: "Yes! CreeperCraft runs 24/7 with 99.9% uptime. Our dedicated servers ensure you can play anytime, anywhere. We perform brief maintenance during off-peak hours when necessary.",
    category: 'technical',
    icon: <Zap className="w-5 h-5" />
  },

  // Gameplay Questions
  {
    id: 4,
    question: "What is Hardcore mode and how does it work?",
    answer: "Our Hardcore mode features permanent death with high-stakes gameplay. When you die, you lose all items and must restart. However, VIP members get special resurrection abilities and item protection features.",
    category: 'gameplay',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 5,
    question: "Can I play with friends and create teams?",
    answer: "Absolutely! You can create or join guilds with up to 20 members. Guild members can share resources, build together, and compete in guild wars. Use /guild create [name] to start your own guild.",
    category: 'gameplay',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 6,
    question: "Are there any banned items or restrictions?",
    answer: "We maintain a balanced gameplay experience by restricting certain overpowered items like bedrock, command blocks, and some enchanted items above level 5. TNT is limited in spawn areas but allowed in designated PvP zones.",
    category: 'rules',
    icon: <Shield className="w-5 h-5" />
  },

  // Payment Questions
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer: "We accept PayPal, credit/debit cards (Visa, MasterCard, American Express), and various digital payment methods. All transactions are secured with SSL encryption for your safety.",
    category: 'payment',
    icon: <Coins className="w-5 h-5" />
  },
  {
    id: 8,
    question: "Do VIP ranks expire or are they permanent?",
    answer: "VIP and SVIP ranks are monthly subscriptions that auto-renew. VIP Lifetime is a one-time purchase that never expires. You can cancel subscriptions anytime from your account dashboard.",
    category: 'payment',
    icon: <Coins className="w-5 h-5" />
  },
  {
    id: 9,
    question: "Can I get a refund if I'm not satisfied?",
    answer: "We offer a 7-day money-back guarantee for all purchases. If you're not completely satisfied with your VIP experience, contact our support team for a full refund within 7 days of purchase.",
    category: 'payment',
    icon: <Coins className="w-5 h-5" />
  },

  // Rules & Community
  {
    id: 10,
    question: "What are the main server rules?",
    answer: "Key rules include: No griefing in safe zones, no cheating/hacking, respect all players, no spam in chat, and follow staff instructions. Breaking rules results in warnings, temporary bans, or permanent bans depending on severity.",
    category: 'rules',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 11,
    question: "How do I report a player or get help?",
    answer: "Use /report [player] [reason] in-game, join our Discord support channel, or contact staff directly. We have 24/7 moderation and respond to reports within 30 minutes during peak hours.",
    category: 'rules',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 12,
    question: "Can I stream or create content about the server?",
    answer: "Yes! We encourage content creation. Tag us @CreeperCraft on social media and we might feature your content. Popular streamers can apply for our Creator Program for special perks and early access to updates.",
    category: 'general',
    icon: <Users className="w-5 h-5" />
  }
];

/**
 * Categories Configuration
 * 
 * Defines all available FAQ categories with their display information.
 * 
 * @constant {FAQCategory[]} categories
 */
const categories: FAQCategory[] = [
  { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'general', name: 'General', icon: <Server className="w-4 h-4" /> },
  { id: 'gameplay', name: 'Gameplay', icon: <Shield className="w-4 h-4" /> },
  { id: 'technical', name: 'Technical', icon: <Zap className="w-4 h-4" /> },
  { id: 'payment', name: 'Payment', icon: <Coins className="w-4 h-4" /> },
  { id: 'rules', name: 'Rules', icon: <Users className="w-4 h-4" /> }
];

// ==================== COMPONENT ====================

/**
 * FAQ Section Component
 * 
 * Main component that renders the complete FAQ interface with filtering,
 * expandable questions, and support contact information.
 * 
 * @returns {JSX.Element} FAQ section JSX
 */
export const FAQSection: React.FC = () => {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Active category filter state
   * @type {string} activeCategory - Currently selected category filter
   */
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  /**
   * Expanded items state
   * @type {Set<number>} openItems - Set of currently expanded FAQ item IDs
   */
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Toggle FAQ Item Expansion
   * 
   * Toggles the expanded state of a specific FAQ item.
   * Uses Set for efficient state management of multiple open items.
   * 
   * @param {number} id - ID of the FAQ item to toggle
   */
  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Filter FAQs based on active category
   * @type {FAQItem[]} filteredFAQs - Filtered FAQ items array
   */
  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  // ==================== RENDER ====================
  
  return (
    <section id="faq" className="py-16 sm:py-20 bg-gradient-to-b from-primary-dark to-secondary-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-40 h-40 bg-grass-green rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-blue-500 rounded-full blur-3xl bottom-20 right-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-24 h-24 bg-purple-500 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-grass-green text-primary-dark text-xs px-4 py-2 rounded-full font-bold mb-4 uppercase tracking-wider">
            NEED HELP?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-wider uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-16 h-1 bg-grass-green mx-auto mb-4"></div>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            Find answers to common questions about CreeperCraft server, gameplay, and features
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-grass-green text-primary-dark shadow-lg scale-105'
                  : 'bg-secondary-dark/60 text-light-gray hover:text-white hover:bg-secondary-dark/80 border border-white/10'
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="glass rounded-2xl border border-white/10 hover:border-grass-green/30 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="text-grass-green flex-shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {item.question}
                    </h3>
                  </div>
                  <div className="text-grass-green ml-4 flex-shrink-0 transform transition-transform duration-200">
                    {openItems.has(item.id) ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>
                
                {openItems.has(item.id) && (
                  <div className="px-6 pb-6 animate-fade-in-up">
                    <div className="pl-9 border-l-2 border-grass-green/20">
                      <p className="text-light-gray leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-light-gray mx-auto mb-4 opacity-50" />
              <p className="text-light-gray text-lg">No questions found in this category.</p>
            </div>
          )}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border-2 border-grass-green/20 hover:border-grass-green/40 transition-all duration-300">
            <div className="w-16 h-16 bg-grass-green rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary-dark" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Still Need Help?</h3>
            <p className="text-light-gray mb-6 leading-relaxed">
              Can't find the answer you're looking for? Our support team is available 24/7 to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-green">
                JOIN DISCORD SUPPORT
              </button>
              <button className="btn bg-secondary-dark hover:bg-secondary-dark/80 text-white border border-white/20 hover:border-white/40">
                EMAIL SUPPORT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};