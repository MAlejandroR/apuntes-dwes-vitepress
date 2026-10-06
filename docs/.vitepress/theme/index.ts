import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import './styles/containers.css'
import Layout from './Layout.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'


import RequestJourney from './components/RequestJourney.vue'
import ObjetivosModulo from './components/ObjetivosModulo.vue'
import StackOficial from './components/StackOficial.vue'
import Color from './components/Color.vue'
import CardPane from './components/CardPane.vue'
import Card from './components/Card.vue'
import ButtonSlides from './components/ButtonSlides.vue'
import Objetivos from './components/Objetivos.vue'
import EnConstruccion from './components/EnConstruccion.vue'
import Quiz from './components/Quiz.vue'
import DropDown from  './components/DropDown.vue'
import Cmd from './components/Cmd.vue'
import CmdPane from './components/CmdPane.vue'
import PhpRunner from './components/PhpRunner.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('RequestJourney', RequestJourney)
    app.component('ObjetivosModulo', ObjetivosModulo)
    app.component('StackOficial', StackOficial)
    app.component('Color', Color)
    app.component('CardPane', CardPane)
    app.component('Card', Card)
    app.component('ButtonSlides', ButtonSlides)
    app.component('Objetivos', Objetivos)
    app.component('EnConstruccion', EnConstruccion)
    app.component('Quiz', Quiz)
    app.component('DropDown', DropDown)
    app.component('Cmd', Cmd)
    app.component('CmdPane', CmdPane)
    app.component('PhpRunner', PhpRunner)
  },
} satisfies Theme
