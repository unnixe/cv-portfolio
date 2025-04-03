import { promises as fs } from 'fs';
import CaseStudy from './CaseStudy';
import path from 'path';
import { Metadata } from 'next';

// Define the metadata generation function
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const cvFile = await fs.readFile(process.cwd() + '/public/content/profileData.json', 'utf8');
    const cv = JSON.parse(cvFile);
    
    return {
      title: `${params.slug} | ${cv.general.name}`,
      description: `Case study for ${params.slug}`,
    };
  } catch (error) {
    return {
      title: 'Case Study',
      description: 'Case study page',
    };
  }
}

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

// Define the correct type for the page component
type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function CaseStudyPage({ params }: Props) {
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
