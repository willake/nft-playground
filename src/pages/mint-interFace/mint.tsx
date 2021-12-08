import * as P5 from "p5";
import * as React from "react";
import style from './mint.module.css';
import MintButton from '../../components/mint-button/mint-button';
import { interFaceSketch } from '../../components/p5/interFace/interFace';
import P5Wrapper from '../../components/p5/wrapper';

interface IState {
    interFaceSketch: (p5: P5) => void
}

class InterFaceMintPage extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            interFaceSketch: interFaceSketch
        };
    }

    private mint = () => {
        this.setState({ interFaceSketch: interFaceSketch });
    }
    
    private onP5Changed = (p: P5) => {
    }
    
    public render() {
        return (
            <div>
                <div className={style.main}>
                    <div className={style.mainItem} > 
                        <P5Wrapper sketch={this.state.interFaceSketch} onP5Changed={this.onP5Changed}/>
                    </div>
                    <div className={style.mainItem} >
                        <MintButton handleClick={this.mint}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default InterFaceMintPage;