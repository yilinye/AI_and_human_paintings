<!--
 * @Author: Qing Shi
 * @LastEditTime: 2022-04-30 23:33:59
 * @Knowledge: 
 * @Description: 
 * @Attention: 
-->
<template>
  <div style="height:100%;overflow-x:scroll;">
    <div id="titleBar">
      <span style="text-align:center;">{{ viewName }}</span>
      <!-- <button style="float:right" @click="clearBrush($event)">Clear Brush</button> -->
    </div>
    <div id="mainHistogram" second="false" style="overflow:scroll;">
     <!-- <div v-for="(ttx)="></div> -->
     <div id="collection-container" style="display: inline-block;background-color: rgb(230,230,230);height:85px;margin-left: 10px;">
      <div id="collections-title" style="display: inline-block;width:100px;vertical-align: 35px;margin-left:20px">
        <p style="margin-bottom: 60px">Collections:</p>
        <!-- <span style="margin-bottom:30px;">Collections: </span> -->
      </div>
    
    <div id="collections-bar" style="display: inline-block;height:70px;border-left: solid 1px;">
     <p style="margin-left: 10px">
     <span>Human Collection: </span>
     <select style="margin-left: 10px; width:50px;float:right; margin-right: 8px;" id="changeHuman" @change="switchHuman($event)">
      <option value="All human art">All</option>
      <option value="SemArt">SemArt</option>
      <option value="Wiki-Emotion">Wiki-Emotion</option>
      <option value="DeviantArt">DeviantArt</option>
      
    </select>
    </p>
    <p>
    <span style="margin-left:10px">   AI Collection:  </span>
    <select id="changeAI" style="width:50px;float:right; margin-right: 8px;" @change="switchAI($event)">
      <option value="All">All</option>
      <option value="Midjourney">Midjourney</option>
      <option value="Stable">Stable Diffusion</option>
      <option value="Night">Nightcafe</option>
      
    </select>
    </p>
    </div>
    </div>
    <div id="feature-container" style="display: inline-block; margin-left: 30px">
    <p style="margin-left: 10px">
    <input type="checkbox" id="colorFeature" name="features" value="Color" checked @change="changeFeature($event)"/>Color
    <input type="checkbox" id="edgeFeature" style="margin-left: 15px" name="features" value="Edge" checked @change="changeFeature($event)"/>Edge and Texture
	  
    </p>
    <p>
      <input type="checkbox" id="qualityFeature" style="margin-left: 15px" name="features" value="Quality" checked @change="changeFeature($event)"/>Quality
	<input type="checkbox" id="compFeature" name="features" value="Composition" checked @change="changeFeature($event)"/>Composition
   </p>
   </div>
    <br>
    <div id="colortitle" style="width: 100%;height:20px;">
      <div style="display: inline-block;vertical-align: 15px;margin-left:10px"><span>Color Features</span></div>
      <div style="display: inline-block;width:515px;vertical-align: 7px;margin-left:10px"><div style="width:100%;height:4px;margin-bottom:10px;background-color: rgb(230,230,230)"></div></div>
      <!-- <div><svg style="width:100%;height:30px;"><line ></line></svg></div> -->
    </div>
    <br id="begin1" class="colorbr">
     <div
        v-for="(ty, index) in typeName1"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'colorFeature'"
        v-bind:style="{   width: wd, height:hs, left: '13px' }"
      >

      <!-- border: 'solid 1px rgba(127, 127, 127, 0.5)' -->
      </div>
      <br id="end1" class="colorbr">
      <br id="begin2" class="colorbr">
      <!-- <br> -->

      <div
        v-for="(ty, index) in typeName2"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'colorFeature'"
        v-bind:style="{  width: wd, height:hs, left: '13px'}"
      >
    </div>

    <br id="end2" class="colorbr">
    <br id="begin9" class="colorbr">
    <!-- <br> -->
    <div
        v-for="(ty, index) in typeName9"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'colorFeature'"
        v-bind:style="{  width: wd, height:hs, left: '13px' }"
      >
    </div>
    <br id="end9" class="colorbr">
    <div id="qualitytitle" style="width: 100%;height:20px;">
      <div style="display: inline-block;vertical-align: 15px;margin-left:10px"><span>Quality Features</span></div>
      <div style="display: inline-block;width:505px;vertical-align: 7px;margin-left:10px"><div style="width:100%;height:4px;margin-bottom:10px;background-color: rgb(230,230,230)"></div></div>
    </div>
    <br id="begin3" class="qualitybr">
    <!-- <br> -->
      <div
        v-for="(ty, index) in typeName3"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'qualityFeature'"
        v-bind:style="{  width: wd, height:hs, left: '13px'}"
      >
    </div>
    <br id="end3" class="qualitybr">
    <div id="edgetitle" style="width: 100%;height:20px;">
      <div style="display: inline-block;vertical-align: 15px;margin-left:10px"><span>Edge and Texture</span></div>
      <div style="display: inline-block;width:505px;vertical-align: 7px;margin-left:10px"><div style="width:100%;height:4px;margin-bottom:10px;background-color: rgb(230,230,230)"></div></div>
    </div>
    <br id="begin4" class="edgebr">
    <!-- <br> -->
    <div
        v-for="(ty, index) in typeName4"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'edgeFeature'"
        v-bind:style="{  width: wd, height:hs, left: '13px' }"
      >
    </div>
    <br id="end4" class="edgebr">
    <div id="comptitle" style="width: 100%;height:20px">
      <div style="display: inline-block;vertical-align: 15px;margin-left:10px"><span>Composition</span></div>
      <div style="display: inline-block;width:515px;vertical-align: 7px;margin-left:10px"><div style="width:100%;height:4px;margin-bottom:10px;background-color: rgb(230,230,230)"></div></div>
    </div>
    <br id="begin5" class="compbr">
    <!-- <br> -->
    <div
        v-for="(ty, index) in typeName5"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'compFeature'"
        v-bind:style="{ width: wd, height:hs, left: '13px'}"
      >
    </div>
    <br id="end5" class="compbr">
    <br id="begin6" class="compbr">
    <!-- <br> -->
    <div
        v-for="(ty, index) in typeName6"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'compFeature'"
        v-bind:style="{  width: wd, height:hs, left: '13px'}"
      >
    </div>
    <br id="end6" class="compbr">
    <br id="begin7" class="compbr">
    <!-- <br> -->
    <div
        v-for="(ty, index) in typeName7"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'compFeature'"
        v-bind:style="{  width: wd, height:hs, left: '13px'}"
      >
    </div>
    <br id="end7" class="compbr">
    <br id="begin8" class="compbr">
    <!-- <br> -->
    <div
        v-for="(ty, index) in typeName8"
        :key="ty"
        :id="'His' + ty+'0'"
        :style="'display: inline-block;margin-left:10px'"
        :class="'compFeature'"
        v-bind:style="{  width: wd, height:hs, left: '13px'}"
      >
    </div>
    <br id="end8" class="compbr">

    <!-- <div
        v-for="(ty, index) in typeName5"
        :key="ty"
        :id="'His' + ty+'1'"
        v-bind:style="{  width: wd, height:hs, left: '13px', transform: 'translate(' + (index % 4 == 0 ? '0' : index % 4 == 1 ? 'calc(100% + 12px)' : index % 4 == 2 ? 'calc(200% + 24px)': 'calc(300% + 36px)') + ',' + 'calc(' + ((Math.floor(index / 4)) * 100) + '% + ' + ((Math.floor(index / 4)) * 22) + 'px' + ' + 345px)' + ')' }"
      >
    </div> -->
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { dataService } from '../service';
var previous_selected={};
var isSecondFiltering=false;
var Hum=0
var A=0
var Redraw=0
export default {
  mounted () {
    // dataService.fetchData({ 'filePath': this.fileP.filePath }, fileData => {
    //   console.log(11111);

    //   // this.drawHistogram(fileData.data.data, this.typeName);
    // });
    this.typeName1.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName2.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName3.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName4.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName5.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName6.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName7.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName8.forEach(d => {
      this.createSVG(d,0);
    })
    this.typeName9.forEach(d => {
      this.createSVG(d,0);
    })
    // this.typeName5.forEach(d => {
    //   this.createSVG(d,1);
    // })
    // this.drawHistogram(this.fileP.filePath, this.typeName1, 0,0);
    
    // this.drawHistogram(this.fileP.filePath, this.typeName2, 0,0);
    // this.drawHistogram(this.fileP.filePath, this.typeName3, 0,0);
    // this.drawHistogram(this.fileP.filePath, this.typeName4, 0,0);
    
    // this.drawHistogram(this.fileP.filePath, this.typeName5, 0,0);
    // this.drawHistogram(this.fileP.filePath, this.typeName6, 0,0);
    // this.drawHistogram(this.fileP.filePath, this.typeName7, 0,0);
    
    // this.drawHistogram(this.fileP.filePath, this.typeName8, 0,0);
    // this.drawHistogram(this.fileP.filePath, this.typeName9, 0,0);
    this.Draw(0)
    // this.drawAll(0,0)
    // this.drawHistogram(this.fileP.filePath, this.typeName5, 1);
  },
  data () {
    return {
      viewName: "Aesthetic Features",
      typeName1: ["mean_brightness", "major_hue","mean_saturation"],
      // typeName2: ["blurriness"],
      typeName2: ["brightness_contrast","hue_contrast","major_hue_ratio"],
      typeName3: ["blurriness","mean_entropy"],
      typeName4: ["edge_area","mean_edge_energy_ratio","bbx_area"],
      typeName5: ["mean_x1","mean_x2","mean_x3"],
      typeName6: ["mean_y1","mean_y2","mean_y3"],
      typeName7: ["variance1","variance2","variance3"],
      typeName8: ["skewness1","skewness2","skewness3"],
      typeName9: ["focus_hue","focus_brightness","focus_saturation"],
      // typeName2: ["average_brightness", "brightness_contrast","blurriness"],
      // typeName5: ["blurriness"],
      // typeName6: ["hue_count","average_hue","average_saturation","hue_contrast"],
      // hs: "calc(16.6% - 12px)",
      // hs: "calc(23.6% - 12px)",
      // hs: "calc(28.6% - 12px)",
      hs: "115px",
      // wd: "calc(50% - 15px)",
      // wd: "calc(33% - 15px)",
      // wd: "calc(25% - 15px)",
      wd: "calc(34% - 15px)",
      selectType: '',
      xAxis: undefined,
      yAxis: {},
      hisWidth: 0,
      hisHeight: 0,
      levelCluster: {
        "Beagle": ['Circle', 'Map', 'Line', 'Area', 'Bar', 'Net', 'Point', 'Diagram', 'Matrix', 'Table', 'Word'],
        "VIS": ["Map", "Circle", "Bar", "Point", "Line", "Diagram", "Matrix", "Net", "Area", "Table", "Word"],
        "Data": ["Area", "Line", "Bar", "Point", "Diagram", "Matrix", "Net","Circle",'Table', 'Word',"Map"]
      },

    };
  },
  inject: ['fileP'], // get file path from visView.vue
  methods: {
    /**
     * @description: create svg for every histogram
     * @param {*} hisType Feature
     * @return {*}
     */    
    createSVG: function (hisType,id) {
      d3.select("#" + hisType+id.toString() + 'Svg').remove();
      // const hisHeight = document.getElementById(('His' + hisType+id.toString())).offsetHeight;
      // const hisWidth = document.getElementById(('His' + hisType+id.toString())).offsetWidth;
      const hisHeight = 110
      // const hisWidth = 150
      const hisWidth = 190
      this.hisHeight = hisHeight;
      this.hisWidth = hisWidth;
      d3.select('#His' + hisType+id.toString())
        .append('svg')
        .attr('id', hisType+ id.toString() + 'Svg')
        .attr('width', hisWidth)
        .attr('height', hisHeight)
        .style('border', 'solid 1px rgba(127, 127, 127, 0.5)')
        .style('overflow', 'visible')
      d3.select('#' + hisType+ id.toString() + 'Svg')
        .append('rect')
        // .attr('y', 15)
        .attr('y', -9)
        .attr('x', hisWidth / 2-30)
        .attr('width', 60)
        .attr('height', 20)
        .style('fill','white')

      d3.select('#' + hisType+id.toString() + 'Svg')
        .append('text')
        .text(hisType)
        .attr('font-size', 15)
        .attr('text-anchor', 'middle')
        // .attr('y', 15)
        .attr('y', 5)
        .attr('x', hisWidth / 2)
    },
    Draw: function(redraw){
        this.drawAll(Hum,A, redraw);
    },
    /**
     * @description: 
     * @param {String} 
     * @param {Array} 
     * @return {*}
     */
    switchHuman: function(e){
      let datasetName=d3.select("#changeHuman").property("value");
      if (datasetName=="SemArt")
      {
         Hum=2
         this.drawAll(2,A);
      }
      else if (datasetName=="Wiki-Emotion")
      {
        Hum=1 
        this.drawAll(1,A);
      }
      else if (datasetName=="All human art")
      {
        Hum=0 
        this.drawAll(0,A);
      }
      else if (datasetName=="DeviantArt")
      {
        Hum=3
        this.drawAll(3,A);
      }
    },
        /**
     * @description: 
     * @param {String} 
     * @param {Array} 
     * @return {*}
     */
     switchAI: function(e){
      let datasetName=d3.select("#changeAI").property("value");
      if (datasetName=="Midjourney")
      {
        A=3 
        this.drawAll(Hum,3);
      }
      else if (datasetName=="Stable")
      {
        A=2 
        this.drawAll(Hum,2);
      }
      else if (datasetName=="Night")
      {
        A=1 
        this.drawAll(Hum,1);
      }
      else if (datasetName=="All")
      {
        A=0 
        this.drawAll(Hum,0);
      }
    },
        /**
     * @description: 
     * @param {String} 
     * @param {Array} 
     * @return {*}
     */
     changeFeature: function(e){
      let Featuresets=["colorFeature","qualityFeature", "edgeFeature", "compFeature"];
      let featurebrs=["colorbr","qualitybr","edgebr","compbr"]
      for (let i=0;i<Featuresets.length;i++)
      {
        if (d3.select("#"+Featuresets[i]).property("checked")==true)
        {
          d3.selectAll("."+Featuresets[i]).style("display","inline-block")
          d3.selectAll("."+featurebrs[i]).style("display","block")
        }
        else{
          d3.selectAll("."+Featuresets[i]).style("display","none")
          d3.selectAll("."+featurebrs[i]).style("display","none")
        }
      } 

    },
    /**
     * @description: 
     * @param {String} 
     * @param {Array} 
     * @return {*}
     */
     drawAll: function(human, AI, redraw){
      this.drawHistogram(this.fileP.filePath, this.typeName1, 0,human, AI, redraw);
    
      this.drawHistogram(this.fileP.filePath, this.typeName2, 0,human, AI, redraw);
      this.drawHistogram(this.fileP.filePath, this.typeName3, 0,human, AI, redraw);
      this.drawHistogram(this.fileP.filePath, this.typeName4, 0,human, AI, redraw);
      
      this.drawHistogram(this.fileP.filePath, this.typeName5, 0,human, AI, redraw);
      this.drawHistogram(this.fileP.filePath, this.typeName6, 0,human, AI, redraw);
      this.drawHistogram(this.fileP.filePath, this.typeName7, 0,human, AI, redraw);
      
      this.drawHistogram(this.fileP.filePath, this.typeName8, 0,human, AI, redraw);
      this.drawHistogram(this.fileP.filePath, this.typeName9, 0,human, AI, redraw);
    },
    /**
     * @description: data processing and use function
     * @param {String} filePath: which file will be used, selected in modelView.vue
     * @param {Array} hisTypeArray: Feature Group
     * @return {*}
     */
    drawHistogram: function (filePath, hisTypeArray, id, human, AI, redraw) {
      d3.csv(filePath).then((fileData0) => {
        let fileData=new Array();
        let fileData1=new Array();
        if (id==0)
        {
          for (let u=0;u<fileData0.length;u++)
          {
            if (redraw==0){
              if (human==0)
            {
              if (u<21384 || u>=21384+7345)
                {
                  fileData.push(fileData0[u])
                }
              // else{
                
              //   fileData1.push(fileData0[u])
              // }
            }
            else if (human==1)
            {
              if (u>=21384+7345)
                {
                  fileData.push(fileData0[u])
                }
              // else if (u>=21384 && u<21384+7345){
              //   fileData1.push(fileData0[u])
              // }
            }
            else if (human==2)
            {
              if (u<21384)
                {
                  fileData.push(fileData0[u])
                }
              // else if (u>=21384 && u<21384+7345){
              //   fileData1.push(fileData0[u])
              // }
            }
            else if (human==3)
            {
              if (u>=32848+4425+4615)
                {
                  fileData.push(fileData0[u])
                }
            }

            if (AI==0)
            {
              if ((u>=21384&&u<21384+7345)||u>=32848)
              {
                fileData1.push(fileData0[u]);
              }
            }
            else if (AI==1)
            {
              if(u>=32848+4425)
              {
                fileData1.push(fileData0[u]);
              }
            }
            else if (AI==2)
            {
              if(u>=32848 && u<32848+4425)
              {
                fileData1.push(fileData0[u]);
              }
            }
            else if(AI==3)
            {
              if (u>=21384&&u<21384+7345)
              {
                fileData1.push(fileData0[u]);
              }
            }
            }
            else if (d3.select('#cir' + u).attr("opacity")!="0")
            {
            if (human==0)
            {
              if (u<21384 || u>=21384+7345)
                {
                  fileData.push(fileData0[u])
                }
              // else{
                
              //   fileData1.push(fileData0[u])
              // }
            }
            else if (human==1)
            {
              if (u>=21384+7345)
                {
                  fileData.push(fileData0[u])
                }
              // else if (u>=21384 && u<21384+7345){
              //   fileData1.push(fileData0[u])
              // }
            }
            else if (human==2)
            {
              if (u<21384)
                {
                  fileData.push(fileData0[u])
                }
              // else if (u>=21384 && u<21384+7345){
              //   fileData1.push(fileData0[u])
              // }
            }
            else if (human==3)
            {
              if (u>=32848+4425+4615)
                {
                  fileData.push(fileData0[u])
                }
            }

            if (AI==0)
            {
              if ((u>=21384&&u<21384+7345)||u>=32848)
              {
                fileData1.push(fileData0[u]);
              }
            }
            else if (AI==1)
            {
              if(u>=32848+4425)
              {
                fileData1.push(fileData0[u]);
              }
            }
            else if (AI==2)
            {
              if(u>=32848 && u<32848+4425)
              {
                fileData1.push(fileData0[u]);
              }
            }
            else if(AI==3)
            {
              if (u>=21384&&u<21384+7345)
              {
                fileData1.push(fileData0[u]);
              }
            }
          }
          }
        }
        else if (id==1)
        {
          for (let u=0;u<fileData0.length;u++)
          {
            // if (u>=21384 && u<21384+7345)
            //   {
            //     fileData.push(fileData0[u])
            //   }
            if (u<21384 || u>=21384+7345)
              {
                let n=1
              }
            else{
              fileData.push(fileData0[u])
            }
          }
        }
        // console.log("filedata1")
        // console.log(fileData1.length)
        hisTypeArray.forEach(hisType => {
          // index name need small letters
          // let hisTag = hisType.toLowerCase();
          var hisData0 = new Object();
          var hisData = new Object();
          var hisData1= new Object();
          let min_v=100000
          let max_v=-100000
          let tics=20;
          if (hisType=="color_template")
          {
            tics=6;
          }
          
          for (let i = 0; i < fileData0.length; ++i) {
            // let indexNum = Math.floor(parseFloat(fileData[i][hisTag]) * 10);
            let attr_value = parseFloat(fileData0[i][hisType]);
            if (attr_value>max_v)
            {
              max_v=attr_value;
            }
            if (attr_value<min_v)
            {
              min_v=attr_value;
            }

            // if (indexNum == 10) indexNum--; // let 1 to 0.9 ~ 1
            // if (indexNum == 0) continue;
            // if (typeof (hisData[indexNum]) == 'undefined') {
            //   hisData[indexNum] = { cnt: 0, items: [] };
            // }
            // hisData[indexNum].cnt++;
            // hisData[indexNum].items.push(fileData[i]);
          }
          // console.log("min")
          //   console.log(min_v)
          //   console.log("max")
          //   console.log(max_v)
          var x = d3.scaleLinear()
              .domain([min_v, max_v])     
              .range([0, this.hisWidth - 45]);
          var bin_generator = d3.histogram()
              .value(function(d) { return parseFloat(d[hisType]); })   
              .domain([min_v,max_v])  // then the domain of the graphic
              .thresholds(x.ticks(tics)); // then the numbers of bins
          let binsData=bin_generator(fileData0);
          let binsData1=bin_generator(fileData1);
          
          // console.log(binsData)
          // console.log(binsData1)
          // for (let i = 0; i < fileData0.length; ++i) {
          //   let indexNum = Math.floor(binsData.length*(parseFloat(fileData0[i][hisType])-min_v)/(max_v-min_v));
          //   if (typeof (hisData[indexNum]) == 'undefined') {
          //     hisData[indexNum] = { cnt: 0, items: [], x0: 0, x1: 0 };
          //   }
          // }
          if (hisType!="color_template")
          {
            for (let hd =0;hd<binsData.length;hd++)
            {
              let right=binsData[hd].x1;
              let left=binsData[hd].x0;
              if (right==left)
              {
                right=left+(max_v-min_v)/binsData.length
              }
              hisData[hd]={ cnt: 0, items: [], x0: left, x1: right };
            }
          }
          else
          {
            for (let i=0;i<7;i++)
            {hisData[i]={ cnt: 0, items: [], x0: i, x1: i+1 };}
          }
          let min0=1000
          for (let i = 0; i < fileData.length; ++i) {
            let indexNum
            if (hisType!="color_template")
            {
            // indexNum = Math.floor(binsData.length*(parseFloat(fileData[i][hisType])-min_v)/(max_v-min_v));
            for (let ind in hisData)
            {
              if (parseFloat(fileData[i][hisType])>=hisData[ind].x0 && parseFloat(fileData[i][hisType])<hisData[ind].x1)
              {
                indexNum=ind;
              }
            }
            }
            else
            {
              for (let ind in hisData)
            {
              if (parseFloat(fileData[i][hisType])>=hisData[ind].x0 && parseFloat(fileData[i][hisType])<hisData[ind].x1)
              {
                indexNum=ind;
              }
            }
            }
            if (typeof (hisData[indexNum]) == 'undefined') {
              hisData[indexNum] = { cnt: 0, items: [], x0: 0, x1: 0 };
            }
            // hisData0[indexNum].cnt++;
            // hisData0[indexNum].items.push(fileData0[i]);
            // hisData0[indexNum].x0=indexNum*(max_v-min_v)/(binsData.length)
            // hisData0[indexNum].x1=(indexNum+1)*(max_v-min_v)/(binsData.length)
            hisData[indexNum].cnt++;
            hisData[indexNum].items.push(fileData[i]);
            // hisData[indexNum].x0=min_v+indexNum*(max_v-min_v)/(binsData.length)
            // hisData[indexNum].x1=min_v+(indexNum+1)*(max_v-min_v)/(binsData.length)
            if (parseFloat(fileData[i][hisType])<min0){min0=parseFloat(fileData[i][hisType])}
          }
          // console.log("min0")
          //   console.log(fileData1.length)
          //   console.log(min0)
          // for (let i in hisData0)
          // {
          //   hisData[i] = { cnt: 0, items: [], x0: hisData0[i].x0, x1: hisData0[i].x1 };
          // }
          // for (let i = 0; i < fileData.length; ++i) {
          //   let indexNum = Math.floor(binsData.length*(parseFloat(fileData[i][hisType])-min_v)/(max_v-min_v));
          //   hisData[indexNum].cnt++;
          //   hisData[indexNum].items.push(fileData[i]);
          // }
          if (id==0){
          for (let i in hisData)
          {
            hisData1[i] = { cnt: 0, items: [], x0: hisData[i].x0, x1: hisData[i].x1 };
          }
          let min1=1000
          for (let i = 0; i < fileData1.length; ++i) {
            // let indexNum = Math.floor(binsData.length*(parseFloat(fileData1[i][hisType])-min_v)/(max_v-min_v));
            for (let indexNum in hisData)
            {
              if (parseFloat(fileData1[i][hisType])>=hisData[indexNum].x0 && parseFloat(fileData1[i][hisType])<hisData[indexNum].x1)
              {
                hisData1[indexNum].cnt++;
                // if (hisType=="hue_contrast")
                // {
                //   console.log(hisType)
                //   console.log("fuck")
                // }
                
                hisData1[indexNum].items.push(fileData1[i]);
              }

            }
            if (parseFloat(fileData1[i][hisType])<min1){min1=parseFloat(fileData1[i][hisType])}

          }
          // if (hisType=="hue_contrast")
          // {
          //   console.log("test")
          //   console.log(fileData1[0][hisType])
          //   console.log(binsData1)
          // }
          // console.log("his1")
          // console.log(hisData1)
          // for (let i = 0; i < fileData1.length; ++i) {
          //   let indexNum = Math.floor(binsData.length*(parseFloat(fileData1[i][hisType])-min_v)/(max_v-min_v));
          //   if (typeof (hisData1[indexNum]) == 'undefined') {
          //     hisData1[indexNum] = { cnt: 0, items: [], x0: 0, x1: 0 };
          //   }
          //   // hisData0[indexNum].cnt++;
          //   // hisData0[indexNum].items.push(fileData0[i]);
          //   // hisData0[indexNum].x0=indexNum*(max_v-min_v)/(binsData.length)
          //   // hisData0[indexNum].x1=(indexNum+1)*(max_v-min_v)/(binsData.length)
          //   hisData1[indexNum].cnt++;
          //   hisData1[indexNum].items.push(fileData1[i]);
          //   hisData1[indexNum].x0=indexNum*(max_v-min_v)/(binsData.length)
          //   hisData1[indexNum].x1=(indexNum+1)*(max_v-min_v)/(binsData.length)
          // }
          // console.log("min1")
          // console.log(fileData1.length)
          // console.log(min1)
         }
          // var x = d3.scaleLinear()
          //     .domain([min_v, max_v])     
          //     .range([0, width]);
            //   // set the parameters for the histogram
          // var bin_generator = d3.histogram()
          //     .value(function(d) { return d[hisTag]; })   
          //     .domain([min_v,max_v])  // then the domain of the graphic
          //     .thresholds(x.ticks(10)); // then the numbers of bins
          // remove old View
          d3.select("#his_g_" + hisType+id.toString()).remove();
          // define new View
          d3.select("#" + hisType+id.toString() + "Svg")
            .append('g')
            .attr("id", "his_g_" + hisType+id.toString());
          this.drawRectAndAxis(hisData, hisData1, hisType, binsData.length, min_v, max_v,id,human, AI);
          // this.drawRectAndAxis(hisData, hisType);
          // this.drawSelectRect(hisData, hisType);
          // this.RectBrush(hisData, hisType);
        })
      });
    },
    /**
     * @description: draw bar charts and x/y axises
     * @param {Array} hisData bar chart data
     * @param {String} hisType Feature
     * @return {*}
     */    
    drawRectAndAxis: function (hisData, hisData1, hisType,tics, min_v, max_v,id, human, AI) {
      // remove old View
      d3.select("#his_rect_g_" + hisType+id.toString()).remove();
      // define new View
      const his_g = d3.select("#his_g_" + hisType+id.toString())
        .append('g')
        .attr("id", "his_rect_g_" + hisType+id.toString());
      // console.log("his1")
      // console.log(hisData)
      // console.log("his2")
      // console.log(hisData1)
      if (hisType=="color_template")
      {
        max_v=7;
      }
      const hisArray = new Array();
      const x0Array = new Array();
      const x1Array = new Array();
      let m0=d3.max(hisArray)
      let total=0
      for (let i in hisData)
      {
        total+=hisData[i].cnt
      }
      for (let i in hisData)
      {
        hisArray.push(hisData[i].cnt/total)
        x0Array.push(hisData[i].x0)
        x1Array.push(hisData[i].x1)
      }
      const hisArray1 = new Array();
      const x0Array1 = new Array();
      const x1Array1 = new Array();
      let total1=0
      for (let i in hisData1)
      {
        total1+=hisData1[i].cnt
      }
      for (let i in hisData1)
      {
        hisArray1.push(hisData1[i].cnt/total1)
        x0Array1.push(hisData1[i].x0)
        x1Array1.push(hisData1[i].x1)
      }
      let m1=d3.max(hisArray1)
      let M;
      if (m1>m0)
      {
        M=m1;
      }
      else{
        M=m0
      }
      var xAxis = d3.scaleLinear()
        .domain([min_v-0.1*(max_v-min_v), max_v+0.1*(max_v-min_v)])
        .range([0, this.hisWidth - 45])


      // if (id==1)
      // {
      //   console.log("max_b")
      //   console.log(max_v)
      //   console.log("x0_array")
      //   console.log(hisData)
      // }
      // var xAxis = d3.scaleLinear()
      //   .domain([min_v, max_v])
      //   .range([0, this.hisWidth - 45])
      if (hisType=="hue_contrast")
      {
        console.log("hcontrast")
        console.log(d3.max(hisArray))
        console.log(hisArray)
        console.log("hcontrast1")
        console.log(d3.max(hisArray1))
      }
      var yAxis = d3.scaleLinear()
        .domain([0, d3.max([d3.max(hisArray1),d3.max(hisArray)])])
        .range([this.hisHeight - 42, 0]);
      this.xAxis = xAxis;
      this.yAxis[hisType] = yAxis;

      his_g.append('g').attr("class","grid")
      .call(d3.axisLeft(yAxis).ticks(4).tickSize(-this.hisWidth + 45).tickFormat(""))
      .attr("transform", `translate(${35}, ${20})`);

      let humanColor;
      if (human==0)
      {
        humanColor="rgb(198,198,198)"
      }
      else if (human==1)
      {
        humanColor="#b3cde3"
      }
      else if (human==2)
      {
        humanColor="#fed9a6"
      }
      else if (human==3)
      {
        humanColor="#ffffcc"
      }
      let AIcolor;
      if (AI==0)
      {
        AIcolor="#8dd3c7"
      }
      else if (AI==1)
      {
        AIcolor="#decbe4"
      }
      else if (AI==2)
      {
        AIcolor="#fbb4ae"
      }
      else if (AI==3)
      {
        AIcolor="#ccebc5"
      }
      
      his_g.append('g')
        .selectAll("#hisRect" + hisType+id.toString())
        .attr('id', "hisRect" + hisType+id.toString())
        .data(hisArray)
        .enter()
        .append('rect')
        .attr("dmax", d3.max(hisArray))
        .attr("val",(d,i)=>{return d})
        .attr("x0",(d,i)=>{return x0Array[i]})
        .attr('x', (d, i) => {
          return xAxis(x0Array[i])+35;
        })
        .attr('y', (d, i) => {
          return yAxis(d) + 20;
        })
        .attr('height', d => {
          // console.log(this.hisHeight - 42 - this.yAxis[hisType](d))
          return this.hisHeight - 42 - yAxis(d)
        })
        // .attr('width', 17)
        // .attr('width', 6)
        .attr("width",(d,i)=> {
          // console.log(this.xAxis(x1Array[i])-this.xAxis(x0Array[i]))
          return xAxis(x1Array[i])-xAxis(x0Array[i])})
        // .attr('fill', "rgb(198, 198, 198)");
        // .attr("fill","#b3cde3")
        // .attr("fill","#fed9a6")
        .attr("fill",humanColor)

      // d3.select("#"+"hisRect" + hisType+id.toString())
      if (id==0)
      {
      his_g.append('g')
        .selectAll("#hisRect" + hisType+id.toString())
        .attr('id', "hisRect" + hisType+id.toString())
        .data(hisArray1)
        .enter()
        .append('rect')
        .attr("dmax", d3.max(hisArray1))
        .attr("val",(d,i)=>{return d})
        .attr("x0",(d,i)=>{return x0Array1[i]})
        .attr('x', (d, i) => {

          return xAxis(x0Array1[i])+35;

        })
        .attr('y', (d, i) => {
          return yAxis(d) + 20;
        })
        .attr('height', d => {
          // console.log(this.hisHeight - 42 - this.yAxis[hisType](d))
          return this.hisHeight - 42 - yAxis(d)
        })
        // .attr('width', 17)
        // .attr('width', 6)
        .attr("width",(d,i)=> {
          // console.log(this.xAxis(x1Array1[i])-this.xAxis(x0Array1[i]))
          return xAxis(x1Array1[i])-xAxis(x0Array1[i])})
        .attr('fill', AIcolor)
        .attr('fill-opacity', 0.5);
      }
      // draw Axis
      let tick=5
      if (hisType=="color_template")
      {
        tick=7
      }
      his_g.append('g')
        .call(d3.axisBottom(xAxis).ticks(tick))
        .attr("transform", `translate(${35}, ${this.hisHeight - 22})`);
      his_g.append('g')
        .call(d3.axisLeft(yAxis).ticks(4))
        // .call(d3.axisLeft(yAxis))
        .attr("transform", `translate(${35}, ${20})`);

    },
    /**
     * @description: draw bar charts which be select. I draw them without height. When I select some data, I will change the height of them.
     * @param {*} hisData bar chart data
     * @param {*} hisType Feature
     * @return {*}
     */    
    drawSelectRect: function (hisData, hisType) {
      // remove old View
      d3.select("#his_sel_g_" + hisType).remove();
      // define new View
      const his_g = d3.select("#his_g_" + hisType)
        .append('g')
        .attr('class', '#his_sel_g')
        .attr("id", "his_sel_g_" + hisType);

      const hisArray = new Array();
      for (let i in hisData)
        hisArray.push(hisData[i].cnt);
      // console.log()
      his_g.append('g')
        .selectAll("#hisSelRect" + hisType)
        .attr('id', "hisSelRect" + hisType)
        .data(hisArray)
        .enter()
        .append('rect')
        .attr("dmax", this.yAxis[hisType].domain()[1])
        .attr("hisHeight", this.hisHeight)
        .attr("class","selrect")
        .attr("id", (d, i) => {
          return "sel" + hisType + (i + 1);
        })
        .attr('x', (d, i) => {
          // return this.xAxis((i + 1) / 10) + 40;
          return this.xAxis((i + 1) / 10) + 40;
        })
        .attr('y', (d, i) => {
          return this.hisHeight - 20;
        })
        .attr('height', d => {
          return 0;
        })
        // .attr('width', 17)
        .attr('width', 10)
        // .attr('fill', "orange");
        .attr('fill', "#95BCBA");
    },
    /**
     * @description: second step of filtering
     * @param {*} hisData bar chart data
     * @param {*} hisType Feature
     * @return {*}
     */  
    FilterIter: function (hisData, hisType)
    {

    },
    /**
     * @description: clear brush 
     * @param {*} e event
     * @return {*}
     */    
    clearBrush: function (e) {
      d3.selectAll('.brush_rect').remove();
      // if (d3.select("#cir"+d.pid).attr("")
      d3.selectAll('.rad_cir').attr('r', d=>{ return d.show == 'true' ? 2 : 0;});
      d3.selectAll('.selrect').attr('height',0)
      d3.select("#drawn").attr("d",null);
      d3.select("#loop_close").attr("d",null);
      isSecondFiltering=false;
      d3.select("#mainHistogram").attr("second","false");
    },
    /**
     * @description: a brush. Select areas in the bar chart 
     * @param {*} hisData bar chart data
     * @param {*} hisType Feature
     * @return {*}
     */    

    RectBrush (hisData, hisType) {

      let _this = this;
      const hisArray = new Array();
      for (let i in hisData)
        hisArray.push(hisData[i].cnt);
      if (d3.select("#mainHistogram").attr("second")=="false")
      {
        isSecondFiltering=false;
      }
      else
      {
        isSecondFiltering=true;
      }
      const brush = d3.brush()
        .extent([
          [30, 15],
          [_this.hisWidth - 5, _this.hisHeight - 10]
        ])
        .on('start', function ({ selection }) {
          if (selection != null && isSecondFiltering==false) {
            d3.selectAll('.brush_rect').remove();
          }
        })
        // .on('brush', brushing)
        .on('end', brushed);
      // console.log(hisData)
      const brush_g = d3.select("#his_g_" + hisType)
        .append('g')
        .attr('id', 'brush_g' + hisType)
        .call(brush);

      // I really don't like programing this function, but it's the method which can clear the brush.
      function brushed ({ selection }) {
        //console.log(isSecondFiltering)
        // console.log(previous_selected)
        
        if (selection != null) {
          d3.selectAll(".select_circle").remove();
          d3.select("#mainScatter_g").attr("afterhis","true")
          console.log(previous_selected)
          if (d3.select("#mainHistogram").attr("second")=="false")
          {
            isSecondFiltering=false;
          }
          else
          {
            isSecondFiltering=true;
          }
          if (isSecondFiltering==false){
          const [
            [x0, y0],
            [x1, y1]
          ] = selection;
          d3.select('#his_g_' + hisType)
            .append("rect")
            .attr('class', 'brush_rect')
            .attr('x', x0)
            .attr('y', y0)
            .attr('width', x1 - x0)
            .attr('height', y1 - y0)
            .attr('fill', 'white')
            .attr('fill-opacity', 0)
            .attr('stroke', '#2378ae')
            .attr('stroke-dasharray', '4, 4')
            .attr('stroke-width', 3);

          let levelType = undefined;
          let pidScatter = {};

        let filePath = _this.fileP.filePath;
        if (filePath[13] == 'B') {
          levelType = _this.levelCluster["Beagle"];
        }

        if (filePath[13] == 'v') {
          levelType = _this.levelCluster["VIS"];
        }

        if (filePath[13] == 'd') {
          levelType = _this.levelCluster["Data"];
        }
          let treeCnt = {};
          levelType.forEach(d => {
            treeCnt[d.toLowerCase()] = {
              value: 0,
              id: d
            }
          })
          let selectData = {};
          _this.typeName.forEach(d => {
            selectData[d] = {};
            for (let i = 1; i <= 9; ++i)
              selectData[d][i] = { cnt: 0 };
          })
          for (let i = 0; i < 9; ++i) {
            if (x0 < _this.xAxis((i + 1) / 10) + 35 + 5 && _this.xAxis((i + 1) / 10) + 35 + 5 < x1) {
              hisData[i + 1].items.forEach(d => {
                pidScatter[d.pid] = 1;
                // d3.select("#rad_cir" + d.pid).attr('opacity', 1).attr('r', 4);
                let lassoflag=d3.select("#cir" + d.pid).attr("state")
                _this.typeName.forEach(hisTag => {
                  let indexNum = Math.floor(parseFloat(d[hisTag.toLowerCase()]) * 10);
                  if (indexNum == 10) indexNum--; // let 1 to 0.9 ~ 1
                  if (indexNum != 0 && (lassoflag=="bflasso"||lassoflag=="lasso")) {
                    selectData[hisTag][indexNum].cnt++;
                  }
                })
                // console.log(treeCnt)
                // console.log(d['class'])
                if (lassoflag=="bflasso"||lassoflag=="lasso")
                {treeCnt[d['class']].value++;}
              })
            }
          }
          previous_selected=pidScatter;
          isSecondFiltering=true;
          d3.select("#mainHistogram").attr("second","true")

          console.log(d3.select("#cir1000").attr("state"))
          d3.selectAll('.rad_cir')
            .attr('r', d => {
              if (d3.select("#cir"+d.pid).attr("state")=="bflasso")
              {return pidScatter[d.pid] == 1 ? 2 : 0;}
              else if (d3.select("#cir"+d.pid).attr("state")=="unlasso")
              {
                return 0;
              }
              else
              {
                return pidScatter[d.pid] == 1 ? 2 : 0;
              }
            })
            .attr('show',d =>{
              if (d3.select("#cir"+d.pid).attr("state")=="bflasso")
              {return pidScatter[d.pid] == 1 ? "true" : "false";}
              else if (d3.select("#cir"+d.pid).attr("state")=="unlasso")
              {
                return "false";
              }
              else
              {
                return pidScatter[d.pid] == 1 ? "true" : "false";
              }
            })
            .attr('hisShow',d =>{
              if (d3.select("#cir"+d.pid).attr("state")=="bflasso")
              {return pidScatter[d.pid] == 1 ? "true" : "false";}
              else if (d3.select("#cir"+d.pid).attr("state")=="unlasso")
              {
                return "false";
              }
              else
              {
                return pidScatter[d.pid] == 1 ? "true" : "false";
              }
            })
          // console.log(selectData)
          for (let i in selectData) {
            for (let j in selectData[i]) {
              d3.select("#sel" + i + (j))
                .transition().duration(1000)
                .attr('y', _this.yAxis[i](selectData[i][j].cnt) + 20)
                .attr("height", _this.hisHeight - 42 - _this.yAxis[i](selectData[i][j].cnt));
            }
          }
          let treeData = [];
          let sumTree = 0;
          for (let i in treeCnt) {
            if (treeCnt[i].value > 0) {
              treeData.push({
                value: treeCnt[i].value,
                id: treeCnt[i].id.toLowerCase(),
                top: sumTree
              });
              sumTree += treeCnt[i].value;
            }
          }
          // _this.updateTree(treeData, sumTree);
          // clear brush
          d3.select(this).call(brush.move, null);
        }
              else 
      {
            // console.log(previous_selected)
            // if (selection != null) {
              console.log(isSecondFiltering)
          const [
            [x0, y0],
            [x1, y1]
          ] = selection;
          d3.select('#his_g_' + hisType)
            .append("rect")
            .attr('class', 'brush_rect')
            .attr('x', x0)
            .attr('y', y0)
            .attr('width', x1 - x0)
            .attr('height', y1 - y0)
            .attr('fill', 'white')
            .attr('fill-opacity', 0)
            .attr('stroke', '#2378ae')
            .attr('stroke-dasharray', '4, 4')
            .attr('stroke-width', 3);

          let levelType = undefined;
          let pidScatter = {};

        let filePath = _this.fileP.filePath;
        if (filePath[13] == 'B') {
          levelType = _this.levelCluster["Beagle"];
        }

        if (filePath[13] == 'v') {
          levelType = _this.levelCluster["VIS"];
        }

        if (filePath[13] == 'd') {
          levelType = _this.levelCluster["Data"];
        }
          let treeCnt = {};
          levelType.forEach(d => {
            treeCnt[d.toLowerCase()] = {
              value: 0,
              id: d
            }
          })
          let selectData = {};
          _this.typeName.forEach(d => {
            selectData[d] = {};
            for (let i = 1; i <= 9; ++i)
              selectData[d][i] = { cnt: 0 };
          })
          console.log(previous_selected)
          isSecondFiltering=false
          d3.select("#mainHistogram").attr("second","false")

          for (let i = 0; i < 9; ++i) {
            if (x0 < _this.xAxis((i + 1) / 10) + 35 + 5 && _this.xAxis((i + 1) / 10) + 35 + 5 < x1) {
              hisData[i + 1].items.forEach(d => {
                if (previous_selected[d.pid]==1)
                {pidScatter[d.pid] = 1;
                let lassoflag=d3.select("#cir" + d.pid).attr("state")
                // d3.select("#rad_cir" + d.pid).attr('opacity', 1).attr('r', 4);
                _this.typeName.forEach(hisTag => {
                  let indexNum = Math.floor(parseFloat(d[hisTag.toLowerCase()]) * 10);
                  if (indexNum == 10) indexNum--; // let 1 to 0.9 ~ 1
                  if (indexNum != 0 && (lassoflag=="bflasso"||lassoflag=="lasso")) {
                    selectData[hisTag][indexNum].cnt++;
                  }
               
                })
                
                // console.log(treeCnt)
                // console.log(d['class'])
                if (lassoflag=="bflasso"||lassoflag=="lasso")
                {treeCnt[d['class']].value++;}
                }
              })
            }
          }
          // previous_selected=pidScatter;
          // isSecondFiltering=true;
          // d3.selectAll('.rad_cir')
          //   .attr('r', d => {
              
          //     return pidScatter[d.pid] == 1 ? 2 : 0;
          //   })
          //   .attr('show',d =>{
          //     return pidScatter[d.pid] == 1 ? "true":"false"
          //   })
          d3.selectAll('.rad_cir')
            .attr('r', d => {
              if (d3.select("#cir"+d.pid).attr("state")=="bflasso")
              {return pidScatter[d.pid] == 1 ? 2 : 0;}
              else if (d3.select("#cir"+d.pid).attr("state")=="unlasso")
              {
                return 0;
              }
              else
              {
                return pidScatter[d.pid] == 1 ? 2 : 0;
              }
            })
            .attr('show',d =>{
              if (d3.select("#cir"+d.pid).attr("state")=="bflasso")
              {return pidScatter[d.pid] == 1 ? "true" : "false";}
              else if (d3.select("#cir"+d.pid).attr("state")=="unlasso")
              {
                return "false";
              }
              else
              {
                return pidScatter[d.pid] == 1 ? "true" : "false";
              }
            })
            .attr('hisShow',d =>{
              if (d3.select("#cir"+d.pid).attr("state")=="bflasso")
              {return pidScatter[d.pid] == 1 ? "true" : "false";}
              else if (d3.select("#cir"+d.pid).attr("state")=="unlasso")
              {
                return "false";
              }
              else
              {
                return pidScatter[d.pid] == 1 ? "true" : "false";
              }
            })
          // console.log(selectData)
          for (let i in selectData) {
            for (let j in selectData[i]) {
              d3.select("#sel" + i + (j))
                .transition().duration(1000)
                .attr('y', _this.yAxis[i](selectData[i][j].cnt) + 20)
                .attr("height", _this.hisHeight - 42 - _this.yAxis[i](selectData[i][j].cnt));
            }
          }
          let treeData = [];
          let sumTree = 0;
          for (let i in treeCnt) {
            if (treeCnt[i].value > 0) {
              treeData.push({
                value: treeCnt[i].value,
                id: treeCnt[i].id.toLowerCase(),
                top: sumTree
              });
              sumTree += treeCnt[i].value;
            }
          }
          // _this.updateTree(treeData, sumTree);
          // clear brush
          d3.select(this).call(brush.move, null);
        
      }
      }

    }
    },
    /**
     * @description: update Dendrogram
     * @param {Array} treeData data of the tree
     * @param {Int} sumTree Number of all selected elements
     * @return {*}
     */    
    updateTree (treeData, sumTree) {
      this.$emit('updateTree', treeData, sumTree);
    }
  },
  watch: {
    fileP: {
      handler (newValue, oldValue) {
        console.log(newValue)
        this.drawHistogram(this.fileP.filePath, this.typeName1);
        this.drawHistogram(this.fileP.filePath, this.typeName2);
        this.drawHistogram(this.fileP.filePath, this.typeName3);
      },
      deep: true
    }
  }
}
</script>

<style>
#mainHistogram {
  height: calc(100% - 30px);
  width: calc(100%);
  overflow: auto;
  /* background-color: #000; */
}
.selection {
  fill: none;
  stroke: #2378ae;
  stroke-width: 3;
  stroke-dasharray: 4, 4;
}
</style>