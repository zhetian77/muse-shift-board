// M1 minimal render only: shows example board summary. Full board editing is M2.
(function () {
  var board = window.ShiftCore.exampleBoard();
  document.getElementById('banner').textContent = window.ShiftCore.TRUTH_BANNER;
  document.getElementById('stats').textContent = '席位 ' + board.seats.length + ' ｜ 任务 ' + board.tasks.length + ' ｜ 记忆 ' + board.memory.length;
  document.getElementById('board').textContent = board.tasks.map(function (t) { return t.id + ' ' + t.title + ' [' + t.status + ']'; }).join('\n');
})();
