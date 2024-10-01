import React from 'react';
import Layout from '../components/Common/Layout';
import HeroSection from '../components/Landing/Hero';
import Solution from '../components/Landing/Solution';
import HowTo from '../components/Landing/HowTo';

function LandingPage() {
  return (
    <Layout>
      <main className="space-y-40 ">
      <HeroSection/>
      <HowTo/>
      <Solution/>
      

      </main>
    </Layout>
  );
}

export default LandingPage;
