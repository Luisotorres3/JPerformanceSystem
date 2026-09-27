import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = ({ compact = false }: { compact?: boolean }) => {
  const reduced = useReducedMotion();
  const faqs = [
    {
      question: "¿Tengo que pagar antes de la entrevista?",
      answer:
        "No. Primero reservas la entrevista con Juan. Revisamos tus objetivos, el plan y las condiciones. Si decides continuar, el pago se realiza después.",
    },
    {
      question: "¿Cómo funcionan los entrenamientos online?",
      answer:
        "Trabajo con una planificación completamente personalizada. Recibes tu programa en una plataforma profesional (Hevy), con vídeos, indicaciones técnicas y cargas adaptadas a tu nivel. Yo superviso tu evolución para ajustar volúmenes, intensidades y progresiones en función de tu rendimiento real. Es un sistema estructurado, claro y orientado a resultados.",
    },
    {
      question: "¿Qué diferencia hay entre el entrenamiento presencial y online?",
      answer:
        "En el presencial tienes al entrenador delante y requiere de una adaptación a nivel de horarios completa. En el online tienes un sistema completo, medido y revisado cada semana, que te permite avanzar sin depender de horarios. Mi labor es darte una programación seria y un seguimiento sólido para que entrenes con criterio, no al azar. El valor está en el método, no en la distancia.",
    },
    {
      question: "¿Necesito experiencia previa para empezar?",
      answer:
        "No. Trabajo con iniciación, intermedios y perfiles avanzados. La programación se ajusta a tu punto de partida y tu objetivo. Lo único imprescindible es que quieras mejorar y sigas el plan con constancia.",
    },
    {
      question: "¿Cuánto tiempo tarda en verse resultados?",
      answer:
        "Depende del objetivo y del punto de partida, las primeras mejoras llegan en 4–6 semanas.",
    },
    {
      question: "¿Qué incluye el servicio de nutrición?",
      answer:
        "Incluye una planificación nutricional personalizada, adaptada a tus entrenamientos y objetivos. Revisamos tu evolución y ajustamos ingestas, raciones y estrategias según tus resultados. Es un sistema pensado para mejorar rendimiento, no para hacer dietas milagro.",
    },
    {
      question: "¿Cómo es el proceso de seguimiento y comunicación?",
      answer:
        "Trabajo con comunicación directa a través de WhatsApp o plataforma interna (Hevy). Revisando métricas, vídeos de técnica y comparando resultados a través de las cargas y de las sensaciones que vayas teniendo. A partir de ahí, ajusto la carga, progresiones y tareas específicas.",
    },
  ];

  const visibleFaqs = compact
    ? [
        {
          question: "¿Necesito experiencia para empezar?",
          answer:
            "No. Partimos de tu nivel, tu objetivo y tu disponibilidad para encontrar una forma de entrenar que encaje contigo.",
        },
        {
          question: "¿Cómo entrenamos a distancia?",
          answer:
            "Recibes tu programa en Hevy y mantienes comunicación directa con Juan. Revisamos tu técnica y tu evolución para ajustar el entrenamiento.",
        },
        {
          question: "¿Cuál es el primer paso?",
          answer:
            "Hablar con Juan sobre tu objetivo. En la entrevista revisáis el plan y las condiciones antes de decidir si continúas y realizar el pago.",
        },
      ]
    : faqs;
  return (
    <section className="faq-section">
      <div className="v2-container faq-layout">
        <motion.div
          className="faq-intro"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">06 / ANTES DE EMPEZAR</p>
          <h2 className="display-heading">
            Las cosas claras.
            <br />
            <span className="muted-type">Desde el principio.</span>
          </h2>
          <p>Todo lo que necesitas saber para dar el siguiente paso con confianza.</p>
          <Link to="/contacto" className="text-button mt-5">
            ¿Hablamos de tu caso? ↗
          </Link>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="faq-list">
            {visibleFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="faq-answer">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
