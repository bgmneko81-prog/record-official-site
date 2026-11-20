(() => {
  'use strict';

  // Images are OPTIONAL. Drop files into assets/images/ to replace placeholders.
  // If an image is missing, the annotated slot stays visible instead of showing a broken-image icon.
  function updateImageState(img) {
    const wrapper = img.closest('.asset-slot');
    if (!wrapper) return;
    wrapper.classList.toggle('has-image', !!(img.complete && img.naturalWidth > 0));
  }
  function initializeImage(img) {
    img.addEventListener('load', () => updateImageState(img));
    img.addEventListener('error', () => updateImageState(img));
    updateImageState(img);
  }
  document.querySelectorAll('.asset-slot > img').forEach(initializeImage);

  // Hero reference artwork shows the original mood (including its printed logo).
  // Placing hero.jpg automatically replaces the reference and enables the text logo.
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image > img');
  if (hero && heroImage) {
    const custom = new Image();
    custom.onload = () => {
      hero.classList.remove('hero--reference');
      hero.classList.add('hero--custom');
      heroImage.alt = 'Re:CORD メインビジュアル';
      heroImage.src = 'assets/images/hero.jpg';
      // Keep the PV thumbnail synced with the current TOP visual.
      const movieImage = document.querySelector('.movie-background > img');
      const movieSlot = movieImage && movieImage.closest('.movie-background');
      if (movieImage) {
        movieImage.src = 'assets/images/hero.jpg';
        if (movieSlot) movieSlot.dataset.asset = 'hero.jpg';
      }
    };
    custom.onerror = () => {
      hero.classList.add('hero--reference');
    };
    custom.src = 'assets/images/hero.jpg';
  }

  const menu = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  function closeMenu() {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'メニューを開く');
  }
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  const updateScroll = () => {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('is-visible', window.scrollY > 550);
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
  backToTop.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  }));

  // Camera interaction: website-only sample (not actual game text / mechanic).
  const captureBtn = document.getElementById('captureBtn');
  const stage = document.getElementById('captureStage');
  captureBtn.addEventListener('click', () => {
    const active = stage.classList.toggle('is-recorded');
    captureBtn.setAttribute('aria-pressed', String(active));
    document.getElementById('captureBtnLabel').textContent = active ? '元の景色に戻す' : '撮影してみる';
    document.getElementById('captureState').textContent = active ? 'OBSERVED　/　01' : 'UNOBSERVED　/　00';
    if (active) {
      stage.classList.remove('flash-active');
      void stage.offsetWidth;
      stage.classList.add('flash-active');
    }
  });

  // Only the PART 01 profiles appear here. Internal plot/character secrets are deliberately omitted.
  const characters = [
    {
        "role": "01 / 主人公",
        "name": "美原 明人",
        "kana": "みはら あきと",
        "roman": "Mihara Akito",
        "quote": "「残されたものには、必ず意味がある。」",
        "image": "character-protagonist.png",
        "detail": "character-akito.html",
        "description": [
            "冷静な判断力と観察力を持ち、周囲から一歩引いた立場で物事を見つめる高校生。",
            "理不尽な出来事を目の当たりにすると、危険を承知で首を突っ込んでしまう。",
            "数か月前に失踪した湊人（明人の兄）を、わずかな手がかりを頼りに探し続けている。"
        ],
        "alt": "美原 明人の人物ビジュアル（準備中）"
    },
    {
        "role": "02 / 行方不明",
        "name": "美原 湊人",
        "kana": "みはら みなと",
        "roman": "Mihara Minato",
        "quote": "",
        "image": "character-brother.png",
        "detail": "character-minato.html",
        "description": [
            "湊人（明人の兄）は、行方不明者の捜索依頼を受けたあと、消息を絶った。",
            "物静かで感情が読みにくい印象だが、実際は優しく、人を見捨てられない青年。",
            "弟にとって最も頼れる存在だった彼の失踪は、物語の大きな謎となっている。"
        ],
        "alt": "美原 湊人の人物ビジュアル（準備中）"
    },
    {
        "role": "03 / ヒロイン",
        "name": "桜庭 透子",
        "kana": "さくらば とうこ",
        "roman": "Sakuraba Touko",
        "quote": "「見えないものほど、大切だったりするよ。」",
        "image": "character-friend.png",
        "detail": "character-touko.html",
        "description": [
            "文武両道で、男女問わず人気の高い優等生。明るく社交的で、少し勝ち気な一面も。",
            "美原明人とは幼い頃から家族ぐるみの付き合いで、互いに遠慮なく話せる仲。",
            "湊人の失踪後、無気力になった明人を心配し、危険へ向かう彼を放っておけない。"
        ],
        "alt": "桜庭 透子の人物ビジュアル（準備中）"
    },
    {
        "role": "04 / サポート",
        "name": "神代 怜",
        "kana": "かみしろ れい",
        "roman": "Kamishiro Rei",
        "quote": "「神代家の名に懸けて、力を貸すよ。」",
        "image": "character-rei.png",
        "detail": "character-rei.html",
        "description": [
            "古くから伊良坂町を治めてきた名家・神代家の跡取り。",
            "礼儀正しく非常に頭が切れる一方、一般常識には驚くほど疎く、運動神経も壊滅的。",
            "未知のものへの好奇心と大胆さを持ち、明人たちの調査に力を貸す。"
        ],
        "alt": "神代 怜の人物ビジュアル（準備中）"
    },
    {
        "role": "05 / 後輩",
        "name": "黒瀬 朱音",
        "kana": "くろせ あかね",
        "roman": "Kurose Akane",
        "quote": "「探偵さんなら、これくらい余裕でしょ？」",
        "image": "character-akane.png",
        "detail": "character-akane.html",
        "description": [
            "明るく生意気で、いたずら好きな後輩。明人を「探偵さん」と呼んでからかう。",
            "学業成績は平均的だが、人の嘘や言葉の裏にある感情を見抜くのが得意。",
            "周囲の人々が突然別人のように振る舞い始めたことを不審に思い、明人たちに相談を持ちかける。"
        ],
        "alt": "黒瀬 朱音の人物ビジュアル（準備中）"
    },
    {
        "role": "06 / 謎の住人",
        "name": "月森 澪",
        "kana": "つきもり みお",
        "roman": "Tsukimori Mio",
        "quote": "「なくしたものって、本当に消えるのかな。」",
        "image": "character-mio.png",
        "detail": "character-mio.html",
        "description": [
            "穏やかでおっとりした性格の、不思議な少女。独特な価値観やマイペースな言動で周囲を驚かせる。",
            "訪れる人々をお客さんとして迎え、お茶を飲みながら会話を楽しんでいる。",
            "明人を放っておけないようで、本人が嫌がってもお構いなしに甘やかしてしまう。"
        ],
        "alt": "月森 澪の人物ビジュアル（準備中）"
    },
    {
        "role": "07 / 正体不明",
        "name": "謎の少年",
        "kana": "",
        "roman": "",
        "quote": "「君、なかなか面白いね。」",
        "image": "character-boy.png",
        "detail": "character-boy.html",
        "description": [
            "彼岸で明人たちが出会う、正体不明の少年。",
            "飄々として好奇心旺盛。特に人間の予想外の行動を面白がっている。",
            "彼岸に迷い込んだ人々を此岸へ帰すため、道案内をしているという。"
        ],
        "alt": "謎の少年の人物ビジュアル（準備中）"
    }
];
  const tabs = Array.from(document.querySelectorAll('[data-character]'));
  const portrait = document.getElementById('characterImage');
  const portraitFrame = document.getElementById('characterAsset');
  const characterPanel = document.getElementById('characterPanel');
  const characterBio = document.getElementById('characterBio');
  const characterQuote = document.getElementById('characterQuote');
  const moreLink = document.getElementById('characterMoreLink');
  const morePending = document.getElementById('characterMorePending');
  function selectCharacter(index, moveFocus = false) {
    const person = characters[index];
    if (!person) return;
    document.getElementById('characterRole').textContent = person.role;
    document.getElementById('characterName').textContent = person.name;
    document.getElementById('characterKana').textContent = person.kana;
    document.getElementById('characterRoman').textContent = person.roman;
    characterQuote.textContent = person.quote;
    characterQuote.hidden = !person.quote;
    const bio = document.createDocumentFragment();
    person.description.forEach((part, i) => {
      const p = document.createElement('p');
      p.textContent = part;
      p.className = (person.emphasisLast && i === person.description.length - 1)
        ? 'character-bio-emphasis' : 'character-bio-paragraph';
      bio.appendChild(p);
    });
    characterBio.replaceChildren(bio);
    moreLink.hidden = !person.detail;
    morePending.hidden = !!person.detail;
    if (person.detail) moreLink.href = person.detail;
    characterBio.scrollTop = 0;
    document.getElementById('portraitNumber').textContent = `${String(index + 1).padStart(2, '0')} / ${String(characters.length).padStart(2, '0')}`;
    document.getElementById('characterFilename').textContent = person.image;
    characterPanel.setAttribute('aria-labelledby', tabs[index].id);
    portraitFrame.dataset.asset = person.image;
    portraitFrame.classList.remove('has-image');
    portrait.alt = person.alt;
    portrait.src = `assets/images/${person.image}`;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    if (moveFocus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCharacter(index));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else next = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectCharacter(next, true);
    });
  });

  selectCharacter(0);

  // Public-only monster descriptions. The last entry deliberately omits its identity.
  // Missing PNGs keep the image slot visible, ready for drop-in artwork.
  const kaiiFiles = [
    {
      name: '虚面', reading: 'うつろめん', grade: '第壱級', threat: '低脅威', image: 'kaii-utsuro.png',
      description: ['顔のない人影のような姿をした怪異。', '人間によく似た輪郭を持ちながら、その顔には表情も目鼻も存在しない。', '彼岸で遭遇する、基本的な怪異の一種。']
    },
    {
      name: '樹喰', reading: '', grade: '第参級', threat: '中脅威', image: 'kaii-jukui.png',
      description: ['伊良坂町で記録された怪異の一種。', '第参級に分類されている。詳しい性質には、まだ不明な点が多い。']
    },
    {
      name: '壊穣', reading: 'かいじょう', grade: '第肆級', threat: '強脅威', image: 'kaii-kaijo.png',
      description: ['根や蔓、果実のような異質な肉体を持つ怪異。', '第肆級に分類された、特に危険性の高い存在。']
    },
    {
      name: '××', reading: '', grade: '記録なし', threat: '不明', image: 'kaii-unknown.png',
      description: ['正体に関する情報は、現在も伏せられている。', '残された記録に映る姿は、ほんの一部にすぎない。']
    }
  ];
  const kaiiTabs = [...document.querySelectorAll('[data-kaii]')];
  const kaiiPanel = document.getElementById('kaiiPanel');
  const kaiiImage = document.getElementById('kaiiImage');
  const kaiiSlot = document.getElementById('kaiiAsset');
  function selectKaii(index, focusTab = false) {
    const entry = kaiiFiles[index];
    if (!entry) return;
    document.getElementById('kaiiFileIndex').textContent = `${String(index + 1).padStart(2, '0')} / 04`;
    document.getElementById('kaiiFrameMark').textContent = `RECORD / UNKNOWN ${String(index + 1).padStart(3, '0')}`;
    document.getElementById('kaiiGrade').replaceChildren(document.createTextNode(entry.grade + ' '));
    const threat = document.createElement('span');
    threat.textContent = entry.threat;
    document.getElementById('kaiiGrade').append(threat);
    document.getElementById('kaiiName').firstChild.textContent = entry.name + ' ';
    const reading = document.getElementById('kaiiReading');
    reading.textContent = entry.reading;
    reading.hidden = !entry.reading;
    const desc = document.createDocumentFragment();
    entry.description.forEach(line => { const p = document.createElement('p');p.textContent = line; desc.append(p); });
    document.getElementById('kaiiDescription').replaceChildren(desc);
    document.getElementById('kaiiCaption').textContent = `ENTITY FILE / ${String(index + 1).padStart(3, '0')}`;
    document.getElementById('kaiiFilename').textContent = entry.image;
    kaiiSlot.dataset.asset = entry.image;
    kaiiSlot.classList.remove('has-image');
    kaiiImage.alt = `${entry.name}の怪異ビジュアル`;
    kaiiImage.src = `assets/images/${entry.image}`;
    kaiiPanel.setAttribute('aria-labelledby', kaiiTabs[index].id);
    kaiiTabs.forEach((button,i) => {
      button.setAttribute('aria-selected', String(index === i));
      button.tabIndex = index === i ? 0 : -1;
    });
    if (focusTab) kaiiTabs[index].focus();
  }
  kaiiTabs.forEach((button, i) => {
    button.addEventListener('click', () => selectKaii(i));
    button.addEventListener('keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? kaiiTabs.length - 1
        : (i + (e.key === 'ArrowRight' ? 1 : -1) + kaiiTabs.length) % kaiiTabs.length;
      selectKaii(next, true);
    });
  });
  selectKaii(0);



  // Insert YouTube iframe only while modal is open; removing it stops playback.
  const dialog = document.getElementById('videoDialog');
  const videoHost = document.getElementById('videoHost');
  const closeVideoBtn = document.getElementById('closeVideo');
  let previousFocus = null;
  function openVideo() {
    previousFocus = document.activeElement;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/MnXWkZXvV-A?autoplay=1&rel=0';
    iframe.title = 'Re:CORD プロモーションビデオ';
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', '');
    videoHost.replaceChildren(iframe);
    dialog.classList.add('is-open');
    dialog.setAttribute('aria-hidden', 'false');
    document.body.classList.add('dialog-open');
    closeVideoBtn.focus();
  }
  function closeVideo() {
    dialog.classList.remove('is-open');
    dialog.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('dialog-open');
    videoHost.replaceChildren();
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }
  document.querySelectorAll('.js-play-video').forEach(btn => btn.addEventListener('click', openVideo));
  closeVideoBtn.addEventListener('click', closeVideo);
  dialog.addEventListener('click', event => { if (event.target === dialog) closeVideo(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (dialog.classList.contains('is-open')) closeVideo();
      else closeMenu();
    }
    if (event.key === 'Tab' && dialog.classList.contains('is-open')) {
      const focusTargets = [closeVideoBtn, ...dialog.querySelectorAll('a[href]')];
      const first = focusTargets[0], last = focusTargets[focusTargets.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .06, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
})();
