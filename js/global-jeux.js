document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;
  // ========== GESTION DU QUIZZ ==========
  if (page.includes("quizz.html")) {
   
    const questions = [
      {
        question: "Tu préfères passer ton temps :",
        answers: [
          { text: "À prendre soin des autres ", character: "Sophie" },
          { text: "À rêver et imaginer ", character: "Chihiro" },
          { text: "À te balader dans la nature ", character: "Totoro" },
          { text: "À défendre ta forêt ", character: "Mononoké" }
        ]
      },
      {
        question: "Quel est ton endroit préféré ?",
        answers: [
          { text: "Un château magique ", character: "Sophie" },
          { text: "Un monde mystique ", character: "Chihiro" },
          { text: "Une forêt enchantée ", character: "Totoro" },
          { text: "Les montagnes sauvages ", character: "Mononoké" }
        ]
      },
      {
        question: "Ton animal totem :",
        answers: [
          { text: "Un corbeau", character: "Sophie" },
          { text: "Un dragon ", character: "Chihiro" },
          { text: "Un esprit de la forêt ", character: "Totoro" },
          { text: "Un loup blanc ", character: "Mononoké" }
        ]
      },
      {
        question: "Quelle qualité te définit le mieux :",
        answers: [
          { text: "Déterminée et pleine de ressources", character: "Sophie" },
          { text: "Curieuse et courageuse malgré la peur ", character: "Chihiro" },
          { text: "Discrete mais profondément bienveillante ", character: "Totoro" },
          { text: "Sauvage, libre et loyale ", character: "Mononoké" }
        ]
      }
    ];

    const characterImages = {
      "Sophie": "../image/sophie.gif",
      "Chihiro": "../image/chihiro-quizz.gif",
      "Totoro": "../image/totoroquizz.gif",
      "Mononoké": "../image/monono.gif"
    };

    const quizContainer = document.getElementById("quiz");
    const resultContainer = document.getElementById("result");
    let currentQuestion = 0;
    let answersCount = {};

    //affiche les questions 
    function showQuestion() {
      const q = questions[currentQuestion];
      quizContainer.innerHTML = `<div class="question"><h2>${q.question}</h2></div>`; //un affiche par question

      q.answers.forEach(answer => {
        const btn = document.createElement("button");// créer un bouton pour chaque réponse et met le texte du bouton à la réponse
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(answer.character);
        quizContainer.querySelector(".question").appendChild(btn);
      });
    }

    function selectAnswer(character) { //on additionne la réponse choisi au compte du personnage et tant qu'il reste des questions on montre les questions
      answersCount[character] = (answersCount[character] || 0) + 1;
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }
    function restartQuizz() { //on efface la totalité du quizz et on le restart ainsi que le resultat qui est effacé
      currentQuestion = 0;
      answersCount = {};
      resultContainer.innerHTML = "";
      showQuestion();
    }

    function showResult() { // on affiche les resultats  avec un gif et le petit texte qui change et  on compare a et b pour savoir qui a le plus de resultats
      const topCharacter = Object.keys(answersCount).reduce((a, b) => answersCount[a] > answersCount[b] ? a : b);
      quizContainer.innerHTML = "";
      resultContainer.innerHTML = `
        <p>Tu es <strong>${topCharacter}</strong> ! ✨</p>
        <img id="character-img" src="${characterImages[topCharacter]}" alt="${topCharacter}">
        <br>
        <button onclick="location.reload()">Rejouer </button>
      `;
    }


    showQuestion();
  }

  // ========== JEU POTION MAGIQUE ==========
if (page.includes("potionmagique.html")) {
  const ingredientPool = [
      { name: 'plante', img: 'https://img.icons8.com/?size=100&id=OKMC0MrrQY5I&format=png&color=000000' },
      { name: 'fiole', img: 'https://img.icons8.com/?size=100&id=mvl6qRkeZvoH&format=png&color=000000' },
      { name: 'cristal', img: 'https://img.icons8.com/?size=100&id=11647&format=png&color=000000' },
      { name: 'champi', img: 'https://img.icons8.com/?size=100&id=mUly7vwqarOM&format=png&color=000000' },
      { name: 'corne', img: 'https://img.icons8.com/?size=100&id=jcZfqFAM84td&format=png&color=000000' },
      { name: 'pierre', img: 'https://img.icons8.com/?size=100&id=37409&format=png&color=000000' },
      { name: 'plume', img: 'https://img.icons8.com/?size=100&id=45116&format=png&color=000000' },
      { name: 'œil', img: 'https://img.icons8.com/?size=100&id=oPEK4rMwDqgk&format=png&color=000000' }
    ];

    const ingredientsDiv = document.getElementById('ingredients');
    const cauldron = document.getElementById('cauldron');
    const resultMessage = document.getElementById('resultMessage');
    const resetBtn = document.getElementById('resetBtn');
    const mixBtn = document.getElementById('mixBtn');
    const recipeDisplay = document.getElementById('recipeDisplay');

    let current = [];
    let recipe = [];

    function shuffle(array) {
      return [...array].sort(() => 0.5 - Math.random());
    }

    function randomLibrary() {
      const shuffled = shuffle(ingredientPool);
      return shuffled.slice(0, 5);
    }

    function randomRecipe(lib) {
      return shuffle(lib).slice(0, 3).map(i => i.name);
    }

    function resetGame() {
      ingredientsDiv.innerHTML = '';
      cauldron.innerHTML = '';
      resultMessage.textContent = '';
      current = [];

      const library = randomLibrary();
      recipe = randomRecipe(library);

      recipeDisplay.textContent = `Recette : ${recipe.join(', ')}`;

      library.forEach(item => {
        const img = document.createElement('img');
        img.src = item.img;
        img.className = 'ingredient';
        img.draggable = true;
        img.dataset.name = item.name;
        img.title = item.name;

        img.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', item.name);
        });

        ingredientsDiv.appendChild(img);
      });

      resetBtn.style.display = 'none';
    }

    cauldron.addEventListener('dragover', e => e.preventDefault());

    cauldron.addEventListener('drop', e => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      if (!current.includes(data)) {
        current.push(data);
        const img = document.createElement('img');
        const ref = [...ingredientsDiv.querySelectorAll('.ingredient')].find(i => i.dataset.name === data);
        img.src = ref.src;
        img.style.width = '40px';
        img.style.margin = '5px';
        cauldron.appendChild(img);
      }
    });

    function checkPotion() {
      if (current.length < 3) {
        resultMessage.textContent = '🧪 Il manque des ingrédients...';
        return;
      }
      if (arraysEqual(current, recipe)) {
        resultMessage.textContent = '🎉 Potion réussie !';
      } else {
        resultMessage.textContent = '💥 Oups, la potion a explosé !';
        const boom = document.createElement('img');
        boom.src = '../image/explosion.gif';
        boom.className = 'explosion';
        cauldron.appendChild(boom);
      }
      resetBtn.style.display = 'inline-block';
    }

    function arraysEqual(a, b) {
      return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
    }

    resetBtn.addEventListener('click', resetGame);
    mixBtn.addEventListener('click', checkPotion);

    resetGame();
  }

  // ========== Noireaudes ==========
  else if (page.includes("attrapenoireaudes.html")) {
   


    const game = document.getElementById('game');
    const panier = document.getElementById('panier');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const totoro = document.getElementById('totoro');
    const startBtn = document.getElementById('startBtn');
    const rejouerBtn = document.getElementById('rejouer');

    let score = 0;
    let timeLeft = 30;
    let gameTimer;
    let spawner;

    function createNoiraude() {
      const noiraude = document.createElement('div');
      noiraude.classList.add('noiraude');
      noiraude.style.left = Math.random() * (game.clientWidth - 40) + 'px';
      game.appendChild(noiraude);

      let pos = 0;
      const fall = setInterval(() => {
        if (pos > game.clientHeight - 60) {
          clearInterval(fall);
          noiraude.remove();
        } else {
          pos += 4;
          noiraude.style.top = pos + 'px';

          const panierX = panier.offsetLeft;
          const noiraudeX = noiraude.offsetLeft;

          if (
            pos > game.clientHeight - 100 &&
            noiraudeX > panierX - 20 &&
            noiraudeX < panierX + 100
          ) {
            score++;
            scoreDisplay.textContent = 'Score : ' + score;
            clearInterval(fall);
            noiraude.remove();

            if (score === 20) triggerTotoro();
          }
        }
      }, 20);
    }

    function triggerTotoro() {
      totoro.style.display = 'block';
      let x = -150;
      const move = setInterval(() => {
        x += 4;
        totoro.style.left = x + 'px';
        if (x > game.clientWidth) clearInterval(move);
      }, 20);
    }

    function gameLoop() {
      panier.style.display = 'block';
      score = 0;
      timeLeft = 30;
      scoreDisplay.textContent = 'Score : 0';
      timerDisplay.textContent = 'Temps : 30s';

      gameTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = 'Temps : ' + timeLeft + 's';
        if (timeLeft <= 0) {
          clearInterval(gameTimer);
          clearInterval(spawner);
          timerDisplay.textContent = "Temps : 0s";
          alert("Temps écoulé ! Tu as attrapé " + score + " noiraudes !");
          rejouerBtn.style.display = 'inline-block';
        }
      }, 1000);

      spawner = setInterval(() => {
        createNoiraude();
      }, 600);
    }

    startBtn.addEventListener('click', () => {
      startBtn.style.display = 'none';
      gameLoop();
    });

    rejouerBtn.addEventListener('click', () => {
      location.reload();
    });

    document.addEventListener('mousemove', (e) => {
      panier.style.left = e.clientX - 50 + 'px';
    });

  }

  // ========== GARDE SA FORME HUMAINE ==========
 else{
 
    const allFoods = [
      { name: "Ramen", src: "https://img.icons8.com/?size=100&id=5283&format=png&color=000000" },
      { name: "Onigiri", src: "https://img.icons8.com/?size=100&id=icIdd6atyoSP&format=png&color=000000" },
      { name: "Poisson", src: "https://img.icons8.com/?size=100&id=37387&format=png&color=000000" },
      { name: "Tarte", src: "https://img.icons8.com/?size=100&id=20876&format=png&color=000000" },
      { name: "Fruits", src: "https://img.icons8.com/?size=100&id=UQo9pwHdnxhj&format=png&color=000000" },
      { name: "Beignet", src: "https://img.icons8.com/?size=100&id=5zkRvVM8j38f&format=png&color=000000" },
      { name: "Tacos", src: "https://img.icons8.com/?size=100&id=d8xgvuLH67az&format=png&color=000000" }
    ];

    const foodGrid = document.getElementById('foodGrid');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');

    let correct = 0;
    let gameOver = false;

//Melange la nourriture et choisis au hasard un indice parmi les quatres pour définir un indice "safe"
    function shuffleFoods() {
      const choices = [...allFoods].sort(() => 0.5 - Math.random()).slice(0, 4);
      const safeIndex = Math.floor(Math.random() * 4);
      return { choices, safeIndex };
    }
//Créer les rounds
    function renderRound() {
      foodGrid.innerHTML = '';
      message.textContent = '';
      const { choices, safeIndex } = shuffleFoods(); // on choisit l'indice safe

      choices.forEach((food, index) => {
        const div = document.createElement('div');
        div.className = 'food-item';
        div.innerHTML = `<img src="${food.src}" alt="${food.name}"><br>${food.name}`; // on affiche tout 
        div.addEventListener('click', () => {
          if (gameOver) return;
          if (index === safeIndex) {
            correct++;
            if (correct >= 5) {
              message.textContent = "🎉 Tu as gardé ta forme humaine !";
              gameOver = true;
              restartBtn.style.display = 'inline-block';
            } else {
              message.textContent = "✅ Bon choix !";
              setTimeout(renderRound, 1000);
            }
          } else {
            message.textContent = "🐷 Oups ! Tu t'es transformé...";
            gameOver = true;
            restartBtn.style.display = 'inline-block';
          }
        });
        foodGrid.appendChild(div);
      });
    }

    restartBtn.addEventListener('click', () => {
      correct = 0;
      gameOver = false;
      restartBtn.style.display = 'none';
      renderRound();
    });

    renderRound();
  }
});