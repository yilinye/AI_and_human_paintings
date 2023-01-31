<!--
 * @Author: Qing Shi
 * @LastEditTime: 2022-04-30 20:52:22
 * @Knowledge: 
 * @Description: 
 * @Attention: 
-->
<template>
  <div style="height: 100%">
    <div id="titleBar">
      {{ viewName }}
    </div>
    <div id="DatasetHis">
    </div>
    <!-- <div id="selectPic">
      <div
        v-if="isChoose"
        id="isChoose"
      >
        <img
          id="nodePic" style="width:300px; height:150px; border:solid 1px"
        >
      </div>
    </div> -->
    <div id="selectTable" style="overflow-x:scroll;">
      <table style="width:96%;text-align: center;margin-top:2px;height:calc(100% - 10px);margin-bottom:5px;margin-left:9px; margin-right: 0px;">
        <tr style="height:30px">
          <th>Dataset</th>
          <th>Creator</th>
          <th>Time Span</th>
          <!-- <th>Embedding Variance</th>
          <th>Embedding Skewness</th>
          <th>Color Variance</th>
          <th>Quality Variance</th> -->
        </tr>
        <tr
          v-for="item in collections"
          :key="item.setName"
          :id="'row'+item.setName"
          style="height:30px"
        >
          <!-- <td>{{ item.className }}</td>
          <td :id="item.className+'Table'">{{ item.classScore }}</td> -->
          <td>{{ item.setName }}</td>
          <td>{{ item.creator }}</td>
          <td></td>
          <!-- <td></td>
          <td></td>
          <td></td>
          <td></td> -->
        </tr>
      </table>
    </div>
    <!-- <p>AI art datasets</p>
    <div id="selectTable1" style="overflow-x:scroll;">
      <table style="width:calc(100% - 10px);text-align: center;margin-top:2px;height:calc(100% - 10px);margin-bottom:5px;margin-left:5px; margin-right: 5px;">
        <tr style="height:30px">
          <th>Dataset</th>
          <th>Model</th>
          <th>Embedding Variance</th>
          <th>Embedding Skewness</th>
          <th>Color Variance</th>
          <th>Quality Variance</th>
        </tr>
        <tr
          v-for="item in collections"
          :key="item.setName"
          :id="'row'+item.setName"
          style="height:30px"
        >
          <td>{{ item.setName }}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div> -->
  </div>
</template>

<script>
import * as d3 from 'd3';
import { dataService } from '../service';
export default {
  mounted () {
    this.drawHistogram(this.fileP.filePath, this.datasets);
  },
  data () {
    return {
      viewName: "Collection Info",
      isChoose: true,
      datasets: ["SemArt","Midjourney","Wiki-Emo"],
      picPath: "/src/assets/logo.svg",
      items: {
        Area: { className: "Area", classScore: "" },
        Bar: { className: "Bar", classScore: "" },
        Circle: { className: "Circle", classScore: "" },
        Diagram: { className: "Diagram", classScore: "" },
        Line: { className: "Line", classScore: "" },
        Map: { className: "Map", classScore: "" },
        Matrix: { className: "Matrix", classScore: "" },
        Net: { className: "Net", classScore: "" },
        Point: { className: "Point", classScore: "" },
        Table: { className: "Table", classScore: "" },
        Word: { className: "Word", classScore: "" },
      },
      collections:{
        SemArt: { setName: "SemArt", variance: "", creator: "Human" },
        WikiEmo: { setName: "Wiki-Emo", variance: "",creator: "Human" },
        // Chinese: { setName: "Chinese landscape", variance: "", creator: "Human" },
        Deviant: { setName: "Deviant", variance: "", creator: "Human" },
        Danbooru: { setName: "Danbooru", variance: "", creator: "Human" },
        Midjourney7k: { setName: "Midjourney7k", variance: "", creator: "AI" },
        Midjourney25k: { setName: "Midjourney25k", variance: "", creator: "AI" },
        Stable40k: { setName: "Stable40k", variance: "", creator: "AI" },
        NightCafe: { setName: "NightCafe", variance: "", creator: "AI" },
        NovelAI: {setName: "NovelAI", variance: "", creator: "AI" },
        // NFT: {setName: "NFT", variance: "", creator: "Human+AI" },
      }
    }
  },
  inject: ['fileP'],
  methods:  {
    /**
     * @description: draw dataset histogram
     * @param {String} filePath: which file will be used, selected in modelView.vue
     * @param {Array} hisTypeArray: Feature Group
     * @return {*}
     */
     drawHistogram: function (filePath, datasetArray) {
      d3.select("#DatasetSvg" ).remove();
      let datahis=d3.select("#DatasetHis")
      .append('svg')
        .attr('id', "DatasetSvg")
        .attr('width', 280)
        .attr('height', 150)
      let nameorder1=["SemArt","Wiki-Emotion","Midjourney"];
      d3.csv(filePath).then((fileData0) => {
          let counts = [0, 0, 0,0,0];
          let total = 0
          let colorMap=["#fed9a6","#ccebc5","#b3cde3","#decbe4","#fbb4ae"];
          for (let i = 0; i < fileData0.length; i++) {
            let idx;
            
            let path = fileData0[i]['path'];
            if (path.includes("semImages"))
            {
               idx=0;
            }
            else if (path.includes("Wiki-Emo"))
            {
               idx=2;
            }
            else if (path.includes("Midjourney"))
            {
               idx=1;
            }
            else if (path.includes("nightcafe"))
            {
               idx=3
            }
            else if (path.includes("lexiStable"))
            {
               idx=4
            }
            counts[idx] = counts[idx] + 1;
            total = total + 1;
          }
          datahis.selectAll(".widgetRect")
            .data(counts)
            .enter()
            .append('rect')
            .attr('class', 'widgetRect')
            .attr('global_ratio', function (d, i) { return counts[i] / total })
            .attr('id', function (d, i) { return "widget" + nameorder1[i] })
            .attr("height", function (d, i) { return 200 * counts[i] / total })
            .attr("width", 20)
            .attr("x", function (d, i) { return 20  + 30 * i})
            .attr("y", function (d, i) { return  140 - 200 * counts[i] / total})
            .style("fill", function (d, i) { return colorMap[i] });
        })
     }

  },
  watch: {
    fileP: {
      handler (newValue, oldValue) {
        console.log(newValue)
      },
      deep: true
    }
  }

}
</script>

<style>
#selectPic {
  height: 30%;
  width: 100%;
}
#isChoose {
  text-align: center;
  margin-top: 1px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 2px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#selectTable {
  /* height: calc(70% - 30px);
  width: 100%; */
  width:100%;
  overflow: scroll;

}
#selectTable1 {
  /* height: calc(70% - 30px);
  width: 100%; */
  width:100%;
  overflow: scroll;

}

th {
  text-align: middle;
  /* padding-left: 45px; */
  /* border-bottom: 1px solid #ddd; */
  border: 1px solid rgb(138, 138, 138);
  /* background-color: white; */
  background-color: rgb(225, 225, 225);
  color: rgb(7, 7, 7);
  font-size: 16px;
  width: 90px;
  white-space: nowrap;
  /* color: white; */
}

td {
  text-align: middle;
  /* padding-left: 45px; */
  /* width: 50%; */
  width: 90px;
  height: 35px;
  /* border-bottom: 1px solid #ddd; */
  border: 1px solid rgb(138, 138, 138);
  font-size: 16px;
  color: black;
  
  
  /* height: 100% */
}

/* tr {
  height: calc(100%)
} */

tr:hover{
  /* background-color: rgb(231, 164, 179); */
  height: 50px;
  background-color: #D7F4F2;
}
</style>