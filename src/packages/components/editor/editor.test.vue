<template>
  <div class="app">
    <CompEditor
      ref="test_editor">
    </CompEditor>
    <el-button @click="submitEditor">提交</el-button>
    <el-button @click="setEditor">设置</el-button>
  </div>
</template>

<script>
  import CompEditor from './'

  export default {
    name: 'editor',
    components: {
      CompEditor
    },

    data() {
      return {}
    },
    methods: {
      /** 获取内容 */
      submitEditor: function () {
        console.log(this.$refs['test_editor'].getEditorContent());
      },
      /** 设置内容 */
      setEditor: function () {
        this.$refs['test_editor'].setEditorContent('这是我动态设置的内容')
      }
    }
  }
</script>
