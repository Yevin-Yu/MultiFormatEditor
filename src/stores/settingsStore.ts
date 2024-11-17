// src/stores/settingsStore.ts
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

// 定义设置的类型
interface Settings {
    isSHowAuthor: boolean;
}

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref<Settings>({
        isSHowAuthor: true, // 是否显示作者信息
    });

    // 从 localStorage 加载设置
    const loadSettings = () => {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            settings.value = JSON.parse(savedSettings);
        }
    };

    // 保存设置到 localStorage
    const saveSettings = () => {
        localStorage.setItem('settings', JSON.stringify(settings.value));
    };

    // 监视 settings 的变化并保存到 localStorage
    watch(settings, saveSettings, { deep: true });

    // 加载设置
    loadSettings();

    return { settings };
});
