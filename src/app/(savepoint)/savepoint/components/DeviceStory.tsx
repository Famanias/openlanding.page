'use client';
import { useEffect, useRef, useState } from 'react';
import { createDeviceInspection } from '../lib/deviceInspection';
import { assetUrl } from '../data/assets';

const studies = [
    { title: 'INCLINED WIDE APERTURE', copy: 'A low wedge. A generous view. The landscape display tilts toward you, keeping the world close and the hardware quiet.', image: 'deck-01-three-quarter.png', detail: 'LANDSCAPE DISPLAY / INCLINED GLASS' },
    { title: 'TOP-LOADING SLOT CAVITY', copy: 'One deliberate downward motion. The recessed guides hold the cartridge on its vertical axis until the connector meets the contacts below.', image: 'deck-01-slot-detail.png', detail: 'VERTICAL INSERTION / RECESSED CONTACTS' },
    { title: 'TACTILE DECK CONTROLS', copy: 'Four small controls sit along the front lip. Nothing between your hands and the next detour, except the satisfying decision to begin.', image: 'deck-01-front.png', detail: 'FOUR FRONT-LIP CONTROLS / STATUS LED' },
    { title: 'VENTED POLYMER CHASSIS', copy: 'Charcoal polymer, a continuous base seam and narrow vent ribs. An object made to sit on a desk, and stay in a memory.', image: 'deck-01-three-quarter.png', detail: 'CHARCOAL POLYMER / RIBBED VENTILATION' },
];

export default function DeviceStory() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const inspector = useRef<ReturnType<typeof createDeviceInspection> | null>(null);
    const settings = useRef({ angle: 0, wireframe: false });
    const [angle, setAngle] = useState(0), [wireframe, setWireframe] = useState(false), [failed, setFailed] = useState(false);
    useEffect(() => {
        const element = canvas.current!;
        const fail = (event: Event) => {
            event.preventDefault();
            inspector.current?.dispose();
            inspector.current = null;
            setFailed(true);
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !inspector.current) {
                try {
                    inspector.current = createDeviceInspection(element);
                    inspector.current.inspect(settings.current.angle, settings.current.wireframe);
                } catch { setFailed(true); }
            }
            inspector.current?.setVisible(entry.isIntersecting);
        }, { rootMargin: '120px' });
        observer.observe(element);
        element.addEventListener('webglcontextlost', fail);
        return () => { observer.disconnect(); element.removeEventListener('webglcontextlost', fail); inspector.current?.dispose(); inspector.current = null; };
    }, []);
    useEffect(() => {
        settings.current = { angle, wireframe };
        inspector.current?.inspect(angle, wireframe);
    }, [angle, wireframe]);
    const study = studies[angle];
    return <section id="the-deck" className="device-story editorial-section" aria-labelledby="device-title">
        <div className="section-rule utility"><span>02 / THE HARDWARE</span><span>DECK/01 — OBJECT STUDY</span></div>
        <h2 id="device-title" className="section-title centered">ONE CONSOLE.<br /><span>INFINITE DETOURS.</span></h2>
        <div className="hardware-studio">
            <div className="inspection-stage">
                <div className="studio-label utility"><span>DECK/01</span><span>INTERACTIVE STUDY</span></div>
                <canvas ref={canvas} className="inspection-canvas" aria-label="DECK/01 inspection. Choose one of the four views below." />
                {failed && <img className="inspection-fallback" src={assetUrl(study.image)} alt="DECK/01 console reference" />}
                <div className="studio-bottom utility"><span>{String(angle + 1).padStart(2, '0')} / 04</span><button onClick={() => setWireframe(!wireframe)} aria-pressed={wireframe} disabled={failed}>WIREFRAME <span>{wireframe ? 'ON' : 'OFF'}</span></button></div>
            </div>
            <div className="inspection-controls">
                <div className="inspection-options" role="group" aria-label="Hardware inspection views">{studies.map((item, index) => <button key={item.title} aria-pressed={angle === index} onClick={() => setAngle(index)}><span className="utility">0{index + 1}</span><span>{item.title}</span><span aria-hidden="true">↗</span></button>)}</div>
                <p className="inspection-copy" aria-live="polite">{study.copy}</p>
                <p className="utility study-detail">{study.detail}</p>
            </div>
        </div>
    </section>;
}
