import sys
path = r'D:\Alphadigify\slider-app\src\components\AnimatedDashboard.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Container variants
text = text.replace('initial="hidden" animate={isActive ? "show" : "hidden"}', 'initial={isActive ? "hidden" : "show"} animate="show"')

# 2. SVGs
text = text.replace('initial={{ strokeDashoffset: 251.2 }}', 'initial={{ strokeDashoffset: isActive ? 251.2 : 251.2 * (1 - m.pct) }}')
text = text.replace('animate={isActive ? { strokeDashoffset: 251.2 * (1 - m.pct) } : { strokeDashoffset: 251.2 }}', 'animate={{ strokeDashoffset: 251.2 * (1 - m.pct) }}')

text = text.replace('initial={{ pathLength: 0 }}', 'initial={{ pathLength: isActive ? 0 : 1 }}')
text = text.replace('animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}', 'animate={{ pathLength: 1 }}')

text = text.replace('initial={{ opacity: 0, scale: 0 }}', 'initial={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }}')
text = text.replace('animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}', 'animate={{ opacity: 1, scale: 1 }}')

text = text.replace('initial={{ opacity: 0 }}', 'initial={{ opacity: isActive ? 0 : 0.1 }}')
text = text.replace('animate={isActive ? { opacity: 0.1 } : { opacity: 0 }}', 'animate={{ opacity: 0.1 }}')

text = text.replace('initial={{ height: 0, y: 250 }}', 'initial={{ height: isActive ? 0 : d.g, y: isActive ? 250 : 250 - d.g }}')
text = text.replace('animate={isActive ? { height: d.g, y: 250 - d.g } : { height: 0, y: 250 }}', 'animate={{ height: d.g, y: 250 - d.g }}')

text = text.replace('initial={{ width: 0 }}', 'initial={{ width: isActive ? 0 : d.g }}')
text = text.replace('animate={isActive ? { width: d.g } : { width: 0 }}', 'animate={{ width: d.g }}')

text = text.replace('initial={{ width: "0%" }}', 'initial={{ width: isActive ? "0%" : `${item.progress}%` }}')
text = text.replace('animate={isActive ? { width: `${item.progress}%` } : { width: "0%" }}', 'animate={{ width: `${item.progress}%` }}')

text = text.replace('initial={{ strokeDashoffset: 100 }}', 'initial={{ strokeDashoffset: isActive ? 100 : 100 - stat.pct }}')
text = text.replace('animate={isActive ? { strokeDashoffset: 100 - stat.pct } : { strokeDashoffset: 100 }}', 'animate={{ strokeDashoffset: 100 - stat.pct }}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated AnimatedDashboard.tsx successfully!')
