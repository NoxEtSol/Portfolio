const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=$(a.getAttribute('href'));t&&t.scrollIntoView({behavior:'smooth'})}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');
  e.target.querySelectorAll('.cnt').forEach(c=>{if(c.d)return;c.d=1;const n=+c.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1400);c.textContent=Math.round(n*(1-Math.pow(1-k,3)));k<1&&requestAnimationFrame(f)})(t0)})}),{threshold:.2});
$$('.panel').forEach(p=>io.observe(p));

const N=3375,PI=Math.PI,V=f=>{const a=new Float32Array(N*3);for(let i=0;i<N;i++)a.set(f(i,Math.random(),Math.random()),i*3);return a};
const SH=[
 V(i=>{const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*2.39996;return[Math.cos(a)*r*3.3,y*3.3,Math.sin(a)*r*3.3]}),
 V((i,u,v)=>[(u-.5)*15,(v-.5)*8,(Math.random()-.5)*8]),
 V((i,u,v)=>{const a=u*PI*2,b=v*PI*2,R=3+1.1*Math.cos(b);return[R*Math.cos(a),1.1*Math.sin(b),R*Math.sin(a)]}),
 V((i,u,v)=>{const t=(i/N-.5)*2,a=t*16+(i%2)*PI;return[Math.cos(a)*1.7+(v-.5)*.3,t*5.2,Math.sin(a)*1.7+(u-.5)*.3]}),
 V(i=>{const n=15;return[(i%n-7)*.45,(Math.floor(i/n)%n-7)*.45,(Math.floor(i/(n*n))-7)*.45]}),
 V((i,u,v)=>{const r=Math.sqrt(u)*5.2,a=r*1.5+(i%3)*2.094+v*.3;return[Math.cos(a)*r,(Math.random()-.5)*.5,Math.sin(a)*r]}),
 V(i=>{const X=(i%75-37)*.18,Z=(Math.floor(i/75)-22)*.22;return[X,Math.sin(X*1.3+Z)*.7+Math.cos(Z*1.7)*.4-1,Z]})];
const OFF=[3.2,0,-3.2,3.4,-3.4,3.4,0],T3=new Float32Array(N*3),M=520;
let R,S,C,P,pos,rate,cs=0;
try{
  R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
  S=new THREE.Scene();C=new THREE.PerspectiveCamera(55,1,.1,100);C.position.z=10;
  const g=new THREE.BufferGeometry(),col=new Float32Array(N*3),c1=new THREE.Color(0x3d7bff),c2=new THREE.Color(0x9fd4ff),c3=new THREE.Color(0xffb347);
  pos=new Float32Array(SH[1]);rate=new Float32Array(N);
  for(let i=0;i<N;i++){rate[i]=.015+Math.random()*.05;(i%13===0?c3:c1.clone().lerp(c2,Math.random())).toArray(col,i*3)}
  g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
  P=new THREE.Points(g,new THREE.PointsMaterial({size:.06,vertexColors:true,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending}));S.add(P);
}catch(e){R=null}
const setH=()=>$$('.hs').forEach(s=>{s.style.height=((s.querySelector('.track').offsetWidth-innerWidth)/1.6+innerHeight)+'px'});
const fit=()=>{setH();if(!R)return;R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()};
addEventListener('resize',fit);addEventListener('load',fit);document.fonts&&document.fonts.ready.then(fit);fit();

const secs=$$('[data-s]'),panels=$$('.panel'),pins=$$('.pin'),cards=$$('.card'),bar=$('#bar');
let mx=0,my=0,sx=0,sy=0,t0=0,py=0,vel=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=.5-e.clientY/innerHeight});
function tick(t){
  requestAnimationFrame(tick);
  const dt=Math.min(.05,(t-t0)/1000||0);t0=t;const vh=innerHeight;
  const max=document.documentElement.scrollHeight-vh,p=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
  bar.style.transform=`scaleX(${p})`;vel+=((scrollY-py)-vel)*.1;py=scrollY;
  secs.forEach(s=>{const r=s.getBoundingClientRect();if(r.top<vh*.55&&r.bottom>vh*.45)cs=+s.dataset.s});
  panels.forEach(el=>{const m=Math.min(1,Math.max(0,(vh*.5-el.getBoundingClientRect().bottom)/(vh*.5)));
    el.style.opacity=1-m;el.style.filter=m?`blur(${m*14}px)`:'none';el.style.transform=m?`translateY(${-m*36}px)`:'none'});
  pins.forEach(s=>{const r=s.getBoundingClientRect(),st=s.firstElementChild,pr=Math.min(1,Math.max(0,-r.top/(r.height-vh))),m=Math.min(1,Math.max(0,(vh*.5-r.bottom)/(vh*.5)));
    s.style.setProperty('--p',pr);st.style.opacity=1-m;st.style.filter=m?`blur(${m*14}px)`:'none';
    if(s.id==='stack'){const k=st.firstElementChild;k.style.transform=`translate3d(${-pr*(k.offsetWidth-innerWidth)}px,0,0)`}
    else{const c=Math.min(cards.length,Math.floor(pr*(cards.length+1)));cards.forEach((e,i)=>e.classList.toggle('on',i<c))}});
  if(!R)return;
  const asp=innerWidth/innerHeight,w=asp<.8?.15:1,sv=cs===3;let tg=SH[cs];
  if(sv){
    const a=t/3000,ca=Math.cos(a),sa=Math.sin(a),H=SH[3],U=20*Math.tan(27.5*PI/180)/vh;
    for(let i=0;i<N;i++){const x=H[i*3],z=H[i*3+2];T3[i*3]=x*ca-z*sa+3.4*w;T3[i*3+1]=H[i*3+1];T3[i*3+2]=x*sa+z*ca}
    cards.forEach((c,k)=>{if(!c.classList.contains('on'))return;const r=c.getBoundingClientRect(),per=2*(r.width+r.height);
      for(let m=0;m<M;m++){let d=m/M*per,x,y;
        if(d<r.width){x=r.left+d;y=r.top}else if((d-=r.width)<r.height){x=r.right;y=r.top+d}else if((d-=r.height)<r.width){x=r.right-d;y=r.bottom}else{d-=r.width;x=r.left;y=r.bottom-d}
        const j=(k*M+m)*3;T3[j]=(x-innerWidth/2)*U;T3[j+1]=-(y-vh/2)*U;T3[j+2]=0}});
    tg=T3}
  for(let i=0;i<N*3;i++)pos[i]+=(tg[i]-pos[i])*rate[(i/3)|0];
  P.geometry.attributes.position.needsUpdate=true;
  P.position.x+=((sv?0:OFF[cs]*w)-P.position.x)*.05;P.scale.setScalar(P.scale.x+((sv?1:Math.min(1,asp*1.1))-P.scale.x)*.06);
  if(sv){P.rotation.y+=(Math.round(P.rotation.y/(2*PI))*2*PI-P.rotation.y)*.06;P.rotation.x*=.94}
  else{P.rotation.y+=dt*.12+vel*.0006;P.rotation.x=Math.sin(t/5000)*.15+my*.3}
  sx+=((sv?0:mx)-sx)*.05;sy+=((sv?0:my)-sy)*.05;C.position.set(sx*1.2,sy*.8,10);C.lookAt(0,0,0);
  R.render(S,C);
}
requestAnimationFrame(tick);
