

import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Know from "../components/Know";
import Services from "../components/Services";


export default function Home() {
  return (
   <>
   
   <Hero/>

   <section id="how-it-works">
   <Services/>
   </section>

   <Know/>
   <Features/>

   <div style={{ height: '100px' }} />
   <section id="faq">
   <FAQ/>
   </section>

   <div style={{ height: '100px' }} />
   <section id="contact">
   <Contact/>
   </section>

  
   </>
  );
}
