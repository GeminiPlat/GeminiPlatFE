export function getFileLanguage(filePath: string): string {
    const extension = filePath.split('.').pop()?.toLowerCase() || '';

    const languageMap: { [key: string]: string } = {
        'js': 'javascript',
        'json': 'json',
        'html': 'html',
        'css': 'css',
        'md': 'markdown',
        'yaml': 'yaml',
        'yml': 'yaml',
        'xml': 'xml',
        'sql': 'sql',
        'java': 'java',
        'tsx': 'javascript',
        'ts': 'javascript',
        'txt': 'plaintext'
    };

    return languageMap[extension] || 'plaintext';
}