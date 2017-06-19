import marked from 'marked'

export function converArticleInfo (article) {
  const sections = marked(article.body).split(/<!--\s*\w{1,9}\s*-->/g)

  return {
    id: article.id,
    number: article.number,
    title: article.title,
    createdAt: article.created_at.split('T')[0],
    quote: sections[0],
    banner: sections[1],
    body: sections[2],
    labels: article.labels,
    commentNum: article.comments,
    commentUrl: article.comments_url
  }
}

const DEFAULT_QUOTE = '博主貌似忘了写概览...'

export function converWorklogInfo (worklog) {
  const color = '#' + worklog.labels[0].color
  const sections = marked(worklog.body).split(/<!--\s*\w+\s*-->/g)
  const hasQuote = sections.length > 1

  return {
    id: worklog.id,
    number: worklog.number,
    title: worklog.title,
    createdAt: worklog.created_at.split('T')[0],
    year: worklog.labels[0].name,
    color: color,
    month: parseInt(worklog.title, 10),
    quote: hasQuote ? sections[0] : DEFAULT_QUOTE,
    body: hasQuote ? sections[1] : sections[0],
    labels: worklog.labels,
    commentNum: worklog.comments,
    commentUrl: worklog.comments_url,
    activeStyle: {
      color,
      'border-color': color,
      'background-color': color
    }
  }
}
