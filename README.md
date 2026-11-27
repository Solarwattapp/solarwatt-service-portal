# SOLARWATT Service Portal

A single-page service desk for SOLARWATT Australia — cases, enquiries,
installers and companies, reports, the knowledge library, commissioning,
troubleshooting, alarm codes, warranty and diagrams. No backend: all data
lives in the browser's own storage on the device you open it with.

## Use it

Open the hosted address, then install it:

- Edge: menu → **Apps → Install this site as an app**
- Chrome: address-bar install icon, or menu → **Cast, save and share → Install page as app**

Once installed it opens in its own window and keeps working offline. Documents
you have opened before are kept offline too; unopened PDFs need a connection
the first time.

## Data

- Nothing is stored in this repository. No case, installer or customer data is
  uploaded.
- Data is per browser and per address. Opening the GitHub Pages address is a
  different storage origin from the old `file://` copy. Use **Data → Export
  JSON** in the old copy and **Import JSON** in the installed app once.
- **Data → Choose backup folder** writes dated JSON backups to a local folder,
  and **Export JSON** gives you a manual snapshot any time.
- Installing the PWA on several computers gives each computer its own local
  data. It does not create a shared multi-user database.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | redirects the repo root to the app |
| `Service-Portal.html` | the portal itself (single file, no build step) |
| `manifest.webmanifest` | app name, icons, standalone window, shortcuts |
| `sw.js` | offline app-shell cache and on-demand document cache |
| `icon-*.png` | app icons |
| `docs/` | supplied manuals, datasheets and warranty PDFs |
| `.nojekyll` | tells GitHub Pages to publish the folder as-is |

Local-only helper files (`serve.py`, the `.bat` and the install note) are
ignored by git and are not needed on GitHub.

## Updating

Replace `Service-Portal.html`, bump the cache name in `sw.js` when the shell
changes, commit and push. GitHub Pages publishes in about a minute; open the
installed app twice — the first load fetches the new file, the second paints it.
