<template>
    <div class="json-page">
        <div class="json-item">
            <h1>JSON 格式化工具</h1>
            <!-- JSON输入 -->
            <div class="json-item-input">
                <textarea v-model="jsonInput" placeholder="请输入 JSON 字符串" rows="10" cols="50"></textarea>
                <textarea v-show="isShowContrast" v-model="jsonInput2" placeholder="请输入 JSON 字符串" rows="10"
                    cols="50"></textarea>
            </div>
            <!-- 功能按钮 -->
            <button @click="formatJson">格式化 JSON</button>
            <button v-if="isShowContrast" @click="isShowContrast = false">删除对比JSON</button>
            <button v-else @click="isShowContrast = true">添加对比JSON</button>
            <button v-if="formattedJson && !error" @click="clickDownload">下载 JSON</button>
            <span v-if="error" style="color:red">{{ error }}</span>
            <!-- 格式化内容 -->
            <div class="json-item-output" :key="keyWords">
                <div contenteditable="true" disabled class="json-output" ref="div1" v-html="formattedJson"></div>
                <div contenteditable="true" v-show="isShowContrast" class="json-output" ref="div2"
                    v-html="formattedJson2"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // 你可以选择其他样式
import { ref } from 'vue';
const keyWords = ref(new Date().getTime())
// 格式化
const jsonInput = ref<string>('');
const jsonData = ref<any>({});
const formattedJson = ref<string>('');
// 对比
const isShowContrast = ref(false)
const jsonInput2 = ref<string>('');
const jsonData2 = ref<any>({});
const formattedJson2 = ref<string>('');
// 错误信息
const error = ref<string>('');
// 格式话方法
const formatJson = () => {
    error.value = '';
    if (!jsonInput.value && !jsonInput2.value) {
        formattedJson.value = ''
        formattedJson2.value = ''
        return
    }
    try {
        if (jsonInput.value) {
            const jsonObject = JSON.parse(jsonInput.value);
            jsonData.value = JSON.stringify(jsonObject, null, 2);
            formattedJson.value = hljs.highlight(jsonData.value, { language: 'json' }).value;
        }
        if (isShowContrast.value && jsonInput2.value) {
            const jsonObject2 = JSON.parse(jsonInput2.value);
            jsonData2.value = JSON.stringify(jsonObject2, null, 2);
            formattedJson2.value = hljs.highlight(jsonData2.value, { language: 'json' }).value;
        }
        keyWords.value = new Date().getTime()
    } catch (e) {
        console.log(e)
        error.value = '无效的 JSON 字符串';
        formattedJson.value = '';
        formattedJson2.value = ''
    }
};
// 下载JSON
const clickDownload = () => {
    downloadJson(jsonData.value, 'formatted.json')
    if (jsonData2.value) {
        downloadJson(jsonData2.value, 'formatted2.json')
    }
}
const downloadJson = (data, name) => {
    if (!data) return
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name || 'formatted.json';
    a.click();
    URL.revokeObjectURL(url)
};

//  对比 同步滚动
import { useScrollSync } from '../hooks/useScrollSync';
const div1 = ref<HTMLDivElement | null>(null);
const div2 = ref<HTMLDivElement | null>(null);
useScrollSync(div1, div2);
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
    .json-output {
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
        flex: 1;
        position: relative;
    }

    .json-item-input {
        display: flex;
    }

    .json-item-output {
        width: 100%;
        display: flex;
        height: calc(100% - 378px);
        position: relative;
    }

    .json-output {
        padding: 10px;
        height: max-content;
        box-sizing: border-box;
        height: 100%;
        flex: 1;
        white-space: pre-wrap;
        word-wrap: break-word;
        background-color: var(--bg-200);
        margin-right: 10px;
        overflow: auto;
    }
}
</style>