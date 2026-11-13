(function () {
  'use strict';
  const grid = document.getElementById('lesson-grid');
  const dialog = document.getElementById('lesson-dialog');
  const lessons = Array.isArray(window.LESSONS) ? window.LESSONS : [];
  const labels = {crypto:'CRYPTO',forex:'FOREX',gold:'GOLD'};
  let filter = 'all';
  function render() {
    grid.replaceChildren();
    const visible = lessons.filter(item => filter === 'all' || item.category === filter);
    document.getElementById('empty-state').hidden = visible.length > 0;
    visible.forEach((item, index) => {
      const card = document.createElement('article'); card.className = 'lesson-card';
      const meta = document.createElement('div'); meta.className = 'lesson-meta';
      const category = document.createElement('span'); category.className = 'category ' + item.category; category.textContent = labels[item.category] || item.category;
      const number = document.createElement('span'); number.textContent = String(index+1).padStart(2,'0') + ' / ' + String(visible.length).padStart(2,'0'); meta.append(category,number);
      const heading = document.createElement('h3'); heading.textContent = item.title;
      const summary = document.createElement('p'); summary.textContent = item.summary;
      const bottom = document.createElement('div'); bottom.className = 'lesson-bottom';
      const info = document.createElement('span'); info.textContent = item.level + ' · ' + item.minutes + ' min read';
      const open = document.createElement('button'); open.className = 'read-btn'; open.textContent = 'Read lesson ↗'; open.addEventListener('click', () => showLesson(item));
      bottom.append(info,open); card.append(meta,heading,summary,bottom); grid.append(card);
    });
  }
  function showLesson(item) {
    document.getElementById('dialog-category').textContent = labels[item.category] || item.category;
    document.getElementById('dialog-title').textContent = item.title;
    document.getElementById('dialog-summary').textContent = item.summary;
    const list = document.getElementById('dialog-points'); list.replaceChildren();
    item.points.forEach(point => {const li = document.createElement('li'); li.textContent = point; list.append(li);});
    dialog.showModal();
  }
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => {const selected = b === button; b.classList.toggle('active',selected); b.setAttribute('aria-pressed',String(selected));});
    render();
  }));
  document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
  render();
})();
