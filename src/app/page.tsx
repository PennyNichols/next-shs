'use client';
import React from 'react';
import PageContainer from '@/components/common/PageContainer/PageContainer';
import { ServiceAreas, Reviews, Services } from '@/components/sections';

const Home = () => {
  return (
    <PageContainer>
      <ServiceAreas />
      <Services />
      <Reviews />
    </PageContainer>
  );
};

export default Home;
