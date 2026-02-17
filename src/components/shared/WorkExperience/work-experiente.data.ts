import { WorkExperienceData } from '@/lib/types'

export const workExperienceData: WorkExperienceData[] = [
  {
    id: 'senior-fullstack-rfa',
    company: 'RFA Mortgage',
    position: 'senior_fullstack_developer',
    period: {
      start: new Date(2024, 8),
      end: null
    },
    tags: ['#react', '#nextJs', '#mssql', '#typescript', '#nestJs', 'C#', '#.net', '#restful'],
    responsibilities: [
      'react_rest_development',
      'frontend_architecture_best_practices',
      'backend_endpoint_development',
      'cms_directus_integration'
    ]
  },
  {
    id: 'fullstack-wise',
    company: 'Wise Systems',
    position: 'fullstack_developer',
    period: {
      start: new Date(2024, 0),
      end: new Date(2024, 7)
    },
    tags: ['#react', '#postgresql', '#mongoDB', '#typescript', '#nestJs', '#restful', '#graphQl'],
    responsibilities: [
      'react_rest_development',
      'fullstack_react_nest',
      'graphql_api_development',
      'mongodb_integration'
    ]
  },
  {
    id: 'fullstack-d18',
    company: 'D18',
    position: 'fullstack_developer',
    period: {
      start: new Date(2022, 0),
      end: new Date(2023, 11)
    },
    tags: [
      '#html',
      '#css',
      '#javascript',
      '#vue',
      '#postgresql',
      '#heroku',
      '#sinatra',
      '#rubyOnRails',
      '#restful',
      '#rabbitMQ'
    ],
    responsibilities: [
      'development_using_ruby_on_rails',
      'frontend_using_html_css_javascript',
      'management_app',
      'using_git_plus_heroku',
      'maintain_legacy_code'
    ]
  },
  {
    id: 'ssw-sistemas',
    company: 'SSW Sistemas',
    position: 'internship',
    period: {
      start: new Date(2021, 4),
      end: new Date(2021, 10)
    },
    tags: ['#restful', '#objectPascal', '#postgreSQL'],
    responsibilities: [
      'backend_development_pascal',
      'api_maintenance',
      'edi_development',
      'database_analysis'
    ]
  }
]
