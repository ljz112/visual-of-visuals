// https://observablehq.com/@ljz112/svs_visuals@913
import define1 from "./a33468b95d0b15b0@703.js";
import define2 from "./e514334a3e388d3d@1306.js";
import define3 from "./0933887c3f0313c9@1520.js";
import define4 from "./a8237e0d2327f29e@509.js";
import define5 from "./c210cbaac5b4b458@839.js";
import define6 from "./77a6626cb643fd9c@3794.js";
import define7 from "./2622cb8a5f7e3697@1115.js";
import define8 from "./e93997d5089d7165@2303.js";
import define9 from "./450051d7f1174df8@252.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["related_posts_interns_keywords_21_released_dates.csv",new URL("./files/e7009d5205fc674ca38a785fb2515a4e6408acb78d9016869db6e59c5fae2134a7fb0810e571f93101ade6b6f3760ccf8ceaadf673a817e33fcebe1d277ac79d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# NASA Scientific Visualization Studio`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**A deep dive into the work of the award winning studio located in NASA Goddard Space Flight Center.**`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `_Last updated: August 13, 2021_`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `_Visualizations by [Lucas Zurbuchen](https://observablehq.com/@ljz112)_ \n
_Documentation by [Devika Elakara](https://observablehq.com/@devika-elak)_ \n 
_Mentored by [Mark Subbarao](https://observablehq.com/@marksubbarao) and Lori Perkins_`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `The [Scientific Visualization Studio (SVS)](https://svs.gsfc.nasa.gov) is located in the NASA Goddard Space Flight Center (GSFC) in Greenbelt, MD. The SVS works closely with scientists in the creation of visualizations, animations, and images in order to promote a greater understanding of Earth and Space Science research activities at NASA and within the academic research community supported by NASA. The work that comes from the SVS is meant to educate and inspire the public, in hopes of sharing NASA science and research more widely and fluently.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md` This Observable project was an ambitious mission to organize and filter through all of the SVS visualizations from 1990 to 2021. The following visualizations are an exploration through SVS material, creating new ways to recognize trends, find patterns, and uncover what topics NASA scientists are most interested in. We looked at common keywords and utlised a variety of visualization methods in order to display the data effectively.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `**The visualizations: Zoomable Sunburst, Word Cloud, Streamgraph, Bar Chart Race, and Network Graph **`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `# Zoomable Sunburst`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `This zoomable sunburst is an interactive circular visualization. Think of a pie chart: the bigger "slices" are the more common keywords. Once you click on a section, the sunburst opens up to the second level of keywords that all fall under the parent keyword. 

The 5 parent categories we included are the four NASA science categories (Earth, Universe, Planetary, Sun) and a hybrid category. Earth was the biggest subsection, showing us that a vast majority of NASA SVS visuals focus on earth science. `
)});
  main.variable(observer()).define(["md"], function(md){return(
md `If you want, filter the keywords that appear in the sunburst. If you enter a keyword, you get all the titles containing each keyword to get the links for visuals.`
)});
  main.variable(observer("viewof possiblekwdone")).define("viewof possiblekwdone", ["html"], function(html){return(
html`<input type=text value=""}>`
)});
  main.variable(observer("possiblekwdone")).define("possiblekwdone", ["Generators", "viewof possiblekwdone"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Use this to search through the levels of the current sunburst.`
)});
  main.variable(observer("viewof searchingkwd")).define("viewof searchingkwd", ["html"], function(html){return(
html`<input type=text value=""}>`
)});
  main.variable(observer("searchingkwd")).define("searchingkwd", ["Generators", "viewof searchingkwd"], (G, _) => G.input(_));
  main.variable(observer("viewof catdrop")).define("viewof catdrop", ["html","searchResults"], function(html,searchResults){return(
html`<select>${searchResults.map((result) => `
  <option value=>${result}</option>`).join("")}
</select>`
)});
  main.variable(observer("catdrop")).define("catdrop", ["Generators", "viewof catdrop"], (G, _) => G.input(_));
  main.variable(observer("sunburstgraph")).define("sunburstgraph", ["sunburstchart","sunburstdata","possiblekwdone"], function(sunburstchart,sunburstdata,possiblekwdone){return(
sunburstchart(sunburstdata,possiblekwdone)
)});
  main.variable(observer()).define(["md"], function(md){return(
md `# Word Cloud`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `This word cloud uses size and color to organize keyword frequency. The larger words are more common keywords, while the tiniest ones may have just one or two visualizations connected to it.`
)});
  main.variable(observer()).define(["legend","d3"], function(legend,d3){return(
legend({
  color: d3.scaleSequential([1,4],d3.interpolate("blue", "yellow")),
  title: "Word Cloud Color Bar",
  ticks: 4,
  tickFormat: ".0s"
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md `The color bar ranges from blue to yellow.
- 1:  Earth
- 2: Universe
- 3: Planetary
- 4: Sun`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `If you want, filter the keywords that appear in the word cloud.`
)});
  main.variable(observer("viewof possiblekwdtwo")).define("viewof possiblekwdtwo", ["html"], function(html){return(
html`<input type=text value=""}>`
)});
  main.variable(observer("possiblekwdtwo")).define("possiblekwdtwo", ["Generators", "viewof possiblekwdtwo"], (G, _) => G.input(_));
  main.variable(observer("cloudgraph")).define("cloudgraph", ["cloudchart","clouddata"], function(cloudchart,clouddata){return(
cloudchart(clouddata)
)});
  main.variable(observer()).define(["md"], function(md){return(
md `# Streamgraph`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `This graph displays the number of visuals released by the SVS over time split into each main category. As can be seen in all visuals, Earth makes up the vast majority of SVS's work. 

There are also some interesting years where the output of visuals is much different than previous years like in 2014 with the introduction of GSFC's Hyperwall.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Feel free to add or take away some of the main categories.`
)});
  main.variable(observer("viewof categories")).define("viewof categories", ["Inputs","cols"], function(Inputs,cols){return(
Inputs.checkbox(cols, {value: cols,label: "Categories:"})
)});
  main.variable(observer("categories")).define("categories", ["Generators", "viewof categories"], (G, _) => G.input(_));
  main.variable(observer("streamkey")).define("streamkey", ["chart"], function(chart){return(
chart[1]
)});
  main.variable(observer("streamplot")).define("streamplot", ["chart"], function(chart){return(
chart[0]
)});
  main.variable(observer()).define(["md"], function(md){return(
md `# Bar Chart Race`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`This animated graph shows the top hits of SVS Visualizations for each month for the past 5 years. The colors are categorized by Earth, Universe, Planets and Moons, Sun, Hybrid, and Other.

- Earth: Dark Blue
- Universe: Orange
- Planets and Moons: Red
- Sun: Light Blue
- Hybrid: Green

Notable observations include "Revisiting the Pale Blue Dot at 30," which held top position for the entire year of 2020, and then again in June 2021.`
)});
  main.variable(observer("viewof keyframe")).define("viewof keyframe", ["Scrubber","keyframes","formatDate","duration"], function(Scrubber,keyframes,formatDate,duration){return(
Scrubber(keyframes, {
  //taken from svs_barchart
  format: ([date]) => formatDate(date),
  delay: duration,
  loop: false 
})
)});
  main.variable(observer("keyframe")).define("keyframe", ["Generators", "viewof keyframe"], (G, _) => G.input(_));
  main.variable(observer("barchart")).define("barchart", ["d3","width","height","bars","axis","labels","ticker","invalidation","duration","x"], function(d3,width,height,bars,axis,labels,ticker,invalidation,duration,x)
{
  //taken from svs_barchart
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
  main.variable(observer()).define(["md"], function(md){return(
md `# Force-Directed Network Graph`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `This network graph shows visuals that are connected to each other through related topics. The different colors represent different science categories.

- Green: Earth
- Blue: Sun
- Red: Planets and Moons
- Orange: Universe
- Purple: Hybrid
- Brown: Other

One interesting observation: See the purple dot at the center with a bunch of connections? That's our studio demo reel! Click around to explore the other connections amongst SVS work.

For visualizations that are not connected to any others, use the dropdown menu below the graph.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `Feel free to filter the dates of the visualizations.`
)});
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
  main.variable(observer("nodechart")).define("nodechart", ["netchart"], function(netchart){return(
netchart[0]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You can view any visuals with no connections below:`
)});
  main.variable(observer("viewof disconnected")).define("viewof disconnected", ["netchart","decodeHTML","getCol","html"], function(netchart,decodeHTML,getCol,html)
{
  //all disconnected nodes put into a dropdown menu
  let arr=netchart[1];
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
  main.variable(observer("disconnectlink")).define("disconnectlink", ["md","disconnected"], function(md,disconnected){return(
md`Here's your <a href=${disconnected} target="_blank" rel="noopener noreferrer">link</a> for your visual with no related posts. Have fun!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `# Appendix`
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("swatches", child1);
  const child2 = runtime.module(define2);
  main.import("networkchart", child2);
  main.import("getCol", child2);
  main.import("decodeHTML", child2);
  const child3 = runtime.module(define3);
  main.import("sunburstchart", child3);
  const child4 = runtime.module(define4);
  main.import("streamgraphchart", child4);
  main.import("changePlanetary", child4);
  const child5 = runtime.module(define5);
  main.import("cloudchart", child5);
  const child6 = runtime.module(define6);
  main.import("duration", child6);
  main.import("formatDate", child6);
  main.import("keyframes", child6);
  main.import("x", child6);
  main.import("height", child6);
  main.import("bars", child6);
  main.import("axis", child6);
  main.import("labels", child6);
  main.import("ticker", child6);
  const child7 = runtime.module(define7);
  main.import("getDataVal", child7);
  main.import("getDataStreamgraph", child7);
  main.import("getDataNetwork", child7);
  main.import("getDataHierarchy", child7);
  main.import("searchResultsSimple", child7);
  const child8 = runtime.module(define8);
  main.import("date", child8);
  const child9 = runtime.module(define9);
  main.import("Scrubber", child9);
  main.variable(observer("dat")).define("dat", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("related_posts_interns_keywords_21_released_dates.csv").text(), d3.autoType), {y: "Magnitude"})
)});
  main.variable(observer("clouddata")).define("clouddata", ["getDataVal","dat","possiblekwdtwo"], function(getDataVal,dat,possiblekwdtwo){return(
getDataVal(dat,possiblekwdtwo)
)});
  main.variable(observer("streamdata")).define("streamdata", ["getDataStreamgraph","dat","changePlanetary","categories"], function(getDataStreamgraph,dat,changePlanetary,categories){return(
getDataStreamgraph(dat,changePlanetary(categories))
)});
  main.variable(observer("chart")).define("chart", ["streamgraphchart","streamdata"], function(streamgraphchart,streamdata){return(
streamgraphchart(streamdata)
)});
  main.variable(observer("cols")).define("cols", function(){return(
["Earth","Universe","Planets and Moons","Sun","Other","Hybrid"]
)});
  main.variable(observer("networkdata")).define("networkdata", ["getDataNetwork","start","end","dat"], function(getDataNetwork,start,end,dat){return(
getDataNetwork(new Date(start),new Date(end),dat)
)});
  main.variable(observer("sunburstdata")).define("sunburstdata", ["getDataHierarchy","dat","possiblekwdone"], function(getDataHierarchy,dat,possiblekwdone){return(
getDataHierarchy(dat,possiblekwdone)
)});
  main.variable(observer("searchResults")).define("searchResults", ["searchResultsSimple","searchingkwd","sunburstdata"], function(searchResultsSimple,searchingkwd,sunburstdata){return(
searchResultsSimple(searchingkwd,sunburstdata)
)});
  main.variable(observer("getNumLinks")).define("getNumLinks", ["searchResults"], function(searchResults){return(
i=>{
  if (typeof searchResults[i][1]==="string"){ 
    return 0;
  } else {
    return searchResults[i][1].length;
  }
}
)});
  main.variable(observer("netchart")).define("netchart", ["networkchart","networkdata"], function(networkchart,networkdata){return(
networkchart(networkdata)
)});
  main.variable(observer("update")).define("update", ["barchart","keyframe"], function(barchart,keyframe){return(
barchart.update(keyframe)
)});
  return main;
}
