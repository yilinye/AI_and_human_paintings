<template>
  <div style="height:100%;width:100%;">
    <div id="logoView">
      <img
        src="../assets/logo.png"
        alt=""
        style="width: 100%; height=auto;"
      >
    </div>
    <div id="modelView">
      <ModelView
        @getFilePath="getFilePath"
        @queryNode="updateQuery"
      />
    </div>
    <div id="selectView">
      <SelectView />
    </div>
    <div id="mainView">
      <MainView
        ref="mainV"
        @updateTree="updateTree"
        @updateGallery="updateGallery"
      />
    </div>
    <div id="dendrogramView">
      <DendrogramView ref="dendrogram" />
    </div>
    <div id="histogramView">
      <HistogramView @updateTree="updateTree" />
    </div>
    <div id="galleryView">
      <GalleryView
        ref="gallery"
        @updateGType="updateType"
        @updateSelectNode="updateSelectNode"
      />
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import SelectView from "../components/selectView.vue";
import MainView from "../components/mainView.vue";
import DendrogramView from "../components/dendrogramView.vue";
import HistogramView from "../components/histogramView.vue";
import GalleryView from "../components/galleryView.vue";
import ModelView from "../components/modelView.vue";
export default {
  components: { SelectView, MainView, DendrogramView, HistogramView, GalleryView, ModelView },
  data () {
    return {
      // init file
      pth: { filePath: "/src/visData/Beagle reorder.csv" },

      // pth: { filePath: "/src/visData/data2vis reorder.csv" },
    }
  },
  provide () {
    return {
      fileP: this.pth,
    }
  },
  methods: {
    getFilePath: function (val) {
      this.pth.filePath = val;
      this.fileP = this.pth;
    },
    updateTree (treeData, sumTree) {
      this.$refs.dendrogram.drawTree(treeData, sumTree);
    },
    updateGallery (data) {
      this.$refs.gallery.setCloseNode(data);
    },
    updateType (data) {
      this.$refs.mainV.setGalleryType(data);
    },
    updateSelectNode (data) {
      this.$refs.mainV.setSelectNode(data);
    },
    updateQuery (data) {
      this.$refs.mainV.setQuery(data);
    }
  }
}
</script>

<style>
#logoView {
  position: absolute;
  left: 5px;
  top: 5px;
  /* height: 17%; */
  width: 17%;
  margin-left: 5px;
  /* border: solid 1px; */
}

#modelView {
  /* margin-left: 5px; */
  position: absolute;
  left: 5px;
  top: calc(17% + 5px + 5px);
  height: 25%;
  width: 17%;
  border: solid 1px;
  border-radius: 5px;
}

#selectView {
  position: absolute;
  left: 5px;
  top: calc(42% + 15px + 5px);
  height: calc(58% - 30px);
  width: 17%;
  border: solid 1px;
  border-radius: 5px;
}

#mainView {
  position: absolute;
  left: calc(15px + 17%);
  top: calc(5px);
  height: calc(75%);
  width: calc(38%);
  /* border: solid 1px;
  border-radius: 5px; */
}

#dendrogramView {
  position: absolute;
  left: calc(25px + 55%);
  top: calc(5px);
  height: calc(75%);
  width: calc(20% - 10px);
  border: solid 1px;
  border-radius: 5px;
}

#galleryView {
  position: absolute;
  left: calc(15px + 17%);
  top: calc(15px + 75%);
  height: calc(25% - 25px);
  width: calc(58%);
  border: solid 1px;
  border-radius: 5px;
}

#histogramView {
  position: absolute;
  left: calc(25px + 75%);
  top: calc(5px);
  height: calc(100% - 15px);
  width: calc(25% - 30px);
  border: solid 1px;
  border-radius: 5px;
}

/* .lasso path {
  stroke: rgb(80, 80, 80);
  stroke-width: 2px;
}
.lasso .drawn {
  fill-opacity: 0.05;
}
.lasso .loop_close {
  fill: none;
  stroke-dasharray: 4, 4;
}
.lasso .origin {
  fill: #3399ff;
  fill-opacity: 0.5;
} */
</style>