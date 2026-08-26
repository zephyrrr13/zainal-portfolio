import { PortfolioSection } from "@/components/portfolio-section";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Works // ZAINAL ABIDIN",
  description: "Selected 3D stage environments, live concert VJ operations, and brand design cases by Zainal Abidin.",
};

export default function WorksPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#000000] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO HOME</span>
        </Link>
      </div>
      <PortfolioSection />
    </div>
  );
}
