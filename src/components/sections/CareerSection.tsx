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
    <div className="min-h-dvh py-[clamp(1rem,_2.5vw_+_0rem,_2rem)] flex flex-col">
      <TypographyH2 className="mb-[clamp(1rem,_2.5vw_+_0rem,_2rem)]">
        {t('experience.title')}
      </TypographyH2>
      {/* <TypographyH3 className="text-muted-foreground">
      How I grew as a full-stack developer and problem solver
    </TypographyH3> */}

      <TypographyH3 className="text-muted-foreground mb-6 sm:mb-12">
        {t('experience.skills_title')}
      </TypographyH3>
      <div className="flex flex-col gap-8 sm:gap-16">
        {skills.map((section) => (
          <div className="flex md:flex-row flex-col gap-6 sm:gap-8 items-start">
            <div className="w-full md:w-1/5 text-lg font-bold sticky">
              <TypographyH4 className="uppercase">{t(`${section.title}`)}</TypographyH4>
            </div>
            <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {section.items.map((tool) => (
                <div className="flex items-center gap-2">
                  <tool.icon />
                  <span className="text-lg">{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CareerSection
