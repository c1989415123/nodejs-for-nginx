<template>
  <div>
    <div id="myDiagramDiv"></div>
    <div id="orgOverview"></div>
    <span @click="exportPic"> 导出图片</span>
  </div>
</template>

<script>
  import go from 'gojs'

  import more from '@/assets/images/more.png'
  // import canvg from 'canvg'
  import {saveSvgAsPng} from 'save-svg-as-png'
  export default {
    name: "org",
    data() {
      return {
        nodeDataArray: [],
        imgSrc: '',
        str: ''
      }
    },

    mounted() {
      this.createChart({
        "businessUnitCode": "MDJT",
        "createTime": "2019-05-17 00:00:00",
        "level": 3
      })
    },
    methods: {

      initOrgChart(data) {
        if (typeof this.diagram === 'object') {
          this.diagram.div = null
        }
        if (typeof this.overview === 'object') {
          this.overview.div = null
        }
        const $ = go.GraphObject.make,
          orgDiagram = this.initDiagram($, 'myDiagramDiv', data);
        this.diagram = orgDiagram;
        (($, myDiagram, data) => {
          this.initUpperNode($, myDiagram);
          this.initTerminalNode($, myDiagram);
          this.initModel($, myDiagram, data);
          this.initLine($, myDiagram);
          this.overview = this.initOverview($, myDiagram, 'orgOverview');
        })($, orgDiagram, data)
      },
      initDiagram($, domId, data) {
        return $(
          go.Diagram,
          domId,
          {
            scale: data.scale || 0.8,
            minScale: data.minScale || 0.4,
            maxScale: data.maxScale || 2,
            allowMove: false,
            "toolManager.hoverDelay": 200,
            nodeSelectionAdornmentTemplate: $(
              go.Adornment, "Auto",
              $(go.Shape, "Rectangle", {fill: "white", stroke: null})
            ),
            layout: $(
              go.TreeLayout,
              {
                treeStyle: go.TreeLayout.StyleLastParents,
                arrangement: go.TreeLayout.ArrangementHorizontal,
                angle: 90,
                layerSpacing: 60,
                alternateAngle: 90,
                alternateLayerSpacing: 35,
                alternateAlignment: go.TreeLayout.AlignmentBus,
                alternateNodeSpacing: 20
              }
            )
          }
        );
      },
      initUpperNode($, diagram) {
        let self = this;
        diagram.nodeTemplate =
          $(go.Node, "Auto",
            {
              isShadowed: true,
              shadowBlur: 10,
              shadowColor: '#eee',
              shadowOffset: new go.Point(0, 1)
            },
            //模板形状
            $(go.Shape, "Rectangle",
              {
                stroke: null,
                strokeWidth: 0,
                fill: '#fff',
                cursor: 'pointer'
              }
            ),
            //内部面板
            $(go.Panel, 'Vertical',
              $(go.Picture,
                {
                  source: more,
                  width: 18,
                  background: '#fff',
                  alignment: go.Spot.Top,
                  cursor: 'pointer',
                  click: function (e, part) {
                    let data = part.part.data
                    self.createChart({
                      "businessUnitCode": "MDJT",
                      "createTime": "2019-05-17 00:00:00",
                      "level": 3,
                      "id": data.parentId
                    })
                  }
                },
                //属性与数据关联
                new go.Binding("height", "hasParent", function (e) {
                  return e ? 10 : 0
                })),
              $(go.TextBlock,
                {
                  width: 220,
                  height: 36,
                  verticalAlignment: go.Spot.Center,
                  font: 'normal 16px sans-serif',
                  background: "#FD8C49",
                  stroke: '#fff',
                  textAlign: "center",
                  cursor: 'pointer',
                  alignment: go.Spot.Center,
                  overflow: go.TextBlock.OverflowEllipsis,
                  mouseEnter: function (e, port) {
                    port.stroke = 'blue'
                  },
                  mouseLeave: function (e, port) {
                    port.stroke = '#fff'
                  },
                  click: function (e, port) {
                    console.log(port.part.data)
                  }
                },
                new go.Binding('text', 'deptName'),
                {
                  toolTip:
                    $("ToolTip",
                      $(go.TextBlock, {margin: 2, font: 'normal 12px Microsoft YaHei '},
                        new go.Binding("text", "deptName", function (e) {
                          return e
                        }))
                    )
                }
              ),
              $(go.TextBlock,
                {
                  width: 220,
                  height: 36,
                  verticalAlignment: go.Spot.Center,
                  font: 'normal 14px sans-serif',
                  background: "#FFF",
                  stroke: '#000',
                  textAlign: "center",
                  cursor: 'pointer',
                  alignment: go.Spot.Center
                },
                new go.Binding('text', 'managerName', this.formatPost),
                {
                  toolTip:
                    $("ToolTip",
                      $(go.TextBlock, {margin: 2, font: 'normal 12px Microsoft YaHei '},
                        new go.Binding("text", "managerName", this.formatPost))
                    )
                }
              )
            )
          );
      },
      initTerminalNode($, diagram) {
        let self = this;
        diagram.nodeTemplateMap.add("Terminal",
          $(go.Node, "Spot",
            {
              isShadowed: true,
              shadowBlur: 20,
              shadowColor: '#ddd',
              click: function (e, port) {
                let data = port.part.data
                self.createChart({
                  "businessUnitCode": "MDJT",
                  "createTime": "2019-05-17 00:00:00",
                  "level": 3,
                  "id": data.id
                })
              }
            },
            $(go.Shape, "RoundedRectangle",
              {
                stroke: '#eee',
                fill: '#fff',
                cursor: 'pointer',
                width: 150,
                height: 60
              }
            ),
            $(go.Panel, "Vertical",
              $(go.TextBlock,
                {font: "10pt Verdana, sans-serif"},
                new go.Binding("text", 'deptName')
              ),
              $(go.TextBlock,
                {font: "10pt Verdana, sans-serif"},
                new go.Binding('text', 'managerName', this.formatPost)
              )
            ),
            $(go.Picture,
              {
                source: more,
                width: 18,
                alignment: go.Spot.Bottom,
                cursor: 'pointer'
              },
              new go.Binding("height", "hasChild", function (e) {
                return e ? 14 : 0
              }))
          )
        );
      },
      initModel($, diagram, data) {
        diagram.model = $(
          go.TreeModel,
          {
            nodeParentKeyProperty: data.parentId,  // 关联父节点的id
            nodeDataArray: this.formatNodeData(data.data)
          }
        );
      },
      initLine($, diagram) {
        diagram.linkTemplate =
          $(
            go.Link,
            go.Link.Orthogonal,
            {corner: 0, selectable: false},
            $(go.Shape, {strokeWidth: 1, stroke: "#FD8C49"})
          );
      },
      initOverview($, diagram, domId) {
        return $(go.Overview,
          domId,
          {
            observed: diagram,
            contentAlignment: go.Spot.Center
          }
        );
      },
      formatNodeData(data) {
        data.forEach((item, index) => {
            item.key = item.id
            if (item.level >= 3) {
              item.category = 'Terminal'
            }
          }
        );
        return data;
      },
      formatPost(val, part) {
        let data = part.part.data,
          managerName = data.managerName ? data.managerName : '-',
          managerPostName = data.managerPostName ? data.managerPostName : '-';
        return managerName + '/' + managerPostName
      },
      fetchData(params) {
        return new Promise((resolve, reject) => {
          this.$http['org/org'](params).then(res => {
            resolve(res.data);
          }).catch((err) => {
            reject(err);
          });
        });
      },
      createChart(params) {
        this.fetchData(params).then(res => {
          if (res && res.data.length) {
            this.nodeDataArray = res.data;
            this.initOrgChart({
              data: this.nodeDataArray,
              parentId: 'parentId'
            });
          }
        });
      },
      myCallback(blob) {
        var url = window.URL.createObjectURL(blob);
        var filename = "mySVGFile.svg";
        this.imgSrc = url
        console.log(url)
        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        // IE 11
        if (window.navigator.msSaveBlob !== undefined) {
          window.navigator.msSaveBlob(blob, filename);
          return;
        }

        document.body.appendChild(a);
        requestAnimationFrame(function () {
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
      },

      exportPic() {
        const createNode = (str) => {
          let tempNode = document.createElement('div')
          tempNode.innerHTML = str
          return tempNode.firstChild
        }
        let svg = this.diagram.makeSvg({scale: 1, background: "white"}),
          svgstr = new XMLSerializer().serializeToString(svg)
        saveSvgAsPng(createNode(svgstr), '组织架构图.png')
      }
    }
  }
</script>

<style scoped>
  #myDiagramDiv {
    width: 1200px;
    height: 700px;
  }

  #orgOverview {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
