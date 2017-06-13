import { ARTICLE, WORKLOG, ARTICLE_REPO, WORKLOG_REPO } from '@/shared/constants'
import { converArticleInfo, converWorklogInfo } from '@/app/js/app'

export const articleCategoryList = [
  {
    label: ARTICLE,
    repo: ARTICLE_REPO,
    converFunc: converArticleInfo
  },
  {
    label: WORKLOG,
    repo: WORKLOG_REPO,
    converFunc: converWorklogInfo
  }
]
