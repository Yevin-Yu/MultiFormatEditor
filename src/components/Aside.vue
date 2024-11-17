<template>
    <aside class="aside">
        <div class="user-image">
            <img src="@/assets/logo.png" alt="头像">
        </div>
        <h2>耶温</h2>
        <h3>Yevin</h3>
        <p>Web前端开发</p>
        <p>让每一次点击都充满惊喜！</p>
        <p>认真生活，简单做人，用心做事。</p>
        <h3>其他链接</h3>
        <ul class="social-links">
            <li v-for="link in socialLinks" :key="link.name">
                <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.name }}</a>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">

interface SocialLink {
    name: string;
    url: string;
}

const defaultSocialLinks: SocialLink[] = [
    { name: '🔗GitHub🔗', url: 'https://github.com/Yevin-Yu' },
    { name: '🔗耶温博客🔗', url: 'https://yuwb.cn' },
    { name: '🔗耶温导航🔗', url: 'https://yuwb.cn/nav' }
];

const socialLinks = defaultSocialLinks;
</script>

<style scoped>
.aside {
    margin: 18px 0 18px 18px;
    padding: 12px;
    border-radius: 12px;
    width: 240px;
    background-color: #1f2b3e;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
    color: var(--text-200);
    text-align: center;
    color: var(--text-200);
    overflow: auto;
}

p {
    color: var(--primary-300);
}

.user-image {
    text-align: center;
}

.user-image img {
    width: 180px;
    height: 180px;
    margin: 1rem;
}

.social-links {
    list-style: none;
    padding: 0;
}

.social-links li {
    margin: 0.5rem 0;
}

.social-links a {
    display: inline-block;
    margin: 6px;
    color: var(--text-200);
}

.social-links a:hover {
    color: var(--primary-300);
}
</style>