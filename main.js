import { barplot, lineplot } from "./src/plot.js";

// Get reference to the plot UI element
const plotDiv = document.getElementById("plot");

// Get reference to the file input
const fileInput = document.getElementById("fileInput");

// get input parameters
const frequencyInput = document.getElementById("frequency");
const phaseInput = document.getElementById("phase");
const dampingInput = document.getElementById("damping");
const plotType = document.getElementById("oscillation");

document.getElementById("firingbutton").addEventListener("click", clickHandler);

// Setup handler for file upload
// This will be called when the input value changes
fileInput.onchange = () => {
    // Display loading indicator
    plotDiv.ariaBusy = "true";

    // Parse input file
    Papa.parse(fileInput.files[0], {
        complete: result => {
            processData(result.data);
        },
        // Convert to numbers instead of the default strings
        dynamicTyping: true
    });
}

function clickHandler() {
    plotDiv.ariaBusy = 'true';

    processParameters(frequencyInput, phaseInput, dampingInput, plotType);
}


/**
 * Function for processing data in Python (pyodide)
 * Needs to be asyncronous to use "await"
 * @param {number[]} data Data to plot
 */
async function processData(data) {
    // Setup pyodide
    let pyodide = await loadPyodide();

    // Load numpy
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('numpy');

    // Set data variables in python global scope
    const xs = data.map(v => v[0]);
    const ys = data.map(v => v[1]);
    pyodide.globals.set("xs", xs);
    pyodide.globals.set("ys", ys);

    // Actually run some python
    pyodide.runPython(`
        import numpy as np
        total = np.array(xs) + np.array(ys)
    `);

    // Extract the result
    const total = pyodide.globals.get('total').toJs();

    // Vega-lite needs this format for the data, so we convert
    // the 1D array into a list of {x, y} objects.
    const outputData = [...total].map((v, i) => ({
        x: i,
        y: v
    }));

    // Plot output data with vega-lite
    boxplot(outputData);

    // Remove loading indicator
    plotDiv.ariaBusy = "false";
}

async function processParameters(freq, phi, damp, oscillation) {
    // Setup pyodide
    let pyodide = await loadPyodide();

    // Load numpy
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('numpy');

    // Set data variables in python global scope
    const frequency = freq;
    const phase = phi;
    const damping_coefficient = damp;
    const plotType = oscillation;
    pyodide.globals.set("frequency", frequency.valueAsNumber);
    pyodide.globals.set("phase_shift", phase.valueAsNumber);
    pyodide.globals.set("damping_coefficient", damping_coefficient.valueAsNumber);
    pyodide.globals.set("plotType", plotType.value);

    // Actually run some python
    pyodide.runPython(`
        import numpy as np
        time = np.linspace(0, 10, 1000)

        try:
            if plotType == "Normal oscillation":
                trajectory = np.cos(frequency*time - phase_shift)
            elif plotType == "Damped oscillation":
                damped_frequency = np.emath.sqrt(damping_coefficient**2 - frequency**2)
                trajectory = np.exp(-damping_coefficient*time)*(np.exp(damped_frequency*time - phase_shift) + np.exp(-damped_frequency*time - phase_shift))
        except:
            raiseValue("Need to specify a type of plot!")
    `);

    // Extract the result
    const time = pyodide.globals.get('time').toJs();
    const position = pyodide.globals.get('trajectory').toJs();

    // Vega-lite needs this format for the data, so we convert
    // the 1D array into a list of {x, y} objects.
    const outputData = [...position].map((v, i) => ({
        x: Number(time[i]),
        y: Number(v)
    }));

    // Plot output data with vega-lite
    lineplot(outputData);

    // Remove loading indicator
    plotDiv.ariaBusy = "false";
}