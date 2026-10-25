(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
  else { root.ShiftCore = api; }
})(typeof self !== 'undefined' ? self : this, function () {
  var TRUTH_BANNER = '面板不能自动跨账号切换，也读不到 Muse 额度。额度靠当班号自报。唯一手动步：打开下一个 Muse 账号，粘贴接手提示词。';
  function exampleBoard() {
    return {
      schemaVersion: 1, app: 'muse-shift-board', rev: 42,
      exportedAt: '2026-10-25T21:05:00+08:00', exportedBy: 'seat-a',
      seats: [{ id: 'seat-a', name: '示例-A号', role: 'executor', device: '示例-笔记本', quota: 60, exhaustedAt: null, example: true }],
      tasks: [{
        id: 'T-261025-a01', title: '示例：整理虚构竞品价格表',
        goal: '做一张 10 个虚构竞品的价格对比表，供定价讨论用',
        accept: [
          { text: '表里有 10 个竞品，每行都有价格和来源列', checked: true, checkedBy: 'seat-c', checkedAt: '2026-10-25T21:00:00+08:00' },
          { text: '价格与来源逐行核对一致', checked: false, checkedBy: null, checkedAt: null }
        ],
        status: 'doing', prevStatus: null, role: 'executor', owner: 'seat-a', submittedBy: null,
        steps: [{ at: '2026-10-25T20:40:00+08:00', by: 'seat-a', text: '建好表头，填了 4 个竞品' }],
        artifacts: ['work/price-table.csv'], next: '补齐剩下 6 个竞品的价格和来源',
        readNext: ['work/price-table.csv', 'work/sources.md'],
        createdAt: '2026-10-25T20:10:00+08:00', updatedAt: '2026-10-25T20:40:00+08:00', example: true
      }],
      memory: [{ id: 'M-261025-a01', kind: 'decision', text: '价格统一用美元，保留两位小数', by: 'seat-a', at: '2026-10-25T20:15:00+08:00', example: true }],
      log: [{ id: 'L-261025-a01', at: '2026-10-25T20:50:00+08:00', type: 'handoff', taskId: 'T-261025-a01', from: 'seat-b', to: 'seat-a', fromStatus: 'doing', toStatus: 'doing', reason: 'quota_zero', note: '' }]
    };
  }
  function createTask(board, input) {
    var title = input && input.title ? String(input.title).trim() : '';
    if (!title) { throw new Error('任务名不能为空'); }
    var accept = input.accept || [];
    if (!Array.isArray(accept) || accept.length < 1) { throw new Error('验收标准至少 1 条'); }
    var now = new Date().toISOString();
    var task = {
      id: input.id || ('T-' + now.slice(2, 4) + now.slice(5, 7) + now.slice(8, 10) + '-' + Math.random().toString(36).slice(2, 5)),
      title: title, goal: input.goal || '',
      accept: accept.map(function (a) { return typeof a === 'string' ? { text: a, checked: false, checkedBy: null, checkedAt: null } : a; }),
      status: 'inbox', prevStatus: null, role: input.role || 'executor', owner: input.owner || null, submittedBy: null,
      steps: [], artifacts: input.artifacts || [], next: input.next || '', readNext: input.readNext || [],
      createdAt: now, updatedAt: now, example: false
    };
    board.tasks.push(task);
    board.log.push({ id: 'L-' + Date.now(), at: now, type: 'create', taskId: task.id, from: null, to: null, fromStatus: null, toStatus: 'inbox', reason: '', note: '' });
    board.rev += 1;
    return task;
  }
  return { TRUTH_BANNER: TRUTH_BANNER, exampleBoard: exampleBoard, createTask: createTask };
});
