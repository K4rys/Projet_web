document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;
  // ========== GESTION DU QUIZZ ==========
  if (page.includes("index.html")) {
   
  let allAudios = []; // Pour contenir tous les sons joués
let isMuted = false;
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 10000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
    playCurrentSlideSound();

}



// --- Gestion musique de fond et mute global ---
const music = document.getElementById('background-music');
const muteBtn = document.getElementById('mute-toggle');
const muteIcon = document.getElementById('mute-icon');


if (music) {
  music.volume = 0.01;
  allAudios.push(music);

  document.addEventListener('click', () => music.play(), { once: true });
}

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;

  allAudios.forEach(audio => {
    audio.muted = isMuted;
  });

  muteIcon.innerHTML = isMuted
    ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM3 10v4h4l5 5V5L7 10H3zm13.19 7.19L19.39 21 21 19.39 5.61 4 4 5.61l4.59 4.59L3 10v4h4l5 5V14.41l3.19 3.19z"/>'
    : '<path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>';
});


function playCurrentSlideSound() {
    const currentItem = document.querySelector('.carousel .list .item');
    const content = currentItem.querySelector('.content');
    const soundSrc = content.getAttribute('data-sound');
    const soundVolume = parseFloat(content.getAttribute('data-volume')) || 0.1;

    const oldAudio = document.getElementById('current-audio');
    if (oldAudio) {
        oldAudio.pause();
        oldAudio.remove();
    }

    if (soundSrc) {
        const newAudio = document.createElement('audio');
        newAudio.id = 'current-audio';
        newAudio.src = soundSrc;
        newAudio.autoplay = true;
        newAudio.loop = true;
        newAudio.volume = isMuted ? 0 : soundVolume;
        document.body.appendChild(newAudio);
        allAudios = [newAudio];
    }
}

  }


if (page.includes("mononoke.html")) {let allAudios=[]
  const esprits = document.querySelectorAll('.esprit');
let trouves = 0;

const plingSound = document.getElementById('pling-sound');
const message = document.getElementById('message');
const closeMsg = document.getElementById('close-msg');

function createFirefly(x, y) {
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    spark.classList.add('firefly');
    spark.style.left = `${x + (Math.random() * 30 - 15)}px`;
    spark.style.top = `${y + (Math.random() * 30 - 15)}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }
}

const leaves = [
  document.getElementById('leaf1'),
  document.getElementById('leaf2'),
  document.getElementById('leaf3')
];

function animateLeaf(leaf) {
  const startLeft = Math.random() * 100;
  const xOffset = (Math.random() - 0.5) * 100;
  const duration = 8 + Math.random() * 8;
  const rotation = 180 + Math.random() * 540; // entre 180deg et 720deg
leaf.style.setProperty('--rotation', `${rotation}deg`);

  leaf.style.left = `${startLeft}vw`;
  leaf.style.setProperty('--xOffset', `${xOffset}vw`);

  leaf.style.animation = 'none';
  void leaf.offsetWidth;
  leaf.style.animation = `animateLeaf ${duration}s linear forwards`;
}

// Lancer les animations
leaves.forEach(leaf => {
  leaf.addEventListener('animationend', () => animateLeaf(leaf));
  animateLeaf(leaf);
});




esprits.forEach(el => {
  el.addEventListener('click', e => {
    if (!el.classList.contains('trouve')) {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      createFirefly(x, y);

      plingSound.currentTime = 0;
      plingSound.play();

      el.classList.add('trouve');

      // Bien appeler disparition de l'élément avec un petit délai
      setTimeout(() => {
        el.style.display = 'none';
      }, 300);

      trouves++;
      if (trouves === esprits.length) {
        message.style.display = 'block';

        //setTimeout(() => {
          //window.location.href = 'page-secrete.html';
        //}, 1500);
      }
    }
  });
});

closeMsg.addEventListener('click', () => {
  message.style.display = 'none';
});




const music = document.getElementById('background-audio');
const muteBtn = document.getElementById('mute-toggle');
const muteIcon = document.getElementById('mute-icon');
let isMuted = true;

function updateMuteIcon() {
  muteIcon.innerHTML = isMuted
    ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM3 10v4h4l5 5V5L7 10H3zm13.19 7.19L19.39 21 21 19.39 5.61 4 4 5.61l4.59 4.59L3 10v4h4l5 5V14.41l3.19 3.19z"/>'
    : '<path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>';
}

function updateAllVolumes() {
  music.muted = isMuted;
  allAudios.forEach(audio => {
    audio.muted = isMuted;
  });
}

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  music.volume=0.1;
  updateMuteIcon();
  updateAllVolumes();
});

// Au chargement, applique mute
updateMuteIcon();
updateAllVolumes();


updateMuteIcon(); // set icon at start



function playCurrentSlideSound() {
    const currentItem = document.querySelector('.carousel .list .item');
    const content = currentItem.querySelector('.content');
    const soundSrc = content.getAttribute('data-sound');
    const soundVolume = parseFloat(content.getAttribute('data-volume')) || 0.1;

    const oldAudio = document.getElementById('current-audio');
    if (oldAudio) {
        oldAudio.pause();
        oldAudio.remove();
    }

    if (soundSrc) {
        const newAudio = document.createElement('audio');
        newAudio.id = 'current-audio';
        newAudio.src = soundSrc;
        newAudio.autoplay = true;
        newAudio.loop = true;
        newAudio.volume = isMuted ? 0 : soundVolume;
        document.body.appendChild(newAudio);
        allAudios = [newAudio];
    }
}



  }


if (page.includes("chateau.html")) {
   

 const music = document.getElementById('background-audio');
    const muteBtn = document.getElementById('mute-toggle');
    const muteIcon = document.getElementById('mute-icon');
    const doorSound = new Audio('son/doorvrai.wav');
    doorSound.volume = 1;
    let isMuted = true;
    let allAudios = [music, doorSound];

    function updateMuteIcon() {
      muteIcon.innerHTML = isMuted
        ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM3 10v4h4l5 5V5L7 10H3zm13.19 7.19L19.39 21 21 19.39 5.61 4 4 5.61l4.59 4.59L3 10v4h4l5 5V14.41l3.19 3.19z"/>'
        : '<path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>';
    }

    function updateAllVolumes() {
      allAudios.forEach(audio => {
        audio.muted = isMuted;
      });
    }

    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      music.volume = 0.3;
      updateMuteIcon();
      updateAllVolumes();
    });

    updateMuteIcon();
    updateAllVolumes();

    // === SECTION NAVIGATION ===
    const sections = document.querySelectorAll('.section');
    const arrows = document.querySelectorAll('.nav-arrow');
    const hiddenRooms = document.querySelectorAll('.hidden-room');
    const mapLinks = document.querySelectorAll('.explore-map a');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const revealButtons = document.querySelectorAll('.reveal-btn');
    let currentIndex = 0;

    function showSection(index) {
      sections.forEach((sec, i) => {
        sec.classList.remove('active');
        mapLinks[i].classList.remove('active');
        sec.style.display = 'none';
      });

      sections[index].style.display = 'flex';
      setTimeout(() => {
        sections[index].classList.add('active');
    


        
        mapLinks[index].classList.add('active');
      }, 50);

      header.style.display = (index === 0) ? 'flex' : 'none';
      footer.style.display = (sections[index].id === 'guerre') ? 'block' : 'none';
    }

    // === Navigation flèches ===
    arrows.forEach((arrow, i) => {
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        doorSound.currentTime = 0;
        doorSound.play();
        currentIndex = (i + 1) % sections.length;
        showSection(currentIndex);
      });
    });

    // === Navigation carte ===
    mapLinks.forEach((link, i) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        doorSound.currentTime = 0;
        doorSound.play();
        currentIndex = i;
        showSection(currentIndex);
      });
    });

    // === Bouton retour ===
    const backBtn = document.createElement('button');
    backBtn.textContent = '← Revenir';
    Object.assign(backBtn.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      padding: '10px 20px',
      borderRadius: '20px',
      border: '2px solid white',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      cursor: 'pointer',
      zIndex: 9999
    });
    document.body.appendChild(backBtn);

    backBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        doorSound.currentTime = 0;
        doorSound.play();
        currentIndex--;
        showSection(currentIndex);
      }
    });

    // === Initialisation ===
    showSection(0);
    // === Révéler les hidden-room sur clic ===
revealButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const currentRoom = sections[index].querySelector('.hidden-room');
    if (currentRoom) currentRoom.classList.toggle('reveal');
  });
});


    // === Explosions ===
    const guerreSection = document.getElementById('guerre');

    function createExplosion() {
      const explosion = document.createElement('img');
      explosion.src = 'image/explosion.gif';
      explosion.className = 'explosion';

      const x = Math.random() * guerreSection.offsetWidth;
      const y = Math.random() * guerreSection.offsetHeight;

      explosion.style.left = `${x}px`;
      explosion.style.top = `${y}px`;

      guerreSection.appendChild(explosion);

      setTimeout(() => {
        explosion.remove();
      }, 1000);
    }

    const triggerExplosions = () => {
      const interval = setInterval(() => {
        if (!guerreSection.classList.contains('active')) {
          clearInterval(interval);
        } else {
          createExplosion();
        }
      }, 800);
    };

    const observer = new MutationObserver(() => {
      if (guerreSection.classList.contains('active')) {
        triggerExplosions();
      }
    });

    observer.observe(guerreSection, { attributes: true, attributeFilter: ['class'] });




    const phrases = [
      "T’as vu mes flammes ? J’suis pas une chandelle hein !",
      "Je brûle que parce que je veux bien !",
      "Encore toi ? J’ai pas signé pour ça !",
      "Si tu me laisses tranquille, je t’éclaire peut-être.",
      "Attention, je suis chaud... très chaud.",
      "T'es pas obligé de me fixer comme ça hein.",
      "Hauru va me tuer si j’en fais trop...",
      "Tu sais que je suis littéralement un cœur ?",
      "Le feu, c’est un art. Pas un barbecue."
    ];

    const dialogueDiv = document.querySelector('.calcifer-dialogue');

    function changePhrase() {
      const random = Math.floor(Math.random() * phrases.length);
      dialogueDiv.textContent = `« ${phrases[random]} »`;
    }

    setInterval(changePhrase, 8000); // change toutes les 8s
  }
  

  // ========== GARDE SA FORME HUMAINE ==========
if  (page.includes("totoro.html")){
 
  // Génère pluie
  const rainContainer = document.querySelector('.rain');
  const dropsCount = 150;

  function createDrop() {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (Math.random() * 0.8 + 0.8) + 's';
    drop.style.animationDelay = (Math.random() * 5) + 's';
    return drop;
  }

  for(let i = 0; i < dropsCount; i++) {
    rainContainer.appendChild(createDrop());
  }

  // Génère feuilles
  const leavesCount = 50;
  for(let i=0; i<leavesCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = (Math.random() * 100) + 'vw';
    leaf.style.animationDuration = (10 + Math.random() * 15) + 's';
    leaf.style.animationDelay = (Math.random() * 10) + 's';
    document.body.appendChild(leaf);
  }

  // Swap gif et stop mouvement au hover
  const totoroContainer = document.querySelector('.totoro-container');
  const totoroGif = document.getElementById('totoro-gif');

  const gifDefault = "image/totoromarche.gif";
  const gifUmbrella = "image/totoroparapluie.gif";

  totoroContainer.addEventListener('mouseenter', () => {
    totoroGif.src = gifUmbrella;
    totoroContainer.style.animationPlayState = 'paused';
    clearInterval(footprintInterval);
  });

  totoroContainer.addEventListener('mouseleave', () => {
    totoroGif.src = gifDefault;
    totoroContainer.style.animationPlayState = 'running';
    startFootprints();
  });

  // Fonction pour créer une trace de pas
  function createFootprint(x, y) {
    const footprint = document.createElement('div');
    footprint.className = 'footprint';
    footprint.style.left = x + 'px';
    footprint.style.top = y + 'px';
    document.body.appendChild(footprint);

    // Disparition douce avec translation vers le haut
    setTimeout(() => {
      footprint.style.opacity = '0';
      footprint.style.transform = 'translateY(-15px)';
    }, 50);

    // Suppression du DOM après animation
    setTimeout(() => {
      footprint.remove();
    }, 3100);
  }

  // Intervalle pour poser les traces
  let footprintInterval;

  function startFootprints() {
    footprintInterval = setInterval(() => {
      const rect = totoroContainer.getBoundingClientRect();
      // Position approximative des pieds sous Totoro
      const footX = rect.left + rect.width * 0.4;
      const footY = rect.bottom - 10;
      createFootprint(footX, footY);
    }, 600);
  }

  // Démarre les traces au début (page chargée)
  startFootprints();



  


const music = document.getElementById('background-audio');
const muteBtn = document.getElementById('mute-toggle');
const muteIcon = document.getElementById('mute-icon');
let isMuted = true;

function updateMuteIcon() {
  muteIcon.innerHTML = isMuted
    ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM3 10v4h4l5 5V5L7 10H3zm13.19 7.19L19.39 21 21 19.39 5.61 4 4 5.61l4.59 4.59L3 10v4h4l5 5V14.41l3.19 3.19z"/>'
    : '<path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>';
}

function updateAllVolumes() {
  music.muted = isMuted;
  allAudios.forEach(audio => {
    audio.muted = isMuted;
  });
}

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  updateMuteIcon();
  updateAllVolumes();
});

// Au chargement, applique mute
updateMuteIcon();
updateAllVolumes();


updateMuteIcon(); // set icon at start



function playCurrentSlideSound() {
    const currentItem = document.querySelector('.carousel .list .item');
    const content = currentItem.querySelector('.content');
    const soundSrc = content.getAttribute('data-sound');
    const soundVolume = parseFloat(content.getAttribute('data-volume')) || 0.1;

    const oldAudio = document.getElementById('current-audio');
    if (oldAudio) {
        oldAudio.pause();
        oldAudio.remove();
    }

    if (soundSrc) {
        const newAudio = document.createElement('audio');
        newAudio.id = 'current-audio';
        newAudio.src = soundSrc;
        newAudio.autoplay = true;
        newAudio.loop = true;
        newAudio.volume = isMuted ? 0 : soundVolume;
        document.body.appendChild(newAudio);
        allAudios = [newAudio];
    }
}


let lastDirection = 1; // 1 = droite, -1 = gauche

let lastTotoroPos = 0;
let hasDroppedGland = false;

function trackTotoroReturn() {
  setInterval(() => {
    const rect = totoroContainer.getBoundingClientRect();

    // Quand Totoro sort à droite de l'écran
    if (rect.left > window.innerWidth && !hasDroppedGland) {
      hasDroppedGland = true;
    }

    // Quand Totoro revient complètement à gauche : déclenche le gland
    if (rect.left < -180 && hasDroppedGland) {
      createGlandFall();
      hasDroppedGland = false;
    }

    lastTotoroPos = rect.left;
  }, 100);
}


trackTotoroReturn();


const konamiCode = [
  'arrowup', 'arrowup', 
  'arrowdown', 'arrowdown', 
  'arrowleft', 'arrowright', 
  'arrowleft', 'arrowright'
];

let userInput = [];

document.addEventListener('keydown', function(e) {
  userInput.push(e.key.toLowerCase());

  if (userInput.length > konamiCode.length) {
    userInput.shift();
  }

  if (userInput.join(',') === konamiCode.join(',')) {
    const egg = document.getElementById('easterEgg');
    egg.style.display = 'block';
    setTimeout(() => { egg.style.display = 'none'; }, 8000);
    userInput = [];
  }}); }

  if (page.includes("chihiro.html")) {
  const music = document.getElementById('background-audio');
  const muteBtn = document.getElementById('mute-toggle');
  const muteIcon = document.getElementById('mute-icon');
  let isMuted = true;
  let allAudios = [music]; // ← Ajout ici

  function updateMuteIcon() {
    muteIcon.innerHTML = isMuted
      ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM3 10v4h4l5 5V5L7 10H3zm13.19 7.19L19.39 21 21 19.39 5.61 4 4 5.61l4.59 4.59L3 10v4h4l5 5V14.41l3.19 3.19z"/>'
    : '<path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>';
  }

  function updateAllVolumes() {
    allAudios.forEach(audio => {
      audio.muted = isMuted;
    });
  }

  if (music) {
    music.volume = 0.1;
    document.addEventListener('click', () => music.play(), { once: true });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      updateMuteIcon();
      updateAllVolumes();
    });
    updateMuteIcon();
    updateAllVolumes();
  }
}


  // 2. Esprits flottants
  function spawnGhost() {
    const ghost = document.createElement("div");
    ghost.className = "ghost";
    ghost.style.left = Math.random() * window.innerWidth + "px";
    ghost.style.top = Math.random() * window.innerHeight + "px";
    fxLayer.appendChild(ghost);
    setTimeout(() => ghost.remove(), 25000);
  }
  setInterval(spawnGhost, 8000); // ✅ manquait ça !

  // 3. Lanternes
  function spawnLantern() {
    const lantern = document.createElement("div");
    lantern.className = "lantern";
    lantern.style.left = Math.random() * window.innerWidth + "px";
    lantern.style.bottom = "-60px";
    fxLayer.appendChild(lantern);
    setTimeout(() => lantern.remove(), 35000);
  }
  setInterval(spawnLantern, 12000);

  // 4. Feuilles / papiers
  function spawnFloatingItem() {
    const item = document.createElement("div");
    item.className = "floating-item";
    item.style.left = Math.random() * window.innerWidth + "px";
    item.style.bottom = "-30px";
    fxLayer.appendChild(item);
    setTimeout(() => item.remove(), 30000);
  }
  setInterval(spawnFloatingItem, 10000);

  // 5. Transition magique d'entrée
  document.body.classList.add("magic-transition");


  



}// Fin du script
); // Fin de DOMContentLoaded