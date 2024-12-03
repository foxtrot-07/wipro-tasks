// Emoji Data
const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😜", "🤪", "😝", "🤑", "🤗", "🤔", "🤨", "😐", "😑",
  ];
  
  // State to store frequently used emojis
  let frequentEmojis = [];
  
  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const emojiList = document.getElementById('emojiList');
  const frequentList = document.getElementById('frequentList');
  
  // Render emojis dynamically
  function renderEmojis(filter = "") {
    emojiList.innerHTML = "";
    const filteredEmojis = emojis.filter(emoji => emoji.includes(filter));
    filteredEmojis.forEach(emoji => {
      const emojiSpan = document.createElement('span');
      emojiSpan.classList.add('emoji');
      emojiSpan.textContent = emoji;
      emojiSpan.addEventListener('click', () => selectEmoji(emoji));
      emojiList.appendChild(emojiSpan);
    });
  }
  
  // Render frequently used emojis
  function renderFrequentEmojis() {
    frequentList.innerHTML = "";
    frequentEmojis.forEach(emoji => {
      const emojiSpan = document.createElement('span');
      emojiSpan.classList.add('emoji');
      emojiSpan.textContent = emoji;
      frequentList.appendChild(emojiSpan);
    });
  }
  
  // Handle emoji selection
  function selectEmoji(emoji) {
    // Add emoji to frequently used list if not already present
    if (!frequentEmojis.includes(emoji)) {
      if (frequentEmojis.length >= 10) {
        frequentEmojis.pop(); // Keep the list limited to 10
      }
      frequentEmojis.unshift(emoji);
    } else {
      // Move the emoji to the front if it's already present
      frequentEmojis = frequentEmojis.filter(e => e !== emoji);
      frequentEmojis.unshift(emoji);
    }
    renderFrequentEmojis();
  }
  
  // Event Listener for Search
  searchInput.addEventListener('input', (e) => {
    renderEmojis(e.target.value);
  });
  
  // Initial Render
  renderEmojis();
  renderFrequentEmojis();
  