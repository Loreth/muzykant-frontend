export class TextUtils {
  static limitMaxLines(event: Event, maxLines: number): void {
    const text = (event.target as HTMLTextAreaElement).value;
    if (text.length > 0) {
      const lineCount = 1 + text.replace(/[^\n]/g, '').length;
      if (lineCount > maxLines) {
        const textArray = text.split('\n');
        (event.target as HTMLTextAreaElement).value = textArray.reduce((result, line, lineNum) => {
          if (lineNum < maxLines) {
            return result.concat('\n').concat(line);
          }
          return result.concat(line);
        });
      }
    }
  }
}
