// Подсветка текущего пункта меню
document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.dataset.page;
    var link = document.getElementById("nav-" + page);
    if (link) link.classList.add("active");

    // Фильтр игр по жанру
    var filter = document.getElementById("genre-filter");
    if (filter) {
        filter.addEventListener("change", function () {
            var genre = filter.value;
            var cards = document.querySelectorAll(".game-card");
            var shown = 0;
            cards.forEach(function (card) {
                var ok = genre === "all" || card.dataset.genre === genre;
                card.style.display = ok ? "" : "none";
                if (ok) shown++;
            });
            document.getElementById("games-count").textContent = "Найдено игр: " + shown;
        });
    }

    // Калькулятор стоимости
    var calcBtn = document.getElementById("calc-btn");
    if (calcBtn) {
        calcBtn.addEventListener("click", function () {
            var price = Number(document.getElementById("tariff").value);
            var hours = Number(document.getElementById("hours").value);
            var out = document.getElementById("calc-total");
            if (!hours || hours < 1 || hours > 12) {
                out.textContent = "Укажите от 1 до 12 часов";
                return;
            }
            out.textContent = "Итого: " + price * hours + " ₽";
        });
    }

    // Форма бронирования (учебная, данные никуда не отправляются)
    var form = document.getElementById("booking-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = document.getElementById("name").value.trim();
            var phone = document.getElementById("phone").value.replace(/[\s()-]/g, "");
            var error = document.getElementById("form-error");

            if (name === "") {
                error.textContent = "Введите имя";
                return;
            }
            if (!/^(\+7|8)\d{10}$/.test(phone)) {
                error.textContent = "Введите телефон в формате +7XXXXXXXXXX";
                return;
            }
            error.textContent = "";
            form.classList.add("hidden");
            document.getElementById("success-name").textContent = name;
            document.getElementById("booking-success").classList.remove("hidden");
        });
    }
});
