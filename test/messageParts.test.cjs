const test = require('node:test');
const assert = require('node:assert/strict');
const messageParts = require('../messageParts');

test('parses command, bot name and extra', () => {
  const r = messageParts('/echo@partiibot hello world');
  assert.equal(r.command, 'echo');
  assert.equal(r.botName, 'partiibot');
  assert.equal(r.extra, 'hello world');
});

test('handles command without args', () => {
  const r = messageParts('/hashnodefeatured');
  assert.equal(r.command, 'hashnodefeatured');
  assert.equal(r.botName, null);
  assert.equal(r.extra, null);
});
