/**
 * 配置层 —— 换一个游戏，只改这个文件。
 * 字段结构刻意对齐《8月航海》手册关卡 3 的 ChatGPT 调研提示词输出的 JSON，
 * 这样手册流程产出的素材可以直接填进来，不用二次转换。
 */
/**
 * image：分类卡片配图，放在 public/ 下的路径；内页 frontmatter 的 image 优先于它
 * imageFit："cover"（默认）铺满卡片，适合风景/场景照；"contain" 居中不裁切，
 * 给透明背景的单位立绘用——铺满会把方形小图硬拉伸/裁得只剩局部，很难看
 */
export type NavCategory = { slug: string; label: string; image?: string; imageFit?: "cover" | "contain" };

// ---- 图片（官方 Roblox 游戏媒体，均已自托管到 public/，不热链）----
// 来源：games.roblox.com/v2/games/{universeId}/media，9 张官方宣传截图 + 1 张游戏图标，
// 按内容相关性分配到 7 个分类，不做轮换复用。
const IMG = {
  icon: "/images/official/icon.png",
  dashboard: "/images/screenshots/ss-1.png", // 车内仪表盘 + FSD 触屏可视化
  newCars1: "/images/screenshots/ss-2.png", // Cybertruck 造型 + Model Y 造型新车
  wheels: "/images/screenshots/ss-3.png", // Model 3 造型车 3D 轮毂特写
  newCars2: "/images/screenshots/ss-4.png", // 多品牌造型车辆停车场
  city: "/images/screenshots/ss-5.png", // "New City" 市区高楼场景
  tunnel: "/images/screenshots/ss-6.png", // 隧道车流
  suburb: "/images/screenshots/ss-7.png", // 郊区住宅 + 室内
  phoneApp: "/images/screenshots/ss-8.png", // 车主 App 界面（Control/Alarm/Flash/Light show/Summon）
  fsdOverlay: "/images/screenshots/ss-9.png", // FSD 路径蓝色可视化叠加层
};

export const site = {
  // ---- 基本信息 ----
  gameName: "Autopilot Simulator",
  // 隐私政策/条款页的免责声明用（"不隶属于开发商或 XX 公司"）；这是 Roblox 游戏，填 Roblox Corporation
  platformOwner: "Roblox Corporation",
  siteName: "Autopilot Simulator Guide",
  // 导航 logo 与 apple icon；/favicon.ico 放在 public/ 根目录
  logo: "/images/official/icon.png",
  // 上线前改成真实域名；本地开发用 localhost
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://autopilotsimulatorguide.wiki",
  // 隐私政策/服务条款页展示，也是隐私相关问题的联系方式
  contactEmail: "asgharrulislam401@gmail.com",

  // ---- SEO 元数据 ----
  meta: {
    title: "Autopilot Simulator Guide — FSD, Controls, Codes",
    description:
      "Independent Autopilot Simulator (Roblox) guide: how FSD and Autopilot work, dashboard and phone app controls, the vehicle roster, map, and active codes — sourced from the game's official Roblox listing.",
    keywords: "Autopilot Simulator, Roblox, FSD, Tesla, codes, controls, vehicles, map",
  },

  // ---- 官方链接（手册：只放官方和正经社群，不留 404）----
  links: {
    platform: "https://www.roblox.com/games/11832484500/Autopilot-Simulator-FSD",
    official: "https://www.roblox.com/communities/16790742/Plaid-Studio",
    discord: "https://discord.com/invite/fKnAhFrfsD",
    youtube: "",
    reddit: "",
  },

  // ---- 主题色（HSL，亮暗两套，全站唯一来源）----
  // 键名自动转成 CSS 变量（themeShadow → --theme-shadow）。配色取自游戏本身的品牌调性：
  // 近黑（仪表盘/车漆，主色）+ 特斯拉红（强调色，界面里的刹车灯/警示色）+ 冷灰背景
  theme: {
    light: {
      theme: "0 0% 14%", themeLight: "0 0% 28%", themeShadow: "0 0% 6%",
      accent: "355 85% 45%", accentFg: "0 0% 100%", accentShadow: "355 80% 32%",
      bg: "210 20% 97%", fg: "0 0% 10%", muted: "215 10% 40%", card: "0 0% 100%", border: "215 15% 88%",
    },
    dark: {
      theme: "0 0% 22%", themeLight: "0 0% 38%", themeShadow: "0 0% 10%",
      accent: "355 80% 52%", accentFg: "0 0% 100%", accentShadow: "355 75% 35%",
      bg: "220 15% 7%", fg: "0 0% 92%", muted: "215 10% 62%", card: "220 14% 11%", border: "220 12% 18%",
    },
  },

  // ---- 多语言（手册：最多 4 门，必须有英语；新手先把英语做扎实）----
  i18n: { locales: ["en"] as const, defaultLocale: "en" as const },

  // ---- 导航分类（对应 content/<locale>/<category>/ 目录）----
  // 游戏 2022-12-16 上线，Google 自动补全测出 14 个独立搜索意图，够撑起一个精简分类站，
  // 不硬凑成大而全——每个分类对应 1-2 个测出来的意图簇
  categories: [
    { slug: "guide", label: "Beginner Guide", image: IMG.dashboard },
    { slug: "controls", label: "Controls", image: IMG.phoneApp, imageFit: "contain" },
    { slug: "fsd", label: "FSD & Autopilot", image: IMG.fsdOverlay },
    { slug: "vehicles", label: "Vehicles", image: IMG.newCars2 },
    { slug: "map", label: "Map", image: IMG.city },
    { slug: "codes", label: "Codes", image: IMG.tunnel },
    { slug: "community", label: "Community", image: IMG.suburb },
  ] satisfies NavCategory[],

  // ---- 首页各区块 ----
  hero: {
    eyebrow: "Independent Community Guide",
    title: "Autopilot Simulator",
    image: { src: IMG.dashboard, alt: "In-car dashboard view in Autopilot Simulator showing the FSD touchscreen visualization, official Roblox promo screenshot" },
    description:
      "Drive 100+ ICE, hybrid and electric vehicles on Autopilot or FSD across a full open map. Every guide here is checked against the game's official Roblox listing and its own promotional media.",
    stats: ["130M+ Visits", "100+ Vehicles", "3M+ Community Members", "Roblox Vehicle Sim"],
    primaryCta: { label: "Start Beginner Guide", href: "/guide/autopilot-simulator-beginner-guide" },
    secondaryCta: { label: "How FSD Works", href: "/fsd" },
    tertiaryCta: { label: "Check Codes", href: "/codes" },
  },

  start: {
    eyebrow: "Start Here",
    title: "Your Autopilot Simulator Journey",
    cards: [
      { number: "1", title: "Beginner Guide", description: "Spawning in, your first drive, and what FSD does.", href: "/guide/autopilot-simulator-beginner-guide", image: IMG.dashboard },
      { number: "2", title: "Controls", description: "Dashboard touchscreen and the in-game phone app, explained.", href: "/controls", image: IMG.phoneApp },
      { number: "3", title: "FSD & Autopilot", description: "Every self-driving feature the game lists, one by one.", href: "/fsd", image: IMG.fsdOverlay },
      { number: "4", title: "Vehicles", description: "The 100+ car roster, from Cybertruck-style trucks to sedans.", href: "/vehicles", image: IMG.newCars1 },
    ],
  },

  aboutGame: {
    title: "What is Autopilot Simulator?",
    paragraphs: [
      "Autopilot Simulator (full title \"Autopilot Simulator / FSD\") is a Roblox vehicle simulator by developer Jun4649s, released December 16, 2022 and still actively updated. The game's own description calls it \"the most realistic Tesla-related game on Roblox\" — you drive over 100 ICE, hybrid and electric vehicles across an open map, either manually or by engaging Autopilot / FSD (Full Self-Driving) through a dashboard touchscreen styled after Tesla's own interface.",
      "The game is run by the Roblox community group Plaid Studio (over 3 million members), owned by the game's creator. Its own group description lists lane-change, traffic-light detection, automatic intersection turns, summon, auto-park, automatic emergency braking (AEB), a light show mode and a music function as the self-driving and car-feature systems it models.",
      "A note on performance: the developer's own listing warns the game \"uses development techniques that cause tremendous lag for low-end devices,\" and recommends private servers if it runs poorly. Xbox and mobile are described as partially supported.",
    ],
    stats: [
      { label: "Developer", value: "Jun4649s / Plaid Studio" },
      { label: "Platform", value: "Roblox" },
      { label: "Released", value: "Dec 16, 2022" },
      { label: "Genre", value: "Simulation / Vehicle Sim" },
      { label: "Price", value: "Free to play" },
    ],
    cta: { label: "Explore All Guides", href: "/guide" },
  },

  finalCta: {
    title: "Ready to Engage Autopilot?",
    description: "From your first FSD-assisted drive to the full vehicle roster, every page here cites where its claims came from.",
    primary: { label: "Read the Beginner Guide", href: "/guide/autopilot-simulator-beginner-guide" },
    secondary: { label: "Play on Roblox", href: "https://www.roblox.com/games/11832484500/Autopilot-Simulator-FSD" },
  },

  footer: {
    aboutTitle: "Autopilot Simulator Guide",
    about:
      "An independent, fan-made Autopilot Simulator reference. Not affiliated with Jun4649s, Plaid Studio, Tesla, Inc., or Roblox Corporation.",
    description: "Free Roblox vehicle sim. Drive 100+ cars on Autopilot or FSD across an open map.",
  },
} as const;

export type Site = typeof site;
