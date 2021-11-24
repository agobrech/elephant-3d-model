<template>
  <div class="grid grid-cols-2">
    <div class="grid grid-rows-2 place-items-center">
      <div>
        <h1 class="text-4xl">
          Pilot for Elephant in the Room by Aël Gobrecht
        </h1>
      </div>
      <div>
        <div>
          <input v-model="name" placeholder="Name of the node" type="text" class="py-3 px-4 rounded border border-blue-500">
          <button class="py-2 px-4 font-semibold text-blue-700 rounded border border-blue-500 hover:border-blue-800" @click="add()">
            Add
          </button>
          <button class="py-2 px-4 font-semibold text-red-700 rounded border border-red-500 hover:border-red-800" @click="remove()">
            Remove
          </button>
        </div>
        <div>
          <input v-model="node1" placeholder="Name of Node 1" type="text" class="py-3 px-4 rounded border border-blue-500">
          <input v-model="node2" placeholder="Name of Node 2" type="text" class="py-3 px-4 rounded border border-blue-500">
          <button class="py-2 px-4 font-semibold text-blue-700 rounded border border-blue-500 hover:border-blue-800" @click="link()">
            Link
          </button>
          <button class="py-2 px-4 font-semibold text-red-700 rounded border border-red-500 hover:border-red-800" @click="unlink()">
            Unlink
          </button>
        </div>
      </div>
    </div>
    <div id="graph" class="object-contain" />
  </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph'
import { TextureLoader, SpriteMaterial, Sprite } from 'three'

export default {
  data () {
    return {
      image: '/avataaars.png',
      name: null,
      node1: null,
      node2: null,
      gData: {
        nodes: [
          { id: 0, name: 'Bill' }, { id: 1, name: 'Aël' }, { id: 2, name: 'John' }, { id: 3, name: 'Lucy' }, { id: 4, name: 'Lena' }
        ],
        links: [
          { source: 0, target: 1 },
          { source: 0, target: 2 },
          { source: 0, target: 3 },
          { source: 3, target: 4 },
          { source: 1, target: 4 }
        ]
      }
    }
  },
  mounted () {
    this.loadGraph()
    console.log('gdata', this.gData)
  },
  methods: {
    add () {
      this.gData.nodes.push({ id: this.gData.nodes.length, name: this.name })
      console.log(this.gData)
      this.loadGraph()
    },
    remove () {
      for (let i = 0; i < this.gData.nodes.length; i++) {
        if (this.gData.nodes[i].name === this.name) {
          for (let j = 0; j < this.gData.links.length; j++) {
            if (this.gData.links[j].source.id === this.gData.nodes[i].id || this.gData.links[j].target.id === this.gData.nodes[i].id) {
              this.gData.links.splice(j, 1)
              console.log('passed')
            }
          }
          this.gData.nodes.splice(i, 1)
        }
      }
      this.loadGraph()
    },
    link () {
      for (let i = 0; i < this.gData.nodes.length; i++) {
        if (this.gData.nodes[i].name === this.node1) {
          for (let j = 0; j < this.gData.nodes.length; j++) {
            if (this.gData.nodes[j].name === this.node2) {
              this.gData.links.push({ source: this.gData.nodes[i].id, target: this.gData.nodes[j].id })
            }
          }
        }
      }
      this.loadGraph()
    },
    unlink () {
      for (let i = 0; i < this.gData.links.length; i++) {
        if (this.gData.links[i].source.name === this.node1 && this.gData.links[i].target.name === this.node2) {
          this.gData.links.splice(i, 1)
        }
      }
      this.loadGraph()
    },
    loadGraph () {
      const data = this.gData
      console.log(data)
      const g = ForceGraph3D()(document.getElementById('graph'))
      g.graphData(data).width(window.innerWidth / 2).height(window.innerHeight).nodeThreeObject(({ img }) => {
        const imgTexture = new TextureLoader().load(this.image)
        const material = new SpriteMaterial({ map: imgTexture })
        const sprite = new Sprite(material)
        sprite.scale.set(12, 12)
        return sprite
      }).onNodeClick(function (node) {
      }).linkColor(({ source, target }) => {
        return '#6dd8af'
      }).linkWidth(1.5)
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
</style>
