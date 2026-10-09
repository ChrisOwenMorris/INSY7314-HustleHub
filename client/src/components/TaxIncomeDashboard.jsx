import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaxIncomeDashboard() {
    const [financials, setFinancials] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://localhost:3000/api/gigs/freelancer/financial-summary', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFinancials(response.data.data);
            } catch (err) {
                console.error('Failed to load financial metrics', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) return <div>Loading financial insights...</div>;
    if (!financials) return <div>No financial records available.</div>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px' }}>
            <h3>Freelancer Financial & Tax Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <div style={{ background: '#eef9ff', padding: '15px', borderRadius: '6px' }}>
                    <h4>Gross Earnings</h4>
                    <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>R {financials.grossIncome}</p>
                </div>
                <div style={{ background: '#fff0f0', padding: '15px', borderRadius: '6px' }}>
                    <h4>Estimated Tax Obligation</h4>
                    <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#d32f2f' }}>R {financials.estimatedTax}</p>
                    <small>Effective Rate: {financials.effectiveTaxRate}</small>
                </div>
                <div style={{ background: '#f0fff0', padding: '15px', borderRadius: '6px', gridColumn: 'span 2' }}>
                    <h4>Estimated Net Take-Home Income</h4>
                    <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#2e7d32' }}>R {financials.netIncome}</p>
                </div>
            </div>
        </div>
    );
}