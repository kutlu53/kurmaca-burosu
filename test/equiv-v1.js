/* Çalıştır: node test/equiv-v1.js .   — evalConn, score ve summaryText sonuçlarını v1 ile karşılaştırır */
const fs=require("fs"),vm=require("vm");
const root=process.argv[2];
const html=fs.readFileSync(root+"/prototip-v1.html","utf8");
const js=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const cut=(from,to)=>js.slice(js.indexOf(from),js.indexOf(to));
// v1 bağlamı: veri + saf fonksiyonlar
const v1={Date,Math,String,Object,JSON};vm.createContext(v1);
vm.runInContext(cut("const TYPES=","/* ================= DURUM"),v1);
vm.runInContext(`
const CLUE_IDS=Object.keys(CASE.clues);let S=null;const foundIds=()=>CLUE_IDS.filter(id=>S.found[id]);
const nameOf=id=>id==="merkez"?"Gizli merkez":CASE.clues[id].label;
`+cut("function fmtTime(","function renderChips(")
 +cut("function score(){","function vSonuc(){")
 +cut("function evalConn(","/* ================= OLAYLAR")
 +`;this.api={score,summaryText,evalConn,setS:s=>{S=s}};`,v1);
// v2 bağlamı
const w={Date,Math,String,Object,JSON,setTimeout,clearTimeout,document:{querySelector:()=>null,addEventListener(){}}};w.window=w;vm.createContext(w);
for(const f of["data/case-01.js","js/score.js","js/board.js"])vm.runInContext(fs.readFileSync(root+"/"+f,"utf8"),w,{filename:f});
vm.runInContext(`KB.TYPES={leitmotif:"Leitmotif / İmge",metafor:"Metafor",mekan:"Mekân",diyalog:"Diyalog",anlatici:"Anlatıcı / Bakış açısı",zaman:"Zaman",kanit:"Kanıt"};KB.GRADES={ustaca:"Ustaca",guclu:"Güçlü",zayif:"Zayıf",yetersiz:"Kanıt yetersiz"};KB.esc=s=>s;`,w);
const CASE=w.CASES[0],KB=w.KB,IDS=Object.keys(CASE.clues);
// v1'in 6 türü karşılaştırılır; v2'nin yedinci türü (anlatici) v1'de yok, öneri metninden ayıklanır
const TYPES=["leitmotif","metafor","mekan","diyalog","zaman","kanit"];
const strip=t=>t.replace(" / Anlatıcı / Bakış açısı","");
let fails=0;const fail=m=>{fails++;if(fails<15)console.log("FARK:",m)};
// 1) evalConn: bütün çiftler × bütün türler
const nodes=["merkez",...IDS];let n=0;
for(let i=0;i<nodes.length;i++)for(let j=0;j<nodes.length;j++){if(i===j)continue;for(const t of TYPES){
 const a=v1.api.evalConn(nodes[i],nodes[j],t),b=KB.evalConn(nodes[i],nodes[j],t,CASE);n++;
 if(a.grade!==b.grade||a.text!==strip(b.text))fail(`evalConn ${nodes[i]}-${nodes[j]}/${t}: v1=${a.grade} v2=${b.grade}`);
}}
console.log("evalConn karşılaştırması:",n);
// 2) score + summaryText: rastgele senaryolar
let seed=12345;const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
const pick=arr=>arr[Math.floor(rnd()*arr.length)];
const F=CASE.final,L=CASE.location;
for(let k=0;k<3000;k++){
 const found={};IDS.forEach(id=>{if(rnd()<0.6)found[id]=1});
 const fids=IDS.filter(i=>found[i]);const pool=["merkez",...fids];
 const conns=[];const nc=Math.floor(rnd()*14);
 for(let c=0;c<nc&&pool.length>1;c++){const a=pick(pool);let b=pick(pool);if(a===b)continue;if(conns.some(x=>(x.a===a&&x.b===b)||(x.a===b&&x.b===a)))continue;
  const type=pick(TYPES);const r=KB.evalConn(a,b,type,CASE);conns.push({a,b,type,grade:r.grade,text:r.text,at:0});}
 const S={found,conns,hints:Math.floor(rnd()*5),start:1000,solvedAt:rnd()<.5?61000:null,
  loc:{done:rnd()<.7,ans:pick([null,...L.options.map(o=>o.id)]),ev:fids.filter(()=>rnd()<.3)},
  fin:{who:pick([null,...F.who.options.map(o=>o.id)]),why:pick([null,...F.why.options.map(o=>o.id)]),center:pick([null,...F.center.options.map(o=>o.id)]),
       ev:fids.filter(()=>rnd()<.3).slice(0,4),report:rnd()<.5?"x".repeat(Math.floor(rnd()*120)):""}};
 v1.api.setS(S);
 const a=v1.api.score(),b=KB.score(S,CASE);
 const ka={pts:a.pts,max:a.max,rank:a.rank,rankNote:a.rankNote,clues:a.clues,whoOk:a.whoOk,evOk:a.evOk,whyOk:a.whyOk,rep:a.rep,ustaca:a.ustaca,guclu:a.guclu,c:a.cOpt&&a.cOpt.id};
 const kb={pts:b.pts,max:b.max,rank:b.rank,rankNote:b.rankNote,clues:b.clues,whoOk:b.whoOk,evOk:b.evOk,whyOk:b.whyOk,rep:b.rep,ustaca:b.ustaca,guclu:b.guclu,c:b.cOpt&&b.cOpt.id};
 if(JSON.stringify(ka)!==JSON.stringify(kb))fail("score #"+k+" "+JSON.stringify(ka)+" vs "+JSON.stringify(kb));
 const sa=v1.api.summaryText(a),sb=KB.summaryText(S,b,CASE);
 if(sa!==sb)fail("summary #"+k+"\n"+sa+"\n---\n"+sb);
}
console.log("score senaryosu: 3000");
console.log(fails?`BAŞARISIZ: ${fails} fark`:"TAMAM — puan, unvan, özet ve bağ değerlendirmesi v1 ile birebir.");
process.exit(fails?1:0);
