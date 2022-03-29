import Tree from "../components/Tree";
import Rock from "../components/Rock";
import Mushroom from "../components/Mushrooms";
import Flower from "../components/Flowers";
import Grass from "../components/Grass";


export default function Objects() {

    let treesAmount = 85;
    let rockAmount = 30;
    let flowerAmount = 40;
    let grassAmount = 55;
    let mushroomAmount = 30;

    let trees = [];
    let rocks = [];
    let flowers = [];
    let grass = [];
    let mushrooms = [];


    for (var i = 0; i < treesAmount; i++) {
        trees.push(<Tree key={i} scale={1} position={[Math.random() * 75, 0, Math.random() * 75]} />);
    }
    for (var i = 0; i < rockAmount; i++) {
        rocks.push(<Rock key={i} scale={1} position={[Math.random() * 75, 0, Math.random() * 75]} />);
    }

    for (var i = 0; i < flowerAmount; i++) {
        flowers.push(<Flower key={i} scale={.01} position={[Math.random() * 75, 0, Math.random() * 75]} />);
    }
    for (var i = 0; i < grassAmount; i++) {
        grass.push(<Grass key={i} scale={.005} position={[Math.random() * 75, 0, Math.random() * 75]} />);

    }
    for (var i = 0; i < mushroomAmount; i++) {
        mushrooms.push(<Mushroom key={i} scale={.01} position={[Math.random() * 75, 0, Math.random() * 75]} />);
    }


    return (
        <>
            {trees}
            {rocks}
            {flowers}
            {grass}
            {mushrooms}

        </>
    );

}