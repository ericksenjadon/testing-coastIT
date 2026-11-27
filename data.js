/* BCW shared data. Both index.html and roster.html read from this file.
   To add a competitor, ranking, story or title detail, edit the lists below and save. */
(function () {
  /* legacy: [[reigns, "Title name"], ...]   ranked: [{ rank, division, title }]   photo: optional image URL */
  var ROSTER = [
    {
      name: "Nehemiah", status: "Active", alignment: "heel", brand: "BCW", hue: 148,
      record: { w: 8, l: 4, d: 0 },
      current: ["BCW World Heavyweight Championship", "Undisputed World Championship"],
      ranked: [],
      legacy: [[3, "Undisputed World Championship"], [2, "Men's Rumble Winner"], [1, "BCW World Heavyweight Championship"], [1, "BCW Tag Team Championship"], [1, "24/7 Championship"]]
    },
    {
      name: "Malcolm", status: "Active", alignment: "face", brand: "BCW", hue: 165,
      record: { w: 5, l: 3, d: 0 },
      current: ["BCW Tag Team Championship"],
      ranked: [{ rank: 1, division: "Undisputed Championship", title: "Undisputed World Championship" }],
      legacy: [[2, "BCW World Heavyweight Championship"], [1, "Undisputed World Championship"], [1, "BCW Tag Team Championship"], [1, "Men's Rumble Winner"]]
    },
    {
      name: "Caleb", status: "Active", alignment: "tween", brand: "BCW", hue: 135,
      record: { w: 2, l: 1, d: 0 },
      current: ["Men's Rumble Winner"],
      ranked: [{ rank: 1, division: "BCW World Championship", title: "BCW World Heavyweight Championship" }],
      legacy: [[1, "Undisputed World Championship"], [1, "BCW Tag Team Championship"], [1, "24/7 Championship"], [1, "Men's Rumble Winner"]]
    },
    {
      name: "Justin", status: "Active", alignment: "tween", brand: "BCW", hue: 175,
      record: { w: 2, l: 3, d: 0 },
      current: ["BCW Tag Team Championship"],
      ranked: [{ rank: 2, division: "BCW World Championship", title: "BCW World Heavyweight Championship" }],
      legacy: [[2, "BCW Tag Team Championship"], [1, "BCW World Heavyweight Championship"]]
    }
  ].map(function (p) {
    var total = p.record.w + p.record.l + p.record.d;
    p.id = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    p.winRate = total ? Math.round((p.record.w / total) * 100) : 0;
    p.reigns = p.legacy.reduce(function (n, l) { return n + l[0]; }, 0);
    return p;
  });

  /* Championship table, derived from the roster so it always matches. */
  var TITLES = (function () {
    var names = [];
    ROSTER.forEach(function (p) {
      p.current.concat(p.legacy.map(function (l) { return l[1]; })).forEach(function (t) { if (names.indexOf(t) < 0) names.push(t); });
    });
    return names.map(function (name) {
      var holders = ROSTER.filter(function (p) { return p.current.indexOf(name) >= 0; }).map(function (p) { return p.name; });
      var past = ROSTER.reduce(function (n, p) {
        var hit = p.legacy.filter(function (l) { return l[1] === name; })[0];
        return n + (hit ? hit[0] : 0);
      }, 0);
      return { name: name, holders: holders, past: past };
    }).sort(function (a, b) { return b.holders.length - a.holders.length; });
  })();

  /* Optional reign details shown on the home page. Add one line per title. */
  var TITLE_DETAILS = {
    "Undisputed World Championship": { reign: "690 days", lastDefense: "Never" }
  };

  /* Rankings by score. Add rows for any rank (the list shows whatever is here, in rank order). */
  var RANKINGS = [
    { rank: 3, name: "Caleb", score: 61.75 },
    { rank: 4, name: "Justin", score: 44.94 },
    { rank: 5, name: "Seth", score: 44.10 },
    { rank: 6, name: "Bok", score: 40.10 },
    { rank: 7, name: "Ethan", score: 21.60 },
    { rank: 8, name: "Deowin", score: 16.10 },
    { rank: 9, name: "Naledi", score: 4.88 },
    { rank: 10, name: "Deuze", score: 0 }
  ];

  var STORIES = [
    {
      title: "The Axis", status: "Active",
      text: "During The King of The Ring tournament 2025: Justin would face against Nehemiah in the opening round, and the fallout pulled the rest of the locker room in.",
      people: ["Nehemiah", "Naledi", "Justin"]
    },
    {
      title: "Brother's Keeper", status: "Active",
      text: "During the lead up to Backyard Mania 2024, Nehemiah would win the rumble and set the stage for everything that followed.",
      people: ["Caleb", "Nehemiah"]
    },
    {
      title: "The Greatest Mania Of ...", status: "Concluded",
      text: "Jadon, now known as \"Nehemiah\", would win the rumble and punch his ticket to the main event.",
      people: ["Justin", "Nehemiah", "Malcolm"]
    }
  ];

  window.BCW = { ROSTER: ROSTER, TITLES: TITLES, TITLE_DETAILS: TITLE_DETAILS, RANKINGS: RANKINGS, STORIES: STORIES };
})();
