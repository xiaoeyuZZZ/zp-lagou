(function () {
  var URL = '/static/ueditor/'

  /**
   * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
   */
  window.UMEDITOR_CONFIG = {

    //为编辑器实例添加一个路径，这个不能被注释
    UMEDITOR_HOME_URL : URL

    //图片上传配置区
    ,imageUrl: 'http://localhost:3000/updateFile'            //图片上传提交地址
    ,imagePath: ""                     //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
    ,imageFieldName:"upfile"                   //图片数据的key,若此处修改，需要在后台对应文件修改对应参数

    //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
    ,toolbar:[
      'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
      'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize' ,
      '| justifyleft justifycenter justifyright justifyjustify |',
      'link unlink | emotion image',
      '| horizontal print preview fullscreen', 'drafts', 'formula'
    ]
    //填写过滤规则
    ,filterRules: {}
    // xss 过滤是否开启,inserthtml等操作
    ,xssFilterRules: true
    //input xss过滤
    ,inputXssFilter: true
    //output xss过滤
    ,outputXssFilter: true
    // xss过滤白名单 名单来源: https://raw.githubusercontent.com/leizongmin/js-xss/master/lib/default.js
    ,whiteList: {
      a:      ['target', 'href', 'title', 'style', 'class', 'id'],
      abbr:   ['title', 'style', 'class', 'id'],
      address: ['style', 'class', 'id'],
      area:   ['shape', 'coords', 'href', 'alt', 'style', 'class', 'id'],
      article: ['style', 'class', 'id'],
      aside:  ['style', 'class', 'id'],
      audio:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'style', 'class', 'id'],
      b:      ['style', 'class', 'id'],
      bdi:    ['dir'],
      bdo:    ['dir'],
      big:    [],
      blockquote: ['cite', 'style', 'class', 'id'],
      br:     [],
      caption: ['style', 'class', 'id'],
      center: [],
      cite:   [],
      code:   ['style', 'class', 'id'],
      col:    ['align', 'valign', 'span', 'width', 'style', 'class', 'id'],
      colgroup: ['align', 'valign', 'span', 'width', 'style', 'class', 'id'],
      dd:     ['style', 'class', 'id'],
      del:    ['datetime', 'style', 'class', 'id'],
      details: ['open', 'style', 'class', 'id'],
      div:    ['style', 'class', 'id'],
      dl:     ['style', 'class', 'id'],
      dt:     ['style', 'class', 'id'],
      em:     ['style', 'class', 'id'],
      embed:  ['style', 'class', 'id', '_url', 'type', 'pluginspage', 'src', 'width', 'height', 'wmode', 'play', 'loop', 'menu', 'allowscriptaccess', 'allowfullscreen'],
      font:   ['color', 'size', 'face', 'style', 'class', 'id'],
      footer: ['style', 'class', 'id'],
      h1:     ['style', 'class', 'id'],
      h2:     ['style', 'class', 'id'],
      h3:     ['style', 'class', 'id'],
      h4:     ['style', 'class', 'id'],
      h5:     ['style', 'class', 'id'],
      h6:     ['style', 'class', 'id'],
      header: ['style', 'class', 'id'],
      hr:     ['style', 'class', 'id'],
      i:      ['style', 'class', 'id'],
      iframe: ['style', 'class', 'id', 'src', 'frameborder', 'data-latex'],
      img:    ['src', 'alt', 'title', 'width', 'height', 'style', 'class', 'id', '_url'],
      ins:    ['datetime', 'style', 'class', 'id'],
      li:     ['style', 'class', 'id'],
      mark:   [],
      nav:    [],
      ol:     ['style', 'class', 'id'],
      p:      ['style', 'class', 'id'],
      pre:    ['style', 'class', 'id'],
      s:      [],
      section:[],
      small:  ['style', 'class', 'id'],
      span:   ['style', 'class', 'id'],
      sub:    ['style', 'class', 'id'],
      sup:    ['style', 'class', 'id'],
      strong: ['style', 'class', 'id'],
      table:  ['width', 'border', 'align', 'valign', 'style', 'class', 'id'],
      tbody:  ['align', 'valign', 'style', 'class', 'id'],
      td:     ['width', 'rowspan', 'colspan', 'align', 'valign', 'style', 'class', 'id'],
      tfoot:  ['align', 'valign', 'style', 'class', 'id'],
      th:     ['width', 'rowspan', 'colspan', 'align', 'valign', 'style', 'class', 'id'],
      thead:  ['align', 'valign', 'style', 'class', 'id'],
      tr:     ['rowspan', 'align', 'valign', 'style', 'class', 'id'],
      tt:     ['style', 'class', 'id'],
      u:      [],
      ul:     ['style', 'class', 'id'],
      svg:    ['style', 'class', 'id', 'width', 'height', 'xmlns', 'fill', 'viewBox'],
      video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'style', 'class', 'id']
    }
  };
})();
