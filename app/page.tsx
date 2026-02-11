import { HeroSection } from '@/components/home/hero-section';
import { StatsSection } from '@/components/home/stats-section';
import { ScheduleSection } from '@/components/home/schedule-section';
import { StravaSection } from '@/components/home/strava-section';
import { CommunitySection } from '@/components/home/community-section'; // Import this
import { PartnersSection } from '@/components/home/partners-section';
import { FAQSection } from '@/components/home/faq-section';
import { VideoReelSection } from '@/components/home/video-reel-section';
import { PartnershipForm } from '@/components/home/partnership-form';

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-body selection:bg-orange-500 selection:text-white">
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <ScheduleSection />
                <VideoReelSection />
  <CommunitySection /> 
        <StravaSection />
              <PartnersSection />
    <PartnershipForm />
        <FAQSection />
      </main>
    </div>
  );
}