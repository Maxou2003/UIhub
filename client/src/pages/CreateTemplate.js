import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isConnected } from '../utils/connected';
import './css/CreateTemplate.css';

function CreateTemplate() {
    const navigate = useNavigate();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [label, setLabel] = useState('button');
    const [isPublic, setIsPublic] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState(null);


    useEffect(() => {
        const checkAuthAndGetUserId = async () => {
            if (!isConnected()) {
                navigate('/login');
                return;
            }

            try {
                const response = await api.get('/auth/logged');
                setLoggedUserId(response.data.user._id);
            } catch (err) {
                console.error('Failed to fetch user ID:', err);
                navigate('/login');
            }
        };

        checkAuthAndGetUserId();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!html.trim() || !css.trim()) {
            setError('Both HTML and CSS code are required');
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post('/template', {
                html,
                css,
                label,
                owner: loggedUserId,
                public: isPublic,
                favorite: isFavorite
            });
            navigate(`/profile/${loggedUserId}`); // Redirect to profile after creation
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create template');
            console.error('Template creation error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-template-container">
            <h1>Create New Template</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Label:</label>
                    <select
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="form-select"
                    >
                        {['Button', 'Checkbox', 'Card', 'Loader', 'Toggle Switch', 'Radio Button', 'Form', 'Input'].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>HTML Code:</label>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        className="code-input"
                        rows={10}
                        placeholder="Enter your HTML code here..."
                    />
                </div>

                <div className="form-group">
                    <label>CSS Code:</label>
                    <textarea
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                        className="code-input"
                        rows={10}
                        placeholder="Enter your CSS code here..."
                    />
                </div>

                <div className="form-group switches">
                    <div className="switch-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={() => setIsPublic(!isPublic)}
                            />
                            <span className="switch-label">Make Public</span>
                        </label>
                    </div>

                    <div className="switch-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={isFavorite}
                                onChange={() => setIsFavorite(!isFavorite)}
                            />
                            <span className="switch-label">Save as Favorite</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Template'}
                </button>
            </form>
        </div>
    );
}

export default CreateTemplate;