import LapRF, { SOR, EOR, ESC, ESC_OFFSET } from "./index";

let laprf: any = new LapRF();

describe("LapRF#unescape", () => {
  test("removes escapes", () => {
    const expected = Buffer.from([SOR, ESC, EOR]);
    laprf.unescape(Buffer.from([SOR, ESC, ESC + ESC_OFFSET, EOR]));
    const escaped = laprf.toBuffer();
    expect(escaped).toEqual(expected);
  });
});

describe("LapRF#escape", () => {
  test("places escapes", () => {
    const expected = Buffer.from([
      SOR,
      ESC,
      ESC + ESC_OFFSET,
      ESC,
      SOR + ESC_OFFSET,
      ESC,
      EOR + ESC_OFFSET,
      EOR
    ]);
    const escaped = laprf.escape(Buffer.from([SOR, ESC, SOR, EOR, EOR]));
    expect(escaped).toEqual(expected);
  });
});
