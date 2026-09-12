---
title: "Pi vs oh-my-pi · 开源 Coding Agent 横向对比指南"
date: 2026-09-12 14:25:00
categories:
  - 学习
tags:
  - Pi
  - oh-my-pi
  - Coding Agent
  - AI 编程
  - 开源工具
description: "Pi 与 oh-my-pi（omp）是什么关系？从定位、安装、模型提供商、工具链、hashline 编辑格式、权限沙箱到扩展生态，一次讲清上游 harness 与它的 batteries-included fork 的差异与选择。"
cover: /medias/featureimages/14.jpg
---
<div id="piomp-root">
<style>
#piomp-root{
  --bg: #0c0e13;
  --bg-soft: #14121f;
  --ink: #edebf0;
  --ink-dim: #9691a1;
  --line: #2a2540;
  --violet: #a78bfa;
  --violet-dim: #8b5cf6;
  --rose: #fb7185;
  --emerald: #10b981;
  --blue: #38bdf8;
  --amber: #f59e0b;
  --display: 'Syne', 'Noto Sans SC', sans-serif;
  --mono: 'DM Mono', ui-monospace, Menlo, Consolas, monospace;
  --sans: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
}#piomp-root *{box-sizing:border-box;margin:0;padding:0}#piomp-root#piomp-root{background:var(--bg);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden}#piomp-root{
  background:
    radial-gradient(1000px 500px at 82% 0%, rgba(167,139,250,.09), transparent 60%),
    radial-gradient(800px 600px at 8% 28%, rgba(251,113,133,.05), transparent 50%),
    radial-gradient(600px 400px at 60% 72%, rgba(56,189,248,.04), transparent 50%),
    var(--bg);
  min-height:100vh;position:relative;
}#piomp-root::before{
  content:"";position:fixed;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events:none;z-index:0;
}#piomp-root .wrap{position:relative;z-index:2;max-width:1360px;margin:0 auto;padding:0 40px}#piomp-root .topbar{
  display:flex;align-items:center;justify-content:space-between;
  padding:22px 0;border-bottom:1px solid var(--line);
  font-family:var(--mono);font-size:12px;letter-spacing:.05em;
  color:var(--ink-dim);
}#piomp-root .topbar .logo{
  font-family:var(--display);font-weight:800;font-size:18px;
  color:var(--ink);letter-spacing:.02em;
}#piomp-root .topbar .logo em{color:var(--violet);font-style:normal}#piomp-root .topbar nav{display:flex;gap:30px}#piomp-root .topbar nav a{color:var(--ink-dim);text-decoration:none;transition:color .25s;font-size:13px}#piomp-root .topbar nav a:hover{color:var(--violet)}#piomp-root .topbar .badge{
  font-size:10px;letter-spacing:.15em;text-transform:uppercase;
  padding:4px 10px;border:1px solid var(--violet);color:var(--violet);
  background:rgba(167,139,250,.06);
}#piomp-root .hero{padding:96px 0 64px;position:relative}#piomp-root .hero-eyebrow{
  font-family:var(--mono);font-size:11px;letter-spacing:.35em;text-transform:uppercase;
  color:var(--violet);margin-bottom:24px;
  display:inline-flex;align-items:center;gap:12px;
}#piomp-root .hero-eyebrow::after{content:"";width:60px;height:1px;background:var(--violet);opacity:.4}#piomp-root .hero h1{
  font-family:var(--display);font-weight:800;
  font-size: clamp(44px, 8.5vw, 104px);
  line-height:.92;letter-spacing:-.04em;
  color:var(--ink);
}#piomp-root .hero h1 .grad{
  background:linear-gradient(135deg, var(--violet) 0%, var(--rose) 55%, var(--blue) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}#piomp-root .hero h1 .outline{
  -webkit-text-stroke:1px var(--ink);color:transparent;
}#piomp-root .hero h1 em{font-style:italic;color:var(--violet)}#piomp-root .hero-sub{
  margin-top:28px;max-width:760px;font-size:17px;line-height:1.7;
  color:var(--ink-dim);font-weight:300;
}#piomp-root .hero-sub b{color:var(--ink);font-weight:500}#piomp-root .hero-meta{
  margin-top:40px;display:flex;gap:40px;flex-wrap:wrap;
  font-family:var(--mono);font-size:12px;color:var(--ink-dim);
}#piomp-root .hero-meta span{display:flex;align-items:center;gap:8px}#piomp-root .hero-meta .val{color:var(--ink);font-weight:500}#piomp-root .hero-meta .dot{
  width:5px;height:5px;border-radius:50%;background:var(--emerald);
  box-shadow:0 0 8px var(--emerald);animation:pulse 2s infinite;
}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}#piomp-root .hero-cta{margin-top:48px;display:flex;gap:14px;flex-wrap:wrap}#piomp-root .btn{
  font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;
  padding:14px 24px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;
  border:1px solid var(--line);color:var(--ink);background:transparent;
  transition:all .25s ease;cursor:pointer;
}#piomp-root .btn.prime{
  background:var(--violet);color:#0c0e13;border-color:var(--violet);
  font-weight:600;box-shadow:0 0 32px rgba(167,139,250,.18);
}#piomp-root .btn.prime:hover{background:var(--violet-dim);border-color:var(--violet-dim);box-shadow:0 0 48px rgba(167,139,250,.28)}#piomp-root .btn:hover{border-color:var(--violet);color:var(--violet)}#piomp-root .btn .arr{transition:transform .25s;display:inline-block}#piomp-root .btn:hover .arr{transform:translateX(5px)}#piomp-root .capsule-nav{
  display:flex;gap:8px;overflow-x:auto;padding:16px 0;margin-top:56px;
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  scrollbar-width:none;
}#piomp-root .capsule-nav::-webkit-scrollbar{display:none}#piomp-root .capsule{
  flex-shrink:0;padding:8px 18px;border:1px solid var(--line);border-radius:0;
  font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--ink-dim);
  text-decoration:none;transition:all .25s;background:transparent;white-space:nowrap;
}#piomp-root .capsule:hover#piomp-root .capsule.on{color:var(--violet);border-color:var(--violet);background:rgba(167,139,250,.06)}#piomp-root section{padding:96px 0;position:relative}#piomp-root .sec-head{margin-bottom:56px;position:relative}#piomp-root .sec-num{
  font-family:var(--mono);font-size:10px;letter-spacing:.4em;text-transform:uppercase;
  color:var(--violet);opacity:.6;margin-bottom:8px;
}#piomp-root .sec-title{
  font-family:var(--display);font-weight:700;
  font-size: clamp(30px, 5vw, 54px);
  line-height:1.05;letter-spacing:-.03em;
}#piomp-root .sec-title em{font-style:italic;color:var(--violet)}#piomp-root .sec-sub{
  margin-top:14px;color:var(--ink-dim);font-size:15px;line-height:1.7;max-width:740px;
}#piomp-root .prods{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:20px}#piomp-root .p-card{
  border:1px solid var(--line);padding:38px 32px;
  background:var(--bg-soft);position:relative;overflow:hidden;
  transition:transform .3s,border-color .3s;
}#piomp-root .p-card:hover{transform:translateY(-3px);border-color:var(--violet)}#piomp-root .p-card.omp:hover{border-color:var(--rose)}#piomp-root .p-card .pi{
  font-family:var(--mono);font-size:10px;letter-spacing:.3em;text-transform:uppercase;
  color:var(--ink-dim);margin-bottom:8px;
}#piomp-root .p-card h5{
  font-family:var(--display);font-size:30px;font-weight:700;letter-spacing:-.02em;line-height:1.2;
}#piomp-root .p-card h5 code{
  font-family:var(--mono);font-size:18px;font-weight:600;
  background:rgba(167,139,250,.1);padding:1px 10px;color:var(--violet);
  border:1px solid rgba(167,139,250,.25);
}#piomp-root .p-card.omp h5 code{background:rgba(251,113,133,.1);color:var(--rose);border-color:rgba(251,113,133,.25)}#piomp-root .p-card .tagline{
  margin-top:8px;font-family:var(--mono);font-size:11px;color:var(--blue);
  letter-spacing:.08em;
}#piomp-root .p-card .desc{margin-top:16px;color:var(--ink-dim);font-size:14px;line-height:1.75}#piomp-root .p-card .desc b{color:var(--ink);font-weight:500}#piomp-root .p-card .tags{margin-top:18px;display:flex;flex-wrap:wrap;gap:6px}#piomp-root .p-card .tags .ch{
  font-family:var(--mono);font-size:10px;padding:4px 10px;
  border:1px solid var(--line);color:var(--ink-dim);letter-spacing:.05em;
}#piomp-root .p-card .tags .ch.hot{border-color:var(--violet);color:var(--violet);background:rgba(167,139,250,.06)}#piomp-root .p-card .tags .ch.new{border-color:var(--emerald);color:var(--emerald);background:rgba(16,185,129,.06)}#piomp-root .p-card .tags .ch.rose{border-color:var(--rose);color:var(--rose);background:rgba(251,113,133,.06)}#piomp-root .callout{
  margin-top:24px;padding:20px 24px;border-left:2px solid var(--violet);
  background:rgba(167,139,250,.05);font-size:14px;line-height:1.75;color:var(--ink-dim);
}#piomp-root .callout b{color:var(--ink);font-weight:600}#piomp-root .callout.warn{border-left-color:var(--amber);background:rgba(245,158,11,.05)}#piomp-root .callout.danger{border-left-color:var(--rose);background:rgba(251,113,133,.05)}#piomp-root .callout.blue{border-left-color:var(--blue);background:rgba(56,189,248,.05)}#piomp-root .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}#piomp-root .grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}#piomp-root .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}#piomp-root .card{
  border:1px solid var(--line);padding:32px 26px;
  background:var(--bg-soft);position:relative;overflow:hidden;
  transition:transform .3s,border-color .3s;
}#piomp-root .card:hover{transform:translateY(-4px);border-color:var(--violet)}#piomp-root .card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--line);transition:background .3s}#piomp-root .card:hover::before{background:var(--violet)}#piomp-root .card .tag{
  font-family:var(--mono);font-size:10px;letter-spacing:.25em;text-transform:uppercase;
  color:var(--ink-dim);margin-bottom:12px;
}#piomp-root .card .tag em{color:var(--emerald);font-style:normal}#piomp-root .card h4{font-family:var(--display);font-size:24px;font-weight:700;letter-spacing:-.02em}#piomp-root .card h4 span{color:var(--violet)}#piomp-root .card p{margin-top:12px;color:var(--ink-dim);font-size:14px;line-height:1.7}#piomp-root .card code{font-family:var(--mono);background:var(--bg);padding:2px 8px;color:var(--violet);border:1px solid var(--line);font-size:13px}#piomp-root .card.rose:hover{border-color:var(--rose)}#piomp-root .card.rose:hover::before{background:var(--rose)}#piomp-root .card.rose h4 span{color:var(--rose)}#piomp-root .card.rose code{color:var(--rose)}#piomp-root .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:24px}#piomp-root .stat{border:1px solid var(--line);padding:24px 20px;background:var(--bg-soft)}#piomp-root .stat .v{font-family:var(--display);font-weight:800;font-size:34px;color:var(--violet);letter-spacing:-.02em}#piomp-root .stat.rose .v{color:var(--rose)}#piomp-root .stat .l{margin-top:8px;font-family:var(--mono);font-size:11px;color:var(--ink-dim);letter-spacing:.04em;line-height:1.6}#piomp-root .step-list{border-top:1px solid var(--line)}#piomp-root .step-item{
  display:grid;grid-template-columns:80px 1fr;
  gap:36px;padding:38px 0;border-bottom:1px solid var(--line);
  align-items:start;
}#piomp-root .step-item .sn{
  font-family:var(--display);font-weight:800;font-size:60px;letter-spacing:-.06em;
  line-height:1;color:var(--violet);opacity:.3;
}#piomp-root .step-item .body h5{
  font-family:var(--display);font-size:22px;font-weight:600;letter-spacing:-.02em;
}#piomp-root .step-item .body h5 em{color:var(--violet);font-style:normal}#piomp-root .step-item .body .meta{
  font-family:var(--mono);font-size:12px;color:var(--ink-dim);margin-top:4px;
  letter-spacing:.1em;
}#piomp-root .step-item .body p{margin-top:12px;color:var(--ink-dim);font-size:15px;line-height:1.8}#piomp-root .step-item .body code{
  font-family:var(--mono);background:var(--bg-soft);padding:2px 8px;
  color:var(--violet);border:1px solid var(--line);font-size:13px;
}#piomp-root .code{
  background:rgba(0,0,0,.45);border:1px solid var(--line);
  padding:22px 24px;font-family:var(--mono);font-size:13.5px;line-height:1.85;
  color:var(--ink);overflow-x:auto;margin:16px 0;white-space:pre;
}#piomp-root .code .cm{color:var(--ink-dim)}#piomp-root .code .kw{color:var(--violet)}#piomp-root .code .st{color:var(--emerald)}#piomp-root .code .v{color:var(--amber)}#piomp-root .code .rs{color:var(--rose)}#piomp-root .tbl-wrap{border:1px solid var(--line);overflow-x:auto;margin-top:20px}#piomp-root table{width:100%;border-collapse:collapse;font-size:13.5px;min-width:720px}#piomp-root th#piomp-root td{border-bottom:1px solid var(--line);padding:14px 18px;text-align:left;vertical-align:top}#piomp-root th{
  font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink-dim);background:var(--bg-soft);font-weight:500;
}#piomp-root td:first-child{color:var(--ink);font-weight:500;font-family:var(--mono);font-size:12px;width:180px}#piomp-root tbody tr:hover{background:rgba(167,139,250,.04)}#piomp-root td code{font-family:var(--mono);font-size:12px;background:var(--bg-soft);padding:1px 7px;color:var(--violet);border:1px solid var(--line)}#piomp-root td .om{color:var(--rose)}#piomp-root .faq-list{margin-top:20px}#piomp-root .faq-q{
  border-bottom:1px solid var(--line);padding:26px 0;
  display:grid;grid-template-columns:48px 1fr;gap:20px;
  transition:padding-left .3s;
}#piomp-root .faq-q:hover{padding-left:8px}#piomp-root .faq-q .i{font-family:var(--display);font-weight:700;font-size:14px;color:var(--violet);letter-spacing:.15em}#piomp-root .faq-q .qt{font-family:var(--display);font-size:21px;font-weight:600;letter-spacing:-.01em}#piomp-root .faq-q .a{margin-top:10px;color:var(--ink-dim);font-size:14px;line-height:1.75}#piomp-root .faq-q .a code{font-family:var(--mono);color:var(--violet);background:var(--bg-soft);padding:2px 8px;border:1px solid var(--line);font-size:13px}#piomp-root .faq-q .om .i{color:var(--rose)}#piomp-root footer{border-top:1px solid var(--line);padding:60px 0 32px;margin-top:60px}#piomp-root .fg{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px;margin-bottom:40px}#piomp-root .fb{font-family:var(--display);font-size:48px;font-weight:800;line-height:1;letter-spacing:-.04em}#piomp-root .fb em{font-style:normal;color:var(--violet)}#piomp-root .fb p{margin-top:10px;color:var(--ink-dim);font-size:13px;font-family:var(--mono);line-height:1.7;max-width:300px}#piomp-root .fc h6{font-family:var(--mono);font-size:10px;letter-spacing:.25em;color:var(--blue);text-transform:uppercase;margin-bottom:12px}#piomp-root .fc a{display:block;color:var(--ink-dim);text-decoration:none;padding:5px 0;font-size:14px;transition:color .2s}#piomp-root .fc a:hover{color:var(--violet)}#piomp-root .fbot{
  border-top:1px dashed var(--line);padding-top:20px;
  display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  font-family:var(--mono);font-size:10px;color:var(--ink-dim);letter-spacing:.12em;text-transform:uppercase;
}@media (max-width:1024px){#piomp-root .grid3#piomp-root .grid2#piomp-root .grid4#piomp-root .prods#piomp-root .stats{grid-template-columns:1fr}#piomp-root .step-item{grid-template-columns:1fr;gap:12px}#piomp-root .fg{grid-template-columns:1fr 1fr}}@media (max-width:768px){#piomp-root .wrap{padding:0 20px}#piomp-root .topbar nav{display:none}#piomp-root .hero-meta{gap:16px;flex-direction:column}#piomp-root .fg{grid-template-columns:1fr}}#piomp-root .rv{opacity:0;transform:translateY(20px);transition:opacity .7s ease, transform .7s ease}#piomp-root .rv.on{opacity:1;transform:none}
#piomp-root{width:100%;max-width:100%;min-width:0;overflow:hidden;margin:0 0 8px;border:1px solid var(--line,#2a2540);isolation:isolate;}
#piomp-root .rv{opacity:1!important;transform:none!important;}
#piomp-root .topbar{display:none;}
#piomp-root .wrap{width:100%;max-width:100%;min-width:0;padding:0 22px;}
#piomp-root section{max-width:100%;min-width:0;padding:52px 0;}
#piomp-root .hero{padding:42px 0 40px;}
#piomp-root .hero h1{font-size:clamp(32px,6vw,60px);}
#piomp-root .hero-sub{font-size:15px;}
#piomp-root .capsule-nav{margin-top:32px;max-width:100%;}
#piomp-root footer{padding:44px 0 28px;margin-top:24px;}
#piomp-root .fb{font-size:34px;}
#piomp-root .grid3,#piomp-root .grid2,#piomp-root .grid4,#piomp-root .prods,#piomp-root .stats{min-width:0;}
#piomp-root .card,#piomp-root .p-card,#piomp-root .callout,#piomp-root .step-item .body,#piomp-root .faq-q>div:last-child,#piomp-root .hero-meta span,#piomp-root .fc{min-width:0;}
#piomp-root h1,#piomp-root h2,#piomp-root h4,#piomp-root h5,#piomp-root p,#piomp-root li,#piomp-root td,#piomp-root th{overflow-wrap:break-word;}
#piomp-root code{overflow-wrap:anywhere;}
#piomp-root .code,#piomp-root .tbl-wrap{max-width:100%;width:100%;-webkit-overflow-scrolling:touch;}
@media(max-width:1024px){#piomp-root .grid3,#piomp-root .grid4,#piomp-root .prods,#piomp-root .stats{grid-template-columns:1fr 1fr;}}
@media(max-width:640px){#piomp-root{margin-left:-6px;margin-right:-6px;}#piomp-root .wrap{padding:0 14px;}#piomp-root section{padding:36px 0;}#piomp-root .grid3,#piomp-root .grid2,#piomp-root .grid4,#piomp-root .prods,#piomp-root .stats{grid-template-columns:1fr;}#piomp-root .hero h1{font-size:clamp(26px,8.5vw,38px);}#piomp-root .step-item{grid-template-columns:1fr;gap:10px;}}
</style>
<div class="wrap">
  <!-- ===== TOP BAR ===== -->
  <header class="topbar">
    <div class="logo">Pi<em>·</em>vs<em>·</em>omp</div>
    <nav>
      <a href="#overview">关系</a>
      <a href="#install">安装</a>
      <a href="#providers">模型</a>
      <a href="#tools">能力</a>
      <a href="#harness">编辑格式</a>
      <a href="#security">权限</a>
      <a href="#extend">扩展</a>
      <a href="#compare">对比</a>
      <a href="#community">社区</a>
      <a href="#resources">资源</a>
    </nav>
    <div class="badge">MIT · 上游 vs Fork</div>
  </header>
  <!-- ===== HERO ===== -->
  <section class="hero">
    <div class="hero-eyebrow">AI Coding Agent · Pi / oh-my-pi</div>
    <h1>
      <span class="grad">Pi</span> 与 <span class="outline">oh-my-pi</span><br>
      同一个 <em>内核</em> 的两种活法
    </h1>
    <p class="hero-sub">
      这俩不是竞品，是<b>父子</b>。oh-my-pi（命令 <code style="font-family:var(--mono);background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25);padding:1px 7px;font-size:13px">omp</code>）是 Mario Zechner（<code style="font-family:var(--mono);background:var(--bg-soft);color:var(--violet);border:1px solid var(--line);padding:1px 7px;font-size:13px">badlogic</code>）的 Pi / <b>pi-mono</b> 的一个 fork，被 Can Bölük 重写成"把 IDE 焊进来的"编码专用分支。上游 Pi 走<b>最小化、可自扩展</b>的 harness 路线；omp 走<b>开箱即用、电池全满</b>的 fork 路线。本指南基于两者官方 README 与社区实测，把差异一次讲透。
    </p>
    <div class="hero-meta">
      <span><span class="dot"></span> 协议 <span class="val">均为 MIT</span></span>
      <span>关系 <span class="val">omp = Pi(pi-mono) 的 fork</span></span>
      <span>omp 规模 <span class="val">~80k LoC · Rust</span></span>
      <span>omp 能力 <span class="val">60+ 提供商 · 31 工具</span></span>
    </div>
    <div class="hero-cta">
      <a class="btn prime" href="#overview">开始阅读 <span class="arr">→</span></a>
      <a class="btn" href="#compare">直接看对比表 <span class="arr">↓</span></a>
    </div>
    <div class="capsule-nav">
      <a class="capsule" href="#overview">关系与定位</a>
      <a class="capsule" href="#install">安装</a>
      <a class="capsule" href="#providers">模型与提供商</a>
      <a class="capsule" href="#tools">核心能力</a>
      <a class="capsule" href="#harness">编辑格式之战</a>
      <a class="capsule" href="#security">权限与沙箱</a>
      <a class="capsule" href="#extend">扩展与生态</a>
      <a class="capsule" href="#compare">横向对比</a>
      <a class="capsule" href="#community">社区怎么用</a>
      <a class="capsule" href="#resources">资源 &amp; 速查</a>
    </div>
  </section>
  <!-- ===== CHAPTER 01 · 关系与定位 ===== -->
  <section id="overview">
    <div class="sec-head">
      <div class="sec-num">Chapter 01</div>
      <h2 class="sec-title">先理清 <em>血缘</em>：上游 harness 与它的 fork</h2>
      <p class="sec-sub">
        很多对比文章把两者当成平级竞品，这是最大的误会。读懂"谁 fork 了谁"，才能理解为什么它们的底层工具如此相像、又为何走向不同极端。
      </p>
    </div>
    <div class="prods">
      <div class="p-card rv">
        <div class="pi">上游原版 · earendil-works/pi</div>
        <h5><code>@earendil-works/pi-coding-agent</code></h5>
        <div class="tagline">pi.dev · "this one is yours"</div>
        <div class="desc">
          Pi 是<b> AI agent 工具集（harness）项目的本体</b>：一个"可自扩展的编码 agent"。官方定位为 <b>minimal terminal coding harness</b>——核心保持精简，把扩展能力完全交给你自己组装。它由 Mario Zechner（badlogic）发起，现归属 <code style="background:rgba(167,139,250,.1);color:var(--violet);border:1px solid rgba(167,139,250,.25)">earendil-works/pi</code>。
        </div>
        <div class="tags">
          <span class="ch hot">最小化内核</span>
          <span class="ch hot">可自扩展</span>
          <span class="ch">TypeScript 实现</span>
          <span class="ch">无内置权限系统</span>
        </div>
      </div>
      <div class="p-card omp rv">
        <div class="pi">batteries-included fork · can1357/oh-my-pi</div>
        <h5><code>@oh-my-pi/pi-coding-agent</code></h5>
        <div class="tagline">omp.sh · "A coding agent with the IDE wired in"</div>
        <div class="desc">
          omp 是 Pi / <b>pi-mono</b> 的一个 fork，"被重写成了一个 coding-first 的界面"。它用 <b>~80k 行 Rust</b>（6 个 crate + pi-builtins + 内置 brush-core）把能力焊死：31 个内置工具、60+ 提供商、LSP/DAP、与 Zed 的 IDE 集成。作者 Can Bölük（Stencil Labs）。
        </div>
        <div class="tags">
          <span class="ch rose hot">IDE 焊进来</span>
          <span class="ch rose">电池全满</span>
          <span class="ch rose">Rust 实现</span>
          <span class="ch rose">ACP 权限门控</span>
        </div>
      </div>
    </div>
    <div class="callout rv">
      <b>💡 一句话定位：</b>Pi 是"给你一套精简内核，剩下的你说了算"的<b>上游 harness</b>；oh-my-pi 是"把 IDE、LSP、调试器、记忆、权限全塞好，装上就能写"的<b>fork 成品</b>。两者都 MIT 开源，底层范式同源——所以读懂一个，另一个的大部分概念也通。
    </div>
    <div class="callout warn rv" style="margin-top:16px">
      <b>⚠️ 常见误读：</b>omp 不是 Pi 的"竞品分支"或"套壳"，它的 README 明确写着 <b>"Fork of Pi by Mario Zechner"</b>。源码层面继承 Pi 的 agent 循环与工具 API，再叠加自己的 Rust 实现。把它当"另一个独立项目"去比，会漏掉最关键的那层关系。
    </div>
  </section>
  <!-- ===== CHAPTER 02 · 安装 ===== -->
  <section id="install">
    <div class="sec-head">
      <div class="sec-num">Chapter 02</div>
      <h2 class="sec-title">安装 <em>指南</em></h2>
      <p class="sec-sub">Pi 走 npm + 官方脚本；oh-my-pi 提供 curl / Homebrew / Bun / Nix / Windows PowerShell / mise 六条路径。装完分别得到 <code>pi</code> 与 <code style="background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25)">omp</code> 命令。</p>
    </div>
    <div class="grid2">
      <div class="card rv">
        <div class="tag"><em>✦</em> Pi · 命令 <code>pi</code></div>
        <h4>官方 <span>安装</span></h4>
        <p>Pi 以 npm 全局安装为主，官方脚本同时提供。安装脚本本身不做特殊操作。</p>
        <div class="code"><span class="cm"># 方式一：npm 全局安装（推荐）</span>
npm install -g --ignore-scripts <span class="v">@earendil-works/pi-coding-agent</span>
<span class="cm"># 方式二：官方一键安装脚本（Linux / macOS）</span>
curl -fsSL https://pi.dev/install.sh | sh
<span class="cm"># 卸载</span>
npm uninstall -g @earendil-works/pi-coding-agent</div>
        <div class="callout" style="margin-top:16px">
          <b>⚠️ 注意：</b><code>--ignore-scripts</code> 是安全的——Pi 正常安装本就不需要任何 postinstall 脚本，加上它可避免任何意外执行。
        </div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>✦</em> oh-my-pi · 命令 <code>omp</code></div>
        <h4>官方 <span>安装</span></h4>
        <p>omp 提供六条官方安装路径，覆盖主流平台与包管理器。</p>
        <div class="code"><span class="cm"># 方式一：官方 curl 一键安装（macOS / Linux）</span>
curl -fsSL https://omp.sh/install | sh
<span class="cm"># 方式二：Homebrew（macOS）</span>
brew install can1357/tap/omp
<span class="cm"># 方式三：Bun（推荐，速度快）</span>
bun install -g <span class="v">@oh-my-pi/pi-coding-agent</span>
<span class="cm"># 方式四：Nix</span>
nix-env -iA nixpkgs.omp
<span class="cm"># 方式五：Windows PowerShell</span>
iwr https://omp.sh/install.ps1 -useb | iex
<span class="cm"># 方式六：mise</span>
mise use -g npm:@oh-my-pi/pi-coding-agent</div>
      </div>
    </div>
    <div class="callout rv">
      <b>💡 验证：</b>装完分别跑 <code>pi --version</code> / <code style="background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25)">omp --version</code>。omp 首次启动会<b>自动继承</b>来自 8 种工具目录的 rules / skills / MCP 配置——这是它"开箱即用"的关键一步。
    </div>
  </section>
  <!-- ===== CHAPTER 03 · 模型与提供商 ===== -->
  <section id="providers">
    <div class="sec-head">
      <div class="sec-num">Chapter 03</div>
      <h2 class="sec-title">模型与 <em>提供商</em></h2>
      <p class="sec-sub">两者都"模型无关"，但路线不同：Pi 用统一的 <code>pi-ai</code> 多提供商 API 当抽象层；omp 则直接塞进 60+ 提供商 + 10 种角色路由 + 可自定义 fallback 链。</p>
    </div>
    <div class="grid2">
      <div class="card rv">
        <div class="tag"><em>✦</em> Pi · pi-ai 统一 API</div>
        <h4>一层 <span>抽象</span></h4>
        <p>Pi 的 <code>pi-ai</code> 包是一个<b>统一的多提供商 LLM API</b>，把 OpenAI / Anthropic / Google 等不同厂商的差异收成一套接口。写 agent 时你只面对 <code>pi-ai</code>，换模型不换代码。</p>
        <div class="code"><span class="cm"># Pi 包结构（来自官方仓库）</span>
pi-coding-agent   <span class="cm"># 交互式 CLI</span>
pi-agent-core     <span class="cm"># 运行时 + 工具调用</span>
pi-ai             <span class="cm"># 统一多提供商 LLM API</span>
pi-tui            <span class="cm"># 终端界面</span>
pi-telemetry      <span class="cm"># 遥测</span>
pi-chat           <span class="cm"># Slack 接入（earendil-works/pi-chat）</span></div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>✦</em> oh-my-pi · 60+ 提供商 + 角色路由</div>
        <h4>路由 <span>矩阵</span></h4>
        <p>omp 内置 <b>60+ 提供商</b>，并把模型切成 <b>10 种角色</b>：<code style="background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25)">default / smol / slow / plan / commit / vision / designer / task / advisor / tiny</code>。支持 auth 标签（oauth / plan / local）、fallback 链、路径级模型、轮询凭证。</p>
        <div class="code"><span class="cm"># 自定义 OpenAI 兼容提供商</span>
<span class="cm"># ~/.omp/agent/models.yml</span>
- name: my-local
  base_url: http://localhost:11434/v1
  api_key: ollama
  roles: [default, smol]</div>
      </div>
    </div>
    <div class="callout blue rv">
      <b>🧭 怎么选：</b>只想"接个 Claude / GPT / Gemini 就写"——两者都行，omp 的 60+ 提供商列表更长、角色路由更细。想<b>在多个模型间做统一抽象、自己控制运行时</b>——Pi 的 <code>pi-ai</code> + <code>pi-agent-core</code> 更干净，适合嵌入你自己的产品。
    </div>
  </section>
  <!-- ===== CHAPTER 04 · 核心能力 ===== -->
  <section id="tools">
    <div class="sec-head">
      <div class="sec-num">Chapter 04</div>
      <h2 class="sec-title">核心 <em>能力</em> 之差</h2>
      <p class="sec-sub">同源的"四个最小工具"只是起点。真正的差距在：omp 把 31 个内置工具、LSP、DAP 调试器、记忆、GitHub-as-filesystem 全焊进来了；Pi 则把工具台空着，等你接。</p>
    </div>
    <div class="grid3">
      <div class="card rv">
        <div class="tag"><em>①</em> 同源基座</div>
        <h4>四个 <span>原语</span></h4>
        <p>都从 read / write / edit / bash 起步——这是 Pi agent 循环的基本工具集，omp 继承并扩展它。</p>
        <code>read · write · edit · bash</code>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>②</em> 31 内置工具</div>
        <h4>工具 <span>全家桶</span></h4>
        <p>omp 内置 <b>31 个工具</b>：含 23 后端 web_search、原生进程内工具（无 fork/exec）、GitHub-as-filesystem、浏览器 / Slack / 桌面集成等，几乎覆盖日常编码全场景。</p>
        <code>web_search · gh_fs · browser · slack</code>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>③</em> LSP + DAP</div>
        <h4>语言 <span>服务</span></h4>
        <p>omp 支持 <b>14 个 LSP 操作</b>（每次写文件都跑 LSP 诊断）与 <b>28 个 DAP 操作</b>（内置调试器）。Pi 的 TUI 路线则不包含这一层。</p>
        <code>LSP ×14 · DAP ×28</code>
      </div>
    </div>
    <div class="grid2" style="margin-top:20px">
      <div class="card rv">
        <div class="tag"><em>✦</em> Pi · 你接工具</div>
        <h4>空台 <span>待扩展</span></h4>
        <p>Pi 把运行时（<code>pi-agent-core</code>）和工具调用机制给你，但<b>不预装一堆工具</b>。它假设你会在自己的扩展里注册所需能力——这是"minimal / self-extensible"的代价，也是自由。</p>
        <div class="code"><span class="cm"># Pi 的入口</span>
pi            <span class="cm"># 交互式 TUI / CLI</span>
<span class="cm"># 运行时在 pi-agent-core，</span>
<span class="cm"># 扩展里注册你自己的工具</span></div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>✦</em> oh-my-pi · IDE 焊进来</div>
        <h4>IDE <span>wired in</span></h4>
        <p>omp 的招牌是<b>"the IDE wired in"</b>：通过 ACP 协议与 Zed 等编辑器直连，每次编辑实时喂 LSP 诊断；另有 subagents、advisor 模型、/collab、TTSR、AST 编辑、原子提交、冲突解决等 21 根功能支柱。</p>
        <div class="code"><span class="cm"># omp 的四种入口</span>
omp              <span class="cm"># 交互式 TUI</span>
omp -p <span class="st">"任务"</span>    <span class="cm"># 一次性（one-shot）</span>
<span class="cm"># RPC（NDJSON over stdio）</span>
<span class="cm"># ACP（JSON-RPC，给编辑器用）</span></div>
      </div>
    </div>
    <div class="callout rv">
      <b>💡 一句话：</b>Pi = "工具台给你，钳子你自己带"；omp = "台钳、电钻、示波器、显微镜全焊好了"。前者轻、自由；后者重、上手即战。
    </div>
  </section>
  <!-- ===== CHAPTER 05 · 编辑格式之战 ===== -->
  <section id="harness">
    <div class="sec-head">
      <div class="sec-num">Chapter 05</div>
      <h2 class="sec-title">编辑格式 <em>之战</em>：harness 才是瓶颈</h2>
      <p class="sec-sub">为什么社区（尤其 omp 作者 Can Bölük）这么在意"怎么改文件"？因为实测显示：<b>换个编辑格式，16 个模型的编码通过率平均 +15 分，弱模型直接翻 10 倍</b>——而训练成本为零。这正是 omp 把 <code style="background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25)">hashline</code> 编辑格式焊进来的原因。</p>
    </div>
    <div class="callout blue rv">
      <b>📌 社区实测（Stencil 博客《The Harness Problem》，2026-02）：</b>大家总在比"哪个模型编码最强"，但作者用同一套基准测了 <b>16 个模型 × 3 种编辑格式</b>（patch / replace / hashline，各 3 轮 × 180 任务，每轮全新会话）。结论：<b>patch 对几乎所有模型都是最差的格式</b>，而 omp 的 hashline 给最弱的模型提升最大。
    </div>
    <div class="stats">
      <div class="stat"><div class="v">+15<span style="font-size:18px">pts</span></div><div class="l">相对 patch 的平均提升<br>（16 个模型）</div></div>
      <div class="stat rose"><div class="v">10×</div><div class="l">Grok Code Fast 1<br>6.7% → 68.3%</div></div>
      <div class="stat rose"><div class="v">−61%</div><div class="l">最佳情况下输出 token<br>（少烧重试 token）</div></div>
      <div class="stat"><div class="v">$0</div><div class="l">训练算力成本<br>（只改了 harness）</div></div>
    </div>
    <div class="grid2" style="margin-top:20px">
      <div class="card rv">
        <div class="tag"><em>✦</em> 行业现状</div>
        <h4>各家 <span>各搞一套</span></h4>
        <p>Codex 用 <code>apply_patch</code>（非 GPT 模型 patch 失败率飙升：Grok 4 达 50.7%、GLM-4.7 达 46.2%）；Claude Code 用 <code>str_replace</code>（"String to replace not found" 是常年头号报错）；Cursor 甚至专门微调了个 70B 模型做 instant-apply。Aider 自己的基准里，光格式选择就让 GPT-4 Turbo 从 26% 跳到 59%。</p>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>✦</em> omp 的 hashline</div>
        <h4>内容 <span>哈希锚</span></h4>
        <p>omp 让模型读到的每一行都带一个 <b>2–3 字符内容哈希</b>。模型编辑时引用哈希标签（"替换第 2:f1 行""替换 1:a3 到 3:0e"），不用复述原文与空格。文件变了哈希就对不上，编辑在破坏发生前被拒。</p>
        <div class="code"><span class="cm"># 读回的文件，每行带哈希锚</span>
<span class="v">1:a3</span>|function hello() {
<span class="v">2:f1</span>|  return "world";
<span class="v">3:0e</span>|}</div>
      </div>
    </div>
    <div class="callout danger rv" style="margin-top:16px">
      <b>⚠️ 为什么这事关乎"选哪个"：</b>作者用这个基准公开演示后，Google 直接封了他的 Gemini 账号、Anthropic 也曾封过 OpenCode 对 Claude 的访问——厂商"别造 harness，用我的"的态度，恰恰说明<b>开放 harness 的价值</b>：开源 harness 会为所有模型一起优化（贡献者用不同模型，修自己遇到的坑），而闭源厂商不会为竞争对手的模型调优。omp 把 hashline 焊进来，就是这条哲学的产物。
    </div>
  </section>
  <!-- ===== CHAPTER 06 · 权限与沙箱 ===== -->
  <section id="security">
    <div class="sec-head">
      <div class="sec-num">Chapter 06</div>
      <h2 class="sec-title">权限与 <em>沙箱</em>：诚实的差异</h2>
      <p class="sec-sub">这是两者最容易被误写的一点。Pi 明确<b>没有内置权限系统</b>，以启动者的用户权限运行；omp 则有 ACP 权限门控。想隔离，Pi 得自己套沙箱。</p>
    </div>
    <div class="grid2">
      <div class="card rv">
        <div class="tag"><em>✦</em> Pi · 无内置权限系统</div>
        <h4>你给 <span>权限</span></h4>
        <p>Pi 官方明说：<b>"does not include a built-in permission system"</b>——它"以启动它的用户与进程的权限运行"。也就是说，它在你本机上有多大权，它就多大权。</p>
        <div class="code"><span class="cm"># 三种官方推荐的沙箱模式</span>
<span class="cm">1) Gondolin 扩展 — 微虚拟机（micro-VM）</span>
<span class="cm">2) Plain Docker    — 普通容器</span>
<span class="cm">3) OpenShell       — 远程 shell 沙箱</span>
<span class="cm"># Pi 还做了供应链加固：</span>
<span class="cm"># 依赖精确 pin、.npmrc save-exact=true、</span>
<span class="cm"># lockfile 为唯一真相、CLI 发布 npm-shrinkwrap</span></div>
        <div class="callout warn" style="margin-top:16px">
          <b>⚠️ 安全提醒：</b>直接裸跑 Pi = 把你的文件系统/网络/命令权限全交给模型。要隔离，请务必套上面三种沙箱之一，别在敏感目录裸用。
        </div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>✦</em> oh-my-pi · ACP 权限门控</div>
        <h4>门控 <span>内置</span></h4>
        <p>omp 在 21 根功能支柱里明确包含 <b>ACP permission gating</b>——通过 ACP 协议对工具调用做权限门控。相比 Pi 的"全权运行 + 自套沙箱"，omp 在 harness 层就给了你一道闸。</p>
        <div class="code"><span class="cm"># omp 的权限是 harness 内建的</span>
<span class="cm"># 21 功能支柱之一：ACP permission gating</span>
<span class="cm"># 工具调用经 ACP 协议门控，</span>
<span class="cm"># 编辑器侧（Zed 等）可拦截/确认</span></div>
        <div class="callout" style="margin-top:16px">
          <b>💡 提示：</b>即使有门控，给 agent 写权限前仍建议限定工作目录。omp 的 Rust 实现还带来原生进程内工具（无 fork/exec 开销），更安全也更省资源。
        </div>
      </div>
    </div>
    <div class="callout rv">
      <b>🧭 怎么选：</b>要"最小信任面 + 完全可控"——Pi + Docker/Gondolin 沙箱，透明但需你自己配。要"装上就有基本门控、省心"——omp 的 ACP 权限更顺手。无论哪个，<b>给编码 agent 写权限前务必想清楚边界</b>。
    </div>
  </section>
  <!-- ===== CHAPTER 07 · 扩展与生态 ===== -->
  <section id="extend">
    <div class="sec-head">
      <div class="sec-num">Chapter 07</div>
      <h2 class="sec-title">扩展与 <em>生态</em></h2>
      <p class="sec-sub">同源的工具 API 让两者都能被扩展。Pi 的卖点是"你自己造扩展"；omp 的卖点是"首次运行就继承 8 种工具的配置 + 同样的 TS 模块扩展"。</p>
    </div>
    <div class="grid2">
      <div class="card rv">
        <div class="tag"><em>✦</em> Pi · 自扩展 harness</div>
        <h4>你造 <span>能力</span></h4>
        <p>Pi 通过 <b>TypeScript 扩展、Agent Skills、提示模板、主题、MCP</b> 实现高度可定制。运行时在 <code>pi-agent-core</code>，扩展里注册自定义工具与生命周期钩子。适合想把 agent 焊进自己产品的团队。</p>
        <div class="code"><span class="cm"># Pi 官方包（可独立使用）</span>
@earendil-works/pi-coding-agent
pi-agent-core      <span class="cm"># 嵌入你自己的运行时</span>
pi-ai              <span class="cm"># 统一模型 API</span>
pi-tui / pi-telemetry</div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>✦</em> oh-my-pi · 继承 + TS 模块</div>
        <h4>拿来 <span>即用</span></h4>
        <p>omp 支持 <b>TypeScript 模块扩展</b>，复用同一套工具 API；首次运行会自动从 <b>8 种工具目录</b>继承 rules / skills / MCP 配置。SDK <code style="background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25)">@oh-my-pi/pi-coding-agent</code> 导出 <code style="background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25)">ModelRegistry / SessionManager / createAgentSession / discoverAuthStorage</code>。</p>
        <div class="code"><span class="kw">import</span> {
  ModelRegistry, SessionManager,
  createAgentSession, discoverAuthStorage
} from <span class="st">'@oh-my-pi/pi-coding-agent'</span>;</div>
      </div>
    </div>
    <div class="callout rv">
      <b>💡 记忆（memory）：</b>omp 还内置"curated memory"——retain / learn / recall 三段式记忆，让 agent 跨会话记住项目约定。Pi 的记忆更多靠你自己用 skills / 扩展实现。
    </div>
  </section>
  <!-- ===== CHAPTER 08 · 横向对比 ===== -->
  <section id="compare">
    <div class="sec-head">
      <div class="sec-num">Chapter 08</div>
      <h2 class="sec-title">横向 <em>对比表</em></h2>
      <p class="sec-sub">同一套内核下的两条路线——固定维度，逐项对照。</p>
    </div>
    <div class="tbl-wrap rv">
      <table>
        <thead>
          <tr>
            <th>维度</th>
            <th>Pi · earendil-works/pi</th>
            <th>oh-my-pi · can1357/oh-my-pi</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>关系</td><td>上游原版（pi-mono by Mario Zechner）</td><td class="om">Pi 的 fork，重写为 coding-first</td></tr>
          <tr><td>实现语言</td><td>TypeScript</td><td class="om">~80k LoC Rust（6 crate + builtins + brush-core）</td></tr>
          <tr><td>安装</td><td>npm + 官方脚本</td><td class="om">curl / Homebrew / Bun / Nix / Win-PS / mise</td></tr>
          <tr><td>命令</td><td><code>pi</code></td><td class="om"><code>omp</code></td></tr>
          <tr><td>模型/提供商</td><td><code>pi-ai</code> 统一多提供商 API（OpenAI/Anthropic/Google…）</td><td class="om">60+ 提供商 + 10 角色路由 + 自定义 fallback</td></tr>
          <tr><td>核心工具</td><td>read/write/edit/bash + 自注册扩展</td><td class="om">31 内置工具 + 14 LSP + 28 DAP</td></tr>
          <tr><td>IDE 集成</td><td>TUI 终端（无内建编辑器联动）</td><td class="om">"IDE wired in" via ACP/Zed，每写即 LSP</td></tr>
          <tr><td>编辑格式</td><td>标准 edit</td><td class="om">hashline（内容哈希行锚）</td></tr>
          <tr><td>权限/沙箱</td><td>无内置权限系统；需自套 Gondolin/Docker/OpenShell</td><td class="om">ACP permission gating（harness 内建门控）</td></tr>
          <tr><td>记忆</td><td>靠 skills / 扩展自建</td><td class="om">curated memory（retain/learn/recall）</td></tr>
          <tr><td>入口/模式</td><td>交互式 TUI / CLI</td><td class="om">TUI / one-shot <code>omp -p</code> / RPC(NDJSON) / ACP(JSON-RPC)</td></tr>
          <tr><td>SDK</td><td>pi-agent-core 运行时可嵌入</td><td class="om">@oh-my-pi/pi-coding-agent（ModelRegistry/SessionManager/createAgentSession/discoverAuthStorage）</td></tr>
          <tr><td>扩展</td><td>TS 扩展 / Skills / 提示模板 / 主题 / MCP</td><td class="om">TS 模块扩展 + 继承 8 种工具配置</td></tr>
          <tr><td>供应链</td><td>精确 pin 依赖、save-exact、shrinkwrap</td><td class="om">Rust 原生实现，进程内工具无 fork/exec</td></tr>
          <tr><td>协议</td><td>MIT</td><td class="om">MIT（© Mario Zechner, Can Bölük, Stencil Labs）</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <!-- ===== CHAPTER 09 · 社区怎么用 ===== -->
  <section id="community">
    <div class="sec-head">
      <div class="sec-num">Chapter 09</div>
      <h2 class="sec-title">社区 <em>怎么用</em> 它俩</h2>
      <p class="sec-sub">光看 README 不够——去网上逛了一圈，看看真实用户与作者怎么用。两者都走"开放、可分享"的路线，但落点不同。</p>
    </div>
    <div class="grid2">
      <div class="card rv">
        <div class="tag"><em>↗</em> Pi 社区</div>
        <h4>共享 <span>会话</span></h4>
        <p>Pi 把开源会话做成了一个数据集：用 <code>badlogic/pi-share-hf</code> 收集、审阅、上传<b>已脱敏</b>的 Pi 会话文件到 Hugging Face，沉淀为数据集 <code style="background:rgba(167,139,250,.1);color:var(--violet);border:1px solid rgba(167,139,250,.25)">badlogicgames/pi-mono</code>。想接 Slack，有独立的 <code style="background:rgba(167,139,250,.1);color:var(--violet);border:1px solid rgba(167,139,250,.25)">earendil-works/pi-chat</code>。</p>
        <div class="code"><span class="cm"># Pi 的"开放数据"玩法</span>
<span class="cm"># 1) 本地收集脱敏会话</span>
<span class="cm"># 2) 上传到 HF 数据集 badlogicgames/pi-mono</span>
<span class="cm"># 3) 社区可复用真实编码会话做研究/微调</span></div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>↗</em> oh-my-pi 社区</div>
        <h4>harness <span>实测</span></h4>
        <p>omp 作者把"开放 harness 比模型更重要"做成了公开实验：同一基准测 16 模型 × 3 编辑格式，证明 hashline 把弱模型翻 10 倍（基准代码就在 omp 仓库 <code style="background:rgba(251,113,133,.1);color:var(--rose);border:1px solid rgba(251,113,133,.25)">packages/react-edit-benchmark</code>）。社区围绕"IDE 集成 + 多模型路由"活跃使用。</p>
        <div class="code"><span class="cm"># omp 的"开放 harness"主张</span>
<span class="cm"># 开源 harness 为所有模型一起优化，</span>
<span class="cm"># 因为贡献者用不同模型、修自己遇到的坑。</span>
<span class="cm"># 闭源厂商不会为对手模型调优。</span></div>
      </div>
    </div>
    <div class="callout warn rv">
      <b>⚠️ 一个真实教训：</b>那位作者公开基准后，Google 直接禁了他的 Gemini 账号、Anthropic 也曾封过 OpenCode 对 Claude 的访问。这反证了"开放编码 harness"的价值——也提醒你：<b>把编码 agent 绑死在某一家模型订阅上，是有风险的</b>。两者都"模型无关"，本身就是对这种锁定的对冲。
    </div>
  </section>
  <!-- ===== CHAPTER 10 · 资源 & 速查 ===== -->
  <section id="resources">
    <div class="sec-head">
      <div class="sec-num">Chapter 10</div>
      <h2 class="sec-title">资源 &amp; <em>速查</em></h2>
      <p class="sec-sub">官方仓库与文档链接，外加两款工具的高频命令速查。所有事实均来自这些公开来源。</p>
    </div>
    <div class="grid2">
      <div class="card rv">
        <div class="tag"><em>🔗</em> Pi 资源</div>
        <h4>链接 <span>合集</span></h4>
        <div class="faq-list" style="margin-top:8px">
          <div class="faq-q" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://github.com/earendil-works/pi" target="_blank" style="color:var(--ink);text-decoration:none">Pi GitHub 仓库</a></div></div></div>
          <div class="faq-q" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://pi.dev" target="_blank" style="color:var(--ink);text-decoration:none">pi.dev 官网</a></div></div></div>
          <div class="faq-q" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://github.com/badlogic/pi-share-hf" target="_blank" style="color:var(--ink);text-decoration:none">pi-share-hf（HF 会话上传）</a></div></div></div>
          <div class="faq-q" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://huggingface.co/datasets/badlogicgames/pi-mono" target="_blank" style="color:var(--ink);text-decoration:none">HF 数据集 badlogicgames/pi-mono</a></div></div></div>
          <div class="faq-q" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://www.npmjs.com/package/@earendil-works/pi-coding-agent" target="_blank" style="color:var(--ink);text-decoration:none">Pi npm 页面</a></div></div></div>
        </div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>🔗</em> oh-my-pi 资源</div>
        <h4>链接 <span>合集</span></h4>
        <div class="faq-list" style="margin-top:8px">
          <div class="faq-q om" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://github.com/can1357/oh-my-pi" target="_blank" style="color:var(--ink);text-decoration:none">oh-my-pi GitHub 仓库</a></div></div></div>
          <div class="faq-q om" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://github.com/can1357/oh-my-pi/blob/main/README.md" target="_blank" style="color:var(--ink);text-decoration:none">oh-my-pi README（21 功能支柱）</a></div></div></div>
          <div class="faq-q om" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://blog.can.ac/2026/02/12/the-harness-problem/" target="_blank" style="color:var(--ink);text-decoration:none">The Harness Problem（编辑格式实测）</a></div></div></div>
          <div class="faq-q om" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://github.com/can1357/oh-my-pi/tree/main/packages/react-edit-benchmark" target="_blank" style="color:var(--ink);text-decoration:none">react-edit-benchmark（基准代码）</a></div></div></div>
          <div class="faq-q om" style="border:0;padding:8px 0"><div class="i">↗</div><div><div class="qt" style="font-size:15px"><a href="https://www.npmjs.com/package/@oh-my-pi/pi-coding-agent" target="_blank" style="color:var(--ink);text-decoration:none">omp npm 页面</a></div></div></div>
        </div>
      </div>
    </div>
    <div class="grid2" id="quickref" style="margin-top:48px">
      <div class="card rv">
        <div class="tag"><em>⚡</em> Pi 速查</div>
        <h4>高频 <span>命令</span></h4>
        <div class="code"><span class="cm"># 安装</span>
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
curl -fsSL https://pi.dev/install.sh | sh
<span class="cm"># 启动（交互式 TUI / CLI）</span>
pi
<span class="cm"># 运行时不透出时的隔离（推荐）</span>
<span class="cm"># 套 Gondolin / Docker / OpenShell 之一</span>
<span class="cm"># 嵌入你自己的产品</span>
<span class="kw">import</span> { pi-agent-core } <span class="cm"># 运行时</span></div>
      </div>
      <div class="card rose rv">
        <div class="tag"><em>⚡</em> oh-my-pi 速查</div>
        <h4>高频 <span>命令</span></h4>
        <div class="code"><span class="cm"># 安装</span>
curl -fsSL https://omp.sh/install | sh
brew install can1357/tap/omp
bun install -g @oh-my-pi/pi-coding-agent
npm install -g @oh-my-pi/pi-coding-agent
<span class="cm"># 启动</span>
omp                 <span class="cm"># 交互式 TUI</span>
omp -p <span class="st">"任务"</span>       <span class="cm"># 一次性（one-shot）</span>
<span class="cm"># 自定义提供商：~/.omp/agent/models.yml</span></div>
      </div>
    </div>
  </section>
  <!-- ===== 结语 · 选哪个 ===== -->
  <section>
    <div class="sec-head">
      <div class="sec-num">Epilogue</div>
      <h2 class="sec-title">该 <em>选哪个</em>？</h2>
      <p class="sec-sub">同源于 Pi、都 MIT、都模型无关。区别只在"你想要的这份能力，是自己焊还是已经焊好"。</p>
    </div>
    <div class="grid2">
      <div class="p-card rv">
        <div class="pi">推荐 · 想完全掌控的团队</div>
        <h5><code>选 Pi</code></h5>
        <div class="desc">
          <ul style="list-style:none;font-family:var(--mono);font-size:13px;line-height:2;color:var(--ink-dim)">
            <li><span style="color:var(--violet)">→</span> 想要最小内核、自己组装扩展/skills/MCP</li>
            <li><span style="color:var(--violet)">→</span> 要把 agent 运行时嵌入自有产品（pi-agent-core）</li>
            <li><span style="color:var(--violet)">→</span> 想用统一 pi-ai 抽象层在多模型间切换</li>
            <li><span style="color:var(--violet)">→</span> 愿意自己配 Docker/Gondolin 沙箱控信任面</li>
            <li><span style="color:var(--violet)">→</span> 想参与开源会话数据集（pi-mono on HF）</li>
          </ul>
        </div>
      </div>
      <div class="p-card omp rv">
        <div class="pi">推荐 · 想装上就写的人</div>
        <h5><code>选 oh-my-pi</code></h5>
        <div class="desc">
          <ul style="list-style:none;font-family:var(--mono);font-size:13px;line-height:2;color:var(--ink-dim)">
            <li><span style="color:var(--rose)">→</span> 想要 IDE 焊进来（Zed/ACP）、每写即 LSP</li>
            <li><span style="color:var(--rose)">→</span> 要 31 内置工具 + 调试器 + 记忆，免配置</li>
            <li><span style="color:var(--rose)">→</span> 用 60+ 提供商 + 角色路由做多模型编排</li>
            <li><span style="color:var(--rose)">→</span> 看重 hashline 编辑格式带来的弱模型增益</li>
            <li><span style="color:var(--rose)">→</span> 想要 harness 内建的 ACP 权限门控</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="callout rv" style="margin-top:24px">
      <b>🧭 最后一句：</b>别把它们当"二选一"。它们同源——先 <code>omp</code> 装上体验"满血 IDE agent"，再 <code>pi</code> 拿最小内核练手自己的扩展；理解了 fork 关系，你手里其实是一套可深可浅的同一范式。
    </div>
  </section>
  <!-- ===== FOOTER ===== -->
  <footer>
    <div class="fg">
      <div class="fb">Pi<em>·</em>vs<em>·</em>omp<br><p>开源 Coding Agent 横向对比 · 事实均来自官方 README 与公开社区实测</p></div>
      <div class="fc">
        <h6>Pi</h6>
        <a href="https://github.com/earendil-works/pi" target="_blank">GitHub 仓库</a>
        <a href="https://pi.dev" target="_blank">官网 pi.dev</a>
        <a href="https://huggingface.co/datasets/badlogicgames/pi-mono" target="_blank">HF 会话数据集</a>
      </div>
      <div class="fc">
        <h6>oh-my-pi</h6>
        <a href="https://github.com/can1357/oh-my-pi" target="_blank">GitHub 仓库</a>
        <a href="https://blog.can.ac/2026/02/12/the-harness-problem/" target="_blank">Harness 实测博客</a>
        <a href="https://www.npmjs.com/package/@oh-my-pi/pi-coding-agent" target="_blank">npm 页面</a>
      </div>
    </div>
    <div class="fbot">
      <span>文档基于公开网络资料整理 · 2026</span>
      <span>如有错误或补充，欢迎提交 Issue / PR</span>
    </div>
  </footer>
</div>
</div>
