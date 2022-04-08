<template>
  <div>
    <div>Todo App</div>
    <div>
      <p>refとemit(更新ロジックは子)</p>
      {{ form }}
      <custom-form :form="form" @update="onUpdate" />
    </div>
    <div>
      <p>refとProps Function(更新ロジックは子)</p>
      {{ form2 }}
      <custom-form-2 :form="form2" :on-update="onUpdate2" />
    </div>
    <div>
      <p>refとProps Function(更新ロジックは親)</p>
      {{ form3 }}
      <custom-form-3 :form="form3" :update-form="onUpdate3" />
    </div>
    <div>
      <p>自前のuseState</p>
      {{ form4 }}
      <custom-form-3 :form="form4" :update-form="onUpdate4" />
    </div>
    <div>
      <p>reactive + v-model(コンポーネント化しない)</p>
      {{ form5 }}
      <div>
        <label for="name">名前</label>
        <input type="text" id="name" v-model="form5.name" />
      </div>
      <div>
        <label for="description">説明</label>
        <input type="text" id="description" v-model="form5.description" />
      </div>
    </div>
    <div>
      <p>refとv-model(更新ロジックは子にしか書けない)</p>
      {{ form6 }}
      <custom-form-4 v-model:form="form6" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import CustomForm from "../../components/form/CustomForm.vue";
import CustomForm2 from "../../components/form/CustomForm2.vue";
import CustomForm3 from "../../components/form/CustomForm3.vue";
import CustomForm4 from "../../components/form/CustomForm4.vue";
import { useState } from "../../composables/use-state";

type Task = {
  name: string | null;
  description: string | null;
  status: string | null;
};

export default defineComponent({
  components: { CustomForm, CustomForm2, CustomForm3, CustomForm4 },

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

    // 自前のuseState(Reactはこういう感じに書く？)
    const [form4, setForm4] = useState({
      name: null,
      description: null,
      status: null,
    } as Task);
    const onUpdate4 = (key: string, value: string) => {
      setForm4({ ...form4.value, [key]: value });
    };

    // オブジェクトのrefに対してv-modelが使えるのか→ダメ（reactiveじゃないとダメ）
    // NG
    /*
    const form5 = reactive<Task>({
      name: null,
      description: null,
      status: null,
    });
     */
    const form5 = reactive<Task>({
      name: null,
      description: null,
      status: null,
    });

    const form6 = ref<Task>({
      name: null,
      description: null,
      status: null,
    });

    return {
      form,
      onUpdate,
      form2,
      onUpdate2,
      form3,
      onUpdate3,
      form4,
      onUpdate4,
      form5,
      form6,
    };
  },
});
</script>
