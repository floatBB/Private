// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// 给文章里的 h2 按顺序编 id（s1、s2…），供左侧目录锚点使用
function h2Ids() {
  return (tree) => {
    let n = 0;
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'element' && node.tagName === 'h2') {
        n += 1;
        node.properties = node.properties || {};
        node.properties.id = 's' + n;
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://website-1c4ec6.netlify.app',
  integrations: [mdx(), react()],
  markdown: {
    rehypePlugins: [h2Ids],
  },
});
