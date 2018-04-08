import React from 'react'
import 'lazysizes'

class LazyWPImagesProcessor {

  filterContent(content) {
    this.doc = this.createDocument(content)
    this.doc.querySelectorAll('img').forEach(this.transformImg.bind(this))

    var style = `
      <style>
        img.fadeIn {
          opacity: 0;
          -webkit-transition: opacity .6s ease-in-out;
          transition: opacity .6s ease-in-out;
        }
        img.lazyloaded {
          opacity: 1
        }
      </style>
    `
    return style + this.doc.body.innerHTML
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

  transformImg(image) {
    var imageData = this.getImageData(image)
    var imageId = this.getImageId(imageData.classes)
    if (!imageId) return image
    imageData.sizes = this.getSizes(imageData.srcset)
    image.removeAttribute('src')
    image.removeAttribute('sizes')
    image.removeAttribute('srcset')
    image.setAttribute('class', 'lazyload fadeIn')
    image.setAttribute('data-src', imageData.sizes[2][0])
    image.setAttribute('data-sizes', 'auto')
    image.setAttribute('data-srcset', imageData.srcset)
    image.setAttribute('style', imageData.style)
    var wrapper = this.doc.createElement('span')
    wrapper.setAttribute('class', imageData.classes)
    var blurredImageURL = imageData.sizes[0][0]
    wrapper.setAttribute('style', `
      background: rgba(0, 0, 0, .08) url(${blurredImageURL}) 0 0 / cover;
      display: block;
      padding-top: ${imageData.ratio};
      position: relative;
    `)
    image.parentNode.insertBefore(wrapper, image)
    wrapper.appendChild(image)
  }

  getRatio(image) {
    return image.getAttribute('height') / image.getAttribute('width') * 100 + "%"
  }

  getImageData(image) {
    return {
      ratio: this.getRatio(image),
      src: image.getAttribute('src'),
      srcset: image.getAttribute('srcset'),
      classes: image.getAttribute('class'),
      style: `
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      `,
    }
  }

  appendLazysizes(doc) {
    var lazysizesTag = this.doc.createElement('script')
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
    var splitClasses = classes.split(' ')
    var wpImageIdClasses = splitClasses.filter(item => item.indexOf('wp-image-') === 0)
    return wpImageIdClasses.pop().replace('wp-image-', '', )
  }

  getImageByID(id) {
    return {
      blurred: wpGetAttachmentImageSrc(Math.round(id), 'blurred'),
      default: wpGetAttachmentImageSrc(Math.round(id), 'default'),
    };
  }

}

const lazyImages = new LazyWPImagesProcessor


export default ({ children, Container }) => {
  return (
    <Container>
      {lazyImages.filterContent(children)}
    </Container>
  )
}

