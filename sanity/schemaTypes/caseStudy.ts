export const caseStudyType = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'service',
      title: 'Service Category',
      type: 'string',
    },
    {
      name: 'client',
      title: 'Client Name (Optional)',
      type: 'string',
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
    },
    {
      name: 'result',
      title: 'The Result',
      type: 'text',
    },
    {
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
};
