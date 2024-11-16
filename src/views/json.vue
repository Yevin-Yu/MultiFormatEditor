<template>
    <div class="json-page">
        <div class="json-item">
            <h1>JSON 格式化工具</h1>
            <textarea v-model="jsonInput" placeholder="请输入 JSON 字符串" rows="10" cols="50"></textarea>
            <br />
            <button @click="formatJson">格式化 JSON</button>
            <button v-if="formattedJson && !error" @click="downloadJson">下载 JSON</button>
            <span v-if="error" style="color:red">{{ error }}</span>
            <pre>{{ formattedJson }}</pre>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const jsonInput = ref<string>('');
const formattedJson = ref<string>('');
const error = ref<string>('');

const formatJson = () => {
    error.value = '';
    if (!jsonInput.value) return
    try {
        const jsonObject = JSON.parse(jsonInput.value);
        formattedJson.value = JSON.stringify(jsonObject, null, 2);
    } catch (e) {
        error.value = '无效的 JSON 字符串';
        formattedJson.value = '';
    }
};
const downloadJson = () => {
    if (!formattedJson.value) return
    const blob = new Blob([formattedJson.value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
};
</script>


<style scoped>
.json-page {
    color: var(--text-200);
    display: flex;
    width: 100%;

    .json-item {
        flex: 1;
        height: 100%;
        max-width: 100%;
    }

    h1 {
        margin: 10px;
        padding: 10px;
        margin: 0;
        font-size: 20px;
    }

    button {
        margin: 10px;
        padding: 8px 12px;
        background-color: var(--accent-200);
        border: none;
        outline: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: var(--accent-100);
            color: var(--text-200);
        }
    }

    textarea,
    pre {
        letter-spacing: 1.5;
        width: calc(100% - 40px);
        margin-bottom: 10px;
        background-color: var(--primary-200);
        outline: none;
        border: none;
        margin: 10px;
        border-radius: 12px;
        font-size: 16px;
        line-height: 20px;
        padding: 10px;
        color: var(--text-200);
        resize: none;
        height: 230px;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
    }

    pre {
        height: calc(100% - 400px);
        overflow: auto;
    }
}
</style>