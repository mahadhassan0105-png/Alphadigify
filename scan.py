import os, re

src = r'D:\Alphadigify\slider-app\src'
issues = {
    'localhost_refs': [],
    'hardcoded_secrets': [],
    'missing_env_usage': [],
}

secret_patterns = [r'gsk_[A-Za-z0-9]{40,}', r'sk-[A-Za-z0-9]{40,}']

for root, dirs, files in os.walk(src):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.next']]
    for f in files:
        if not (f.endswith('.ts') or f.endswith('.tsx')):
            continue
        path = os.path.join(root, f)
        rel = path.replace(src + os.sep, '')
        try:
            content = open(path, encoding='utf-8', errors='ignore').read()
            lines = content.splitlines()
            for i, line in enumerate(lines, 1):
                if re.search(r'localhost', line) and not re.search(r'//|NEXTAUTH_URL|process\.env', line):
                    issues['localhost_refs'].append(f'{rel}:{i}: {line.strip()[:100]}')
                for pat in secret_patterns:
                    if re.search(pat, line, re.I):
                        issues['hardcoded_secrets'].append(f'{rel}:{i}: {line.strip()[:80]}')
        except Exception as e:
            pass

for k, v in issues.items():
    print(f'\n=== {k} ({len(v)}) ===')
    for item in v[:20]:
        print(' ', item)

print('\nScan complete.')
