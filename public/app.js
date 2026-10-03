(() => {
  const STORAGE_KEY = "bill-floor-buddy-v1";
  const DEFAULTS = {
    goal: 2300,
    saved: 0,
    deadline: "2026-11-30",
    bills: [],
  };

  const els = {
    goalForm: document.getElementById("goal-form"),
    goalInput: document.getElementById("goal-input"),
    savedInput: document.getElementById("saved-input"),
    deadlineInput: document.getElementById("deadline-input"),
    billForm: document.getElementById("bill-form"),
    billName: document.getElementById("bill-name"),
    billAmount: document.getElementById("bill-amount"),
    billError: document.getElementById("bill-error"),
    billList: document.getElementById("bill-list"),
    emptyState: document.getElementById("empty-state"),
    daysLeft: document.getElementById("days-left"),
    remainingGap: document.getElementById("remaining-gap"),
    dailyNeeded: document.getElementById("daily-needed"),
    dailyStat: document.getElementById("daily-stat"),
    billsTotal: document.getElementById("bills-total"),
    coverage: document.getElementById("coverage"),
    notice: document.getElementById("notice"),
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULTS);
      const parsed = JSON.parse(raw);
      return {
        goal: Number(parsed.goal) || DEFAULTS.goal,
        saved: Number(parsed.saved) || 0,
        deadline: typeof parsed.deadline === "string" ? parsed.deadline : DEFAULTS.deadline,
        bills: Array.isArray(parsed.bills)
          ? parsed.bills
              .filter((b) => b && typeof b.name === "string")
              .map((b) => ({
                id: String(b.id || crypto.randomUUID()),
                name: String(b.name).slice(0, 80),
                amount: Math.max(0, Number(b.amount) || 0),
              }))
          : [],
      };
    } catch (_) {
      els.notice.hidden = false;
      els.notice.textContent = "Saved data looked broken, so defaults were restored.";
      return structuredClone(DEFAULTS);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function money(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n || 0);
  }

  function daysLeft(deadline) {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const parts = String(deadline).split("-").map(Number);
    if (parts.length !== 3 || parts.some((p) => Number.isNaN(p))) return 0;
    const end = new Date(parts[0], parts[1] - 1, parts[2]);
    const diff = Math.floor((end - start) / 86400000);
    if (diff < 0) return 0;
    return diff + 1; // include today
  }

  function compute(s) {
    const days = daysLeft(s.deadline);
    const remainingGap = Math.max(0, Number(s.goal) - Number(s.saved));
    const daily = days > 0 ? remainingGap / days : remainingGap;
    const billsTotal = s.bills.reduce((sum, b) => sum + b.amount, 0);
    return { days, remainingGap, daily, billsTotal };
  }

  function render() {
    els.goalInput.value = state.goal;
    els.savedInput.value = state.saved;
    els.deadlineInput.value = state.deadline;

    const { days, remainingGap, daily, billsTotal } = compute(state);
    els.daysLeft.textContent = String(days);
    els.remainingGap.textContent = money(remainingGap);
    els.dailyNeeded.textContent = money(daily);
    els.billsTotal.textContent = money(billsTotal);
    els.coverage.textContent =
      billsTotal <= state.goal
        ? `goal covers checklist (+${money(state.goal - billsTotal)} buffer)`
        : `checklist exceeds goal by ${money(billsTotal - state.goal)}`;

    els.dailyStat.classList.toggle("calm", daily < 40);

    els.billList.innerHTML = "";
    state.bills.forEach((bill) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${escapeHtml(bill.name)}</span>`;
      const meta = document.createElement("div");
      meta.className = "bill-meta";
      meta.innerHTML = `<span class="amount">${money(bill.amount)}</span>`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn ghost";
      btn.textContent = "Remove";
      btn.addEventListener("click", () => {
        state.bills = state.bills.filter((b) => b.id !== bill.id);
        saveState();
        render();
      });
      meta.appendChild(btn);
      li.appendChild(meta);
      els.billList.appendChild(li);
    });

    els.emptyState.hidden = state.bills.length > 0;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  els.goalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state.goal = Math.max(0, Number(els.goalInput.value) || 0);
    state.saved = Math.max(0, Number(els.savedInput.value) || 0);
    state.deadline = els.deadlineInput.value || DEFAULTS.deadline;
    saveState();
    render();
  });

  els.billForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = els.billName.value.trim();
    const amount = Number(els.billAmount.value);
    if (!name) {
      els.billError.hidden = false;
      els.billError.textContent = "Add a bill name.";
      return;
    }
    if (!Number.isFinite(amount) || amount < 0) {
      els.billError.hidden = false;
      els.billError.textContent = "Amount must be zero or greater.";
      return;
    }
    els.billError.hidden = true;
    state.bills.push({
      id: crypto.randomUUID(),
      name: name.slice(0, 80),
      amount,
    });
    els.billForm.reset();
    saveState();
    render();
    els.billName.focus();
  });

  // Expose for smoke tests / demo scripts
  window.BillFloorBuddy = {
    getState: () => structuredClone(state),
    compute: () => compute(state),
    reset: () => {
      state = structuredClone(DEFAULTS);
      saveState();
      render();
    },
  };

  render();
})();
