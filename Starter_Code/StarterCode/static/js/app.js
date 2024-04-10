let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

function dropdownmenu(){
d3.json(url).then((data) => {

console.log(data)
let selector = d3.select("#selDataset");
    let sampleNames = data.names
            
    sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
    table(sampleNames[0])
    charts(sampleNames[0])
})
}
dropdownmenu()



function optionChanged(chosen_id){

    table(chosen_id)
    charts(chosen_id)


}

function table(chosen_id){
    d3.json(url).then((data) => {
    
    console.log(data)
    let selector = d3.select("#sample-metadata");
        let metadata = data.metadata
        let newArray = metadata.filter(number => number.id == chosen_id)[0];
        console.log(newArray)
selector.html("")
        Object.entries(newArray).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            selector
            .append("h6")
            .text(`${key}: ${value}`)

          });
        
    
    })
    }


    function charts(chosen_id){
        d3.json(url).then((data) => {
        
        
            let sampledata = data.samples
            let newArray = sampledata.filter(number => number.id == chosen_id)[0];
            let otu_ids = newArray.otu_ids
            let sample_values = newArray.sample_values
            let otu_labels = newArray.otu_labels  
            var bubbledata =[ {
                x:otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                  color:otu_ids, 
                 
                  size: sample_values
                }
              }];
              
            
              
              var bubblelayout = {
                title: 'Bubble Chart',
                showlegend: false,
               
              };
              
              Plotly.newPlot('bubble', bubbledata, bubblelayout);
              var bardata =[ {
                x: sample_values.slice(0,10).reverse(),
                y: otu_ids.map(otu =>`otu ${otu}`).slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                orientation: 'h',
               
                type: 'bar'
              }];
              
             
              
              var barlayout = {
                title: 'Bar Chart',
              
              };
              
              Plotly.newPlot('bar', bardata, barlayout);
                
        
        })
        }


        