# Rahul & Mansi · Wedding invite

A one-page wedding invitation with an RSVP form that saves replies to Google Sheets. It's built to be hosted for free on GitHub Pages and shared on WhatsApp.

## What's here
| File | What it is |
|---|---|
| `index.html`, `assets/site.css`, `app.js` | The invite website (design from Google Stitch; `site.css` is built from `tools/tailwind.config.js`) |
| `config.js` | **Edit this** to paste the Google Sheets link. Function times and venues are written in `index.html` |
| `google-sheets/Code.gs` | The script that saves RSVPs into your Google Sheet |
| `google-sheets/SETUP.md` | Step-by-step setup for the Sheet (about 10 minutes) |
| `assets/whatsapp-invite.jpg` | The image to send on WhatsApp |
| `assets/og-preview.jpg` | The picture WhatsApp shows when you paste the link |
| `tools/` | Source for the two share images and the Tailwind setup |
| `package.json` | Only needed to rebuild: run `npm install`, then `npm run build:css` after changing classes in `index.html`, or `npm run serve` and `npm run build:images` to redo the share images |

## Preview it on your computer
From this folder, run `python3 -m http.server 8000` and open <http://localhost:8000>.
Double-clicking `index.html` also works, apart from the RSVP button, which needs the Google Sheet connected.

## Still to do
1. Function timings are shown as Morning, Afternoon, Evening and Night. Edit them in `index.html` if they change.
2. Set up the Google Sheet (`google-sheets/SETUP.md`) and paste its link into `config.js`.
3. Publish on GitHub Pages: in the repository go to **Settings → Pages → Deploy from a branch → main → / (root)**.
   The site will be at <https://mr-wakadoodle.github.io/wedding-invite-rahul-mansi/>.

## Sending on WhatsApp
Send `assets/whatsapp-invite.jpg`, then this message:

> 🌼 With great joy, the Tandon and Gupta families invite you to the wedding of **Rahul & Mansi** on 13 & 14 March 2027 at Shawn Elizey, Jabalpur.
>
> All the details, venues and the RSVP form are here:
> https://mr-wakadoodle.github.io/wedding-invite-rahul-mansi/
>
> Kindly RSVP as soon as possible 🙏

