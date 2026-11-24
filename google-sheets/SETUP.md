# Connect the RSVP form to Google Sheets

This takes about 10 minutes and only has to be done once.

## 1. Create the Sheet
1. Go to <https://sheets.new> and sign in with the Google account that should own the RSVPs.
2. Name it, for example **Rahul & Mansi – RSVPs**.

## 2. Add the script
1. In the Sheet, open **Extensions → Apps Script**.
2. Delete the code that's already in the editor, and paste in everything from `Code.gs` in this folder.
3. Click **Save** (the disk icon).
4. In the function dropdown at the top, choose **setup**, then click **Run**.
   Google will ask you to authorise the script: choose your account, click **Advanced → Go to project (unsafe)**, and then **Allow**. You see this warning because you wrote the script yourself and Google hasn't reviewed it. It only touches this one Sheet.
5. Back in the Sheet you should now see two tabs: **RSVPs** and **Headcount**.

## 3. Publish it as a web app
1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, and copy the **Web app URL**. It ends in `/exec`.

## 4. Connect the website
1. Open `config.js` and paste the URL between the quotes:
   ```js
   rsvpEndpoint: "https://script.google.com/macros/s/XXXX/exec",
   ```
2. Open the website, send a test RSVP, and check that a row appears in **RSVPs**. Delete the test row afterwards.

## Updating an existing setup
If you set the Sheet up with an earlier version of the script (mobile numbers are stored as plain 10 digits; rows saved as +91… still match):
1. In the Sheet, delete any test rows in **RSVPs** (keep row 1).
2. In **Extensions → Apps Script**, replace all the code with the new `Code.gs` and click **Save**.
3. Choose **setup** in the dropdown and click **Run**. This rewrites the header row and the **Headcount** tab.
4. Click **Deploy → Manage deployments**, click the pencil icon, set **Version** to **New version**, and click **Deploy**. The web app link stays the same, so the website doesn't need changing.

## Reading the results
- **RSVPs** has one row per mobile number. If someone replies again from the same number, their row is replaced with the new answer, and **Times replied** goes up by one. The Day 1 and Day 2 columns hold the number of guests coming that day, or 0.
- **Headcount** adds up each day, which gives you the plate counts to send to the venue.

## If you change the script later
Use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. This keeps the same URL, so you don't need to change `config.js`.
