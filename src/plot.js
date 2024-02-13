function barplot(data) {
    // Assign the specification to a local variable vlSpec.
    const vlSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: {values: data},
        width: 'container', height: 250,
        mark: 'bar',
        encoding: {
            y: {
                field: 'y',
                type: 'quantitative',
                axis: {title: "Sum of CSV values"}
            },
            x: {
                field: 'x',
                type: 'nominal',
                axis: {title: "CSV row"}
            },
            color: {field: "y", axis: {title: "CSV row"}},
            tooltip: [
                {field: 'y', type: 'quantitative'}
            ],
        }
    };

    // Embed the visualization in the container with id "plot"
    vegaEmbed('#plot', vlSpec);
}

function lineplot(data) {
    // Assign the specification to a local variable vlSpec.
    const vlSpec = {
        // background: "grey90",
         // view: {"fill": "grey"},
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        data: {values: data},
        width: 'container', height: 250,
        mark: {type: "line", color: "red"},
        encoding: {
            x: {
                field: "x",
                type: "quantitative", 
                axis: {title: "Time"}},
            y: {
                field: "y",
                type: "quantitative",
                axis: {title: "Position"}},
        }
    };

    // Embed the visualization in the container with id "plot"
    vegaEmbed('#plot', vlSpec);
};

    



export {barplot, lineplot}