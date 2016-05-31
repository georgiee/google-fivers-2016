import preloader from './preloader';
import {find} from "lodash";

let models = [
  {
    id: 'bear',
    source: 'assets/bear.json',
    scale: 0.02
  },

  {
    id: 'wolf',
    source: 'assets/wolf.json',
    scale: 0.05
  }
];

function getModel(id){
  return find(models, item => (item.id == id));
}

export { getModel, models }