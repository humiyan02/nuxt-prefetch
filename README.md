# Setup
## パッケージインストール
```
npm install nuxt-prefetch
```

## 実装
pages/index.vue
```
import { usePrefetchRouter } from ""
export default defineComponent({
  setup() {
    const { prefetch } = usePrefetchRouter('/hoge')
    prefetch()
  },
})
```


# Usage
UseCase1:ページが表示されて数秒後prefetch
```
export default defineComponent({
  setup() {
    // プリフェッチしたいpathを渡してuseする。
    const { prefetch } = usePrefetchRouter('/hoge')
    // ユースケース①：ページcreatedから一定時間後にプリフェッチ
    setTimeout(() => {
      prefetch()
    }, 5000)
  },
})
```
UseCase2:プリフェッチして非同期処理後にページ遷移
```
const {prefetchRouter} = usePrefetchRouter('/hoge')
const execAsyncFunc = () =>
  prefetchRouter(async () => {
    console.log('非同期処理の前にprefetch')
    await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json()) // この後にページ遷移
      .catch((e) => {
        console.log(e)
      })
  })

```
UseCase3:選択したpathを全てPrefetch
```
const {prefetchAll} = usePrefetchRouter('/hoge')
prefetchAll(['/hoge', '/fuga'])

```

UseCase4:画面内に表示されたらprefetch
```
<template>
  <div>
    ↓スクロール
    <div style="height: 1000px; width: 100%"></div>
    <button ref="prefetchTarget" @click="runSomeThenRouterPush">
      画面内に表示されたらプリフェッチ！
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


オプション1：ページ遷移
```
const {goToPage} = usePrefetchRouter('/hoge')
const runSomeThenRouterPush = () => {
  console.log('なんかの処理')
  goToPage() // router.push('/test')
}
```

オプション2：routerも使える
```
const {router} = usePrefetchRouter('/hoge')

const runSomeThenRouterPush2 = () => {
  console.log('重い処理・非同期処理')
  router.push('/hoge')
}
```
