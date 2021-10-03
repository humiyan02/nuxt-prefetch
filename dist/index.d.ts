import VueRouter from 'vue-router';
export declare const usePrefetchRouter: (path: string) => {
    [x: string]: import("@vue/composition-api").Ref<any> | VueRouter | ((paths: string[]) => void) | ((fn: () => any) => Promise<void>);
    router: VueRouter;
    prefetchTarget: import("@vue/composition-api").Ref<any>;
    prefetch: () => void;
    prefetchAll: (paths: string[]) => void;
    goToPage: () => Promise<import("vue-router").Route>;
    prefetchRouter: (fn: () => any) => Promise<void>;
};
