import React, {Component} from 'react'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import BaseContentWrap from '../components/BaseContentWrap'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'
import {sortByObjProp} from '../utils/helpers'

class Template extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let {slug} = this.props.data.wordpressPage
    if (slug === 'contact') {
      var rzgkhvs1b7d9hw;(function(d, t) {var s = d.createElement(t), options = {'userName':'fppdesign', 'formHash':'rzgkhvs1b7d9hw', 'autoResize':true, 'height':'437', 'async':true, 'host':'wufoo.eu', 'header':'show', 'ssl':true}; s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'www.wufoo.eu/scripts/embed/form.js'; s.onload = s.onreadystatechange = function() {var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return; try { rzgkhvs1b7d9hw = new WufooForm();rzgkhvs1b7d9hw.initialize(options);rzgkhvs1b7d9hw.display(); } catch (e) {}}; var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr); })(document, 'script');
    }
  }

  render() {
    let {title, content, acf, slug} = this.props.data.wordpressPage
    let {sidebarItems} = this.props.pathContext
    let sortedSidebarItems = sortByObjProp(acf.page_sidebar_items, sidebarItems, 'wordpress_id')

    return (
      <BaseContentWrap>
        <TheHeading>{title}</TheHeading>
        <BaseMainColumn>
          {content}
        </BaseMainColumn>
        <BaseSideColumn>
          <SidebarWidgetFactory nodes={sortedSidebarItems} />
        </BaseSideColumn>
      </BaseContentWrap>
    )
  }
}

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      slug
      acf {
        page_sidebar_items
      }
    }
  }
`
export default Template
