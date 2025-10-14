<!-- Create file: notifynow-frontend/js/partials.js -->
<script>
// Tailwind CDN is already on your pages, so classes will work.

(function () {
  const links = [
    { href: '/',                 label: 'Home' },
    { href: '/MyDocuments',      label: 'My Documents' },
    { href: '/AddDocuments',     label: 'Add Documents' },
    { href: '/Documentdetails',  label: 'Document Details' },
    { href: '/NotificationSettings', label: 'Settings' },
    { href: '/app',              label: 'App' },
  ];

  const pathname = location.pathname.replace(/\/+$/, '') || '/';

  function navLink(l) {
    const isActive = pathname === l.href;
    const base = 'px-3 py-2 rounded-md text-sm font-medium';
    const active = 'bg-slate-900 text-white dark:bg-white dark:text-slate-900';
    const idle = 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800';
    return `<a href="${l.href}" class="${base} ${isActive ? active : idle}">${l.label}</a>`;
  }

  const header = `
  <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-2xl">notifications_active</span>
        <span class="text-lg font-extrabold tracking-tight">Notify&nbsp;Now</span>
      </a>
      <nav class="hidden md:flex items-center gap-1">
        ${links.map(navLink).join('')}
      </nav>

      <!-- mobile menu -->
      <button id="nn-menu" class="md:hidden p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>

    <div id="nn-drawer" class="md:hidden hidden border-t border-slate-200 dark:border-slate-800">
      <nav class="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
        ${links.map(l => `<a href="${l.href}" class="px-3 py-2 rounded-md text-base ${pathname===l.href ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'}">${l.label}</a>`).join('')}
      </nav>
    </div>
  </div>`;

  const footer = `
  <div class="mt-12 border-t border-slate-200 dark:border-slate-800">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      © ${new Date().getFullYear()} Notify Now ·
      <a href="/about.html" class="hover:underline">About</a> ·
      <a href="/pricing.html" class="hover:underline">Pricing</a> ·
      <a href="/contact.html" class="hover:underline">Contact</a>
    </div>
  </div>`;

  // Inject header & footer
  const h = document.getElementById('site-header');
  if (h) h.innerHTML = header;
  const f = document.getElementById('site-footer');
  if (f) f.innerHTML = footer;

  // Mobile toggle
  document.addEventListener('click', (e) => {
    if (e.target.closest('#nn-menu')) {
      const d = document.getElementById('nn-drawer');
      if (d) d.classList.toggle('hidden');
    }
  });
})();
</script>
