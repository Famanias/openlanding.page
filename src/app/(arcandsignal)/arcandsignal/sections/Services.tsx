const services = [
  { no: "01", icon: "◎", title: "Find your signal.", body: "A sharp position and a story worth paying attention to.", tags: "BRAND STRATEGY  /  POSITIONING" },
  { no: "02", icon: "✳", title: "Make it matter.", body: "Ideas and identities that turn a passing glance into a connection.", tags: "CREATIVE  /  CAMPAIGNS" },
  { no: "03", icon: "↗", title: "Keep it moving.", body: "Thoughtful experiments that turn attention into meaningful growth.", tags: "PAID MEDIA  /  OPTIMIZATION" },
  { no: "04", icon: "◉", title: "Bring them closer.", body: "Digital experiences that give people a reason to stay.", tags: "DIGITAL  /  LIFECYCLE" },
];
export function Services() {
  return <section id="services" className="asc-services asc-wrap asc-section"><div className="asc-section-heading" data-reveal="rise"><div><span className="asc-kicker"><span>✳</span> WHAT WE DO <b> / 01</b></span><h2>Clarity meets<br/><em>creative momentum.</em></h2></div><p>Good marketing is a connected system. We bring every piece together, from the first spark to the next big leap.</p></div><div className="asc-services-grid">{services.map((service, index) => <article className="asc-service" data-reveal="rise" style={{ "--i": index } as React.CSSProperties} key={service.no}><div className="asc-service-top"><span className="asc-service-icon">{service.icon}</span><span>{service.no} / 04</span></div><h3>{service.title}</h3><p>{service.body}</p><div className="asc-service-tags">{service.tags}</div></article>)}</div></section>;
}
