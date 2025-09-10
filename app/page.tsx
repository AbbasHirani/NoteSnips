import CallToAction from "@/components/call-to-action";
import Features from "@/components/features";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteSnips - Create and Manage Notes with Ease",
  description: "A powerful note-taking application that helps you organize, create, and manage your notes efficiently. Start taking notes today!",
};

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <Features/>
      <CallToAction/>
      <Footer />
    </main>
    
  );
}
