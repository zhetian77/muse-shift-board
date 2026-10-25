const test = require('node:test');
const assert = require('node:assert');
const { exampleBoard, createTask, TRUTH_BANNER } = require('../core.js');
test('验收为空不能新建', () => {
  const b = exampleBoard();
  assert.throws(() => createTask(b, { title: 'x', accept: [] }), /验收标准至少 1 条/);
  assert.throws(() => createTask(b, { title: '', accept: ['a'] }), /任务名不能为空/);
});
test('填 1 条验收能新建进 Inbox 且 rev +1', () => {
  const b = exampleBoard(); const rev = b.rev;
  const t = createTask(b, { title: '新任务', accept: ['完成一件事'] });
  assert.equal(t.status, 'inbox'); assert.equal(b.rev, rev + 1);
});
test('示例记录全部 example: true，横幅一字不差', () => {
  const b = exampleBoard();
  assert.ok(b.seats.every(s => s.example === true));
  assert.ok(b.tasks.every(t => t.example === true));
  assert.ok(b.memory.every(m => m.example === true));
  assert.equal(TRUTH_BANNER, '面板不能自动跨账号切换，也读不到 Muse 额度。额度靠当班号自报。唯一手动步：打开下一个 Muse 账号，粘贴接手提示词。');
});
