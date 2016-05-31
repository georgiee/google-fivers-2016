import Loader from 'resource-loader';

const preloader = new Loader();


function load(cb){
  preloader
    .add('bear', 'assets/bear.json')
    .add('wolf', 'assets/wolf.json')
    .add('tree', 'assets/tree.obj')
    .load( (loader, resources) => cb(resources))
}

export default {
  load, getResources: () => preloader.resources
}