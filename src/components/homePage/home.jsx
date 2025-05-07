// בסיעתא דשמיא

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { OfferTbl } from "../subComp/offTbl/offerTable";
import { useParams, Link } from "react-router-dom";
import {
    FaExchangeAlt, FaSearch, FaHandshake, FaGift, FaUsers, FaRegLightbulb,
    FaArrowRight, FaArrowLeft, FaHeart, FaShoppingCart, FaBell, FaStar,
    FaUniversalAccess, FaPalette, FaAdjust, FaQuestion, FaBook, FaShieldAlt, FaUserAlt
} from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './home.css';

export const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.persons.user);
    const allOffers = useSelector(state => state.offers.offersArr);
    const { iwant, icanGive } = useParams();
    const [want, setWant] = useState(iwant);
    const [canGive, setCanGive] = useState(icanGive);
    const [flag, setFlag] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('default');
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [showFAQDialog, setShowFAQDialog] = useState(false);
    const [bellAnimation, setBellAnimation] = useState(false);
    const [heartAnimation, setHeartAnimation] = useState(false);

    // רפרנסים לסקשנים עבור אנימציות סקרול
    const heroRef = useRef(null);
    const featuredRef = useRef(null);
    const categoriesRef = useRef(null);
    const howItWorksRef = useRef(null);
    const tableRef = useRef(null);

    // אפקט פרלקס לסקרול
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    // קטגוריות פופולריות
    const categories = [
        { id: 'electronics', name: 'אלקטרוניקה', icon: '📱', color: '#FF6B6B' },
        { id: 'furniture', name: 'ריהוט', icon: '🛋️', color: '#4ECDC4' },
        { id: 'clothing', name: 'ביגוד', icon: '👕', color: '#FFD166' },
        { id: 'services', name: 'שירותים', icon: '🔧', color: '#6A0572' },
        { id: 'books', name: 'ספרים', icon: '📚', color: '#1A535C' },
        { id: 'sports', name: 'ספורט', icon: '⚽', color: '#3A86FF' }
    ];

    // סטטיסטיקות האתר
    const stats = [
        { value: "15,000+", label: "משתמשים פעילים" },
        { value: "50,000+", label: "החלפות מוצלחות" },
        { value: "100,000+", label: "מוצרים זמינים" },
        { value: "4.8", label: "דירוג ממוצע", icon: <FaStar /> }
    ];

    // עדויות משתמשים - הוספת עדויות נוספות
    const testimonials = [
        {
            content: "החלפתי את הטלוויזיה הישנה שלי במחשב נייד חדש! חסכתי אלפי שקלים והכרתי אנשים נפלאים בדרך.",
            author: "יוסי כהן",
            image: "public/pic/סחר-חליפין.png",
            rating: 5
        },
        {
            content: "כמעצבת גרפית, אני מציעה את השירותים שלי בתמורה לשיעורי יוגה. זו דרך מדהימה לקבל שירותים שלא הייתי יכולה להרשות לעצמי.",
            author: "מיכל לוי",
            image: "/pic/user2.jpg",
            rating: 5
        },
        {
            content: "הפלטפורמה הזו שינתה את הדרך שבה אני צורך. במקום לקנות חדש, אני תמיד בודק קודם אם אפשר להחליף. חסכתי המון כסף!",
            author: "דני אבני",
            image: "pic/man1.jpg",
            rating: 4
        },
        {
            content: "מצאתי כאן חברים חדשים עם תחומי עניין משותפים. זה הרבה יותר מפלטפורמת החלפות, זו קהילה אמיתית!",
            author: "רונית שמעוני",
            image: "/pic/user4.jpg",
            rating: 5
        },
        {
            content: "בתור סטודנט, BarterHub עזר לי להשיג ספרי לימוד יקרים בהחלפה עם סטודנטים אחרים. חיסכון אדיר!",
            author: "אלון גולן",
            image: "/pic/user5.jpg",
            rating: 5
        }
    ];

    // שאלות נפוצות
    const faqs = [
        {
            question: "איך מתחילים להשתמש בפלטפורמה?",
            answer: "פשוט הירשמו, צרו פרופיל, והתחילו להעלות פריטים שברצונכם להחליף. לאחר מכן תוכלו לחפש פריטים שמעניינים אתכם ולהציע החלפות."
        },
        {
            question: "האם השימוש בפלטפורמה כרוך בתשלום?",
            answer: "לא, השימוש הבסיסי בפלטפורמה הוא חינם לחלוטין. קיימות אפשרויות פרימיום עם יתרונות נוספים למשתמשים מתקדמים."
        },
        {
            question: "איך מבטיחים שההחלפה תהיה הוגנת ובטוחה?",
            answer: "אנו מספקים מערכת דירוג משתמשים, אפשרות לבדיקת היסטוריית החלפות, ומנגנון דיווח. אנו ממליצים לקיים את ההחלפות במקומות ציבוריים ולבדוק היטב את הפריטים לפני ההחלפה."
        },
        {
            question: "מה קורה אם אני לא מרוצה מההחלפה?",
            answer: "אנו ממליצים לתאם מראש את כל פרטי ההחלפה ולבדוק את הפריטים לפני ביצוע ההחלפה. במקרה של בעיה, ניתן לפנות למערכת הגישור שלנו."
        },
        {
            question: "האם ניתן להחליף גם שירותים ולא רק מוצרים?",
            answer: "בהחלט! הפלטפורמה מאפשרת החלפת שירותים כמו שיעורים פרטיים, עזרה מקצועית, ייעוץ וכדומה, בנוסף למוצרים פיזיים."
        }
    ];

    // ערכות צבעים - שינוי לצבעים בולטים יותר
    const colorThemes = {
        default: {
            primary: '#3498db',
            secondary: '#2ecc71',
            accent: '#e74c3c',
            background: '#ffffff',
            text: '#333333',
            highlight: '#f39c12'
        },
        dark: {
            primary: '#121212',
            secondary: '#BB86FC',
            accent: '#03DAC6',
            background: '#000000',
            text: '#ffffff',
            highlight: '#CF6679'
        },
        turquoise: {
            primary: '#1abc9c',
            secondary: '#3498db',
            accent: '#e67e22',
            background: '#ecf0f1',
            text: '#2c3e50',
            highlight: '#f1c40f'
        },
        vibrant: {
            primary: '#FF0099',
            secondary: '#00CCFF',
            accent: '#FFCC00',
            background: '#330033',
            text: '#FFFFFF',
            highlight: '#FF6600'
        },
        earthy: {
            primary: '#8D6E63',
            secondary: '#A1887F',
            accent: '#4E342E',
            background: '#EFEBE9',
            text: '#3E2723',
            highlight: '#D7CCC8'
        }
    };

    // אפשרויות נגישות
    const accessibilityOptions = [
        { id: 'largeText', label: 'טקסט גדול', icon: 'A+' },
        { id: 'highContrast', label: 'ניגודיות גבוהה', icon: <FaAdjust /> },
        { id: 'reducedMotion', label: 'הפחתת אנימציות', icon: '⚡' },
        { id: 'readingGuide', label: 'מדריך קריאה', icon: '📏' },
        { id: 'textToSpeech', label: 'הקראת טקסט', icon: '🔊' }
    ];

    useEffect(() => {
        if (iwant == '**' && icanGive == '**') {
            setCanGive('');
            setWant('');
        }
        setFlag(true);

        // אפקט פרלקס בסקרול
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const heroSection = heroRef.current;

            if (heroSection) {
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [iwant, icanGive]);

    // אנימציות לאלמנטים
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const scaleIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // פונקציה להחלפת ערכת הצבעים
    const changeTheme = (themeName) => {
        const root = document.documentElement;
        const theme = colorThemes[themeName];

        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--background-color', theme.background);
        root.style.setProperty('--text-color', theme.text);
        root.style.setProperty('--highlight-color', theme.highlight);

        // שינוי צבע הלוגו לטורקיז אם נבחרה ערכת הצבעים טורקיז
        if (themeName === 'turquoise') {
            document.querySelectorAll('.logo-icon, .btn-icon').forEach(icon => {
                icon.style.color = '#1abc9c';
            });
            document.querySelectorAll('.primary-btn').forEach(btn => {
                btn.style.backgroundColor = '#1abc9c';
            });
        } else {
            document.querySelectorAll('.logo-icon, .btn-icon').forEach(icon => {
                icon.style.color = '';
            });
            document.querySelectorAll('.primary-btn').forEach(btn => {
                btn.style.backgroundColor = '';
            });
        }

        setCurrentTheme(themeName);
        setShowThemeSelector(false);
    };

    // פונקציה להפעלת אפשרויות נגישות
    const toggleAccessibilityOption = (optionId) => {
        const html = document.documentElement;

        switch (optionId) {
            case 'largeText':
                html.classList.toggle('large-text');
                break;
            case 'highContrast':
                html.classList.toggle('high-contrast');
                break;
            case 'reducedMotion':
                html.classList.toggle('reduced-motion');
                break;
            case 'readingGuide':
                toggleReadingGuide();
                break;
            case 'textToSpeech':
                speakSelectedText();
                break;
            default:
                break;
        }
    };

    // פונקציה להפעלת מדריך קריאה
    const toggleReadingGuide = () => {

        let guide = document.getElementById('reading-guide');

        if (!guide) {
            guide = document.createElement('div');
            guide.id = 'reading-guide';
            guide.style.position = 'fixed';
            guide.style.height = '40px';
            guide.style.background = 'rgba(255, 255, 0, 0.2)';
            guide.style.pointerEvents = 'none';
            guide.style.zIndex = '9999';
            guide.style.width = '100%';
            guide.style.display = 'none';
            document.body.appendChild(guide);

            document.addEventListener('mousemove', (e) => {
                if (guide.style.display !== 'none') {
                    guide.style.top = `${e.clientY - 20}px`;
                }
            });
        }

        if (guide.style.display === 'none') {
            guide.style.display = 'block';
        } else {
            guide.style.display = 'none';
        }
    };

    // פונקציה להקראת טקסט נבחר
    const speakSelectedText = () => {
        const selectedText = window.getSelection().toString();

        if (selectedText && window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(selectedText);
            utterance.lang = 'he-IL';
            window.speechSynthesis.speak(utterance);
        } else {
            alert('יש לבחור טקסט להקראה או שהדפדפן שלך אינו תומך בהקראת טקסט');
        }
    };

    // פונקציה למעבר בין עדויות
    const navigateTestimonials = (direction) => {
        if (direction === 'next') {
            setCurrentTestimonialIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentTestimonialIndex((prevIndex) =>
                prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
            );
        }
    };

    // פונקציה לפתיחת הטבלה עם אנימציה חלקה
    const toggleTable = () => {
        setShowTable(!showTable);

        if (!showTable) {
            setTimeout(() => {
                tableRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // אנימציות לאייקונים
    const animateBell = () => {
        setBellAnimation(true);
        setTimeout(() => setBellAnimation(false), 1000);
    };

    const animateHeart = () => {
        setHeartAnimation(true);
        setTimeout(() => setHeartAnimation(false), 1000);
    };

    return (
        <div className="modern-barter-container">
            {/* הדר עם ניווט */}
            <header className="modern-header">
                <div className="header-container">
                    <div className="logo-container">
                        <FaExchangeAlt className="logo-icon" />
                        <h1>BarterHub</h1>
                    </div>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="חפש מוצרים, שירותים או משתמשים..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="search-btn">
                            <FaSearch />
                        </button>
                    </div>

                    <div className="header-actions">
                        {/* כפתור נגישות */}
                        <div className="action-icon accessibility">
                            <button
                                className="accessibility-btn"
                                onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
                                aria-label="אפשרויות נגישות"
                            >
                                <FaUniversalAccess />
                            </button>

                            {/* תפריט נגישות */}
                            <AnimatePresence>
                                {showAccessibilityMenu && (
                                    <motion.div
                                        className="accessibility-menu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <h3>אפשרויות נגישות</h3>
                                        <ul>
                                            {accessibilityOptions.map(option => (
                                                <li key={option.id}>
                                                    <button onClick={() => toggleAccessibilityOption(option.id)}>
                                                        <span className="option-icon">{option.icon}</span>
                                                        <span>{option.label}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* כפתור ערכות צבעים */}
                        <div className="action-icon theme-selector">
                            <button
                                className="theme-btn"
                                onClick={() => setShowThemeSelector(!showThemeSelector)}
                                aria-label="ערכות צבעים"
                            >
                                <FaPalette />
                            </button>
                            {/* תפריט ערכות צבע */}
                            <AnimatePresence>
                                {showThemeSelector && (
                                    <motion.div
                                        className="theme-menu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <h3>ערכות צבעים</h3>
                                        <div className="theme-buttons">
                                            <button
                                                className={`theme-option ${currentTheme === 'default' ? 'active' : ''}`}
                                                onClick={() => changeTheme('default')}
                                                style={{ background: colorThemes.default.primary }}
                                                aria-label="ערכת צבעים ברירת מחדל"
                                            >
                                                <span>ברירת מחדל</span>
                                            </button>
                                            <button
                                                className={`theme-option ${currentTheme === 'dark' ? 'active' : ''}`}
                                                onClick={() => changeTheme('dark')}
                                                style={{ background: colorThemes.dark.primary }}
                                                aria-label="ערכת צבעים כהה"
                                            >
                                                <span>כהה</span>
                                            </button>
                                            <button
                                                className={`theme-option ${currentTheme === 'turquoise' ? 'active' : ''}`}
                                                onClick={() => changeTheme('turquoise')}
                                                style={{ background: colorThemes.turquoise.primary }}
                                                aria-label="ערכת צבעים טורקיז"
                                            >
                                                <span>טורקיז</span>
                                            </button>
                                            <button
                                                className={`theme-option ${currentTheme === 'vibrant' ? 'active' : ''}`}
                                                onClick={() => changeTheme('vibrant')}
                                                style={{ background: colorThemes.vibrant.primary }}
                                                aria-label="ערכת צבעים חיה"
                                            >
                                                <span>חיה</span>
                                            </button>
                                            <button
                                                className={`theme-option ${currentTheme === 'earthy' ? 'active' : ''}`}
                                                onClick={() => changeTheme('earthy')}
                                                style={{ background: colorThemes.earthy.primary }}
                                                aria-label="ערכת צבעים טבעית"
                                            >
                                                <span>טבעית</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {user ? (
                            <>
                                <div className="action-icon notification">
                                    <motion.div
                                        animate={bellAnimation ? {
                                            rotate: [0, 15, -15, 10, -10, 5, -5, 0],
                                            scale: [1, 1.2, 1]
                                        } : {}}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaBell onClick={animateBell} />
                                    </motion.div>
                                    <span className="badge">3</span>
                                </div>
                                <div className="action-icon favorites">
                                    <motion.div
                                        animate={heartAnimation ? {
                                            scale: [1, 1.4, 1, 1.2, 1],
                                            color: ['#e74c3c', '#ff0000', '#e74c3c']
                                        } : {}}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaHeart onClick={animateHeart} />
                                    </motion.div>
                                    <span className="badge">5</span>
                                </div>
                                <div className="user-profile">
                                    <img src={user.profilePic || "/pic/default-avatar.jpg"} alt={user.firstName} />
                                    <span>{user.firstName}</span>
                                </div>
                            </>
                        ) : (
                            <button className="login-btn">התחברות / הרשמה</button>
                        )}

                        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            className="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul>
                                <li><a href="#featured">הצעות מובילות</a></li>
                                <li><a href="#categories">קטגוריות</a></li>
                                <li><a href="#how-it-works">איך זה עובד</a></li>
                                <li><a href="#about">אודות</a></li>
                                {user && <li><a href="/profile">הפרופיל שלי</a></li>}
                                {user && <li><a href="/my-offers">ההצעות שלי</a></li>}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            {/* סקשן גיבור עם אנימציה */}
            <section className="hero-section" ref={heroRef}>
                <motion.div
                    className="hero-content"
                    style={{ opacity: 1 }} // שינוי כדי שהטקסט יהיה תמיד נראה
                >
                    <motion.h1 style={{ color: "white"}}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-title" // הוספת קלאס ייעודי לסגנון
                    >
                        החלף. חסוך. <span className="highlight">התחדש.</span>
                    </motion.h1>

                    <motion.p style={{ color: "white"}}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hero-subtitle" // הוספת קלאס ייעודי לסגנון
                    >
                        
                        פלטפורמת הברטר המתקדמת בישראל - החלף מוצרים ושירותים ללא כסף
                    </motion.p>

                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className="primary-btn pulse-effect">
                            פרסם הצעה חדשה <FaGift className="btn-icon" />
                        </button>
                        <button className="secondary-btn" onClick={toggleTable}>
                            גלה הצעות <FaSearch className="btn-icon" />
                        </button>
                    </motion.div>
                </motion.div>

                <div className="hero-overlay"></div>
                <div className="wave-bottom"></div>
            </section>

            {/* סטטיסטיקות */}
            <section className="stats-section">
                <motion.div
                    className="stats-container"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-item"
                            variants={scaleIn}
                        >
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                            {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* טבלת הצעות עם אנימציה */}
            <div ref={tableRef}></div>
            <AnimatePresence>
                {showTable && (
                    <motion.section
                        className="offers-table-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="section-header">

                            <h2>כל ההצעות הזמינות</h2>
                            <button className="close-btn" onClick={toggleTable}>
                                סגור <span>×</span>
                            </button>
                        </div>

                        <div className="offers-filters">
                            <div className="filter-tabs">
                                <button
                                    className={activeCategory === 'all' ? 'active' : ''}
                                    onClick={() => setActiveCategory('all')}
                                >
                                    הכל
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        className={activeCategory === category.id ? 'active' : ''}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        {category.icon} {category.name}
                                    </button>
                                ))}
                            </div>

                            <div className="sort-options">
                                <select>
                                    <option value="newest">החדשים ביותר</option>
                                    <option value="popular">הפופולריים ביותר</option>
                                    <option value="nearby">הקרובים אליי</option>
                                </select>
                            </div>
                        </div>

                        <div className="offers-table-container">
                            {flag && allOffers && allOffers.length > 0 && (
                                <OfferTbl
                                    user={user}
                                    tbl={allOffers}
                                    myOffers={false}
                                    iwant={want}
                                    icanGive={canGive}
                                />
                            )}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* איך זה עובד - עיצוב חדש */}
            <section className="how-it-works-section" id="how-it-works" ref={howItWorksRef}>
                <div className="section-header modern">
                    <h2>איך זה <span className="highlight">עובד?</span></h2>
                    <p>שלושה צעדים פשוטים להתחלת החלפות מוצלחות</p>
                </div>

                <div className="steps-container modern">
                    <motion.div
                        className="steps-wrapper modern"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div className="step-card" variants={fadeInUp}>
                            <div className="step-icon-container">
                                <FaGift className="step-icon" />
                                <div className="step-number">1</div>
                            </div>
                            <div className="step-content">
                                <h3>פרסם את ההצעה שלך</h3>
                                <p>העלה תיאור של המוצר או השירות שברצונך להציע, וציין מה אתה מחפש בתמורה.</p>
                            </div>
                        </motion.div>

                        <motion.div className="step-card" variants={fadeInUp}>
                            <div className="step-icon-container">
                                <FaSearch className="step-icon" />
                                <div className="step-number">2</div>
                            </div>
                            <div className="step-content">
                                <h3>מצא התאמות מושלמות</h3>
                                <p>חפש בין אלפי הצעות או קבל התראות כשמישהו מציע את מה שאתה מחפש.</p>
                            </div>
                        </motion.div>

                        <motion.div className="step-card" variants={fadeInUp}>
                            <div className="step-icon-container">
                                <FaHandshake className="step-icon" />
                                <div className="step-number">3</div>
                            </div>
                            <div className="step-content">
                                <h3>סגור עסקה והחלף</h3>
                                <p>צור קשר, תאם פגישה ובצע את ההחלפה. דרג את החוויה ושתף אותה עם הקהילה.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="cta-container centered">
                    <motion.button
                        className="primary-btn large-btn modern-cta"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTable}
                    >
                        התחל עכשיו <FaArrowLeft className="btn-icon" />
                    </motion.button>
                </div>
            </section>

            {/* סקשן עדויות - עם חיצים עובדים */}
            <section className="testimonials-section">
                <div className="section-header">
                    <h2>מה <span className="highlight">אומרים עלינו?</span></h2>
                    <p>חוויות אמיתיות מחברי קהילת הברטר שלנו</p>
                </div>

                <div className="testimonials-slider">
                    <motion.div
                        className="testimonials-container"
                        drag="x"
                        dragConstraints={{ left: -950, right: 0 }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className={`testimonial-card ${index === currentTestimonialIndex ? 'active' : ''}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: index === currentTestimonialIndex ? 1 : 0.3,
                                    x: 0,
                                    scale: index === currentTestimonialIndex ? 1 : 0.9
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="testimonial-content">
                                    <p>"{testimonial.content}"</p>
                                </div>
                                <div className="testimonial-author">
                                    <img src={testimonial.image} alt={testimonial.author} />
                                    <div>
                                        <h4>{testimonial.author}</h4>
                                        <div className="author-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={i < testimonial.rating ? "filled" : ""}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="slider-controls">
                        <button
                            className="slider-arrow prev"
                            onClick={() => navigateTestimonials('prev')}
                        >
                            <FaArrowRight />
                        </button>
                        <div className="slider-dots">
                            {testimonials.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentTestimonialIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentTestimonialIndex(index)}
                                ></span>
                            ))}
                        </div>
                        <button
                            className="slider-arrow next"
                            onClick={() => navigateTestimonials('next')}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                </div>
            </section>

            {/* סקשן הרשמה לניוזלטר */}
            <section className="newsletter-section">
                <div className="newsletter-container">
                    <div className="newsletter-content">
                        <h2>הישאר <span className="highlight">מעודכן</span></h2>
                        <p>הירשם לניוזלטר שלנו וקבל עדכונים על הצעות חדשות והזדמנויות מיוחדות</p>

                        <form className="newsletter-form">
                            <input type="email" placeholder="הזן את כתובת האימייל שלך" />
                            <button type="submit" className="submit-btn">הרשמה</button>
                        </form>
                    </div>

                    <div className="newsletter-image">
                        <img src="/pic/newsletter.jpg" alt="הרשמה לניוזלטר" />
                    </div>
                </div>
            </section>

            {/* פוטר */}
            <footer className="modern-footer">
                <div className="footer-top">
                    <div className="footer-logo">
                        <FaExchangeAlt className="logo-icon" />
                        <h2>BarterHub</h2>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h3>ניווט מהיר</h3>
                            <ul>
                                <li><a href="#featured">הצעות מובילות</a></li>
                                <li><a href="#categories">קטגוריות</a></li>
                                <li><a href="#how-it-works">איך זה עובד</a></li>
                                <li><a href="#about">אודות</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>משאבים</h3>
                            <ul>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('מדריך למשתמש יפתח בקרוב'); }}>מדריך למשתמש</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); setShowFAQDialog(true); }}>שאלות נפוצות</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('טיפים להחלפה מוצלחת:\n1. בדוק היטב את המוצר לפני ההחלפה\n2. תאם ציפיות מראש\n3. קבע מקום ציבורי לביצוע ההחלפה\n4. תעד את ההחלפה'); }}>טיפים להחלפה מוצלחת</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('אנו מקפידים על בטיחות המשתמשים שלנו. אנא בצעו החלפות במקומות ציבוריים, אל תשתפו פרטים אישיים מיותרים, ודווחו על התנהגות חשודה.'); }}>בטיחות וביטחון</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>צור קשר</h3>
                            <ul>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('צוות התמיכה שלנו זמין בימים א-ה בין השעות 9:00-18:00\nמייל: support@barterhub.co.il\nטלפון: 03-1234567'); }}>תמיכה</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('תודה שדיווחת על בעיה. אנא שלח פרטים מלאים למייל: report@barterhub.co.il'); }}>דיווח על בעיה</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('מעוניינים בשיתוף פעולה עסקי? אנא פנו אלינו: business@barterhub.co.il'); }}>שיתוף פעולה עסקי</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('אנחנו תמיד מחפשים אנשי צוות מוכשרים! שלח קו"ח ל: jobs@barterhub.co.il'); }}>קריירה</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>עקבו אחרינו</h3>
                            <div className="social-icons">
                                <a href="#" className="social-icon facebook" onClick={(e) => { e.preventDefault(); window.open('https://facebook.com', '_blank'); }}>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social-icon instagram" onClick={(e) => { e.preventDefault(); window.open('https://instagram.com', '_blank'); }}>
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="social-icon twitter" onClick={(e) => { e.preventDefault(); window.open('https://twitter.com', '_blank'); }}>
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="social-icon linkedin" onClick={(e) => { e.preventDefault(); window.open('https://linkedin.com', '_blank'); }}>
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>

                            <div className="app-download">
                                <h3>הורד את האפליקציה</h3>
                                <div className="app-buttons">
                                    <a href="#" className="app-button" onClick={(e) => { e.preventDefault(); alert('האפליקציה תהיה זמינה בקרוב ב-App Store!'); }}>
                                        <img src="/pic/app-store.png" alt="App Store" />
                                    </a>
                                    <a href="#" className="app-button" onClick={(e) => { e.preventDefault(); alert('האפליקציה תהיה זמינה בקרוב ב-Google Play!'); }}>
                                        <img src="/pic/google-play.png" alt="Google Play" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} BarterHub. כל הזכויות שמורות.</p>
                        <div className="footer-bottom-links">
                            <a href="#" onClick={(e) => { e.preventDefault(); alert('תנאי השימוש באתר BarterHub:\n\n1. השימוש באתר מיועד לגילאי 18 ומעלה\n2. אין לפרסם תוכן פוגעני או לא חוקי\n3. האחריות על המוצרים והשירותים היא על המשתמשים בלבד\n4. אנו שומרים את הזכות להסיר תוכן שאינו הולם'); }}>תנאי שימוש</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); alert('מדיניות הפרטיות שלנו:\n\n1. אנו אוספים מידע בסיסי כדי לשפר את השירות\n2. איננו מוכרים את המידע האישי שלך לצדדים שלישיים\n3. אתה יכול לבקש למחוק את המידע שלך בכל עת'); }}>מדיניות פרטיות</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); alert('מדיניות עוגיות:\n\nאנו משתמשים בעוגיות כדי לשפר את חווית המשתמש שלך. המשך השימוש באתר מהווה הסכמה למדיניות העוגיות שלנו.'); }}>מדיניות עוגיות</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* כפתור נגישות צף */}
            <div className="floating-accessibility-btn">
                <button
                    onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
                    aria-label="אפשרויות נגישות"
                >
                    <FaUniversalAccess />
                </button>
            </div>

            {/* דיאלוג שאלות נפוצות */}
            <AnimatePresence>
                {showFAQDialog && (
                    <motion.div
                        className="faq-dialog-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowFAQDialog(false)}
                    >
                        <motion.div
                            className="faq-dialog"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="faq-dialog-header">
                                <h2>שאלות נפוצות</h2>
                                <button
                                    className="close-dialog-btn"
                                    onClick={() => setShowFAQDialog(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="faq-dialog-content">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="faq-item">
                                        <div className="faq-question">
                                            <FaQuestion className="faq-icon" />
                                            <h3>{faq.question}</h3>
                                        </div>
                                        <div className="faq-answer">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


