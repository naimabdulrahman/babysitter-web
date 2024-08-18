// src/font-awesome.ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import specific icons
import {
  faUser,
  faCoffee,
  faCaretLeft,
  faCaretRight,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { faVuejs } from '@fortawesome/free-brands-svg-icons'

const iconList = {
  faUser,
  faCoffee,
  faVuejs,
  faCaretLeft,
  faCaretRight,
  faPlus
}

library.add(iconList)

export default FontAwesomeIcon
