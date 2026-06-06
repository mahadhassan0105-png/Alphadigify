import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { testimonialType } from './testimonial'
import { caseStudyType } from './caseStudy'
import { teamMemberType } from './teamMember'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, testimonialType, caseStudyType, teamMemberType, siteSettingsType],
}
