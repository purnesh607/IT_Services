document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const backendURL = "https://it-services-cvhw.onrender.com";

    try {
        const response = await fetch(`${backendURL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        } else {
            alert("Error sending message. Please try again later.");
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("Network error. Please check your connection.");
    }
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
});
