
    import React, { Component } from 'react'
    import { Route } from 'react-router-dom'

    import _Users_dnlytras_Documents_Projects_resinos_www_theme_pages_Home from '/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/Home'
import _Users_dnlytras_Documents_Projects_resinos_www_theme_pages_Docs from '/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/Docs'
import _Users_dnlytras_Documents_Projects_resinos_www_theme_pages_Changelog from '/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/Changelog'
import _Users_dnlytras_Documents_Projects_resinos_www_theme_pages____ from '/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/404'
    const templateMap = {
    t_0: _Users_dnlytras_Documents_Projects_resinos_www_theme_pages_Home,
t_1: _Users_dnlytras_Documents_Projects_resinos_www_theme_pages_Docs,
t_2: _Users_dnlytras_Documents_Projects_resinos_www_theme_pages_Changelog,
t_3: _Users_dnlytras_Documents_Projects_resinos_www_theme_pages____
  }
    const templateTree = {c:{"404":{t:"t_3"},"/":{t:"t_0"},"docs":{t:"t_1"},"changelog":{t:"t_2"}}}
    
    const getTemplateForPath = path => {
      const parts = path === '/' ? ['/'] : path.split('/').filter(d => d)
      let cursor = templateTree
      try {
        parts.forEach(part => {
          cursor = cursor.c[part]
        })
        return templateMap[cursor.t]
      } catch (e) {
        return false
      }
    }
  

    export const paths = [{"path":"/","title":"Home","component":"/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/Home","hasGetProps":false},{"component":"/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/Docs","title":"Docs","path":"/docs","hasGetProps":false},{"component":"/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/Changelog","title":"Changelog","path":"/changelog","hasGetProps":false},{"is404":true,"path":"/404","component":"/Users/dnlytras/Documents/Projects/resinos/www/theme/pages/404","hasGetProps":false}]

    export default class Routes extends Component {
      render () {
        return (
            
    <Route path='*' render={props => {
      let Template = getTemplateForPath(props.location.pathname)
      if (!Template) {
        Template = getTemplateForPath('404')
      }
      return <Template {...props} />
    }} />
  
        )
      }
    }
  