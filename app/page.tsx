"use client"; // Enable client-side behavior
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import {
  ArrowRight,
  Annoyed,
  Snail,
  ChartNoAxesCombined,
  MessageSquareOff,
  FileText,
  Speech,
  Bot,
  UsersRound,
  Database,
} from "lucide-react";
import { AnimatedBeams } from "@/components/workflow/AnimatedBeam";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import BlurFade from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import Marquee from "@/components/ui/marquee";

const features = [
  {
    Icon: Bot,
    name: "AI-Powered Virtual Assistant",
    description:
      "Interact with a chatbot designed to enhance your soft skills with personalized guidance and insights.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: UsersRound,
    name: "Interactive Roleplay Scenarios",
    description:
      "Practice real-world soft skills through simulated scenarios tailored to your needs.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: FileText,
    name: "Research-Driven Framework",
    description:
      "Built on proven pedagogical frameworks to ensure objectivity in skill evaluation.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: ChartNoAxesCombined,
    name: "Grading and Feedback",
    description:
      "Receive detailed evaluations and actionable insights to track your progress over time.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Database,
    name: "Knowledge Base Access",
    description:
      "Explore relevant research papers and resources to deepen your understanding.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function Home() {
  const router = useRouter(); // Initialize router

  // Handle click to navigate to login
  const handleBadgeClick = () => {
    router.push("/login"); // Navigate to login page
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Header */}
      <header className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:justify-between text-sm mt-6 lg:mt-8 mb-8 px-4 sm:px-6">
        <a
          className="flex items-center gap-3 p-3 mb-4 lg:mb-0"
          href="https://skillcraft-self.vercel.app"
          target=""
          rel="noopener noreferrer"
        >
          <Image
            width={36}
            height={36}
            src="/icons8-asterisk-64.png"
            alt="star logo"
            className="w-9 h-9"
          />
          <span className="text-sm lg:text-sm font-medium text-gray-900 dark:text-gray-100">
            Powered by ImagineKit
          </span>
        </a>
        <a
          href="/login"
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg px-6 py-3 shadow-lg hover:bg-gradient-to-l transition duration-300"
        >
          <p className="text-sm font-semibold">Try Skill-craft now</p>
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center flex-grow justify-center mt-8 lg:mt-24 px-4 sm:px-6 w-full max-w-6xl">
        {/* Badge for Announcement with onClick for routing */}
        <Badge
          className="bg-blue-400 text-gray-50 p-1 text-sm hover:bg-blue-400 hover:text-gray-50 cursor-pointer"
          onClick={handleBadgeClick} // Navigate to login on click
        >
          <Badge className="bg-gray-50 text-blue-400 mx-1 mr-2 text-sm hover:bg-gray-50 hover:text-blue-400">
            📣 Announcement
          </Badge>
          Introducing Skill-craft.ai
          <ArrowRight className="m-1 w-4 h-4" />
        </Badge>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-10 lg:mb-6">
          Welcome to{" "}
          <a className="text-blue-600 dark:text-blue-400">Skill-craft</a>!
        </h1>
        <p className="text-lg sm:text-xl max-w-full sm:max-w-2xl lg:max-w-3xl text-gray-600 mb-8 dark:text-gray-300">
          Empowering learners and professionals in vocational education with
          AI-driven tools to enhance and develop soft skills.
        </p>

        {/* Get started button */}
        <a
          href="/login"
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg px-6 py-3 shadow-lg hover:bg-gradient-to-l transition duration-300"
        >
          <p className="text-sm font-semibold">
            Get started for <span className="font-bold">free</span>
          </p>
        </a>
        <p className="text-xs mt-5 text-gray-400">No credit card required.</p>

        {/* Image with BorderBeam */}
        <div className="relative w-full max-w-full sm:max-w-3xl lg:max-w-6xl mt-14 rounded-xl border border-gray-200 dark:border-gray-700">
          <BorderBeam />
          <Image
            src="/main-page.png"
            alt="main page"
            layout="responsive"
            width={900}
            height={600}
            objectFit="contain"
            className="rounded-xl"
          />
        </div>
      </section>

      {/* Problem section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 mt-12 lg:mt-24">
        <a className="text-sm flex justify-center text-blue-600">PROBLEM</a>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mt-4">
          Soft skills are often underdeveloped
        </h2>
        <div className="flex justify-center">
          <p className="text-lg sm:text-xl max-w-full sm:max-w-xl lg:max-w-2xl text-center text-gray-600 my-8 dark:text-gray-300">
            Vocational learners and professionals struggle to access structured,
            practical tools to build and track their communication,
            adaptability, and teamwork abilities.
          </p>
        </div>
      </section>

      {/* SkillCraft Card Section */}
      <section className="mt-10 lg:mt-20 mb-16 lg:mb-12 w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center mx-auto">
          {[
            {
              href: "#lackfeedback",
              title: "Mediocre Feedback",
              description:
                "Not receiving actionable feedback to track your soft skill development.",
              icon: (
                <MessageSquareOff className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              ),
            },
            {
              href: "#noengagement",
              title: "Low Engagement",
              description:
                "Difficulty staying engaged with traditional soft skill development methods.",
              icon: (
                <Speech className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              ),
            },
            {
              href: "#uninspiredlearning",
              title: "Uninspired Learning",
              description:
                "Struggling to apply soft skills practically due to lack of dynamic learning environments.",
              icon: (
                <Annoyed className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              ),
            },
            {
              href: "#slowprogress",
              title: "Slow Progress",
              description:
                "Difficulty seeing tangible improvements in your soft skills over time.",
              icon: (
                <Snail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              ),
            },
          ].map(({ href, title, description, icon }) => (
            <BlurFade delay={0.25 * 0.05} inView key={title}>
              <a
                href={href}
                className="group flex flex-col items-center rounded-lg border border-transparent p-6 bg-white dark:bg-gray-800 shadow-blue-100 shadow-md hover:shadow-lg hover:shadow-blue-300 transition-shadow duration-300 ease-in-out"
              >
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-700">
                  {icon}
                </div>
                <h2 className="mb-4 text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {title}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    &rarr;
                  </span>
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-400">
                  {description}
                </p>
              </a>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Solution section */}
      <section className="w-full px-4 sm:px-6 mt-12 lg:mt-24 bg-neutral-100 dark:bg-neutral-900 text-gray-100 py-8 pb-36">
        <div className="w-full max-w-full sm:max-w-2xl lg:max-w-6xl mx-auto">
          {" "}
          {/* Added max-w-6xl */}
          <a className="mt-12 text-sm flex justify-center text-blue-600">
            SOLUTION
          </a>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mt-4">
            Improve your soft skills with SkillCraft
          </h2>
          <div className="flex justify-center">
            <p className="text-lg sm:text-xl max-w-full sm:max-w-xl lg:max-w-2xl text-center text-gray-600 my-8 dark:text-gray-300">
              SkillCraft is the ultimate platform for learners and professionals
              to develop, practice, and refine soft skills through AI-driven
              scenarios and feedback.
            </p>
          </div>
          <div className="mt-10 lg:mt-14 flex justify-center">
            {/* BentoGrid component */}
            <BlurFade delay={0.25 * 0.05} inView>
              <BentoGrid className="lg:grid-rows-3 text-sm text-gray-400 dark:text-gray-400">
                {features.map((feature) => (
                  <BentoCard key={feature.name} {...feature} />
                ))}
              </BentoGrid>
            </BlurFade>
          </div>
        </div>{" "}
        {/* Closing div */}
      </section>
      <section className="mt-10 lg:mt-20 mb-12 w-full max-w-6xl px-4 lg:px-6">
        <a className="text-sm flex justify-center text-blue-600">
          HOW IT WORKS
        </a>
        <h2 className="text-3xl sm:text-4xl flex justify-center text-center font-bold text-gray-900 dark:text-gray-100 mt-4">
          The magic behind SkillCraft
        </h2>
        <div className="flex justify-center">
          <p className="text-lg lg:text-xl max-w-full lg:max-w-2xl text-center text-gray-600 mt-8 dark:text-gray-300">
            SkillCraft leverages OpenAI to personalize your learning experience,
            using our vast knowledge base and your progress to provide tailored
            feedback.
          </p>
        </div>
        <BlurFade delay={0.25 * 0.05} inView>
          <div className="mt-12 lg:mt-16 flex justify-center">
            <AnimatedBeams />
          </div>
        </BlurFade>
      </section>

      <section className="mb-16 lg:mb-12 w-full max-w-6xl px-4 lg:px-6">
        <div className="w-full max-w-6xl mx-auto">
          <a className="mt-12 text-sm flex justify-center text-blue-600">
            FEATURES
          </a>
          <h2 className="text-3xl sm:text-4xl flex justify-center text-center font-bold mt-4 text-gray-900 dark:text-gray-100">
            Features to enhance your learning
          </h2>
          <div className="flex justify-center">
            <p className="text-lg lg:text-xl max-w-full lg:max-w-2xl text-center text-gray-600 my-8 dark:text-gray-300">
              SkillCraft is packed with features that enhance soft skills
              development and make learning more engaging, personalized, and
              effective.
            </p>
          </div>

          {/* Feature 1 */}
          <BlurFade delay={0.25 * 0.05} inView>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 flex justify-center">
                <img
                  src="/Chatbot.png"
                  alt="AI Chatbot Assistance"
                  className="w-64 h-64 lg:w-96 lg:h-96 object-contain"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-12 mt-6 lg:mt-0">
                <h3 className="text-2xl font-bold mb-4">
                  AI Chatbot Assistance
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Get real-time guidance on soft skills development through our
                  AI-driven chatbot, providing helpful tips, advice, and
                  scenario-based roleplay.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Feature 2 */}
          <BlurFade delay={0.25 * 0.05} inView>
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <div className="lg:w-1/2 flex justify-center">
                <img
                  src="/Database.png"
                  alt="Knowledge Base"
                  className="w-64 h-64 lg:w-96 lg:h-96 object-contain"
                />
              </div>
              <div className="lg:w-1/2 lg:pr-12 mt-6 lg:mt-0">
                <h3 className="text-2xl font-bold mb-4">
                  Comprehensive Knowledge Base
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Access to a rich repository of research-backed materials to
                  enhance your learning and understanding of soft skills and
                  their real-world applications.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Feature 3 */}
          <BlurFade delay={0.25 * 0.05} inView>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 flex justify-center">
                <img
                  src="/Iterative.png"
                  alt="Iterative Feedback"
                  className="w-64 h-64 lg:w-96 lg:h-96 object-contain"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-12 mt-6 lg:mt-0">
                <h3 className="text-2xl font-bold mb-4">
                  Iterative Learning and Feedback
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Continuously improve your skills with iterative feedback based
                  on roleplay scenarios, tracking progress and helping you grow
                  over time.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Feature 4 */}
          <BlurFade delay={0.25 * 0.05} inView>
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <div className="lg:w-1/2 flex justify-center">
                <img
                  src="/Security.png"
                  alt="Data Security"
                  className="w-64 h-64 lg:w-96 lg:h-96 object-contain"
                />
              </div>
              <div className="lg:w-1/2 lg:pr-12 mt-6 lg:mt-0">
                <h3 className="text-2xl font-bold mb-4">
                  Enhanced Data Security
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Your data is secure with state-of-the-art encryption, ensuring
                  that your learning progress and personal information are
                  always private.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lg:mt-16 pb-20 lg:pb-28 pt-20 w-full bg-blue-200 p-6">
        <a className="text-sm flex justify-center text-blue-600">
          READY TO GET STARTED?
        </a>
        <h2 className="text-3xl sm:text-4xl flex justify-center text-center font-bold text-gray-900 dark:text-gray-100 mt-4">
          Start your free trial today
        </h2>
        <div className="flex justify-center mt-4">
          <a
            href="/login"
            className="mt-6 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg px-6 py-3 shadow-lg hover:bg-gradient-to-l transition duration-300"
          >
            <p className="text-sm font-semibold">Get Started Now</p>
            <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Skill-craft. All rights
              reserved.
            </p>
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0 items-center">
              <a href="/privacy" className="hover:text-blue-400 text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-blue-400 text-sm">
                Terms of Service
              </a>
              <a href="/contact" className="hover:text-blue-400 text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
