<template>
    <header class="header">
        <div class="logo">
            <img src="@/assets/logo.png" alt="">
            <h1>{{ title }}</h1>
        </div>
        <nav>
            <ul class="nav-links">
                <li v-for="link in links" :key="link.name">
                    <router-link :to="link.path">{{ link.name }}</router-link>
                </li>
                <li @click="settings.isSHowAuthor = !settings.isSHowAuthor">联系作者</li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Link {
    name: string;
    path: string;
    navId?: string;
}

const props = defineProps<{
    title?: string;
    links?: Link[];
}>();

const defaultLinks: Link[] = [
    { name: 'JSON格式', navId: 'json', path: '/json' },
];

const title = props.title || '耶温-多格式编辑';
const links = props.links || defaultLinks;

// 引入设置
import { storeToRefs } from "pinia";
import { useSettingsStore } from '../stores/settingsStore';
const { settings } = storeToRefs(useSettingsStore());
</script>

<style scoped>
.header {
    margin:0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background:linear-gradient(to right, var(--primary-100) 0%, var(--primary-200) 100%);
    color: var(--text-200);
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
    border-radius: 0 0 12px 12px;
}


.logo h1 {
    display: inline-block;
    line-height: 32px;
    font-size: 20px;
    font-weight: normal;
    margin: 0;
}

.logo img {
    border-radius: 12px;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    vertical-align: bottom;
}

.nav-links {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
}

.nav-links li {
    display: inline;
    padding: 12px;
    border-radius: 12px;
}

.nav-links li:hover {
    cursor: pointer;
    background-color: var(--primary-100);
    color: var(--text-100);
}

.nav-links a {
    color: var(--text-100);
    text-decoration: none;
}

.nav-links a:hover {
    text-decoration: none;
}
</style>