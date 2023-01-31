<!--
 * @Author: Qing Shi
 * @LastEditTime: 2022-04-30 23:54:18
 * @Knowledge: 
 * @Description: 
 * @Attention: 
-->
<template>
  <!-- <div id="titleBar">
    {{ viewName }}
  </div> -->
  <div
    id="mainViewPic"
    style="height: 100%; width: 100%;"
  >

  </div>
</template>

<script>
import * as d3 from 'd3';
import classifyPoint from 'robust-point-in-polygon';
// this is not a usual lasso. npm install skokenes/d3-lasso
// import * as d3Lasso from 'd3-lasso';

export default {
  name: 'mainView',
  mounted () {
    this.createSVG();
    this.drawMain(this.fileP.filePath, this.dimensions);
    // this.setupLasso();
  },
  inject: ['fileP'],
  data () {
    return {
      viewName: "Main",
      typeName: ["Matrix", "Table", "Word", "Circle", "Map", "Line", "Area", "Bar", "Net", "Point", "Diagram"],
      colormap: { "circle": "#4A80CE", "point": "#FF931D", "net": "#42B287", "line": "#E5CD3C", "area": "#FF6224", "bar": "#A9DB63", "map": "#C192EA", "matrix": "#1C9AB7", "table": "#FF9896", "word": "#FFB839", "diagram": "#0ED88F" },
      dimensions: ['circle', 'map', 'line', 'area', 'bar', 'net', 'point', 'diagram', 'matrix', 'table', 'word'],
      levelCluster: {
        "Beagle": ['Circle', 'Map', 'Line', 'Area', 'Bar', 'Net', 'Point', 'Diagram', 'Matrix', 'Table', 'Word'],
        "VIS": ["Map", "Circle", "Bar", "Point", "Line", "Diagram", "Matrix", "Net", "Area", "Table", "Word"],
        "Data": ["Area", "Line", "Bar", "Point"]
      },
      wordDis: [41, 15, 26, 18, 25, 16, 29, 24, 24, 50, 88],
      chartRadius: 0,
      mainHeight: 0,
      mainWidth: 0,
      distanceType: "Cosine", //! init computing method
      selectNode: 0, //! the selected node data
      processedData: null //! the processed data
    }
  },
  methods: {
    /**
     * @description: create a svg
     * @param {*}
     * @return {*}
     */
    createSVG () {
      const mainHeight = document.getElementById('mainViewPic').offsetHeight;
      const mainWidth = document.getElementById('mainViewPic').offsetWidth;
      this.mainHeight = mainHeight;
      this.mainWidth = mainWidth;
      this.chartRadius = Math.min(this.mainWidth - 100, this.mainHeight) / 2 - 70;
      d3.select("#mainViewPicSvg").remove();
      d3.select("#mainViewPic")
        .append('svg')
        .attr('id', 'mainViewPicSvg')
        .attr('height', mainHeight)
        .attr('width', mainWidth);
    },
    /**
     * @description: draw pie chart and text
     * @param {Array} allType: Feature Group
     * @return {*}
     */
    drawLegend (allType) {
      d3.select("#mainLegend").remove();
      let legend_g = d3.select("#mainViewPicSvg")
        .append('g')
        .attr('id', 'mainLegend')
        .attr('transform', `translate(${this.mainWidth / 2}, ${this.mainHeight / 2})`);
      let legData = new Array();
      for (let i = 0; i < allType.length; ++i)
        legData.push(20);
      let pie = d3.pie();
      let inner = this.chartRadius;
      let outer = this.chartRadius + 25;
      let arc = d3.arc()
        .innerRadius(inner)
        .outerRadius(outer);

      let pieData = pie(legData);
      for (let i in pieData) {
        pieData[i]['type'] = allType[i];
      }

      legend_g.append('g')
        .attr('id', 'leg_pie')
        // .attr('transform', `translate(${this.mainWidth / 2}, ${this.mainHeight / 2})`)
        .selectAll('#pie_g')
        .attr('id', 'pie_g')
        .data(pieData)
        .enter()
        .append('path')
        .attr('id', d => 'mid_pie' + d.type)
        .attr("transform", `rotate(-24.5)`)
        .attr("stroke", 'white')
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", 'round')
        .attr('d', d => {
          return arc(d);
        })
        .attr('fill', d => {
          return this.colormap[d['type'].toLowerCase()];
        })
        .attr('fill-opacity', 0.7);

      // draw text and line
      let textMap = new Array(allType.length);
      let radius = 2 * Math.PI / allType.length;
      for (let i = 0; i < allType.length; ++i) {
        textMap[i] = {
          type: allType[i],
          x1: (inner - 3) * Math.sin(radius * (-i + 6) - 24.5 * Math.PI / (180 * 3)),
          y1: (inner - 3) * Math.cos(radius * (-i + 6) - 24.5 * Math.PI / (180 * 3)),
          x2: (inner + 3) * Math.sin(radius * (-i + 6) - 24.5 * Math.PI / (180 * 3)),
          y2: (inner + 3) * Math.cos(radius * (-i + 6) - 24.5 * Math.PI / (180 * 3)),
          x: (outer + 11) * Math.sin(radius * (-i + 6) - 24.5 * Math.PI / (180 * 3)),
          y: (outer + 11) * Math.cos(radius * (-i + 6) - 24.5 * Math.PI / (180 * 3)),
          cnt: i
        }
      }

      let text_g = legend_g.append('g')
        .attr('id', 'leg_line')
        // .attr('transform', `translate(${this.mainWidth / 2}, ${this.mainHeight / 2})`)
        .selectAll('#mid_line')
        .data(textMap)
        .enter()
      text_g.append('line')
        .attr('id', d => 'mid_line' + d.type)
        .attr('x1', d => {
          return d.x1
        })
        .attr('y1', d => d.y1)
        .attr('x2', d => d.x2)
        .attr('y2', d => d.y2)
        .attr('stroke-width', 1)
        .attr('stroke', d3.rgb(120, 120, 120));

      text_g.append('text')
        .attr('id', d => 'mid_text' + d.cnt)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('fill', d => {
          return this.colormap[d.type.toLowerCase()]
        })
        .attr('text-anchor', d => {
          if (d.cnt == 0 || d.cnt == 6)
            return 'middle'
          if (d.cnt > 0 && d.cnt < 6)
            return 'start';
          else
            return 'end'
        })
        .attr('font-size', '25px')
        .attr('font-weight', 'bold')
        .attr('dx', d => {
          if (d.cnt == 0 || d.cnt == 6)
            return -this.wordDis[d.cnt] + 'px';
          if (d.cnt > 0 && d.cnt < 6)
            return 0;
          else
            return -this.wordDis[d.cnt] + 'px'
        })
        .attr('dy', '0.2em')
        .text(d => d.type[0])

      text_g.append('text')
        .attr('id', d => 'mid_text' + d.cnt)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('fill', d => {
          return 'black'
        })
        .attr('text-anchor', d => {
          if (d.cnt == 0 || d.cnt == 6)
            return 'middle'
          if (d.cnt > 0 && d.cnt < 6)
            return 'start';
          else
            return 'end'
        })
        .attr('font-size', '25px')
        .attr('font-weight', 'bold')
        .attr('dx', d => {
          if (d.cnt > 0 && d.cnt < 6)
            return this.wordDis[d.cnt] + 'px';
        })
        .attr('dy', '0.2em')
        .text(d => d.type.slice(1))

    },
    /**
     * @description: RadViz process
     * @param {*} data
     * @param {*} dimensions
     * @param {*} dimensionNamesNormalized
     * @return {*}
     */
    addNormalizedValues (data, dimensions, dimensionNamesNormalized) {
      data.forEach(function (d) {
        dimensions.forEach(function (dimension) {
          d[dimension] = +d[dimension];
        });
      });
      var normalizationScales = {};
      dimensions.forEach(function (dimension) {
        normalizationScales[dimension] = d3.scaleLinear().domain(d3.extent(data.map(function (d, i) {
          return d[dimension];
        }))).range([0, 1]);
      });
      data.forEach(function (d) {
        dimensions.forEach(function (dimension) {
          d[dimension + '_normalized'] = normalizationScales[dimension](d[dimension]);
        });
      });
      data.forEach(function (d) {
        let dsum = 0;
        dimensionNamesNormalized.forEach(function (k) {
          dsum += d[k];
        }); // sum
        d.dsum = dsum;
      });
      return data;
    },
    /**
     * @description: RadViz process
     * @param {*} dataE
     * @param {*} dimensionNamesNormalized
     * @param {*} DA
     * @return {*}
     */
    calculateNodePosition (dataE, dimensionNamesNormalized, DA) {
      dataE.forEach(function (d) {
        let dsum = d.dsum,
          dx = 0,
          dy = 0;
        dimensionNamesNormalized.forEach(function (k, i) {
          dx += Math.cos(DA[i]) * d[k];
          dy += Math.sin(DA[i]) * d[k];
        }); // dx & dy
        d.x0 = dx / dsum;
        d.y0 = dy / dsum;
        d.dist = Math.sqrt(Math.pow(dx / dsum, 2) + Math.pow(dy / dsum, 2)); // calculate r
        d.distH = Math.sqrt(Math.pow(dx / dsum, 2) + Math.pow(dy / dsum, 2)); // calculate r
        d.theta = Math.atan2(dy / dsum, dx / dsum) * 180 / Math.PI;
      });
      return dataE;
    },
    /**
     * @description: data process
     * @param {Array} fileData file data
     * @param {Array} dimensions Feature Group
     * @return {*}
     */
    getMainData (fileData, dimensions) {
      let _this = this;
      let normalizeSuffix = '_normalized';
      let dimensionNamesNormalized = dimensions.map(function (d) {
        return d + normalizeSuffix;
      });
      let nodeAngle = dimensions.map((d, i) => {
        return i * (Math.PI * 2) / dimensions.length;
      });
      let allData = fileData;
      allData.forEach((d, i) => {
        d.index = i;
        d.id = i;
        // d.color = this.colormap[d.class.toLowerCase()];
      });
      allData = this.addNormalizedValues(allData, dimensions, dimensionNamesNormalized);
      allData = this.calculateNodePosition(allData, dimensionNamesNormalized, nodeAngle);
      let matrixF = {};
      for (let w = 0; w < this.mainWidth / 30; w++) {
        matrixF[w] = {}
        for (let h = 0; h < this.mainHeight / 30; h++) {
          matrixF[w][h] = 0;
        }
      }
      for (let i = 0; i < allData.length; i++)
      //for (let i=0; i<20000;i++)
      {
        let dt = allData[i];
        allData[i]["show"] = "false"
        let dt_x = dt.x0 * _this.chartRadius + _this.mainWidth / 2;
        let dt_y = dt.y0 * _this.chartRadius + _this.mainHeight / 2;
        let w = Math.floor((dt_x) / 30);
        let h = Math.floor((dt_y) / 30);

        if (w >= 0 && w < this.mainWidth / 30 && h >= 0 && h < this.mainHeight / 30) {
          if (matrixF[w][h] <= 2) {
            matrixF[w][h] = matrixF[w][h] + 1;
            allData[i]["show"] = "true"
          }
        }
      }
      return allData;
    },
    /**
     * @description: call function to draw
     * @param {*} filePath selected file path
     * @param {*} dimensions Feature Group
     * @return {*}
     */
    drawMain (filePath, dimensions) {
      let _this = this;
      d3.csv(filePath).then((fileData) => {
        let allData = this.getMainData(fileData, dimensions);
        this.processedData = allData;
        this.drawDensity(filePath, dimensions, allData);
        this.drawLegend(this.typeName);
        this.drawScatter(allData);
        // this.setupLasso(allData);
      });
    },
    /**
     * @description: draw density
     * @param {*} filePath selected file path
     * @param {*} dimensions Feature Group
     * @param {*} densityAllData density data
     * @return {*}
     */
    drawDensity (filePath, dimensions, densityAllData) {
      d3.select("#mainDensity_g").remove();
      let density_g = d3.select("#mainViewPicSvg").append('g')
        .attr('id', 'mainDensity_g')
      // .attr('transform', `translate(${this.mainWidth / 2}, ${this.mainHeight / 2})`)
      let per = 0;
      let bandw = 0;
      if (filePath[13] == 'B') {
        per = 0.5
        bandw = 25
      } else if (filePath[13] == 'v') {
        per = 0.6;
        bandw = 18;
      } else if (filePath[13] == 'd') {
        bandw = 18;
        per = 0.3;
      }
      let densityTypeData = {};
      dimensions.forEach(d => {
        densityTypeData[d] = [];
      });
      densityAllData.forEach(d => {
        densityTypeData[d.class.toLowerCase()].push(d);
      });
      for (let type in densityTypeData) {
        let densityData = densityTypeData[type];
        if (densityData.length > 0) {
          let colorScale = d3.scaleLinear()
            .domain([0, per])
            .range(['white', this.colormap[type]]);
          var densityProgress = d3.contourDensity()
            .x(d => {
              return parseFloat(d.x0) * this.chartRadius + this.mainWidth / 2;
            })
            .y(d => {
              return parseFloat(d.y0) * this.chartRadius + this.mainHeight / 2;
            })
            .size([this.mainWidth, this.mainHeight])
            .thresholds(25)
            .bandwidth(bandw)(densityData);
          // let line = d3.line()
          // .x(d => d[0])
          // .y(d => d[1])
          // console.log(line(densityProgress[0].coordinates[0][0]));
          // density_g.append("path").attr("d", line([[1, 1000], [1, 1], [1000, 1000]])).attr('fill', 'none').attr("stroke", 'black');
          // density_g.append("path").attr("d", line(densityProgress[0].coordinates[0][0])).attr('fill', 'none').attr("stroke", 'black');
          density_g.append('g').attr('class', 'contour').selectAll("#density_all")
            .attr("id", 'density_all')
            .data(densityProgress)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('fill', d => colorScale(d.value));
        }
      }

      let arc = d3.arc()
        .innerRadius(this.chartRadius)
        .outerRadius(this.chartRadius + 70);
      // console
      density_g.append('g')
        .attr('transform', `translate(${this.mainWidth / 2}, ${this.mainHeight / 2})`)
        .append('path')
        .attr('d', arc(d3.pie()([1])[0]))
        .attr('fill', 'white')
    },
    /**
     * @description: draw scatter
     * @param {*} scatterData scatter data
     * @return {*}
     */
    drawScatter (scatterData) {
      d3.select("#mainScatter_g").remove();
      let scatter_g = d3.select("#mainViewPicSvg").append('g')
        .attr('id', 'mainScatter_g')
        .attr('transform', `translate(${this.mainWidth / 2}, ${this.mainHeight / 2})`);
      d3.select("#tooltip").remove();
      let circles = scatter_g
        .selectAll('#mainScatter')
        .attr('id', 'mainScatter')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('class', d => 'rad_cir')
        .attr('id', d => 'cir' + d.pid)
        .attr('cx', d => d.x0 * this.chartRadius)
        .attr('cy', d => d.y0 * this.chartRadius)
        .attr('fill', d => this.colormap[d.class.toLowerCase()])
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('r', d => {
          return d.show == 'true' ? 2 : 0;
        })
        .on('mouseover', d => {
          if (d3.select("#nodePic").attr("sid") != 1) {
            // console.log(d);
            let selData = d.srcElement.__data__;
            d3.select('#cir' + selData.pid).attr('r', 8).attr('fill', 'yellow').attr('stroke-width', 3);
            // this.setSelect(selData, this.typeName);
            let tx = selData.x0 * this.chartRadius + this.mainWidth / 2 - 30;
            let ty = selData.y0 * this.chartRadius + this.mainHeight / 2 - 90;

            let tooltip = d3.select("#mainViewPic").append("div")
              .attr("id", "tooltip") //用于css设置类样式
              .attr("display", 'none')//新建一个tooltip
              // .style('height', '70px')
              // .style("width", '140px')
              // .style("border", "solid 2px black");
            tooltip.html("<img style='height: 70px; width: 140px; border-radius: 10px; border: solid 2px black;' src='" + "/src/assets" + selData.path.slice(1) + "'>")
              .style("left", (tx) + "px")
              .style('top', ty + 'px')
              .style('position', 'absolute')
              .attr('display', null);
          }
        })
        .on('mouseout', d => {
          let selData = d.srcElement.__data__;
          d3.select('#cir' + selData.pid).attr('r', 2).attr("fill", this.colormap[selData.class.toLowerCase()]).attr('stroke-width', 0.5);
          // d3.select("#tooltip").remove();
          if (d3.select("#nodePic").attr("sid") != 1) {
            this.removeSelect(this.typeName);
          }
        })
        .on("click", d => {
          let selData = d.srcElement.__data__;
          this.selectNode = selData;
          this.clickNode(selData);
          let close_node = this.closeNode(scatterData, selData, this.distanceType);
          this.updateGallery(close_node);
        });
      // console.log(circles);
    },
    /**
     * @description: function of click a node
     * @param {*} selData selected node's data
     * @return {*}
     */
    clickNode (selData) {
      d3.select("#mainScatter_g")
        .append("circle")
        .attr("id", "sel_circle" + selData.pid)
        .attr("class", 'select_circle')
        .attr("r", 10)
        .attr("fill", 'yellow')
        // .attr('cx', d3.select('#cir' + selData.pid).attr("cx"))
        // .attr('cy', d3.select('#cir' + selData.pid).attr("cy"))
        .attr('cx', selData.x0 * this.chartRadius)
        .attr('cy', selData.y0 * this.chartRadius)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5);

      d3.select('#nodePic').attr("sid", 1);
    },
    /**
     * @description: Calculate the ten closest points
     * @param {*} scatterData all scatter data
     * @param {*} selectNode the selected node data
     * @param {*} dis_type computing method (Cosine / Projection)
     * @return {Array} Close Node data
     */
    closeNode (scatterData, selectNode, dis_type) {
      let distance = new Array();
      scatterData.forEach(d => {
        let dis;
        if (dis_type == 'Cosine')
          dis = this.getCosineDistance([d.x0, d.y0], [selectNode.x0, selectNode.y0])
        else if (dis_type == 'Projection')
          dis = this.getProjectionDistance([d.x0, d.y0], [selectNode.x0, selectNode.y0])
        distance.push({
          dis: dis,
          node: d
        });
      });
      distance.sort(function (a, b) {
        return a.dis - b.dis;
      })
      // console.log(distance);
      let close_node = new Array();
      let isDifer = 0;
      if (distance[0].pid == selectNode.pid)
        isDifer = 1;
      console.log(distance.slice(0, 10))
      distance.slice(1 - isDifer, 11 - isDifer).forEach(d => {
        close_node.push(d.node);
      })
      return close_node;
    },
    /**
     * @description: Projection Distance
     * @param {Array} nodeA [x, y]
     * @param {Array} nodeB [x, y]
     * @return {Float} distance between two nodes
     */
    getProjectionDistance (nodeA, nodeB) {
      console.log(Math.pow(nodeA[0] - nodeB[0], 2) + Math.pow(nodeA[1] - nodeB[1], 2));
      return Math.pow(nodeA[0] - nodeB[0], 2) + Math.pow(nodeA[1] - nodeB[1], 2);
    },
    /**
     * @description: Cosine Distance
     * @param {Array} nodeA [x, y]
     * @param {Array} nodeB [x, y]
     * @return {Float} distance between two nodes
     */
    getCosineDistance (nodeA, nodeB) {
      let sa = 0, sb = 0, s = 0;
      this.dimensions.forEach(d => {
        let a = parseFloat(nodeA[0]);
        let b = parseFloat(nodeB[1]);
        sa += a * a;
        sb += b * b;
        s += a * b;
      })
      return s / Math.sqrt(sa * sb);
    },
    /**
     * @description: create a lasso
     * @param {*} data scatter data
     * @return {*}
     */
    setupLasso (data) {
      let _this = this;
      // console.log(data);
      let lasso_g = d3.select("#mainViewPicSvg")
        .append('g')
        .attr('class', 'lasso');
      let origin_node = lasso_g
        .append("circle")
        .attr("id", "origin");
      let draw_path = lasso_g
        .append('path')
        .attr("id", 'drawn');
      let close_path = lasso_g
        .append("path")
        .attr("id", "loop_close");

      let select_path = "";
      let end_path = "";
      let origin_circle;
      let target_circle;
      let closePathDistance = 100;

      let polygon = new Array();

      let dragStarted = function (event) {
        // console.log(event.x, event.y, 'st');
        // origin_node.attr("r", 10)
        //   .attr("cx", event.x)
        //   .attr('cy', event.y)
        //   .attr('stroke', 'gray')
        //   .attr("fill", 'red');
        // origin_circle = [event.x, event.y];
      }
      let dragged = function (event) {
        // console.log(event.x, event.y, "ed");
        let tx = event.x;
        let ty = event.y;
        if (select_path == "") {
          select_path = select_path + "M " + tx + " " + ty;
          target_circle = [event.x, event.y];
          polygon.push([event.x, event.y]);
        } else {
          select_path = select_path + "L " + tx + " " + ty;
        }
        polygon.push([tx, ty]);
        let distance = Math.sqrt(Math.pow(tx - target_circle[0], 2) + Math.pow(ty - target_circle[1], 2));
        let close_draw_path = "M " + tx + " " + ty + " L " + target_circle[0] + " " + target_circle[1];
        draw_path.attr('d', select_path);

        close_path.attr("d", close_draw_path);
        if (distance < closePathDistance) {
          close_path.attr("display", null);
        } else {
          close_path.attr("display", "none");
        }
      }
      let dragEnded = function () {
        origin_node.attr("display", "none");
        draw_path.attr("d", null);
        close_path.attr("d", null);

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
        // console.log(polygon);

        data.forEach((allData, i) => {
          let cx = allData.x0 * _this.chartRadius + _this.mainWidth / 2;
          let cy = allData.y0 * _this.chartRadius + _this.mainHeight / 2;
          let cd = allData;
          if (classifyPoint(polygon, [cx, cy]) < 1) {
            pidScatter[cd.pid] = 1;
            _this.typeName.forEach(hisTag => {
              let indexNum = Math.floor(parseFloat(cd[hisTag.toLowerCase()]) * 10);
              if (indexNum == 10) indexNum--; // let 1 to 0.9 ~ 1
              if (indexNum != 0) {
                selectData[hisTag][indexNum].cnt++;
              }
            })
            if (typeof (treeCnt[cd['class']]) != 'undefined')
              treeCnt[cd['class']].value++;
          }
        })

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

        d3.selectAll('.rad_cir')
          .attr('r', d => {
            return pidScatter[d.pid] == 1 ? 2 : 0;
          });
        for (let i in selectData) {
          for (let j in selectData[i]) {
            // console.log("#sel" + i + (j))
            // console.log(parseInt(d3.select("#sel" + i + (j)).attr("dmax")))
            if (d3.select("#sel" + i + (j))._groups[0][0] == null)
              continue;
            let yAxis = d3.scaleLinear()
              .domain([0, parseInt(d3.select("#sel" + i + (j)).attr("dmax"))])
              .range([d3.select("#sel" + i + (j)).attr("hisHeight") - 42, 0])
            d3.select("#sel" + i + (j))
              .transition().duration(500)
              .attr('y', yAxis(selectData[i][j].cnt) + 20)
              .attr("height", d3.select("#sel" + i + (j)).attr("hisHeight") - 42 - yAxis(selectData[i][j].cnt));
          }
        }

        _this.updateTree(treeData, sumTree);

        select_path = "";
        end_path = "";
        origin_circle = [];
        target_circle = [];
        closePathDistance = 100;
        polygon = new Array();
      }

      let drag = d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded);
      // console.log(drag);

      d3.select('#mainViewPicSvg').call(drag);
    },
    /**
     * @description: mouseover on a node or click
     * @param {*} selData the selected node
     * @param {*} typeName Feature Group
     * @return {*}
     */
    setSelect (selData, typeName) {
      // console.log(selData);
      for (let i in typeName) {
        // console.log(selData[this.typeName[i].toLowerCase()])
        document.getElementById(typeName[i] + 'Table').innerHTML = Math.round((selData[typeName[i].toLowerCase()] * 100000)) / 100000;
      }
      d3.select("#nodePic").attr("src", '/src/assets' + selData.path.slice(1));
      let pw = document.getElementById("isChoose").offsetWidth;
      let ph = document.getElementById("isChoose").offsetHeight;
      // console.log(ph, pw);
      if (ph * 2 > pw)
        d3.select("#nodePic").attr("style", 'width: 95%; border: solid 1px rgba(0, 0, 0, 0.5); transform: translate(0,0)');
      else
        d3.select("#nodePic").attr("style", 'height: 95%; border: solid 1px rgba(0, 0, 0, 0.5); transform: translate(0,0)');
      // d3.select('#nodePic').attr("sid", 0);
    },
    /**
     * @description: mouseout
     * @param {*} typeName Feature Group
     * @return {*}
     */
    removeSelect (typeName) {
      for (let i in typeName) {
        // console.log(selData[this.typeName[i].toLowerCase()])
        document.getElementById(typeName[i] + 'Table').innerHTML = '';
      }
      // console.log(d3.select("#nodePic").attr("sid"))
      d3.select("#nodePic").attr("style", '');

      d3.select("#nodePic").attr("src", '');
    },
    /**
     * @description: update dendrogram
     * @param {Array} treeData data of the tree
     * @param {Int} sumTree Number of all selected elements
     * @return {*}
     */
    updateTree (treeData, sumTree) {
      this.$emit('updateTree', treeData, sumTree);
    },
    /**
     * @description: update gallery 
     * @param {Array} data close node data
     * @return {*}
     */
    updateGallery (data) {
      this.$emit('updateGallery', data);
    },
    /**
     * @description: change gallery type
     * @param {*} data Cosine / Projection
     * @return {*}
     */
    setGalleryType (data) {
      this.distanceType = data;
    },
    /**
     * @description: set selected node
     * @param {*} data the selected node data
     * @return {*}
     */
    setSelectNode (data) {
      this.selectNode = data;
    },
    /**
     * @description: Query picture and show on system
     * @param {*} data query picture's data
     * @return {*}
     */
    setQuery (data) {
      let tempData = this.processedData;
      tempData.push(data);
      let allData = this.getMainData(tempData, this.dimensions);
      let nodeData = allData.pop();
      // tempData
      this.selectNode = nodeData;
    }
  },
  watch: {

    fileP: {
      handler (newValue, oldValue) {

        this.drawMain(this.fileP.filePath, this.dimensions);
      },
      deep: true
    },
    distanceType: {
      handler (newValue, oldValue) {
        if (this.selectNode != 0) {
          let close_node = this.closeNode(this.processedData, this.selectNode, this.distanceType);
          this.updateGallery(close_node);
        }
      }
    },
    selectNode: {
      handler (newValue, oldValue) {
        d3.select(".select_circle").remove();
        console.log(this.selectNode);
        this.clickNode(this.selectNode);
        if (this.selectNode.pid > 0)
          this.setSelect(this.selectNode, this.typeName);
        let close_node = this.closeNode(this.processedData, this.selectNode, this.distanceType);
        this.updateGallery(close_node);
      }
    }
  }
}
</script>

<style>
.contour {
  mix-blend-mode: multiply;
}

.lasso path {
  stroke: #2378ae;
  stroke-width: 3;
  stroke-dasharray: 4, 4;
}

.lasso #drawn {
  fill-opacity: 0.05;
}

.lasso #loop_close {
  fill: none;
  stroke-dasharray: 4, 4;
}

.lasso #origin {
  fill: rgb(180, 180, 180);
  fill-opacity: 0.5;
}

#tooltip {
  /* background-color: gray; */
  height: 70px;
  position: relative;
  width: 150px;
  /* border-radius: 15px; */
}
#tooltip:after {
  content: "";
  position: absolute;
  border: 10px solid transparent;
  border-top-color: black;

  top: 100%;
  left: 10px;
}
</style>