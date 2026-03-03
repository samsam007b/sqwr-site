import type { Metadata } from 'next';
import HomePageWrapper from '@/components/pages/HomePageWrapper';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sqwr.be',
  },
};

export default function Home() {
  return <HomePageWrapper />;
}
