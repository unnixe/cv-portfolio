import { promises as fs } from 'fs';
import CaseStudy from './CaseStudy';
import path from 'path';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    // Get all markdown files from the content directory
    const contentDir = path.join(process.cwd(), 'public/content');
    const files = await fs.readdir(contentDir);
    
    // Filter for markdown files and extract slugs
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    const slugs = markdownFiles.map(file => ({
      slug: file.replace('.md', '')
    }));
    
    return slugs;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  const cvFile = await fs.readFile(process.cwd() + '/public/content/profileData.json', 'utf8');
  const cv = JSON.parse(cvFile);

  const slug = params.slug;
  const file = await fs.readFile(process.cwd() + `/public/content/${slug}.md`, 'utf8');

  return (
    <div>
      <CaseStudy cv={cv} markdownText={file} />
    </div>
  );
}
