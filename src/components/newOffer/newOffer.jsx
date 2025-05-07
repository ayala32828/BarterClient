//בס"ד
import './newOffer.css';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { addOfferThunk } from '../../store/thunks/offers/addOffer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExchangeAlt, FaCheck, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NewOffer = () => {
    const user = useSelector(state => state.persons.user);
    const dispatch = useDispatch();

    const [newOffer, setNewOffer] = useState({
        iwant: '',
        icanGive: '',
        onTime: null
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // בדיקת תקינות הטופס
    const validateForm = () => {
        const errors = {};
        
        if (!newOffer.iwant || newOffer.iwant.trim() === '') {
            errors.iwant = 'נא להזין מה אתה מעוניין לקבל';
        }
        
        if (!newOffer.icanGive || newOffer.icanGive.trim() === '') {
            errors.icanGive = 'נא להזין מה אתה מוכן לתת';
        }
        
        if (newOffer.onTime === null) {
            errors.onTime = 'נא לבחור את תדירות ההצעה';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // הוספת הצעה חדשה
    const addNewOffer = async () => {
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const offerData = {
                zivug: 0,
                offerId: 0,
                myId: user.pid,
                iwant: newOffer.iwant,
                icanGive: newOffer.icanGive,
                onTime: newOffer.onTime
            };
            
            await dispatch(addOfferThunk(offerData));
            setShowSuccess(true);
            
            // איפוס הטופס
            setNewOffer({
                iwant: '',
                icanGive: '',
                onTime: null
            });
        } catch (error) {
            console.error('שגיאה בהוספת ההצעה:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modern-barter-container">
            <motion.div 
                className="offer-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/" className="back-link">
                    <FaArrowLeft /> חזרה לדף הבית
                </Link>
                <div className="header-content">
                    <FaExchangeAlt className="logo-icon" />
                    <h1>יצירת הצעה חדשה</h1>
                </div>
            </motion.div>

            <div className="offer-container">
                <motion.div 
                    className="offer-form-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="section-header">
                        <h2>מה תרצה <span className="highlight">להציע?</span></h2>
                        <p>מלא את הפרטים הבאים כדי ליצור הצעת החלפה חדשה</p>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <label htmlFor="Iwant">מה אתה מעוניין לקבל?</label>
                            <input 
                                className={`form-input ${formErrors.iwant ? 'error' : ''}`}
                                type="text" 
                                id="Iwant"
                                placeholder="לדוגמה: שיעורי גיטרה, ספה לסלון..."
                                value={newOffer.iwant}
                                onChange={e => setNewOffer({...newOffer, iwant: e.target.value})}
                            />
                            {formErrors.iwant && <div className="error-message">{formErrors.iwant}</div>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="Igive">מה אתה מוכן לתת בתמורה?</label>
                            <input 
                                className={`form-input ${formErrors.icanGive ? 'error' : ''}`}
                                type="text" 
                                id="Igive"
                                placeholder="לדוגמה: שיעורי אנגלית, מקרר במצב טוב..."
                                value={newOffer.icanGive}
                                onChange={e => setNewOffer({...newOffer, icanGive: e.target.value})}
                            />
                            {formErrors.icanGive && <div className="error-message">{formErrors.icanGive}</div>}
                        </div>

                        <div className="input-container">
                            <label>תדירות ההצעה</label>
                            <div className={`radio-group ${formErrors.onTime ? 'error' : ''}`}>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="one-time" 
                                        name="onTime"
                                        checked={newOffer.onTime === true}
                                        onChange={() => setNewOffer({...newOffer, onTime: true})}
                                    />
                                    <label htmlFor="one-time">פעם אחת</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="recurring" 
                                        name="onTime"
                                        checked={newOffer.onTime === false}
                                        onChange={() => setNewOffer({...newOffer, onTime: false})}
                                    />
                                    <label htmlFor="recurring">באופן קבוע</label>
                                </div>
                            </div>
                            {formErrors.onTime && <div className="error-message">{formErrors.onTime}</div>}
                        </div>
                    </div>

                    <div className="form-actions">
                        <motion.button 
                            className="primary-btn"
                            onClick={addNewOffer}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'מפרסם הצעה...' : 'פרסם הצעה'}
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div 
                    className="offer-tips"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="tips-header">
                        <FaInfoCircle />
                        <h3>טיפים ליצירת הצעה מוצלחת</h3>
                    </div>
                    <ul className="tips-list">
                        <li>היה ספציפי ככל האפשר לגבי מה שאתה מציע ומה אתה מחפש</li>
                        <li>ציין את מצב המוצר אם רלוונטי (חדש, משומש, דורש תיקון)</li>
                        <li>הוסף מיקום כדי למצוא החלפות באזור שלך</li>
                    </ul>
                </motion.div>
            </div>

            {/* דיאלוג הצלחה */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        className="dialog-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSuccess(false)}
                    >
                        <motion.div 
                            className="success-dialog"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="success-icon">
                                <FaCheck />
                            </div>
                            <h2>ההצעה פורסמה בהצלחה!</h2>
                            <p>ההצעה שלך פורסמה ותהיה זמינה למשתמשים אחרים.</p>
                            <div className="success-actions">
                                <Link to="/" className="secondary-btn">
                                    חזרה לדף הבית
                                </Link>
                                <button 
                                    className="primary-btn"
                                    onClick={() => setShowSuccess(false)}
                                >
                                    הוסף הצעה נוספת
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
