import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, X, Sparkles, MousePointer2 } from 'lucide-react';
import './Portfolio.css';
import DesignLab from './DesignLab';

const projects = [
  {
    id: 'petro',
    category: 'Personal project',
    image: '/projects/image.png',
    gallery: [
      { src: '/projects/image-1.png', alt: 'Petro shop page showing pet wellness categories', caption: 'Shop categories' },
      { src: '/projects/image-2.png', alt: 'Petro product cards with prices and shopping controls', caption: 'Products and store benefits' },
    ],
    imageAlt: 'Petro pet care online store homepage with product bundles and shopping navigation',
    title: 'Pet care essentials, brought online.',
    name: 'Petro',
    type: 'UI/UX design',
    className: 'campus petro',
    description: 'Petro is a personal project: an online product selling system for pet care essentials. I worked on the UI/UX design for the project.',
    overview: 'An online store that brings pet care products, bundles, and wellness essentials into one shopping experience.',
    contribution: 'I designed the user interface and user experience in Figma, shaping how the store presents products and guides customers through the shopping experience.',
    tools: 'Figma for UI/UX design. The full project uses React, MongoDB, and Cloudinary.',
    tags: ['Personal project', 'Figma', 'React', 'MongoDB', 'Cloudinary'],
  },

  {
    id: 'que-qare',
    category: 'Hospital queue management',
    image: '/projects/health-app-home.png',
    imageAlt: 'Queue Qare hospital queue management homepage',
    gallery: [
      { src: '/projects/health-app-login.png', alt: 'Queue Qare login screen', caption: 'Login' },
      { src: '/projects/health-app-bookings.png', alt: 'Queue Qare bookings screen', caption: 'Bookings' },
    ],
    title: 'Helping hospital staff manage patient queues.',
    name: 'Queue Qare',
    type: 'UI/UX design',
    className: 'flow',
    description: 'Queue Qare is a queue management system designed to help government hospital staff organize patient queues, manage patient priority, and handle emergency cases.',
    overview: 'The system brings patient queue management, priority queues, and emergency case handling into a shared workflow for hospital staff.',
    contributionLabel: 'Project focus',
    contribution: 'Supporting hospital staff as they organize patient queues and manage priority and emergency cases.',
    tools: 'Figma, React, MongoDB, and Cloudinary, with the project repository hosted on GitHub.',
    repo: 'https://github.com/Queue-Care/QueueCare',
    tags: ['Hospital queue management', 'Figma', 'React', 'MongoDB', 'Cloudinary'],
  },
  {"id": "nancee", "name": "Nancee", "title": "Medical products, available online.", "category": "Medical product sales", "type": "Software development", "className": "flow", "description": "A medical product selling system created as a team project.", "overview": "A medical product selling system created as a team project.", "tools": "Java, MongoDB, Cloudinary, and Git.", "tags": ["Java", "MongoDB", "Cloudinary", "Git"]},
  {"id": "hospital-management", "name": "Hospital Management System", "title": "Supporting hospital management.", "category": "Hospital management", "type": "Software development", "className": "flow", "description": "A hospital management system created as a team project using PHP.", "overview": "A hospital management system created as a team project using PHP.", "tools": "PHP.", "tags": ["PHP", "Hospital management"]},
  {"id": "car-rental", "name": "Car Rental System", "title": "A system for car rentals.", "category": "Car rental", "type": "Software development", "className": "flow", "description": "A car rental system built using Java and MongoDB, with Git for version control.", "overview": "A car rental system built using Java and MongoDB, with Git for version control.", "tools": "Java, MongoDB, and Git.", "tags": ["Java", "MongoDB", "Git"]},
  {"id": "event-planning-app", "name": "Event Planning App", "title": "Planning events on mobile.", "category": "Event planning", "type": "Mobile development", "className": "flow", "description": "A mobile app for event planning, created using Android Studio.", "overview": "A mobile app for event planning, created using Android Studio.", "tools": "Android Studio.", "tags": ["Mobile app", "Android Studio"]},
  {"id": "food-delivery-app", "name": "Food Delivery App", "title": "Food delivery on mobile.", "category": "Food delivery", "type": "Mobile development", "className": "flow", "description": "A mobile food delivery app created using Android Studio.", "overview": "A mobile food delivery app created using Android Studio.", "tools": "Android Studio.", "tags": ["Mobile app", "Android Studio"]},
];

function Preview({ kind, image, imageAlt }) {
  const [failedImage, setFailedImage] = useState(null);
  if (image && failedImage !== image) {
    return <img className="project-photo" src={image} alt={imageAlt || 'Project interface preview'} loading="lazy" onError={() => setFailedImage(image)} />;
  }
  const project = projects.find(item => item.id === kind);
  return <div className="project-title-preview"><span>{project?.category}</span><strong>{project?.name}</strong><p>{project?.tags.join(' · ')}</p></div>;
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const page = useRef(null);
  const progress = useRef(null);
  useEffect(() => {
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      progress.current.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        if (!preference.matches) {
          const animation = target.animate([
            { opacity: 0, transform: 'translateY(28px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 750, easing: 'cubic-bezier(.22,1,.36,1)', delay: Number(target.dataset.delay || 0) });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
        observer.unobserve(target);
      });
    }, { threshold: 0.12 });
    page.current.querySelectorAll('.section-heading, .project, .art-grid > article, .about-art, .about-copy, .process-grid > article, .contact h2').forEach(target => {
      if (target.parentElement.matches('.art-grid, .process-grid')) {
        target.dataset.delay = [...target.parentElement.children].indexOf(target) * 100;
      }
      observer.observe(target);
    });
    const stopMotion = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', stopMotion);
    };
  }, [filter]);
  function movePreview(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = event.target.closest('.project-preview, .artwork');
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -5}deg`);
    card.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 5}deg`);
  }
  function resetPreview(event) {
    const card = event.target.closest('.project-preview, .artwork');
    if (card && !card.contains(event.relatedTarget)) {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    }
  }
  useEffect(() => { if (selected) dialog.current?.showModal(); }, [selected]);
  return <div className="portfolio-root" ref={page} onPointerMove={movePreview} onPointerOut={resetPreview}>
    <div className="reading-progress" ref={progress} aria-hidden="true" />
    <header className="navigation"><a className="wordmark" href="#home">dasuni<span>✳</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#play">Design playground</a><a href="#lab">Design lab</a><a href="#about">About</a></nav><a className="nav-contact" href="#contact">Let’s connect <ArrowUpRight size={16} /></a></header>
    <main>
      <section id="home" className="hero section"><div className="hero-kicker"><span /> A creative mind, a developer’s curiosity</div><h1>Thoughtful interfaces.<br /><span>A little personality.</span><svg viewBox="0 0 470 20" aria-hidden="true"><path d="M5 14 Q230 -5 465 10" /></svg></h1><div className="hero-bottom"><p>I’m Dasuni, a Computer Science undergraduate at SLIIT, exploring <strong>UI/UX engineering & graphic design.</strong> I connect thoughtful visuals with the code that brings them to life.</p><a className="button dark" href="#work">Explore my work <ArrowDown size={17} /></a></div><div className="hero-note"><MousePointer2 size={16} /> Where design meets development</div><span className="hero-flower" aria-hidden="true">✳</span></section>
      <div className="discipline-strip"><span>UI / UX DESIGN</span><i>✳</i><span>FRONTEND DEVELOPMENT</span><i>✳</i><span>VISUAL IDENTITIES</span><i>✳</i><span>GRAPHIC DESIGN</span></div>
      <section id="work" className="section work"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED PROJECTS</p><h2>Good design.<br /><em>Made to work.</em></h2></div><p>From the first sketch to the final interaction.<br />A space for my evolving design practice.</p></div><div className="filters" aria-label="Filter projects">{['All work', 'UI/UX design', 'Software development', 'Mobile development'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="project-list">{projects.filter(p => filter === 'All work' || p.type === filter).map((project, i) => <article className="project" key={project.id}><button className={`project-preview ${project.className}`} onClick={() => setSelected(project)} aria-label={`Explore ${project.name}`}><span className="preview-label">{project.type} / {project.category}</span><Preview kind={project.id} image={project.image} imageAlt={project.imageAlt} /><span className="preview-arrow"><ArrowUpRight /></span></button><div className="project-details"><span className="project-number">0{i + 1}</span><div><p className="eyebrow">{project.name}</p><h3>{project.title}</h3><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><button className="text-link" onClick={() => setSelected(project)}>View project <ArrowUpRight size={18} /></button></div></article>)}</div></section>
      <section id="play" className="playground"><div className="section"><div className="section-heading"><div><p className="eyebrow">02 / EVENT CARD DESIGNS</p><h2>A little design.<br /><em>A special occasion.</em></h2></div><p>Personal wedding invitation designs,<br />created using Figma.</p></div><article className="wedding-design"><a className="wedding-preview" href="/projects/image%20copy.png" target="_blank" rel="noopener noreferrer" aria-label="View full wedding invitation design (opens in a new tab)"><img src="/projects/image%20copy.png" alt="Wedding invitation design featuring Alexander and Emily, green and gold typography, and floral details" loading="lazy" /><span className="wedding-view">View full design <ArrowUpRight size={18} /></span></a><div className="art-caption"><h3>Wedding invitation</h3><span>Personal work · Figma</span></div><p className="wedding-description">A personal digital wedding invitation design exploring soft colours, floral details, and elegant typography. Designed using Figma.</p></article></div></section>
      <DesignLab />
      <section id="about" className="section about"><div className="about-art"><span>designer.<br /><em>developer.</em><br />always curious.</span><div className="about-sticker">DESIGN + CODE<br />♡</div><small>BASED IN SRI LANKA / CREATING EVERYWHERE</small></div><div className="about-copy"><p className="eyebrow">03 / THE PERSON BEHIND THE PIXELS</p><h2>Hi, I’m Dasuni<span> ✳</span></h2><p>I’m a Information technology specialized in Information Technology undergraduate at SLIIT with an interest in the space where people, design, and technology meet.</p><p>I’m shaping my practice around UI/UX engineering and graphic design: thinking through how an experience works, finding its visual voice, and bringing it into the browser.</p><div className="skills"><div><h3>Design interests</h3><p>Interface design · User flows · Prototyping · Typography · Branding · Visual storytelling · Logo design · Banner design</p></div><div><h3>Design tools</h3><p>Figma · Canva · Adobe Photoshop. I design logos and banners using Canva.</p></div><div><h3>Development foundation</h3><p>React · JavaScript · HTML & CSS · Java · PHP · Python · Git · Figma · Canva · Adobe Photoshop · SQL · Power BI · MongoDB · Cloudinary · Android Studio </p></div></div></div></section>
      <section className="section process"><p className="eyebrow">04 / HOW I APPROACH A PROJECT</p><h2>From “what if” to “that works.”</h2><div className="process-grid">{[['Listen & understand', 'Start with the people, the problem, and the context. Ask questions before choosing a solution.'], ['Explore & design', 'Map the flow, sketch possibilities, and build a visual language around the experience.'], ['Build & refine', 'Translate the design into responsive code, test the details, and keep improving.']].map(([title, copy], i) => <article key={title}><span>0{i + 1} /</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <footer id="contact" className="contact"><div className="section"><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make<br /><em>something meaningful.</em> <span>↗</span></h2><p>I’m interested in design, frontend development, and opportunities to learn with a creative team.</p><div className="contact-links"><a href="mailto:dasuninethmini03@gmail.com"><span>Email</span>dasuninethmini03@gmail.com <ArrowUpRight size={18} /></a><a href="tel:+94777860551"><span>Phone</span>077 786 0551 <ArrowUpRight size={18} /></a><a href="https://github.com/dasu1218" target="_blank" rel="noopener noreferrer"><span>GitHub</span>dasu1218 <ArrowUpRight size={18} /></a><a href="https://www.linkedin.com/in/dasuni-nethmini-400471367" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span>Dasuni Nethmini <ArrowUpRight size={18} /></a></div><p className="contact-location">Based in Minuwangoda, Sri Lanka</p><div className="footer-bottom"><a className="wordmark" href="#home">dasuni<span>✳</span></a><span>© {new Date().getFullYear()} Dasuni Nethmini</span><a href="#home">Back to top ↑</a></div></div></footer>
    </main>
    <dialog ref={dialog} className="case-dialog" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>{selected && <><button className="dialog-close" aria-label="Close project" onClick={() => dialog.current.close()}><X /></button><p className="eyebrow">{selected.type} / {selected.category}</p><h2>{selected.name}</h2><p>{selected.description}</p><div className={`dialog-preview ${selected.className}`}><Preview kind={selected.id} image={selected.image} imageAlt={selected.imageAlt} /></div>{selected.gallery?.map(photo => <figure className="project-gallery-item" key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>{photo.caption}</figcaption></figure>)}{[['Project overview', selected.overview], [selected.contributionLabel || 'My contribution', selected.contribution], ['Tools & technologies', selected.tools]].filter(([, copy]) => copy).map(([title, copy]) => <div className="case-section" key={title}><h3>{title}</h3><p>{copy}</p></div>)}<div>{selected.repo && <a className="text-link" href={selected.repo} target="_blank" rel="noopener noreferrer">View on GitHub <ArrowUpRight size={18} /></a>}</div><button className="button dark" onClick={() => dialog.current.close()}>Back to work <Sparkles size={16} /></button></>}</dialog>
  </div>;
}
