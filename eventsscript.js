async function fetchEvents() {
    const response = await fetch("https://raw.githubusercontent.com/DelfinoRT/FairyLegion/refs/heads/main/EventsSchedule.json");
    const events = await response.json();

    let eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = ""; // Clear existing content

    events.forEach((event, index) => {
        let eventDateTime = getEventDateTime(event.date, event.time, event.timezone);
        let eventId = `countdown-${index}`;

        // Create event element
        let eventHTML = `
            <div class="event">
                <p><strong>${event.event}</strong></p>
                <p>${event.date} at ${event.time || "Unknown Time"} (${event.timezone})</p>
                <p id="${eventId}" class="countdown">Calculating...</p>
            </div>
        `;

        // Append to container
        eventsContainer.innerHTML += eventHTML;

        // Start countdown
        updateCountdown(eventId, eventDateTime);
    });

    // Update countdowns every second
    setInterval(() => {
        events.forEach((event, index) => {
            let eventDateTime = getEventDateTime(event.date, event.time, event.timezone);
            let eventId = `countdown-${index}`;
            updateCountdown(eventId, eventDateTime);
        });
    }, 1000);
}

// Convert event date, time, and timezone into a JavaScript Date object
function getEventDateTime(date, time, timezone) {
    let [day, month] = date.split(/\.|\//).map(Number);
    let eventDateTime = new Date(new Date().getFullYear(), month - 1, day);

    if (time) {
        let [hours, minutes] = time.split(":").map(Number);
        eventDateTime.setHours(hours, minutes, 0, 0);
    } else {
        eventDateTime.setHours(0, 0, 0, 0);
    }

    // Convert to the event's specified time zone
    let timeZoneOffset = parseTimeZoneOffset(timezone);
    eventDateTime.setTime(eventD
