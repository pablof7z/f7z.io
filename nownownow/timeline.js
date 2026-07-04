(function () {
  "use strict";

  var yearBlocks = Array.prototype.slice.call(document.querySelectorAll(".year-block"));
  if (!yearBlocks.length) return;

  var nav = document.createElement("nav");
  nav.className = "timeline-nav";
  nav.setAttribute("aria-label", "timeline");

  var list = document.createElement("ul");
  nav.appendChild(list);

  var yearLinkByYear = {};
  var monthLinkById = {};

  yearBlocks.forEach(function (yearBlock) {
    var year = yearBlock.dataset.year;

    var yearItem = document.createElement("li");
    var yearLink = document.createElement("a");
    yearLink.className = "tl-year";
    yearLink.href = "#" + yearBlock.id;
    yearLink.textContent = year;
    yearItem.appendChild(yearLink);

    var monthList = document.createElement("ul");
    monthList.className = "tl-months";

    var monthBlocks = Array.prototype.slice.call(yearBlock.querySelectorAll(".month-block"));
    monthBlocks.forEach(function (monthBlock) {
      var monthItem = document.createElement("li");
      var monthLink = document.createElement("a");
      monthLink.href = "#" + monthBlock.id;
      monthLink.textContent = monthBlock.dataset.monthLabel;
      monthItem.appendChild(monthLink);
      monthList.appendChild(monthItem);
      monthLinkById[monthBlock.id] = monthLink;
    });

    yearItem.appendChild(monthList);
    list.appendChild(yearItem);
    yearLinkByYear[year] = yearLink;
  });

  document.body.appendChild(nav);

  function setActiveYear(year) {
    Object.keys(yearLinkByYear).forEach(function (y) {
      yearLinkByYear[y].classList.toggle("active", y === year);
    });
  }

  function setActiveMonth(monthId) {
    Object.keys(monthLinkById).forEach(function (id) {
      monthLinkById[id].classList.toggle("active", id === monthId);
    });
  }

  var currentYear = null;
  var currentMonth = null;

  var yearObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var year = entry.target.dataset.year;
          if (year !== currentYear) {
            currentYear = year;
            setActiveYear(year);
          }
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  var monthObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var monthId = entry.target.id;
          if (monthId !== currentMonth) {
            currentMonth = monthId;
            setActiveMonth(monthId);
          }
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  yearBlocks.forEach(function (yearBlock) {
    yearObserver.observe(yearBlock);
    Array.prototype.slice.call(yearBlock.querySelectorAll(".month-block")).forEach(function (mb) {
      monthObserver.observe(mb);
    });
  });

  // default to most recent year/month expanded on load
  var first = yearBlocks[0];
  if (first) {
    setActiveYear(first.dataset.year);
    var firstMonth = first.querySelector(".month-block");
    if (firstMonth) setActiveMonth(firstMonth.id);
  }
})();
