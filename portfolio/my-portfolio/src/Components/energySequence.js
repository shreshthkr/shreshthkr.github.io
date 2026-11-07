const clamp = value => Math.max(0, Math.min(1, value));
const smooth = (start, end, value) => { const x = clamp((value-start)/(end-start));return x*x*(3-2*x); };
const blend = (a,b,t) => a.map((value,i)=>value+(b[i]-value)*t);
export function sampleEnergySequence(value) {
  const p=clamp(Number.isFinite(value)?value:0);
  const colors=[[0,[.35,.65,.85]],[.3,[.25,.8,1]],[.5,[.66,.38,1]],[.7,[1,.48,.14]],[.86,[.35,.7,1]],[1,[.25,.45,.7]]];
  let color=colors[0][1];
  for(let i=1;i<colors.length;i++)if(p>=colors[i-1][0] && p<=colors[i][0])color=blend(colors[i-1][1],colors[i][1],smooth(colors[i-1][0],colors[i][0],p));
  const surge=Math.exp(-Math.pow((p-.43)/.065,2))*.85+Math.exp(-Math.pow((p-.69)/.07,2));
  return { progress:p,color,surge:Math.min(1,surge),reveal:smooth(0,.22,p),charge:smooth(.17,.38,p)*(1-smooth(.84,1,p)),zoom:1.16-.13*smooth(0,.5,p)+.06*smooth(.7,1,p),pan:(p-.5)*.055,panels:1-smooth(.02,.28,p),message:smooth(.72,.92,p),phase:p<.22?0:p<.52?1:p<.8?2:3 };
}
