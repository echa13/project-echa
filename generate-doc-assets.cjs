const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const docsDir = path.join(process.cwd(), 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

const items = [
  {
    name: 'useState-excalidraw.png',
    title: 'useState in CRM',
    lines: [
      'useState stores dynamic CRM state',
      '• customers list',
      '• current search text',
      '• active tab Customer/Loyalty',
      '• add-customer dialog state',
      '• form inputs for new customer',
    ],
  },
  {
    name: 'useEffect-excalidraw.png',
    title: 'useEffect in CRM',
    lines: [
      'useEffect handles side effects',
      '• load customer list from localStorage',
      '• save customers after updates',
      '• focus search input on mount',
      '• focus name input when dialog opens',
    ],
  },
  {
    name: 'useRef-excalidraw.png',
    title: 'useRef in CRM',
    lines: [
      'useRef stores DOM refs without rerender',
      '• focus search input on load',
      '• focus new-customer name field',
      '• reuse DOM node refs across renders',
    ],
  },
  {
    name: 'useState-screenshot.png',
    title: 'useState Code',
    lines: [
      'const [customers, setCustomers] = useState(defaultCustomers);',
      'const [search, setSearch] = useState("\"");',
      'const [activeTab, setActiveTab] = useState("customer");',
      'const [openDialog, setOpenDialog] = useState(false);',
      'const [form, setForm] = useState({ ... });',
    ],
  },
  {
    name: 'useEffect-screenshot.png',
    title: 'useEffect Code',
    lines: [
      'useEffect(() => {',
      '  const stored = localStorage.getItem("crm_customers");',
      '  if (stored) setCustomers(JSON.parse(stored));',
      '}, []);',
      'useEffect(() => {',
      '  localStorage.setItem("crm_customers", JSON.stringify(customers));',
      '}, [customers]);',
    ],
  },
  {
    name: 'useRef-screenshot.png',
    title: 'useRef Code',
    lines: [
      'const searchInputRef = useRef(null);',
      'const nameInputRef = useRef(null);',
      'useEffect(() => { searchInputRef.current?.focus(); }, []);',
      'useEffect(() => { if (openDialog) nameInputRef.current?.focus(); }, [openDialog]);',
      '<input ref={searchInputRef} ... />',
      '<input ref={nameInputRef} ... />',
    ],
  },
];

items.forEach((item) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg width="1000" height="680" xmlns="http://www.w3.org/2000/svg">\n` +
    `<rect width="1000" height="680" rx="24" fill="#f8fafc"/>\n` +
    `<rect x="24" y="24" width="952" height="632" rx="20" fill="#ffffff" stroke="#60a5fa" stroke-width="4"/>\n` +
    `<text x="60" y="90" fill="#0f172a" font-family="Arial, sans-serif" font-size="36" font-weight="700">${item.title}</text>\n` +
    item.lines.map((line, index) =>
      `<text x="60" y="150" dy="${index * 42}" fill="#334155" font-family="Arial, sans-serif" font-size="22">${line}</text>\n`
    ).join('') +
    `</svg>`;

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1000 },
  });
  const png = resvg.render();
  fs.writeFileSync(path.join(docsDir, item.name), png.asPng());
});

console.log('Created docs PNGs in', docsDir);
