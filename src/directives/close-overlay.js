
/* function updateBinding (el, { value, modifiers }) {
  const ctx = el.__qclose
} */

/* ,
  update (el, binding) {
    if (binding.oldValue !== binding.value) {
      updateBinding(el, binding)
    }
  } */

export default {
  name: 'close-overlay',
  bind (el, binding, vnode) {
    let vm = vnode.componentInstance
    while ((vm = vm.$parent)) {
      const name = vm.$options.name
      if (name === 'q-popover' || name === 'q-modal') {
        break
      }
    }

    el.__qclose = {
      handler () {
        vm && vm.hide()
      }
    }
  },
  inserted (el) {
    let ctx = el.__qclose
    el.addEventListener('click', ctx.handler)
  },
  unbind (el) {
    let ctx = el.__qclose
    el.removeEventListener('click', ctx.handler)
    delete el.__qclose
  }
}