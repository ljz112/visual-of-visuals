export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["related_posts.json",new URL("./files/f4fa25fda0bef92398937d9f80fd360c09e7d9c6324daf976c1cd1bca8e4099b3d98b4321e403f4ed748b94627623a562283f28861f1793dc58300445f600cd8",import.meta.url)],["related_posts_interns_keywords_21_released_dates.csv",new URL("./files/e7009d5205fc674ca38a785fb2515a4e6408acb78d9016869db6e59c5fae2134a7fb0810e571f93101ade6b6f3760ccf8ceaadf673a817e33fcebe1d277ac79d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Data Functions Used in Visualizations`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Data Hierarchy methods:`
)});
  main.variable(observer("getDataHierarchy")).define("getDataHierarchy", ["containskwd","othernonos","contains","keywords"], function(containskwd,othernonos,contains,keywords){return(
function getDataHierarchy(dat,possiblekwd=""){
  //makes sunburst/hierarchial data

  //filters data if there's a keyword in place
  const d=dat.columns.slice(3);
  var kwd=possiblekwd;
  if (kwd){
    dat=dat.filter((val)=>containskwd(kwd,val,d)&&!(othernonos.map((v)=>v.toLowerCase()).includes(kwd.toLowerCase())));
  }

  //filters each visual into one of 15 combinations of the 4 categories (other not included)
  var eups=[];
  var eup=[];
  var eus=[];
  var ups=[];
  var eps=[];
  var eu=[];
  var ep=[];
  var es=[];
  var up=[];
  var us=[];
  var ps=[];
  var e=[];
  var u=[];
  var p=[];
  var s=[];
  for (var i=0;i<dat.length;i++){
    if(contains(true,true,true,true,dat[i],d)){
      eups.push(dat[i]);
    } else if(contains(true,true,true,false,dat[i],d)){
      eup.push(dat[i]);
    } else if(contains(true,true,false,true,dat[i],d)){
      eus.push(dat[i]);
    } else if(contains(false,true,true,true,dat[i],d)){
      ups.push(dat[i]);
    } else if(contains(true,false,true,true,dat[i],d)){
      eps.push(dat[i]);
    } else if(contains(true,true,false,false,dat[i],d)){
      eu.push(dat[i]);
    } else if(contains(true,false,true,false,dat[i],d)){
      ep.push(dat[i]);
    } else if(contains(true,false,false,true,dat[i],d)){
      es.push(dat[i]);
    } else if(contains(false,true,true,false,dat[i],d)){
      up.push(dat[i]);
    } else if(contains(false,true,false,true,dat[i],d)){
      us.push(dat[i]);
    } else if(contains(false,false,true,true,dat[i],d)){
      ps.push(dat[i]);
    } else if(contains(true,false,false,false,dat[i],d)){
      e.push(dat[i]);
    } else if(contains(false,true,false,false,dat[i],d)){
      u.push(dat[i]);
    } else if(contains(false,false,true,false,dat[i],d)){
      p.push(dat[i]);
    } else if(contains(false,false,false,true,dat[i],d)){
      s.push(dat[i]);
    } 
  }

  //constructs the "hybrid categories" and gets the keyword hierarchy for every single category combination. returns main hierarchy
  var innerdict=[];
  innerdict.push({name:"Earth, Universe, Planets and Moons, Sun",children:keywords(eups,d,true,kwd)},{name:"Earth, Universe, Planets and Moons",children:keywords(eup,d,true,kwd)},{name:"Earth, Universe, Sun",children:keywords(eus,d,true,kwd)},{name:"Universe, Planets and Moons, Sun",children:keywords(ups,d,true,kwd)},{name:"Earth, Planets and Moons, Sun",children:keywords(eps,d,true,kwd)},{name:"Earth, Universe",children:keywords(eu,d,true,kwd)},{name:"Earth, Planets and Moons",children:keywords(ep,d,true,kwd)},{name:"Earth, Sun",children:keywords(es,d,true,kwd)},{name:"Universe, Planets and Moons",children:keywords(up,d,true,kwd)},{name:"Universe, Sun",children:keywords(us,d,true,kwd)},{name:"Planets and Moons, Sun",children:keywords(ps,d,true,kwd)});
  var dict=[];
  dict.push({name:"Earth", children:keywords(e,d,true,kwd)},{name:"Universe",children:keywords(u,d,true,kwd)},{name:"Planets and Moons",children:keywords(p,d,true,kwd)},{name:"Sun",children:keywords(s,d,true,kwd)},{name: "Hybrid Categories", children: innerdict});
  const datas={name:"SVS", children: dict};
  return datas;
}
)});
  main.variable(observer("contains")).define("contains", function(){return(
function contains(e,u,p,s,slice,d){
  //is a visual a specific combination of the 4 categories?
    var b1=false;
    var b2=false;
    var b3=false;
    var b4=false;
    for (var i=0;i<d.length;i++){
      if(typeof slice[d[i]]==="number"||typeof slice[d[i]]==="string"){
        if (typeof slice[d[i]]==="number"){
          slice[d[i]]=""+slice[d[i]];
        }
        if(slice[d[i]].trim()==="Earth"){
          b1=true;
        }
        if(slice[d[i]].trim()==="Universe"){
          b2=true;
        }
        if(slice[d[i]].trim()==="Planets and Moons"){
          b3=true;
        }
        if(slice[d[i]].trim()==="Sun"){
          b4=true;
        }
      }
    }
    return b1==e&&b2==u&&b3==p&&b4==s;
  }
)});
  main.variable(observer("containskwd")).define("containskwd", function(){return(
function containskwd(kwd,slice,d){
  //does a visual contain a specific keyword?
    var keyword=kwd.toLowerCase();
    var b1=false;
    for (var i=0;i<d.length;i++){
      if(typeof slice[d[i]]==="number"||typeof slice[d[i]]==="string"){
        if (typeof slice[d[i]]==="number"){
          slice[d[i]]=""+slice[d[i]];
        }
        if(slice[d[i]].trim().toLowerCase()===keyword){
          b1=true;
        }
      }
    }
    return b1;
  }
)});
  main.variable(observer("nonos")).define("nonos", function(){return(
["HDTV","Hyperwall","App","Location","Narrated","For Educators","Presentation","4K","Live Shots","Voice Over Talent","Byrne","Gonnelli","Earth", "Universe", "Planets and Moons", "Sun","Edited Feature","Interview"]
)});
  main.variable(observer("othernonos")).define("othernonos", ["nonos"], function(nonos){return(
nonos.filter((val)=>!(["Earth", "Universe", "Planets and Moons", "Sun"].includes(val)))
)});
  main.variable(observer("keywords")).define("keywords", ["nonos","othernonos","getArr","countof","getTitles"], function(nonos,othernonos,getArr,countof,getTitles){return(
function keywords(arr,d,hierarch=true,hierarchkwd=""){
  //gets keyword hierarchy in specific format. stops halfway through for the word cloud

  //get array with all keywords including repititions, info of either categorical information or id/title included
  var catLen=arr.length;
  var kwdarr=[];
  var a;
  var c;
  var toarr;
  var cat;
  let no=nonos;
  let idtitle=[];
  if (!(hierarch)){
    no=othernonos;
  }
  for (var i=0;i<catLen;i++){
    toarr=getArr(arr[i],d);
    c=toarr.filter((val)=>val!==null);
    c=c.map((val)=>(""+val).trim());
    for (var j=0;j<d.length;j++){
      if(typeof arr[i][d[j]]=="string"||typeof arr[i][d[j]]=="number"){
        if (typeof arr[i][d[j]]==="number"){
          arr[i][d[j]]=""+arr[i][d[j]];
        }
        a=arr[i][d[j]].trim();
        if(!(no.includes(a))){
          cat="";
          if (!(hierarch)){
            if (c.includes("Earth")){
              cat+="e";
            } if (c.includes("Universe")){
              cat+="u";
            } if (c.includes("Planets and Moons")){
              cat+="p";
            } if (c.includes("Sun")){
              cat+="s";
            } if (cat){
              kwdarr.push({val: a, num: c.length,cat: cat});
            }
          } else {
            kwdarr.push({val: a, num: c.length});
            idtitle.push([arr[i].id,arr[i].description]);
          }
        }  
      }
    }
  }
  if (!(hierarch)){
    return kwdarr;
  }
  
  //sunburst only: calcluate specific value/location of each keyword, add titles if existing keyword
  var val;
  var charcode;
  var count;
  var numids;
  var calcval;
  var kwdlen=kwdarr.length;
  var kwddict=[];
  var otherdict=[];
  var ag=[];
  var hm=[];
  var ns=[];
  var tzother=[];
  var threshhold=kwdlen/200;
  for (var i=0;i<kwdarr.length;i=i){
    i=0;
    if (i>=kwdarr.length){
      break;
    } else {
      val=kwdarr[i].val;
      let numids=countof(kwdarr,val,idtitle);
      count=numids.length;
      calcval=(count/kwdlen)*arr.length;
      if (count>threshhold){ 
        if (hierarchkwd){
          kwddict.push({name:val,children:getTitles(calcval,numids)});
        } else {
          kwddict.push({name:val,value: calcval, ids: numids});
        }
      } else {
        charcode=val.charCodeAt(0);
        if ((65<=charcode&&charcode<=71)||(97<=charcode&&charcode<=103)){
          if (hierarchkwd){
            ag.push({name:val,children:getTitles(calcval,numids)});
          } else {
            ag.push({name:val,value: calcval, ids: numids});
          }
        } else if ((72<=charcode&&charcode<=77)||(104<=charcode&&charcode<=109)){
          if (hierarchkwd){
            hm.push({name:val,children:getTitles(calcval,numids)});
          } else {
            hm.push({name:val,value: calcval, ids: numids});
          }
        } else if ((78<=charcode&&charcode<=83)||(110<=charcode&&charcode<=115)){
          if (hierarchkwd){
            ns.push({name:val,children:getTitles(calcval,numids)});
          } else {
            ns.push({name:val,value: calcval, ids: numids});
          }
        } else {
          if (hierarchkwd){
            tzother.push({name:val,children:getTitles(calcval,numids)});
          } else {
            tzother.push({name:val,value: calcval, ids: numids});
          }
        }
      }
      idtitle=idtitle.filter((value,i)=>kwdarr[i].val!==val);
      kwdarr=kwdarr.filter((value)=>value.val!==val);
    }
  }
  otherdict.push({name:"A-G",children:ag},{name:"H-M",children:hm},{name:"N-S",children:ns},{name:"T-Z and Other",children:tzother});
  if (ag.length||hm.length||ns.length||tzother.length){
    kwddict.push({name:"Other",children:otherdict});
  }
  return kwddict;
}
)});
  main.variable(observer("getTitles")).define("getTitles", ["decodeHTML"], function(decodeHTML){return(
function getTitles(calcval,idsparam){
  //get all titles of a keyword, divided equally with their id information
  let numids=idsparam.map((val)=>((val[1]===null)?([val[0],"#N/A"]):(val)));
  numids.sort((first,second)=>{
    if (decodeHTML(first[1]).toLowerCase()<=decodeHTML(second[1]).toLowerCase()){
      return -1;
    } else {
      return 1;
    }
  });
  let childrenarr=[];
  let thresh=20;
  let childrendict=[];
  let dict=[];
  let bool=false;
  let smallval=calcval/numids.length;
  let numsections=Math.ceil(numids.length/thresh);
  for (var i=0;i<numsections;i++){
    childrendict=[];
    if (i==numsections-1){
      childrenarr=numids;
      if (i==0){
        bool=true;
      }
    } else {
      childrenarr=numids.filter((val,i)=>i<thresh);
      numids=numids.filter((val,i)=>i>=thresh);
    }
    for (let j=0;j<childrenarr.length;j++){
      childrendict.push({name: childrenarr[j][1],value: smallval,ids:childrenarr[j][0]});
    }
    if (bool){
      childrendict.map((childval)=>dict.push(childval));
    } else {
      dict.push({name: childrendict[0].name.toUpperCase().substring(0,3)+"-"+childrendict[childrendict.length-1].name.toUpperCase().substring(0,3),children: childrendict});
    }
  }
  return dict;
}
)});
  main.variable(observer("getArr")).define("getArr", function(){return(
(arr,d="")=>{
  //gets array of all the keywords of a visualization
  if (d){
    var apush=[];
    for (var i=0;i<d.length;i++){
      apush.push(arr[d[i]]);
    }
    return apush;
  } else {
    var apush=[];
    for (var i=0;i<arr.length;i++){
      apush.push(arr[i].val);
    }
    return apush;
  }
}
)});
  main.variable(observer("countof")).define("countof", function(){return(
function countof(arr,val,idtitle){
  //array of all the ids/titles of a specific keyword
  var count=[];
  for (var i=0;i<arr.length;i++){
    if(typeof idtitle[i][1]=="string"||typeof idtitle[i][1]=="number"){
        if (typeof idtitle[i][1]==="number"){
          idtitle[i][1]=""+idtitle[i][1];
        }
      idtitle[i][1]=idtitle[i][1].trim();
    }
    if (arr[i].val===val){
      count.push(idtitle[i]);
    }
  }
  return count;
}
)});
  main.variable(observer("searchResultsSimple")).define("searchResultsSimple", function(){return(
(kwd,data)=>{
  //the instances in a hierarchy a where a certain keyword pops up
  return keyQuery(kwd,data,[],data.name).filter((val)=>typeof val==="string");
  
  function keyQuery(kwd,data,a,root){
    //method to collect all these instances and paths to these instances
    if (typeof data.children==="undefined"){
      return;
    } else {
      for (var i=0;i<data.children.length;i++){
        if (data.children[i].name!== null&&data.children[i].name.toLowerCase().includes(kwd.toLowerCase())){
          a.push(root+"/"+data.children[i].name);
        }
        a.push(keyQuery(kwd,data.children[i],a,root+"/"+data.children[i].name));
      }
      return a;
    }
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Data Network methods:`
)});
  main.variable(observer("getDataNetwork")).define("getDataNetwork", ["dn","dl"], function(dn,dl){return(
function getDataNetwork(startdate,enddate,dat){
  //get nodes/links filtered by date
  return Object.assign({nodes: dn(startdate,enddate,dat)},{links: dl(startdate,enddate,dat)});
}
)});
  main.variable(observer("dn")).define("dn", ["contains"], function(contains){return(
function dn(startdate,enddate,dat){
  //to get the collection of nodes
  var d=[];
  var n=[];
  const dc=dat.columns.slice(3);
  var thisDate;
  for (var i=0;i<dat.length;i++){
    d=dat[i];
    thisDate=new Date(dat[i].embargo_date);
    if (thisDate>=startdate && thisDate<enddate){
      n.push({id: d.id, title:d.description, group: getGroup(i,dat,dc)})//add value
    }
  }
  return n;
  
  function getGroup(ind,dat,dc){
    //find which group a visual goes into and return it 
    if(contains(true,false,false,false,dat[ind],dc)){
      return 0;
    } else if (contains(false,true,false,false,dat[ind],dc)){
      return 1;
    } else if (contains(false,false,true,false,dat[ind],dc)){
      return 2;
    } else if (contains(false,false,false,true,dat[ind],dc)){
      return 3;
    } else if (contains(false,false,false,false,dat[ind],dc)){
      return 4;
    } else {
      return 5;
    }
  }
}
)});
  main.variable(observer("dl")).define("dl", ["datapoints","found"], function(datapoints,found){return(
(startdate,enddate,dat)=>{
  //to get the collection of links
  var d=[];
  var datas=datapoints;
  var n=[];
  for (var i=0;i<datas.length;i++){
    d=datas[i];
    var indone=found(d.a_id1,dat);
    var indtwo=found(d.a_id2,dat);
    if (indone&&indtwo){
      var firstDate=new Date(dat[indone].embargo_date);
      var secondDate=new Date(dat[indtwo].embargo_date);
    }
    if (indone&&indtwo&&firstDate>=startdate && firstDate<enddate&&secondDate>=startdate && secondDate<enddate){
      n.push({a_id1: d.a_id1, a_id2:d.a_id2});
    }
  }
  return n;
}
)});
  main.variable(observer("found")).define("found", function(){return(
(id,dat)=>{
  //find the index of dat of the specific visual id
    var ind=-1;
    for (var i=0;i<dat.length;i++){
        if (dat[i].id==id){
          ind=i;
          break;
        }
    }
    if (ind!=-1){
      return ind;
    } else {
      return false;
    }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Data Streamgraph methods:`
)});
  main.variable(observer("cols")).define("cols", function(){return(
["Earth","Universe","Planetary","Sun","Other","Hybrid"]
)});
  main.variable(observer("getDataStreamgraph")).define("getDataStreamgraph", ["cols","contains"], function(cols,contains){return(
(datas,cats)=>{
  //get data in streamgraph format
  
  //making the dates actual date objects
  for (var i=0;i<datas.length;i++){
    datas[i].embargo_date=new Date(datas[i].embargo_date);
  }
  
  //filter by date, determine how many filtered visualizations contain each category
  var startdate=new Date("1/1/1990");
  var enddate=new Date("7/1/1990");
  const increment=4;
  const years=32;
  const length=years/(increment/12);
  const d=datas.columns.slice(3);
  var filterarr=[];
  var esub;
  var usub;
  var psub;
  var ssub;
  var othersub;
  var hybridsub;
  var dat=[];
  for (var i=0;i<length;i++){
    filterarr=filterDate(startdate,enddate);
    esub=countContains(true,false,false,false,filterarr,d);
    usub=countContains(false,true,false,false,filterarr,d);
    psub=countContains(false,false,true,false,filterarr,d);
    ssub=countContains(false,false,false,true,filterarr,d);
    othersub=countContains(false,false,false,false,filterarr,d);
    hybridsub=filterarr.length-(esub+usub+psub+ssub+othersub);
    dat.push({date:startdate, Earth: esub, Universe: usub, Planetary: psub, Sun: ssub, Other: othersub, Hybrid: hybridsub});
    startdate=new Date(startdate.setMonth(startdate.getMonth()+increment));
    enddate=new Date(enddate.setMonth(enddate.getMonth()+increment));
  }

  //take away any unchecked boxes in the streamgraph visual
  for (var i=0;i<cols.length;i++){
    if(!(cats.includes(cols[i]))){
      dat.map((val)=>val[cols[i]]=0);
    }
  }
  return Object.assign(dat, {columns: ["date","Earth","Universe","Planetary","Sun","Other","Hybrid"]});
  
  function filterDate(startdate,enddate){
    //filters the date between 2 dates
    var datearr=[];
    for (var i=0;i<datas.length;i++){
      if (datas[i].embargo_date>=startdate && datas[i].embargo_date<enddate){
        datearr.push(datas[i]);
      }
    }
    return datearr;
  }
  
  function countContains(e,u,p,s,arr,d){
    //sees how many elements of arr satisfy the e,u,p,s condition written
    var contarr=[];
    for (var i=0;i<arr.length;i++){
      if (contains(e,u,p,s,arr[i],d)){
        contarr.push(arr[i]);
      }
    }
    return contarr.length;
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Word Cloud methods:`
)});
  main.variable(observer("getDataVal")).define("getDataVal", ["containskwd","othernonos","keywords","countoflengthonly"], function(containskwd,othernonos,keywords,countoflengthonly){return(
(arr,possiblekwd)=>{
  //get data in format of word cloud
  var kwd=possiblekwd;
  const d=arr.columns.slice(3);
  if (kwd){
    arr=arr.filter((val)=>containskwd(kwd,val,d)&&!(othernonos.map((v)=>v.toLowerCase()).includes(kwd.toLowerCase())));
  }
  var kwdarr=keywords(arr,d,false);
  var val;
  var count;
  var color;
  let c;
  var numids;
  var calcval;
  var kwddict=[];
  for (var i=0;i<kwdarr.length;i=i){
    i=0;
    if (i>=kwdarr.length){
      break;
    } else {
      val=kwdarr[i].val;
      c=countoflengthonly(kwdarr,val);
      count=c[0];
      color=c[1];
      kwddict.push({text:val,value:count,color:color});
      kwdarr=kwdarr.filter((value)=>value.val!==val);
    }
  }
  return kwddict;
}
)});
  main.variable(observer("countoflengthonly")).define("countoflengthonly", function(){return(
function countoflengthonly(arr,val){
  //returns amount of times keyword pops up and total times of [e,u,p,s]
  var count=0;
  const checking=["e","u","p","s"];
  var cat=[0,0,0,0];
  for (var i=0;i<arr.length;i++){
    if (arr[i].val===val){
      count+=1;
      for (var j=0;j<checking.length;j++){
        if (arr[i].cat.includes(checking[j])){
          cat[j]+=1;
        }
      }
    }
  }
  return [count,cat];
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Other methods:`
)});
  main.variable(observer("decodeHTML")).define("decodeHTML", function(){return(
function decodeHTML(html) {
  //decodes any html encodings that are in some titles
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
)});
  main.variable(observer("dat")).define("dat", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("related_posts_interns_keywords_21_released_dates.csv").text(), d3.autoType), {y: "Magnitude"})
)});
  main.variable(observer("dp")).define("dp", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("related_posts.json").json()
)});
  main.variable(observer("datapoints")).define("datapoints", ["dp"], function(dp){return(
dp.links
)});
  main.variable(observer("searchResultsWithLinks")).define("searchResultsWithLinks", ["dat","decodeHTML"], function(dat,decodeHTML){return(
(kwd,data)=>{
  //unused method, it does what searchResults does but also collects the urls of each instance if applicable
  return keyQuery(kwd,data,[],data.name).filter((val)=>val&&typeof val[0]==="string");
  
  function keyQuery(kwd,data,a,root){
    if (typeof data.children==="undefined"){
      return;
    } else {
      for (var i=0;i<data.children.length;i++){
        if (data.children[i].name!== null&&data.children[i].name.toLowerCase().includes(kwd.toLowerCase())){
          a.push([root+"/"+data.children[i].name,getLinks(data.children[i])]);
        }
        a.push(keyQuery(kwd,data.children[i],a,root+"/"+data.children[i].name));
      }
      return a;
    }
  }
  
  function getLinks(obj){
    let a=[];
    if (obj.ids){
      for (var i=0;i<obj.ids.length;i++){
        let link="svs.gsfc.nasa.gov/"+obj.ids[i];
        let ind=found(obj.ids[i]);
        if (dat[ind].description){
          a.push([link,decodeHTML(dat[ind].description.trim())]);
        } else {
          a.push([link,"No title found"]);
        }
      }
      return removeDuplicates(a);
    } else {
      return "Be more specific";
    }
  }

  function found(id){
    var ind=-1;
    for (var i=0;i<dat.length;i++){
        if (dat[i].id==id){
          ind=i;
          break;
        }
    }
    if (ind!=-1){
      return ind;
    } else {
      return false;
    }
  }

  function removeDuplicates(linkarr){
    var unique = [];
    var bool;
    for (var i=0;i<linkarr.length;i++){
      bool=true;
      for (var j=0;j<unique.length;j++){
        if (linkarr[i][0]===unique[j][0]&&linkarr[i][1]===unique[j][1]){
          bool=false;
          break;
        }
      }
      if (bool){
        unique.push(linkarr[i]);
      }
    }
    return unique;
  }
}
)});
  return main;
}
