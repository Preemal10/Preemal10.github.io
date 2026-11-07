import SectionHeading from '@/components/SectionHeading';
import ProfileTerminal from '@/components/terminal/ProfileTerminal';

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About" title="Engineering with a product mindset" />
        <ProfileTerminal />
      </div>
    </section>
  );
}
