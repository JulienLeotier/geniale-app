import { useParentElement, useDropZone } from "@vueuse/core";
import type { Ref } from "vue";
import { ref } from "vue";

export const useDragDropFileUpload = () => {
  const parentElement = useParentElement() as Ref<HTMLElement>;

  const filesRef = ref<File[]>([]);

  const { isOverDropZone } = useDropZone(parentElement, {
    onDrop: (files) => {
      filesRef.value = files as File[];
    },
  });

  const resetFiles = () => {
    filesRef.value = [];
  };

  return {
    isDragging: isOverDropZone,
    files: filesRef,
    resetFiles,
  };
};
