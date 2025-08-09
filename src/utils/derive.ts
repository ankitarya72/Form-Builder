export function evaluateFormula(formula: string, values: Record<string, any>) {
  if (!formula) return '';
  // Replace placeholders with JSON-encoded values
  const replaced = formula.replace(/{{\s*([\w-]+)\s*}}/g, (_, id) => {
    const v = values[id];
    // JSON.stringify undefined -> undefined (we make it null)
    return JSON.stringify(v ?? '');
  });

  try {
    // Create a Function that returns the expression result.
    // NOTE: This executes JS in-browser — acceptable for a local front-end assignment,
    // but DO NOT run untrusted formulas in a production environment.
    // We wrap in parentheses to allow statements like objects.
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${replaced});`);
    return fn();
  } catch (e) {
    console.warn('Formula eval error:', e);
    return '';
  }
}