<template>
  <div ref="editor"></div>
</template>

<script>
  /**
   * 百度富文本编辑器
   */
  import '../../../../static/ueditor/themes/default/css/umeditor.css';
  import '../../../../static/ueditor/umeditor.config.js';
  import '../../../../static/ueditor/umeditor.js';
  import '../../../../static/ueditor/lang/zh-cn/zh-cn';

  export default {
    name: 'sc-ueditor',
    data() {
      return {
        id: Math.random().toString(16).substring(2) + 'ueditorId',
      };
    },
    mounted() {
      this.$nextTick(function f1() {
        this.$refs.editor.id = this.id;
        this.editor = window.UM.getEditor(this.id);
      });
    },
    methods: {
      getEditorContent() {
        return this.editor.getContent()
      },
      setEditorContent(value) {
        this.editor.setContent(value)
      }
    },
  }
</script>
