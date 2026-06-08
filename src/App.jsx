import { useState, useEffect } from 'react'

const caseStudies = [
  {
    id: 'cs0',
    tag: 'Real Project · Service Site',
    title: 'Meridian Watch Co.',
    description:
      'A professional watch repair service website for Meridian Watch Co. — featuring service offerings, expertise showcase, and customer engagement optimized for a specialized service business.',
    icon: '⌚',
    modalTitle: 'Watch Repair Service Site',
    link: 'https://service-site-lilac.vercel.app',
  },
  {
    id: 'cs2',
    tag: 'Design 2 · Memory Game',
    title: 'Jeu de Mémoire',
    description:
      'An interactive memory card game — exploring playful UI patterns, interaction states, scoring systems, and accessible game mechanics.',
    icon: '🎴',
    modalTitle: 'Memory Game Design',
  },
  {
    id: 'cs3',
    tag: 'Design 3 · E-Commerce',
    title: 'Luxe Boutique Store',
    description:
      'A premium e-commerce experience — with product listings, filtering, cart flows, and a checkout process optimized for conversion.',
    icon: '🛍️',
    modalTitle: 'E-Commerce Design',
  },
  {
    id: 'cs4',
    tag: 'Design 4 · Analytics',
    title: 'SportsPulse Dashboard',
    description:
      'A data-rich sports analytics dashboard — featuring live stats, interactive visualizations, heat maps, and performance insights.',
    icon: '📊',
    modalTitle: 'Analytics Dashboard Design',
  },
]

const workflowItems = [
  {
    title: 'Currently Learning UI Design',
    body: 'I am actively enrolled in a UI Design course where I am studying core design principles, visual hierarchy, typography, colour theory, and interaction patterns.',
    link: null,
  },
  {
    title: 'Nielsen Norman Group (NN/g)',
    body: 'I use the NN/g resource library as a primary reference for UX best practices, evidence-based design, and usability guidelines.',
    link: { href: 'https://www.nngroup.com', label: 'Visit NN/g →' },
  },
  {
    title: 'User-Centered Design',
    body: 'I am learning to place the user at the heart of every design decision — conducting research, defining personas, and validating assumptions through iteration.',
    link: null,
  },
  {
    title: 'Heuristic Evaluation',
    body: 'I apply Nielsen\'s 10 usability heuristics to systematically identify usability issues and improve interface quality.',
    link: {
      href: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
      label: 'Read the Heuristics →',
    },
  },
  {
    title: 'Design Process',
    body: 'My design process follows Discover → Define → Ideate → Prototype → Test — ensuring each decision is grounded in real user needs.',
    link: null,
  },
]

const interests = [
  '🎨 Visual Design',
  '💻 Technology',
  '🎮 Video Games',
  '📚 Comics',
  '🌐 Web Development',
  '🎵 Music',
  '☕ Coffee',
  '🚀 Innovation',
]

export default function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeModal])

  const openModal = (study) => setActiveModal(study)
  const closeModal = () => setActiveModal(null)

  return (
    <>
      <nav
        className="portfolio-nav"
        style={navScrolled ? { borderBottomColor: 'var(--border-hi)' } : {}}
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between w-100">
            <a href="#about" className="nav-brand">
              AS<span className="accent-dot">.</span>
            </a>

            <div className="d-none d-md-flex align-items-center gap-1">
              <a href="#about" className="nav-link-custom">About</a>
              <a href="#how-i-work" className="nav-link-custom">How I Work</a>
              <a href="#case-studies" className="nav-link-custom">Case Studies</a>
            </div>

            <button
              className="navbar-toggler-custom d-md-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mobileMenu"
              aria-controls="mobileMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              ☰
            </button>
          </div>

          <div className="collapse" id="mobileMenu">
            <div
              className="d-flex flex-column gap-1 py-3 border-top mt-2"
              style={{ borderColor: 'var(--border)' }}
            >
              <a href="#about" className="nav-link-custom" data-bs-toggle="collapse" data-bs-target="#mobileMenu">About</a>
              <a href="#how-i-work" className="nav-link-custom" data-bs-toggle="collapse" data-bs-target="#mobileMenu">How I Work</a>
              <a href="#case-studies" className="nav-link-custom" data-bs-toggle="collapse" data-bs-target="#mobileMenu">Case Studies</a>
            </div>
          </div>
        </div>
      </nav>

      <section id="about" className="hero-section">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7">
              <div className="hero-name-wrap">
                <h1 className="hero-name">
                  Hi, I'm <span className="name-accent">Anojan Sivaranjan</span>
                </h1>
                <div className="hero-role">Software Engineering Student</div>
              </div>

              <p className="hero-tagline">
                A passionate Software Engineering student crafting beautiful, user-centered
                digital experiences. Currently exploring the principles that make
                great design and software - one pixel and one line of code at a time.
              </p>

              <div className="hero-cta-group">
                <a href="#case-studies" className="btn-primary-custom">
                  View Case Studies <span aria-hidden="true">↓</span>
                </a>
                <a href="#how-i-work" className="btn-ghost-custom">
                  How I Work <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="about-card">
                <h2 className="about-card-title">A little about me 🧩</h2>
                <p>
                  I'm currently a second-year Software Engineering student at the University of Ottawa with a deep interest in
                  developing scalable, efficient, and user-centered software solutions. I am passionate about
                  creating applications that solve real-world problems and enhance the lives of users.
                </p>
                <p>
                  Outside of design, you'll find me reading comics, playing video games, or
                  deep-diving into a topic that has sparked my interest.
                </p>

                <ul className="about-meta">
                  <li>
                    <strong>Location</strong>
                    Ottawa, Canada
                  </li>
                  <li>
                    <strong>Status</strong>
                    Aspiring Full Stack Developer
                  </li>
                  <li>
                    <strong>Tools</strong>
                    Node.js, React, Python, Figma, Tailwind & More
                  </li>
                  <li>
                    <strong>Focus</strong>
                    User Experience & Backend
                  </li>
                </ul>

                <div className="interests-list">
                  {interests.map((tag) => (
                    <span key={tag} className="interest-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="connect" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Connect</span>
            <h2 className="section-title">Find Me Online</h2>
            <p className="section-desc">
              Feel free to explore my open-source projects on GitHub or connect with me on LinkedIn.
            </p>
          </div>

          <div className="social-links-grid">
            <a
              href="https://github.com/Anojan-Siva"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <span className="social-icon">💻</span>
              <div className="social-content">
                <h3>GitHub</h3>
                <p>Explore my repositories, source code, and developer contributions.</p>
              </div>
              <span className="social-arrow" aria-hidden="true">→</span>
            </a>

            <a
              href="https://www.linkedin.com/in/anojan-sivaranjan1/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <span className="social-icon">🔗</span>
              <div className="social-content">
                <h3>LinkedIn</h3>
                <p>Connect with me professionally and stay updated on my career journey.</p>
              </div>
              <span className="social-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
      <section id="how-i-work" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">My Process</span>
            <h2 className="section-title">How I Work</h2>
            <p className="section-desc">
              I'm currently taking a UI design course and actively building my design
              skillset. Here's what guides my approach to creating great experiences.
            </p>
          </div>

          <ul className="workflow-list">
            {workflowItems.map((item, idx) => (
              <li key={item.title} className="workflow-item">
                <div className="workflow-num">{(idx + 1).toString().padStart(2, '0')}</div>
                <div className="workflow-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    {item.link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="concepts-block">
            <div className="concepts-block-header">
              <h3 className="concepts-block-title">Design Concepts</h3>
              <span className="concepts-block-note">Coming this semester</span>
            </div>
            <div className="concepts-grid">
              {[
                'User-Centered Design',
                'Heuristic Evaluation',
                'Wireframing',
                'Prototyping',
                'Usability Testing',
                'Information Architecture',
                'Accessibility (a11y)',
                'Design Systems',
                'Visual Hierarchy',
                'Interaction Design',
              ].map((concept) => (
                <div key={concept} className="concept-item">
                  {concept}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="case-studies" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Case Studies</h2>
            <p className="section-desc">
              Real projects and design explorations showcasing my approach to creating effective digital experiences.
            </p>
          </div>

          <div className="case-studies-list">
            {caseStudies.map((study, idx) => (
              <button
                key={study.id}
                className="case-entry"
                onClick={() => openModal(study)}
                aria-label={`View details for ${study.title}`}
              >
                <div className="case-entry-inner">
                  <div className="case-img-area">
                    <div className={`case-img-placeholder case-ph-${idx + 1}`}>
                      <span role="img" aria-label={study.title} style={{ fontSize: '3rem' }}>
                        {study.icon}
                      </span>
                    </div>
                  </div>
                  <div className="case-num">Project {(idx + 1).toString().padStart(2, '0')}</div>
                  <h3 className="case-title">{study.title}</h3>
                  <p className="case-desc">{study.description}</p>
                  {!study.link && <span className="case-status">Coming Soon</span>}
                  <span className="case-arrow" aria-hidden="true">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <footer className="portfolio-footer">
        <div className="container">
          <p className="footer-text">
            © {new Date().getFullYear()} Anojan Siva · Built with{' '}
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              React
            </a>{' '}
            &amp;{' '}
            <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">
              Bootstrap
            </a>
          </p>
        </div>
      </footer>
      {activeModal && (
        <div
          className="dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="dialog-panel">
            <div className="dialog-header">
              <span className="dialog-tag">
                {activeModal.modalTitle}
              </span>
              <button
                onClick={closeModal}
                className="dialog-close"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="dialog-body">
              <h2 id="modal-title" className="dialog-title">
                {activeModal.link ? activeModal.title : 'Coming Soon'}
              </h2>
              <p>
                {activeModal.link
                  ? `Explore the live project to see how this service site was designed and built.`
                  : `This project is in progress as part of my UI Design course. Check
                back soon to see the full case study for `}
                {!activeModal.link && <strong>{activeModal.title}</strong>}
                {!activeModal.link && '!'}
              </p>

              <div className="dialog-desc-block">
                <strong>{activeModal.tag}</strong>
                <br />
                {activeModal.description}
              </div>
            </div>
            <div className="dialog-footer">
              {activeModal.link ? (
                <a
                  href={activeModal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-custom"
                  style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}
                >
                  View Live Project →
                </a>
              ) : (
                <button onClick={closeModal} className="btn-primary-custom">
                  Got it — I'll check back soon!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
