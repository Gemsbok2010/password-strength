const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

function myFunction() {
  const password = document.querySelector(".password").value;
  if (password === "henryshen") {
    document.querySelector(".backdrop").style.display = "none";
    password = null;
  }
}

passwordInput.addEventListener("keyup", updateStrengthMeter);
updateStrengthMeter();

function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);

  console.log(weaknesses);
  let strength = 100;
  reasonsContainer.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) {
      return;
    }

    strength -= weakness.deduction;
    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  return weaknesses;
}

function lowerCaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lower case character");
}

function upperCaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "upper case character");
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers");
}

function specialCharactersWeakness(password) {
  return characterTypeWeakness(password, /[#$%!@&()]/g, "special character");
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];
  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}.`,
      deduction: 20,
    };
  }
}

function lengthWeakness(password) {
  console.log(password);
  const length = password.length;
  if (length <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}
