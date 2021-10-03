import {
  ref,
  computed,
  useRouter,
  onMounted,
  onUnmounted
} from '@nuxtjs/composition-api'
import VueRouter from 'vue-router'

module.exports = () => {
  const getFetchComponent = (path: string, router: VueRouter) => {
    const routerRef = router.resolve(path)
    const components = routerRef.resolved.matched.map(r => r.components.default)
    return components
  }

  const usePrefetchRouter = (path: string) => {
    const prefetchTarget = ref()
    const router = useRouter()
    const fetchedPages = ref<string[]>([])
    const isFetched = computed(() => fetchedPages.value.includes(path))

    const prefetch = () => {
      if (isFetched.value) return
      try {
        fetchComponent(path)
      } catch (error) {
        // console.info(error)
      }
    }
    const prefetchAll = (paths: string[]) => {
      for (const path of paths) {
        try {
          fetchComponent(path)
        } catch (error) {
          // console.info(error)
        }
      }
    }

    const fetchComponent = (path: string) => {
      const components = getFetchComponent(path, router)
      for (const component of components) {
        if (typeof component === 'function') {
          const callComponent: any = component // TODO 型付け
          const componentOrPromise = callComponent()
          if (componentOrPromise instanceof Promise) {
            componentOrPromise.catch(() => {})
          }
        }
      }
      fetchedPages.value.push(path)
    }

    // 画面上に表示されたらprefetch
    const observer =
      window.IntersectionObserver &&
      new window.IntersectionObserver(entries => {
        entries.forEach(({ intersectionRatio }) => {
          if (intersectionRatio > 0 && !isFetched.value) {
            prefetch()
          }
        })
      })
    onMounted(() => {
      observer.observe(prefetchTarget.value)
    })
    onUnmounted(() => {
      observer.unobserve(prefetchTarget.value)
    })

    const routerPushPath = 'routerPush' + path
    return {
      router,
      prefetchTarget,
      prefetch,
      prefetchAll,
      goToPage: () => router.push(path),
      prefetchRouter: async (fn: () => any) => {
        prefetch()
        await fn()
        router.push(path)
      },
      [routerPushPath]: () => router.push(path)
    }
  }
}
