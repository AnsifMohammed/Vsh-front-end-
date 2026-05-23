import ContactForm from "./components/ContactForm";
import ContactMapSection from "./components/ContactMapSection";
import Support from "./components/Support";
function ContactPage() {

  return (
    <div className="min-h-screen pt-30">
       <ContactForm />
       <ContactMapSection />
       <Support />
    </div>
  );
}

export default ContactPage;