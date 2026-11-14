import type {CSSProperties} from 'react';
export function Art({cat,variant=1,hero=false}:{cat:string;variant?:number;hero?:boolean}) {
 const c=cat==='storie'?'#ede7fc':cat==='arcade'?'#fff0d8':cat==='avventure'?'#e1f1e9':cat==='arte'?'#fbe5ed':cat==='scienza'?'#e3effa':'#f0f0d8';
 const purple='#7858b6',ink='#494058';
 return <svg viewBox="0 0 420 220" className={'project-art '+(hero?'hero-art':'')} aria-hidden="true" style={{'--art-bg':c} as CSSProperties}>
 <defs><pattern id={'dots-'+cat+variant} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill={ink} opacity=".1"/></pattern></defs>
 <rect width="420" height="220" fill={c}/><rect width="420" height="220" fill={'url(#dots-'+cat+variant+')'}/>
 {cat==='storie'&&<>
 <circle cx="218" cy="123" r="78" fill="#e1d6f5"/><path d="M54 179 Q200 130 368 179" fill="none" stroke="#d0c0eb" strokeWidth="2"/>
 <g className="float-soft"><path d="M108 56h92a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12h-49l-17 12 3-12h-29a12 12 0 0 1-12-12V68a12 12 0 0 1 12-12" fill="white" stroke="#d2c2e7" strokeWidth="2"/><text x="121" y="84" fontSize="16" fontWeight="700" fill={purple}>Ciao, mondo!</text></g>
 <g transform="translate(215 72)"><path d="M-20 95 Q-30 57 0 46Q30 57 21 95" fill="#f6b562"/><path d="M-22 0 -28 32Q-20 58 0 56Q24 57 29 32L22 0 7 12 -7 12Z" fill="#f6b562" stroke="#bf8141" strokeWidth="2"/><path d="M-17 9 -20 23 -9 16 M17 9 20 23 9 16" fill="#e99472"/><ellipse cx="-10" cy="29" rx="4" ry="6" fill={ink}/><ellipse cx="10" cy="29" rx="4" ry="6" fill={ink}/><path d="m-3 39 3 3 3-3 M0 42q-7 9-12 1M0 42q7 9 12 1" fill="none" stroke={ink} strokeWidth="2"/><path d="M-18 65 -39 79M20 65 40 48M-13 95 -24 106M14 95 25 106" fill="none" stroke="#bf8141" strokeWidth="9" strokeLinecap="round"/><path d="M22 86q35 4 31-24" fill="none" stroke="#f6b562" strokeWidth="11" strokeLinecap="round"/></g>
 <g transform="translate(314 123) rotate(8)"><rect x="-25" y="-29" width="50" height="54" rx="12" fill="#a792d3"/><path d="M-15-29v-11h30v11" fill="none" stroke={purple} strokeWidth="3"/><circle cx="-9" cy="-8" r="4" fill="white"/><circle cx="9" cy="-8" r="4" fill="white"/><path d="M-9 9h18" stroke="white" strokeWidth="3" strokeLinecap="round"/><path d="M-15 25v12M15 25v12" stroke={purple} strokeWidth="6" strokeLinecap="round"/></g>
 <path d="m313 48 4 10 11 1-9 7 2 11-8-6-9 6 2-11-9-7 11-1Z" fill="#c4d783"/><circle cx="78" cy="134" r="7" fill="#c4d783"/><path d="m352 170 6 6m-6 0 6-6" stroke={purple} strokeWidth="2"/>
 </>}
 {cat==='arcade'&&<>
 <circle cx="214" cy="120" r="83" fill="#f9e1b8"/><g transform="rotate(-5 210 115)"><rect x="116" y="45" width="188" height="129" rx="16" fill="#62537e"/><rect x="128" y="57" width="164" height="99" rx="8" fill="#fef6dd"/><path d="M103 175h214l12 13H91Z" fill="#9381af"/><path d="M167 179h83" stroke="#c8bbdc" strokeWidth="4" strokeLinecap="round"/>
 <path d="m170 81 5 11 13 2-10 8 3 13-11-7-11 7 3-13-10-8 13-2Z" fill="#ecac45"/><path d="m245 68 4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1Z" fill="#b1c873"/><path d="M202 137h37l5-20h-47Z" fill="#c290bb"/><path d="M171 122v13m-7-6h14" stroke="#ddc79c" strokeWidth="2"/></g>
 <g transform="translate(301 151) rotate(12)"><path d="M-28-20h56q16 5 19 28 3 18-13 15L17 12h-34l-17 11q-16 3-13-15 3-23 19-28Z" fill="#c7d78f" stroke="#788c48" strokeWidth="2"/><path d="M-27-3h17m-8-8v16" stroke="#637541" strokeWidth="4" strokeLinecap="round"/><circle cx="24" cy="-6" r="4" fill="#e39a8a"/><circle cx="33" cy="3" r="4" fill={purple}/></g>
 <path d="m83 68 7 0m-3-3v7M338 75h10m-5-5v10" stroke="#c99842" strokeWidth="2"/><circle cx="81" cy="163" r="5" fill="#d1bc91"/>
 </>}
 {cat==='avventure'&&<>
 <circle cx="208" cy="118" r="81" fill="#cce7d8"/><path d="M106 63h208v117H106Z" fill="#fffdf4" stroke="#77ad91" strokeWidth="3"/><path d="M138 63v30h58v-30M106 124h62v28h56v28M227 63v60h54v57M314 92h-30M195 93v33h32" fill="none" stroke="#82b49a" strokeWidth="9" strokeLinejoin="round"/>
 <path d="M117 168v-30h35v-31h64v33h47v27h38" fill="none" stroke="#e7ae62" strokeWidth="4" strokeDasharray="6 5" strokeLinecap="round"/>
 <circle cx="117" cy="169" r="8" fill={purple}/><path d="M300 167v-29l18 8-18 8" fill="#dd947c" stroke="#a65c55" strokeWidth="2"/>
 <g transform="translate(86 87) rotate(-12)"><circle r="26" fill="#fffdf4" stroke="#558e75" strokeWidth="3"/><path d="m0-18 8 17-8 18-8-18Z" fill="#d7a171"/><path d="m0-18 8 17h-16Z" fill="#638d7e"/></g><path d="m336 105 5 8 9 1-7 5 2 9-9-4-8 4 2-9-7-5 9-1Z" fill="#e7ae62"/>
 </>}
 {cat==='arte'&&<>
 <circle cx="204" cy="115" r="82" fill="#f4cfdf"/><g transform="rotate(-7 200 130)"><rect x="109" y="99" width="195" height="74" rx="9" fill="white" stroke="#c98ca7" strokeWidth="3"/>{[0,1,2,3,4,5,6].map((n)=><path key={n} d={'M'+(137+n*24)+' 101v70'} stroke="#dbc2cd" strokeWidth="2"/>)}{[0,1,3,4,5].map(n=><rect key={n} x={128+n*24} y="100" width="14" height="41" rx="3" fill="#846595"/>)}<rect x="112" y="149" width="23" height="21" rx="2" fill="#e9adbb"/><rect x="184" y="149" width="23" height="21" rx="2" fill="#c2d08d"/></g>
 <g className="float-soft" fill={purple}><path d="M166 50v39" stroke={purple} strokeWidth="5"/><ellipse cx="158" cy="89" rx="11" ry="8" transform="rotate(-20 158 89)"/><path d="m166 50 36-8v32" fill="none" stroke={purple} strokeWidth="5"/><ellipse cx="194" cy="77" rx="11" ry="8" transform="rotate(-20 194 77)"/></g>
 <path d="m276 54 9 14 17-1-10 13 5 17-16-7-14 9 2-17-12-12 17-2Z" fill="#c6d68c"/><circle cx="91" cy="72" r="7" fill="#e4ad89"/><path d="M322 144q28 8 19 31" fill="none" stroke="#bb80a0" strokeWidth="3" strokeLinecap="round"/>
 </>}
 {cat==='scienza'&&<>
 <circle cx="213" cy="114" r="80" fill="#cce3f3"/><ellipse cx="216" cy="116" rx="134" ry="39" fill="none" stroke="#80accb" strokeWidth="2" transform="rotate(-21 216 116)"/><ellipse cx="216" cy="116" rx="104" ry="63" fill="none" stroke="#9fbed7" strokeWidth="2" transform="rotate(30 216 116)"/>
 <circle cx="216" cy="116" r="37" fill="#f5cb78"/><circle cx="205" cy="106" r="6" fill="#e8b65e"/><path d="M232 132q-13 9-25-1" fill="none" stroke="#e0ac58" strokeWidth="3" strokeLinecap="round"/>
 <g className="float-soft"><circle cx="327" cy="73" r="18" fill="#9a85c4"/><path d="M304 80q23 12 48-3" fill="none" stroke="#c0addd" strokeWidth="5" strokeLinecap="round"/></g><circle cx="118" cy="141" r="13" fill="#81b598"/><path d="m151 48 0 10m-5-5h10M295 178v8m-4-4h8" stroke="#79a8c6" strokeWidth="2"/><circle cx="90" cy="83" r="3" fill={purple}/><circle cx="264" cy="48" r="3" fill={purple}/>
 </>}
 {cat==='utili'&&<>
 <circle cx="210" cy="118" r="81" fill="#e2e4bc"/><g transform="rotate(-6 207 114)"><rect x="133" y="44" width="138" height="142" rx="16" fill="#fffef4" stroke="#a4aa71" strokeWidth="3"/><rect x="148" y="58" width="108" height="36" rx="6" fill="#dfe5bd"/><text x="202" y="82" textAnchor="middle" fill="#6a744d" fontSize="20" fontWeight="600">6 × 7 = ?</text>{[0,1,2].flatMap(r=>[0,1,2].map(k=><rect key={r+'-'+k} x={150+k*36} y={108+r*22} width="27" height="15" rx="4" fill={k===2&&r===2?'#b09bcf':'#e9e8d7'}/>))}<text x="235" y="164" textAnchor="middle" fill="white" fontSize="13">=</text></g>
 <g className="float-soft" transform="translate(289 98)"><path d="M-18 18q-22-32 0-45 26-12 38 12 8 16-7 31l-3 14h-22Z" fill="#f6cf7f" stroke="#c0a25d" strokeWidth="2"/><path d="M-10 33h18m-14 6h11" stroke="#9b8e5e" strokeWidth="4" strokeLinecap="round"/><path d="m-6-7 6 9 7-9M0 2v23" fill="none" stroke="#d5ad57" strokeWidth="2"/></g>
 <path d="m96 101 8 8 16-19" stroke="#8f9e5c" strokeWidth="5" strokeLinecap="round" fill="none"/><circle cx="318" cy="164" r="5" fill="#b29acd"/>
 </>}
 </svg>
}
export function HeroArt(){return <div className="hero-collage" aria-hidden="true"><div className="collage-orbit"/><div className="little-label label-top"><span className="green-dot"/> un’idea, infinite possibilità</div><div className="hero-stage"><div className="stage-bar"><i/><i/><i/><span>la tua prossima creazione.sb3</span><span>⚑</span></div><Art cat="storie" hero/></div><div className="scratch-stack"><span className="scratch-event">⚑ quando nasce un’idea</span><span className="scratch-motion">fai il primo passo</span><span className="scratch-control">ripeti <b>finché ti piace</b></span><span className="scratch-look">aggiungi il tuo tocco ✧</span></div><div className="sparkle-one">✦</div><div className="little-label label-bottom"><span>✧</span> Qui si impara creando.</div></div>}
