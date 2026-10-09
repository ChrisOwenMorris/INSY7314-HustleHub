import React from 'react';
import TaxIncomeDashboard from './components/TaxIncomeDashboard';
import CreateGig from './components/CreateGig';
import BrowseGigs from './components/BrowseGigs';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>HustleHub+ Freelancer Workspace</h2>
      <TaxIncomeDashboard />
      <CreateGig />
      <BrowseGigs />
    </div>
  );
}

export default App;