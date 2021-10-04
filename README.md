# Motivation
Wanting to prefetch at any time without using `<NextLink/>`.

`<NextLink/>` prefetch links when viewing it and navigate fast.
Without `<NextLink/>`, `router.push()` don't prefetch links and slowly navigate pages.
Therefore it's necessary to prefetch anywhere and anytime before `router.push()`. 
# Getting Started 
## Install package
```
npm install nuxt-prefetch
```
## Quick Start
pages/index.vue
```
import { usePrefetchRouter } from "nuxt-prefetch"
export default defineComponent({
  setup() {
    const { prefetch } = usePrefetchRouter('/hoge')
    prefetch()
  },
})
```
See network tab in Devtools and you look at hoge.js loaded.

# Usage
UseCase1:prefetch link after few seconds
```
export default defineComponent({
  setup() {
    const { prefetch } = usePrefetchRouter('/hoge')
    setTimeout(() => {
      prefetch()
    }, 5000)
  },
})
```
UseCase2:prefetch before run async function and run then navigation
```
const {prefetchRouter} = usePrefetchRouter('/hoge')
const execAsyncFunc = () =>
  prefetchRouter(async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json()) // then navigate to /hoge 
      .catch((e) => {
        console.log(e)
      })
  })

```
UseCase3: prefetch all paths
```
const {prefetchAll} = usePrefetchRouter('/hoge')
prefetchAll(['/hoge', '/fuga'])

```

UseCase4:prefetch by viewing element
```
<template>
  <div>
    ↓scroll
    <div style="height: 1000px; width: 100%"></div>
    <button ref="prefetchTarget" @click="runSomeThenRouterPush">
      prefetch by viewing
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePrefetchRouter } from '~/modules/usePrefetchRouter'

export default defineComponent({
  setup() {
    const { prefetchTarget } = usePrefetchRouter('/hoge')
    return { prefetchTarget }
  },
})
</script>

```

Option1：use router.push
```
const {goToPage} = usePrefetchRouter('/hoge')
goToPage() // router.push('/test')
```

Option2：use VueRouter
```
const {router} = usePrefetchRouter('/hoge')
router.push('/hoge')
```

# Example
[NuxtPrefetchSampleRepository](https://github.com/humiyan02/nuxt-prefetch-sample)
