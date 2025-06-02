document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nomInput = document.getElementById('nom');
  const messageInput = document.getElementById('message');
  const successMsg = document.getElementById('successMessage');
  const blingSound = document.getElementById('blingSound');

  const bubble = document.createElement('div');
  bubble.className = 'popup-bubble';
  document.body.appendChild(bubble);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom = nomInput.value.trim();
    const message = messageInput.value.toLowerCase();

    let text = `Merci ${nom} pour votre message !`;

    if (message.includes('super') || message.includes('incroyable') || message.includes('magnifique')) {
      text = `Merci ${nom} pour votre gentil message !`;
    } else if (message.includes('horrible') || message.includes('nul')) {
      text = `Merci ${nom} pour votre critique, on prend note.`;
    }

    bubble.innerText = text;
    bubble.style.opacity = '1';
    bubble.style.right = '20px';

    blingSound.currentTime = 0;
    blingSound.play();

    setTimeout(() => {
      bubble.style.opacity = '0';
      bubble.style.right = '-500px';
    }, 4000);

    form.reset();
  });
});
