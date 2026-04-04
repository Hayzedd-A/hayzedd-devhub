document.addEventListener("DOMContentLoaded", function () {
  const stepsContainer = document.getElementById("quote-steps-container");
  const progressBar = document.getElementById("quote-progress");
  const prevBtn = document.getElementById("prev-step");
  const nextBtn = document.getElementById("next-step");
  const submitBtn = document.getElementById("submit-quote");

  let currentStep = 0;
  const answers = {};

  // Note: 'questionnaire' is expected to be available globally from info.js
  if (typeof questionnaire === "undefined") {
    console.error("Questionnaire not found. Make sure info.js is loaded.");
    stepsContainer.innerHTML =
      '<div class="alert alert-danger">Error loading questionnaire. Please refresh the page.</div>';
    return;
  }

  function renderStep(stepIndex) {
    const stepData = questionnaire[stepIndex];
    const isLastStep = stepIndex === questionnaire.length - 1;

    let optionsHtml = "";
    if (stepData.optType === "multi" || stepData.optType === "single") {
      optionsHtml = `<div class="option-grid">
        ${stepData.options
          .map(
            (opt, idx) => `
          <div class="option-card ${
            answers[stepIndex] &&
            (Array.isArray(answers[stepIndex])
              ? answers[stepIndex].includes(opt)
              : answers[stepIndex] === opt)
              ? "selected"
              : ""
          }" data-value="${opt}">
            <i class="lni ${getIconForOption(opt)}"></i>
            <span>${opt}</span>
          </div>
        `,
          )
          .join("")}
      </div>`;
    } else if (stepData.optType === "text") {
      optionsHtml = `
        <div class="mt-4">
          <textarea class="form-control quote-text-input" placeholder="${
            stepData.placeholder || "Enter your answer here..."
          }">${answers[stepIndex] || ""}</textarea>
        </div>
      `;
    } else if (stepData.optType === "fullname") {
      optionsHtml = `
        <div class="mt-4">
          <input type="text" id="fullname" class="form-control quote-text-input" placeholder="${
            stepData.placeholder || "Enter your full name..."
          }" value="${answers[stepIndex] || ""}">
        </div>
      `;
    } else if (stepData.optType === "email") {
      optionsHtml = `
        <div class="mt-4">
          <input type="email" id="email" class="form-control quote-text-input" placeholder="${
            stepData.placeholder || "Enter your email..."
          }" value="${answers[stepIndex] || ""}">
        </div>
      `;
    } else if (stepData.optType === "phone") {
      optionsHtml = `
        <div class="mt-4">
          <input type="text" id="phone" class="form-control quote-text-input" placeholder="${
            stepData.placeholder || "Enter your phone number..."
          }" value="${answers[stepIndex] || ""}">
        </div>
      `;
    }

    stepsContainer.innerHTML = `
      <div class="quote-step">
        <h3 class="question-title">${stepData.question}</h3>
        <p class="question-subtitle">${
          stepData.optType === "multi"
            ? "Pick all that apply"
            : stepData.optType === "single"
              ? "Choose one option"
              : stepData.optType === "text"
                ? "Share some details"
                : stepData.optType === "fullname"
                  ? "Enter your full name"
                  : stepData.optType === "email"
                    ? "Enter your email"
                    : stepData.optType === "phone"
                      ? "Enter your phone number"
                      : "Share some details"
        }</p>
        ${stepData.optType === "email" ? "<p class='skip-hint'>We'll use this email to contact you about your project.</p>" : "<p class='skip-hint'>Feel free to skip this if you're not sure yet.</p>"}
        ${optionsHtml}
      </div>
    `;

    // Update Progress
    const progress = ((stepIndex + 1) / questionnaire.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);

    // Update Navigation
    prevBtn.style.display = stepIndex === 0 ? "none" : "block";
    if (isLastStep) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "block";
      skipBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
      submitBtn.style.display = "none";
      skipBtn.style.display = "block";
    }

    // Add Event Listeners for options
    if (stepData.optType === "multi" || stepData.optType === "single") {
      const cards = stepsContainer.querySelectorAll(".option-card");
      cards.forEach((card) => {
        card.addEventListener("click", function () {
          const value = this.getAttribute("data-value");
          if (stepData.optType === "single") {
            // Remove selection from others
            cards.forEach((c) => c.classList.remove("selected"));
            this.classList.add("selected");
            answers[stepIndex] = value;
          } else {
            // Toggle selection
            this.classList.toggle("selected");
            if (!answers[stepIndex]) answers[stepIndex] = [];
            const index = answers[stepIndex].indexOf(value);
            if (index > -1) {
              answers[stepIndex].splice(index, 1);
            } else {
              answers[stepIndex].push(value);
            }
          }
        });
      });
    } else if (
      ["text", "fullname", "email", "phone"].includes(stepData.optType)
    ) {
      const input = stepsContainer.querySelector("input, textarea");
      if (input) {
        input.addEventListener("input", function () {
          answers[stepIndex] = this.value;
        });
      }
    }
  }

  function getIconForOption(option) {
    const lower = option.toLowerCase();
    if (lower.includes("web")) return "lni-website";
    if (lower.includes("mobile") || lower.includes("app")) return "lni-mobile";
    if (lower.includes("api") || lower.includes("backend"))
      return "lni-database";
    if (lower.includes("design") || lower.includes("ui")) return "lni-brush";
    if (lower.includes("ai") || lower.includes("automation"))
      return "lni-layers";
    if (lower.includes("idea")) return "lni-bulb";
    if (lower.includes("planning")) return "lni-pencil-alt";
    if (lower.includes("yes")) return "lni-checkmark-circle";
    if (lower.includes("no")) return "lni-close";
    if (lower.includes("android")) return "lni-android";
    if (lower.includes("ios") || lower.includes("apple")) return "lni-apple";
    if (lower.includes("react") || lower.includes("next"))
      return "lni-code-alt";
    if (lower.includes("node") || lower.includes("express"))
      return "lni-jsfiddle";
    if (
      lower.includes("database") ||
      lower.includes("mongo") ||
      lower.includes("sql")
    )
      return "lni-database";
    if (lower.includes("auth")) return "lni-lock";
    if (lower.includes("payment")) return "lni-credit-cards";
    if (lower.includes("admin")) return "lni-dashboard";
    if (lower.includes("chat") || lower.includes("real-time"))
      return "lni-comments";
    if (lower.includes("budget") || lower.includes("₦")) return "lni-revenue";
    if (
      lower.includes("time") ||
      lower.includes("week") ||
      lower.includes("month")
    )
      return "lni-timer";
    if (lower.includes("support")) return "lni-support";
    if (lower.includes("hosting")) return "lni-cloud-network";
    if (lower.includes("seo")) return "lni-search";
    if (lower.includes("name")) return "lni-user";
    if (lower.includes("email")) return "lni-envelope";
    if (lower.includes("phone") || lower.includes("whatsapp"))
      return "lni-whatsapp";
    return "lni-chevron-right-circle";
  }

  function validateCurrentStep() {
    const stepData = questionnaire[currentStep];
    const answer = answers[currentStep];

    if (stepData.optType === "multi") {
      // Validation relaxed as per user request to not enforce choices
      return true;
    } else if (stepData.optType === "single") {
      return true;
    } else if (stepData.optType === "text") {
      return true;
    }
    return true;
  }

  const skipBtn = document.getElementById("skip-step");
  skipBtn.addEventListener("click", function () {
    currentStep++;
    renderStep(currentStep);
    window.scrollTo({
      top: document.getElementById("get-a-quote").offsetTop - 100,
      behavior: "smooth",
    });
  });

  nextBtn.addEventListener("click", function () {
    if (validateCurrentStep()) {
      currentStep++;
      renderStep(currentStep);
      window.scrollTo({
        top: document.getElementById("get-a-quote").offsetTop - 100,
        behavior: "smooth",
      });
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep--;
      renderStep(currentStep);
    }
  });

  submitBtn.addEventListener("click", async function () {
    if (!validateCurrentStep()) return;

    this.disabled = true;
    this.innerHTML =
      'Submitting... <div class="spinner-border spinner-border-sm ms-2" role="status"></div>';

    // Format payload using keys from questionnaire
    const payload = {
      timestamp: new Date().toISOString(),
    };

    questionnaire.forEach((q, idx) => {
      const key = q.key || `question_${idx}`;
      // answers[idx] might be undefined if skipped, handle gracefully
      payload[key] =
        answers[idx] !== undefined
          ? answers[idx]
          : q.optType === "multi"
            ? []
            : "";
    });

    try {
      const response = await fetch(
        "https://hayzedd-the-developer.vercel.app/api/questionary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        stepsContainer.innerHTML = `
          <div class="text-center py-5 quote-step">
            <div class="mb-4">
              <i class="lni lni-checkmark-circle text-success" style="font-size: 80px;"></i>
            </div>
            <h2 class="fw-bold mb-3">Request Received!</h2>
            <p class="text-muted">Thank you for sharing your project details. I'll review your information and get back to you within 12 hours.</p>
            <button class="btn primary-btn mt-4 px-5" onclick="location.reload()">Fill Again</button>
          </div>
        `;
        // Hide navigation
        prevBtn.style.display = "none";
        submitBtn.style.display = "none";
        nextBtn.style.display = "none";
        progressBar.style.width = "100%";
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error(error);
      alert(
        "There was an error submitting your request. Please try again or contact me directly via email.",
      );
      this.disabled = false;
      this.innerHTML = 'Submit Request <i class="lni lni-checkmark ms-2"></i>';
    }
  });

  // Initial render
  renderStep(currentStep);
});
