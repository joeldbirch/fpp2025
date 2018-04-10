import React from 'react'
import {setAttrs, removeAttrs} from '../../utils/helpers'
import {isBrowser} from '../../utils/helpers'
import styles from './style.module.scss'

if (isBrowser) require('lazysizes')

export default class LazyWPImagesProcessor {

  filterContent(content) {
    this.doc = this.createDocument(content)
    this.doc.querySelectorAll('img').forEach(this.transformImg.bind(this))
    return this.doc.body.innerHTML
  }

  filterWithStyle(content) {
    return  this.filterContent(content) + this.styles()
  }

  getSizes(srcset) {
    return this.sortSizes(
      srcset.split(',').map(str => {
        let bits = str.trim().split(/\s+/)
        bits[1] = bits[1].replace('w', '') * 1
        return [bits[0], bits[1]]
      })
    )
  }

  sortSizes(sizes) {
    return sizes.sort(function(a, b) {
      return a[1] - b[1]
    })
  }

  styles() {
    return `<style> .lazyloaded {opacity: 1; } </style>`
  }

  getPillar({ratio}) {
    let el = this.doc.createElement('span')
    el.setAttribute('class', styles.pillar)
    el.setAttribute('style', `padding-top: ${ratio};`)
    return el
  }

  isJpg({src}) {
    return src.split('.').reverse()[0].indexOf('jp') === 0
  }

  transformImg(image) {
    let imageData = this.getImageData(image)
    let imageId = this.getImageId(imageData.classes)
    if (!imageId || !this.isJpg(imageData)) return image
    imageData.sizes = this.getSizes(imageData.srcset)
    removeAttrs(image, ['srcset','sizes','src'])
    setAttrs(image, {
      'class'      : `lazyload ${styles.img}`,
      'data-src'   : imageData.sizes[2][0],
      'data-sizes' : 'auto',
      'data-srcset': imageData.srcset,
    })

    let wrapper = this.doc.createElement('span')
    setAttrs(wrapper, {
      'class': `${styles.lazywrap} ${imageData.classes}`,
      'style': `background-image: url(${imageData.sizes[0][0]});`
    })

    wrapper.appendChild(this.getPillar(imageData))
    image.parentNode.insertBefore(wrapper, image)
    wrapper.appendChild(image)
  }

  getRatio(image) {
    return image.getAttribute('height') / image.getAttribute('width') * 100 + "%"
  }

  getImageData(image) {
    return {
      ratio: this.getRatio(image),
      src: image.src,
      srcset: image.srcset,
      classes: image.className,
    }
  }

  appendLazysizes(doc) {
    let lazysizesTag = this.doc.createElement('script')
    lazysizesTag.setAttribute('async', '')
    lazysizesTag.setAttribute('src', 'https://cdn.jsdelivr.net/npm/lazysizes@4.0.2/lazysizes.min.js')
    this.doc.body.appendChild(lazysizesTag)
  }

  createDocument(content) {
    let doc = new DOMParser().parseFromString(content, 'text/html')
    return doc
  }

  getImageId(classes) {
    if (!classes) return false
    let splitClasses = classes.split(' ')
    let wpImageIdClasses = splitClasses.filter(item => item.indexOf('wp-image-') === 0)
    return wpImageIdClasses.pop().replace('wp-image-', '', )
  }
}

