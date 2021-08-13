import define1 from "./2622cb8a5f7e3697@1115.js";
import define2 from "./a33468b95d0b15b0@703.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["related_posts_interns_keywords_21_released_dates.csv",new URL("./files/e7009d5205fc674ca38a785fb2515a4e6408acb78d9016869db6e59c5fae2134a7fb0810e571f93101ade6b6f3760ccf8ceaadf673a817e33fcebe1d277ac79d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Streamgraph
Change in distribution of categories for entries in [NASA's SVS Database](https://svs.gsfc.nasa.gov) over time.`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("getDataStreamgraph", child1);
  main.variable(observer("datas")).define("datas", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("related_posts_interns_keywords_21_released_dates.csv").text(), d3.autoType), {y: "Magnitude"})
)});
  main.variable(observer("dat")).define("dat", ["getDataStreamgraph","datas","changePlanetary","categories"], function(getDataStreamgraph,datas,changePlanetary,categories){return(
getDataStreamgraph(datas,changePlanetary(categories))
)});
  main.variable(observer("cols")).define("cols", function(){return(
["Earth","Universe","Planets and Moons","Sun","Other","Hybrid"]
)});
  main.variable(observer("changePlanetary")).define("changePlanetary", function(){return(
function changePlanetary(cols){
  //only changes the planets and moons checkbox to planetary, more readable in data functions
  for (let i=0;i<cols.length;i++){
    if (cols[i]==="Planets and Moons"){
      cols[i]="Planetary";
      return cols;
    }
  }
  return cols;
}
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top:0,bottom:30,right:20,left:20}
)});
  const child2 = runtime.module(define2);
  main.import("swatches", child2);
  main.variable(observer("viewof categories")).define("viewof categories", ["Inputs","cols"], function(Inputs,cols){return(
Inputs.checkbox(cols, {value: cols,label: "Categories:"})
)});
  main.variable(observer("categories")).define("categories", ["Generators", "viewof categories"], (G, _) => G.input(_));
  main.variable(observer()).define(["chart"], function(chart){return(
chart[1]
)});
  main.variable(observer()).define(["chart"], function(chart){return(
chart[0]
)});
  main.variable(observer("streamgraphchart")).define("streamgraphchart", ["d3","margin","width","height","swatches"], function(d3,margin,width,height,swatches){return(
function streamgraphchart(data){
  //returns the streamgraph and the key for it
  
  let series=d3.stack()
    //stacks all categories on top of each other
    .keys(data.columns.slice(1))
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderInsideOut)
    (data);

  let area=d3.area()
    //generates area for given data, with given x values and 2 y values 
    .x(d=>x(d.data.date))
    .y0(d=>y(d[0]))
    .y1(d=>y(d[1]));

  let x=d3.scaleUtc()
    //gets x location based on date
    .domain(d3.extent(data,d=>d.date))
    .range([margin.left,width-margin.right]);

  let y=d3.scaleLinear()
    //get y coordinate for general values
    .domain([d3.min(series,d=>d3.min(d,d=>d[0])),d3.max(series,d=>d3.max(d,d=>d[1]))])
    .range([height-margin.bottom,margin.top]);

  let xAxis=g=>g
    //make x axis of time
    .attr("transform",`translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(0))
    .call(g=>g.select(".domain").remove());

  let color=d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    .range(d3.quantize(d3.interpolateRainbow,data.columns.slice(1).length+1))

  let key=swatches({color,marginLeft: margin.left, columns:"180px"})
  
  const svg=d3.create("svg") 
    .attr("viewBox",[0,0,width,height]);

  //plot the data
  svg.append("g")
    .selectAll("path")
    .data(series)
    .join("path")
      .attr("fill",({key})=>color(key))
      .attr("d",area)
    .append("title")
      .text(({key})=>key);

  svg.append("g")
    .call(xAxis);

  return [svg.node(),key];
}
)});
  main.variable(observer("chart")).define("chart", ["streamgraphchart","dat"], function(streamgraphchart,dat){return(
streamgraphchart(dat)
)});
  return main;
}
