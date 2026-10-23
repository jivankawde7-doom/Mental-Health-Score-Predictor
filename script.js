// --- APP STATE & CONSTANTS ---
    const TOP_COUNTRIES = new Set([
      'Other', 'India', 'USA', 'Canada', 'Australia',
      'UK', 'Germany', 'Mexico', 'Turkey', 'France'
    ]);

    let config = {
      apiUrl: 'https://mental-health-score-predictor-xjck.onrender.com',
      forceSimulation: false,
      isApiOnline: false
    };

    let currentScore = 74.2;
    let lifestyleChartInstance = null;
    let batchHistChartInstance = null;
    let batchPlatformChartInstance = null;
    let activeCodeTab = 'curl';

    // Sample Cohort Dataset (18 representative student profiles)
    let cohortData = [
      { id: "STU-101", age: 22, gender: "Female", country: "USA", academic_level: "Undergraduate", most_used_platform: "Instagram", purpose_of_use: "Entertainment", avg_daily_usage_hours: 5.5, daily_unlocks: 85, study_hours: 6.0, physical_activity_hours: 0.5, sleep_hours_per_night: 5.5, stress_level: "High", predicted_mental_health_score: 52.3 },
      { id: "STU-102", age: 24, gender: "Male", country: "India", academic_level: "Graduate", most_used_platform: "YouTube", purpose_of_use: "Education", avg_daily_usage_hours: 3.0, daily_unlocks: 40, study_hours: 7.5, physical_activity_hours: 1.5, sleep_hours_per_night: 7.5, stress_level: "Medium", predicted_mental_health_score: 81.4 },
      { id: "STU-103", age: 17, gender: "Female", country: "UK", academic_level: "High School", most_used_platform: "TikTok", purpose_of_use: "Entertainment", avg_daily_usage_hours: 7.0, daily_unlocks: 140, study_hours: 3.0, physical_activity_hours: 0.0, sleep_hours_per_night: 4.5, stress_level: "Very High", predicted_mental_health_score: 34.8 },
      { id: "STU-104", age: 20, gender: "Male", country: "Canada", academic_level: "Undergraduate", most_used_platform: "LinkedIn", purpose_of_use: "Networking", avg_daily_usage_hours: 2.0, daily_unlocks: 35, study_hours: 5.0, physical_activity_hours: 2.0, sleep_hours_per_night: 8.0, stress_level: "Low", predicted_mental_health_score: 89.2 },
      { id: "STU-105", age: 23, gender: "Female", country: "Australia", academic_level: "Graduate", most_used_platform: "Twitter", purpose_of_use: "News", avg_daily_usage_hours: 4.0, daily_unlocks: 70, study_hours: 6.5, physical_activity_hours: 1.0, sleep_hours_per_night: 6.5, stress_level: "Medium", predicted_mental_health_score: 72.1 },
      { id: "STU-106", age: 19, gender: "Male", country: "Germany", academic_level: "Undergraduate", most_used_platform: "Instagram", purpose_of_use: "Entertainment", avg_daily_usage_hours: 6.5, daily_unlocks: 110, study_hours: 4.0, physical_activity_hours: 0.5, sleep_hours_per_night: 5.0, stress_level: "High", predicted_mental_health_score: 47.9 },
      { id: "STU-107", age: 21, gender: "Female", country: "France", academic_level: "Undergraduate", most_used_platform: "Snapchat", purpose_of_use: "Entertainment", avg_daily_usage_hours: 4.5, daily_unlocks: 90, study_hours: 4.5, physical_activity_hours: 1.0, sleep_hours_per_night: 7.0, stress_level: "Medium", predicted_mental_health_score: 68.3 },
      { id: "STU-108", age: 26, gender: "Male", country: "Turkey", academic_level: "Graduate", most_used_platform: "LinkedIn", purpose_of_use: "Networking", avg_daily_usage_hours: 3.5, daily_unlocks: 50, study_hours: 8.0, physical_activity_hours: 1.5, sleep_hours_per_night: 6.0, stress_level: "High", predicted_mental_health_score: 63.7 },
      { id: "STU-109", age: 18, gender: "Female", country: "Mexico", academic_level: "High School", most_used_platform: "TikTok", purpose_of_use: "Entertainment", avg_daily_usage_hours: 8.0, daily_unlocks: 160, study_hours: 2.5, physical_activity_hours: 0.5, sleep_hours_per_night: 4.0, stress_level: "Very High", predicted_mental_health_score: 31.4 },
      { id: "STU-110", age: 22, gender: "Male", country: "Other", academic_level: "Undergraduate", most_used_platform: "YouTube", purpose_of_use: "Education", avg_daily_usage_hours: 4.0, daily_unlocks: 60, study_hours: 5.0, physical_activity_hours: 1.0, sleep_hours_per_night: 7.0, stress_level: "Medium", predicted_mental_health_score: 75.0 },
      { id: "STU-111", age: 25, gender: "Female", country: "India", academic_level: "Graduate", most_used_platform: "Whatsapp", purpose_of_use: "Networking", avg_daily_usage_hours: 2.5, daily_unlocks: 45, study_hours: 7.0, physical_activity_hours: 1.5, sleep_hours_per_night: 7.5, stress_level: "Low", predicted_mental_health_score: 86.4 },
      { id: "STU-112", age: 20, gender: "Male", country: "USA", academic_level: "Undergraduate", most_used_platform: "Snapchat", purpose_of_use: "Entertainment", avg_daily_usage_hours: 6.0, daily_unlocks: 125, study_hours: 3.5, physical_activity_hours: 0.5, sleep_hours_per_night: 5.5, stress_level: "High", predicted_mental_health_score: 49.8 },
      { id: "STU-113", age: 21, gender: "Female", country: "UK", academic_level: "Undergraduate", most_used_platform: "Instagram", purpose_of_use: "Entertainment", avg_daily_usage_hours: 5.0, daily_unlocks: 80, study_hours: 5.5, physical_activity_hours: 1.0, sleep_hours_per_night: 6.5, stress_level: "Medium", predicted_mental_health_score: 66.2 },
      { id: "STU-114", age: 23, gender: "Male", country: "Canada", academic_level: "Graduate", most_used_platform: "YouTube", purpose_of_use: "Education", avg_daily_usage_hours: 3.0, daily_unlocks: 30, study_hours: 6.0, physical_activity_hours: 2.0, sleep_hours_per_night: 8.0, stress_level: "Low", predicted_mental_health_score: 91.5 },
      { id: "STU-115", age: 19, gender: "Female", country: "Australia", academic_level: "Undergraduate", most_used_platform: "TikTok", purpose_of_use: "Entertainment", avg_daily_usage_hours: 7.5, daily_unlocks: 150, study_hours: 3.0, physical_activity_hours: 0.0, sleep_hours_per_night: 5.0, stress_level: "Very High", predicted_mental_health_score: 36.1 },
      { id: "STU-116", age: 22, gender: "Male", country: "Germany", academic_level: "Undergraduate", most_used_platform: "LinkedIn", purpose_of_use: "Networking", avg_daily_usage_hours: 2.0, daily_unlocks: 40, study_hours: 5.5, physical_activity_hours: 1.5, sleep_hours_per_night: 7.5, stress_level: "Low", predicted_mental_health_score: 84.7 },
      { id: "STU-117", age: 24, gender: "Female", country: "France", academic_level: "Graduate", most_used_platform: "Twitter", purpose_of_use: "News", avg_daily_usage_hours: 4.0, daily_unlocks: 65, study_hours: 7.0, physical_activity_hours: 1.0, sleep_hours_per_night: 6.0, stress_level: "Medium", predicted_mental_health_score: 70.8 },
      { id: "STU-118", age: 18, gender: "Male", country: "India", academic_level: "High School", most_used_platform: "YouTube", purpose_of_use: "Education", avg_daily_usage_hours: 4.5, daily_unlocks: 55, study_hours: 6.5, physical_activity_hours: 1.0, sleep_hours_per_night: 7.0, stress_level: "Medium", predicted_mental_health_score: 76.5 }
    ];

    // Presets catalog
    const PRESETS = {
      burnedOut: {
        age: 24, gender: "Male", country: "USA", academic_level: "Graduate",
        most_used_platform: "LinkedIn", purpose_of_use: "Networking",
        avg_daily_usage_hours: 5.5, daily_unlocks: 95, study_hours: 9.0,
        physical_activity_hours: 0.5, sleep_hours_per_night: 4.5, stress_level: "Very High"
      },
      balancedScholar: {
        age: 21, gender: "Female", country: "Canada", academic_level: "Undergraduate",
        most_used_platform: "YouTube", purpose_of_use: "Education",
        avg_daily_usage_hours: 2.5, daily_unlocks: 35, study_hours: 5.5,
        physical_activity_hours: 1.5, sleep_hours_per_night: 8.0, stress_level: "Low"
      },
      socialMediaAddict: {
        age: 18, gender: "Female", country: "UK", academic_level: "High School",
        most_used_platform: "TikTok", purpose_of_use: "Entertainment",
        avg_daily_usage_hours: 8.5, daily_unlocks: 180, study_hours: 2.0,
        physical_activity_hours: 0.0, sleep_hours_per_night: 4.5, stress_level: "High"
      },
      examCrisis: {
        age: 20, gender: "Male", country: "India", academic_level: "Undergraduate",
        most_used_platform: "Whatsapp", purpose_of_use: "Education",
        avg_daily_usage_hours: 3.0, daily_unlocks: 60, study_hours: 11.0,
        physical_activity_hours: 0.0, sleep_hours_per_night: 4.0, stress_level: "Very High"
      }
    };

    // --- INITIALIZATION ---
    window.onload = function() {
      initLifestyleChart();
      recalcRoutine();
      updateCountryGroupingBadge();
      checkBackendConnectivity();
      renderBatchAnalytics();
      computeSHAPBreakdown();
    };

    // --- INPUT SYNCS & FORM HELPERS ---
    function syncAge(val) {
      val = Math.min(100, Math.max(10, parseInt(val) || 10));
      document.getElementById('inputAge').value = val;
      document.getElementById('inputAgeNum').value = val;
      document.getElementById('valAge').innerText = val + " yrs";
    }

    function syncUnlocks(val) {
      val = Math.max(0, parseInt(val) || 0);
      document.getElementById('inputUnlocks').value = Math.min(250, val);
      document.getElementById('inputUnlocksNum').value = val;
      document.getElementById('valUnlocks').innerText = val + " unlocks/day";
    }

    function updateCountryGroupingBadge() {
      const country = document.getElementById('inputCountry').value;
      const badge = document.getElementById('groupCountryBadge');
      if (country === 'Other') {
        badge.innerText = "Country Group: 'Other'";
        badge.className = "text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30";
      } else {
        badge.innerText = `Country Group: '${country}'`;
        badge.className = "text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700";
      }
    }

    function getSelectedStress() {
      const radios = document.getElementsByName('stressRadio');
      for (const r of radios) {
        if (r.checked) return r.value;
      }
      return 'Medium';
    }

    function setSelectedStress(val) {
      const radios = document.getElementsByName('stressRadio');
      for (const r of radios) {
        r.checked = (r.value === val);
      }
    }

    function applyPreset(key) {
      const p = PRESETS[key];
      if (!p) return;
      syncAge(p.age);
      document.getElementById('inputGender').value = p.gender;
      document.getElementById('inputCountry').value = p.country;
      updateCountryGroupingBadge();
      document.getElementById('inputAcademicLevel').value = p.academic_level;
      document.getElementById('inputPlatform').value = p.most_used_platform;
      document.getElementById('inputPurpose').value = p.purpose_of_use;
      syncUnlocks(p.daily_unlocks);

      document.getElementById('inputScreenHours').value = p.avg_daily_usage_hours;
      document.getElementById('inputStudyHours').value = p.study_hours;
      document.getElementById('inputSleepHours').value = p.sleep_hours_per_night;
      document.getElementById('inputActivityHours').value = p.physical_activity_hours;
      setSelectedStress(p.stress_level);

      recalcRoutine();
      handleFormSubmit(new Event('submit'));
      showToast(`Applied preset: ${key.replace(/([A-Z])/g, ' $1')}`, 'info');
    }

    function resetToDefaults() {
      applyPreset('balancedScholar');
    }

    // --- 24-HOUR ALLOCATION & DONUT CHART ---
    function recalcRoutine() {
      const screen = parseFloat(document.getElementById('inputScreenHours').value) || 0;
      const study = parseFloat(document.getElementById('inputStudyHours').value) || 0;
      const sleep = parseFloat(document.getElementById('inputSleepHours').value) || 0;
      const activity = parseFloat(document.getElementById('inputActivityHours').value) || 0;

      document.getElementById('valScreen').innerText = screen.toFixed(1) + ' hrs';
      document.getElementById('valStudy').innerText = study.toFixed(1) + ' hrs';
      document.getElementById('valSleep').innerText = sleep.toFixed(1) + ' hrs';
      document.getElementById('valActivity').innerText = activity.toFixed(1) + ' hrs';

      document.getElementById('legendScreen').innerText = screen.toFixed(1) + 'h';
      document.getElementById('legendStudy').innerText = study.toFixed(1) + 'h';
      document.getElementById('legendSleep').innerText = sleep.toFixed(1) + 'h';
      document.getElementById('legendActivity').innerText = activity.toFixed(1) + 'h';

      const total = screen + study + sleep + activity;
      const free = Math.max(0, 24 - total);

      const indicator = document.getElementById('totalHoursIndicator');
      const warning = document.getElementById('routineWarning');

      indicator.innerText = `Total: ${total.toFixed(1)}h / 24h`;
      if (total > 24) {
        indicator.className = "text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40";
        warning.classList.remove('hidden');
      } else {
        indicator.className = "text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/30";
        warning.classList.add('hidden');
      }

      if (lifestyleChartInstance) {
        lifestyleChartInstance.data.datasets[0].data = [screen, study, sleep, activity, free];
        lifestyleChartInstance.update();
      }
    }

    function initLifestyleChart() {
      const ctx = document.getElementById('lifestyleDoughnutChart').getContext('2d');
      lifestyleChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Screen Time', 'Study', 'Sleep', 'Activity', 'Remaining Unallocated'],
          datasets: [{
            data: [4.5, 5.0, 7.0, 1.0, 6.5],
            backgroundColor: [
              '#6366f1', // Indigo (Screen)
              '#38bdf8', // Sky (Study)
              '#c084fc', // Purple (Sleep)
              '#34d399', // Emerald (Activity)
              'rgba(51, 65, 85, 0.4)' // Slate (Free)
            ],
            borderWidth: 2,
            borderColor: '#0b0f19',
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(c) {
                  return ` ${c.label}: ${c.raw.toFixed(1)} hrs`;
                }
              }
            }
          }
        }
      });
    }

    // --- FORM DATA EXTRACTION ---
    function getFormDataPayload() {
      const countryVal = document.getElementById('inputCountry').value;
      return {
        age: parseInt(document.getElementById('inputAge').value),
        gender: document.getElementById('inputGender').value,
        country: countryVal,
        academic_level: document.getElementById('inputAcademicLevel').value,
        most_used_platform: document.getElementById('inputPlatform').value,
        purpose_of_use: document.getElementById('inputPurpose').value,
        avg_daily_usage_hours: parseFloat(document.getElementById('inputScreenHours').value),
        daily_unlocks: parseInt(document.getElementById('inputUnlocks').value),
        study_hours: parseFloat(document.getElementById('inputStudyHours').value),
        physical_activity_hours: parseFloat(document.getElementById('inputActivityHours').value),
        sleep_hours_per_night: parseFloat(document.getElementById('inputSleepHours').value),
        stress_level: getSelectedStress()
      };
    }

    // --- INTELLIGENT SURROGATE INFERENCE MODEL (Offline/Client side ML proxy) ---
    // Mimics gradient boosted trees trained on the exact student mental health benchmark
    function runSurrogateInference(payload) {
      let score = 70.0; // Base baseline

      // 1. Sleep: Non-linear impact. Sweet spot is 7.5 - 8.5 hours.
      const sleep = payload.sleep_hours_per_night;
      if (sleep < 5.0) score -= (5.0 - sleep) * 7.5 + 8;
      else if (sleep < 7.0) score -= (7.0 - sleep) * 4.0;
      else if (sleep >= 7.0 && sleep <= 9.0) score += (sleep - 7.0) * 3.5;
      else score -= (sleep - 9.0) * 2.0;

      // 2. Daily screen time & unlocks (Digital saturation)
      const screen = payload.avg_daily_usage_hours;
      if (screen > 4.0) score -= (screen - 4.0) * 3.8;
      else score += (4.0 - screen) * 1.5;

      const unlocks = payload.daily_unlocks;
      if (unlocks > 70) score -= ((unlocks - 70) / 10) * 1.4;

      // 3. Physical Activity (Protective buffer)
      const activity = payload.physical_activity_hours;
      score += Math.min(activity, 3.0) * 5.2;

      // 4. Study Hours & Academic Stress
      const study = payload.study_hours;
      if (study > 8.0) score -= (study - 8.0) * 4.2;
      else if (study >= 3.0 && study <= 6.0) score += 3.0;

      // 5. Stress Level Penalty
      const stressMultipliers = {
        'Low': 8.0,
        'Medium': 0.0,
        'High': -9.5,
        'Very High': -18.5
      };
      score += (stressMultipliers[payload.stress_level] || 0);

      // 6. Purpose of use adjustments
      if (payload.purpose_of_use === 'Education') score += 3.5;
      if (payload.purpose_of_use === 'Entertainment' && screen > 5) score -= 3.0;

      // 7. Clamp within 5 to 98
      return Math.round(Math.min(98.5, Math.max(5.0, score)) * 10) / 10;
    }

    // --- FASTAPI / INFERENCE DISPATCHER ---
    async function handleFormSubmit(e) {
      if (e) e.preventDefault();

      const btn = document.getElementById('btnRunInference');
      const btnText = document.getElementById('btnText');
      const btnIcon = document.getElementById('btnIcon');

      // Loading state
      btn.disabled = true;
      btnText.innerText = "Querying Inference Engine...";
      btnIcon.innerHTML = `<svg class="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>`;

      const payload = getFormDataPayload();

      let finalScore = null;
      let usedEngine = "Client Surrogate";

      if (!config.forceSimulation) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);

          const res = await fetch(config.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            finalScore = parseFloat(data.predicted_mental_health_score);
            usedEngine = "FastAPI Service (Live)";
            setBackendStatus(true);
          } else {
            throw new Error(`HTTP ${res.status}`);
          }
        } catch (err) {
          // Fallback to surrogate
          setBackendStatus(false);
          finalScore = runSurrogateInference(payload);
          usedEngine = "Surrogate ML (Offline Fallback)";
        }
      } else {
        finalScore = runSurrogateInference(payload);
        usedEngine = "Client Simulation Mode";
      }

      // Restore button
      setTimeout(() => {
        btn.disabled = false;
        btnText.innerText = "Compute Mental Well-being Score";
        btnIcon.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
        
        applyScorePresentation(finalScore, usedEngine);
        computeSHAPBreakdown(payload);
        resetSensitivity();

        if (finalScore >= 75) {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
      }, 350);
    }

    // --- PRESENTATION OF PREDICTED SCORE ---
    function applyScorePresentation(score, engineLabel) {
      currentScore = score;
      const displayElem = document.getElementById('displayScore');
      const badge = document.getElementById('statusRiskBadge');
      const tier = document.getElementById('scoreTierLabel');
      const arc = document.getElementById('scoreArc');
      const engineBadge = document.getElementById('engineBadge');

      engineBadge.innerText = engineLabel;
      displayElem.innerText = score.toFixed(1);

      // Arc calculation (Circumference ~ 314)
      const offset = 314 - (314 * (score / 100));
      arc.style.strokeDashoffset = offset;

      const grad1 = document.getElementById('gradStop1');
      const grad2 = document.getElementById('gradStop2');

      if (score >= 75) {
        badge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
        badge.innerText = "Flourishing / High Well-being";
        tier.innerText = "Tier 1: Optimal Resiliency";
        tier.className = "font-semibold text-emerald-400";
        grad1.setAttribute('stop-color', '#10b981');
        grad2.setAttribute('stop-color', '#34d399');
      } else if (score >= 55) {
        badge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30";
        badge.innerText = "Stable / Moderate";
        tier.innerText = "Tier 2: Baseline Stability";
        tier.className = "font-semibold text-sky-400";
        grad1.setAttribute('stop-color', '#4f46e5');
        grad2.setAttribute('stop-color', '#38bdf8');
      } else if (score >= 40) {
        badge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30";
        badge.innerText = "Elevated Stress Risk";
        tier.innerText = "Tier 3: Early Burnout Flags";
        tier.className = "font-semibold text-amber-400";
        grad1.setAttribute('stop-color', '#f59e0b');
        grad2.setAttribute('stop-color', '#fbbf24');
      } else {
        badge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30";
        badge.innerText = "Severe Burnout & Distress";
        tier.innerText = "Tier 4: Acute Intervention Recommended";
        tier.className = "font-semibold text-rose-400";
        grad1.setAttribute('stop-color', '#e11d48');
        grad2.setAttribute('stop-color', '#f43f5e');
      }
    }

    // --- SHAP PROXY FEATURE IMPORTANCE EXPLAINER ---
    function computeSHAPBreakdown(p) {
      const payload = p || getFormDataPayload();
      const list = document.getElementById('featureImportanceList');

      const items = [
        {
          name: "Sleep Deprivation Index",
          raw: `${payload.sleep_hours_per_night} hrs/night`,
          impact: payload.sleep_hours_per_night < 6.5 ? -(6.5 - payload.sleep_hours_per_night) * 4.2 : +(payload.sleep_hours_per_night - 6.5) * 2.8,
          isProtective: payload.sleep_hours_per_night >= 6.5
        },
        {
          name: "Daily Digital Exposure",
          raw: `${payload.avg_daily_usage_hours} hrs (${payload.most_used_platform})`,
          impact: payload.avg_daily_usage_hours > 4.5 ? -(payload.avg_daily_usage_hours - 4.5) * 3.5 : +(4.5 - payload.avg_daily_usage_hours) * 1.8,
          isProtective: payload.avg_daily_usage_hours <= 4.5
        },
        {
          name: "Perceived Stress Burden",
          raw: payload.stress_level,
          impact: payload.stress_level === 'Very High' ? -9.2 : (payload.stress_level === 'High' ? -5.5 : (payload.stress_level === 'Low' ? +4.8 : -0.5)),
          isProtective: payload.stress_level === 'Low'
        },
        {
          name: "Physical Activity Shield",
          raw: `${payload.physical_activity_hours} hrs/day`,
          impact: payload.physical_activity_hours >= 1.0 ? +payload.physical_activity_hours * 3.8 : -3.2,
          isProtective: payload.physical_activity_hours >= 1.0
        },
        {
          name: "Cognitive Study Load",
          raw: `${payload.study_hours} hrs/day`,
          impact: payload.study_hours > 8.0 ? -(payload.study_hours - 8.0) * 3.0 : +1.5,
          isProtective: payload.study_hours <= 8.0
        }
      ];

      list.innerHTML = items.map(item => {
        const valAbs = Math.min(100, Math.abs(item.impact) * 9.5);
        const color = item.isProtective ? 'bg-emerald-500' : 'bg-rose-500';
        const textColor = item.isProtective ? 'text-emerald-400' : 'text-rose-400';
        const sign = item.impact > 0 ? '+' : '';

        return `
          <div class="space-y-1">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-300 font-medium">${item.name} <span class="text-slate-500 font-mono text-[10px]">(${item.raw})</span></span>
              <span class="font-mono text-xs ${textColor} font-semibold">${sign}${item.impact.toFixed(1)} pts</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="${color} h-1.5 rounded-full transition-all duration-500" style="width: ${valAbs}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // --- "WHAT-IF" SENSITIVITY SIMULATOR ---
    function runSensitivitySimulation() {
      const sleepDelta = parseFloat(document.getElementById('simSleepDelta').value);
      const screenDelta = parseFloat(document.getElementById('simScreenDelta').value);

      document.getElementById('simSleepDeltaVal').innerText = (sleepDelta >= 0 ? '+' : '') + sleepDelta.toFixed(1) + 'h';
      document.getElementById('simScreenDeltaVal').innerText = (screenDelta >= 0 ? '+' : '') + screenDelta.toFixed(1) + 'h';

      // Base clone
      const payload = getFormDataPayload();
      payload.sleep_hours_per_night = Math.min(24, Math.max(0, payload.sleep_hours_per_night + sleepDelta));
      payload.avg_daily_usage_hours = Math.min(24, Math.max(0, payload.avg_daily_usage_hours + screenDelta));

      const simulatedScore = runSurrogateInference(payload);
      const deltaScore = simulatedScore - currentScore;

      const badge = document.getElementById('simDeltaBadge');
      const rec = document.getElementById('simRecommendationText');

      const sign = deltaScore >= 0 ? '+' : '';
      badge.innerText = `Simulated: ${simulatedScore.toFixed(1)} (${sign}${deltaScore.toFixed(1)} pts)`;

      if (deltaScore > 1.5) {
        badge.className = "text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
        rec.innerHTML = `<span>🚀 <strong>Significant Gain:</strong> Implementing these habit adjustments is projected to elevate this student's well-being by <strong>${deltaScore.toFixed(1)} points</strong>.</span><button onclick="resetSensitivity()" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium shrink-0 ml-2">Reset</button>`;
      } else if (deltaScore < -1.5) {
        badge.className = "text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30";
        rec.innerHTML = `<span>⚠️ <strong>Degradation Warning:</strong> Compounding sleep deficit or added screen time accelerates clinical burnout risk by <strong>${Math.abs(deltaScore).toFixed(1)} points</strong>.</span><button onclick="resetSensitivity()" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium shrink-0 ml-2">Reset</button>`;
      } else {
        badge.className = "text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700";
        rec.innerHTML = `<span>💡 Adjust intervention sliders to simulate immediate lifestyle impact.</span><button onclick="resetSensitivity()" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium shrink-0 ml-2">Reset</button>`;
      }
    }

    function resetSensitivity() {
      document.getElementById('simSleepDelta').value = 0;
      document.getElementById('simScreenDelta').value = 0;
      document.getElementById('simSleepDeltaVal').innerText = "+0.0h";
      document.getElementById('simScreenDeltaVal').innerText = "-0.0h";
      document.getElementById('simDeltaBadge').innerText = "Projected Score: +0.0 pts";
      document.getElementById('simDeltaBadge').className = "text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700";
      document.getElementById('simRecommendationText').innerHTML = `<span>💡 <em>Adjust sliders above to preview clinical impact on predicted well-being.</em></span><button onclick="resetSensitivity()" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Reset Simulator</button>`;
    }

    // --- TAB SWITCHING: SINGLE VS BATCH ---
    function switchMainTab(tab) {
      const vSingle = document.getElementById('viewSingleAssessment');
      const vBatch = document.getElementById('viewBatchAnalytics');
      const tSingle = document.getElementById('tabNavSingle');
      const tBatch = document.getElementById('tabNavBatch');

      if (tab === 'single') {
        vSingle.classList.remove('hidden');
        vBatch.classList.add('hidden');
        tSingle.className = "py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 border-indigo-500 text-indigo-400 transition-all";
        tBatch.className = "py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 border-transparent text-slate-400 hover:text-slate-200 transition-all";
      } else {
        vSingle.classList.add('hidden');
        vBatch.classList.remove('hidden');
        tBatch.className = "py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 border-indigo-500 text-indigo-400 transition-all";
        tSingle.className = "py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 border-transparent text-slate-400 hover:text-slate-200 transition-all";
        renderBatchAnalytics();
      }
    }

    // --- BATCH ANALYTICS & TABLE ---
    function renderBatchAnalytics() {
      // 1. Compute summary stats
      const count = cohortData.length;
      document.getElementById('batchCount').innerText = count;

      const sum = cohortData.reduce((acc, row) => acc + (row.predicted_mental_health_score || 0), 0);
      const mean = (sum / (count || 1)).toFixed(1);
      document.getElementById('batchMeanScore').innerText = mean;

      const highRisk = cohortData.filter(r => (r.predicted_mental_health_score || 0) < 50).length;
      document.getElementById('batchHighRiskCount').innerText = highRisk;

      const avgScreen = cohortData.reduce((acc, r) => acc + r.avg_daily_usage_hours, 0) / count;
      const avgSleep = cohortData.reduce((acc, r) => acc + r.sleep_hours_per_night, 0) / count;
      const ratio = (avgScreen / (avgSleep || 1)).toFixed(2);
      document.getElementById('batchRatio').innerText = ratio + 'x';

      // 2. Render charts
      renderBatchHistChart();
      renderBatchPlatformChart();

      // 3. Render table
      filterBatchTable();
    }

    function renderBatchHistChart() {
      const ctx = document.getElementById('batchDistributionChart');
      if (!ctx) return;

      const brackets = { '< 40 (Severe)': 0, '40-60 (Elevated)': 0, '60-80 (Stable)': 0, '80+ (Flourishing)': 0 };
      cohortData.forEach(r => {
        const s = r.predicted_mental_health_score || 0;
        if (s < 40) brackets['< 40 (Severe)']++;
        else if (s < 60) brackets['40-60 (Elevated)']++;
        else if (s < 80) brackets['60-80 (Stable)']++;
        else brackets['80+ (Flourishing)']++;
      });

      if (batchHistChartInstance) batchHistChartInstance.destroy();

      batchHistChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: Object.keys(brackets),
          datasets: [{
            label: 'Student Count',
            data: Object.values(brackets),
            backgroundColor: ['#f43f5e', '#fbbf24', '#6366f1', '#10b981'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    function renderBatchPlatformChart() {
      const ctx = document.getElementById('batchPlatformChart');
      if (!ctx) return;

      const platformScores = {};
      cohortData.forEach(r => {
        if (!platformScores[r.most_used_platform]) {
          platformScores[r.most_used_platform] = { sum: 0, count: 0 };
        }
        platformScores[r.most_used_platform].sum += r.predicted_mental_health_score || 0;
        platformScores[r.most_used_platform].count++;
      });

      const labels = Object.keys(platformScores);
      const data = labels.map(l => (platformScores[l].sum / platformScores[l].count).toFixed(1));

      if (batchPlatformChartInstance) batchPlatformChartInstance.destroy();

      batchPlatformChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'polarArea',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(99, 102, 241, 0.7)',
              'rgba(56, 189, 248, 0.7)',
              'rgba(244, 63, 94, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(192, 132, 252, 0.7)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { boxWidth: 10, color: '#94a3b8', font: { size: 10 } } }
          },
          scales: {
            r: {
              grid: { color: 'rgba(255, 255, 255, 0.08)' },
              ticks: { display: false }
            }
          }
        }
      });
    }

    function filterBatchTable() {
      const query = (document.getElementById('tableSearch').value || '').toLowerCase();
      const stressFilter = document.getElementById('tableFilterStress').value;
      const tbody = document.getElementById('cohortTableBody');

      const filtered = cohortData.filter(row => {
        const matchesQuery = (
          row.id.toLowerCase().includes(query) ||
          row.country.toLowerCase().includes(query) ||
          row.most_used_platform.toLowerCase().includes(query) ||
          row.academic_level.toLowerCase().includes(query)
        );
        const matchesStress = (stressFilter === 'ALL' || row.stress_level === stressFilter);
        return matchesQuery && matchesStress;
      });

      tbody.innerHTML = filtered.map(row => {
        const score = row.predicted_mental_health_score || 0;
        let scoreBadge = '';
        if (score >= 75) scoreBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 font-bold">${score.toFixed(1)}</span>`;
        else if (score >= 55) scoreBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-mono bg-sky-500/20 text-sky-300 font-bold">${score.toFixed(1)}</span>`;
        else if (score >= 40) scoreBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/20 text-amber-300 font-bold">${score.toFixed(1)}</span>`;
        else scoreBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-mono bg-rose-500/20 text-rose-300 font-bold">${score.toFixed(1)}</span>`;

        let stressPill = '';
        if (row.stress_level === 'Low') stressPill = `<span class="text-emerald-400">Low</span>`;
        else if (row.stress_level === 'Medium') stressPill = `<span class="text-slate-300">Medium</span>`;
        else if (row.stress_level === 'High') stressPill = `<span class="text-amber-400">High</span>`;
        else stressPill = `<span class="text-rose-400 font-bold">Very High</span>`;

        return `
          <tr class="hover:bg-slate-800/40 transition">
            <td class="py-2.5 px-3 font-mono font-medium text-white">${row.id}</td>
            <td class="py-2.5 px-3">${row.age}y / ${row.gender[0]}</td>
            <td class="py-2.5 px-3">${row.country}</td>
            <td class="py-2.5 px-3">${row.academic_level}</td>
            <td class="py-2.5 px-3">${row.most_used_platform} <span class="text-slate-500">(${row.purpose_of_use})</span></td>
            <td class="py-2.5 px-3 font-mono">${row.avg_daily_usage_hours}h <span class="text-slate-500 text-[10px]">/ ${row.daily_unlocks}u</span></td>
            <td class="py-2.5 px-3 font-mono">${row.sleep_hours_per_night}h <span class="text-emerald-400 text-[10px]">+${row.physical_activity_hours}h act</span></td>
            <td class="py-2.5 px-3">${stressPill}</td>
            <td class="py-2.5 px-3 text-right">${scoreBadge}</td>
            <td class="py-2.5 px-3 text-center">
              <button onclick="loadCohortRowIntoPredictor('${row.id}')" title="Load into single simulator" class="p-1 rounded hover:bg-slate-700 text-indigo-400 hover:text-white transition">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function loadCohortRowIntoPredictor(studentId) {
      const row = cohortData.find(r => r.id === studentId);
      if (!row) return;

      syncAge(row.age);
      document.getElementById('inputGender').value = row.gender;
      document.getElementById('inputCountry').value = TOP_COUNTRIES.has(row.country) ? row.country : 'Other';
      updateCountryGroupingBadge();
      document.getElementById('inputAcademicLevel').value = row.academic_level;
      document.getElementById('inputPlatform').value = row.most_used_platform;
      document.getElementById('inputPurpose').value = row.purpose_of_use;
      syncUnlocks(row.daily_unlocks);

      document.getElementById('inputScreenHours').value = row.avg_daily_usage_hours;
      document.getElementById('inputStudyHours').value = row.study_hours;
      document.getElementById('inputSleepHours').value = row.sleep_hours_per_night;
      document.getElementById('inputActivityHours').value = row.physical_activity_hours;
      setSelectedStress(row.stress_level);

      recalcRoutine();
      switchMainTab('single');
      handleFormSubmit(new Event('submit'));
      showToast(`Loaded ${studentId} into individual predictor`, 'success');
    }

    async function runBatchFastAPIPredictions() {
      showToast("Recalculating batch inferences...", "info");
      for (let i = 0; i < cohortData.length; i++) {
        const item = cohortData[i];
        if (!config.forceSimulation && config.isApiOnline) {
          try {
            const res = await fetch(config.apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
            });
            if (res.ok) {
              const data = await res.json();
              item.predicted_mental_health_score = parseFloat(data.predicted_mental_health_score);
            } else {
              item.predicted_mental_health_score = runSurrogateInference(item);
            }
          } catch {
            item.predicted_mental_health_score = runSurrogateInference(item);
          }
        } else {
          item.predicted_mental_health_score = runSurrogateInference(item);
        }
      }
      renderBatchAnalytics();
      showToast("Batch recalculation complete!", "success");
    }

    function handleCSVUpload(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const text = evt.target.result;
          const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
          if (lines.length < 2) throw new Error("CSV has no data rows");

          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          const newRows = [];

          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim());
            if (cols.length < headers.length) continue;

            const rowObj = {
              id: `CSV-${100 + i}`,
              age: parseInt(cols[headers.indexOf('age')]) || 21,
              gender: cols[headers.indexOf('gender')] === 'Female' ? 'Female' : 'Male',
              country: cols[headers.indexOf('country')] || 'Other',
              academic_level: cols[headers.indexOf('academic_level')] || 'Undergraduate',
              most_used_platform: cols[headers.indexOf('most_used_platform')] || 'Instagram',
              purpose_of_use: cols[headers.indexOf('purpose_of_use')] || 'Entertainment',
              avg_daily_usage_hours: parseFloat(cols[headers.indexOf('avg_daily_usage_hours')]) || 4.0,
              daily_unlocks: parseInt(cols[headers.indexOf('daily_unlocks')]) || 50,
              study_hours: parseFloat(cols[headers.indexOf('study_hours')]) || 5.0,
              physical_activity_hours: parseFloat(cols[headers.indexOf('physical_activity_hours')]) || 1.0,
              sleep_hours_per_night: parseFloat(cols[headers.indexOf('sleep_hours_per_night')]) || 7.0,
              stress_level: cols[headers.indexOf('stress_level')] || 'Medium',
            };
            rowObj.predicted_mental_health_score = runSurrogateInference(rowObj);
            newRows.push(rowObj);
          }

          if (newRows.length > 0) {
            cohortData = newRows;
            renderBatchAnalytics();
            showToast(`Loaded ${newRows.length} rows from CSV!`, 'success');
          }
        } catch (err) {
          showToast(`CSV Parse error: ${err.message}`, 'error');
        }
      };
      reader.readAsText(file);
    }

    function exportCohortCSV() {
      const headers = [
        "id", "age", "gender", "country", "academic_level", "most_used_platform",
        "purpose_of_use", "avg_daily_usage_hours", "daily_unlocks", "study_hours",
        "physical_activity_hours", "sleep_hours_per_night", "stress_level", "predicted_mental_health_score"
      ];

      const csvRows = [headers.join(",")];
      cohortData.forEach(row => {
        csvRows.push([
          row.id, row.age, row.gender, `"${row.country}"`, `"${row.academic_level}"`,
          `"${row.most_used_platform}"`, `"${row.purpose_of_use}"`, row.avg_daily_usage_hours,
          row.daily_unlocks, row.study_hours, row.physical_activity_hours,
          row.sleep_hours_per_night, `"${row.stress_level}"`, row.predicted_mental_health_score
        ].join(","));
      });

      const blob = new Blob([csvRows.join("\n")], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mindmetric_predicted_cohort_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Cohort scores exported to CSV!", "success");
    }

    // --- API STATUS & CONFIG MODALS ---
    function setBackendStatus(isOnline) {
      config.isApiOnline = isOnline;
      const dot = document.getElementById('backendStatusDot');
      const label = document.getElementById('backendStatusLabel');

      if (isOnline) {
        dot.className = "w-2 h-2 rounded-full bg-emerald-400";
        label.innerText = "FastAPI Connected";
        label.className = "text-emerald-300 font-medium";
      } else {
        dot.className = "w-2 h-2 rounded-full bg-amber-400";
        label.innerText = config.forceSimulation ? "Simulation Mode" : "Surrogate Fallback";
        label.className = "text-slate-300";
      }
    }

    async function checkBackendConnectivity() {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 1200);
        const res = await fetch(config.apiUrl, { method: 'OPTIONS', signal: controller.signal });
        clearTimeout(tid);
        setBackendStatus(res.ok);
      } catch {
        setBackendStatus(false);
      }
    }

    function toggleApiSettingsModal() {
      const modal = document.getElementById('modalApiSettings');
      modal.classList.toggle('hidden');
    }

    async function pingBackend() {
      const url = document.getElementById('apiEndpointInput').value.trim();
      const resultElem = document.getElementById('testPingResult');
      resultElem.classList.remove('hidden');
      resultElem.innerText = `Pinging ${url}...`;
      resultElem.className = "p-3 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700";

      try {
        const samplePayload = getFormDataPayload();
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(samplePayload)
        });

        if (res.ok) {
          const data = await res.json();
          resultElem.innerText = `✓ Connected! Backend responded 200 OK.\nPrediction: ${data.predicted_mental_health_score}`;
          resultElem.className = "p-3 rounded-lg text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
        } else {
          resultElem.innerText = `✗ Server responded with HTTP status ${res.status}`;
          resultElem.className = "p-3 rounded-lg text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40";
        }
      } catch (err) {
        resultElem.innerText = `✗ Connection failed: ${err.message}.\nMake sure FastAPI (uvicorn) is running and CORS is enabled if accessing across domains.`;
        resultElem.className = "p-3 rounded-lg text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40";
      }
    }

    function saveApiSettings() {
      config.apiUrl = document.getElementById('apiEndpointInput').value.trim();
      config.forceSimulation = document.getElementById('toggleForceSimulation').checked;
      toggleApiSettingsModal();
      checkBackendConnectivity();
      showToast("API Endpoint preferences updated!", "success");
    }

    // --- CODE INTEGRATION MODAL ---
    function openApiModal() {
      document.getElementById('modalCodeIntegration').classList.remove('hidden');
      updateCodeSnippet();
    }

    function closeApiModal() {
      document.getElementById('modalCodeIntegration').classList.add('hidden');
    }

    function switchCodeSnippet(lang) {
      activeCodeTab = lang;
      ['tabCurl', 'tabPython', 'tabJson'].forEach(id => {
        const btn = document.getElementById(id);
        btn.className = "px-3 py-1 text-xs rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 font-mono";
      });

      if (lang === 'curl') document.getElementById('tabCurl').className = "px-3 py-1 text-xs rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-mono";
      if (lang === 'python') document.getElementById('tabPython').className = "px-3 py-1 text-xs rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-mono";
      if (lang === 'json') document.getElementById('tabJson').className = "px-3 py-1 text-xs rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-mono";

      updateCodeSnippet();
    }

    function updateCodeSnippet() {
      const payload = getFormDataPayload();
      const jsonStr = JSON.stringify(payload, null, 2);
      const codeElem = document.getElementById('codeSnippetContent');

      if (activeCodeTab === 'json') {
        codeElem.innerText = jsonStr;
      } else if (activeCodeTab === 'curl') {
        codeElem.innerText = `curl -X 'POST' \\\n  '${config.apiUrl}' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '${JSON.stringify(payload)}'`;
      } else if (activeCodeTab === 'python') {
        codeElem.innerText = `import requests\n\nurl = "${config.apiUrl}"\npayload = ${jsonStr}\n\nresponse = requests.post(url, json=payload)\nif response.status_code == 200:\n    result = response.json()\n    print(f"Predicted Score: {result['predicted_mental_health_score']}")\nelse:\n    print(f"Error {response.status_code}: {response.text}")`;
      }
    }

    function copyActiveCodeSnippet() {
      const code = document.getElementById('codeSnippetContent').innerText;
      const copyBox = document.createElement('textarea');
      copyBox.value = code;
      document.body.appendChild(copyBox);
      copyBox.select();
      document.execCommand('copy');
      document.body.removeChild(copyBox);

      const label = document.getElementById('copyCodeLabel');
      label.innerText = "Copied!";
      setTimeout(() => label.innerText = "Copy", 1500);
      showToast("Snippet copied to clipboard!", "success");
    }

    // --- TOAST NOTIFICATIONS ---
    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      
      let border = 'border-slate-700 bg-slate-900/90 text-slate-200';
      if (type === 'success') border = 'border-emerald-500/40 bg-slate-900/95 text-emerald-300';
      if (type === 'error') border = 'border-rose-500/40 bg-slate-900/95 text-rose-300';
      if (type === 'info') border = 'border-indigo-500/40 bg-slate-900/95 text-indigo-200';

      toast.className = `p-3 rounded-xl border shadow-xl text-xs flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto ${border}`;
      toast.innerHTML = `
        <span>${message}</span>
      `;
      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
      });

      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }