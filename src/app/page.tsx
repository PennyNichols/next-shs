'use client';
import React from 'react';
import PageContainer from '@/components/common/PageContainer/PageContainer';
import { ServiceAreas, Reviews, Services } from '@/components/sections';
import { useUser } from '@/hooks';

const Home = () => {
  const { user } = useUser();
  console.log('user', user);
  return (
    <PageContainer>
      <ServiceAreas />
      <Services />
      <Reviews />
    </PageContainer>
  );
};

export default Home;
