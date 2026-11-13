import { TraceStep, TraceTableRow, BlankQuestion, PresetCase } from '../types/binarySearch';

export const DEFAULT_ARRAY = [14, 16, 21, 22, 24, 37, 38, 41];

export const PRESET_CASES: PresetCase[] = [
  {
    id: 'case_38',
    label: 'key = 38 (画像・試験の典型例)',
    key: 38,
    description: '配列後半の値を探索。3回の比較で添字6に到達して見つかります。',
    expectedResult: 'found',
    expectedIndex: 6,
  },
  {
    id: 'case_22',
    label: 'key = 22 (最初の中央値で即一致)',
    key: 22,
    description: '初期 mid = 3 で t[3] = 22 と一致し、whileループ条件が偽となり0回で終了。',
    expectedResult: 'found',
    expectedIndex: 3,
  },
  {
    id: 'case_14',
    label: 'key = 14 (配列の先頭要素)',
    key: 14,
    description: '左端の要素。high が順次減少し、添字0で見つかります。',
    expectedResult: 'found',
    expectedIndex: 0,
  },
  {
    id: 'case_41',
    label: 'key = 41 (配列の末尾要素)',
    key: 41,
    description: '右端の要素。low が順次増加し、添字7で見つかります。',
    expectedResult: 'found',
    expectedIndex: 7,
  },
  {
    id: 'case_21',
    label: 'key = 21 (前半の要素)',
    key: 21,
    description: '左側サブ配列の探索。添字2で見つかります。',
    expectedResult: 'found',
    expectedIndex: 2,
  },
  {
    id: 'case_25',
    label: 'key = 25 (配列内に存在しない値)',
    key: 25,
    description: '24と37の間。探索範囲が逆転 (low > high) し、「該当データなし」になります。',
    expectedResult: 'not_found',
  },
  {
    id: 'case_10',
    label: 'key = 10 (最小値より小さい値)',
    key: 10,
    description: 'high が 0 より小さくなり (-1)、範囲外となって「該当データなし」になります。',
    expectedResult: 'not_found',
  },
  {
    id: 'case_50',
    label: 'key = 50 (最大値より大きい値)',
    key: 50,
    description: 'low が 7 を超えて (8)、範囲外となって「該当データなし」になります。',
    expectedResult: 'not_found',
  },
];

export const BLANK_QUESTIONS: BlankQuestion[] = [
  {
    id: 'blank_a',
    blankSymbol: '(ア)',
    title: 'high の初期値設定',
    correctAnswer: 'tの要素数 - 1',
    options: [
      'tの要素数',
      'tの要素数 - 1',
      'tの要素数 + 1',
      'low + 1'
    ],
    hint: '配列の添字（インデックス）は 0 から始まります。要素数が8個の場合、末尾の添字は何番になるでしょうか？',
    explanation: '配列の要素数が N のとき、添字は 0 から N-1 までとなります。本問では要素数8のため、high は 8 - 1 = 7 に設定する必要があります。手書きの赤字「7」もこれに対応しています。'
  },
  {
    id: 'blank_i',
    blankSymbol: '(イ)',
    title: 'while ループの継続条件',
    correctAnswer: '(low ≦ high) and (t[mid] ≠ key)',
    options: [
      '(low ≦ high) and (t[mid] ≠ key)',
      '(low < high) and (t[mid] ≠ key)',
      '(low ≦ high) or (t[mid] == key)',
      '(low ≧ high) and (t[mid] ≠ key)'
    ],
    hint: '探索範囲が存在する（左端が右端以下）かつ、まだ目的の値が見つかっていない間ループを続けます。要素が1個（low = high）のときも調べる必要があります。',
    explanation: '探索を続ける条件は「探索範囲が残っている (low ≦ high)」かつ「まだ key が見つかっていない (t[mid] ≠ key)」です。low = high の1要素でも調べる必要があるため等号 ≦ が必須です。一致したらループを抜けます。'
  },
  {
    id: 'blank_u',
    blankSymbol: '(ウ)',
    title: '中央値と目的値の比較分岐',
    correctAnswer: 't[mid] > key',
    options: [
      't[mid] > key',
      't[mid] < key',
      't[mid] == key',
      'mid > key'
    ],
    hint: '次の行12で「high ← mid - 1」として右端を左に寄せています。これは目的の値 key が中央より左側にある場合です。',
    explanation: '直後で high ← mid - 1（探索範囲を左半分にする）をしているため、中央の値 t[mid] が探したい key より大きい（t[mid] > key）ときです。昇順に整列されているので、t[mid] より大きい右側には存在し得ません。'
  },
  {
    id: 'blank_e',
    blankSymbol: '(エ)',
    title: '探索範囲を左半分に絞る更新',
    correctAnswer: 'mid - 1',
    options: [
      'mid - 1',
      'mid + 1',
      'mid',
      'low + 1'
    ],
    hint: '中央の値 t[mid] はすでに key と一致しないことが分かっているため、中央の1つ左側の要素までを新しい右端にします。',
    explanation: 't[mid] は key ではないため、調べる範囲から mid 自体を除外できます。よって新しい右端は mid - 1 となります。'
  },
  {
    id: 'blank_o',
    blankSymbol: '(オ)',
    title: '探索範囲を右半分に絞る更新',
    correctAnswer: 'mid + 1',
    options: [
      'mid + 1',
      'mid - 1',
      'mid',
      'high - 1'
    ],
    hint: 't[mid] < key（中央の値が探す値より小さい）の場合、探す値は中央より右側にあります。',
    explanation: 't[mid] が key より小さいため、左側と中央には key はありません。新しい探索開始位置（左端）は中央の1つ右側、すなわち mid + 1 となります。'
  }
];

export const CODE_LINES = [
  { line: 1, text: '○binarySearch()' },
  { line: 2, text: '  整数型の配列: t ← {14, 16, 21, 22, 24, 37, 38, 41}' },
  { line: 3, text: '  整数型: key, low, high, mid' },
  { line: 4, text: '' },
  { line: 5, text: '  key ← 入力値を取得する' },
  { line: 6, text: '  low ← 0' },
  { line: 7, text: '  high ← (ア) tの要素数 - 1' },
  { line: 8, text: '  mid ← (low + high) ÷ 2' },
  { line: 9, text: '' },
  { line: 10, text: '  while( (イ) (low ≦ high) and (t[mid] ≠ key) )' },
  { line: 11, text: '    if( (ウ) t[mid] > key )' },
  { line: 12, text: '      high ← (エ) mid - 1' },
  { line: 13, text: '    else' },
  { line: 14, text: '      low ← (オ) mid + 1' },
  { line: 15, text: '    endif' },
  { line: 16, text: '    mid ← (low + high) ÷ 2' },
  { line: 17, text: '  endwhile' },
  { line: 18, text: '' },
  { line: 19, text: '  if( low ≦ high )  // low が high 以下' },
  { line: 20, text: '    midを出力する' },
  { line: 21, text: '  else' },
  { line: 22, text: '    "該当データなし"を出力する' },
  { line: 23, text: '  endif' },
];

/**
 * Traces the binary search algorithm execution line by line.
 */
export function generateBinarySearchTrace(array: number[], key: number): {
  steps: TraceStep[];
  tableRows: TraceTableRow[];
} {
  const steps: TraceStep[] = [];
  const tableRows: TraceTableRow[] = [];
  let stepCounter = 0;

  const n = array.length;
  let low = 0;
  let high = n - 1;
  let mid = Math.floor((low + high) / 2);

  const getRangeStr = (l: number, h: number) => {
    if (l > h) return '範囲なし (low > high)';
    return `t[${l}..${h}] = {${array.slice(l, h + 1).join(', ')}}`;
  };

  // Step 1: Line 5 - key input
  steps.push({
    stepIndex: stepCounter++,
    lineNumber: 5,
    codeText: 'key ← 入力値を取得する',
    loopCount: 0,
    phase: 'init',
    low: 0,
    high: 0,
    mid: 0,
    key,
    array,
    midValue: null,
    description: `探索対象の値 key に ${key} が入力されました。`,
    actionSummary: `key = ${key}`,
    activeRange: { start: 0, end: n - 1, valid: true }
  });

  // Step 2: Line 6 - low = 0
  steps.push({
    stepIndex: stepCounter++,
    lineNumber: 6,
    codeText: 'low ← 0',
    loopCount: 0,
    phase: 'init',
    low: 0,
    high: 0,
    mid: 0,
    key,
    array,
    midValue: null,
    description: '探索範囲の左端を表す low を初期値 0 に設定します。',
    actionSummary: 'low = 0',
    activeRange: { start: 0, end: n - 1, valid: true }
  });

  // Step 3: Line 7 - high = (ア) tの要素数 - 1
  high = n - 1;
  steps.push({
    stepIndex: stepCounter++,
    lineNumber: 7,
    codeText: 'high ← (ア) tの要素数 - 1',
    loopCount: 0,
    phase: 'init',
    low: 0,
    high,
    mid: 0,
    key,
    array,
    midValue: null,
    description: `配列 t の要素数は ${n} 個です。末尾の添字は ${n} - 1 = ${high} となり、high に ${high} を代入します。`,
    actionSummary: `high = ${n} - 1 = ${high}`,
    activeRange: { start: 0, end: high, valid: true }
  });

  // Step 4: Line 8 - mid = (low + high) ÷ 2
  mid = Math.floor((low + high) / 2);
  steps.push({
    stepIndex: stepCounter++,
    lineNumber: 8,
    codeText: 'mid ← (low + high) ÷ 2',
    loopCount: 0,
    phase: 'init',
    low: 0,
    high,
    mid,
    key,
    array,
    midValue: array[mid],
    description: `中央の添字 mid を計算します: (${low} + ${high}) ÷ 2 = ${low + high} ÷ 2 = ${mid} (小数点切捨て)。中央の要素は t[${mid}] = ${array[mid]} です。`,
    actionSummary: `mid = (${low} + ${high}) ÷ 2 = ${mid} (t[${mid}] = ${array[mid]})`,
    activeRange: { start: 0, end: high, valid: true }
  });

  // Record initial row in table
  tableRows.push({
    id: `row_init`,
    stepIndex: stepCounter - 1,
    iterationLabel: '初期値',
    lineNumber: 8,
    low,
    high,
    mid,
    midValue: array[mid],
    comparison: `t[${mid}]=${array[mid]} vs key=${key}`,
    actionNote: '初期設定完了',
    remainingRange: getRangeStr(low, high)
  });

  let loopIteration = 0;

  // While loop
  while (true) {
    loopIteration++;
    const condRange = low <= high;
    const condNotEqual = mid >= 0 && mid < n ? array[mid] !== key : true;
    const loopContinue = condRange && condNotEqual;

    // Line 10: while condition check
    steps.push({
      stepIndex: stepCounter++,
      lineNumber: 10,
      codeText: 'while( (イ) (low ≦ high) and (t[mid] ≠ key) )',
      loopCount: loopIteration,
      phase: 'loop_condition',
      low,
      high,
      mid,
      key,
      array,
      midValue: mid >= 0 && mid < n ? array[mid] : null,
      comparisonResult: {
        condition: `(low ≦ high) and (t[mid] ≠ key)`,
        evaluated: loopContinue,
        explanation: `(${low} ≦ ${high}: ${condRange ? '真' : '偽'}) かつ (t[${mid}]=${array[mid]} ≠ ${key}: ${condNotEqual ? '真' : '偽'}) → ${loopContinue ? 'ループ継続' : 'ループ終了'}`
      },
      description: `while ループの条件判定を行います。\n① low ≦ high (${low} ≦ ${high}) は【${condRange ? '真 (範囲あり)' : '偽 (範囲なし)'}】\n② t[${mid}] ≠ key (${array[mid]} ≠ ${key}) は【${condNotEqual ? '真 (まだ不一致)' : '偽 (一致した！)'}】\n両方が真であればループ内へ進みます。判定結果: 【${loopContinue ? '真 → ループ内を実行' : '偽 → ループを抜ける'}】`,
      actionSummary: loopContinue ? `ループ ${loopIteration}回目開始` : 'while条件成立せず終了',
      activeRange: { start: low, end: high, valid: low <= high }
    });

    if (!loopContinue) {
      break;
    }

    // Inside loop: Line 11 - if( t[mid] > key )
    const isGreater = array[mid] > key;
    steps.push({
      stepIndex: stepCounter++,
      lineNumber: 11,
      codeText: 'if( (ウ) t[mid] > key )',
      loopCount: loopIteration,
      phase: 'branch_check',
      low,
      high,
      mid,
      key,
      array,
      midValue: array[mid],
      comparisonResult: {
        condition: `t[${mid}] > key`,
        evaluated: isGreater,
        explanation: `${array[mid]} > ${key} は【${isGreater ? '真' : '偽'}】`
      },
      description: `中央値 t[${mid}] (${array[mid]}) と 探したい値 key (${key}) を比較します。\n${array[mid]} > ${key} は【${isGreater ? '真' : '偽'}】です。\n${isGreater ? `中央の値が大きいので、key は左半分にあります。high を狭めます。` : `中央の値が key 以下なので、key は右半分にあります (else 節へ進み low を進めます)。`}`,
      actionSummary: `t[${mid}] (${array[mid]}) ${isGreater ? '>' : '≦'} key (${key})`,
      activeRange: { start: low, end: high, valid: true }
    });

    if (isGreater) {
      // Line 12: high = mid - 1
      const oldHigh = high;
      high = mid - 1;
      steps.push({
        stepIndex: stepCounter++,
        lineNumber: 12,
        codeText: 'high ← (エ) mid - 1',
        loopCount: loopIteration,
        phase: 'update_high',
        low,
        high,
        mid,
        key,
        array,
        midValue: array[mid],
        description: `high ← mid - 1 を実行します。${mid} - 1 = ${high}。\n探索範囲の右端が ${oldHigh} から ${high} に更新され、左半分に絞られました。`,
        actionSummary: `high ← ${mid} - 1 = ${high}`,
        activeRange: { start: low, end: high, valid: low <= high }
      });
    } else {
      // Line 14: low = mid + 1
      const oldLow = low;
      low = mid + 1;
      steps.push({
        stepIndex: stepCounter++,
        lineNumber: 14,
        codeText: 'low ← (オ) mid + 1',
        loopCount: loopIteration,
        phase: 'update_low',
        low,
        high,
        mid,
        key,
        array,
        midValue: array[mid],
        description: `low ← mid + 1 を実行します。${mid} + 1 = ${low}。\n探索範囲の左端が ${oldLow} から ${low} に更新され、右半分に絞られました。`,
        actionSummary: `low ← ${mid} + 1 = ${low}`,
        activeRange: { start: low, end: high, valid: low <= high }
      });
    }

    // Line 16: mid = (low + high) ÷ 2
    const oldMid = mid;
    mid = Math.floor((low + high) / 2);
    const midVal = mid >= 0 && mid < n ? array[mid] : null;

    steps.push({
      stepIndex: stepCounter++,
      lineNumber: 16,
      codeText: 'mid ← (low + high) ÷ 2',
      loopCount: loopIteration,
      phase: 'recalc_mid',
      low,
      high,
      mid,
      key,
      array,
      midValue: midVal,
      description: `新しい探索範囲 [${low}..${high}] の中央添字 mid を再計算します。\n(${low} + ${high}) ÷ 2 = ${low + high} ÷ 2 = ${mid} (小数点切捨て)。\n中央値は t[${mid}] ${midVal !== null ? `= ${midVal}` : '(範囲外)'} です。`,
      actionSummary: `mid = (${low} + ${high}) ÷ 2 = ${mid}`,
      activeRange: { start: low, end: high, valid: low <= high }
    });

    // Record iteration row in trace table
    tableRows.push({
      id: `row_loop_${loopIteration}`,
      stepIndex: stepCounter - 1,
      iterationLabel: `${loopIteration}回目終了`,
      lineNumber: 16,
      low,
      high,
      mid,
      midValue: midVal,
      comparison: isGreater ? `t[${oldMid}]=${array[oldMid]} > key` : `t[${oldMid}]=${array[oldMid]} < key`,
      actionNote: isGreater ? `high ← ${high}` : `low ← ${low}`,
      remainingRange: getRangeStr(low, high)
    });

    // Safety guard against infinite loops
    if (loopIteration > 25) break;
  }

  // Line 19: if( low ≦ high )
  const found = low <= high;
  steps.push({
    stepIndex: stepCounter++,
    lineNumber: 19,
    codeText: 'if( low ≦ high )  // low が high 以下',
    loopCount: loopIteration,
    phase: 'post_check',
    low,
    high,
    mid,
    key,
    array,
    midValue: mid >= 0 && mid < n ? array[mid] : null,
    comparisonResult: {
      condition: 'low ≦ high',
      evaluated: found,
      explanation: `${low} ≦ ${high} は【${found ? '真 (見つかった)' : '偽 (範囲逆転・見つからず)'}】`
    },
    description: `ループ終了後、目的のデータが見つかったか判定します。\nlow ≦ high (${low} ≦ ${high}) は【${found ? '真' : '偽'}】です。\n${found ? `→ t[${mid}] = ${array[mid]} と key = ${key} が一致しています！` : `→ low が high を超えたため、配列中に ${key} は存在しません。`}`,
    actionSummary: found ? `発見判定: 真 (${low} ≦ ${high})` : `発見判定: 偽 (${low} > ${high})`,
    activeRange: { start: low, end: high, valid: found }
  });

  if (found) {
    // Line 20: midを出力する
    steps.push({
      stepIndex: stepCounter++,
      lineNumber: 20,
      codeText: 'midを出力する',
      loopCount: loopIteration,
      phase: 'output_found',
      low,
      high,
      mid,
      key,
      array,
      midValue: array[mid],
      description: `【探索成功】添字 mid の値 ${mid} を出力します。\nt[${mid}] に目的の値 ${key} が格納されています。`,
      actionSummary: `出力: ${mid}`,
      activeRange: { start: low, end: high, valid: true }
    });
  } else {
    // Line 22: "該当データなし"を出力する
    steps.push({
      stepIndex: stepCounter++,
      lineNumber: 22,
      codeText: '"該当データなし"を出力する',
      loopCount: loopIteration,
      phase: 'output_not_found',
      low,
      high,
      mid,
      key,
      array,
      midValue: mid >= 0 && mid < n ? array[mid] : null,
      description: `【探索失敗】"該当データなし" を出力します。\n配列 t の中に値 ${key} は存在しませんでした。`,
      actionSummary: '出力: "該当データなし"',
      activeRange: { start: low, end: high, valid: false }
    });
  }

  // Add final result row in trace table
  tableRows.push({
    id: `row_final`,
    stepIndex: stepCounter - 1,
    iterationLabel: '最終結果',
    lineNumber: found ? 20 : 22,
    low,
    high,
    mid,
    midValue: mid >= 0 && mid < n ? array[mid] : null,
    comparison: found ? `t[${mid}] == ${key} (一致)` : `low > high (逆転)`,
    actionNote: found ? `mid = ${mid} を出力` : `"該当データなし" を出力`,
    remainingRange: found ? `添字 ${mid} に発見 (t[${mid}]=${array[mid]})` : '該当なし'
  });

  return { steps, tableRows };
}
