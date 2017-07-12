const PageParser = require('lib/Page');
const request = require('utils').request;

module.exports = function getDefaultAlbums(req, res, next) {
  request('http://mp3.zing.vn/the-loai-album.html')
    .then(html => {
      const parser = new PageParser(html);
      const result =
        parser
          .list('.zcontent .title-section')
          .setKey('origin')
          .extractAttrs(['text', 'href'], 'a', ['title', 'id'])
          .get();
          // result.origins is now available
      // minimize html
      html = parser.$('.zcontent').html();

      result.origins = result.origins.map((origin, index) => {
        const innerParser = new PageParser(html);
        // rewrite the parser elements
        innerParser.elements = parser.list('.tab-pane').elements.eq(index).find('.pone-of-four');
        innerParser
          .setKey('album') // the key will be albums
          .extractAttr('src', '.item img', 'cover')
          .extractAttrs(['text', 'href', 'href'], '.title-item a', ['title', 'id', 'alias'])
          .artist('.title-sd-item a');

        return Object.assign(origin, innerParser.get());
      });

      res.json(Object.assign({ result: true }, result));
    })
    .catch(err => next(err));
};