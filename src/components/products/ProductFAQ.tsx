import { motion } from "framer-motion";

export default function ProductFAQ() {
  const faqs = [
    { 
      q: "What are the primary uses of twisted coir fiber?", 
      a: "Twisted coir fiber is highly versatile and used extensively in manufacturing industrial brushes, floor mats, and specialized filters. Its durability and natural resistance to moisture make it ideal for heavy-duty applications."
    },
    { 
      q: "Are your products 100% natural?", 
      a: "Yes, all our products are made from 100% natural coconut husks sourced from sustainable plantations in Sri Lanka. We use eco-friendly processing methods that do not involve harmful chemicals."
    },
    { 
      q: "Can you customize specifications for bulk orders?", 
      a: "Absolutely. We understand that different industrial applications require specific fiber lengths, moisture levels, or packing weights. We can customize our production to meet your exact requirements for bulk export orders."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <h2 className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">Common Inquiries</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-serif">Product FAQ</h3>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-black/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/10 hover:border-accent-gold/20 transition-all"
            >
              <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold text-xs shrink-0">
                  0{i + 1}
                </div>
                {faq.q}
              </h4>
              <p className="text-white/40 font-light leading-relaxed pl-12 text-sm md:text-base">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
