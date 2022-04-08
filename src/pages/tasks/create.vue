<template>
  <div>
    <div>Todo App</div>
    {{ form }}
    <custom-form :form="form" @update="onUpdate" />
    {{ form2 }}
    <custom-form-2 :form="form2" :on-update="onUpdate2" />
    {{ form3 }}
    <custom-form-3 :form="form3" :update-form="onUpdate3" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CustomForm from "../../components/form/CustomForm.vue";
import CustomForm2 from "../../components/form/CustomForm2.vue";
import CustomForm3 from "../../components/form/CustomForm3.vue";

type Task = {
  name: string | null;
  description: string | null;
  status: string | null;
};

export default defineComponent({
  components: { CustomForm, CustomForm2, CustomForm3 },

  setup() {
    // refとemit(更新ロジックは子)
    const form = ref<Task>({
      name: null,
      description: null,
      status: null,
    });
    const onUpdate = (value: Task) => {
      form.value = value;
    };

    // refとprops function(更新ロジックは子)
    const form2 = ref<Task>({
      name: null,
      description: null,
      status: null,
    });
    const onUpdate2 = (value: Task) => {
      form2.value = value;
    };

    // refとprops function(更新ロジックは親→Composable関数に分割可能)
    const form3 = ref<Task>({
      name: null,
      description: null,
      status: null,
    });
    const onUpdate3 = (key: string, value: string) => {
      form3.value = { ...form3.value, [key]: value };
    };

    return { form, onUpdate, form2, onUpdate2, form3, onUpdate3 };
  },
});
</script>
