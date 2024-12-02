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

// Define the racial and subrace modifiers
const raceModifiers = {
    human: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1,statchoice: false},
    elf: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0, statchoice: false },
    dwarf: { strength: 0, dexterity: 0, constitution: 2, intelligence: 0, wisdom: 0, charisma: 0, statchoice: false },
    halfling: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0, statchoice: false },
    tiefling: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2, statchoice: false },
    halfelf: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2, statchoice:true, bonus1: 1, bonus2: 1},
    aarakocra: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 1, charisma: 0, statchoice: false },

};

const subraceModifiers = {
    "high-elf": { intelligence: 1 },
    "wood-elf": { wisdom: 1 },
    "hill-dwarf": { wisdom: 1 },
    "mountain-dwarf": { strength: 2 }
};

// Function to apply racial and subrace modifiers, including custom bonuses
function applyRaceModifiers(attributes, race, subrace = null) {
    // Apply race-specific modifiers
    if (raceModifiers[race]) {
        Object.keys(raceModifiers[race]).forEach(stat => {
            attributes[stat] += raceModifiers[race][stat];
        });
    }

    // Apply subrace-specific modifiers, if applicable
    if (subrace && subraceModifiers[subrace]) {
        Object.keys(subraceModifiers[subrace]).forEach(stat => {
            attributes[stat] += subraceModifiers[subrace][stat];
        });
    }

    // Handle custom bonuses for races with stat choices (e.g., Half-Elf)
    if (raceModifiers[race]?.statchoice) {
        const bonus1 = document.getElementById("bonus1").value;
        const bonus2 = document.getElementById("bonus2").value;

        // Check if the attributes already have racial bonuses
        if (bonus1 && raceModifiers[race][bonus1] === 0) {
            attributes[bonus1] += 1; // Apply bonus1
        }

        if (bonus2 && bonus2 !== bonus1 && raceModifiers[race][bonus2] === 0) {
            attributes[bonus2] += 1; // Apply bonus2
        }
    }

    return attributes;
}


// Show or hide the custom bonuses dropdowns
function toggleCustomBonuses(race) {
    const customBonusesDiv = document.getElementById("statchoice");
    if (raceModifiers[race]?.statchoice) {
        customBonusesDiv.style.display = "block"; 
    } else {
        customBonusesDiv.style.display = "none"; 
        document.getElementById("bonus1").value = "";
        document.getElementById("bonus2").value = "";
    }
}


// Event listener for race selection to handle custom bonuses
document.getElementById("race").addEventListener("change", function () {
    const selectedRace = this.value;
    updateSubraceOptions();
    toggleCustomBonuses(selectedRace);
});
document.getElementById("bonus1").addEventListener("change", function () {
    const bonus2 = document.getElementById("bonus2");
    const selected = this.value;

    // Remove the selected option from the other dropdown
    Array.from(bonus2.options).forEach(option => {
        option.disabled = option.value === selected;
    });
});

document.getElementById("bonus2").addEventListener("change", function () {
    const bonus1 = document.getElementById("bonus1");
    const selected = this.value;

    // Remove the selected option from the other dropdown
    Array.from(bonus1.options).forEach(option => {
        option.disabled = option.value === selected;
    });
});
function calculateFinalAttributes() {
    const race = document.getElementById("race").value;
    if (race === "stat-choice") {
        const bonus1 = document.getElementById("bonus1").value;
        const bonus2 = document.getElementById("bonus2").value;

        if (!bonus1 || !bonus2 || bonus1 === bonus2) {
            alert("Please select two distinct stats for the racial bonuses.");
            return;
        }
    }

}


// Subrace options for each race
const subraceOptions = {
    elf: [
        { value: "high-elf", label: "High Elf" },
        { value: "wood-elf", label: "Wood Elf" }
    ],
    dwarf: [
        { value: "hill-dwarf", label: "Hill Dwarf" },
        { value: "mountain-dwarf", label: "Mountain Dwarf" }
    ],
    human: [],
    halfling: [],
    tiefling: []
};

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

// Function to apply racial and subrace modifiers
function applyRaceModifiers(attributes, race, subrace = null) {
    if (raceModifiers[race]) {
        Object.keys(raceModifiers[race]).forEach(stat => {
            attributes[stat] += raceModifiers[race][stat];
        });
    }

    if (subrace && subraceModifiers[subrace]) {
        Object.keys(subraceModifiers[subrace]).forEach(stat => {
            attributes[stat] += subraceModifiers[subrace][stat];
        });
    }

    return attributes;
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

// Function to update subrace options based on the selected race
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

// Function to show race and subrace details
function showDetails(race, subrace) {
    // Dynamically pull the description from the descriptions.js file
    let raceDescriptionText = window[`${race}_race`] || 'No description available.';
    let subraceDescriptionText = subrace ? window[`${subrace}_subrace`] || 'No description available.' : '';

    const detailsContent = document.getElementById('details-content');
    detailsContent.innerHTML = `
        <h2>Race: ${race.charAt(0).toUpperCase() + race.slice(1)}</h2>
        <p>${raceDescriptionText}</p>
        ${subrace ? `<h3>Subrace: ${subrace.charAt(0).toUpperCase() + subrace.slice(1)}</h3><p>${subraceDescriptionText}</p>` : ''}
    `;
}


// Event listeners
document.getElementById('calculate-btn').addEventListener('click', calculateFinalAttributes);

// Attach event listener for each input to trigger point-buy updates dynamically
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('input', updatePointBuy);  // Trigger point buy update
});

// Event listener for race selection to update subrace options
document.getElementById('race').addEventListener('change', updateSubraceOptions);

// Initialize the subrace options and the point-buy system when the page loads
updateSubraceOptions();
updatePointBuy();
