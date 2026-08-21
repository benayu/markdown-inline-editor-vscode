import { MarkdownParser } from '../../parser';

describe('MarkdownParser - Wikilinks', () => {
  let parser: MarkdownParser;

  beforeEach(async () => {
    parser = await MarkdownParser.create();
  });

  it('hides the opening and closing double brackets', () => {
    const result = parser.extractDecorations('See [[Target Page]] for details.');

    expect(result.filter((decoration) => decoration.type === 'wikilink')).toEqual([
      { startPos: 4, endPos: 6, type: 'wikilink' },
      { startPos: 17, endPos: 19, type: 'wikilink' },
    ]);
  });

  it('does not hide brackets inside code', () => {
    const result = parser.extractDecorations('`[[Target]]` and [[Visible]]');

    expect(result.filter((decoration) => decoration.type === 'wikilink')).toEqual([
      { startPos: 17, endPos: 19, type: 'wikilink' },
      { startPos: 26, endPos: 28, type: 'wikilink' },
    ]);
  });
});
