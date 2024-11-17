// useScrollSync.ts
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useScrollSync(ref1: any, ref2: any) {
  const scrollHandler1 = () => {
    if (ref1.value && ref2.value) {
      ref2.value.scrollTop = ref1.value.scrollTop;
    }
  };

  const scrollHandler2 = () => {
    if (ref1.value && ref2.value) {
      ref1.value.scrollTop = ref2.value.scrollTop;
    }
  };

  onMounted(() => {
    if (ref1.value) {
      ref1.value.addEventListener('scroll', scrollHandler1);
    }
    if (ref2.value) {
      ref2.value.addEventListener('scroll', scrollHandler2);
    }
  });

  onBeforeUnmount(() => {
    if (ref1.value) {
      ref1.value.removeEventListener('scroll', scrollHandler1);
    }
    if (ref2.value) {
      ref2.value.removeEventListener('scroll', scrollHandler2);
    }
  });
}
