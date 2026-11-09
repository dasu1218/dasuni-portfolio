import { useState } from 'react';
import { ArrowUpRight, RotateCcw, Check, Sparkles } from 'lucide-react';

const palettes = [
  { name: 'Rose', accent: '#a83c60', paper: '#f4dce5', soft: '#e8b5c7' },
  { name: 'Forest', accent: '#395940', paper: '#e0e9d7', soft: '#b4c7a7' },
  { name: 'Iris', accent: '#614292', paper: '#e9e0f6', soft: '#cdb8e8' },
  { name: 'Clay', accent: '#964021', paper: '#f6e5d3', soft: '#e4ba96' },
];

export default function DesignLab() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [type, setType] = useState('Editorial');
  const [radius, setRadius] = useState(24);
  const [saved, setSaved] = useState(false);
  const palette = palettes[paletteIndex];
  function reset() {
    setPaletteIndex(0);
    setType('Editorial');
    setRadius(24);
    setSaved(false);
  }
  return <section id="lab" className="section design-lab">
    <div className="section-heading"><div><p className="eyebrow">A LITTLE EXPERIMENT / MADE FOR YOU</p><h2>You bring the taste.<br /><em>I’ll bring the interface.</em></h2></div><p>Don’t just look at the design.<br />Make it feel like you.</p></div>
    <div className="lab-layout">
      <div className="lab-controls">
        <div className="lab-label"><Sparkles size={16} /><span>THE MINI DESIGN STUDIO</span></div>
        <fieldset><legend>01 <span>Pick a palette</span></legend><div className="lab-swatches">{palettes.map((item, index) => <button key={item.name} aria-label={`${item.name} palette`} aria-pressed={paletteIndex === index} onClick={() => setPaletteIndex(index)}><span style={{ background: item.accent }}>{paletteIndex === index && <Check size={16} />}</span><small>{item.name}</small></button>)}</div></fieldset>
        <fieldset><legend>02 <span>Set the personality</span></legend><div className="lab-type">{['Editorial', 'Modern'].map(item => <button key={item} aria-pressed={type === item} onClick={() => setType(item)}><span className={item === 'Editorial' ? 'serif-sample' : ''}>Aa</span>{item}</button>)}</div></fieldset>
        <div className="lab-radius"><label htmlFor="corner-radius">03 <span>Soften the edges</span><output htmlFor="corner-radius">{radius}px</output></label><input id="corner-radius" type="range" min="0" max="36" value={radius} onChange={event => setRadius(Number(event.target.value))} /><div><span>Precise</span><span>Playful</span></div></div>
        <button className="lab-reset" onClick={reset}><RotateCcw size={13} /> Reset the canvas</button>
      </div>
      <div className="lab-stage" style={{ '--lab-accent': palette.accent, '--lab-paper': palette.paper, '--lab-soft': palette.soft, '--lab-radius': `${radius}px`, '--lab-font': type === 'Editorial' ? 'Georgia, serif' : "'Manrope', sans-serif" }}>
        <div className="lab-stage-caption"><span><i /> LIVE PREVIEW</span><span>DESIGNED BY YOU + DASUNI</span></div>
        <div className="lab-card"><div className="lab-card-top"><span>the everyday edit.</span><span>VOL. 01 ↗</span></div><div className="lab-card-art" aria-hidden="true"><span className="lab-orbit" /><span className="lab-art-flower">✳</span><span className="lab-art-dot" /><span className="lab-art-caption">A FRESH POINT OF VIEW</span></div><div className="lab-card-copy"><span className="lab-card-category">DESIGN / LITTLE MOMENTS</span><h3>Make space<br />for a little wonder.</h3><p>Thoughtful details turn everyday experiences into something worth remembering.</p><button aria-pressed={saved} onClick={() => setSaved(value => !value)}>{saved ? 'Added to your inspiration' : 'Save a little inspiration'}{saved ? <Check size={16} /> : <ArrowUpRight size={16} />}</button></div></div>
        <p className="lab-recipe" aria-live="polite">{palette.name} palette <span>·</span> {type} type <span>·</span> {radius}px corners</p>
      </div>
    </div>
    <div className="lab-footnote"><span>Small choices. A completely different feeling.</span><p>A live experiment in visual hierarchy, design systems, and React. Your creation stays in this session.</p></div>
  </section>;
}
