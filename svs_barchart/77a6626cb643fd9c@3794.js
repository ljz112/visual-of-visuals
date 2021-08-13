import define1 from "./450051d7f1174df8@252.js";
import define2 from "./2622cb8a5f7e3697@1115.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["fiveYearDataByVis-Updated.csv",new URL("./files/970bc4dc0db70295b8b27427e8f321524465fe1657f66dc2a432f3e301d207a2d9060dc9627add6b613289843abba29c90f2a069746b793f99f1d89b2baad227",import.meta.url)],["related_posts_interns_keywords_21_released_dates.csv",new URL("./files/e7009d5205fc674ca38a785fb2515a4e6408acb78d9016869db6e59c5fae2134a7fb0810e571f93101ade6b6f3760ccf8ceaadf673a817e33fcebe1d277ac79d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Bar Chart Race with Scrubber for SVS

Forked from Mike Bostock's template. The top hits of SVS Visualizations for each month for the past 5 years. The colors are categorized by Earth, Universe, Planets and Moons, Sun, Hybrid, and Other.`
)});
  main.variable(observer("viewof keyframe")).define("viewof keyframe", ["Scrubber","keyframes","formatDate","duration"], function(Scrubber,keyframes,formatDate,duration){return(
Scrubber(keyframes, {
  format: ([date]) => formatDate(date),
  delay: duration,
  loop: false
})
)});
  main.variable(observer("keyframe")).define("keyframe", ["Generators", "viewof keyframe"], (G, _) => G.input(_));
  main.variable(observer("barchart")).define("barchart", ["d3","width","height","bars","axis","labels","ticker","invalidation","duration","x"], function(d3,width,height,bars,axis,labels,ticker,invalidation,duration,x)
{
  //make and update the barchart
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const updateBars = bars(svg);
  const updateAxis = axis(svg);
  const updateLabels = labels(svg);
  const updateTicker = ticker(svg);

  invalidation.then(() => svg.interrupt());

  return Object.assign(svg.node(), { 
    update(keyframe) {
      const transition = svg.transition()
          .duration(duration)
          .ease(d3.easeLinear);

      x.domain([0, keyframe[1][0].value]);

      updateAxis(keyframe, transition);
      updateBars(keyframe, transition);
      updateLabels(keyframe, transition);
      updateTicker(keyframe, transition);
    }
  });
}
);
  main.variable(observer("update")).define("update", ["barchart","keyframe"], function(barchart,keyframe){return(
barchart.update(keyframe)
)});
  main.variable(observer("dat")).define("dat", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("fiveYearDataByVis-Updated.csv").csv({typed: true})
)});
  main.variable(observer("data")).define("data", ["dat","getCategory"], function(dat,getCategory)
{
  //manipulates data to add category on each one (if not other) and trim name
  let d=[];
  for (let i=0;i<dat.length;i++){
    let cat=getCategory(dat[i].id);
    if (cat){
      d.push({date: dat[i].date,id: dat[i].id, name: (""+dat[i].name).trim(), value: dat[i].value, category: getCategory(dat[i].id)});
    }
  }
  return d;
}
);
  main.variable(observer("catdat")).define("catdat", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("related_posts_interns_keywords_21_released_dates.csv").text(), d3.autoType), {y: "Magnitude"})
)});
  main.variable(observer("catdatslices")).define("catdatslices", ["catdat"], function(catdat){return(
catdat.columns.slice(3)
)});
  main.variable(observer("getCategory")).define("getCategory", ["found","catdat","contains","catdatslices"], function(found,catdat,contains,catdatslices){return(
function getCategory(id){
  //gets category of each visualization given the data in dat. false of none of them/not found
  let ind=found(id,catdat);
  if (ind){
    if (contains(true,false,false,false,catdat[ind],catdatslices)){
      return "Earth";
    } else if (contains(false,true,false,false,catdat[ind],catdatslices)){
      return "Universe";
    } else if (contains(false,false,true,false,catdat[ind],catdatslices)){
      return "Planets and Moons";
    } else if (contains(false,false,false,true,catdat[ind],catdatslices)){
      return "Sun";
    } else if (contains(false,false,false,false,catdat[ind],catdatslices)){
      return false;
    } else {
      return "Hybrid";
    }
  } else {
    return false;
  }
}
)});
  main.variable(observer("duration")).define("duration", function(){return(
250
)});
  main.variable(observer("n")).define("n", function(){return(
12
)});
  main.variable(observer("names")).define("names", ["data"], function(data){return(
new Set(data.map(d=>d.name))
)});
  main.variable(observer("datevalues")).define("datevalues", ["d3","data"], function(d3,data){return(
Array.from(d3.rollup(data, ([d]) => d.value, d =>+d.date, d => d.name))
  //get values of all visualizations on specific date
  .map(([date, data]) => [new Date(date), data])
  .sort(([a], [b]) => d3.ascending(a, b))
)});
  main.variable(observer("rank")).define("rank", ["names","d3","n"], function(names,d3,n){return(
function rank(value) {
  //get name, value, and rank all sorted into order of rank 
  const data = Array.from(names, name => ({name, value: value(name)}));
  data.sort((a, b) => d3.descending(a.value, b.value));
  for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
  return data;
}
)});
  main.variable(observer("k")).define("k", function(){return(
40
)});
  main.variable(observer("keyframes")).define("keyframes", ["d3","datevalues","k","rank"], function(d3,datevalues,k,rank)
{
  //makes keyframes between years and calculates values/ranks for them
  const keyframes = [];
  let ka, a, kb, b;
  for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
      const t = i / k;
      keyframes.push([
        new Date(ka * (1 - t) + kb * t),
        rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
      ]);
    }
  }
  keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
  return keyframes;
}
);
  main.variable(observer("bars")).define("bars", ["n","color","y","x"], function(n,color,y,x){return(
function bars(svg) {
  //constructs/updates each bar of the graph (n bars)
  let bar = svg.append("g")
      .attr("fill-opacity", 0.6)
    .selectAll("rect");
  
  return ([date, data], transition) => bar = bar
    .data(data.slice(0, n), d => d.name)
    .join(
      enter => enter.append("rect")
        .attr("fill", color)
        .attr("height",y.bandwidth())
        .attr("x", x(0))
        .attr("y", y(n))
        .attr("width", d => x(d.value) - x(0)),
      update => update,
      exit => exit.transition(transition).remove()
        .attr("y", y(n))
        .attr("width", d => x(d.value) - x(0))
    )
    .call(bar => bar.transition(transition)
      .attr("y", d => y(d.rank))
      .attr("width", d => x(d.value) - x(0)));
}
)});
  main.variable(observer("labels")).define("labels", ["textfont","n","x","y","getLink","getAnchor","margin","textTween","parseNumber"], function(textfont,n,x,y,getLink,getAnchor,margin,textTween,parseNumber){return(
function labels(svg) {
  //creates/updates each label on bars (value, clickable link title)
  let label = svg.append("g")
      .style("font", textfont)
      .style("font-variant-numeric", "tabular-nums")
    .selectAll("text");

  return ([date, data], transition) => label = label
    .data(data.slice(0, n), d => d.name)
    .join(
      enter => enter.append("text")
        .attr("transform", d => `translate(${x(d.value)},${y(n)})`)
        .attr("y", y.bandwidth() / 2)
        .attr("x", -6)
        .attr("dy", "-0.25em")
        .html(d =>getLink(d.name))
        .call(text => text.append("tspan")
          .attr("fill-opacity", 0.7)
          .attr("font-weight", "normal")
          .attr("x", -6)
          .attr("dy", "1.15em")),
      update => update,
      exit => exit.transition(transition).remove()
        .attr("transform", d => `translate(${x(d.value)},${y(n)})`)
    )
    .call(bar => bar.transition(transition)
      .attr("transform", d => `translate(${(getAnchor(d,textfont)==="end")?(x(d.value)):(x(d.value)+margin.right*2)},${y(d.rank)})`)
      .attr("text-anchor", d=>getAnchor(d,textfont))
      .call(g => g.select("tspan").tween("text", function(d) {
          return textTween(parseNumber(this.textContent), d.value);
        })));
}
)});
  main.variable(observer("getAnchor")).define("getAnchor", ["getWidth","x"], function(getWidth,x){return(
function getAnchor(d,font){
  //if you can't see the title label anymore, anchor the text the other way
  if (getWidth(d.name,font)<x(d.value)){
    return "end";
  } else {
    return "start";
  }
}
)});
  main.variable(observer("getWidth")).define("getWidth", function(){return(
function getWidth(text,font){
  //get width of the text in the current font
  let canvas = document.canvas || (document.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  context.font = font;
  let metrics = context.measureText(text);
  return metrics.width;
}
)});
  main.variable(observer("textfont")).define("textfont", function(){return(
"bold 12px var(--sans-serif)"
)});
  main.variable(observer("textTween")).define("textTween", ["d3","formatNumber"], function(d3,formatNumber){return(
function textTween(a, b) {
  //interpolating between the two numbers you're going in between, for number labels
  const i = d3.interpolateNumber(a, b);
  return function(t) {
    this.textContent = formatNumber(i(t));
  };
}
)});
  main.variable(observer("parseNumber")).define("parseNumber", function(){return(
string => +string.replace(/,/g, "")
)});
  main.variable(observer("formatNumber")).define("formatNumber", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("axis")).define("axis", ["margin","d3","x","width","barSize","n","y"], function(margin,d3,x,width,barSize,n,y){return(
function axis(svg) {
  //constructs/updates the axis you see on the top of the chart
  const g = svg.append("g")
      .attr("transform", `translate(0,${margin.top})`);

  const axis = d3.axisTop(x)
      .ticks(width / 160)
      .tickSizeOuter(0)
      .tickSizeInner(-barSize * (n + y.padding()));

  return (_, transition) => {
    g.transition(transition).call(axis);
    g.select(".tick:first-of-type text").remove();
    g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
    g.select(".domain").remove();
  };
}
)});
  main.variable(observer("ticker")).define("ticker", ["barSize","width","margin","n","formatDate","keyframes"], function(barSize,width,margin,n,formatDate,keyframes){return(
function ticker(svg) {
  //constructs/updates the ticker in the lower right corner of the chart
  const now = svg.append("text")
      .style("font", `bold ${barSize}px var(--sans-serif)`)
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .attr("x", width - 6)
      .attr("y", margin.top + barSize * (n - 0.45))
      .attr("dy", "0.32em")
      .text(formatDate(keyframes[0][0]));

  return ([date], transition) => {
    transition.end().then(() => now.text(formatDate(date)));
  };
}
)});
  main.variable(observer("formatDate")).define("formatDate", ["d3"], function(d3){return(
d3.utcFormat("%b %Y")
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data)
{
  //color coded based on category
  const scale = d3.scaleOrdinal(d3.schemeTableau10);
  if (data.some(d => d.category !== undefined)) {
    const categoryByName = new Map(data.map(d => [d.name, d.category]))
    scale.domain(categoryByName.values());
    return d => scale(categoryByName.get(d.name));
  }
  return d => scale(d.name);
}
);
  main.variable(observer("x")).define("x", ["d3","margin","width"], function(d3,margin,width){return(
d3.scaleLinear([0, 1], [margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","n","margin","barSize"], function(d3,n,margin,barSize){return(
d3.scaleBand()
  //sets y coordinate for each bar
    .domain(d3.range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1)
)});
  main.variable(observer("getLink")).define("getLink", ["getid"], function(getid){return(
function getLink(title){
  //get clickable link of title in html
  let id=getid(title);
  return "<a href=\"https://svs.gsfc.nasa.gov/"+id+"\" target=\"_blank\" rel=\"noopener noreferrer\">"+title+"</a>";
}
)});
  main.variable(observer("getid")).define("getid", ["data"], function(data){return(
function getid(title){
  //given name of viz get the id of it for url
  return data.filter(d=>d.name===title)[0].id;
}
)});
  main.variable(observer("height")).define("height", ["margin","barSize","n"], function(margin,barSize,n){return(
margin.top + barSize * n + margin.bottom
)});
  main.variable(observer("barSize")).define("barSize", function(){return(
48
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 16, right: 6, bottom: 6, left: 0}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  const child2 = runtime.module(define2);
  main.import("found", child2);
  main.import("contains", child2);
  return main;
}
