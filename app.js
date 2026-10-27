(() => {
"use strict";
const $=id=>document.getElementById(id);
let page=1, lastQuery="";
function endpoint(q,p=1){const u=new URL("https://www.loc.gov/search/");u.searchParams.set("q",q);u.searchParams.set("fo","json");u.searchParams.set("c","12");u.searchParams.set("sp",String(p));return u.toString()}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function imageUrl(item){if(item.image_url)return item.image_url;if(item.image&&typeof item.image==="string")return item.image;if(item.image&&item.image.thumb)return item.image.thumb;return ""}
function render(items,append=false){
 const grid=$("grid"); if(!append)grid.innerHTML="";
 if(!items.length&&!append){grid.innerHTML='<div class="placeholder"><div class="placeholder-mark">∅</div><p>No matching records in this response.<br>Try a broader or different search.</p></div>';return}
 items.forEach(item=>{
  const title=item.title||item.id||"Untitled record";
  const desc=(item.description||item.summary||item.date||"").toString().replace(/<[^>]*>/g," ").slice(0,190);
  const img=imageUrl(item);
  const link=item.url||item.id||"https://www.loc.gov/";
  const type=Array.isArray(item.original_format)?item.original_format.join(", "):(item.original_format||item.format||"COLLECTION ITEM");
  const card=document.createElement("article");card.className="item";
  card.innerHTML=`<div class="item-image">${img?`<img loading="lazy" src="${esc(img)}" alt="" onerror="this.remove();this.parentElement.innerHTML='<span class=&quot;no-image&quot;>✳</span>'">`:'<span class="no-image">✳</span>'}</div><div class="item-body"><span class="item-type">${esc(type).toUpperCase()}</span><h3>${esc(title)}</h3><p>${esc(desc||"Open the original record to explore its description and metadata.")}</p><a href="${esc(link)}" target="_blank" rel="noreferrer">VIEW ORIGINAL RECORD ↗</a></div>`;
  grid.appendChild(card);
 });
}
async function search(next=false){
 const q=$("query").value.trim();if(!q)return;
 if(!next){page=1;lastQuery=q;$("heading").textContent=`Searching “${q}”.`;render([]);$("grid").innerHTML='<div class="placeholder"><div class="placeholder-mark">✳</div><p>Searching the collections…</p></div>'}
 $("status").textContent="FETCHING LIVE DATA…";$("search").disabled=true;
 const url=endpoint(q,page);$("curl").textContent=`curl -L "${url}"`;
 try{
  let res;

try {
  res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  var data = await res.json();
} catch (directError) {
  const proxyUrl =
    "https://api.allorigins.win/raw?url=" +
    encodeURIComponent(url);

  res = await fetch(proxyUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  var data = await res.json();
}
  const items = data.results || [];
  if(!next){$("heading").textContent=`Found in “${q}”.`;render(items)}else render(items,true);
  $("status").textContent=`${Number(data.pagination?.total??items.length).toLocaleString()} RECORDS IN SEARCH`;
  $("more").hidden=!data.pagination?.next; $("more").disabled=!data.pagination?.next;
  $("more").textContent="LOAD MORE RESULTS ↓";
  if(!items.length)$("status").textContent="NO RESULTS IN THIS RESPONSE";
 }catch(err){
  $("status").textContent="REQUEST FAILED";
  if(!next)$("grid").innerHTML=`<div class="placeholder"><div class="placeholder-mark">!</div><p>Could not load results: ${esc(err.message)}.<br>Try again or open the curl request directly.</p></div>`;
  $("more").hidden=true;
 }finally{$("search").disabled=false}
}
$("search").addEventListener("click",()=>search(false));
$("query").addEventListener("keydown",e=>{if(e.key==="Enter")search(false)});
document.querySelectorAll("[data-query]").forEach(b=>b.addEventListener("click",()=>{$("query").value=b.dataset.query;search(false)}));
$("more").addEventListener("click",()=>{page+=1;search(true)});
$("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("curl").textContent);$("copy").textContent="COPIED ✓"}catch{$("copy").textContent="COPY FROM THE COMMAND ABOVE"}});
$("curl").textContent=`curl -L "${endpoint("forgotten city")}"`;
search(false);
})();
