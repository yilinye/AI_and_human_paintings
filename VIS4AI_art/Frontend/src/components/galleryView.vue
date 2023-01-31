<template>
  <div style="width: 100%; height: 100%;">
    <div id="titleBar" style="transform:translate(0,-1px)">
      <span style="position: absolute; left: 40%;">{{ viewName }}</span>
      <!-- <span style="float: right">
        <form
          id="select-distance"
          style="margin-top:0;margin-right:18px;"
        >

          <input
            type="radio"
            id="metricChoice1"
            name="contact"
            value="cosine"
            checked="checked"
            @click="updateType('Cosine')"
          >
          <label for="metricChoice1" style="font-weight:normal">Cosine</label>

          <input
            type="radio"
            id="metricChoice2"
            name="contact"
            value="radviz"
            style="margin-left:13px;padding-top:50%;"
            @click="updateType('Projection')"
          >
          <label for="metricChoice2" style="font-weight:normal">Projection</label>

        </form>
      </span> -->

    </div>
    <div id="InstanceImage" style="display: inline-block;width:178px;height:178px;margin-top: 0px;margin-left:20px">     
    <img id="nodePic" style="width:176px; height: 176px; border:solid 1px; margin-bottom:30px">
    </div>
    <div id="hueHis" style="display: inline-block;margin left: 30px;width:212px;height:212px;margin-top: 0px">

    </div>
    <div id="instanceStats" style="display: inline-block;margin left: 30px; height:220px;width:230px;margin-bottom:10px; overflow-y:scroll">
      <!-- <table style="width:180px;text-align: center;margin-top:0px;margin-left:0px; margin-right: 0px;">
        <tr style="height:30px">
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        <tr
          v-for="item in attributes"
          :key="item.attribute"
          
          style="height:30px"
        >

          <td>{{ item.attribute }}</td>
          <td :id="'row'+item.attribute"></td>
        </tr>
      </table> -->
      <p   v-for="item in attributes"
          :key="item.attribute">
          <span style="font-weight:bold">{{ item.attribute+": " }}</span><span :id="'row'+item.attribute"></span></p>

   </div>
    <!-- <div id="nodeGallery">
      <div style="height: 100%; white-space: nowrap; padding-left: 5px;padding-top: 5px">
        
        <div
          v-for="(item, index) in closeNode.slice(0,3)"
          :key="index"
          class="closeNode"
        >
          <img
            :src="'/src/assets' + item.path.slice(1)"
            alt=""
            :pid="item.pid"
            style="height:100%;"
            class="gal_img"
            @click="updateSelectNode(item)"
          >
        </div>
        <br>
        <div
          v-for="(item, index) in closeNode.slice(3,6)"
          :key="index"
          class="closeNode"
        >
          <img
            :src="'/src/assets' + item.path.slice(1)"
            alt=""
            :pid="item.pid"
            style="height:100%;"
            class="gal_img"
            @click="updateSelectNode(item)"
          >
        </div>
        <br>
        <div
          v-for="(item, index) in closeNode.slice(6,9)"
          :key="index"
          class="closeNode"
        >
          <img
            :src="'/src/assets' + item.path.slice(1)"
            alt=""
            :pid="item.pid"
            style="height:100%;"
            class="gal_img"
            @click="updateSelectNode(item)"
          >
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      viewName: "Instance Detail",
      closeNode: [],
      attributes:{
        major_hue_ratio: { attribute: "major_hue_ratio", value: "" },
        hue_contrast: { attribute: "hue_contrast", value: "" },
        brightness_contrast: { attribute: "brightness_contrast", value: ""},
        mean_saturation: { attribute: "mean_saturation", value: ""},
        edge_area: { attribute: "edge_area", value: "" },
        blurriness: { attribute: "blurriness", value: "" },
        mean_entropy: { attribute: "mean_entropy", value: ""},
        focus_hue: { attribute: "focus_hue", value: ""},
      }
    }
  },
  methods: {
    /**
     * @description: set the closeNode
     * @param {Array} data picture information from visView.vue
     * @return {*}
     */    
    setCloseNode (data) {
      // console.log(data);
      this.closeNode = data;
    },
    /**
     * @description: change the gallery type 
     * @param {String} data Cosine / Projection
     * @return {*}
     */    
    updateType (data) {
      // console.log(data)
      this.$emit('updateGType', data);
    },
    /**
     * @description: select a picture and upload information
     * @param {*} data data bound to the picture
     * @return {*}
     */    
    updateSelectNode (data) {
      this.$emit("updateSelectNode", data);
    }
  }
}
</script>

<style>
#nodeGallery {
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  height: calc(100% - 30px);
}
/* tr {
  white-space: nowrap;
} */
.closeNode {
  /* position: absolute; */
  /* width: 20%; */
  /* height: calc(100% - 20px); */
  /* height: calc(45% - 10px); */
  height: calc(30% - 10px);
  /* padding-bottom: 50%; */
  /* position: fixed; */
  margin-top: 10px;
  margin-bottom: 10px;
  border: solid 1px rgba(0, 0, 0, 0.5);
  margin-left: 5px;
  margin-right: 5px;
  /* float: left; */
  white-space: normal;
  display: inline-block;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>