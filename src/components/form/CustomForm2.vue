<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="name">名前</label>
      <input
        type="text"
        id="name"
        :value="form.name"
        @input="updateValue('name', $event.target.value)"
      />
    </div>
    <div>
      <label for="description">説明</label>
      <input
        type="text"
        id="description"
        :value="form.description"
        @input="updateValue('description', $event.target.value)"
      />
    </div>
    <div>
      <label for="status">ステータス</label>
      <select id="status" @change="updateValue('status', $event.target.value)">
        <option value="1">OPEN</option>
        <option value="2">IN PROGRESS</option>
        <option value="3">IN REVIEW</option>
        <option value="4">CLOSED</option>
      </select>
    </div>
    <div>
      <button type="submit">登録する</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    form: { type: Object, required: true },
    onUpdate: { type: Function, required: true },
  },

  setup(props) {
    const updateValue = (key: string, value: string | number) => {
      props.onUpdate({ ...props.form, [key]: value });
    };

    return { updateValue };
  },
});
</script>
