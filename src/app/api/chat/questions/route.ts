import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const QUESTIONS = [
  {
    id: "q1",
    text: "What certifications do your products carry?",
    answer: "Our products carry major international certifications including ISO 9001:2015, CE, EN standards, and ANSI Z359 for safety equipment. Visit our Certifications page for details."
  },
  {
    id: "q2",
    text: "How do I purchase industrial equipment?",
    answer: "To purchase equipment, technical teams can contact us directly at sales@vertacore.com with their requirements. We fulfill orders for Oil & Gas, Marine, and major industrial sectors worldwide."
  },
  {
    id: "q3",
    text: "Which industries do you serve?",
    answer: "VERTACORE serves major enterprise clients in Oil & Gas, Marine, Construction, Manufacturing, and Mining sectors worldwide."
  },
  {
    id: "q4",
    text: "Do you supply welding products?",
    answer: "Yes, we provide a comprehensive range of welding systems, protective gear, and industrial consumables from leading global brands."
  },
];

export async function GET() {
  return NextResponse.json({
    enabled: !!process.env.AI_API_KEY,
    questions: QUESTIONS,
  });
}
