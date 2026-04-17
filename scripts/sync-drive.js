import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Using ES modules trick for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRIVE_ENABLED = process.env.DRIVE_ENABLED === 'true';

// Mock Data Structure
const mockProjects = [
  {
    slug: 'casa-serra',
    category: 'residencial',
    title: 'Casa Serra',
    year: '2024',
    location: 'Montes Claros, MG',
    area: '420m²',
    description: 'Uma residência que dialoga abertamente com a topografia natural, explorando o uso contínuo de materiais brutos como concreto aparente e paleta quente em madeira.',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1200'
    ]
  },
  {
    slug: 'apartamento-sabrina',
    category: 'interiores',
    title: 'Apartamento Sabrina',
    year: '2023',
    location: 'Belo Horizonte, MG',
    area: '180m²',
    description: 'Reforma de interiores com foco na integração da área social, usando tons de microcimento, palha e couros caramelos para criar uma atmosfera aconchegante e high-profile.',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1628156157017-7634f19bba0f?q=80&w=1200',
      'https://images.unsplash.com/photo-1595514681329-a1fc19543884?q=80&w=1200'
    ]
  },
  {
    slug: 'clinica-viva',
    category: 'comercial',
    title: 'Clínica Viva',
    year: '2023',
    location: 'São Paulo, SP',
    area: '250m²',
    description: 'Espaço voltado para a saúde e bem-estar, desenhado para que a experiência do paciente transite por ambientes serenos, texturas orgânicas e muito respiro.',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1534015694200-c9a9dc4dc049?q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200'
    ]
  }
];

async function syncDrive() {
  console.log('=== Julia Fonseca — Drive Sync ===');

  if (DRIVE_ENABLED) {
    console.log('[sync] Connecting to Google Drive API... (TBI)');
    // Placeholder for actual Drive API code via googleapis
    console.log('[sync] Drive fetch disabled or not fully implemented. Falling back to mock.');
  } else {
    console.log('[sync] DRIVE_ENABLED is false. Using mock content.');
  }

  const outputPath = path.resolve(__dirname, '../content/projects.json');
  
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(mockProjects, null, 2), 'utf-8');

  console.log(`[sync] Written ${mockProjects.length} projects to content/projects.json`);
  console.log('✅ Sync complete!');
}

syncDrive().catch(console.error);
