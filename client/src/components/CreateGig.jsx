import React, { useState } from 'react';
import axios from 'axios';

export default function CreateGig({ onGigCreated }) {
    const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '' });
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://localhost:3000/api/gigs', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: response.data.message });
            setFormData({ title: '', description: '', price: '', category: '' });
            if (onGigCreated) onGigCreated();
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Failed to publish gig listing.' 
            });
        }
    };

    return (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Publish a New Service Listing</h3>
            {message && (
                <div style={{ 
                    padding: '10px', 
                    marginBottom: '15px', 
                    backgroundColor: message.type === 'success' ? '#e8f5e9' : '#ffebee',
                    color: message.type === 'success' ? '#2e7d32' : '#c62828',
                    borderRadius: '4px' 
                }}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Gig Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{ padding: '8px' }}
                />
                <textarea
                    placeholder="Gig Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="3"
                    style={{ padding: '8px' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                        type="number"
                        placeholder="Price (ZAR)"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        style={{ padding: '8px' }}
                    />
                    <input
                        type="text"
                        placeholder="Category (e.g. Web Development)"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        style={{ padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Publish Gig
                </button>
            </form>
        </div>
    );
}