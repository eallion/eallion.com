var AIGCS=(function(){var e={"zh-hans":{title:`评 论`,fediTitle:`联邦宇宙评论`,loading:`AI 正在生成评论...`,empty:`暂无评论。`,error:`评论加载失败。`,timeout:`生成超时，请刷新页面。`,more:`更多`,emptyContentWarning:`由于无法直接读取页面内容，此条评论由 AI 根据标题生成。`,poweredBy:`– 由 <a href="https://docs.aigcs.chat" target="_blank" rel="noopener">AIGCS</a> 提供支持`,visitorTitle:`访客评论`,formName:`昵称`,formEmail:`邮箱`,formUrl:`网址`,formContent:`评论内容`,formSubmit:`发表评论`,formReply:`发表回复`,formSubmitting:`提交中...`,formSuccess:`评论发表成功！`,formError:`评论发表失败，请稍后重试。`,adminPin:`管理员 PIN`,pinError:`PIN 错误，请重新输入`,pinRequired:`管理员邮箱需要验证 管理员 PIN 码`,delete:`删除`,deleteConfirm:`确认删除？`,captchaError:`请完成验证码`,captchaPrompt:`请完成人机验证后再次提交`,reply:`回复`,replyTo:`回复给`,cancelReply:`取消回复`,edit:`编辑`,cancelEdit:`取消`,edited:`已编辑`,replyNotify:`有人回复时邮件通知我`,deleteByEmail:`通过邮箱删除`,deleteEmailPlaceholder:`输入评论时使用的邮箱`,sendCode:`发送验证码`,verifyCode:`验证码`,verifyDelete:`确认删除`,codeSent:`验证码已发送，请查收邮件`,deleteFormError:`删除失败，请重试`,deleteEmailRequired:`请填写邮箱`,editTooLate:`超过编辑时限`,nameTooLong:`昵称太长，请控制在 8 个汉字以内`},en:{title:`AI Comments`,fediTitle:`Fediverse`,loading:`AI is generating comments...`,empty:`No comments yet.`,error:`Failed to load comments.`,timeout:`Generation timed out. Please refresh.`,more:`more`,emptyContentWarning:`AI generated this comment based on the page title only, as the page content could not be fetched.`,poweredBy:`– Powered by <a href="https://docs.aigcs.chat" target="_blank" rel="noopener">AIGCS</a>`,visitorTitle:`Comments`,formName:`Name`,formEmail:`Email`,formUrl:`Website`,formContent:`Comment`,formSubmit:`Submit Comment`,formReply:`Submit Reply`,formSubmitting:`Submitting...`,formSuccess:`Comment posted successfully!`,formError:`Failed to post comment. Please try again.`,adminPin:`Admin PIN`,pinError:`Incorrect PIN, please try again`,pinRequired:`Admin email requires admin PIN verification`,delete:`Delete`,deleteConfirm:`Confirm delete?`,captchaError:`Please complete the captcha`,captchaPrompt:`Please complete the verification and submit again`,reply:`Reply`,replyTo:`Reply to`,cancelReply:`Cancel reply`,edit:`Edit`,cancelEdit:`Cancel`,edited:`Edited`,replyNotify:`Notify me by email when someone replies`,deleteByEmail:`Delete via email`,deleteEmailPlaceholder:`Enter your comment email`,sendCode:`Send Code`,verifyCode:`Verification Code`,verifyDelete:`Confirm Delete`,codeSent:`Code sent, please check your email`,deleteFormError:`Delete failed, please try again.`,deleteEmailRequired:`Please enter your email`,editTooLate:`Edit window expired`,nameTooLong:`Name is too long. Please use at most 8 CJK characters (16 latin letters).`},"zh-hant":{title:`AI 評論`,loading:`AI 正在產生評論...`,empty:`暫無評論。`,error:`評論載入失敗。`,timeout:`產生超時，請重新整理頁面。`,more:`更多`,emptyContentWarning:`由於無法直接讀取頁面內容，此條評論由 AI 根據標題產生。`,poweredBy:`– 由 <a href="https://docs.aigcs.chat" target="_blank" rel="noopener">AIGCS</a> 提供支援`,visitorTitle:`訪客評論`,formName:`暱稱`,formEmail:`郵箱`,formUrl:`網址`,formContent:`評論內容`,formSubmit:`發表評論`,formReply:`發表回覆`,formSubmitting:`提交中...`,formSuccess:`評論發表成功！`,formError:`評論發表失敗，請稍後重試。`,adminPin:`管理員 PIN`,pinError:`PIN 錯誤，請重新輸入`,pinRequired:`管理員郵箱需要驗證管理員 PIN 碼`,delete:`刪除`,deleteConfirm:`確認刪除？`,captchaError:`請完成驗證碼`,captchaPrompt:`請完成人機驗證後再次提交`,reply:`回覆`,replyTo:`回覆給`,cancelReply:`取消回覆`,edit:`編輯`,cancelEdit:`取消`,edited:`已編輯`,replyNotify:`有人回覆時郵件通知我`,deleteByEmail:`透過郵箱刪除`,deleteEmailPlaceholder:`輸入評論時使用的郵箱`,sendCode:`發送驗證碼`,verifyCode:`驗證碼`,verifyDelete:`確認刪除`,codeSent:`驗證碼已發送，請查收郵件`,deleteFormError:`刪除失敗，請重試`,deleteEmailRequired:`請填寫郵箱`,editTooLate:`超過編輯時限`,nameTooLong:`暱稱太長，請控制在 8 個漢字以內`}},t=`
:host {
  display: block;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
}

/* ── giscus-compatible themes ──
     theme="auto"|"light"|"dark" — mode
     light-theme="<name>"        — light variant (default: light)
     dark-theme="<name>"         — dark variant  (default: dark_dimmed)
  ── */

:host { --outer-border: 1px solid var(--border); }

/* Fallback for unknown / missing light themes */
:host([data-theme="light"]) {
  --outer-bg: #f5f5f5; --card-bg: #fafafa; --text: #1f2937;
  --text-secondary: #6b7280; --text-muted: #9ca3af;
  --border: #e5e7eb; --card-border: #e5e7eb; --error-color: #ef4444;
  --avatar-bg: #6366f1; --reaction-bg: #f3f4f6; --reaction-hover: #e5e7eb;
  --link: #3b82f6; --outer-border: 1px solid var(--border);
}

/* Fallback for unknown / missing dark themes */
:host([data-theme="dark"]) {
  --outer-bg: #22272e; --card-bg: #2d333b; --text: #adbac7;
  --text-secondary: #768390; --text-muted: #545d68;
  --border: #444c56; --card-border: #444c56; --error-color: #f47067;
  --avatar-bg: #6366f1; --reaction-bg: #2d333b; --reaction-hover: #373e47;
  --link: #539bf5; --outer-border: 1px solid var(--border);
}

/* ════════════════════════════════════════════
   Light themes
   ════════════════════════════════════════════ */

/* light (default) */
:host([data-theme="light"][data-active-theme="light"]) {
  --outer-bg: #f5f5f5; --card-bg: #fafafa; --text: #1f2937;
  --text-secondary: #6b7280; --text-muted: #9ca3af;
  --border: #e5e7eb; --card-border: #e5e7eb; --error-color: #ef4444;
  --avatar-bg: #6366f1; --reaction-bg: #f3f4f6; --reaction-hover: #e5e7eb;
  --link: #3b82f6; --outer-border: 1px solid var(--border);
}

/* light_high_contrast */
:host([data-theme="light"][data-active-theme="light_high_contrast"]) {
  --outer-bg: #ffffff; --card-bg: #ffffff; --text: #0f172a;
  --text-secondary: #334155; --text-muted: #64748b;
  --border: #cbd5e1; --card-border: #94a3b8; --error-color: #dc2626;
  --avatar-bg: #4f46e5; --reaction-bg: #f8fafc; --reaction-hover: #e2e8f0;
  --link: #2563eb; --outer-border: 1px solid var(--border);
}

/* light_protanopia */
:host([data-theme="light"][data-active-theme="light_protanopia"]) {
  --outer-bg: #f5f5f5; --card-bg: #fafafa; --text: #1f2937;
  --text-secondary: #6b7280; --text-muted: #9ca3af;
  --border: #e5e7eb; --card-border: #e5e7eb; --error-color: #dc2626;
  --avatar-bg: #6366f1; --reaction-bg: #f3f4f6; --reaction-hover: #e5e7eb;
  --link: #0066cc; --outer-border: 1px solid var(--border);
}

/* light_tritanopia */
:host([data-theme="light"][data-active-theme="light_tritanopia"]) {
  --outer-bg: #f5f5f5; --card-bg: #fafafa; --text: #1f2937;
  --text-secondary: #6b7280; --text-muted: #9ca3af;
  --border: #e5e7eb; --card-border: #e5e7eb; --error-color: #dc2626;
  --avatar-bg: #6366f1; --reaction-bg: #f3f4f6; --reaction-hover: #e5e7eb;
  --link: #007f5f; --outer-border: 1px solid var(--border);
}

/* noborder_light */
:host([data-theme="light"][data-active-theme="noborder_light"]) {
  --outer-bg: #f5f5f5; --card-bg: #fafafa; --text: #1f2937;
  --text-secondary: #6b7280; --text-muted: #9ca3af;
  --border: #e5e7eb; --card-border: #e5e7eb; --error-color: #ef4444;
  --avatar-bg: #6366f1; --reaction-bg: #f3f4f6; --reaction-hover: #e5e7eb;
  --link: #3b82f6; --outer-border: none;
}

/* catppuccin_latte */
:host([data-theme="light"][data-active-theme="catppuccin_latte"]) {
  --outer-bg: #eff1f5; --card-bg: #e6e9ef; --text: #4c4f69;
  --text-secondary: #6c6f85; --text-muted: #9ca0b0;
  --border: #ccd0da; --card-border: #bcc0cc; --error-color: #d20f39;
  --avatar-bg: #8839ef; --reaction-bg: #e6e9ef; --reaction-hover: #dce0e8;
  --link: #1e66f5; --outer-border: 1px solid var(--border);
}

/* gruvbox_light */
:host([data-theme="light"][data-active-theme="gruvbox_light"]) {
  --outer-bg: #fbf1c7; --card-bg: #ebdbb2; --text: #3c3836;
  --text-secondary: #665c54; --text-muted: #928374;
  --border: #d5c4a1; --card-border: #bdae93; --error-color: #cc241d;
  --avatar-bg: #98971a; --reaction-bg: #ebdbb2; --reaction-hover: #d5c4a1;
  --link: #076678; --outer-border: 1px solid var(--border);
}

/* fro */
:host([data-theme="light"][data-active-theme="fro"]) {
  --outer-bg: #e8f5e9; --card-bg: #f1f8f4; --text: #1b5e20;
  --text-secondary: #388e3c; --text-muted: #81c784;
  --border: #c8e6c9; --card-border: #a5d6a7; --error-color: #c62828;
  --avatar-bg: #00897b; --reaction-bg: #f1f8f4; --reaction-hover: #dcedc8;
  --link: #00695c; --outer-border: 1px solid var(--border);
}

/* ════════════════════════════════════════════
   Dark themes
   ════════════════════════════════════════════ */

/* dark_dimmed / dimmed (default) */
:host([data-theme="dark"][data-active-theme="dark_dimmed"]),
:host([data-theme="dark"][data-active-theme="dimmed"]) {
  --outer-bg: #22272e; --card-bg: #2d333b; --text: #adbac7;
  --text-secondary: #768390; --text-muted: #545d68;
  --border: #444c56; --card-border: #444c56; --error-color: #f47067;
  --avatar-bg: #6366f1; --reaction-bg: #2d333b; --reaction-hover: #373e47;
  --link: #539bf5; --outer-border: 1px solid var(--border);
}

/* dark */
:host([data-theme="dark"][data-active-theme="dark"]) {
  --outer-bg: #0d1117; --card-bg: #161b22; --text: #e6edf3;
  --text-secondary: #8b949e; --text-muted: #545d68;
  --border: #30363d; --card-border: #30363d; --error-color: #f85149;
  --avatar-bg: #6366f1; --reaction-bg: #161b22; --reaction-hover: #1c2128;
  --link: #58a6ff; --outer-border: 1px solid var(--border);
}

/* dark_high_contrast */
:host([data-theme="dark"][data-active-theme="dark_high_contrast"]) {
  --outer-bg: #000000; --card-bg: #0a0e14; --text: #ffffff;
  --text-secondary: #d0d7de; --text-muted: #8b949e;
  --border: #6e7681; --card-border: #6e7681; --error-color: #ff6b6b;
  --avatar-bg: #8250df; --reaction-bg: #0a0e14; --reaction-hover: #1c2128;
  --link: #71b7ff; --outer-border: 1px solid var(--border);
}

/* dark_protanopia */
:host([data-theme="dark"][data-active-theme="dark_protanopia"]) {
  --outer-bg: #1c2128; --card-bg: #22272e; --text: #adbac7;
  --text-secondary: #768390; --text-muted: #545d68;
  --border: #444c56; --card-border: #444c56; --error-color: #f47067;
  --avatar-bg: #6366f1; --reaction-bg: #22272e; --reaction-hover: #373e47;
  --link: #71b7ff; --outer-border: 1px solid var(--border);
}

/* dark_tritanopia */
:host([data-theme="dark"][data-active-theme="dark_tritanopia"]) {
  --outer-bg: #1c2128; --card-bg: #22272e; --text: #adbac7;
  --text-secondary: #768390; --text-muted: #545d68;
  --border: #444c56; --card-border: #444c56; --error-color: #f47067;
  --avatar-bg: #6366f1; --reaction-bg: #22272e; --reaction-hover: #373e47;
  --link: #57d9a3; --outer-border: 1px solid var(--border);
}

/* transparent_dark */
:host([data-theme="dark"][data-active-theme="transparent_dark"]) {
  --outer-bg: transparent; --card-bg: transparent; --text: #adbac7;
  --text-secondary: #768390; --text-muted: #545d68;
  --border: #444c56; --card-border: #444c56; --error-color: #f47067;
  --avatar-bg: #6366f1; --reaction-bg: transparent;
  --reaction-hover: rgba(255,255,255,0.08);
  --link: #539bf5; --outer-border: 1px solid var(--border);
}

/* noborder_dark */
:host([data-theme="dark"][data-active-theme="noborder_dark"]) {
  --outer-bg: #22272e; --card-bg: #2d333b; --text: #adbac7;
  --text-secondary: #768390; --text-muted: #545d68;
  --border: #444c56; --card-border: #444c56; --error-color: #f47067;
  --avatar-bg: #6366f1; --reaction-bg: #2d333b; --reaction-hover: #373e47;
  --link: #539bf5; --outer-border: none;
}

/* noborder_gray */
:host([data-theme="dark"][data-active-theme="noborder_gray"]) {
  --outer-bg: #1c2128; --card-bg: #22272e; --text: #adbac7;
  --text-secondary: #768390; --text-muted: #545d68;
  --border: #444c56; --card-border: #444c56; --error-color: #f47067;
  --avatar-bg: #6366f1; --reaction-bg: #22272e; --reaction-hover: #373e47;
  --link: #539bf5; --outer-border: none;
}

/* cobalt */
:host([data-theme="dark"][data-active-theme="cobalt"]) {
  --outer-bg: #193549; --card-bg: #1d3a4f; --text: #ffffff;
  --text-secondary: #9effff; --text-muted: #6a9fb5;
  --border: #2d5b7a; --card-border: #2d5b7a; --error-color: #ff628c;
  --avatar-bg: #ff9d00; --reaction-bg: #1d3a4f; --reaction-hover: #264b66;
  --link: #9effff; --outer-border: 1px solid var(--border);
}

/* purple_dark */
:host([data-theme="dark"][data-active-theme="purple_dark"]) {
  --outer-bg: #1e1e2e; --card-bg: #2a2a3e; --text: #e0d0f0;
  --text-secondary: #a090c0; --text-muted: #706090;
  --border: #3a3a5e; --card-border: #4a4a6e; --error-color: #f08080;
  --avatar-bg: #b084f0; --reaction-bg: #2a2a3e; --reaction-hover: #3a3a5e;
  --link: #b084f0; --outer-border: 1px solid var(--border);
}

/* gruvbox */
:host([data-theme="dark"][data-active-theme="gruvbox"]) {
  --outer-bg: #282828; --card-bg: #32302f; --text: #ebdbb2;
  --text-secondary: #a89984; --text-muted: #7c6f64;
  --border: #504945; --card-border: #504945; --error-color: #fb4934;
  --avatar-bg: #98971a; --reaction-bg: #32302f; --reaction-hover: #3c3836;
  --link: #458588; --outer-border: 1px solid var(--border);
}

/* gruvbox_dark */
:host([data-theme="dark"][data-active-theme="gruvbox_dark"]) {
  --outer-bg: #1d2021; --card-bg: #282828; --text: #ebdbb2;
  --text-secondary: #928374; --text-muted: #7c6f64;
  --border: #3c3836; --card-border: #3c3836; --error-color: #fb4934;
  --avatar-bg: #98971a; --reaction-bg: #282828; --reaction-hover: #32302f;
  --link: #458588; --outer-border: 1px solid var(--border);
}

/* catppuccin_frappe */
:host([data-theme="dark"][data-active-theme="catppuccin_frappe"]) {
  --outer-bg: #303446; --card-bg: #353850; --text: #c6d0f5;
  --text-secondary: #a5adce; --text-muted: #737994;
  --border: #414559; --card-border: #51576d; --error-color: #e78284;
  --avatar-bg: #ca9ee6; --reaction-bg: #353850; --reaction-hover: #424659;
  --link: #8caaee; --outer-border: 1px solid var(--border);
}

/* catppuccin_macchiato */
:host([data-theme="dark"][data-active-theme="catppuccin_macchiato"]) {
  --outer-bg: #24273a; --card-bg: #292c3c; --text: #cad3f5;
  --text-secondary: #a5adcb; --text-muted: #6e738d;
  --border: #363a4f; --card-border: #494d64; --error-color: #ed8796;
  --avatar-bg: #c6a0f6; --reaction-bg: #292c3c; --reaction-hover: #363a4f;
  --link: #8aadf4; --outer-border: 1px solid var(--border);
}

/* catppuccin_mocha */
:host([data-theme="dark"][data-active-theme="catppuccin_mocha"]) {
  --outer-bg: #11111b; --card-bg: #181825; --text: #cdd6f4;
  --text-secondary: #a6adc8; --text-muted: #6c7086;
  --border: #313244; --card-border: #45475a; --error-color: #f38ba8;
  --avatar-bg: #cba6f7; --reaction-bg: #181825; --reaction-hover: #1e1e2e;
  --link: #89b4fa; --outer-border: 1px solid var(--border);
}

/* ── Outer container ── */
.aigcs-wrapper {
  border: var(--outer-border, 1px solid var(--border));
  border-radius: 16px;
  padding: 24px;
  background: var(--outer-bg);
  position: relative;
}

/* ── Title ── */
.aigcs-title-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 16px;
}

.aigcs-title-row h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.aigcs-powered {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.aigcs-powered a {
  color: var(--link);
  text-decoration: none;
}

.aigcs-powered a:hover {
  text-decoration: underline;
}

/* ── Utilities ── */
.aigcs-hidden { display: none !important; }

/* ── Comment floor (card) ── */
.aigcs-comment-floor {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.aigcs-comment-floor:last-child {
  border-bottom: none;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: no-preference) {
  .aigcs-comment-floor {
    animation: fadeIn 0.3s ease-out;
  }
}

/* ── Comment body: avatar | main ── */
.aigcs-comment-body {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.aigcs-comment-main {
  flex: 1;
  min-width: 0;
}

/* ── Comment header ── */
.aigcs-comment-header {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.aigcs-comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  flex-shrink: 0;
}

.aigcs-comment-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.aigcs-comment-reply .aigcs-comment-avatar {
  width: 32px;
  height: 32px;
  font-size: 0.8125rem;
  border-width: 1.5px;
}

.aigcs-avatar-wrap {
  position: relative;
  display: inline-flex;
}

.aigcs-ai-badge {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid;
  background: var(--card-bg, #fff);
  box-shadow: 0 0 0 2px var(--card-bg, #fff);
  color: var(--text-secondary);
  opacity: 0.8;
  font-size: 8px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 1;
}

.aigcs-ai-badge-tr {
  top: -2px;
  right: -2px;
  bottom: auto;
  left: auto;
}

.aigcs-ai-badge-tl {
  top: -2px;
  left: -2px;
  bottom: auto;
  right: auto;
}

.aigcs-ai-badge-br {
  bottom: -2px;
  right: -2px;
  top: auto;
  left: auto;
}

.aigcs-ai-badge-bl {
  bottom: -2px;
  left: -2px;
  top: auto;
  right: auto;
}

.aigcs-fedi-badge {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin-right: 3px;
}

.aigcs-ai-nick-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid;
  font-size: 7px;
  font-weight: 700;
  line-height: 1;
  margin-right: 3px;
  color: var(--text-secondary);
  opacity: 0.8;
  vertical-align: middle;
}

.aigcs-fedi-badge, .aigcs-ai-nick-badge {
  position: relative;
  z-index: 10000;
  cursor: pointer;
}

.aigcs-fedi-badge::after, .aigcs-ai-nick-badge::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1f2937;
  color: #f3f4f6;
  font-size: 11px;
  font-weight: 400;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 10000;
}

.aigcs-fedi-badge:hover::after, .aigcs-ai-nick-badge:hover::after {
  opacity: 1;
}

.aigcs-fedi-icon {
  display: block;
}

.aigcs-fedi-content {
  line-height: 1.6;
}
.aigcs-fedi-content p {
  margin: 0;
}
.aigcs-fedi-content a {
  color: var(--link, #3b82f6);
  text-decoration: none;
}
.aigcs-fedi-content a:hover {
  text-decoration: underline;
}
.aigcs-fedi-content .mention {
  font-weight: 500;
}

.aigcs-comment-author {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text);
}

.aigcs-comment-author:hover {
  color: var(--link);
}

.aigcs-comment-model {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* ── Comment content ── */
.aigcs-comment-content {
  font-size: 1rem;
  color: var(--text);
  white-space: pre-wrap;
  line-height: 1.7;
  margin-top: 4px;
}

.aigcs-comment-content a {
  color: var(--link);
  text-decoration: none;
}

.aigcs-comment-content a:hover {
  text-decoration: underline;
}

/* ── Comment footer (reactions) ── */
.aigcs-comment-footer {
  margin-top: 8px;
}

.aigcs-empty-content-note {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 8px;
  padding: 6px 10px;
  background: var(--reaction-bg);
  border-radius: 6px;
  white-space: normal;
}

/* ── Loading / Error ── */
.aigcs-loading {
  text-align: center;
  padding: 24px;
  color: var(--text-secondary);
}

.aigcs-error {
  text-align: center;
  padding: 24px;
  color: var(--error-color);
}

/* ── Reactions - GitHub style ── */
.aigcs-reactions {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  position: relative;
}

.aigcs-reaction-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--reaction-bg);
  cursor: pointer;
  padding: 0;
  transition: background 0.15s;
  color: var(--text-secondary);
}

.aigcs-reaction-trigger:hover {
  background: var(--reaction-hover);
}

.aigcs-reaction-trigger svg {
  fill: currentColor;
}

.aigcs-reaction-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--reaction-bg);
  cursor: pointer;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-secondary);
  box-sizing: border-box;
  transition: border-color 0.15s, background 0.15s;
}

.aigcs-reaction-more:hover {
  border-color: var(--text-secondary);
  background: var(--reaction-hover);
}

.aigcs-reaction-overflow {
  display: none;
  position: absolute;
  right: 0;
  bottom: 100%;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
  gap: 2px;
  margin-bottom: 4px;
  white-space: nowrap;
}

.aigcs-reaction-overflow.show {
  display: inline-flex;
  align-items: center;
}

.aigcs-reaction-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 6px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  font-size: 0.8125rem;
  height: 24px;
  box-sizing: border-box;
  color: var(--text-secondary);
  transition: border-color 0.15s, background 0.15s;
  white-space: nowrap;
}

.aigcs-reaction-item:hover {
  border-color: var(--text-secondary);
  background: var(--reaction-bg);
}

.aigcs-reaction-item .aigcs-emoji {
  font-size: 0.75rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}

.aigcs-reaction-item .aigcs-count {
  font-size: 0.75rem;
  font-weight: 500;
}

.aigcs-reaction-picker {
  display: none;
  position: absolute;
  left: 0;
  bottom: 100%;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
  gap: 2px;
  margin-bottom: 4px;
}

.aigcs-reaction-picker.show { display: flex; }

.aigcs-reaction-picker-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  font-size: 1.125rem;
  transition: background 0.15s, transform 0.1s;
}

.aigcs-reaction-picker-btn:hover {
  background: var(--reaction-hover);
  transform: scale(1.2);
}

/* ── Visitor comment form ── */
.aigcs-section + .aigcs-section {
  margin-top: 1.5rem;
}

.aigcs-section-header {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.aigcs-comment-form {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.aigcs-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.aigcs-form-label {
  flex: 1;
  min-width: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary, #6b7280);
  display: flex;
  flex-direction: column;
}

.aigcs-form-label .aigcs-form-input {
  display: block;
  margin-top: 0.25rem;
  width: 100%;
}

.aigcs-form-required {
  color: #ef4444;
  margin-left: 2px;
}

.aigcs-form-input {
  min-width: 120px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--outer-bg);
  color: var(--text);
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1.4;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.aigcs-form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.aigcs-form-textarea {
  width: 100%;
  min-height: 80px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--outer-bg);
  color: var(--text);
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.aigcs-form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.aigcs-form-submit {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.15s;
}

.aigcs-form-submit:hover:not(:disabled) {
  background: #1d4ed8;
}

.aigcs-form-submit:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}

.aigcs-form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.aigcs-form-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.aigcs-reply-notify {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  cursor: pointer;
  margin: 0.5rem 0;
}

.aigcs-reply-notify input[type="checkbox"] {
  cursor: pointer;
}

#aigcs-cancel-reply {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
}

.aigcs-form-pin-row {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.aigcs-form-pin-label {
  font-size: 0.8125rem;
  color: var(--text-secondary, #6b7280);
  white-space: nowrap;
}

.aigcs-form-pin-input {
  max-width: 200px;
}

.aigcs-captcha-container {
  margin-top: 0.75rem;
}

.aigcs-header-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  margin-left: 0.25rem;
  transition: opacity 0.15s;
}

/* Mobile: show ⋮, hide other buttons until .show toggled */
.aigcs-more-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.125rem;
  line-height: 1;
  padding: 0;
  transition: border-color 0.15s, background 0.15s;
}
.aigcs-more-toggle:hover {
  border-color: var(--text-secondary);
  background: var(--reaction-hover);
}
.aigcs-header-actions > button:not(.aigcs-more-toggle) { display: none; }
.aigcs-header-actions.show > button:not(.aigcs-more-toggle) { display: inline-flex; }

/* Desktop: buttons hidden by default, shown on hover via JS .hover class */
@media (hover: hover) {
  .aigcs-header-actions { opacity: 0; }
  .aigcs-header-actions.hover { opacity: 1; }
  .aigcs-more-toggle { display: none; }
  .aigcs-header-actions > button:not(.aigcs-more-toggle) { display: inline-flex; }
  .aigcs-header-actions.show > button:not(.aigcs-more-toggle) { display: inline-flex; }
}

.aigcs-header-action-btn {
  border: none;
  background: var(--reaction-bg);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 8px;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
  line-height: 1.5;
}

.aigcs-header-action-btn:hover {
  background: var(--reaction-hover);
  color: var(--text);
}

/* ── Email delete form ── */
.aigcs-delete-email-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin: 0.5rem 0;
}
.aigcs-delete-email-form .aigcs-delete-status {
  width: 100%;
  flex: 0 0 100%;
}

.aigcs-delete-email-input {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--outer-bg);
  color: var(--text);
  font-size: 0.8125rem;
  font-family: inherit;
  min-width: 0;
  flex: 1;
}

.aigcs-delete-email-input-code {
  max-width: 85px;
}

.aigcs-delete-email-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card-bg);
  color: var(--text);
  font-size: 0.8125rem;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: background 0.15s;
}

.aigcs-delete-email-btn:hover {
  background: var(--reaction-hover);
}

.aigcs-delete-email-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.aigcs-delete-status {
  font-size: 0.75rem;
  color: var(--text-secondary);
  padding: 0.25rem 0;
}

/* ── Edited label ── */
.aigcs-edited-label {
  font-size: 0.6875rem;
  color: var(--text-muted, #9ca3af);
  margin-left: 0.25rem;
}

/* ── Nested replies - shared outer border ── */
.aigcs-comment-group {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.aigcs-comment-root {
  padding: 0.75rem 1rem;
}

.aigcs-comment-root + .aigcs-comment-replies {
  margin-top: 0;
}

.aigcs-comment-replies {
  position: relative;
  background: transparent;
}

.aigcs-thread-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--border);
}

.aigcs-comment-reply {
  position: relative;
}

.aigcs-comment-reply > .aigcs-comment-floor {
  margin-left: 0.5rem;
}

.aigcs-comment-reply + .aigcs-comment-reply {
  border-top: 1px solid var(--border);
}

/* ── Inline reply form ── */
.aigcs-inline-reply {
  border-top: 1px solid var(--border);
  padding: 12px 16px;
}

.aigcs-inline-reply .aigcs-comment-form {
  margin: 0;
}

/* ── Reply-to indicator ── */
.aigcs-reply-to {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-left: 0.125rem;
}

.aigcs-reply-to::before {
  content: '▸';
  margin-right: 0.125rem;
  font-size: 0.6875rem;
}

/* ── Edit actions ── */
.aigcs-edit-textarea {
  width: 100%;
  min-height: 80px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--outer-bg);
  color: var(--text);
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
}

.aigcs-edit-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.aigcs-edit-save,
.aigcs-edit-cancel {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.8125rem;
  cursor: pointer;
  font-family: inherit;
  background: var(--card-bg);
  color: var(--text);
}

.aigcs-edit-save {
  background: var(--link);
  color: #fff;
  border-color: var(--link);
}


.aigcs-comment-action-btn {
  background: none;
  border: none;
  color: var(--text-muted, #9ca3af);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.125rem 0.375rem;
  font-family: inherit;
  transition: color 0.15s;
}

.aigcs-comment-action-btn:hover {
  color: var(--link);
}

.aigcs-comment-action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Standalone card for AI comments ── */
.aigcs-comment-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  margin-bottom: 12px;
}

.aigcs-form-status {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

/* ── Visitor comments (reuses aigcs-comment-floor from AI) ── */
.aigcs-visitor-link {
  color: var(--link);
  font-weight: 600;
  text-decoration: none;
}
`,n=class extends HTMLElement{shadow;domain=``;path=``;visitorId=``;pollingTimer=null;pollCount=0;maxPolls=40;_lang=`en`;autoGenerate=!1;disableCopyright=!1;serverUrl=``;themeObserver=null;darkTheme=``;lightTheme=``;etag=null;commentsData=[];visitorComments=[];pluginConfig=null;showAiBadge=!0;aiBadgePosition=`nick`;showReactions=!1;showAiReactions=!0;reactionTypes=[];showFediBadge=!0;enabledCommentPlugins=[];config={};adminPinSession=``;replyToId=``;editCommentId=``;deleteFormId=``;pinRequired=!1;_pickerClickHandler=null;captchaConfig=null;captchaToken=``;static get observedAttributes(){return[`theme`,`light-theme`,`dark-theme`,`server`,`auto-generate`,`disable-copyright`]}constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.domain=this.getAttribute(`domain`)||``,this.path=this.getAttribute(`path`)||window.location.pathname,this._lang=this.detectLang(),this.autoGenerate=this.getAttribute(`auto-generate`)===`true`,this.disableCopyright=this.getAttribute(`disable-copyright`)===`true`,this.darkTheme=this.getAttribute(`dark-theme`)||``,this.lightTheme=this.getAttribute(`light-theme`)||``,this.visitorId=localStorage.getItem(`aigcs_visitor`)||``,this.visitorId||(this.visitorId=crypto.randomUUID(),localStorage.setItem(`aigcs_visitor`,this.visitorId)),this.applyTheme(),this.render(),this.fetchComments(),this.themeObserver=new MutationObserver(()=>this.applyTheme()),this.themeObserver.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`]}),this.themeObserver.observe(document.body,{attributes:!0,attributeFilter:[`class`,`data-theme`]})}attributeChangedCallback(e,t,n){e===`theme`?this.applyTheme():e===`theme-color`?n===`inverted`?this.dataset.themeColor=`inverted`:delete this.dataset.themeColor:e===`server`?this.serverUrl=n||``:e===`auto-generate`?this.autoGenerate=n===`true`:e===`disable-copyright`?this.disableCopyright=n===`true`:e===`dark-theme`?(this.darkTheme=n||``,this.applyTheme()):e===`light-theme`&&(this.lightTheme=n||``,this.applyTheme())}disconnectedCallback(){this.pollingTimer&&clearInterval(this.pollingTimer),this.themeObserver?.disconnect()}detectLang(){let e=this.getAttribute(`lang`);if(e===`zh-hans`)return`zh-hans`;if(e===`zh-hant`)return`zh-hant`;if(e===`en`)return`en`;let t=(navigator.language||``).replace(/_/g,`-`),n=t.slice(0,2);if(n===`zh`){let e=t.split(`-`)[1]||``;return e===`TW`||e===`HK`||e===`MO`||e===`Hant`?`zh-hant`:`zh-hans`}return n===`en`?`en`:document.documentElement.lang?.replace(/_/g,`-`).slice(0,2)===`zh`?`zh-hans`:`en`}t(t){let n=this._lang;return n===`zh-hant`?e[`zh-hant`]?.[t]||e[`zh-hans`]?.[t]||e.en[t]||t:e[n]?.[t]||e.en[t]||t}applyTheme(){let e=this.getAttribute(`theme`)||`auto`,t=this.getAttribute(`light-theme`)||`light`,n=this.getAttribute(`dark-theme`)||`dark_dimmed`,r=!1;e===`dark`?r=!0:e===`light`?r=!1:(document.documentElement.classList.contains(`dark`)||document.documentElement.dataset.theme===`dark`||document.body.classList.contains(`dark`)||document.body.dataset.theme===`dark`)&&(r=!0),r?(this.dataset.theme=`dark`,this.dataset.activeTheme=n):(this.dataset.theme=`light`,this.dataset.activeTheme=t)}render(){let e=this.getAttribute(`hide-title`)===`true`,n=this.pluginConfig?`visitorTitle`:`title`;this.shadow.innerHTML=`
      <style>${t}</style>
      <div class="aigcs-wrapper">
        ${e?``:`<div class="aigcs-title-row"><h3>${this.t(n)}</h3>${this.disableCopyright?``:`<p class="aigcs-powered">${this.t(`poweredBy`)}</p>`}</div>`}
        <div id="content">${this.t(`loading`)}</div>
      </div>
    `}getContentEl(){return this.shadow.querySelector(`#content`)}async fetchComments(){let e=this.getContentEl();if(e)try{let t=this.serverUrl||``,n=this.autoGenerate?``:`&generate=false`,r=`${t}/api/widget/${this.domain}/comments?path=${encodeURIComponent(this.path)}${n}`,i=await fetch(r,{headers:this.etag?{"If-None-Match":this.etag}:{}});if(i.status===304)return;this.etag=i.headers.get(`ETag`)||null;let a=await i.json(),o=a.data._config?.theme;if(o){let e=!1;o.theme&&!this.hasAttribute(`theme`)&&(this.setAttribute(`theme`,o.theme),e=!0),o.lightTheme&&!this.hasAttribute(`light-theme`)&&(this.setAttribute(`light-theme`,o.lightTheme),e=!0),o.darkTheme&&!this.hasAttribute(`dark-theme`)&&(this.setAttribute(`dark-theme`,o.darkTheme),e=!0),e&&this.applyTheme()}if(a.data.status===`generating`){e.innerHTML=`<div class="aigcs-loading">${this.t(`loading`)}</div>`,this.startPolling();return}this.commentsData=a.data.comments||[],this.visitorComments=a.data.visitorComments||[];let s=a.data._config||{};this.config=s,this.pluginConfig=Array.isArray(s.commentPlugin)?s.commentPlugin.length>0?s:null:s.commentPlugin?s:null,this.showAiBadge=s.showAiBadge!==!1,this.aiBadgePosition=s.aiBadgePosition||`nick`,this.showFediBadge=s.showFediBadge!==!1,this.enabledCommentPlugins=Array.isArray(s.enabledCommentPlugins)?s.enabledCommentPlugins:[],this.showReactions=s.showReactions!==!1,this.showAiReactions=s.aiShowReactions!==!1,this.reactionTypes=Array.isArray(s.reactionTypes)?s.reactionTypes:[],this.renderContent()}catch{e.innerHTML=`<div class="aigcs-error">${this.t(`error`)}</div>`}}startPolling(){this.pollCount=0,this.pollingTimer=setInterval(async()=>{if(this.pollCount++,this.pollCount>this.maxPolls){this.pollingTimer&&clearInterval(this.pollingTimer);let e=this.getContentEl();e&&(e.innerHTML=`<div class="aigcs-error">${this.t(`timeout`)}</div>`);return}await this.fetchComments()},3e3)}formatTime(e){let t=this._lang===`zh-hans`||this._lang===`zh-hant`,n=this.pluginConfig?.timeFormat||`relative`;if(n===`absolute`)return new Date(e).toLocaleString(t?`zh-CN`:`en-US`);if(n===`iso`)return new Date(e).toISOString();let r=Date.now(),i=new Date(e).getTime(),a=Math.floor((r-i)/1e3),o=new Intl.RelativeTimeFormat(t?`zh-CN`:`en-US`,{numeric:`auto`});if(a<60)return o.format(-a,`second`);let s=Math.floor(a/60);if(s<60)return o.format(-s,`minute`);let c=Math.floor(s/60);if(c<24)return o.format(-c,`hour`);let l=Math.floor(c/24);if(l<7)return o.format(-l,`day`);let u=Math.floor(l/7);if(u<5)return o.format(-u,`week`);let d=Math.floor(l/30);return d<12?o.format(-d,`month`):o.format(-Math.floor(l/365),`year`)}renderContent(){this.pollingTimer&&=(clearInterval(this.pollingTimer),null);let e=this.getContentEl();if(!e)return;let t=parseInt(this.getAttribute(`comment-limit`)||`0`,10),n=[],r=t>0?this.commentsData.slice(0,t):this.commentsData;if(this.pluginConfig){let e=this.pluginConfig.formPosition||`bottom`,t=this.pluginConfig.aiPosition||`before`,i=this.pluginConfig.fediDisplay||`mixed`,a=this.pluginConfig.fediGroupOrder||`fediFirst`;!this.replyToId&&e===`top`&&n.push(this.renderCommentForm());let o={native:`native`,fedi:`mastodon`},s=e=>{if(this.enabledCommentPlugins.length===0)return!0;if(!e)return this.enabledCommentPlugins.includes(`native`);let t=o[e]||e;return this.enabledCommentPlugins.includes(t)},c=this.visitorComments.filter(e=>s(e.source)),l=c.filter(e=>e.source!==`fedi`),u=c.filter(e=>e.source===`fedi`),d=e=>{let t=new Map;for(let n of e){let e=n.parentId||`__root__`;t.has(e)||t.set(e,[]),t.get(e).push(n)}let n=e=>(t.get(e)||[]).map(e=>({data:e,children:n(e.id)}));return n(`__root__`)},f=d(l),p=d(u),m=[],h=()=>r.forEach(e=>m.push({type:`ai`,data:e}));if(i===`mixed`){let e=[...f.map(e=>({type:`tree`,root:e,group:`native`})),...p.map(e=>({type:`tree`,root:e,group:`fedi`}))];e.sort((e,t)=>new Date(e.root.data.createdAt).getTime()-new Date(t.root.data.createdAt).getTime()),t===`before`&&h(),m.push(...e),t===`after`&&h()}else t===`before`&&h(),a===`fediFirst`?(p.forEach(e=>m.push({type:`tree`,root:e,group:`fedi`})),f.forEach(e=>m.push({type:`tree`,root:e,group:`native`}))):(f.forEach(e=>m.push({type:`tree`,root:e,group:`native`})),p.forEach(e=>m.push({type:`tree`,root:e,group:`fedi`}))),t===`after`&&h();if(m.length>0)for(let e of m)e.type===`tree`?(n.push(`<div class="aigcs-comment-group">`),this.renderCommentTree(e.root,1,n,e.group),n.push(`</div>`)):n.push(`<div class="aigcs-comment-card">${this.renderCommentCard(`ai`,e.data)}</div>`);else n.push(`<div class="aigcs-loading">${this.t(`empty`)}</div>`);!this.replyToId&&e===`bottom`&&n.push(this.renderCommentForm())}else r.length>0?n.push(...r.map(e=>`<div class="aigcs-comment-card">${this.renderCommentCard(`ai`,e)}</div>`)):n.push(`<div class="aigcs-loading">${this.t(`empty`)}</div>`);if(e.innerHTML=n.join(``),this.renderReactionListeners(e),this.initFormExtras(),this.deleteFormId){let e=this.shadow.getElementById(`delete-email-${this.deleteFormId}`);e&&e.classList.remove(`aigcs-hidden`)}}renderCommentForm(){let e=(this.pluginConfig?.requiredFields||`name,email`).split(`,`).map(e=>e.trim()),t=t=>e.includes(t)?` required`:``,n=t=>e.includes(t)?`<span class="aigcs-form-required">*</span>`:``,r=this.pinRequired?`<div class="aigcs-form-pin-row" id="aigcs-form-pin-row"><span class="aigcs-form-pin-label">${this.t(`pinRequired`)}</span><input class="aigcs-form-input aigcs-form-pin-input" id="aigcs-form-pin" type="password" placeholder="${this.t(`adminPin`)}" /></div>`:``;return`<div class="aigcs-comment-form" id="aigcs-comment-form">
      <div class="aigcs-form-row">
        <label class="aigcs-form-label"><span>${this.t(`formName`)}${n(`name`)}</span><input class="aigcs-form-input" id="aigcs-form-name" type="text" placeholder="${this.t(`formName`)}"${t(`name`)} /></label>
        <label class="aigcs-form-label"><span>${this.t(`formEmail`)}${n(`email`)}</span><input class="aigcs-form-input" id="aigcs-form-email" type="email" placeholder="${this.t(`formEmail`)}"${t(`email`)} /></label>
        <label class="aigcs-form-label"><span>${this.t(`formUrl`)}${n(`url`)}</span><input class="aigcs-form-input" id="aigcs-form-url" type="url" placeholder="${this.t(`formUrl`)}"${t(`url`)} /></label>
      </div>
      <textarea class="aigcs-form-textarea" id="aigcs-form-content" placeholder="${this.t(`formContent`)}" required></textarea>
      ${r}
      <div class="aigcs-captcha-container aigcs-hidden" id="aigcs-captcha-container"></div>
      <label class="aigcs-reply-notify"><input type="checkbox" id="aigcs-reply-notify" /> ${this.t(`replyNotify`)}</label>
      <div class="aigcs-form-actions">
        <button class="aigcs-form-submit" id="aigcs-form-submit">${this.replyToId?this.t(`formReply`):this.t(`formSubmit`)}</button>
        ${this.replyToId?`<button class="aigcs-header-action-btn" id="aigcs-cancel-reply">${this.t(`cancelReply`)}</button>`:``}
      </div>
      <div class="aigcs-form-status" id="aigcs-form-status"></div>
    </div>`}renderCommentCard(e,t){let n=t.createdAt||t.generatedAt,r=n?`<span class="aigcs-comment-model">· ${this.formatTime(n)}</span>`:``,i=this.pluginConfig?.avatarParams||`d=mp&s=48`,a;if(e===`ai`&&t.avatarSvg)a=`<img src="${t.avatarSvg}" alt="${t.authorName}" loading="lazy" />`;else if(e===`fedi`&&t.avatar)a=`<img src="${this.escapeHtml(t.avatar)}" alt="${this.escapeHtml(t.authorName)}" loading="lazy" onerror="this.style.display='none';this.parentNode.innerHTML='<svg viewBox=\\'0 0 24 24\\' width=\\'100%\\' height=\\'100%\\' fill=\\'currentColor\\'><path d=\\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\\'/></svg>'" />`;else if(e===`visitor`&&t.avatarHash){let e=t.avatarHash,n=this.pluginConfig?.gravatarProxy||``;a=`<img src="${n?n.includes(`HASH`)?n.replace(`HASH`,e):`https://${n.replace(/^https?:\/\//,``).replace(/\/+$/,``)}/avatar/${e}?${i}`:`https://www.gravatar.com/avatar/${e}?${i}`}" alt="${this.escapeHtml(t.authorName)}" loading="lazy" onerror="this.style.display='none';this.parentNode.innerHTML='<svg viewBox=\\'0 0 24 24\\' width=\\'100%\\' height=\\'100%\\' fill=\\'currentColor\\'><path d=\\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\\'/></svg>'" />`}else a=this.escapeHtml(t.authorName[0]);let o=`aigcs-ai-badge-`+this.aiBadgePosition,s=e===`ai`&&this.showAiBadge&&this.aiBadgePosition!==`nick`?`<span class="aigcs-avatar-wrap">${a}<span class="aigcs-ai-badge ${o}">AI</span></span>`:a,c=e===`ai`&&this.showAiBadge&&this.aiBadgePosition===`nick`?`<span class="aigcs-ai-nick-badge" data-tooltip="AI-Generated Comments System.">AI</span>`:``,l=`<span class="aigcs-fedi-badge" data-tooltip="${this.t(`fediTitle`)}"><svg class="aigcs-fedi-icon" viewBox="0 0 196.52 196.52" width="14" height="14"><path fill="#a730b8" d="M47.924 72.797a18.23 18.23.0 01-7.796 7.76l42.799 42.965 10.318-5.23zm56.453 56.67-10.319 5.23 21.686 21.77a18.23 18.23.0 017.798-7.76z"></path><path fill="#5496be" d="m129.665 102.077 1.786 11.427 27.415-13.895a18.23 18.23.0 01-4.972-9.812zm-14.066 7.128-57.29 29.034a18.23 18.23.0 014.973 9.813l54.103-27.42z"></path><path fill="#ce3d1a" d="m69.531 91.654 8.162 8.193 29.269-57.139a18.23 18.23.0 01-9.787-5.021zm-7.19 14.036L48.34 133.025a18.23 18.23.0 019.786 5.022l12.378-24.164z"></path><path fill="#d0188f" d="M39.89 80.676a18.23 18.23.0 01-10.865 1.72l8.176 52.298a18.23 18.23.0 0110.865-1.72z"></path><path fill="#5b36e9" d="M63.326 148.31a18.23 18.23.0 01-1.732 10.864l52.289 8.39a18.23 18.23.0 011.732-10.862z"></path><path fill="#30b873" d="M134.915 146.918a18.23 18.23.0 019.788 5.023l24.134-47.117a18.23 18.23.0 01-9.787-5.023z"></path><path fill="#ebe305" d="M126.133 33.16a18.23 18.23.0 01-7.798 7.761l37.377 37.52a18.23 18.23.0 017.797-7.76z"></path><path fill="#f47601" d="M44.77 51.628a18.23 18.23.0 014.973 9.812L96.99 37.495a18.23 18.23.0 01-4.971-9.811z"></path><path fill="#57c115" d="M118.25 40.965a18.23 18.23.0 01-10.852 1.812l4.185 26.8 11.42 1.832zm-4.234 44.192 9.895 63.363a18.23 18.23.0 0110.88-1.627l-9.355-59.904z"></path><path fill="#dbb210" d="M49.776 61.641A18.23 18.23.0 0148.082 72.51l26.82 4.307 5.272-10.294zm45.968 7.382L90.472 79.32l63.371 10.177a18.23 18.23.0 011.76-10.859z"></path><path fill="#ffca00" d="M93.439 23.842a1 1 0 1033.092 1.802 1 1 0 10-33.092-1.802"></path><path fill="#64ff00" d="M155.314 85.957a1 1 0 1033.092 1.803 1 1 0 10-33.092-1.803"></path><path fill="#00a3ff" d="M115.347 163.982a1 1 0 1033.092 1.803 1 1 0 10-33.092-1.803"></path><path fill="#9500ff" d="M28.77 150.09a1 1 0 1033.092 1.802A1 1 0 1028.77 150.09"></path><path fill="red" d="M15.23 63.478a1 1 0 1033.092 1.803A1 1 0 1015.23 63.478"></path></svg></span>`,u=e===`fedi`&&this.showFediBadge?t.statusUrl?`<a href="${this.escapeHtml(t.statusUrl)}" target="_blank" rel="noopener" class="aigcs-fedi-badge" data-tooltip="${this.t(`fediTitle`)}"><svg class="aigcs-fedi-icon" viewBox="0 0 196.52 196.52" width="14" height="14"><path fill="#a730b8" d="M47.924 72.797a18.23 18.23.0 01-7.796 7.76l42.799 42.965 10.318-5.23zm56.453 56.67-10.319 5.23 21.686 21.77a18.23 18.23.0 017.798-7.76z"></path><path fill="#5496be" d="m129.665 102.077 1.786 11.427 27.415-13.895a18.23 18.23.0 01-4.972-9.812zm-14.066 7.128-57.29 29.034a18.23 18.23.0 014.973 9.813l54.103-27.42z"></path><path fill="#ce3d1a" d="m69.531 91.654 8.162 8.193 29.269-57.139a18.23 18.23.0 01-9.787-5.021zm-7.19 14.036L48.34 133.025a18.23 18.23.0 019.786 5.022l12.378-24.164z"></path><path fill="#d0188f" d="M39.89 80.676a18.23 18.23.0 01-10.865 1.72l8.176 52.298a18.23 18.23.0 0110.865-1.72z"></path><path fill="#5b36e9" d="M63.326 148.31a18.23 18.23.0 01-1.732 10.864l52.289 8.39a18.23 18.23.0 011.732-10.862z"></path><path fill="#30b873" d="M134.915 146.918a18.23 18.23.0 019.788 5.023l24.134-47.117a18.23 18.23.0 01-9.787-5.023z"></path><path fill="#ebe305" d="M126.133 33.16a18.23 18.23.0 01-7.798 7.761l37.377 37.52a18.23 18.23.0 017.797-7.76z"></path><path fill="#f47601" d="M44.77 51.628a18.23 18.23.0 014.973 9.812L96.99 37.495a18.23 18.23.0 01-4.971-9.811z"></path><path fill="#57c115" d="M118.25 40.965a18.23 18.23.0 01-10.852 1.812l4.185 26.8 11.42 1.832zm-4.234 44.192 9.895 63.363a18.23 18.23.0 0110.88-1.627l-9.355-59.904z"></path><path fill="#dbb210" d="M49.776 61.641A18.23 18.23.0 0148.082 72.51l26.82 4.307 5.272-10.294zm45.968 7.382L90.472 79.32l63.371 10.177a18.23 18.23.0 011.76-10.859z"></path><path fill="#ffca00" d="M93.439 23.842a1 1 0 1033.092 1.802 1 1 0 10-33.092-1.802"></path><path fill="#64ff00" d="M155.314 85.957a1 1 0 1033.092 1.803 1 1 0 10-33.092-1.803"></path><path fill="#00a3ff" d="M115.347 163.982a1 1 0 1033.092 1.803 1 1 0 10-33.092-1.803"></path><path fill="#9500ff" d="M28.77 150.09a1 1 0 1033.092 1.802A1 1 0 1028.77 150.09"></path><path fill="red" d="M15.23 63.478a1 1 0 1033.092 1.803A1 1 0 1015.23 63.478"></path></svg></a>`:l:``,d;if(d=(e===`visitor`||e===`fedi`)&&t.authorUrl?`${u}<a href="${this.escapeHtml(t.authorUrl)}" target="_blank" rel="noopener" class="aigcs-comment-author aigcs-visitor-link">${this.escapeHtml(t.authorName)}</a>`:e===`ai`?`${c}<span class="aigcs-comment-author">${this.escapeHtml(t.authorName)}</span>`:`${u}<span class="aigcs-comment-author">${this.escapeHtml(t.authorName)}</span>`,(e===`visitor`||e===`fedi`)&&t.parentId){let e=this.visitorComments.find(e=>e.id===t.parentId);e&&(d+=`<span class="aigcs-reply-to">${this.escapeHtml(e.authorName)}</span>`)}let f=e===`ai`&&t.showModel&&t.model?`<span class="aigcs-comment-model">· ${t.model}</span>`:``,p=t.reactions&&(e===`ai`?this.showAiReactions:e!==`fedi`&&this.showReactions)?this.renderReactions(t):``,m=e===`ai`&&t.authorAvatar===`#empty-content`?`<p class="aigcs-empty-content-note">${this.t(`emptyContentWarning`)}</p>`:``,h=(e===`visitor`||e===`fedi`)&&t.editedAt?`<span class="aigcs-edited-label">· ${this.t(`edited`)}</span>`:``,g=``;if(e===`visitor`){let e=[];e.push(`<button class="aigcs-more-toggle" data-comment-id="${t.id}" title="More">⋮</button>`),e.push(`<button class="aigcs-header-action-btn" data-action="reply" data-comment-id="${t.id}">${this.t(`reply`)}</button>`);let n=parseInt(String(this.pluginConfig?.edit_window_minutes||`3`),10)*60*1e3,r=t.createdAt?new Date(t.createdAt).getTime():0,i=r>0&&Date.now()-r<n;t.visitorId&&t.visitorId===this.visitorId&&i&&e.push(`<button class="aigcs-header-action-btn" data-action="edit" data-comment-id="${t.id}">${this.t(`edit`)}</button>`),this.adminPinSession&&e.push(`<button class="aigcs-header-action-btn" data-action="delete" data-comment-id="${t.id}">${this.t(`delete`)}</button>`),!this.adminPinSession&&t.authorEmail&&this.config.emailDeletion!==!1&&e.push(`<button class="aigcs-header-action-btn" data-action="toggle-email-delete" data-comment-id="${t.id}" title="${this.t(`deleteByEmail`)}">${this.t(`delete`)}</button>`),e.length>0&&(g=`<span class="aigcs-header-actions">${e.join(``)}</span>`)}let _=``;e===`visitor`&&!this.adminPinSession&&t.authorEmail&&this.config.emailDeletion!==!1&&(_=`<div class="aigcs-delete-email-form aigcs-hidden" id="delete-email-${t.id}">
        <input class="aigcs-delete-email-input" type="email" placeholder="${this.t(`deleteEmailPlaceholder`)}" id="delete-email-input-${t.id}" />
        <button class="aigcs-delete-email-btn" data-action="send-code" data-comment-id="${t.id}">${this.t(`sendCode`)}</button>
        <input class="aigcs-delete-email-input aigcs-delete-email-input-code" type="text" placeholder="${this.t(`verifyCode`)}" id="delete-code-input-${t.id}" />
        <button class="aigcs-delete-email-btn" data-action="verify-delete" data-comment-id="${t.id}" disabled>${this.t(`verifyDelete`)}</button>
        <div class="aigcs-delete-status" id="delete-status-${t.id}"></div>
      </div>`);let v=this.editCommentId===t.id?`<textarea class="aigcs-edit-textarea" id="edit-textarea-${t.id}">${this.escapeHtml(t.content)}</textarea>
         <div class="aigcs-edit-actions">
           <button class="aigcs-edit-save" data-action="save-edit" data-comment-id="${t.id}">${this.t(`formSubmit`)}</button>
           <button class="aigcs-edit-cancel" data-action="cancel-edit" data-comment-id="${t.id}">${this.t(`cancelEdit`)}</button>
         </div>`:e===`fedi`?`${m}<div class="aigcs-fedi-content">${this.sanitizeHtml(t.content)}</div>`:`${m}${this.escapeHtml(t.content)}`;return`<div class="aigcs-comment-floor">
      <div class="aigcs-comment-body">
        <div class="aigcs-comment-avatar">${s}</div>
        <div class="aigcs-comment-main">
          <div class="aigcs-comment-header">
            ${d}
            ${f||r}
            ${h}
            ${g}
          </div>
          ${_}
          <div class="aigcs-comment-content">${v}</div>
          ${p?`<div class="aigcs-comment-footer">${p}</div>`:``}
        </div>
      </div>
    </div>`}renderCommentTree(e,t,n,r){let i=r===`fedi`?`fedi`:`visitor`;if(n.push(this.renderCommentCard(i,e.data)),this.replyToId===e.data.id&&n.push(`<div class="aigcs-inline-reply">${this.renderCommentForm()}</div>`),e.children.length>0){t===1&&(n.push(`<div class="aigcs-comment-replies" style="padding-left:2.5rem">`),n.push(`<div class="aigcs-thread-line" style="left:3rem"></div>`));for(let i of e.children)n.push(`<div class="aigcs-comment-reply">`),this.renderCommentTree(i,t+1,n,r),n.push(`</div>`);t===1&&n.push(`</div>`)}}initFormExtras(){let e=this.shadow.getElementById(`aigcs-form-name`),t=this.shadow.getElementById(`aigcs-form-email`),n=this.shadow.getElementById(`aigcs-form-url`);e&&(e.value=localStorage.getItem(`aigcs_form_name`)||``),t&&(t.value=localStorage.getItem(`aigcs_form_email`)||``),n&&(n.value=localStorage.getItem(`aigcs_form_url`)||``)}async initCaptcha(e){if(!this.captchaConfig)try{let e=this.serverUrl||``,t=await(await fetch(`${e}/api/widget/captcha/config`)).json();this.captchaConfig=t.data}catch{return}if(!this.captchaConfig||this.captchaConfig.provider===`none`)return;e.style.display=`block`;let t=this.captchaConfig.provider,n=this.captchaConfig.siteKey;if(t===`turnstile`)this.renderCaptchaScript(`https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`,`turnstile`,e,n);else if(t===`recaptcha`)this.renderCaptchaScript(`https://www.google.com/recaptcha/api.js`,`grecaptcha`,e,n);else if(t===`hcaptcha`)this.renderCaptchaScript(`https://js.hcaptcha.com/1/api.js`,`hcaptcha`,e,n);else if(t===`cap`)this.renderCaptchaScript(`https://cdn.cap.so/js/cap.js`,`CAPTCHA`,e,n);else if(t===`altcha`)if(customElements.get(`altcha-widget`))this.renderAltcha(e,n);else{let t=document.createElement(`script`);t.src=`https://cdn.altcha.org/altcha.js`,t.onload=()=>this.renderAltcha(e,n),document.head.appendChild(t)}else t===`geetest`&&this.renderGeetest(e,n)}renderCaptchaScript(e,t,n,r){let i=()=>{let e=window;t===`turnstile`&&e.turnstile?(n.innerHTML=`<div class="cf-turnstile"></div>`,e.turnstile.render(n.querySelector(`.cf-turnstile`),{sitekey:r,callback:e=>{this.captchaToken=e}})):t===`grecaptcha`&&e.grecaptcha?(n.innerHTML=`<div class="g-recaptcha"></div>`,e.grecaptcha.render(n.querySelector(`.g-recaptcha`),{sitekey:r,callback:e=>{this.captchaToken=e}})):t===`hcaptcha`&&e.hcaptcha?(n.innerHTML=`<div class="h-captcha"></div>`,e.hcaptcha.render(n.querySelector(`.h-captcha`),{sitekey:r,callback:e=>{this.captchaToken=e}})):t===`CAPTCHA`&&e.CAPTCHA&&(n.innerHTML=`<div id="cap-captcha"></div>`,e.CAPTCHA.render(`cap-captcha`,{siteKey:r,callback:e=>{this.captchaToken=e}}))};if(window[t])i();else{let t=document.createElement(`script`);t.src=e,t.async=!0,t.defer=!0,t.onload=i,document.head.appendChild(t)}}renderAltcha(e,t){e.innerHTML=`<altcha-widget style="--altcha-max-width:100%" sitekey="${t}"></altcha-widget>`;let n=e.querySelector(`altcha-widget`);n&&n.addEventListener(`verified`,e=>{this.captchaToken=n.payload})}renderGeetest(e,t){let n=()=>{let n=window;e.innerHTML=`<div id="geetest-captcha"></div>`,n.initGeetest4&&n.initGeetest4({captchaId:t,product:`popup`},e=>{e.appendTo(`#geetest-captcha`),e.onReady(()=>e.verify()),e.onSuccess(()=>{this.captchaToken=JSON.stringify(e.getValidate())})})};if(window.initGeetest4)n();else{let e=document.createElement(`script`);e.src=`https://static.geetest.com/v4/gt4.js`,e.async=!0,e.defer=!0,e.onload=n,document.head.appendChild(e)}}async handleDeleteComment(e){if(this.adminPinSession&&confirm(this.t(`deleteConfirm`)))try{let t=this.serverUrl||``;(await(await fetch(`${t}/api/widget/${this.domain}/comment/${e}`,{method:`DELETE`,headers:{"Content-Type":`application/json`},body:JSON.stringify({pin:this.adminPinSession})})).json()).code===0&&(this.visitorComments=this.visitorComments.filter(t=>t.id!==e),this.renderContent())}catch{}}renderReactionListeners(e){e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.aigcs-reaction-trigger`);if(n){e.stopPropagation();let t=n.getAttribute(`data-picker`),r=t?this.shadow.getElementById(`picker-${t}`):null;r&&r.classList.toggle(`show`);return}let r=t.closest(`.aigcs-reaction-more`);if(r){e.stopPropagation();let t=r.getAttribute(`data-overflow`),n=t?this.shadow.getElementById(t):null;n&&n.classList.toggle(`show`);return}let i=t.closest(`[data-comment][data-type]`);if(i){let e=i.getAttribute(`data-comment`),t=i.getAttribute(`data-type`);e&&t&&this.handleReaction(e,t);return}let a=t.closest(`.aigcs-more-toggle`);if(a){e.stopPropagation();let t=a.closest(`.aigcs-header-actions`);t&&t.classList.toggle(`show`);return}if(t.closest(`#aigcs-form-submit`)){this.handleCommentSubmit();return}let o=t.closest(`[data-action]`);if(!o)return;let s=o.getAttribute(`data-action`),c=o.getAttribute(`data-comment-id`);if(s===`delete`&&c)this.handleDeleteComment(c);else if(s===`reply`&&c)this.replyToId=c,this.renderContent();else if(s===`edit`&&c)this.editCommentId=c,this.renderContent(),requestAnimationFrame(()=>{let e=this.shadow.getElementById(`edit-textarea-${c}`);e&&e.focus()});else if(s===`save-edit`&&c)this.handleSaveEdit(c);else if(s===`cancel-edit`)this.editCommentId=``,this.renderContent();else if(s===`toggle-email-delete`&&c){if(this.deleteFormId===c?this.deleteFormId=``:this.deleteFormId=c,this.shadow.querySelectorAll(`.aigcs-delete-email-form`).forEach(e=>{e.classList.add(`aigcs-hidden`)}),this.deleteFormId){let e=this.shadow.getElementById(`delete-email-${this.deleteFormId}`);e&&e.classList.remove(`aigcs-hidden`)}}else s===`send-code`&&c?this.handleSendCode(o,c):s===`verify-delete`&&c&&this.handleVerifyDelete(c)});let t=this.shadow.getElementById(`aigcs-cancel-reply`);t&&t.addEventListener(`click`,()=>{this.replyToId=``,this.renderContent()}),e.querySelectorAll(`.aigcs-comment-floor`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{let t=e.querySelector(`.aigcs-header-actions`);t&&t.classList.add(`hover`)}),e.addEventListener(`mouseleave`,()=>{let t=e.querySelector(`.aigcs-header-actions`);t&&t.classList.remove(`hover`)})}),this._pickerClickHandler||(this._pickerClickHandler=()=>{this.shadow.querySelectorAll(`.aigcs-reaction-picker.show`).forEach(e=>e.classList.remove(`show`)),this.shadow.querySelectorAll(`.aigcs-reaction-overflow.show`).forEach(e=>e.classList.remove(`show`)),this.shadow.querySelectorAll(`.aigcs-header-actions.show`).forEach(e=>e.classList.remove(`show`))},document.addEventListener(`click`,this._pickerClickHandler))}async handleSaveEdit(e){let t=this.shadow.getElementById(`edit-textarea-${e}`);if(!(!t||!t.value.trim()))try{let n=this.serverUrl||``;(await(await fetch(`${n}/api/widget/${this.domain}/comment/${e}`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({content:t.value.trim(),visitorId:this.visitorId})})).json()).code===0&&(this.editCommentId=``,this.fetchComments())}catch{}}async handleSendCode(e,t){let n=this.shadow.getElementById(`delete-email-input-${t}`),r=this.shadow.getElementById(`delete-status-${t}`);if(!n||!n.value.trim()){r.textContent=this.t(`deleteEmailRequired`);return}e.setAttribute(`disabled`,``);try{let e=this.serverUrl||``,i=await fetch(`${e}/api/widget/${this.domain}/comment/${t}/request-delete`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({email:n.value.trim()})}),a;try{let e=await i.json();if(e.code===0){a=this.t(`codeSent`);let e=this.shadow.querySelector(`[data-action="verify-delete"][data-comment-id="${t}"]`);e&&e.removeAttribute(`disabled`);let n=this.shadow.getElementById(`delete-code-input-${t}`);n&&setTimeout(()=>n.focus(),100)}else a=e.message||this.t(`deleteFormError`)}catch{a=`\u8BF7\u6C42\u5931\u8D25 (HTTP ${i.status})`}r.textContent=a}catch{r.textContent=this.t(`deleteFormError`)}setTimeout(()=>e.removeAttribute(`disabled`),2e3)}async handleVerifyDelete(e){let t=this.shadow.getElementById(`delete-email-input-${e}`),n=this.shadow.getElementById(`delete-code-input-${e}`),r=this.shadow.getElementById(`delete-status-${e}`);if(!t||!n||!t.value.trim()||!n.value.trim()){r.textContent=this.t(`deleteEmailRequired`);return}try{let i=this.serverUrl||``,a=await fetch(`${i}/api/widget/${this.domain}/comment/${e}/verify-delete`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({email:t.value.trim(),code:n.value.trim()})}),o;try{let t=await a.json();if(t.code===0){this.visitorComments=this.visitorComments.filter(t=>t.id!==e),this.renderContent();return}o=t.message||this.t(`deleteFormError`)}catch{o=`\u8BF7\u6C42\u5931\u8D25 (HTTP ${a.status})`}r.textContent=o}catch{r.textContent=this.t(`deleteFormError`)}}async handleReaction(e,t){try{let n=this.serverUrl||``,r=await(await fetch(`${n}/api/widget/${this.domain}/react`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({commentId:e,reaction:t,visitorId:this.visitorId})})).json(),i=this.commentsData.find(t=>t.id===e);if(!i)return;r.data?.action===`added`?(i.reactions[t]=(i.reactions[t]||0)+1,i.userVoted.push(t)):r.data?.action===`removed`&&(i.reactions[t]=Math.max(0,(i.reactions[t]||1)-1),i.userVoted=i.userVoted.filter(e=>e!==t)),this.renderContent()}catch{}}displayWidth(e){let t=0;try{let n=new Intl.Segmenter(`en`,{granularity:`grapheme`});for(let{segment:r}of n.segment(e)){let e=r.codePointAt(0);e>=4352&&e<=4447||e===9001||e===9002||e>=11904&&e<=40959||e>=40960&&e<=42191||e>=44032&&e<=55215||e>=63744&&e<=64255||e>=65072&&e<=65135||e>=65281&&e<=65376||e>=65504&&e<=65510||e>=110592&&e<=110847||e>=131072&&e<=195103||e>=196608&&e<=201551||r.length>1?t+=2:t+=1}}catch{t=e.length}return t}async handleCommentSubmit(){let e=this.shadow.getElementById(`aigcs-form-name`),t=this.shadow.getElementById(`aigcs-form-email`),n=this.shadow.getElementById(`aigcs-form-url`),r=this.shadow.getElementById(`aigcs-form-content`),i=this.shadow.getElementById(`aigcs-form-status`),a=this.shadow.getElementById(`aigcs-form-submit`);if(!e||!r||!i||!a)return;let o=this.shadow.getElementById(`aigcs-captcha-container`);if(o&&this.pluginConfig?.captchaEnabled&&!this.captchaToken){o.classList.remove(`aigcs-hidden`),this.initCaptcha(o),i.textContent=this.t(`captchaPrompt`);return}let s=(this.pluginConfig?.requiredFields||`name,email`).split(`,`).map(e=>e.trim()),c=e.value.trim(),l=t?.value?.trim()||``,u=n?.value?.trim()||``,d=r.value.trim();if(!c||!d||s.includes(`email`)&&!l||s.includes(`url`)&&!u){i.textContent=this.t(`formError`);return}if(this.displayWidth(c)>16){i.textContent=this.t(`nameTooLong`);return}a.disabled=!0,a.textContent=this.t(`formSubmitting`);let f=this.shadow.getElementById(`aigcs-form-pin`),p={path:this.path,authorName:c,authorEmail:t?.value?.trim()||``,authorUrl:n?.value?.trim()||``,content:d};f?.value?.trim()?p.pin=f.value.trim():this.adminPinSession&&(p.pin=this.adminPinSession),this.captchaToken&&(p.captchaToken=this.captchaToken),this.replyToId&&(p.parentId=this.replyToId);let m=this.shadow.getElementById(`aigcs-reply-notify`);m&&(p.notifyReplyAuthor=m.checked?`true`:``);try{let o=this.serverUrl||``,s=await(await fetch(`${o}/api/widget/${this.domain}/comment`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(p)})).json();if(s.code===0){if(s.data?.requirePin||s.data?.requiresPin){let e=r.value;this.pinRequired=!0,this.renderContent(),requestAnimationFrame(()=>{let t=this.shadow.getElementById(`aigcs-form-pin`);t&&t.focus();let n=this.shadow.getElementById(`aigcs-form-content`);n&&(n.value=e)}),i.textContent=``;return}if(s.data?.pinError||s.data?.error){i.textContent=this.t(`pinError`),a.disabled=!1,a.textContent=this.t(`formSubmit`);return}if(s.data?.id){if(p.pin&&!this.adminPinSession){this.adminPinSession=p.pin,this.pinRequired=!1,this.renderContent();return}i.textContent=this.t(`formSuccess`),localStorage.setItem(`aigcs_form_name`,e.value),localStorage.setItem(`aigcs_form_email`,t.value),localStorage.setItem(`aigcs_form_url`,n.value),r.value=``,this.pinRequired=!1,this.captchaToken=``,setTimeout(()=>this.fetchComments(),1500)}}else i.textContent=s.data?.error||this.t(`formError`)}catch{i.textContent=this.t(`formError`)}finally{a.disabled=!1,a.textContent=this.t(`formSubmit`)}}renderReactions(e){let t=this.reactionTypes.length>0?this.reactionTypes:[],n=t.map(t=>[t.id,e.reactions[t.id]||0]),r=`<div class="aigcs-reactions">`;r+=`<button class="aigcs-reaction-trigger" data-picker="${e.id}"><svg height="18" viewBox="0 0 16 16" width="18"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z"/></svg></button>`,r+=`<div class="aigcs-reaction-picker" id="picker-${e.id}">`,t.forEach(t=>{r+=`<button class="aigcs-reaction-picker-btn" data-comment="${e.id}" data-type="${t.id}">${t.emoji}</button>`}),r+=`</div>`;let i=n.filter(([,e])=>e>0),a=i.slice(0,3),o=i.slice(3);return a.forEach(([n,i])=>{let a=e.userVoted.includes(n)?`active`:``,o=t.find(e=>e.id===n)?.emoji||`👍`;r+=`<button class="aigcs-reaction-item ${a}" data-comment="${e.id}" data-type="${n}">
        <span class="aigcs-emoji">${o}</span>
        <span class="aigcs-count">${i}</span>
      </button>`}),o.length>0&&(r+=`<button class="aigcs-reaction-more" data-overflow="overflow-${e.id}">+${o.length}</button>`,r+=`<div class="aigcs-reaction-overflow" id="overflow-${e.id}">`,o.forEach(([n,i])=>{let a=e.userVoted.includes(n)?`active`:``,o=t.find(e=>e.id===n)?.emoji||`👍`;r+=`<button class="aigcs-reaction-item ${a}" data-comment="${e.id}" data-type="${n}">
          <span class="aigcs-emoji">${o}</span>
          <span class="aigcs-count">${i}</span>
        </button>`}),r+=`</div>`),r+=`</div>`,r}getEmoji(e){return this.reactionTypes.find(t=>t.id===e)?.emoji||`👍`}escapeHtml(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}sanitizeHtml(e){let t=document.createElement(`div`);return t.innerHTML=e,t.querySelectorAll(`script, iframe, object, embed, style, link, meta, svg, math`).forEach(e=>e.remove()),t.querySelectorAll(`*`).forEach(e=>{for(let t of e.attributes){let n=t.name.toLowerCase();if(n.startsWith(`on`)){e.removeAttribute(t.name);continue}if(n===`href`||n===`src`||n===`xlink:href`||n===`formaction`||n===`action`){let n=t.value.toLowerCase().trim();(n.startsWith(`javascript:`)||n.startsWith(`data:`)||n.startsWith(`vbscript:`)||n.startsWith(`file:`)||!n)&&e.removeAttribute(t.name)}}}),t.querySelectorAll(`img[src]`).forEach(e=>{let t=e.getAttribute(`src`)||``;!t.startsWith(`http://`)&&!t.startsWith(`https://`)&&!t.startsWith(`/`)&&e.removeAttribute(`src`)}),t.innerHTML}};customElements.define(`aigcs-widget`,n),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`aigcs`);if(e){let t=document.createElement(`aigcs-widget`);t.setAttribute(`domain`,e.getAttribute(`data-domain`)||window.location.hostname),t.setAttribute(`path`,e.getAttribute(`data-path`)||window.location.pathname);let n=e.getAttribute(`data-server`);n&&t.setAttribute(`server`,n),e.getAttribute(`data-auto-generate`)===`true`&&t.setAttribute(`auto-generate`,`true`),e.replaceWith(t)}});function r(){return{init(e){let t=typeof e.el==`string`?document.querySelector(e.el):e.el||document.getElementById(`aigcs`);if(!t){console.error(`[AIGCS] Element not found:`,e.el);return}let n=document.createElement(`aigcs-widget`);n.setAttribute(`domain`,e.site),n.setAttribute(`path`,e.path),e.server&&n.setAttribute(`server`,e.server),e.darkMode&&n.setAttribute(`theme`,e.darkMode),e.theme&&n.setAttribute(`theme`,e.theme),e.darkTheme&&n.setAttribute(`dark-theme`,e.darkTheme),e.lightTheme&&n.setAttribute(`light-theme`,e.lightTheme),e.lang&&n.setAttribute(`lang`,e.lang),e.autoGenerate===!0&&n.setAttribute(`auto-generate`,`true`),e.themeColor&&n.setAttribute(`theme-color`,e.themeColor),e.disableCopyright&&n.setAttribute(`disable-copyright`,`true`),t.className&&(n.className=t.className),t.replaceWith(n)}}}return r()})();
//# sourceMappingURL=aigcs.js.map