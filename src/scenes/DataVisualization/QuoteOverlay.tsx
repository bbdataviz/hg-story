import { AnimatePresence, motion } from 'framer-motion';

interface QuoteOverlayProps {
  vizScene: number;
}

export default function QuoteOverlay({ vizScene }: QuoteOverlayProps) {

  const quotes = [
    {
        scene: 29,
        symptom: "Fatigue",
        quote:
          "(...) needing to constantly visit the hospital for being so weak that I would faint, not be able to eat, or fall over from dizziness, (…).",
    },
    {
        scene: 30,
        symptom: "Headaches",
        quote:
          "My initial tears of joy quickly turned to ones of pain, suffering, and anger.",
    },
    {
        scene: 31,
        symptom: "Sleeping Problems",
        quote:
          "My vomiting was so severe that I barely slept at night and constantly had my head in the toilet or a bucket.",
    },
    {
        scene: 32,
        symptom: "Depressions",
        quote:
            "Pregnancy for me was traumatic, lonely, and a very depressing time.",
    }
  ];

  const activeQuote = quotes.find(q => q.scene === vizScene);

  return (
    <AnimatePresence mode="wait">
      {activeQuote && (
        <motion.div
          key={activeQuote.symptom}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut" 
          }} 
        >
          <hr/>
          <h1 className="quote-symptom">{activeQuote?.symptom}</h1>
          <p className="quote-text"> 
            "{activeQuote?.quote}"
          </p>
          <hr/>
        
        </motion.div>
      )}
  </AnimatePresence>
  );
}
