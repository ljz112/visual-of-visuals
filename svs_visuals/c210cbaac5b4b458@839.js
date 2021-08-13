import define1 from "./2622cb8a5f7e3697@1115.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["related_posts_interns_keywords_21_released_dates.csv",new URL("./files/e7009d5205fc674ca38a785fb2515a4e6408acb78d9016869db6e59c5fae2134a7fb0810e571f93101ade6b6f3760ccf8ceaadf673a817e33fcebe1d277ac79d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Word Cloud

A demonstration of [d3-cloud](https://github.com/jasondavies/d3-cloud/). Paste into or edit the text below to update the chart. Note: word clouds [may be harmful](https://www.niemanlab.org/2011/10/word-clouds-considered-harmful/).`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`If you want choose a keyword value you want to filter the word cloud:`
)});
  main.variable(observer("viewof possiblekwd")).define("viewof possiblekwd", ["html"], function(html){return(
html`<input type=text value=""}>`
)});
  main.variable(observer("possiblekwd")).define("possiblekwd", ["Generators", "viewof possiblekwd"], (G, _) => G.input(_));
  main.variable(observer()).define(["cloudchart","datas"], function(cloudchart,datas){return(
cloudchart(datas)
)});
  main.variable(observer("cloudchart")).define("cloudchart", ["factor","d3","width","height","fontFamily","padding","rotate","invalidation"], function(factor,d3,width,height,fontFamily,padding,rotate,invalidation){return(
function cloudchart(data){  
  //making the word cloud
  
  //estimates of determining how to scale the font
  const fontScale=Math.min(factor*85/fontSumSqrt(),factor*1849/data.length);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width,height])
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle");
  
  const cloud = d3.cloud()
      .size([width, height])
      .words(data.map(d => Object.create(d)))
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize(d => adjustSize(d.text,Math.sqrt(d.value) * fontScale))
      .on("word", ({size, x, y, rotate, text}) => {
        svg.append("text")
            .attr("font-size", size)
            .attr("fill",color(text))
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text);
      });
  
  cloud.start();
  invalidation.then(() => cloud.stop());
  return svg.node();

  function adjustSize(text,size){
    //if a word is too big to show on the word cloud, decrease its font size
    let font=size+"px "+fontFamily;
    let limit=width/1.2;
    if (getWidth(text,font)<limit){
      return size;
    } else {
      let fontsize=size;
      while (getWidth(text,font)>=limit){
        fontsize-=1;
        font=fontsize+"px "+fontFamily;
      }
      return fontsize;
    }
  }

  function getWidth(text,font){
    //gets width of current text with given font
    let canvas = adjustSize.canvas || (adjustSize.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
  }

  function fontSumSqrt(){
    //square root of sum of all values (font is square root of value)
    let total=0;
    data.map((val)=>total+=val.value);
    return Math.sqrt(total);
  }

  function color(text){
    //get color of given word based on average category
    let d=data.filter((val)=>val.text===text)[0];
    const polate=d3.interpolate("blue", "yellow")
    return polate(getColorNum(d));
  }

  function getColorNum(d){
    //determins the number of the average category
    let text=d.text;
    let arr=d.color;
    let sum=0;
    const refval=[0,1/3,2/3,1];
    arr.map((val)=>sum+=val);
    arr=arr.map((val)=>val=val/sum);
    let expected=0;
    arr.map((val,i)=>expected+=val*refval[i]);
    return expected;
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.variable(observer("datas")).define("datas", ["getDataVal","dat","possiblekwd"], function(getDataVal,dat,possiblekwd){return(
getDataVal(dat,possiblekwd)
)});
  main.variable(observer("dat")).define("dat", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("related_posts_interns_keywords_21_released_dates.csv").text(), d3.autoType), {y: "Magnitude"})
)});
  main.variable(observer("fontFamily")).define("fontFamily", function(){return(
"sans-serif"
)});
  main.variable(observer("rotate")).define("rotate", function(){return(
() => 0
)});
  main.variable(observer("padding")).define("padding", function(){return(
0
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("factor")).define("factor", function(){return(
3.2
)});
  const child1 = runtime.module(define1);
  main.import("getDataVal", child1);
  main.variable(observer("d3")).define("d3", ["require"], async function(require){return(
Object.assign(await require("d3@6"), {cloud: await require("d3-cloud@1")})
)});
  return main;
}
