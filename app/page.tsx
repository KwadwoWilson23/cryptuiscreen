import IPhoneMockup from '@/components/IPhoneMockup';
import AppShell from '@/components/AppShell';

export default function Page() {
  return (
    <main className="min-h-[100dvh] w-full">
      <IPhoneMockup>
        <AppShell />
      </IPhoneMockup>
    </main>
  );
}
