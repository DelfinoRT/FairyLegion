function setDynamicTitle() {
    const titleElement = document.getElementById("title");
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[now.getMonth()];
    const currentYear = now.getFullYear();

    titleElement.innerText = `PAD Events for ${currentMonth} ${currentYear}`;
}

async function fetchEvents() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/DelfinoRT/FairyLegion/refs/heads/main/EventsSchedule.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const events = await response.json();

        let eventsContainer = document.getElementById("events");
        eventsContainer.innerHTML = ""; // Clear existing content

        if (events.length === 0) {
            eventsContainer.innerHTML = "<p>No events found.</p>";
            return;
        }

        events.forEach((event, index) => {
            let eventDateTime = getEventDateTime(event.date, event.time, event.timezone);
            let eventId = `countdown-${index}`;

            // Create event element
            let eventHTML = `
                <div class="event">
                    <p><strong>${event.event}</strong></p>
                    <p>${event.date} at ${event.time || "Unknown Time"} (${event.timezone || "Unknown Timezone"})</p>
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

    } catch (error) {
        console.error("Error fetching events:", error);
        document.getElementById("events").innerHTML = "<p>Failed to load events.</p>";
    }
}

// Convert event date, time, and timezone into a JavaScript Date object
function getEventDateTime(date, time, timezone) {
    if (!date) return null;

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
    eventDateTime.setTime(eventDateTime.getTime() + timeZoneOffset * 60 * 60 * 1000);

    return eventDateTime;
}

// Convert timezone string (e.g., "GMT+1") to numeric offset in hours
function parseTimeZoneOffset(timezone) {
    if (!timezone) return 0; // Default to GMT if not provided
    let match = timezone.match(/GMT([+-]?\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Update countdown text
function updateCountdown(eventId, eventDateTime) {
    let countdownElement = document.getElementById(eventId);
    if (!countdownElement || !eventDateTime) return;

    let now = new Date();
    let timeDiff = eventDateTime - now;

    if (timeDiff <= 0) {
        countdownElement.innerText = "This event has concluded";
        countdownElement.classList.add("passed");
    } else {
        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownElement.innerText = `${hours}h ${minutes}m ${seconds}s left`;
    }
}

// Set the dynamic title and fetch events when the page loads
setDynamicTitle();
fetchEvents();