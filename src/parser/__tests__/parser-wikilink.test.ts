import { MarkdownParser } from '../../parser';

describe('MarkdownParser - Wikilinks', () => {
  let parser: MarkdownParser;

  beforeEach(async () => {
    parser = await MarkdownParser.create();
  });

  it('hides the brackets and underlines the wikilink text', () => {
    const result = parser.extractDecorations('See [[Target Page]] for details.');

    expect(result.filter((decoration) => decoration.type === 'hide')).toEqual([
      { startPos: 4, endPos: 6, type: 'hide' },
      { startPos: 17, endPos: 19, type: 'hide' },
    ]);
    expect(result.filter((decoration) => decoration.type === 'wikilink')).toEqual([
      { startPos: 6, endPos: 17, type: 'wikilink' },
    ]);
  });

  it('does not hide brackets inside code', () => {
    const result = parser.extractDecorations('`[[Target]]` and [[Visible]]');

    expect(result.filter((decoration) => decoration.type === 'wikilink')).toEqual([
      { startPos: 19, endPos: 26, type: 'wikilink' },
    ]);
  });
});
