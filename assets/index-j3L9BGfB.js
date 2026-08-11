(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const p="https://play.google.com/store/apps/details?id=com.bodeum.chinesestudyhelper&utm_source=picchina_web&utm_medium=owned&utm_campaign=ko_school_launch",t={dictionary:[],samples:[],items:[],activeView:"edit",rawText:"",studyIndex:0,quizIndex:0,quizShowAnswer:!1,quizCorrect:0,quizWrong:0,isAutoPlaying:!1,generatedText:""},f=document.querySelector("#app");function w(e){const a=`picchina.growth.${e}`,s=Number.parseInt(localStorage.getItem(a)||"0",10)+1;localStorage.setItem(a,String(s)),console.info(`[PicChinaGrowth] event=${e} count=${s}`)}const k=e=>/[\u3400-\u9fff\uf900-\ufaff]/u.test(e),$=e=>e.replace(/[，。！？、；：]/g,`
`).replace(/[^\u3400-\u9fff\uf900-\ufaffA-Za-z0-9\s]/gu," ").replace(/\s+/g," ").trim();function x(e){return e.split(/[\n,.;|/]+/g).map($).flatMap(a=>a.split(/\s{2,}/g)).map(a=>a.trim()).filter(a=>a.length>0&&k(a))}function S(e){return t.dictionary.find(a=>a.chinese===e)||{}}function q(e,a){const s=S(e);return{id:crypto.randomUUID(),orderIndex:a,chinese:e,pinyin:s.pinyin||"",korean:s.korean||""}}async function I(){const[e,a]=await Promise.all([fetch("/picchina-web/dictionary_seed.json").then(s=>s.json()),fetch("/picchina-web/sample_worksheets/index.json").then(s=>s.json())]);t.dictionary=e,t.samples=a,g(),i()}function g(){t.items=t.dictionary.slice(0,12).map((e,a)=>({id:crypto.randomUUID(),orderIndex:a,chinese:e.chinese,pinyin:e.pinyin,korean:e.korean})),t.studyIndex=0,t.quizIndex=0,t.quizShowAnswer=!1,t.quizCorrect=0,t.quizWrong=0}function z(){const e=[...new Set(x(t.rawText))];t.items=e.map(q),t.studyIndex=0,t.quizIndex=0,t.quizShowAnswer=!1,t.activeView="edit"}function A(e,a,s){t.items=t.items.map(o=>o.id===e?{...o,[a]:s}:o)}function L(e){t.items=t.items.filter(a=>a.id!==e).map((a,s)=>({...a,orderIndex:s})),t.studyIndex=Math.min(t.studyIndex,Math.max(0,t.items.length-1)),t.quizIndex=Math.min(t.quizIndex,Math.max(0,t.items.length-1))}function T(){t.items=[...t.items,{id:crypto.randomUUID(),orderIndex:t.items.length,chinese:"",pinyin:"",korean:""}]}function P(e){t.activeView=e,i()}function v(e){return new Promise(a=>setTimeout(a,e))}function l(e,a,s=1){return new Promise(o=>{if(!e||!("speechSynthesis"in window)){o();return}window.speechSynthesis.cancel();const n=new SpeechSynthesisUtterance(e);n.lang=a,n.rate=s,n.onend=o,n.onerror=o,window.speechSynthesis.speak(n)})}async function y(e){e&&(await l(e.chinese,"zh-CN",.9),await v(800),await l(e.chinese,"zh-CN",.65),await v(700),await l(e.korean,"ko-KR",.95),await v(1e3))}async function C(){if(!t.isAutoPlaying)for(t.isAutoPlaying=!0,i();t.isAutoPlaying&&t.studyIndex<t.items.length&&(await y(t.items[t.studyIndex]),!!t.isAutoPlaying);)t.studyIndex=Math.min(t.studyIndex+1,t.items.length-1),t.studyIndex===t.items.length-1&&(t.isAutoPlaying=!1),i()}function m(e){e?t.quizCorrect+=1:t.quizWrong+=1,t.quizShowAnswer=!1,t.quizIndex+=1}function b(){t.generatedText=t.items.map((e,a)=>`${a+1}. ${e.chinese}
   ${e.pinyin}
   ${e.korean}`).join(`

`)}function E(){b();const e=new Blob([t.generatedText],{type:"text/plain;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(e),a.download=`chinese_study_review_${new Date().toISOString().slice(0,10)}.txt`,a.click(),URL.revokeObjectURL(a.href)}function i(){f.innerHTML=`
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <strong>찍으면 중국어 웹</strong>
          <span>Android 앱의 샘플 학습 흐름을 브라우저에서 바로 확인합니다.</span>
        </div>
        <nav class="nav" aria-label="주요 화면">
          ${d("edit","편집")}
          ${d("study","학습")}
          ${d("quiz","시험")}
          ${d("generate","복습 자료")}
          ${d("samples","예시 사진")}
          <a class="nav-link" href="/picchina-web/guide">학습 가이드</a>
          <a class="nav-link" href="/picchina-web/curriculum">커리큘럼</a>
          <a class="nav-link" href="/picchina-web/worksheets">학습지</a>
          <a class="nav-link" href="/picchina-web/support">지원</a>
          <a class="nav-link" href="/picchina-web/privacy">개인정보</a>
          <a class="play-cta compact" data-play-cta href="${p}" target="_blank" rel="noopener noreferrer">Google Play에서 설치</a>
        </nav>
      </header>
      <main class="workspace">
        ${R()}
        ${M()}
        <section class="panel">
          ${j()}
        </section>
        ${_()}
        ${O()}
        ${U()}
      </main>
      ${V()}
    </div>
  `,F()}function R(){return`
    <section class="landing-hero" aria-labelledby="landingTitle">
      <div class="landing-copy">
        <p class="eyebrow">중고등 학교 중국어</p>
        <h1 id="landingTitle">오늘 받은 학습지,<br />사진 한 장으로 복습까지</h1>
        <p>교과서와 프린트를 찍으면 중국어·병음·뜻을 확인하고, 발음 카드와 오답 퀴즈로 이어집니다.</p>
        <div class="actions">
          <a class="play-cta" data-play-cta href="${p}" target="_blank" rel="noopener noreferrer">Google Play에서 무료 설치</a>
          <a class="hero-secondary" href="/picchina-web/teacher">교사용 3분 도입 자료</a>
        </div>
        <small>회원가입 없이 샘플 체험 · 학습지 사진은 기본적으로 기기에서 처리</small>
      </div>
      <img src="/picchina-web/brand/picchina-og.png" alt="학습지를 찍어 병음 뜻 발음 퀴즈로 복습하는 찍으면 중국어 앱" />
    </section>
  `}function O(){return`
    <section class="product-proof" aria-labelledby="productProofTitle">
      <div class="proof-copy">
        <p class="eyebrow">Real app screens</p>
        <h2 id="productProofTitle">설명만이 아니라 실제 앱 화면으로 확인하세요</h2>
        <p>샘플 학습지에서 OCR 후보를 만들고, 발음 카드와 퀴즈로 이어지는 화면을 실제 Android 앱에서 캡처했습니다.</p>
        <ul>
          <li>학습지 이미지는 기본적으로 기기 안에서 처리</li>
          <li>중국어·병음·뜻을 저장 전 직접 수정</li>
          <li>오답과 오래된 카드를 매일 복습</li>
        </ul>
        <a class="text-link" href="/picchina-web/teacher">교사용 3분 도입 자료 보기 →</a>
      </div>
      <div class="proof-screens">
        <img src="/picchina-web/brand/picchina-ocr-screen.png" alt="샘플 중국어 학습지를 OCR로 불러오는 실제 앱 화면" />
        <img src="/picchina-web/brand/picchina-study-screen.png" alt="중국어 발음 카드를 복습하는 실제 앱 화면" />
      </div>
    </section>
  `}function _(){return`
    <section class="install-cta" aria-labelledby="installCtaTitle">
      <div>
        <p class="eyebrow">Android app</p>
        <h2 id="installCtaTitle">학교 중국어 학습지는 앱에서 바로 촬영하세요</h2>
        <p>한자 인식 뒤 병음·뜻을 확인하고, 발음 카드와 오답 퀴즈까지 한 흐름으로 이어집니다.</p>
      </div>
      <a class="play-cta" data-play-cta href="${p}" target="_blank" rel="noopener noreferrer">무료로 설치하고 학습지 찍기</a>
    </section>
  `}function d(e,a){return`<button class="${t.activeView===e?"active":"secondary"}" data-view="${e}">${a}</button>`}function M(){return`
    <aside class="tool-panel stack">
      <div>
        <h1>학습지 입력</h1>
        <p class="muted">브라우저판은 서버 업로드 없이 샘플과 직접 입력 텍스트를 처리합니다.</p>
      </div>
      <textarea id="rawText" placeholder="OCR 결과나 학습지의 중국어 텍스트를 붙여넣으세요.">${t.rawText}</textarea>
      <div class="actions">
        <button id="makeItems">텍스트 항목화</button>
        <button class="secondary" id="loadSample">샘플 12개</button>
      </div>
      <div class="stats">
        <div class="stat"><span>항목</span><b>${t.items.length}</b></div>
        <div class="stat"><span>뜻 입력</span><b>${t.items.filter(e=>e.korean).length}</b></div>
        <div class="stat"><span>예시 사진</span><b>${t.samples.length}</b></div>
      </div>
      <div class="notice">
        웹버전은 AdMob을 붙이지 않습니다. AdMob은 Android 앱 전용으로 유지하고, 웹은 제품 체험/랜딩 용도로 배포합니다.
      </div>
    </aside>
  `}function U(){return`
    <section class="resource-hub" aria-labelledby="resourceHubTitle">
      <div class="resource-intro">
        <p class="eyebrow">Learning resources</p>
        <h2 id="resourceHubTitle">중국어 학습지를 직접 공부 자료로 바꾸는 방법</h2>
        <p>
          찍으면 중국어는 앱 소개만 하는 사이트가 아니라, 초급 학습자가 사진 속 중국어 문장을
          병음, 뜻, 듣기, 퀴즈, 복습 노트로 정리하는 과정을 설명하는 학습 자료실입니다.
          아래 페이지들은 실제 앱 없이도 읽을 수 있는 독립 자료로 구성했습니다.
        </p>
      </div>
      <div class="resource-grid">
        <a class="resource-card" href="/picchina-web/teacher">
          <span>교사용</span>
          <strong>수업 후 3분 복습 도입 자료</strong>
          <p>무료 PDF, 앱 QR, 학생 안내 문구, 30명 파일럿 운영 방법을 제공합니다.</p>
        </a>
        <a class="resource-card" href="/picchina-web/worksheet-ocr">
          <span>OCR</span>
          <strong>중국어 학습지 OCR 사용법</strong>
          <p>밝게 찍기, 후보 확인, 병음·뜻 수정, 카드 저장 과정을 설명합니다.</p>
        </a>
        <a class="resource-card" href="/picchina-web/guide">
          <span>01</span>
          <strong>사진 학습지 정리 가이드</strong>
          <p>촬영 전 준비, OCR 결과 검토, 병음 확인, 복습 노트 작성 순서를 단계별로 정리했습니다.</p>
        </a>
        <a class="resource-card" href="/picchina-web/curriculum">
          <span>02</span>
          <strong>4주 초급 커리큘럼</strong>
          <p>인사, 가족, 교실, 시간, 예절 표현을 부담 없이 반복하는 학습 계획입니다.</p>
        </a>
        <a class="resource-card" href="/picchina-web/pronunciation">
          <span>03</span>
          <strong>병음과 성조 읽기</strong>
          <p>한국어 화자가 자주 놓치는 zh, ch, sh, r, u, e, 성조 리듬을 예문으로 설명합니다.</p>
        </a>
        <a class="resource-card" href="/picchina-web/worksheets">
          <span>04</span>
          <strong>샘플 학습지 해설</strong>
          <p>30장 샘플 학습지가 어떤 표현을 연습하도록 설계됐는지 주제별로 볼 수 있습니다.</p>
        </a>
        <a class="resource-card" href="/picchina-web/compare-translation-vs-study">
          <span>비교</span>
          <strong>번역기와 학습 앱의 차이</strong>
          <p>뜻을 한 번 확인할 때와 시험 전까지 반복해서 외울 때 필요한 도구가 어떻게 다른지 설명합니다.</p>
        </a>
        <a class="resource-card" href="/picchina-web/chinese-study-glossary">
          <span>용어</span>
          <strong>OCR·병음·성조·오답 복습</strong>
          <p>중국어 학습 앱에서 자주 보는 용어를 실제 학습지 복습 상황에 맞춰 정리했습니다.</p>
        </a>
      </div>
    </section>
  `}function V(){return`
    <footer class="site-footer">
      <nav aria-label="사이트 정보">
        <a href="/picchina-web/about">소개</a>
        <a href="/picchina-web/guide">학습 가이드</a>
        <a href="/picchina-web/curriculum">커리큘럼</a>
        <a href="/picchina-web/pronunciation">발음 가이드</a>
        <a href="/picchina-web/worksheets">샘플 학습지</a>
        <a href="/picchina-web/teacher">교사용 자료</a>
        <a href="/picchina-web/worksheet-ocr">학습지 OCR</a>
        <a href="/picchina-web/compare-translation-vs-study">번역기와 비교</a>
        <a href="/picchina-web/chinese-study-glossary">학습 용어</a>
        <a href="/picchina-web/support">지원</a>
        <a href="/picchina-web/terms">이용 안내</a>
        <a href="/picchina-web/privacy">개인정보</a>
        <a data-play-cta href="${p}" target="_blank" rel="noopener noreferrer">Android 앱 설치</a>
      </nav>
      <p>찍으면 중국어는 학습자와 보호자가 중국어 학습 자료를 더 쉽게 정리하도록 돕는 교육 도구입니다.</p>
    </footer>
  `}function j(){return t.activeView==="study"?H():t.activeView==="quiz"?N():t.activeView==="generate"?W():t.activeView==="samples"?D():G()}function G(){return`
    <div class="panel-title">
      <div>
        <h2>학습 항목 편집</h2>
        <p class="muted">중국어, 병음, 한국어 뜻을 직접 수정할 수 있습니다.</p>
      </div>
      <button id="addItem">항목 추가</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>중국어</th>
            <th>병음</th>
            <th>한국어 뜻</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          ${t.items.map((e,a)=>`
                <tr>
                  <td class="index">${a+1}</td>
                  <td><input data-id="${e.id}" data-key="chinese" value="${u(e.chinese)}" /></td>
                  <td><input data-id="${e.id}" data-key="pinyin" value="${u(e.pinyin)}" /></td>
                  <td><input data-id="${e.id}" data-key="korean" value="${u(e.korean)}" /></td>
                  <td>
                    <button class="secondary" data-speak="${e.id}">듣기</button>
                    <button class="ghost" data-remove="${e.id}">삭제</button>
                  </td>
                </tr>
              `).join("")}
        </tbody>
      </table>
    </div>
  `}function H(){const e=t.items[t.studyIndex];return e?`
    <div class="study-layout">
      <div class="study-card">
        <div class="progress-label">${t.studyIndex+1} / ${t.items.length}</div>
        <div class="hanzi">${c(e.chinese||" ")}</div>
        <div class="pinyin">${c(e.pinyin||" ")}</div>
        <div class="korean">${c(e.korean||" ")}</div>
      </div>
      <div class="stack">
        <h2>발음 학습</h2>
        <button id="playCurrent">재생</button>
        <button class="secondary" id="prevStudy">이전</button>
        <button class="secondary" id="nextStudy">다음</button>
        <button id="autoStudy">${t.isAutoPlaying?"자동 재생 멈춤":"자동 재생"}</button>
      </div>
    </div>
  `:'<h2>발음 학습</h2><p class="muted">학습 항목을 먼저 추가해 주세요.</p>'}function N(){const e=t.items[t.quizIndex];return t.quizIndex>=t.items.length&&t.items.length>0?`
      <h2>시험 완료</h2>
      <p>${t.items.length}개 항목을 모두 확인했습니다.</p>
      <div class="stats">
        <div class="stat"><span>맞음</span><b>${t.quizCorrect}</b></div>
        <div class="stat"><span>틀림</span><b>${t.quizWrong}</b></div>
        <div class="stat"><span>전체</span><b>${t.items.length}</b></div>
      </div>
      <div class="actions" style="margin-top: 16px;">
        <button id="resetQuiz">다시 풀기</button>
      </div>
    `:e?`
    <div class="study-layout">
      <div class="study-card">
        <div class="progress-label">${t.quizIndex+1} / ${t.items.length}</div>
        <div class="hanzi">${c(e.chinese||" ")}</div>
        <div class="quiz-answer">
          ${t.quizShowAnswer?`<div class="pinyin">${c(e.pinyin)}</div><div class="korean">${c(e.korean)}</div>`:""}
        </div>
      </div>
      <div class="stack">
        <h2>시험 모드</h2>
        <button id="quizAudio">음성</button>
        <button class="secondary" id="showAnswer">정답 보기</button>
        <button id="markCorrect">맞음</button>
        <button class="secondary" id="markWrong">틀림</button>
      </div>
    </div>
  `:'<h2>시험 모드</h2><p class="muted">학습 항목을 먼저 추가해 주세요.</p>'}function W(){return t.generatedText||b(),`
    <div class="panel-title">
      <div>
        <h2>복습 자료 생성</h2>
        <p class="muted">브라우저판은 텍스트 복습 노트 다운로드와 세로형 카드 미리보기를 제공합니다.</p>
      </div>
      <button id="downloadReview">복습 노트 다운로드</button>
    </div>
    <div class="download-preview">${c(t.generatedText)}</div>
  `}function D(){return`
    <div class="panel-title">
      <div>
        <h2>예시 학습지 사진</h2>
        <p class="muted">Android 앱과 같은 30장 예시 이미지를 웹에서도 확인할 수 있습니다.</p>
      </div>
    </div>
    <div class="samples">
      ${t.samples.map(e=>`
            <article class="sample-card">
              <h3>${c(e.title)}</h3>
              <img src="${e.assetUrl||`/picchina-web/${e.assetPath}`}" alt="${u(e.title)}" />
            </article>
          `).join("")}
    </div>
  `}function F(){document.querySelectorAll("[data-play-cta]").forEach(e=>{e.addEventListener("click",()=>w("play_store_click"))}),document.querySelectorAll("[data-view]").forEach(e=>{e.addEventListener("click",()=>P(e.dataset.view))}),document.querySelector("#rawText")?.addEventListener("input",e=>{t.rawText=e.target.value}),document.querySelector("#makeItems")?.addEventListener("click",()=>{z(),i()}),document.querySelector("#loadSample")?.addEventListener("click",()=>{g(),i()}),document.querySelector("#addItem")?.addEventListener("click",()=>{T(),i()}),document.querySelectorAll("[data-key]").forEach(e=>{e.addEventListener("input",()=>A(e.dataset.id,e.dataset.key,e.value))}),document.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",()=>{L(e.dataset.remove),i()})}),document.querySelectorAll("[data-speak]").forEach(e=>{e.addEventListener("click",()=>y(t.items.find(a=>a.id===e.dataset.speak)))}),document.querySelector("#playCurrent")?.addEventListener("click",()=>y(t.items[t.studyIndex])),document.querySelector("#prevStudy")?.addEventListener("click",()=>{t.studyIndex=Math.max(0,t.studyIndex-1),i()}),document.querySelector("#nextStudy")?.addEventListener("click",()=>{t.studyIndex=Math.min(t.items.length-1,t.studyIndex+1),i()}),document.querySelector("#autoStudy")?.addEventListener("click",()=>{t.isAutoPlaying?(t.isAutoPlaying=!1,window.speechSynthesis?.cancel(),i()):C()}),document.querySelector("#quizAudio")?.addEventListener("click",()=>l(t.items[t.quizIndex]?.chinese,"zh-CN",.9)),document.querySelector("#showAnswer")?.addEventListener("click",()=>{t.quizShowAnswer=!0,i()}),document.querySelector("#markCorrect")?.addEventListener("click",()=>{m(!0),i()}),document.querySelector("#markWrong")?.addEventListener("click",()=>{m(!1),i()}),document.querySelector("#resetQuiz")?.addEventListener("click",()=>{t.quizIndex=0,t.quizCorrect=0,t.quizWrong=0,t.quizShowAnswer=!1,i()}),document.querySelector("#downloadReview")?.addEventListener("click",E)}function c(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function u(e){return c(e).replace(/`/g,"&#096;")}function Q(){f.innerHTML=`
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <strong>찍으면 중국어</strong>
          <span>개인정보 처리방침</span>
        </div>
        <nav class="nav" aria-label="문서 이동">
          <a class="nav-link" href="/picchina-web/">웹 데모</a>
        </nav>
      </header>
      <main class="privacy-page">
        <section class="panel privacy-card">
          <p class="eyebrow">Privacy Policy</p>
          <h1>찍으면 중국어 개인정보 처리방침</h1>
          <p class="muted">시행일: 2026년 5월 19일</p>

          <h2>1. 앱의 기본 원칙</h2>
          <p>찍으면 중국어는 중국어 학습지 사진에서 학습 항목을 만들고, 병음과 한국어 뜻, 발음 학습, 퀴즈, 복습 자료 생성을 돕는 학습 앱입니다. 학습지 사진과 OCR 결과, 편집한 학습 항목은 기본적으로 사용자의 기기 안에만 저장됩니다.</p>

          <h2>2. 접근하거나 저장하는 정보</h2>
          <ul>
            <li>카메라와 사진: 사용자가 직접 촬영하거나 선택한 학습지 이미지를 OCR 처리하기 위해 사용합니다.</li>
            <li>학습 데이터: 중국어 원문, 병음, 한국어 뜻, 퀴즈 기록, 생성 파일 경로를 기기 로컬 데이터베이스에 저장합니다.</li>
            <li>광고 및 동의 정보: Google AdMob 및 UMP SDK가 광고 제공, 동의 관리, 부정 이용 방지에 필요한 기기/광고 관련 정보를 처리할 수 있습니다.</li>
            <li>선택적 Cloud TTS: 사용자가 앱 설정에서 명시적으로 켠 경우에만 발음 생성을 위해 학습 문구가 설정된 TTS 제공자에 전송될 수 있습니다.</li>
          </ul>

          <h2>3. 서버 업로드 및 외부 음원</h2>
          <p>기본 기능은 학습지 이미지를 자체 서버에 업로드하지 않습니다. 네이버 사전, Forvo, 유튜브, 블로그 등 외부 사이트의 음원을 스크래핑하거나 자동 다운로드하지 않습니다. 발음은 Android TextToSpeech 또는 사용자가 동의한 합법적인 TTS 제공자만 사용합니다.</p>

          <h2>4. 광고</h2>
          <p>앱은 Google AdMob 광고만 사용합니다. 학생 안전 광고 모드는 기본으로 켜져 있으며, 아동/청소년 보호 설정과 낮은 광고 콘텐츠 등급을 우선 적용하도록 설계되어 있습니다. 광고는 학습 흐름을 방해하지 않도록 제한된 위치와 빈도로만 표시됩니다.</p>

          <h2>5. 보관 및 삭제</h2>
          <p>사용자는 앱의 히스토리 화면에서 저장된 학습 세션과 생성 파일 기록을 삭제할 수 있습니다. 앱을 삭제하면 기기 안에 저장된 로컬 앱 데이터도 함께 제거됩니다.</p>

          <h2>6. 문의</h2>
          <p>개인정보 관련 문의는 Google Play 스토어에 표시된 개발자 연락처를 통해 접수할 수 있습니다. 배포자는 Play Console의 개발자 이메일과 이 페이지의 연락 경로가 실제로 동작하는지 배포 전에 확인해야 합니다.</p>
        </section>
      </main>
    </div>
  `}location.pathname.endsWith("/privacy")?Q():I().catch(e=>{f.innerHTML=`<main class="workspace"><section class="panel"><h1>로드 실패</h1><p>${c(e.message)}</p></section></main>`});
