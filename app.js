(function () {
  var W = window.WEDDING || {};
  var $ = function (id) { return document.getElementById(id); };
  var DAYS = ["day1", "day2"];

  // ── Highlight the nav pill for the section in view ─────────
  var pills = document.querySelectorAll(".nav-pill");
  var sections = ["day-13", "day-14", "rsvp"].map($);
  function markActive() {
    var current = null;
    sections.forEach(function (s) { if (s.getBoundingClientRect().top < window.innerHeight * 0.45) current = s.id; });
    if (current === "day-14" && $("venue").getBoundingClientRect().top < window.innerHeight * 0.45) current = null;
    pills.forEach(function (p) {
      if (p.dataset.nav === current) p.setAttribute("aria-current", "true");
      else p.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", markActive, { passive: true });
  markActive();

  // ── RSVP ───────────────────────────────────────────────────
  // One reply per mobile number: the Sheet script replaces an earlier row
  // with the same number, and this browser remembers that it already replied.
  var form = $("rsvp-form");
  var thanks = $("rsvp-thank-you");
  var done = $("rsvp-done");
  var STORE_KEY = "rahul-mansi-rsvp";
  var attendingYes = function () { return $("att-yes").checked; };

  // Accepts a 10-digit Indian mobile starting with 6 to 9. Spaces, dashes,
  // a +91 / 91 prefix or a leading 0 are allowed and removed.
  function cleanPhone(v) {
    var d = String(v || "").replace(/\D/g, "");
    if (d.length === 12 && d.indexOf("91") === 0) d = d.slice(2);
    else if (d.length === 11 && d.charAt(0) === "0") d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d) ? d : "";
  }

  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch (e) { return null; }
  }
  function save(r) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(r)); } catch (e) {}
  }
  function summary(r) {
    if (r.attending !== "Yes") return r.name + ", you let us know you can't make it.";
    var days = r.days.map(function (d) { return d === "day1" ? "Day 1 (13 March)" : "Day 2 (14 March)"; }).join(" and ");
    return r.name + ", we have you down for " + r.guests + (r.guests === 1 ? " guest" : " guests") + " on " + days + ".";
  }
  function show(panel) {
    [form, thanks, done].forEach(function (p) {
      var on = p === panel;
      p.classList.toggle("hidden", !on);
      if (p !== form) p.classList.toggle("flex", on);
    });
    if (panel !== form) panel.focus({ preventScroll: true });
  }
  function fillForm(r) {
    $("name").value = r.name || "";
    $("phone").value = r.phone || "";
    $("att-yes").checked = r.attending === "Yes";
    $("att-no").checked = r.attending !== "Yes";
    if (r.attending === "Yes") $("guests").value = r.guests;
    DAYS.forEach(function (d) { $("fn-" + d).checked = r.attending !== "Yes" || r.days.indexOf(d) > -1; });
    syncAttending();
  }

  function syncAttending() {
    $("guests-field").classList.toggle("hidden", !attendingYes());
    $("fn-set").classList.toggle("hidden", !attendingYes());
  }
  form.addEventListener("change", syncAttending);
  syncAttending();

  var saved = loadSaved();
  if (saved) {
    $("done-text").textContent = summary(saved);
    show(done);
  }

  function showError(msg, field) {
    $("form-error").textContent = msg;
    $("form-error").classList.remove("hidden");
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }
  form.addEventListener("input", function (e) { e.target.removeAttribute("aria-invalid"); });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    $("form-error").classList.add("hidden");

    var name = $("name").value.trim();
    var phone = cleanPhone($("phone").value);
    var guests = parseInt($("guests").value, 10);
    var yes = attendingYes();
    var chosen = DAYS.filter(function (f) { return $("fn-" + f).checked; });

    if (!name) return showError("Please enter your name.", $("name"));
    if (!phone) return showError("Please enter a 10-digit mobile number starting with 6, 7, 8 or 9.", $("phone"));
    if (yes && !(guests >= 1 && guests <= 30)) return showError("Please enter how many guests are coming, between 1 and 30.", $("guests"));
    if (yes && chosen.length === 0) return showError("Please tick at least one day, or choose “Regretfully declines”.");

    if (!W.rsvpEndpoint) {
      return showError("RSVPs aren't switched on yet. Please check back soon, or message the family directly.");
    }

    var data = new URLSearchParams();
    data.set("name", name);
    data.set("phone", phone);
    data.set("attending", yes ? "Yes" : "No");
    data.set("guests", yes ? String(guests) : "0");
    DAYS.forEach(function (f) { data.set(f, yes && chosen.indexOf(f) > -1 ? String(guests) : "0"); });

    var btn = $("submit-btn");
    btn.disabled = true; $("submit-label").textContent = "Sending…";

    // Apps Script web apps don't send CORS headers, so the reply can't be read.
    // A completed request means the row was received.
    fetch(W.rsvpEndpoint, { method: "POST", mode: "no-cors", body: data })
      .then(function () {
        var record = { name: name, phone: phone, attending: yes ? "Yes" : "No", guests: yes ? guests : 0, days: yes ? chosen : [] };
        save(record);
        var first = name.split(" ")[0];
        $("thanks-text").textContent = yes
          ? "Thank you, " + first + ". We can't wait to celebrate with you."
          : "Thank you for letting us know, " + first + ". You'll be missed, and we're grateful for your blessings.";
        $("done-text").textContent = summary(record);
        show(thanks);
      })
      .catch(function () {
        showError("Your RSVP didn't go through. Please check your internet connection and tap Send RSVP again.");
      })
      .finally(function () {
        btn.disabled = false; $("submit-label").textContent = "Send RSVP";
      });
  });

  function changeAnswer() {
    var r = loadSaved();
    if (r) fillForm(r); else { form.reset(); syncAttending(); }
    show(form);
    $("name").focus();
  }
  $("rsvp-edit-btn").addEventListener("click", changeAnswer);
  $("rsvp-change-btn").addEventListener("click", changeAnswer);
})();
