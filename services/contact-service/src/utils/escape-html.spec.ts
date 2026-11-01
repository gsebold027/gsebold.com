import { escapeHtml } from './escape-html';

describe('escapeHtml', () => {
  it('escapes markup characters', () => {
    expect(escapeHtml(`<a href="x" onclick='y'>&</a>`)).toBe(
      '&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;&lt;/a&gt;',
    );
  });

  it('leaves plain text unchanged', () => {
    expect(escapeHtml('Olá, tudo bem?\nThanks')).toBe('Olá, tudo bem?\nThanks');
  });
});
