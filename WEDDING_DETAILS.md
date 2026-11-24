# Wedding details: Rahul & Mansi

This file is the single source of truth for the wedding invite and RSVP. Any page, image or message made for the wedding should match it. If something here changes, update this file first, then `config.js` and the images.

Last updated: 24 November 2026

---

## 1. The couple and the hosts
| | |
|---|---|
| Bride | **Mansi Gupta** |
| Groom | **Rahul Tandon** |
| Invitation is from | **The Tandon and Gupta families** |
| Names on the invite | "Rahul & Mansi" (groom first), first names only |

## 2. Venue
- **Shawn Elizey**, Bargi Hills, Jabalpur, Madhya Pradesh 482003
- Map link: https://share.google/XutFWuwtCCQMFUmMp
- Spelling: the venue's own documents use **"Elizey"**, so the invite uses that spelling too, even though it's sometimes written "Elizay".
- Shawn Elizey is a large property split into **sub-venues**. Each function happens at a different one, so the invite must name the sub-venue for every function.

## 3. Functions
| Date | Function | Sub-venue | Time on invite | Status |
|---|---|---|---|---|
| Sat 13 Mar 2027 | **Haldi** | West Elizey Day | Afternoon | Final |
| Sat 13 Mar 2027 | **Sangeet** | Grand Elizey | Evening | Final |
| Sun 14 Mar 2027 | **Varmala** | Elizey Varmala Fountain | Afternoon | Final |
| Sun 14 Mar 2027 | **Pheras** (wedding ceremony) | Grand Garden Mandap | Afternoon | Final |
| Sun 14 Mar 2027 | **Reception** | Dream Elizey | Night | Final |

Notes:
- The 14th is a **day wedding**: the Varmala and the Pheras run from the afternoon into the evening, and the Reception follows at night.
- The Haldi has a **multicolour** theme, so guests are asked to wear bright colours.
- The RSVP asks by day, not by function: Day 1 (Haldi & Sangeet) and Day 2 (Varmala, Pheras & Reception).
- Not on the invite: hi-tea on 13 and 14 March (no venue listed), lunch on the 14th at Grand Elizey, and breakfast and checkout on 15 March.

### Venue timing rules (from the venue's terms)
These limit what times we can print:
- Lunch slot: 1:00 PM to 3:30 PM. Dinner slot: 9:00 PM to 11:30 PM, as printed on the venue's terms.
- The DJ must stop by **10:00 PM**. This matters for the Sangeet.
- No fireworks or crackers anywhere on the property.
- Room check-in is 12:00 to 2:00 PM, and checkout is by 10:00 AM.

## 4. RSVP
- **Where responses go:** a Google Sheet owned by the family, which receives them through a Google Apps Script web app (`google-sheets/`).
- **Reply by:** no fixed date. The invite says "Please let us know as soon as possible."
- **Questions on the form:**
  1. Name (required)
  2. Mobile number (required, 10-digit Indian mobile starting with 6, 7, 8 or 9; spaces, +91 or a leading 0 are accepted and removed). Stored as plain 10 digits and used to keep one reply per family. Overseas numbers are not accepted for now.
  3. Attending: "Joyfully accepts" or "Regretfully declines"
  4. Number of guests, including themselves (1 to 30, only if attending)
  5. Which days they'll attend: Day 1, 13 March (Haldi & Sangeet) and/or Day 2, 14 March (Varmala, Pheras & Reception) (only if attending)
- **The Sheet records:** one row per mobile number, with last updated time, name, mobile, attending, guests, Day 1 and Day 2 guest counts, and how many times they replied.
- **Duplicate replies:** a reply from a number that already replied replaces that row, so the latest answer wins. The guest's browser also remembers the reply and shows "You've already responded", with a "Change my answer" button.
- The **Headcount** tab adds up the guests for each day, for the venue's plate counts. The venue charges 25% extra per plate once the guaranteed count is exceeded by more than 10%, so accurate numbers matter.

## 5. How the invite reaches guests
- The invite is sent on **WhatsApp**, as an invite image followed by a message with the website link.
- The website will be hosted on **GitHub Pages** at https://mr-wakadoodle.github.io/wedding-invite-rahul-mansi/ (repository `mr-wakadoodle/wedding-invite-rahul-mansi`). Nothing is pushed until the family approves.
- When the link is pasted into WhatsApp, a preview image shows (`assets/og-preview.jpg`, 1200×630).
- The WhatsApp invite image is portrait, 1080×1350 (`assets/whatsapp-invite.jpg`).

## 6. Look and feel
- **Design:** taken from the family's Google Stitch design. It uses warm ivory, bottle green, champagne gold and dusty rose, with a mehrab arch around the names, lotus dividers and fine gold borders.
- **Fonts:** Cormorant for the names and headings, Proza Libre for the body text, and Noto Serif Devanagari for "॥ शुभ विवाह ॥".
- **Layout:** one scrolling page, in this order:
  1. Hero
  2. Day One (13 March)
  3. Day Two (14 March)
  4. Venue & Travel
  5. RSVP
  6. Footer

  The sticky top bar jumps to 13 March, 14 March or the RSVP.
- **Unverified:** the travel distances (airport ~24 km, railway station ~12 km) came from Stitch and haven't been checked.

## 7. Still to decide
- [ ] Real travel distances to the airport and railway station
- [ ] Whether to name parents or grandparents on the invite (for example "Son of… / Daughter of…")
- [ ] A contact person and phone number for guests' questions
- [ ] Whether guests staying at the venue need accommodation details on the invite
- [ ] Whether to include a dress code for each function beyond the Haldi
- [ ] Setting up the Google Sheet, and when to publish on GitHub Pages

## Sources
- `ShawnElizay_loc.jpeg`: the venue's quotation (dates, sub-venues, functions, guest counts)
- `ShawnElizay_Ins.jpeg`: the venue's terms and conditions (timings and rules)
- Details from the family in the project chat (couple, families, Varmala and Pheras venues, day wedding on the 14th)
