import define1 from "./2622cb8a5f7e3697@1115.js";
import define2 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["related_posts_interns_keywords_21_released_dates.csv",new URL("./files/e7009d5205fc674ca38a785fb2515a4e6408acb78d9016869db6e59c5fae2134a7fb0810e571f93101ade6b6f3760ccf8ceaadf673a817e33fcebe1d277ac79d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Network Graph
Network graph of recent visualizations from [NASA's SVS Database](https://svs.gsfc.nasa.gov/), with links between related visualizations.`
)});
  main.variable(observer("dat")).define("dat", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("related_posts_interns_keywords_21_released_dates.csv").text(), d3.autoType))
)});
  main.variable(observer("dc")).define("dc", ["dat"], function(dat){return(
dat.columns.slice(3)
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3)
{
  //color code by category
  const scale=d3.scaleOrdinal(d3.schemeCategory10)
  return d=>scale(d.group)
}
);
  main.variable(observer("cols")).define("cols", function(){return(
["Earth","Universe","Planets and Moons","Sun","Other","Hybrid"]
)});
  main.variable(observer("getCol")).define("getCol", ["cols"], function(cols){return(
num=>cols[num]
)});
  main.variable(observer("startdate")).define("startdate", ["start"], function(start){return(
new Date(start)
)});
  main.variable(observer("enddate")).define("enddate", ["end"], function(end){return(
new Date(end)
)});
  const child1 = runtime.module(define1);
  main.import("getDataNetwork", child1);
  main.import("decodeHTML", child1);
  main.variable(observer("datas")).define("datas", ["getDataNetwork","startdate","enddate","dat"], function(getDataNetwork,startdate,enddate,dat){return(
getDataNetwork(startdate,enddate,dat)
)});
  main.variable(observer("height")).define("height", function(){return(
1000
)});
  main.variable(observer("drag")).define("drag", ["d3"], function(d3){return(
(simulation)=>{
  //how nodes behave when being dragged in start, during, and finish
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx=event.subject.x;
    event.subject.fy=event.subject.y;
  }
  
  function dragged(event){
    event.subject.fx=event.x;
    event.subject.fy=event.y;
  }
  
  function dragended(event){
    if (!event.active) simulation.alphaTarget(0).restart();
    event.subject.fx=null;
    event.subject.fy=null;
  }
  
  return d3.drag()
    .on("start", dragstarted)
    .on("drag",dragged)
    .on("end",dragended);
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child2 = runtime.module(define2);
  main.import("date", child2);
  main.variable(observer("viewof start")).define("viewof start", ["date"], function(date){return(
date({
  title: "Starting date", 
  min: "1990-01-01",
  max: "2021-12-31",
  value: "2019-07-01",
  description: ""
})
)});
  main.variable(observer("start")).define("start", ["Generators", "viewof start"], (G, _) => G.input(_));
  main.variable(observer("viewof end")).define("viewof end", ["date"], function(date){return(
date({
  title: "Ending date", 
  min: "1990-01-01",
  max: "2021-12-31",
  value: "2021-07-01",
  description: ""
})
)});
  main.variable(observer("end")).define("end", ["Generators", "viewof end"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`You can view any visuals with no connections below:`
)});
  main.variable(observer("viewof disconnected")).define("viewof disconnected", ["chart","decodeHTML","getCol","html"], function(chart,decodeHTML,getCol,html)
{
  //dropdown of all disconnected nodes
  let arr=chart[1];
  let details=[];
  for (var i=0;i<arr.length;i++){
    details.push("Title: "+((arr[i].title.trim()==="")?"No title found":decodeHTML(arr[i].title.trim()))+" - Category: "+getCol(arr[i].group));
  }
  return html`<select>${details.map((val,i) => `
  <option value=${"https://svs.gsfc.nasa.gov/"+arr[i].id}>${val}</option>`).join("")}
  </select>`;
}
);
  main.variable(observer("disconnected")).define("disconnected", ["Generators", "viewof disconnected"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","disconnected"], function(md,disconnected){return(
md`Here's your <a href=${disconnected} target="_blank" rel="noopener noreferrer">link</a>. Have fun!`
)});
  main.variable(observer()).define(["chart"], function(chart){return(
chart[0]
)});
  main.variable(observer("chart")).define("chart", ["networkchart","datas"], function(networkchart,datas){return(
networkchart(datas)
)});
  main.variable(observer("networkchart")).define("networkchart", ["d3","width","height","color","drag","getCol","decodeHTML","invalidation"], function(d3,width,height,color,drag,getCol,decodeHTML,invalidation){return(
function networkchart(data){
  //outputs network graph and disconnected nodes
  
  const connectednodes=data.nodes.filter((val)=>connected(val));
  const disconnectednodes=data.nodes.filter((val)=>!(connected(val)));
  
  const nodes=connectednodes.map(d=>Object.create(d));
  const index= new Map(nodes.map(d=>[d.id,d]));
  const links=data.links.map(d=>Object.assign(Object.create(d),{
    source: index.get(d.a_id1),
    target: index.get(d.a_id2)
  }));  
  
  const simulation=d3.forceSimulation(nodes)
    //make force simulation so it stays in a circle
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX())
    .force("y", d3.forceY());
  
  const svg=d3.create("svg")
    .attr("viewBox", [-width/2,-height/2,width,height]);
  
  const subgraphWidth = width/2.5;
  const subgraphHeight = -height/2;

  const subgraph = svg.append("g")
    .attr("id", "subgraph")
    .attr("transform", `translate(${subgraphWidth}, ${subgraphHeight})`);
    
  subgraph.append("text")
      .style("font-size","16px")
      .attr("text-anchor","end");

   const link=svg.append("g")
    .attr("stroke","#999")
    .attr("stroke-opacity",0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => 1);

  const node=svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5) 
    .attr("fill", color) 
    .call(drag(simulation));

  node.on("click",(event,d)=>{
    //displays link of visual in subgraph region
      var targetnode=nodes[d.index];
      subgraph.selectAll("text")
        .html("Link: "+getLink(targetnode))
        .attr("dy",14)
        .attr("dx",14);
    })

  node.append("title")
    .text(d=>(d.title.trim()==="")?("Category: "+getCol(d.group)):(decodeHTML(d.title.trim())+"\nCategory: "+getCol(d.group)));
 
  simulation.on("tick",() => {
    link
      .attr("x1", d=>d.source.x)
      .attr("y1", d=>d.source.y)
      .attr("x2", d=>d.target.x)
      .attr("y2", d=>d.target.y);
    node 
      .attr("cx", d=>d.x)
      .attr("cy", d=>d.y)
    });

  function getLink(d){
    //html for clickable link of the visualization you clicked on
    return "<a href=\"https://svs.gsfc.nasa.gov/"+d.id+"\" target=\"_blank\" rel=\"noopener noreferrer\">"+((d.title.trim()==="")?"No title found":decodeHTML(d.title.trim()))+"</a>"
  }

  function connected(node){
    //determines if a node is connected or not
    for (var i=0;i<data.links.length;i++){
      if (data.links[i].a_id1==node.id||data.links[i].a_id2==node.id){
        return true;
      }
    }
    return false;
  }

  invalidation.then(() => simulation.stop());
  return [svg.node(),disconnectednodes];
}
)});
  return main;
}
