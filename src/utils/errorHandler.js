
export function logError(error, context = '') {
  console.error(`[HexaNest Error] ${context}:`, error);
}

export function tryCatchWrapper(fn, context = '') {
  try {
    fn();
  } catch (error) {
    logError(error, context);
  }
}
export function handleError(error) {
  console.error('HexaNest Error:', error);
}
