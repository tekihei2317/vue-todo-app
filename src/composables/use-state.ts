// 参考: [Vue + JSX + Nuxt Composition API で最高のフロント開発体験 - ANDPAD Tech Blog](https://tech.andpad.co.jp/entry/2021/07/01/170000)
import { computed, ComputedRef, ref, UnwrapRef } from "vue";

export const useState = <T>(
  initialState: T
): [ComputedRef<UnwrapRef<T>>, (value: T) => void] => {
  const state = ref<T>(initialState);

  const setState = (value: T) => {
    state.value = value as UnwrapRef<T>;
  };

  return [computed(() => state.value), setState];
};
