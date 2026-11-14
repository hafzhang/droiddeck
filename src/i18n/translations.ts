export type Locale = 'en' | 'zh' | 'ja';

export const locales: Locale[] = ['en', 'zh', 'ja'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語'
};

export const ui: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.devices': 'Devices',
    'nav.troubleshooting': 'Troubleshooting',
    'nav.games': 'Games',
    'nav.compare': 'Compare',
    'nav.updates': 'Updates',
    'nav.matrix': 'Matrix',
    'nav.faq': 'FAQ',
    'nav.submitReport': 'Submit Report',
    'nav.getDroidDeck': 'Get DroidDeck',
    'footer.tagline': 'Independent troubleshooting & compatibility database for DroidDeck.',
    'footer.copyright': '© 2026 DroidDeck Guide',
    'footer.disclaimer': 'DroidDeck Guide is an independent community site and is not affiliated with the DroidDeck development team or Valve.',
    'lang.switch': 'Language',
    'search.label': 'Search',
    'source.verified': 'Verified',
    'source.community': 'Community Report',
    'source.testing': 'Testing',
    'source.untested': 'Untested',
    'rating.label': 'Compatibility rating: {rating} out of 5',
    'common.readMore': 'Read more',
    'common.browse': 'Browse',
    'common.fix': 'Fix',
    'common.submit': 'Submit'
  },
  zh: {
    'nav.home': '首页',
    'nav.devices': '设备',
    'nav.troubleshooting': '故障排除',
    'nav.games': '游戏',
    'nav.compare': '对比',
    'nav.updates': '更新',
    'nav.matrix': '矩阵',
    'nav.faq': '常见问题',
    'nav.submitReport': '提交报告',
    'nav.getDroidDeck': '获取 DroidDeck',
    'footer.tagline': '独立的 DroidDeck 故障排除与兼容性数据库。',
    'footer.copyright': '© 2026 DroidDeck Guide',
    'footer.disclaimer': 'DroidDeck Guide 是独立社区站点，与 DroidDeck 开发团队或 Valve 无关联。',
    'lang.switch': '语言',
    'search.label': '搜索',
    'source.verified': '已验证',
    'source.community': '社区报告',
    'source.testing': '测试中',
    'source.untested': '未测试',
    'rating.label': '兼容性评分：{rating} / 5',
    'common.readMore': '阅读更多',
    'common.browse': '浏览',
    'common.fix': '修复',
    'common.submit': '提交'
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.devices': 'デバイス',
    'nav.troubleshooting': 'トラブルシューティング',
    'nav.games': 'ゲーム',
    'nav.compare': '比較',
    'nav.updates': 'アップデート',
    'nav.matrix': 'マトリクス',
    'nav.faq': 'よくある質問',
    'nav.submitReport': 'レポートを投稿',
    'nav.getDroidDeck': 'DroidDeck を入手',
    'footer.tagline': 'DroidDeck の独立したトラブルシューティング＆互換性データベース。',
    'footer.copyright': '© 2026 DroidDeck Guide',
    'footer.disclaimer': 'DroidDeck Guide は独立したコミュニティサイトであり、DroidDeck 開発チームまたは Valve とは関係ありません。',
    'lang.switch': '言語',
    'search.label': '検索',
    'source.verified': '検証済み',
    'source.community': 'コミュニティレポート',
    'source.testing': 'テスト中',
    'source.untested': '未テスト',
    'rating.label': '互換性評価: {rating} / 5',
    'common.readMore': '続きを読む',
    'common.browse': '閲覧',
    'common.fix': '修正',
    'common.submit': '投稿'
  }
};

export function t(locale: Locale, key: string, vars?: Record<string, string>): string {
  const str = ui[locale]?.[key] ?? ui.en[key] ?? key;
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

export function localizePath(path: string, locale: Locale): string {
  if (locale === 'en') return path;
  if (path === '/') return `/${locale}/`;
  return `/${locale}${path}`;
}
