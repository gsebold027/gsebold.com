import { usePageTranslation } from '@/lib/hooks'

import {
  CSharpIcon,
  CssIcon,
  DockerIcon,
  DotNetIcon,
  ExpressIcon,
  FramerMotionIcon,
  GitHubIcon,
  GitIcon,
  HtmlIcon,
  JavascriptIcon,
  MSSQLIcon,
  MongoDBIcon,
  NestIcon,
  NodeIcon,
  PostgreSQLIcon,
  PowerBIIcon,
  RailwayIcon,
  ReactIcon,
  ReactRouterIcon,
  ShadcnIcon,
  TailwindIcon,
  TypescriptIcon,
  ViteIcon
} from '../icons'
import { WorkExperience } from '../shared/WorkExperience/WorkExperience'
import { TypographyH2, TypographyH3, TypographyH4 } from '../ui/typography'

const CareerSection = () => {
  const { t } = usePageTranslation('landing-page')

  const skills = [
    {
      title: t('experience.frontend'),
      items: [
        { icon: HtmlIcon, label: 'HTML' },
        { icon: CssIcon, label: 'CSS' },
        { icon: JavascriptIcon, label: 'Javascript' },
        { icon: TypescriptIcon, label: 'Typescript' },
        { icon: ReactIcon, label: 'React' },
        { icon: TailwindIcon, label: 'TailwindCSS' },
        { icon: ShadcnIcon, label: 'Shadcn' },
        { icon: FramerMotionIcon, label: 'Framer Motion' },
        { icon: ReactRouterIcon, label: 'React Router' }
      ]
    },
    {
      title: t('experience.backend'),
      items: [
        { icon: NodeIcon, label: 'Node.js' },
        { icon: NestIcon, label: 'NestJS' },
        { icon: ExpressIcon, label: 'Express' },
        { icon: CSharpIcon, label: 'C#' },
        { icon: DotNetIcon, label: '.NET' }
      ]
    },
    {
      title: t('experience.database'),
      items: [
        { icon: PostgreSQLIcon, label: 'PostgreSQL' },
        { icon: MSSQLIcon, label: 'MSSQL' },
        { icon: MongoDBIcon, label: 'Mongo DB' }
      ]
    },
    {
      title: t('experience.tools'),
      items: [
        { icon: DockerIcon, label: 'Docker' },
        { icon: GitIcon, label: 'Git' },
        { icon: GitHubIcon, label: 'Github' },
        { icon: PowerBIIcon, label: 'Power BI' },
        { icon: RailwayIcon, label: 'Railway' },
        { icon: ViteIcon, label: 'Vite' }
      ]
    }
  ]

  return (
    <section
      id="career"
      className="py-[clamp(1rem,_2.5vw_+_0rem,_2rem)] flex flex-col"
      aria-labelledby="career-heading">
      <TypographyH2 id="career-heading" className="mb-[clamp(1rem,_2.5vw_+_0rem,_2rem)]">
        {t('experience.title')}
      </TypographyH2>
      <TypographyH3 className="text-muted-foreground mb-4">
        {t('experience.how_i_grew_as_fullstack_developer')}
      </TypographyH3>
      <WorkExperience />

      <TypographyH3 id="technologies" className="text-muted-foreground mb-6">
        {t('experience.skills_title')}
      </TypographyH3>

      <div className="flex flex-col gap-8 sm:gap-16">
        {skills.map((section, sectionIndex) => (
          <div
            key={`${section}-${sectionIndex}`}
            className="flex md:flex-row flex-col gap-6 sm:gap-8 items-start"
            role="region"
            aria-labelledby={`skill-category-${sectionIndex}`}>
            <div className="w-full md:w-1/5 text-lg font-bold sticky">
              <TypographyH4 id={`skill-category-${sectionIndex}`} className="uppercase">
                {section.title}
              </TypographyH4>
            </div>
            <ul
              className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 list-none p-0"
              aria-label={t('experience.skills_list_aria', { category: section.title })}>
              {section.items.map((tool) => (
                <li key={tool.label.replace(' ', '-')} className="flex items-center gap-2">
                  <tool.icon aria-hidden="true" />
                  <span className="text-lg">{tool.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CareerSection
