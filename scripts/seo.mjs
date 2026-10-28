import {readFile,writeFile} from 'node:fs/promises';
const {url}=JSON.parse(await readFile(new URL('../site.config.json',import.meta.url)));
const origin=new URL(url).origin;
if (!url.startsWith('https://')) throw new Error('Configure uma URL oficial HTTPS');
for (const [file,path] of [['index.html','/'],['privacidade.html','/privacidade.html']]) {
 let html=await readFile(file,'utf8');
 html=html.replace(/\n?\s*<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->/,'');
 html=html.replace(/content="(?:og-image.svg|https:[^"]+\/og-image.png)"/g,`content="${origin}/og-image.png"`);
 const meta=`\n    <!-- SEO:start -->\n    <link rel="canonical" href="${origin}${path}">\n    <meta property="og:url" content="${origin}${path}">\n    <meta property="og:image:alt" content="Táxi Aeroporto Ricardo — viagens com agendamento">\n    <meta property="og:image:width" content="1200">\n    <meta property="og:image:height" content="630">\n    <!-- SEO:end -->\n`;
 html=html.replace('</head>',meta+'  </head>');
 if(file==='index.html') html=html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,(_,a,j,z)=>a+'\n'+JSON.stringify({...JSON.parse(j),url:origin+'/',areaServed:{'@type':'City',name:'São José do Rio Preto'}},null,2)+'\n'+z);
 await writeFile(file,html.replace(/^[ \t]+$/gm,''));
}
await writeFile('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url><url><loc>${origin}/privacidade.html</loc></url></urlset>\n`);
