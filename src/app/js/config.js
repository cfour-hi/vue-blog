import { ARTICLE, WORKLOG } from '@/shared/constants'
import { converArticleInfo, converWorklogInfo } from '@/app/js/app'

export const articleCategoryList = [
  {
    label: ARTICLE,
    converFunc: converArticleInfo
  },
  {
    label: WORKLOG,
    converFunc: converWorklogInfo
  }
]
