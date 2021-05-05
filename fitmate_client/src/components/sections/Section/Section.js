import React from 'react';
import './Section.scss';

const Section = (props) => (
    <div>
        <div className="Section">
            <div className={"Section__headline"}>{ props.title }</div>
            <div className={"Section__content"}>
                {/*<SectionLastTraining />*/} {props.children}
            </div>
        </div>
    </div>
);

Section.propTypes = {};

Section.defaultProps = {};

export default Section;
