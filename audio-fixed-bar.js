document.addEventListener(&#39;DOMContentLoaded&#39;, function() {
  const playButtons = document.querySelectorAll(&#39;.play-button&#39;);
  const audioPlayer = document.getElementById(&#39;audio-player&#39;);
  const channelImage = document.getElementById(&#39;channel-image&#39;);
  const channelTitle = document.getElementById(&#39;channel-title&#39;);
  const channelLabels = document.getElementById(&#39;channel-labels&#39;);
  const fixedBar = document.querySelector(&#39;.fixed-bar&#39;);

  // Function to load saved state from localStorage
  function loadState() {
    const savedAudioSrc = localStorage.getItem(&#39;audioSrc&#39;);
    const savedImageSrc = localStorage.getItem(&#39;imageSrc&#39;);
    const savedTitle = localStorage.getItem(&#39;title&#39;);
    const savedLabels = localStorage.getItem(&#39;labels&#39;);
    const isPlaying = localStorage.getItem(&#39;isPlaying&#39;);
    const barVisible = localStorage.getItem(&#39;barVisible&#39;);

    if (savedAudioSrc) {
      audioPlayer.src = savedAudioSrc;
      audioPlayer.style.display = &#39;none&#39;;
      channelImage.src = savedImageSrc;
      channelTitle.textContent = savedTitle;
      fixedBar.style.display = barVisible === &#39;true&#39; ? &#39;block&#39; : &#39;none&#39;;

      channelLabels.innerHTML = &#39;&#39;;
      if (savedLabels) {
        savedLabels.split(&#39;,&#39;).forEach(label =&gt; {
          const labelSection = document.createElement(&#39;section&#39;);
          labelSection.textContent = label;
          labelSection.style.marginRight = &#39;5px&#39;;
          labelSection.style.border = &#39;1px solid #ff7e00&#39;;
          labelSection.style.backgroundColor = &#39;black&#39;;
          labelSection.style.borderRadius = &#39;50px&#39;;
          labelSection.style.padding = &#39;2px 10px&#39;;
          channelLabels.appendChild(labelSection);
        });
      }

      if (isPlaying === &#39;true&#39;) {
        audioPlayer.play();
      }
    }
  }

  // Function to save current state to localStorage
  function saveState() {
    localStorage.setItem(&#39;audioSrc&#39;, audioPlayer.src);
    localStorage.setItem(&#39;imageSrc&#39;, channelImage.src);
    localStorage.setItem(&#39;title&#39;, channelTitle.textContent);
    localStorage.setItem(&#39;labels&#39;, Array.from(channelLabels.children).map(label =&gt; label.textContent).join(&#39;,&#39;));
    localStorage.setItem(&#39;isPlaying&#39;, !audioPlayer.paused);
    localStorage.setItem(&#39;barVisible&#39;, fixedBar.style.display === &#39;block&#39;);
  }

  playButtons.forEach(button =&gt; {
    button.addEventListener(&#39;click&#39;, function(event) {
      event.preventDefault();
      const audioSource = this.getAttribute(&#39;data-audio&#39;);
      const imageSource = this.getAttribute(&#39;data-image&#39;);
      const title = this.getAttribute(&#39;data-title&#39;);
      const labels = this.getAttribute(&#39;data-labels&#39;).split(&#39;,&#39;);

      audioPlayer.src = audioSource;
      audioPlayer.style.display = &#39;none&#39;;
      audioPlayer.play();
      channelImage.src = imageSource;
      channelTitle.textContent = title;
      fixedBar.style.display = &#39;block&#39;;

      channelLabels.innerHTML = &#39;&#39;;
      labels.forEach(label =&gt; {
        const labelSection = document.createElement(&#39;section&#39;);
        labelSection.textContent = label;
        labelSection.style.marginRight = &#39;5px&#39;;
        labelSection.style.border = &#39;1px solid #ff7e00&#39;;
        labelSection.style.backgroundColor = &#39;black&#39;;
        labelSection.style.borderRadius = &#39;50px&#39;;
        labelSection.style.padding = &#39;2px 10px&#39;;
        channelLabels.appendChild(labelSection);
      });

      saveState();
    });
  });

  audioPlayer.addEventListener(&#39;pause&#39;, saveState);
  audioPlayer.addEventListener(&#39;play&#39;, saveState);

  loadState();
});