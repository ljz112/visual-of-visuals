import define1 from "./2622cb8a5f7e3697@1115.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["related_posts_interns_keywords_21_released_dates.csv",new URL("./files/e7009d5205fc674ca38a785fb2515a4e6408acb78d9016869db6e59c5fae2134a7fb0810e571f93101ade6b6f3760ccf8ceaadf673a817e33fcebe1d277ac79d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Sunburst
Distribution of categories and keywords over all of the entries in [NASA's SVS Database](https://svs.gsfc.nasa.gov/).`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("getDataHierarchy", child1);
  main.import("found", child1);
  main.variable(observer("dat")).define("dat", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("related_posts_interns_keywords_21_released_dates.csv").text(), d3.autoType))
)});
  main.variable(observer("datas")).define("datas", ["getDataHierarchy","dat","possiblekwd"], function(getDataHierarchy,dat,possiblekwd){return(
getDataHierarchy(dat,possiblekwd)
)});
  const child2 = runtime.module(define1);
  main.import("searchResultsSimple", child2);
  main.variable(observer("searchResults")).define("searchResults", ["searchResultsSimple","kwd","datas"], function(searchResultsSimple,kwd,datas){return(
searchResultsSimple(kwd,datas)
)});
  main.variable(observer("width")).define("width", function(){return(
932
)});
  main.variable(observer("radius")).define("radius", ["width"], function(width){return(
width/6
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(".2%")
)});
  main.variable(observer("fontfamily")).define("fontfamily", function(){return(
"sans-serif"
)});
  main.variable(observer("arc")).define("arc", ["d3","radius"], function(d3,radius){return(
d3.arc()
  //creates arc for each data slice
  .startAngle(d=>d.x0)
  .endAngle(d=>d.x1)
  .padAngle(d=>Math.min((d.x1-d.x0)/2,0.005))
  .padRadius(radius*1.5)
  .innerRadius(d=>d.y0*radius)
  .outerRadius(d=>Math.max(d.y0*radius,d.y1*radius-1))
)});
  main.variable(observer("partition")).define("partition", ["d3"], function(d3){return(
data => {
  //makes hierarchical structure of data, includes locations on sunburst
  const root=d3.hierarchy(data)
    .sum(d=>d.value)
    .sort((a,b)=>b.value-a.value);
  return d3.partition()
    .size([2*Math.PI, root.height+1])
    (root);
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`If you want choose a keyword value you want to filter the sunburst and get links:`
)});
  main.variable(observer("viewof possiblekwd")).define("viewof possiblekwd", ["html"], function(html){return(
html`<input type=text value=""}>`
)});
  main.variable(observer("possiblekwd")).define("possiblekwd", ["Generators", "viewof possiblekwd"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Search for a keyword in the sunburst here:`
)});
  main.variable(observer("viewof kwd")).define("viewof kwd", ["html"], function(html){return(
html`<input type=text value=""}>`
)});
  main.variable(observer("kwd")).define("kwd", ["Generators", "viewof kwd"], (G, _) => G.input(_));
  main.variable(observer()).define(["searchResults"], function(searchResults){return(
searchResults
)});
  main.variable(observer("chart")).define("chart", ["sunburstchart","datas","possiblekwd"], function(sunburstchart,datas,possiblekwd){return(
sunburstchart(datas,possiblekwd)
)});
  main.variable(observer("sunburstchart")).define("sunburstchart", ["d3","partition","width","arc","format","fontfamily","radius"], function(d3,partition,width,arc,format,fontfamily,radius){return(
function sunburstchart(data,kwd){
  //make the sunburst chart
  
  let color=d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow,data.children.length+1));
  
  const root=partition(data);

  root.each(d=>d.current=d);
  
  const svg=d3.create("svg")
    .attr("viewBox",[0,0,width,width]);

  const g=svg.append("g")
    .attr("transform",`translate(${width/2},${width/2})`);
    
  const path=g.append("g")
    //each individual slice of sunburst
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
      .attr("fill", d => {while (d.depth>1) d=d.parent; return color(d.data.name);})
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("d", d => arc(d.current));

  path.filter(d=>d.children)
    .style("cursor","pointer")
    .on("click",clicked);

  path.append("title")
    //what you see if you hover on top of a slice
    .text(d=>`${d.ancestors().map(d=>d.data.name).reverse().join("/")}\n${format(d.value/d.parent.value)}`); 

  const label =g.append("g")
    //labels for each slice
      .attr("text-anchor","middle") 
      .style("user-select","none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
      .attr("dy","0.35em")
      .attr("fill-opacity", d=>+labelVisible(d.current))
      .attr("transform",d=>labelTransform(d.current))
      .attr("pointer-events", d=>(!(d.children)&&kwd)?"all":"none") 
      .style("font", d=>adjustSize(d.data.name,10)+"px "+fontfamily)
      .html(d=>(!(d.children)&&kwd)?(allTheLinks(d.data.ids,d.data.name)):(d.data.name));

  const parent=g.append("circle")
    //the circle in the middle you can use to zoom out
    .datum(root)
    .attr("r", radius)
    .attr("fill","none") 
    .attr("pointer-events","all")
    .on("click",clicked);

  function arcVisible(d) {
    //can you see the arc
    return d.y1 <= 3 && d.y0 >=1 && d.x1>d.x0
  }

  function labelVisible(d){
    //can you see the label or is it too crammed?
    return d.y1 <= 3 && d.y0 >=1 && (d.y1-d.y0)*(d.x1-d.x0)>0.03;
  }

  function labelTransform(d){
    //where to put the labels and how to rotate them
    const x=(d.x0+d.x1)/2*180/Math.PI;
    const y=(d.y0+d.y1)/2*radius; 
    return `rotate(${x-90}) translate(${y},0) rotate(${x<180?0:180})`;
  }

  function allTheLinks(ids,title){
    //adds the title and clickable link onto the sunburst
    if (kwd){
      var code="<a href=\"https://svs.gsfc.nasa.gov/"+ids+"\" target=\"_blank\" rel=\"noopener noreferrer\">"+((title.trim()==="")?"No title found":title.trim())+"</a>";
    }
    return code;
  }
  
  function clicked(event,p){
    //transition of zooming into/out to new level
    if (arcVisible(p.current)||p.current.y0==0){
      parent.datum(p.parent || root)
      root.each(d=>d.target = {
        x0: Math.max(0,Math.min(1,(d.x0 -p.x0)/(p.x1-p.x0)))*2*Math.PI,
        x1: Math.max(0,Math.min(1,(d.x1 -p.x0)/(p.x1-p.x0)))*2*Math.PI,
        y0:Math.max(0,d.y0-p.depth),
        y1:Math.max(0,d.y1-p.depth)
      });
    const t= g.transition().duration(750);
    path.transition(t)
        .tween("data",d=>{
          const i=d3.interpolate(d.current,d.target)
          return t=>d.current=i(t);
        })
        .filter(function(d){
          return +this.getAttribute("fill-opacity")||arcVisible(d.target);
        })
          .attr("fill-opacity",d=>arcVisible(d.target)?(d.children?0.6:0.4):0)
          .attrTween("d",d=>()=>arc(d.current));
    label.filter(function(d) {
      return +this.getAttribute("fill-opacity")||labelVisible(d.target);
    }).transition(t)
      .attr("fill-opacity", d=>+labelVisible(d.target))
      .attrTween("transform",d=>()=>labelTransform(d.current));
    }
  }

  function adjustSize(text,size){
    //if the font is too big for the text, adjust it so it isn't anymore
    let font=size+"px "+fontfamily;
    let limit=radius;
    if (getWidth(text,font)<=limit){
      return size;
    } else {
      let fontsize=size;
      while (fontsize>1&&getWidth(text,font)>limit){
        fontsize-=1;
        font=fontsize+"px "+fontfamily;
      }
      return fontsize;
    }
  }

  function getWidth(text,font){
    //check for width of text at its current font size
    let canvas = adjustSize.canvas || (adjustSize.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
  }
  
  return svg.node();
}
)});
  return main;
}
