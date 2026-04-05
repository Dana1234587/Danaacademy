const fs = require('fs');
const path = require('path');
const dirs = [
  '1-ac-voltage',
  '2-ac-circuits',
  '3-summary-laws',
  '4-questions',
  '5-impedance',
  '6-rlc-circuit',
  '7-transformer',
  '8-transformer-worksheet'
];

const basePath = 'src/app/courses/physics-2008/physics-2008-second-semester/6-ac-circuits';

const newButton = `                                <Button variant="ghost" className="w-full justify-start text-primary" asChild>
                                    <a href="https://drive.google.com/file/d/18R-jbSbF2H7gRRi_6YYFSYblhtYHv53Y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                        <FileText className="me-3" /> تحميل دوسية الدرس الأول
                                    </a>
                                </Button>`;

dirs.forEach(dir => {
  const filePath = path.join(basePath, dir, 'page.tsx');
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('تحميل دوسية الدرس الأول')) {
    content = content.replace(
      /<CardContent className=\"space-y-3\">\s+/,
      match => match + newButton + '\n'
    );
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  } else {
      console.log('Skipped', filePath);
  }
});
