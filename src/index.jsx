/**
 * Created by M. Yegorov on 2016-04-29.
 */

import React, {Component} from 'react';
import ReactHeight from 'react-height';
import css from './Foldable.css';

export default class Foldable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: props.expanded || false,
            bodyStyle: {},
            carrotStyle: {},
            timeout: false,
            animationSpeed: props.speed || 200
        };

        if (typeof this.props.onToggle == 'function') {
            this.onToggle = (...args) => {
                this.props.onToggle(...args);
            }
        } else {
            this.onToggle = () => {}
        }
    }

    render() {

        const {title, children, className}  = this.props;
        const {expanded, bodyStyle, carrotStyle, animationSpeed} = this.state;

        const animationStyle = {
            transition: `all ${animationSpeed}ms ease`
        };

        const classNames = [
            css.main,
            className
        ];
        
        if (expanded) {
            classNames.push('expanded')
        }

        return <div className={classNames.join(' ')}>
            <div className="caption" style={{cursor:'pointer'}} onClick={e => this.toggle()}>
                <span className="carrot" style={{...animationStyle, ...carrotStyle}}>
                    {this.props.carrot || null}
                </span>
                <span className="title">{title}</span>
            </div>
            <div className="body" style={{...animationStyle, ...bodyStyle}}>
                <div ref={element => this.childrenContainer = element} className="children-container">
                    <ReactHeight onHeightReady={height => this.onHeightReady()}>
                        {children}
                    </ReactHeight>
                </div>
            </div>
        </div>;
    }

    toggle() {
        if (this.state.expanded) {
            this.close()
        } else {
            this.open()
        }
    }

    onHeightReady() {

        if (this.state.expanded) {
            
            this.setState({
                bodyStyle: {height: this.childrenContainer.offsetHeight}
            }, () => {
                if (typeof this.props.onHeightReady == 'function') {
                    this.props.onHeightReady(this.childrenContainer.offsetHeight)
                }
            });
        }
    }

    open() {
        if (!this.state.expanded) {

            if (this.state.timeout) {
                clearTimeout(this.state.timeout)
            }

            const timeout = setTimeout(()=> {
                this.setState({
                    bodyStyle: {height: this.childrenContainer.offsetHeight},
                    carrotStyle: this.props.carrotStyleOpen || {transform: 'rotate(0deg)'}
                }, () => setTimeout(() => this.onToggle(this.childrenContainer.offsetHeight), this.state.animationSpeed))
            });

            this.setState({
                expanded: true,
                timeout
            });
        }
    }

    close() {
        if (this.state.expanded) {

            if (this.state.timeout) {
                clearTimeout(this.state.timeout)
            }

            const timeout = setTimeout(()=> {
                this.setState({
                    expanded: false
                }, () => this.onToggle(0));
                
            }, this.state.animationSpeed);

            this.setState({
                bodyStyle: {},
                carrotStyle: {},
                timeout
            });
        }
    }
}