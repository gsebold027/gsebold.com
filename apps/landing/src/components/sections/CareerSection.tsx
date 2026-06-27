import { usePageTranslation } from '@/lib/hooks'

import { CSharpIcon } from '../icons/devicon/CSharpIcon'
import { CssIcon } from '../icons/devicon/CssIcon'
import { DockerIcon } from '../icons/devicon/DockerIcon'
import { DotNetIcon } from '../icons/devicon/DotNetIcon'
import { ExpressIcon } from '../icons/devicon/ExpressIcon'
import { FramerMotionIcon } from '../icons/devicon/FramerMotionIcon'
import { GitIcon } from '../icons/devicon/GitIcon'
import { GitHubIcon } from '../icons/devicon/GithubIcon'
import { HtmlIcon } from '../icons/devicon/HtmlIcon'
import { JavascriptIcon } from '../icons/devicon/JavascriptIcon'
import { MongoDBIcon } from '../icons/devicon/MongoIcon'
import { MSSQLIcon } from '../icons/devicon/MsSqlIcon'
import { NestIcon } from '../icons/devicon/NestIcon'
import { NodeIcon } from '../icons/devicon/NodeIcon'
import { PostgreSQLIcon } from '../icons/devicon/PostgresIcon'
import { PowerBIIcon } from '../icons/devicon/PowerBiIcon'
import { RailwayIcon } from '../icons/devicon/RailwayIcon'
import { ReactIcon } from '../icons/devicon/ReactIcon'
import { ReactRouterIcon } from '../icons/devicon/ReactRouter'
import { ShadcnIcon } from '../icons/devicon/ShadcnIcon'
import { TailwindIcon } from '../icons/devicon/TailwindIcon'
import { TypescriptIcon } from '../icons/devicon/TypescriptIcon'
import { ViteIcon } from '../icons/devicon/ViteIcon'
import { WorkExperience } from '../shared/WorkExperience/WorkExperience'
import { TypographyH2, TypographyH3, TypographyH4 } from '../ui/typography/heading'

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
          <section
            key={`${section}-${sectionIndex}`}
            className="flex md:flex-row flex-col gap-6 sm:gap-8 items-start"
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
          </section>
        ))}
      </div>
    </section>
  )
}

export default CareerSection
