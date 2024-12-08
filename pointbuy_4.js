// Point buy cost table
const pointCost = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9
};

// Define the racial modifiers
const raceModifiers = {
    human: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1, statchoice: false },
    elf: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0, statchoice: false },
    dwarf: { strength: 0, dexterity: 0, constitution: 2, intelligence: 0, wisdom: 0, charisma: 0, statchoice: false },
    halfling: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0, statchoice: false },
    tiefling: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2, statchoice: false },
    halfelf: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2, statchoice: true },
    dragonborn: { strength: 2, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 1, statchoice: false },
    gnome: { strength: 0, dexterity: 0, constitution: 0, intelligence: 2, wisdom: 0, charisma: 0, statchoice: false },
    halforc: { strength: 2, dexterity: 0, constitution: 1, intelligence: 0, wisdom: 0, charisma: 0, statchoice: false },
};

// Define the subrace modifiers
const subraceModifiers = {
    "high-elf": { intelligence: 1 },
    "wood-elf": { wisdom: 1 },
    "drow-elf": { charisma: 1 },
    "hill-dwarf": { wisdom: 1 },
    "mountain-dwarf": { strength: 2 },
    "lightfoot-halfling": { charisma: 1 },
    "stout-halfling": { constitution: 1 },
    "asmodeus-tiefling": { intelligence: 1 },
    "baalzebul-tiefling": { intelligence: 1 },
    "dispater-tiefling": { dexterity: 1 },
    "fierna-tiefling": { wisdom: 1 },
    "glasya-tiefling": { dexterity: 1 },
    "levistus-tiefling": { constitution: 1 },
    "mammon-tiefling": { intelligence: 1 },
    "mephistopheles-tiefling": { intelligence: 1 },
    "zariel-tiefling": { strength: 1 },
    "forest-gnome": { dexterity: 1 },
    "rock-gnome": { constitution: 1 }
};

// Subrace options for each race
const subraceOptions = {
    elf: [
        { value: "high-elf", label: "High Elf" },
        { value: "wood-elf", label: "Wood Elf" },
        { value: "drow-elf", label: "Drow Elf" }
    ],
    dwarf: [
        { value: "hill-dwarf", label: "Hill Dwarf" },
        { value: "mountain-dwarf", label: "Mountain Dwarf" }
    ],
    human: [
        { value: "none", label: "None" }
    ],
    halfling: [
        { value: "lightfoot-halfling", label: "Lightfoot Halfling" },
        { value: "stout-halfling", label: "Stout Halfling" }
    ],
    tiefling: [
        { value: "asmodeus-tiefling", label: "Asmodeus Tiefling" },
        { value: "baalzebul-tiefling", label: "Baalzebul Tiefling" },
        { value: "dispater-tiefling", label: "Dispater Tiefling" },
        { value: "fierna-tiefling", label: "Fierna Tiefling" },
        { value: "glasya-tiefling", label: "Glasya Tiefling" },
        { value: "levistus-tiefling", label: "Levistus Tiefling" },
        { value: "mammon-tiefling", label: "Mammon Tiefling" },
        { value: "mephistopheles-tiefling", label: "Mephistopheles Tiefling" },
        { value: "zariel-tiefling", label: "Zariel Tiefling" }
    ],
    dragonborn: [
        { value: "black-dragonborn", label: "Black Dragonborn" },
        { value: "blue-dragonborn", label: "Blue Dragonborn" },
        { value: "brass-dragonborn", label: "Brass Dragonborn" },
        { value: "bronze-dragonborn", label: "Bronze Dragonborn" },
        { value: "copper-dragonborn", label: "Copper Dragonborn" },
        { value: "gold-dragonborn", label: "Gold Dragonborn" },
        { value: "green-dragonborn", label: "Green Dragonborn" },
        { value: "red-dragonborn", label: "Red Dragonborn" },
        { value: "silver-dragonborn", label: "Silver Dragonborn" },
        { value: "white-dragonborn", label: "White Dragonborn" }
    ],
    halforc: [
        { value: "none", label: "None" }
    ],
    halfelf: [
        { value: "none", label: "None" }
    ],
    gnome: [
        { value: "forest-gnome", label: "Forest Gnome" }, 
        { value: "rock-gnome", label: "Rock Gnome" }
    ]
};

// Function to apply racial and subrace modifiers
function applyRaceModifiers(attributes, race, subrace = null) {
    if (raceModifiers[race]) {
        Object.keys(raceModifiers[race]).forEach(stat => {
            if (stat !== "statchoice") attributes[stat] += raceModifiers[race][stat];
        });
    }

    if (subrace && subraceModifiers[subrace]) {
        Object.keys(subraceModifiers[subrace]).forEach(stat => {
            attributes[stat] += subraceModifiers[subrace][stat];
        });
    }

    if (raceModifiers[race]?.statchoice) {
        const bonus1 = document.getElementById("bonus1").value;
        const bonus2 = document.getElementById("bonus2").value;

        if (bonus1 && bonus2 && bonus1 !== bonus2) {
            attributes[bonus1] += 1;
            attributes[bonus2] += 1;
        } else {
            alert("Please select two distinct stats for the racial bonuses.");
        }
    }

    return attributes;
}

// Function to disable the Calculate button if "Select a Race" is chosen
function updateCalculateButtonState() {
    const raceSelect = document.getElementById('race');
    const calculateButton = document.getElementById('calculate-btn');
    calculateButton.disabled = raceSelect.value === "selectrace";
}

// Event listener for race selection to disable the calculate button if "Select a Race" is chosen
document.getElementById('race').addEventListener('change', () => {
    updateSubraceOptions();
    toggleCustomBonuses();
    updateCalculateButtonState();  // Update button state on race change
});

// Update subrace options based on the selected race
function updateSubraceOptions() {
    const race = document.getElementById('race').value;
    const subraceSelect = document.getElementById('subrace');
    
    subraceSelect.innerHTML = '';

    subraceOptions[race].forEach(subrace => {
        const option = document.createElement('option');
        option.value = subrace.value;
        option.textContent = subrace.label;
        subraceSelect.appendChild(option);
    });

    if (subraceOptions[race].length === 0) {
        subraceSelect.innerHTML = '<option value="">None</option>';
    }
}

// Function to calculate total cost and remaining points dynamically
function updatePointBuy() {
    let totalCost = 0;
    let remainingPoints = 27;  // Starting points

    const attributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    let attributeValues = {};

    attributes.forEach(attribute => {
        let value = parseInt(document.getElementById(attribute).value);
        if (isNaN(value) || value < 8) value = 8;
        if (value > 15) value = 15;

        attributeValues[attribute] = value;
        totalCost += pointCost[value];  // Add the cost based on the input value
    });

    remainingPoints = 27 - totalCost;

    document.getElementById('remainingPoints').innerText = remainingPoints;
    document.getElementById('totalCost').innerText = totalCost;

    // Update the input values in the UI with the adjusted values
    Object.keys(attributeValues).forEach(attr => {
        document.getElementById(attr).value = attributeValues[attr];
    });
}

// Function to calculate final attributes
function calculateFinalAttributes() {
    let totalCost = 0;
    let remainingPoints = 27;
    let attributeValues = {};

    const attributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

    attributes.forEach(attribute => {
        let value = parseInt(document.getElementById(attribute).value);
        if (isNaN(value) || value < 8 || value > 15) {
            return;
        }
        attributeValues[attribute] = value;
        totalCost += pointCost[value];
    });

    remainingPoints = 27 - totalCost;

    const race = document.getElementById('race').value;
    const subrace = document.getElementById('subrace').value;
    attributeValues = applyRaceModifiers(attributeValues, race, subrace);

    const finalAttributesList = document.getElementById('final-attributes');
    finalAttributesList.innerHTML = '';
    Object.keys(attributeValues).forEach(attr => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${attr.charAt(0).toUpperCase() + attr.slice(1)}:</strong> ${attributeValues[attr]}`;
        finalAttributesList.appendChild(li);
    });
    finalAttributesList.style.display = 'block';

    showDetails(race, subrace);
}

// Function to show race and subrace details
function showDetails(race, subrace) {
    const raceDescription = window.raceDescriptions[race] || "No description available for this race.";
    const subraceDescription = subrace ? window.subraceDescriptions[subrace] || "No description available for this subrace." : "";

    const detailsContent = document.getElementById('details-content');
    detailsContent.innerHTML = `
        <h2>Race: ${race.charAt(0).toUpperCase() + race.slice(1)}</h2>
        <p>${raceDescription}</p>
        ${subrace ? `<h3>Subrace: ${subrace.charAt(0).toUpperCase() + subrace.slice(1)}</h3><p>${subraceDescription}</p>` : ''}
    `;
}

// Event listeners
document.getElementById('calculate-btn').addEventListener('click', () => {
    const raceSelect = document.getElementById('race').value;
    if (raceSelect === "selectrace") {
        return;  // Do nothing if "Select a Race" is chosen
    }
    calculateFinalAttributes();  // Call the original calculation function
});

// Attach event listener for each input to trigger point-buy updates dynamically
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('input', updatePointBuy);  // Trigger point buy update
});

// Event listener for race selection to update subrace options
document.getElementById('race').addEventListener('change', () => {
    updateSubraceOptions();
    toggleCustomBonuses();
});

// Show or hide the custom bonuses dropdowns
function toggleCustomBonuses(selectedRace) {
    const customBonusesDiv = document.getElementById("statchoice");

    if (selectedRace === "halfelf") {
        customBonusesDiv.style.display = "block"; // Show for Half-Elf
    } else {
        customBonusesDiv.style.display = "none"; // Hide for all other races
    }
}

// Event listener for race selection to handle custom bonuses
document.getElementById("race").addEventListener("change", function () {
    const selectedRace = this.value;
    updateSubraceOptions();
    toggleCustomBonuses(selectedRace);  // Ensure this is correctly handled
});

document.getElementById("bonus2").addEventListener("change", function () {
    const bonus1 = document.getElementById("bonus1");
    if (this.value === bonus1.value) {
        alert("Please select two different stats.");
        this.value = "";
    }
});
