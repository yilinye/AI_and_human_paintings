<!--
 * @Author: Qing Shi
 * @LastEditTime: 2022-04-30 21:10:38
 * @Knowledge: 
 * @Description: 
 * @Attention: 
-->
<template>
  <div>
    <div id="titleBar">
      {{ viewName }}
    </div>
    <div id="mainHistogram">
      <div
        v-for="(ty, index) in typeName"
        :key="ty"
        :id="'His' + ty"
        v-bind:style="{ border: 'solid 1px rgba(0, 0, 0, 0.5)', width: wd, height:hs, position: 'absolute', left: '2px', transform: 'translate(' + (index == 10 ? 'calc(50% + 5px)' : index % 2 ? 'calc(100% + 5px)' : '0') + ',' + 'calc(' + ((Math.floor(index / 2)) * 100) + '% + ' + ((Math.floor(index / 2)) * 3) + 'px' + ' + 10px)' + ')' }"
      >

      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { dataService } from '../service';
export default {
  mounted () {
    // dataService.fetchData({ 'filePath': this.fileP.filePath }, fileData => {
    //   console.log(11111);

    //   // this.drawHistogram(fileData.data.data, this.typeName);
    // });
    this.typeName.forEach(d => {
      this.createSVG(d);
    })


    this.drawHistogram(this.fileP.filePath, this.typeName);
    // watch window size
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {   //屏幕尺寸变化就重新赋值
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  },
  data () {
    return {
      viewName: "Embedding Histogram",
      typeName: ["Area", "Bar", "Circle", "Diagram", "Line", "Map", "Matrix", "Net", "Point", "Table", "Word"],
      hs: "calc(16.6% - 11px)",
      wd: "calc(50% - 7px)",
      screenWidth: null,  //屏幕尺寸
      selectType: '',
      xAxis: undefined,
      yAxis: {},
      hisWidth: 0,
      hisHeight: 0,
      levelCluster: {
        "Beagle": ['Circle', 'Map', 'Line', 'Area', 'Bar', 'Net', 'Point', 'Diagram', 'Matrix', 'Table', 'Word'],
        "VIS": ["Map", "Circle", "Bar", "Point", "Line", "Diagram", "Matrix", "Net", "Area", "Table", "Word"],
        "Data": ["Area", "Line", "Bar", "Point"]
      },

    };
  },
  inject: ['fileP'],
  methods: {
    createSVG: function (hisType) {
      d3.select("#" + hisType + 'Svg').remove();
      const hisHeight = document.getElementById(('His' + hisType)).offsetHeight;
      const hisWidth = document.getElementById(('His' + hisType)).offsetWidth;
      this.hisHeight = hisHeight;
      this.hisWidth = hisWidth;
      d3.select('#His' + hisType)
        .append('svg')
        .attr('id', hisType + 'Svg')
        .attr('width', hisWidth)
        .attr('height', hisHeight)
      d3.select('#' + hisType + 'Svg')
        .append('text')
        .text(hisType)
        .attr('font-size', 15)
        .attr('text-anchor', 'middle')
        .attr('y', 15)
        .attr('x', hisWidth / 2)
    },
    /**
     * @description: data processing and use function
     * @param {String} filePath: which file will be used, selected in modelView.vue
     * @param {Array} hisTypeArray: Feature Group
     * @return {*}
     */
    drawHistogram: function (filePath, hisTypeArray) {
      d3.csv(filePath).then((fileData) => {
        hisTypeArray.forEach(hisType => {
          // index name need small letters
          let hisTag = hisType.toLowerCase();
          const hisData = new Object();
          for (let i = 0; i < fileData.length; ++i) {
            let indexNum = Math.floor(parseFloat(fileData[i][hisTag]) * 10);
            if (indexNum == 10) indexNum--; // let 1 to 0.9 ~ 1
            if (indexNum == 0) continue;
            if (typeof (hisData[indexNum]) == 'undefined') {
              hisData[indexNum] = { cnt: 0, items: [] };
            }
            hisData[indexNum].cnt++;
            hisData[indexNum].items.push(fileData[i]);
          }

          // remove old View
          d3.select("#his_g_" + hisType).remove();
          // define new View
          d3.select("#" + hisType + "Svg")
            .append('g')
            .attr("id", "his_g_" + hisType);

          this.drawRectAndAxis(hisData, hisType);
          this.drawSelectRect(hisData, hisType);
          this.RectBrush(hisData, hisType);
          // this.allHisData[hisType] = hisData;
          // d3.select("#selCircle8").transition().duration(2000).attr('y', 20).attr("height", 70);
        })
      });
    },
    drawRectAndAxis: function (hisData, hisType) {
      // remove old View
      d3.select("#his_rect_g_" + hisType).remove();
      // define new View
      const his_g = d3.select("#his_g_" + hisType)
        .append('g')
        .attr("id", "his_rect_g_" + hisType);

      const hisArray = new Array();

      for (let i in hisData)
        hisArray.push(hisData[i].cnt);

      const xAxis = d3.scaleLinear()
        .domain([0.1, 1.0])
        .range([0, this.hisWidth - 60])
      const yAxis = d3.scaleLinear()
        .domain([0, d3.max(hisArray)])
        .range([this.hisHeight - 42, 0]);
      this.xAxis = xAxis;
      this.yAxis[hisType] = yAxis;

      his_g.append('g')
        .selectAll("#hisRect" + hisType)
        .attr('id', "hisRect" + hisType)
        .data(hisArray)
        .enter()
        .append('rect')
        .attr("dmax", d3.max(hisArray))
        .attr('x', (d, i) => {
          return this.xAxis((i + 1) / 10) + 45 + 5;
        })
        .attr('y', (d, i) => {
          return this.yAxis[hisType](d) + 20;
        })
        .attr('height', d => {
          return this.hisHeight - 42 - this.yAxis[hisType](d)
        })
        .attr('width', 10)
        .attr('fill', "rgb(198, 198, 198)");
      // draw Axis
      his_g.append('g')
        .call(d3.axisBottom(xAxis).ticks(5))
        .attr("transform", `translate(${45}, ${this.hisHeight - 22})`);
      his_g.append('g')
        .call(d3.axisLeft(yAxis).ticks(5))
        .attr("transform", `translate(${45}, ${20})`);
    },
    drawSelectRect: function (hisData, hisType) {
      // remove old View
      d3.select("#his_sel_g_" + hisType).remove();
      // define new View
      const his_g = d3.select("#his_g_" + hisType)
        .append('g')
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
        .attr("id", (d, i) => {
          return "sel" + hisType + (i + 1);
        })
        .attr('x', (d, i) => {
          return this.xAxis((i + 1) / 10) + 45 + 5;
        })
        .attr('y', (d, i) => {
          return this.hisHeight - 20;
        })
        .attr('height', d => {
          return 0;
        })
        .attr('width', 10)
        .attr('fill', "orange");
    },
    RectBrush (hisData, hisType) {
      let _this = this;
      const hisArray = new Array();
      for (let i in hisData)
        hisArray.push(hisData[i].cnt);
      const brush = d3.brush()
        .extent([
          [30, 15],
          [_this.hisWidth - 5, _this.hisHeight - 10]
        ])
        .on('start', function ({ selection }) {
          if (selection != null) {
            d3.select('#brush_rect').remove();
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
        if (selection != null) {
          const [
            [x0, y0],
            [x1, y1]
          ] = selection;
          d3.select('#his_g_' + hisType)
            .append("rect")
            .attr('id', 'brush_rect')
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
          console.log(levelType);
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
            if (x0 < _this.xAxis((i + 1) / 10) + 45 + 5 && _this.xAxis((i + 1) / 10) + 45 + 5 < x1) {
              hisData[i + 1].items.forEach(d => {
                pidScatter[d.pid] = 1;
                // d3.select("#rad_cir" + d.pid).attr('opacity', 1).attr('r', 4);
                _this.typeName.forEach(hisTag => {
                  let indexNum = Math.floor(parseFloat(d[hisTag.toLowerCase()]) * 10);
                  if (indexNum == 10) indexNum--; // let 1 to 0.9 ~ 1
                  if (indexNum != 0) {
                    selectData[hisTag][indexNum].cnt++;
                  }
                })
                treeCnt[d['class']].value++;
              })
            }
          }
          d3.selectAll('.rad_cir')
            .attr('r', d => {
              return pidScatter[d.pid] == 1 ? 2 : 0;
            })
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
          _this.updateTree(treeData, sumTree);
          // clear brush
          d3.select(this).call(brush.move, null);
        }
      }
    },
    updateTree (treeData, sumTree) {
      this.$emit('updateTree', treeData, sumTree);
    }
  },
  watch: {
    fileP: {
      handler (newValue, oldValue) {
        console.log(newValue)
        this.drawHistogram(this.fileP.filePath, this.typeName);
      },
      deep: true
    },
    screenWidth: {
      handler (newValue, oldValue) {
        this.typeName.forEach(d => {
          this.createSVG(d);
        })
        this.drawHistogram(this.fileP.filePath, this.typeName);
      }
    }
  }
}
</script>

<style>
#mainHistogram {
  height: calc(100% - 30px);
  width: calc(100%);
  /* background-color: #000; */
}
.selection {
  fill: none;
  stroke: #2378ae;
  stroke-width: 3;
  stroke-dasharray: 4, 4;
}
</style>