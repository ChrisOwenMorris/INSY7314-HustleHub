import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BrowseGigs() {
    const [gigs, setGigs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGigs = async (query = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`https://localhost:3000/api/gigs${query ? `?search=${query}` : ''}`);
            setGigs(response.data.data);
        } catch (err) {
            console.error('Failed to load gig listings', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGigs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchGigs(search);
    };

    return (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Available Freelance Gigs</h3>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
            </form>

            {loading ? (
                <div>Loading gigs...</div>
            ) : gigs.length === 0 ? (
                <p>No gigs found matching your criteria.</p>
            ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {gigs.map((gig) => (
                        <div key={gig.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px' }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{gig.title}</h4>
                            <p style={{ margin: '0 0 10px 0', color: '#555' }}>{gig.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span>Category: <strong>{gig.category}</strong></span>
                                <span>Price: <strong>R {gig.price}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}