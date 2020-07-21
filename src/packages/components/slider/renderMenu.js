export default {
  name: 'sc-menu-item',
  functional: true,
  props: {
    menu: [Array],
  },
  render (h, ctx) {
    const menu = ctx.props.menu || []
    const menuEl = (menu) => {
      return menu.map((v, i) => {
        const index = v.path
        if (v.children && !v.meta.hidden) {
          return (
            <el-submenu index={index} key={index}>
              <template slot="title">
                <i class={v.meta.icon}/>
                <p slot="title">{v.meta.label}</p>
              </template>
              {menuEl(v.children)}
            </el-submenu>
          )
        } else if (!v.meta.childrenHidden) {
          return (
            <router-link to={`/${v.meta.modules.replace('zp-','')}/${v.name}`} style={{textDecoration: 'none'}}>
              <el-menu-item index={index} key={index}>
                <i class={v.meta.icon}/>
                <p slot="title">{v.meta.label}</p>
              </el-menu-item>
            </router-link>
          )
        }
      })
    }
    return (
      <div class="sc-menu">
        {menuEl(menu)}
      </div>
    )
  },
}
