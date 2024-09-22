import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Footer from "../src/components/Footer";
import ProductsPage from "./products";
import TestimonialSection from "src/components/Testimonials";
import ContactUs from "src/components/contactus";
import FAQs from "src/components/faq";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProductsPage />
        <TestimonialSection />
        <ContactUs />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}
