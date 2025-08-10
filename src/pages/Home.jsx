import React, { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Hook para animar aparición al hacer scroll
function useFadeInOnScroll() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add("visible");
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  // Colores y estilos
  const colors = {
    bgHero: isDark
      ? "linear-gradient(120deg, #232526 0%, #414345 100%)"
      : "linear-gradient(120deg, #ff5858 0%, #f09819 100%)",
    text: isDark ? "#f1f1f1" : "#222",
    bgSection: isDark ? "#232526" : "#f9f9f9",
    cardBg: isDark ? "#2c2c2e" : "#fff",
    cardShadow: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.08)",
    inputBg: isDark ? "#232526" : "#fff",
    inputBorder: isDark ? "#444" : "#ccc",
    buttonBg: isDark ? "#e74c3c" : "#e53935",
    buttonColor: "#fff",
    accent: isDark ? "#e74c3c" : "#ff9800",
    sectionTitle: isDark ? "#fff" : "#222",
    highlight: isDark ? "#e74c3c" : "#ff9800",
    planBg: isDark ? "#232526" : "#fff",
    planBorder: isDark ? "#e74c3c" : "#ff9800",
    blogTitle: isDark ? "#fff" : "#222",
    blogCard: isDark ? "#232526" : "#fff",
    awardBg: isDark ? "#232526" : "#fffbe6",
    awardText: isDark ? "#ffe082" : "#e74c3c",
  };

  // Animación de escala y sombra
  const hoverAnim = {
    transform: "scale(1.08)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.22)",
    border: `2.5px solid ${colors.accent}`,
    background: isDark
      ? "linear-gradient(120deg, #232526 0%, #e74c3c22 100%)"
      : "linear-gradient(120deg, #fffbe6 0%, #ff980022 100%)",
    zIndex: 2,
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  };

  // Animación de entrada para secciones
  const fadeInSection = {
    opacity: 0,
    transform: "translateY(40px)",
    transition: "opacity 0.7s, transform 0.7s",
  };

  const styles = {
    main: {
      background: colors.bgHero,
      minHeight: "100vh",
      fontFamily: "Inter, Arial, sans-serif",
    },
    heroSection: {
      padding: "80px 0 60px 0",
      textAlign: "center",
      color: colors.text,
      position: "relative",
      overflow: "hidden",
      animation: "fadeIn 1.2s",
    },
    heroTitle: {
      fontSize: "2.7rem",
      fontWeight: "bold",
      marginBottom: "18px",
      lineHeight: 1.15,
      letterSpacing: "1px",
      textShadow: isDark ? "0 2px 16px #e74c3c44" : "0 2px 16px #ff980044",
      animation: "cardPop 1.2s",
    },
    highlight: {
      color: colors.highlight,
      background: isDark ? "#fff1" : "#fff7e6",
      padding: "2px 10px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      animation: "blink 2.5s infinite",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      marginBottom: "32px",
      color: colors.text,
      fontWeight: 500,
      animation: "fadeIn 1.5s",
    },
    heroCta: {
      display: "inline-block",
      background: colors.buttonBg,
      color: colors.buttonColor,
      padding: "14px 36px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "1.15rem",
      textDecoration: "none",
      boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
      transition: "background 0.2s, transform 0.2s",
      marginTop: "10px",
      animation: "cardPop 1.5s",
    },
    section: {
      background: colors.bgSection,
      padding: "60px 0",
      ...fadeInSection,
    },
    sectionTitle: {
      color: colors.sectionTitle,
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "32px",
      textAlign: "center",
      letterSpacing: "0.5px",
      textShadow: isDark ? "0 2px 12px #e74c3c22" : "0 2px 12px #ff980022",
      animation: "fadeIn 1.2s",
    },
    // Cambia a 4 columnas fijas
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "32px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    serviceCard: {
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "16px",
      padding: "38px 18px",
      textAlign: "center",
      color: colors.text,
      fontWeight: 500,
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      animation: "cardPop 1.2s",
      overflow: "hidden",
    },
    serviceIcon: {
      fontSize: "3rem",
      marginBottom: "18px",
      display: "block",
      transition: "transform 0.2s",
      animation: "blink 2.5s infinite",
      filter: isDark ? "drop-shadow(0 0 8px #e74c3c88)" : "drop-shadow(0 0 8px #ff980088)",
    },
    beneficiosGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "32px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    beneficioCard: {
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "28px 18px",
      color: colors.text,
      fontWeight: 500,
      textAlign: "center",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      animation: "fadeIn 1.2s",
    },
    awardsSection: {
      background: colors.awardBg,
      padding: "60px 0",
      textAlign: "center",
      animation: "fadeIn 1.2s",
    },
    awardsTitle: {
      color: colors.awardText,
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "32px",
      letterSpacing: "0.5px",
      textShadow: "0 2px 12px #e74c3c22",
    },
    awardsGrid: {
      display: "flex",
      gap: "32px",
      justifyContent: "center",
      flexWrap: "wrap",
      maxWidth: "900px",
      margin: "0 auto",
    },
    awardCard: {
      background: isDark ? "#2c2c2e" : "#fff",
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "28px 18px",
      color: colors.awardText,
      fontWeight: 500,
      textAlign: "center",
      minWidth: "220px",
      border: `2px solid transparent`,
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      animation: "cardPop 1.2s",
    },
    awardIcon: {
      fontSize: "2.5rem",
      marginBottom: "12px",
      display: "block",
      transition: "transform 0.2s",
      animation: "blink 2.5s infinite",
    },
    plansGrid: {
      display: "flex",
      gap: "32px",
      justifyContent: "center",
      flexWrap: "wrap",
      maxWidth: "900px",
      margin: "0 auto",
    },
    planCard: {
      background: colors.planBg,
      border: `2px solid transparent`,
      borderRadius: "14px",
      boxShadow: colors.cardShadow,
      padding: "32px 24px",
      color: colors.text,
      fontWeight: 500,
      minWidth: "220px",
      textAlign: "center",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      animation: "cardPop 1.2s",
    },
    planPrice: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: colors.accent,
      margin: "18px 0",
      textShadow: "0 2px 8px #e74c3c22",
    },
    clientsLogos: {
      display: "flex",
      gap: "32px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    clientLogo: {
      width: "60px",
      height: "60px",
      objectFit: "contain",
      filter: isDark ? "brightness(0.85)" : "none",
      transition: "transform 0.2s",
    },
    portfolioGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "32px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    portfolioCard: {
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "18px",
      textAlign: "center",
      color: colors.text,
      fontWeight: 500,
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      animation: "fadeIn 1.2s",
    },
    portfolioImg: {
      width: "100%",
      borderRadius: "8px",
      marginBottom: "12px",
      objectFit: "cover",
      height: "140px",
      transition: "transform 0.2s",
      boxShadow: "0 2px 12px #e74c3c22",
    },
    processSteps: {
      display: "flex",
      gap: "32px",
      justifyContent: "center",
      flexWrap: "wrap",
      maxWidth: "900px",
      margin: "0 auto",
    },
    processStep: {
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center",
      color: colors.text,
      fontWeight: 500,
      minWidth: "220px",
      flex: "1 1 220px",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      animation: "fadeIn 1.2s",
    },
    processIcon: {
      fontSize: "2.2rem",
      marginBottom: "10px",
      display: "block",
      transition: "transform 0.2s",
      animation: "blink 2.5s infinite",
    },
    testimonialsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "32px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    testimonialCard: {
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "28px 18px",
      color: colors.text,
      fontWeight: 500,
      fontStyle: "italic",
      textAlign: "center",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      animation: "fadeIn 1.2s",
    },
    teamGrid: {
      display: "flex",
      gap: "32px",
      justifyContent: "center",
      flexWrap: "wrap",
      maxWidth: "700px",
      margin: "0 auto",
    },
    teamCard: {
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "18px",
      textAlign: "center",
      color: colors.text,
      fontWeight: 500,
      minWidth: "180px",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      animation: "fadeIn 1.2s",
    },
    teamImg: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "10px",
      border: `2px solid ${colors.accent}`,
      transition: "transform 0.2s",
      boxShadow: "0 2px 8px #e74c3c22",
    },
    faqList: {
      maxWidth: "900px",
      margin: "0 auto",
      display: "grid",
      gap: "24px",
    },
    faqItem: {
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "18px",
      color: colors.text,
      fontWeight: 500,
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      animation: "fadeIn 1.2s",
    },
    contactForm: {
      maxWidth: "480px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      background: colors.cardBg,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "32px 24px",
      animation: "fadeIn 1.2s",
    },
    contactInput: {
      background: colors.inputBg,
      border: `1.5px solid ${colors.inputBorder}`,
      color: colors.text,
      fontSize: "1.1rem",
      padding: "12px 14px",
      borderRadius: "8px",
      fontWeight: 500,
    },
    contactButton: {
      background: colors.buttonBg,
      color: colors.buttonColor,
      fontWeight: "bold",
      fontSize: "1.1rem",
      letterSpacing: "1px",
      padding: "14px 0",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      marginTop: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      transition: "background 0.2s, transform 0.2s",
      animation: "cardPop 1.2s",
    },
    ctaFinalSection: {
      background: colors.accent,
      color: "#fff",
      textAlign: "center",
      padding: "60px 0",
      animation: "fadeIn 1.2s",
    },
    ctaFinalBtn: {
      display: "inline-block",
      background: "#fff",
      color: colors.accent,
      padding: "14px 36px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "1.15rem",
      textDecoration: "none",
      boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
      transition: "background 0.2s, transform 0.2s",
      marginTop: "18px",
      animation: "cardPop 1.2s",
    },
    blogSection: {
      background: colors.bgSection,
      padding: "60px 0",
      animation: "fadeIn 1.2s",
    },
    blogTitle: {
      color: colors.blogTitle,
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "32px",
      textAlign: "center",
      letterSpacing: "0.5px",
      textShadow: "0 2px 12px #e74c3c22",
      animation: "fadeIn 1.2s",
    },
    blogGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "32px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    blogCard: {
      background: colors.blogCard,
      boxShadow: colors.cardShadow,
      borderRadius: "12px",
      padding: "24px 18px",
      color: colors.text,
      fontWeight: 500,
      textAlign: "left",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      cursor: "pointer",
      position: "relative",
      border: `2px solid transparent`,
      animation: "fadeIn 1.2s",
    },
    blogImg: {
      width: "100%",
      borderRadius: "8px",
      marginBottom: "12px",
      objectFit: "cover",
      height: "120px",
      transition: "transform 0.2s",
      boxShadow: "0 2px 8px #e74c3c22",
    },
  };

  // refs para animación de aparición
  const heroRef = useFadeInOnScroll();
  const serviciosRef = useFadeInOnScroll();
  const beneficiosRef = useFadeInOnScroll();
  const planesRef = useFadeInOnScroll();
  const clientesRef = useFadeInOnScroll();
  const portafolioRef = useFadeInOnScroll();
  const procesoRef = useFadeInOnScroll();
  const testimoniosRef = useFadeInOnScroll();
  const equipoRef = useFadeInOnScroll();
  const faqRef = useFadeInOnScroll();
  const contactoRef = useFadeInOnScroll();
  const blogRef = useFadeInOnScroll();
  const awardsRef = useFadeInOnScroll();
  const ctaRef = useFadeInOnScroll();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch("http://127.0.0.1:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3500);
    } else {
      alert("Hubo un problema al enviar el mensaje. Intenta de nuevo.");
    }
  } catch (error) {
    console.error("Error enviando el mensaje:", error);
    alert("Error de conexión. Verifica que el servidor esté funcionando.");
  }
};
  // Efecto hover para todas las tarjetas
  const [hovered, setHovered] = useState({});

  // Servicios (solo los 4 primeros)
  const servicios = [
    {
      icon: "💻",
      title: "Desarrollo Web",
      desc: "Landing pages, tiendas online y webs corporativas modernas, rápidas y seguras.",
    },
    {
      icon: "📈",
      title: "Marketing Digital",
      desc: "SEO, campañas en Google y redes sociales para atraer más clientes a tu negocio.",
    },
    {
      icon: "🎨",
      title: "Diseño Gráfico",
      desc: "Identidad visual, logotipos y piezas gráficas que destacan tu marca.",
    },
    {
      icon: "🔒",
      title: "Soporte & Hosting",
      desc: "Tu web siempre online, segura y con soporte técnico personalizado.",
    },
  ];

  // Helper para hover animación
  const getHoverStyle = (key) => (hovered[key] ? hoverAnim : {});

  return (
    <main style={styles.main}>
      {/* HERO */}
      <section ref={heroRef} style={styles.heroSection} aria-label="Hero principal">
        <h1 style={styles.heroTitle}>
          Impulsa tu negocio con{" "}
          <span style={styles.highlight}>Reflexo Agency</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Creamos sitios web, tiendas online y estrategias digitales que venden. ¡Haz crecer tu marca hoy!
        </p>
        <a href="#contacto" style={styles.heroCta}>
          Solicita tu presupuesto
        </a>
      </section>

      {/* SERVICIOS */}
      <section ref={serviciosRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Nuestros Servicios</h2>
        <div className="services-grid" style={styles.servicesGrid}>
          {servicios.map((serv, idx) => (
            <div
              key={serv.title}
              style={{
                ...styles.serviceCard,
                ...getHoverStyle("serv" + idx),
              }}
              tabIndex={0}
              aria-label={serv.title}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["serv" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["serv" + idx]: false }))}
            >
              <span
                style={{
                  ...styles.serviceIcon,
                  transform: hovered["serv" + idx] ? "scale(1.25)" : "scale(1)",
                }}
                role="img"
                aria-label={serv.title}
              >
                {serv.icon}
              </span>
              <h3>{serv.title}</h3>
              <p>{serv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section ref={beneficiosRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Beneficios de trabajar con nosotros</h2>
        <div style={styles.beneficiosGrid}>
          {[
            {
              icon: "⚡",
              title: "Entrega rápida",
              desc: "Tu proyecto listo en tiempo récord, sin perder calidad.",
            },
            {
              icon: "🤝",
              title: "Soporte personalizado",
              desc: "Te acompañamos antes, durante y después del lanzamiento.",
            },
            {
              icon: "🔍",
              title: "Transparencia total",
              desc: "Presupuestos claros y comunicación constante.",
            },
          ].map((b, idx) => (
            <div
              key={b.title}
              style={{
                ...styles.beneficioCard,
                ...getHoverStyle("ben" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["ben" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["ben" + idx]: false }))}
              tabIndex={0}
            >
              <span style={{ fontSize: "2rem", marginBottom: "8px", display: "block" }}>{b.icon}</span>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIOS */}
      <section ref={awardsRef} style={styles.awardsSection}>
        <h2 style={styles.awardsTitle}>Premios y Reconocimientos</h2>
        <div style={styles.awardsGrid}>
          {[
            {
              icon: "🏆",
              title: "Mejor Agencia Web 2025",
              desc: "Premio otorgado por la Cámara de Comercio Digital.",
            },
            {
              icon: "🥇",
              title: "Innovación en Marketing",
              desc: "Reconocimiento por estrategias creativas y efectivas.",
            },
            {
              icon: "🌟",
              title: "Top 10 Startups Perú",
              desc: "Seleccionados entre las mejores empresas tecnológicas del país.",
            },
          ].map((a, idx) => (
            <div
              key={a.title}
              style={{
                ...styles.awardCard,
                ...getHoverStyle("award" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["award" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["award" + idx]: false }))}
              tabIndex={0}
            >
              <span
                style={{
                  ...styles.awardIcon,
                  transform: hovered["award" + idx] ? "scale(1.2)" : "scale(1)",
                }}
              >
                {a.icon}
              </span>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANES */}
      <section ref={planesRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Planes para tu negocio</h2>
        <div style={styles.plansGrid}>
          {[
            {
              title: "Plan Básico",
              price: "S/ 499",
              features: [
                "Landing page profesional",
                "Diseño responsive",
                "1 mes de soporte",
              ],
            },
            {
              title: "Plan Emprendedor",
              price: "S/ 899",
              features: [
                "Tienda online o web corporativa",
                "Integración con pagos",
                "3 meses de soporte",
              ],
            },
            {
              title: "Plan Premium",
              price: "S/ 1499",
              features: [
                "Web a medida + marketing digital",
                "SEO avanzado",
                "6 meses de soporte",
              ],
            },
          ].map((p, idx) => (
            <div
              key={p.title}
              style={{
                ...styles.planCard,
                ...getHoverStyle("plan" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["plan" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["plan" + idx]: false }))}
              tabIndex={0}
            >
              <h4>{p.title}</h4>
              <div style={styles.planPrice}>{p.price}</div>
              <ul style={{ textAlign: "left", marginBottom: "18px" }}>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#contacto" style={styles.heroCta}>Solicitar</a>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTES */}
      <section ref={clientesRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Clientes que confían en nosotros</h2>
        <div style={styles.clientsLogos} aria-label="Logos de clientes">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" style={styles.clientLogo} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg" alt="React Alt" style={styles.clientLogo} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" style={styles.clientLogo} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" alt="Sass" style={styles.clientLogo} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png" alt="JavaScript Alt" style={styles.clientLogo} />
        </div>
      </section>

      {/* PORTAFOLIO */}
      <section ref={portafolioRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Portafolio Destacado</h2>
        <div style={styles.portfolioGrid}>
          {[
            {
              img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
              title: "Landing Startup",
              desc: "Captación de leads para fintech.",
            },
            {
              img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
              title: "Tienda Online",
              desc: "E-commerce para moda urbana.",
            },
            {
              img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
              title: "Web Corporativa",
              desc: "Imagen profesional para consultora.",
            },
          ].map((p, idx) => (
            <div
              key={p.title}
              style={{
                ...styles.portfolioCard,
                ...getHoverStyle("port" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["port" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["port" + idx]: false }))}
              tabIndex={0}
            >
              <img
                src={p.img}
                alt={p.title}
                style={{
                  ...styles.portfolioImg,
                  transform: hovered["port" + idx] ? "scale(1.08)" : "scale(1)",
                }}
              />
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESO DE TRABAJO */}
      <section ref={procesoRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>¿Cómo trabajamos?</h2>
        <div style={styles.processSteps}>
          {[
            {
              icon: "📝",
              title: "1. Escuchamos tu idea",
              desc: "Nos reunimos contigo para entender tu negocio y tus objetivos.",
            },
            {
              icon: "💡",
              title: "2. Propuesta personalizada",
              desc: "Te presentamos una solución a medida, con tiempos y presupuesto claros.",
            },
            {
              icon: "🚀",
              title: "3. Desarrollo y lanzamiento",
              desc: "Desarrollamos tu proyecto y lo lanzamos al mundo, acompañándote en cada paso.",
            },
          ].map((step, idx) => (
            <div
              key={step.title}
              style={{
                ...styles.processStep,
                ...getHoverStyle("proc" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["proc" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["proc" + idx]: false }))}
              tabIndex={0}
            >
              <span
                style={{
                  ...styles.processIcon,
                  transform: hovered["proc" + idx] ? "scale(1.2)" : "scale(1)",
                }}
                role="img"
                aria-label={step.title}
              >
                {step.icon}
              </span>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section ref={testimoniosRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Testimonios</h2>
        <div style={styles.testimonialsGrid}>
          {[
            {
              text: "¡Excelente servicio y atención personalizada! Mi web quedó increíble.",
              author: "Ana G.",
            },
            {
              text: "Gracias a Reflexo Agency, mis ventas online aumentaron un 40%.",
              author: "Carlos P.",
            },
            {
              text: "El equipo entendió mi visión y la plasmó a la perfección.",
              author: "Laura M.",
            },
          ].map((t, idx) => (
            <div
              key={t.author}
              style={{
                ...styles.testimonialCard,
                ...getHoverStyle("test" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["test" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["test" + idx]: false }))}
              tabIndex={0}
            >
              <p>"{t.text}"</p>
              <strong>- {t.author}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPO */}
      <section ref={equipoRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Nuestro Equipo</h2>
        <div style={styles.teamGrid}>
          {[
            {
              img: "https://randomuser.me/api/portraits/men/32.jpg",
              name: "Diego Espinoza",
              role: "Desarrollador Fullstack",
            },
            {
              img: "https://randomuser.me/api/portraits/men/44.jpg",
              name: "Gadiel Collazos",
              role: "Diseñador Web",
            },
          ].map((m, idx) => (
            <div
              key={m.name}
              style={{
                ...styles.teamCard,
                ...getHoverStyle("team" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["team" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["team" + idx]: false }))}
              tabIndex={0}
            >
              <img
                src={m.img}
                alt={m.name}
                style={{
                  ...styles.teamImg,
                  transform: hovered["team" + idx] ? "scale(1.15)" : "scale(1)",
                }}
              />
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Preguntas Frecuentes</h2>
        <div style={styles.faqList}>
          {[
            {
              q: "¿Cuánto tarda en estar lista mi web?",
              a: "Depende del proyecto, pero una landing puede estar lista en 7 días. Tiendas y webs corporativas entre 2 y 4 semanas.",
            },
            {
              q: "¿Puedo pedir cambios durante el desarrollo?",
              a: "¡Por supuesto! Nos gusta trabajar de la mano contigo y ajustar lo necesario para que quedes 100% satisfecho.",
            },
            {
              q: "¿Ofrecen soporte después de entregar el proyecto?",
              a: "Sí, ofrecemos soporte y mantenimiento para que tu web siempre esté actualizada y segura.",
            },
          ].map((f, idx) => (
            <div
              key={f.q}
              style={{
                ...styles.faqItem,
                ...getHoverStyle("faq" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["faq" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["faq" + idx]: false }))}
              tabIndex={0}
            >
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section ref={contactoRef} style={styles.section} id="contacto">
        <h2 style={styles.sectionTitle}>Contáctanos</h2>
        <form style={styles.contactForm} onSubmit={handleSubmit} aria-label="Formulario de contacto">
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.contactInput}
            aria-label="Nombre"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.contactInput}
            aria-label="Correo electrónico"
          />
          <textarea
            name="message"
            placeholder="¿En qué podemos ayudarte?"
            value={form.message}
            onChange={handleChange}
            required
            style={{ ...styles.contactInput, minHeight: "90px" }}
            aria-label="Mensaje"
            rows={4}
          />
          <button
            type="submit"
            style={styles.contactButton}
          >
            Enviar mensaje
          </button>
          {sent && (
            <div
              style={{
                marginTop: "12px",
                textAlign: "center",
                color: "#43a047",
                fontWeight: "bold",
                animation: "fadeIn 0.7s",
              }}
              role="status"
            >
              ¡Gracias por contactarnos! Pronto te responderemos.
            </div>
          )}
        </form>
      </section>

      {/* BLOG */}
      <section ref={blogRef} style={styles.blogSection}>
        <h2 style={styles.blogTitle}>Blog y Recursos</h2>
        <div style={styles.blogGrid}>
          {[
            {
              img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
              title: "Cómo elegir tu dominio web",
              desc: "Consejos para seleccionar el mejor nombre para tu negocio online.",
            },
            {
              img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
              title: "5 claves para vender más en tu tienda online",
              desc: "Optimiza tu e-commerce y aumenta tus conversiones.",
            },
            {
              img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
              title: "¿Por qué invertir en marketing digital?",
              desc: "Ventajas de promocionar tu marca en internet.",
            },
          ].map((b, idx) => (
            <div
              key={b.title}
              style={{
                ...styles.blogCard,
                ...getHoverStyle("blog" + idx),
              }}
              onMouseEnter={() => setHovered((h) => ({ ...h, ["blog" + idx]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, ["blog" + idx]: false }))}
              tabIndex={0}
            >
              <img
                src={b.img}
                alt={b.title}
                style={{
                  ...styles.blogImg,
                  transform: hovered["blog" + idx] ? "scale(1.08)" : "scale(1)",
                }}
              />
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
              <a href="#" style={{ color: colors.accent, fontWeight: "bold" }}>Leer más</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section ref={ctaRef} style={styles.ctaFinalSection}>
        <h2>¿Listo para llevar tu negocio al siguiente nivel?</h2>
        <a href="#contacto" style={styles.ctaFinalBtn}>
          ¡Quiero empezar!
        </a>
      </section>
    </main>
  );
}